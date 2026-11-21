/**
 * web/components/universal-search-modal.ts
 * Global Universal Search Modal for Grade9 STEM.
 *
 * Implements:
 * - Ctrl/Cmd+K global keyboard shortcut.
 * - Full 416-item offline corpus search (310 Questions, 61 Tablets, 44 Topics & Concepts).
 * - Category filter tabs with live hit counts: [All 416] [Questions 310] [Core 1A & 2 Tablets 61] [Topics & Concepts 44].
 * - High-speed sub-50ms live search with token stemming and relevance scoring.
 * - WCAG touch targets (>= 48px) and accessible >= 14px typography.
 */

import {
  queryUniversalSearch,
  UNIVERSAL_SEARCH_CORPUS,
  type UniversalSearchDoc,
  type UniversalSearchResponse,
} from '../runtime/universal-search-index.ts';

export class UniversalSearchModalController {
  private dialog: HTMLDialogElement | null = null;
  private input: HTMLInputElement | null = null;
  private tabsContainer: HTMLElement | null = null;
  private resultsContainer: HTMLElement | null = null;
  private activeCategory: string = 'all';
  private currentQuery: string = '';
  private selectedIndex: number = -1;
  private currentResults: UniversalSearchDoc[] = [];

  constructor() {
    this.registerGlobalShortcut();
  }

  private createDialog(): void {
    if (typeof document === 'undefined') return;

    this.dialog = document.createElement('dialog');
    this.dialog.className = 'g9-search-dialog';
    this.dialog.setAttribute('aria-label', 'Search Grade9 STEM');

    // Dialog styles
    this.dialog.style.cssText = `
      position: fixed;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: 94vw;
      max-width: 720px;
      max-height: 82vh;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      padding: 0;
      box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.35);
      font-family: var(--g9-font-family, system-ui, -apple-system, sans-serif);
      color: #0f172a;
      box-sizing: border-box;
      z-index: 99999;
      outline: none;
      overflow: hidden;
    `;

    const inner = document.createElement('div');
    inner.style.cssText = 'display: flex; flex-direction: column; max-height: 82vh; padding: 20px; box-sizing: border-box;';

    // Top Bar (Title & Close Button)
    const topBar = document.createElement('div');
    topBar.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-shrink: 0;';

    const title = document.createElement('strong');
    title.textContent = 'Search Grade9 STEM';
    title.style.cssText = 'font-size: 1.25rem; font-weight: 800; color: #0f172a;';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', 'Close search dialog');
    closeBtn.style.cssText = `
      min-width: 48px;
      min-height: 48px;
      padding: 0;
      border: none;
      background: #f1f5f9;
      color: #64748b;
      font-size: 1.1rem;
      font-weight: 700;
      border-radius: 50%;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
      flex-shrink: 0;
    `;
    closeBtn.addEventListener('mouseenter', () => { closeBtn.style.background = '#e2e8f0'; closeBtn.style.color = '#0f172a'; });
    closeBtn.addEventListener('mouseleave', () => { closeBtn.style.background = '#f1f5f9'; closeBtn.style.color = '#64748b'; });
    closeBtn.addEventListener('click', () => this.close());

    topBar.append(title, closeBtn);

    // Search Input Field Container
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = 'position: relative; margin-bottom: 8px; flex-shrink: 0;';

    this.input = document.createElement('input');
    this.input.type = 'search';
    this.input.placeholder = 'Search pages, concepts, questions, or topics…';
    this.input.autocomplete = 'off';
    this.input.setAttribute('aria-label', 'Search query');
    this.input.style.cssText = `
      width: 100%;
      min-height: 52px;
      padding: 12px 48px 12px 18px;
      font-size: 1.05rem;
      border: 2px solid #0284c7;
      border-radius: 10px;
      box-sizing: border-box;
      outline: none;
      font-family: inherit;
      color: #0f172a;
      background: #ffffff;
    `;

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.innerHTML = '✕';
    clearBtn.title = 'Clear search';
    clearBtn.setAttribute('aria-label', 'Clear search query');
    clearBtn.style.cssText = `
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      min-width: 48px;
      min-height: 48px;
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 1rem;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
    `;
    clearBtn.addEventListener('click', () => {
      if (this.input) {
        this.input.value = '';
        this.currentQuery = '';
        clearBtn.style.display = 'none';
        this.input.focus();
        this.renderResults();
      }
    });

    this.input.addEventListener('input', () => {
      this.currentQuery = this.input?.value.trim() || '';
      clearBtn.style.display = this.currentQuery ? 'flex' : 'none';
      this.renderResults();
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.moveSelection(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.moveSelection(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.openSelected();
      }
    });

    inputContainer.append(this.input, clearBtn);

    // Tip Hint
    const hint = document.createElement('div');
    hint.textContent = 'Tip: press Ctrl/⌘ K from anywhere to search.';
    hint.style.cssText = 'font-size: 0.875rem; color: #64748b; margin-bottom: 12px; flex-shrink: 0;';

    // Tabs Row
    this.tabsContainer = document.createElement('div');
    this.tabsContainer.setAttribute('role', 'tablist');
    this.tabsContainer.style.cssText = 'display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 14px; flex-shrink: 0;';

    // Results Scroll Area
    this.resultsContainer = document.createElement('div');
    this.resultsContainer.setAttribute('aria-live', 'polite');
    this.resultsContainer.style.cssText = `
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-right: 4px;
      min-height: 220px;
      max-height: 480px;
    `;

    inner.append(topBar, inputContainer, hint, this.tabsContainer, this.resultsContainer);
    this.dialog.appendChild(inner);

    // Backdrop click closes dialog
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) {
        this.close();
      }
    });
  }

  private registerGlobalShortcut(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen()) {
        e.preventDefault();
        this.close();
      }
    });
  }

  public open(initialQuery: string = ''): void {
    if (!this.dialog) {
      this.createDialog();
    }
    if (!this.dialog) return;

    if (!document.body.contains(this.dialog)) {
      document.body.appendChild(this.dialog);
    }

    if (!this.dialog.open) {
      if (typeof this.dialog.showModal === 'function') {
        this.dialog.showModal();
      } else {
        this.dialog.setAttribute('open', '');
      }
    }

    if (this.input) {
      this.input.value = initialQuery;
      this.currentQuery = initialQuery;
      this.input.focus();
      this.input.select();
    }

    this.selectedIndex = -1;
    this.renderResults();
  }

  public close(): void {
    if (!this.dialog) return;
    if (this.dialog.open) {
      this.dialog.close();
    }
    if (this.dialog.parentElement) {
      this.dialog.parentElement.removeChild(this.dialog);
    }
  }

  public toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  public isOpen(): boolean {
    return !!(this.dialog && this.dialog.open && document.body.contains(this.dialog));
  }

  private renderResults(): void {
    if (!this.resultsContainer || !this.tabsContainer) return;

    const res: UniversalSearchResponse = queryUniversalSearch(this.currentQuery, this.activeCategory);
    this.currentResults = [...res.results];
    this.selectedIndex = -1;

    // 1. Render Tabs
    this.tabsContainer.replaceChildren();
    const tabDefs = [
      { id: 'all', label: 'All', count: res.counts.all },
      { id: 'question', label: 'Questions', count: res.counts.question },
      { id: 'tablet', label: 'Core 1A & 2 Tablets', count: res.counts.tablet },
      { id: 'curriculum', label: 'Topics & Concepts', count: res.counts.curriculum },
    ];

    tabDefs.forEach((def) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = this.activeCategory === def.id;
      btn.className = `g9-search-tab ${isActive ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(isActive));
      btn.style.cssText = `
        min-height: 48px;
        min-width: 48px;
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 2px;
        white-space: nowrap;
        transition: all 0.15s;
        flex-shrink: 0;
        border: 1.5px solid ${isActive ? '#0f172a' : '#cbd5e1'};
        background: ${isActive ? '#f8fafc' : '#ffffff'};
        color: ${isActive ? '#0f172a' : '#475569'};
        box-shadow: ${isActive ? '0 1px 2px rgba(15,23,42,0.1)' : 'none'};
      `;

      btn.innerHTML = `
        <span>${def.label}</span><span style="font-weight:800;font-size:0.9rem;margin-left:2px;color:${isActive ? '#0f172a' : '#64748b'};">${def.count}</span>
      `;

      btn.addEventListener('click', () => {
        this.activeCategory = def.id;
        this.renderResults();
      });

      this.tabsContainer!.appendChild(btn);
    });

    // 2. Render Result Items
    this.resultsContainer.replaceChildren();

    if (res.results.length === 0) {
      const emptyBox = document.createElement('div');
      emptyBox.style.cssText = 'padding: 36px 16px; text-align: center; color: #64748b; font-size: 1rem;';
      emptyBox.innerHTML = `No matching results found for "<strong>${escapeHtml(this.currentQuery)}</strong>".`;
      this.resultsContainer.appendChild(emptyBox);
      return;
    }

    res.results.slice(0, 50).forEach((item) => {
      this.resultsContainer!.appendChild(this.createCard(item));
    });
  }

  private appendSectionHeader(label: string, count: number): void {
    const hdr = document.createElement('div');
    hdr.textContent = `${label} (${count})`;
    hdr.style.cssText = 'font-size: 0.95rem; font-weight: 800; color: #0284c7; margin-top: 8px; margin-bottom: 2px; padding: 2px 4px; letter-spacing: -0.01em;';
    this.resultsContainer!.appendChild(hdr);
  }

  private createCard(item: UniversalSearchDoc): HTMLElement {
    const card = document.createElement('a');
    card.href = item.route;
    card.className = 'g9-search-card';
    card.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 14px 18px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #ffffff;
      text-decoration: none;
      color: inherit;
      min-height: 52px;
      cursor: pointer;
      transition: all 0.15s ease;
      box-sizing: border-box;
    `;

    card.addEventListener('mouseenter', () => {
      card.style.background = '#f0f9ff';
      card.style.borderColor = '#38bdf8';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '#ffffff';
      card.style.borderColor = '#e2e8f0';
    });

    card.addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
      window.location.hash = item.route;
    });

    // Left info column
    const left = document.createElement('div');
    left.style.cssText = 'display: flex; flex-direction: column; gap: 4px; min-width: 0;';

    const title = document.createElement('div');
    title.textContent = item.title;
    title.style.cssText = 'font-size: 1rem; font-weight: 700; color: #0f172a; line-height: 1.4;';

    const sub = document.createElement('div');
    sub.textContent = item.breadcrumb || item.subtitle;
    sub.style.cssText = 'font-size: 0.875rem; color: #64748b; font-weight: 500;';

    left.append(title, sub);

    // Right Badge
    const badge = document.createElement('span');
    badge.textContent = item.badge;
    badge.style.cssText = `
      flex-shrink: 0;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: #f1f5f9;
      color: #475569;
    `;

    const b = item.badge.toUpperCase();
    if (b.includes('CONCEPT') || b.includes('TOPIC') || b.includes('SUBTOPIC')) {
      badge.style.background = '#f1f5f9';
      badge.style.color = '#475569';
    } else if (b.includes('QUESTION')) {
      badge.style.background = '#ecfdf5';
      badge.style.color = '#047857';
    } else if (b.includes('CORE') || b.includes('LAB')) {
      badge.style.background = '#e0f2fe';
      badge.style.color = '#0369a1';
    }

    card.append(left, badge);
    return card;
  }

  private moveSelection(dir: number): void {
    if (this.currentResults.length === 0) return;
    this.selectedIndex += dir;
    if (this.selectedIndex < 0) this.selectedIndex = 0;
    if (this.selectedIndex >= this.currentResults.length) this.selectedIndex = this.currentResults.length - 1;

    const cards = this.resultsContainer?.querySelectorAll<HTMLElement>('.g9-search-card');
    cards?.forEach((c, i) => {
      if (i === this.selectedIndex) {
        c.style.background = '#e0f2fe';
        c.style.borderColor = '#0284c7';
        c.scrollIntoView({ block: 'nearest' });
      } else {
        c.style.background = '#ffffff';
        c.style.borderColor = '#e2e8f0';
      }
    });
  }

  private openSelected(): void {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.currentResults.length) {
      const selected = this.currentResults[this.selectedIndex];
      this.close();
      window.location.hash = selected.route;
    }
  }
}

function escapeHtml(v: string): string {
  return String(v || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let globalModalInstance: UniversalSearchModalController | null = null;

export function getOrCreateUniversalSearchModal(): UniversalSearchModalController {
  if (!globalModalInstance) {
    globalModalInstance = new UniversalSearchModalController();
  }
  return globalModalInstance;
}
