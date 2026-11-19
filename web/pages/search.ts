/**
 * web/pages/search.ts
 * Workpack A35: Universal Search Page Controller and UI Component.
 *
 * Implements:
 * - Full tablet ergonomics (min 48px touch targets, dual orientation layout, 0px horizontal overflow).
 * - Child-friendly presentation (clear prompts, structured category badges, honest empty states).
 * - Formula input support with dedicated virtual keyboard symbol chips.
 * - Multi-subject and multi-role facet filters (intersect across dimensions, union within dimensions).
 * - Live typo suggestions with one-tap correction ("Did you mean: ...?").
 * - Stale shard error banner with safe reload (preventing stale mixed results).
 * - Release-only result presentation with canonical route links and explicit tombstones.
 * - Zero private answer, rubric, or solution leakage.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { escapeHtml as e } from '../runtime/rendering.ts';
import {
  HIT_TARGET_MIN_PX,
  HIT_TARGET_PRIMARY_PX,
  COLOR_TOKEN,
} from '../styles/tokens.ts';
import {
  SearchEngine,
  type SearchManifest,
  type SearchShardMeta,
  type SearchItem,
  type SearchFacetCriteria,
  type SearchResultItem,
  type SearchQueryResult,
  normalizeQuery,
  assertNoAnswerLeakage,
} from '../runtime/search.ts';

const COLOR_PRIMARY = '#1a73e8';
const COLOR_SURFACE = '#ffffff';
const COLOR_TEXT = '#202124';
const COLOR_TEXT_MUTED = '#5f6368';
const COLOR_BORDER = '#dadce0';
const ELEVATION_CARD = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';

export type SearchPageState = 'IDLE' | 'LOADING' | 'RESULTS' | 'ZERO_RESULTS' | 'STALE_SHARD_ERROR' | 'ERROR';

export interface SearchPageOptions {
  readonly manifest?: SearchManifest;
  readonly initialQuery?: string;
  readonly initialFacets?: SearchFacetCriteria;
  readonly onRouteSelect?: (targetRoute: string, item: SearchItem) => void;
  readonly onReloadRequest?: () => void;
}

const COMMON_FORMULA_SYMBOLS = ['+', '−', '=', '·', '²', '³', '√', 'Δ', 'θ', 'π', '→', 'λ'];

export class UniversalSearchPageController {
  private engine: SearchEngine;
  private rootElement: HTMLElement | null = null;
  private queryText = '';
  private activeFacets: SearchFacetCriteria = {};
  private state: SearchPageState = 'IDLE';
  private currentResults: readonly SearchResultItem[] = [];
  private totalMatches = 0;
  private activeSuggestion: string | null = null;
  private errorMessage: string | null = null;
  private readonly onRouteSelect?: (targetRoute: string, item: SearchItem) => void;
  private readonly onReloadRequest?: () => void;

  constructor(options: SearchPageOptions = {}) {
    this.engine = new SearchEngine(options.manifest);
    this.queryText = options.initialQuery || '';
    this.activeFacets = options.initialFacets || {};
    this.onRouteSelect = options.onRouteSelect;
    this.onReloadRequest = options.onReloadRequest;
  }

  public getEngine(): SearchEngine {
    return this.engine;
  }

  public getState(): SearchPageState {
    return this.state;
  }

  public getQuery(): string {
    return this.queryText;
  }

  public getActiveFacets(): SearchFacetCriteria {
    return { ...this.activeFacets };
  }

  public getResults(): readonly SearchResultItem[] {
    return this.currentResults;
  }

  public loadShard(shardMeta: SearchShardMeta, items: readonly SearchItem[], digest: string): void {
    try {
      this.engine.loadShard(shardMeta, items, digest);
      if (this.queryText) {
        this.executeSearch();
      }
    } catch (err: unknown) {
      this.state = 'STALE_SHARD_ERROR';
      this.errorMessage = err instanceof Error ? err.message : String(err);
      this.render();
    }
  }

  public mount(container: HTMLElement): void {
    this.rootElement = container;
    this.render();
    if (this.queryText) {
      this.executeSearch();
    }
  }

  public setQuery(newQuery: string): void {
    this.queryText = newQuery;
    this.executeSearch();
  }

  public toggleFacet(dimension: keyof SearchFacetCriteria, value: string): void {
    const currentValues = this.activeFacets[dimension] || [];
    const normalizedVal = value.toUpperCase();
    const exists = currentValues.some((v) => v.toUpperCase() === normalizedVal);

    let updated: string[];
    if (exists) {
      updated = currentValues.filter((v) => v.toUpperCase() !== normalizedVal);
    } else {
      updated = [...currentValues, value];
    }

    this.activeFacets = {
      ...this.activeFacets,
      [dimension]: updated.length > 0 ? updated : undefined,
    };

    this.executeSearch();
  }

  public clearFilters(): void {
    this.activeFacets = {};
    this.executeSearch();
  }

  public clearQuery(): void {
    this.queryText = '';
    this.activeSuggestion = null;
    this.executeSearch();
  }

  public insertFormulaSymbol(symbol: string): void {
    this.queryText += symbol;
    this.executeSearch();
    const input = this.rootElement?.querySelector<HTMLInputElement>('input[type="search"]');
    if (input) {
      input.value = this.queryText;
      input.focus();
    }
  }

  public executeSearch(): void {
    if (!this.engine.getManifest()) {
      this.state = 'IDLE';
      this.render();
      return;
    }

    try {
      const res = this.engine.query(this.queryText, {
        facets: this.activeFacets,
        limit: 50,
      });

      this.currentResults = res.results;
      this.totalMatches = res.totalMatches;
      this.activeSuggestion = res.suggestion;

      if (this.totalMatches === 0 && this.queryText.trim().length > 0) {
        this.state = 'ZERO_RESULTS';
      } else if (this.totalMatches === 0 && !this.queryText.trim()) {
        this.state = 'IDLE';
      } else {
        this.state = 'RESULTS';
      }
    } catch (err: unknown) {
      this.state = 'ERROR';
      this.errorMessage = err instanceof Error ? err.message : String(err);
    }

    this.render();
  }

  public handleItemClick(item: SearchItem): void {
    assertNoAnswerLeakage(item, item.id);
    if (this.onRouteSelect) {
      this.onRouteSelect(item.route, item);
    }
  }

  public getCategoryLabel(kind: string, facets: Readonly<Record<string, readonly string[]>>): string {
    const roles = facets['role'] || [];
    if (roles.includes('CORE1A')) return 'Learn the concept';
    if (roles.includes('CORE1B')) return 'Try a fresh challenge';
    if (roles.includes('CORE2') || roles.includes('CORE2A') || roles.includes('CORE2B')) return 'Practice questions';
    if (roles.includes('EXPLORER') || kind === 'EXPLORER') return 'Explore related concept';
    if (kind === 'QUESTION') return 'Practice question';
    if (kind === 'LESSON') return 'Curriculum lesson';
    if (kind === 'CONCEPT') return 'Core concept';
    return 'Learning resource';
  }

  public render(): void {
    if (!this.rootElement) return;

    const minHit = `${HIT_TARGET_MIN_PX}px`;
    const primaryHit = `${HIT_TARGET_PRIMARY_PX}px`;

    let contentHtml = '';

    if (this.state === 'STALE_SHARD_ERROR') {
      contentHtml = `
        <div class="stale-shard-banner" role="alert" style="
          background-color: #fff4e5;
          border: 2px solid #ff9800;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: ${minHit};
        ">
          <div>
            <strong style="color: #d84315; font-size: 16px;">Catalogue Updated</strong>
            <p style="margin: 4px 0 0 0; color: #5d4037; font-size: 14px;">
              The search catalogue has been updated with verified content. Please reload to sync the latest release shards.
            </p>
          </div>
          <button type="button" class="reload-btn" style="
            min-height: ${minHit};
            min-width: 100px;
            background-color: #ff9800;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            padding: 0 16px;
          ">Reload</button>
        </div>
      `;
    }

    // Filter Chips Row
    const subjects = ['Physics', 'Chemistry', 'Mathematics'];
    const roles = [
      { id: 'CORE1A', label: 'Core 1A: Concept' },
      { id: 'CORE1B', label: 'Core 1B: Challenge' },
      { id: 'CORE2', label: 'Core 2: Practice' },
      { id: 'EXPLORER', label: 'Explorer' },
    ];

    const activeSubjects = (this.activeFacets.subject || []).map((s) => s.toUpperCase());
    const activeRoles = (this.activeFacets.role || []).map((r) => r.toUpperCase());

    const subjectChipsHtml = subjects
      .map((s) => {
        const isSelected = activeSubjects.includes(s.toUpperCase());
        return `
          <button type="button" class="facet-chip" data-dimension="subject" data-value="${e(s)}" style="
            min-height: ${minHit};
            padding: 8px 16px;
            border-radius: 24px;
            border: 1px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER};
            background-color: ${isSelected ? COLOR_PRIMARY : COLOR_SURFACE};
            color: ${isSelected ? '#ffffff' : COLOR_TEXT};
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          ">${e(s)}</button>
        `;
      })
      .join('');

    const roleChipsHtml = roles
      .map((r) => {
        const isSelected = activeRoles.includes(r.id.toUpperCase());
        return `
          <button type="button" class="facet-chip" data-dimension="role" data-value="${e(r.id)}" style="
            min-height: ${minHit};
            padding: 8px 16px;
            border-radius: 24px;
            border: 1px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER};
            background-color: ${isSelected ? COLOR_PRIMARY : COLOR_SURFACE};
            color: ${isSelected ? '#ffffff' : COLOR_TEXT};
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          ">${e(r.label)}</button>
        `;
      })
      .join('');

    const formulaChipsHtml = COMMON_FORMULA_SYMBOLS.map(
      (sym) => `
        <button type="button" class="formula-symbol-btn" data-symbol="${e(sym)}" style="
          min-height: ${minHit};
          min-width: ${minHit};
          padding: 4px 12px;
          border-radius: 8px;
          border: 1px solid ${COLOR_BORDER};
          background-color: ${COLOR_SURFACE};
          color: ${COLOR_TEXT};
          font-size: 18px;
          font-family: monospace;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        ">${e(sym)}</button>
      `
    ).join('');

    // Typo suggestion pill
    let suggestionHtml = '';
    if (this.activeSuggestion) {
      suggestionHtml = `
        <div class="suggestion-banner" style="
          margin: 12px 0;
          padding: 8px 16px;
          background-color: #f0f7ff;
          border-radius: 8px;
          border: 1px solid #cce3ff;
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: ${minHit};
        ">
          <span style="color: ${COLOR_TEXT_MUTED}; font-size: 14px;">Did you mean:</span>
          <button type="button" class="suggestion-btn" data-query="${e(this.activeSuggestion)}" style="
            min-height: ${minHit};
            background: none;
            border: none;
            color: ${COLOR_PRIMARY};
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            padding: 0 8px;
            text-decoration: underline;
          ">${e(this.activeSuggestion)}?</button>
        </div>
      `;
    }

    // Results rendering
    let resultsListHtml = '';
    if (this.state === 'RESULTS') {
      resultsListHtml = `
        <div class="results-header" style="margin: 16px 0; font-size: 14px; color: ${COLOR_TEXT_MUTED};">
          Showing ${this.currentResults.length} of ${this.totalMatches} verified items
        </div>
        <div class="results-grid" style="display: flex; flex-direction: column; gap: 12px;">
          ${this.currentResults
            .map((res) => {
              const item = res.item;
              const catLabel = this.getCategoryLabel(item.kind, item.publicFacets);
              return `
                <article class="search-result-card" data-item-id="${e(item.id)}" style="
                  background-color: ${COLOR_SURFACE};
                  border: 1px solid ${COLOR_BORDER};
                  border-radius: 12px;
                  padding: 16px;
                  box-shadow: ${ELEVATION_CARD};
                  cursor: pointer;
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                  min-height: ${minHit};
                ">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <span class="category-badge" style="
                      background-color: #e8f0fe;
                      color: #1a73e8;
                      font-size: 12px;
                      font-weight: 600;
                      padding: 4px 10px;
                      border-radius: 12px;
                      min-height: 24px;
                      display: inline-flex;
                      align-items: center;
                    ">${e(catLabel)}</span>
                    <span class="subject-tag" style="font-size: 12px; color: ${COLOR_TEXT_MUTED};">
                      ${e(item.subjectIds.join(', '))}
                    </span>
                  </div>
                  <h3 style="margin: 0; font-size: 16px; color: ${COLOR_TEXT}; line-height: 1.4;">
                    ${e(item.title)}
                  </h3>
                  <p style="margin: 0; font-size: 14px; color: ${COLOR_TEXT_MUTED}; line-height: 1.4;">
                    ${e(item.summary)}
                  </p>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                    <span style="font-size: 12px; color: #888888; font-family: monospace;">
                      ${e(item.id)}
                    </span>
                    <span style="font-size: 12px; color: ${COLOR_PRIMARY}; font-weight: 500;">
                      Tap to open →
                    </span>
                  </div>
                </article>
              `;
            })
            .join('')}
        </div>
      `;
    } else if (this.state === 'ZERO_RESULTS') {
      resultsListHtml = `
        <div class="empty-state-view" style="
          text-align: center;
          padding: 48px 16px;
          background-color: ${COLOR_SURFACE};
          border: 1px solid ${COLOR_BORDER};
          border-radius: 12px;
          margin: 24px 0;
        ">
          <div style="font-size: 40px; margin-bottom: 16px;">🔍</div>
          <h3 style="margin: 0 0 8px 0; font-size: 18px; color: ${COLOR_TEXT};">
            No matching items found
          </h3>
          <p style="margin: 0 0 24px 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px; max-width: 480px; margin-left: auto; margin-right: auto;">
            We couldn't find any verified materials matching <strong>"${e(this.queryText)}"</strong>. Try checking your spelling or clearing filters.
          </p>
          <button type="button" class="clear-all-btn" style="
            min-height: ${primaryHit};
            min-width: 140px;
            background-color: ${COLOR_PRIMARY};
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            padding: 0 20px;
          ">Clear search & filters</button>
        </div>
      `;
    } else if (this.state === 'IDLE') {
      resultsListHtml = `
        <div class="idle-prompt-view" style="
          text-align: center;
          padding: 36px 16px;
          color: ${COLOR_TEXT_MUTED};
        ">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; color: ${COLOR_TEXT};">
            Explore Grade 9 Learning Concepts
          </h3>
          <p style="margin: 0; font-size: 14px;">
            Search by keyword, topic, question code, formula, or use the filters above to find verified lessons and challenges.
          </p>
        </div>
      `;
    }

    this.rootElement.innerHTML = `
      <div class="universal-search-container" style="
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px;
        box-sizing: border-box;
      ">
        ${contentHtml}

        <!-- Search Input Bar -->
        <div class="search-input-wrapper" style="
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        ">
          <input
            type="search"
            class="universal-search-input"
            inputmode="search"
            enterkeyhint="search"
            autocomplete="off"
            autocorrect="off"
            placeholder="Explore concepts, practice challenges, formulas, and questions..."
            value="${e(this.queryText)}"
            style="
              width: 100%;
              min-height: ${primaryHit};
              padding: 0 48px 0 16px;
              font-size: 16px;
              color: ${COLOR_TEXT};
              background-color: ${COLOR_SURFACE};
              border: 2px solid ${COLOR_PRIMARY};
              border-radius: 12px;
              box-sizing: border-box;
              outline: none;
            "
          />
          ${
            this.queryText
              ? `
            <button type="button" class="clear-query-btn" aria-label="Clear search query" style="
              position: absolute;
              right: 4px;
              min-height: ${minHit};
              min-width: ${minHit};
              background: none;
              border: none;
              font-size: 18px;
              color: ${COLOR_TEXT_MUTED};
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            ">✕</button>
          `
              : ''
          }
        </div>

        <!-- Formula Symbols Toolbar -->
        <div class="formula-toolbar" style="
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 12px;
          -webkit-overflow-scrolling: touch;
        ">
          <span style="font-size: 12px; color: ${COLOR_TEXT_MUTED}; white-space: nowrap; margin-right: 4px;">Formulas:</span>
          ${formulaChipsHtml}
        </div>

        <!-- Facet Filter Bars -->
        <div class="facet-filters-panel" style="
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        ">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 13px; font-weight: 600; color: ${COLOR_TEXT}; width: 70px;">Subject:</span>
            ${subjectChipsHtml}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 13px; font-weight: 600; color: ${COLOR_TEXT}; width: 70px;">Role:</span>
            ${roleChipsHtml}
          </div>
        </div>

        ${suggestionHtml}
        ${resultsListHtml}
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    if (!this.rootElement) return;

    // Search input
    const input = this.rootElement.querySelector<HTMLInputElement>('.universal-search-input');
    if (input) {
      input.addEventListener('input', (ev) => {
        this.queryText = (ev.target as HTMLInputElement).value;
        this.executeSearch();
      });
      input.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
          this.executeSearch();
        }
      });
    }

    // Clear query button
    const clearBtn = this.rootElement.querySelector<HTMLButtonElement>('.clear-query-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearQuery();
      });
    }

    // Formula symbol buttons
    const symbolBtns = this.rootElement.querySelectorAll<HTMLButtonElement>('.formula-symbol-btn');
    symbolBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const sym = btn.getAttribute('data-symbol');
        if (sym) {
          this.insertFormulaSymbol(sym);
        }
      });
    });

    // Facet chips
    const facetChips = this.rootElement.querySelectorAll<HTMLButtonElement>('.facet-chip');
    facetChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const dim = chip.getAttribute('data-dimension') as keyof SearchFacetCriteria;
        const val = chip.getAttribute('data-value');
        if (dim && val) {
          this.toggleFacet(dim, val);
        }
      });
    });

    // Typo suggestion button
    const sugBtn = this.rootElement.querySelector<HTMLButtonElement>('.suggestion-btn');
    if (sugBtn) {
      sugBtn.addEventListener('click', () => {
        const sug = sugBtn.getAttribute('data-query');
        if (sug) {
          this.setQuery(sug);
        }
      });
    }

    // Clear all filters / zero results button
    const clearAllBtn = this.rootElement.querySelector<HTMLButtonElement>('.clear-all-btn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        this.clearQuery();
        this.clearFilters();
      });
    }

    // Stale shard reload button
    const reloadBtn = this.rootElement.querySelector<HTMLButtonElement>('.reload-btn');
    if (reloadBtn) {
      reloadBtn.addEventListener('click', () => {
        if (this.onReloadRequest) {
          this.onReloadRequest();
        }
      });
    }

    // Result card clicks
    const cards = this.rootElement.querySelectorAll<HTMLElement>('.search-result-card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const itemId = card.getAttribute('data-item-id');
        if (itemId) {
          const item = this.currentResults.find((r) => r.item.id === itemId)?.item;
          if (item) {
            this.handleItemClick(item);
          }
        }
      });
    });
  }
}
