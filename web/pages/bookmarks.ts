/**
 * web/pages/bookmarks.ts
 * Workpack A36: Bookmarks and Saved Collections Page Controller.
 *
 * Implements:
 * - Learner bookmarks for questions, lessons, concepts, and challenges.
 * - Categorization by Subject (Physics, Chemistry, Mathematics) and Role (Core 1A, Core 1B, Core 2A, etc.).
 * - Note taking and annotation for saved items.
 * - Tombstone handling: withdrawn items retain bookmarks and user notes with clear honest disclosure.
 * - Full tablet ergonomics (min 48px touch targets, dual orientation layout, 0px horizontal overflow).
 * - Zero cognitive mastery, zero star ratings, zero progress-to-mastery claims (Rule 13 invariant).
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { escapeHtml as e } from '../runtime/rendering.ts';
import {
  HIT_TARGET_MIN_PX,
  HIT_TARGET_PRIMARY_PX,
} from '../styles/tokens.ts';
import type { TaskRef } from '../runtime/types.ts';

export type BookmarkSubject = 'PHYSICS' | 'CHEMISTRY' | 'MATHEMATICS' | 'GENERAL';

export interface BookmarkItem {
  readonly bookmarkId: string;
  readonly title: string;
  readonly subject: BookmarkSubject;
  readonly role?: string; // e.g. 'CORE1A', 'CORE1B', 'CORE2A', 'LESSON'
  readonly taskRef?: TaskRef;
  readonly route: string;
  readonly notes: string;
  readonly bookmarkedAt: string;
  readonly isWithdrawn?: boolean;
  readonly tombstoneNotice?: string;
}

const COLOR_PRIMARY = '#1a73e8';
const COLOR_SURFACE = '#ffffff';
const COLOR_TEXT = '#202124';
const COLOR_TEXT_MUTED = '#5f6368';
const COLOR_BORDER = '#dadce0';
const COLOR_ERROR = '#d93025';
const COLOR_WARNING = '#b06000';
const ELEVATION_CARD = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';

export class BookmarksPageController {
  private rootElement: HTMLElement | null = null;
  private bookmarks: BookmarkItem[] = [];
  private selectedSubject: 'ALL' | BookmarkSubject = 'ALL';
  private selectedRole: 'ALL' | string = 'ALL';
  private searchQuery = '';
  private onNavigate?: (route: string) => void;
  private onRemoveBookmark?: (bookmarkId: string) => void;
  private onUpdateNotes?: (bookmarkId: string, notes: string) => void;

  constructor(
    initialBookmarks: readonly BookmarkItem[] = [],
    callbacks?: {
      onNavigate?: (route: string) => void;
      onRemoveBookmark?: (bookmarkId: string) => void;
      onUpdateNotes?: (bookmarkId: string, notes: string) => void;
    }
  ) {
    this.bookmarks = [...initialBookmarks];
    this.onNavigate = callbacks?.onNavigate;
    this.onRemoveBookmark = callbacks?.onRemoveBookmark;
    this.onUpdateNotes = callbacks?.onUpdateNotes;
  }

  public getBookmarks(): readonly BookmarkItem[] {
    return this.bookmarks;
  }

  public setBookmarks(items: readonly BookmarkItem[]): void {
    this.bookmarks = [...items];
    this.render();
  }

  public addBookmark(item: BookmarkItem): void {
    // Avoid duplicate bookmark for the same route/item
    const exists = this.bookmarks.some((b) => b.bookmarkId === item.bookmarkId || b.route === item.route);
    if (!exists) {
      this.bookmarks.unshift(item);
      this.render();
    }
  }

  public removeBookmark(bookmarkId: string): void {
    this.bookmarks = this.bookmarks.filter((b) => b.bookmarkId !== bookmarkId);
    if (this.onRemoveBookmark) {
      this.onRemoveBookmark(bookmarkId);
    }
    this.render();
  }

  public updateNotes(bookmarkId: string, notes: string): void {
    const idx = this.bookmarks.findIndex((b) => b.bookmarkId === bookmarkId);
    if (idx !== -1) {
      const existing = this.bookmarks[idx];
      this.bookmarks[idx] = {
        ...existing,
        notes,
      };
      if (this.onUpdateNotes) {
        this.onUpdateNotes(bookmarkId, notes);
      }
      this.render();
    }
  }

  public setSubjectFilter(subject: 'ALL' | BookmarkSubject): void {
    this.selectedSubject = subject;
    this.render();
  }

  public setRoleFilter(role: 'ALL' | string): void {
    this.selectedRole = role;
    this.render();
  }

  public setSearchQuery(query: string): void {
    this.searchQuery = query.trim().toLowerCase();
    this.render();
  }

  public mount(container: HTMLElement): void {
    this.rootElement = container;
    this.render();
  }

  public getFilteredBookmarks(): readonly BookmarkItem[] {
    return this.bookmarks.filter((b) => {
      if (this.selectedSubject !== 'ALL' && b.subject !== this.selectedSubject) {
        return false;
      }
      if (this.selectedRole !== 'ALL' && b.role !== this.selectedRole) {
        return false;
      }
      if (this.searchQuery) {
        const titleMatch = b.title.toLowerCase().includes(this.searchQuery);
        const notesMatch = b.notes.toLowerCase().includes(this.searchQuery);
        const idMatch = b.taskRef?.id?.toLowerCase().includes(this.searchQuery);
        if (!titleMatch && !notesMatch && !idMatch) {
          return false;
        }
      }
      return true;
    });
  }

  public render(): void {
    if (!this.rootElement) return;

    const minHit = `${HIT_TARGET_MIN_PX}px`;
    const filtered = this.getFilteredBookmarks();

    const subjectFilters: Array<{ id: 'ALL' | BookmarkSubject; label: string }> = [
      { id: 'ALL', label: `All (${this.bookmarks.length})` },
      { id: 'PHYSICS', label: 'Physics' },
      { id: 'CHEMISTRY', label: 'Chemistry' },
      { id: 'MATHEMATICS', label: 'Mathematics' },
    ];

    const subjectFilterChipsHtml = subjectFilters
      .map((f) => {
        const isSelected = this.selectedSubject === f.id;
        return `
          <button type="button" class="subject-filter-chip" data-subject="${e(f.id)}" style="
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
          ">${e(f.label)}</button>
        `;
      })
      .join('');

    const itemsHtml =
      filtered.length === 0
        ? `
          <div class="empty-bookmarks-state" style="
            text-align: center;
            padding: 48px 16px;
            background-color: ${COLOR_SURFACE};
            border: 1px solid ${COLOR_BORDER};
            border-radius: 12px;
            margin: 16px 0;
          ">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; color: ${COLOR_TEXT};">No saved bookmarks matching filters</h3>
            <p style="margin: 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px;">
              Bookmark interesting challenges, concepts, or lesson steps to build your personal review list.
            </p>
          </div>
        `
        : filtered
            .map((item) => {
              const isWithdrawn = Boolean(item.isWithdrawn);
              const tombstoneMsg =
                item.tombstoneNotice ||
                'Item withdrawn from current release edition. Your bookmark and personal notes are preserved.';

              return `
                <article class="bookmark-card" data-bookmark-id="${e(item.bookmarkId)}" style="
                  background-color: ${COLOR_SURFACE};
                  border: 1px solid ${COLOR_BORDER};
                  border-radius: 12px;
                  padding: 16px;
                  box-shadow: ${ELEVATION_CARD};
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                ">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                        <span class="subject-badge" style="
                          background-color: #e8f0fe;
                          color: ${COLOR_PRIMARY};
                          font-size: 12px;
                          font-weight: 600;
                          padding: 3px 8px;
                          border-radius: 8px;
                        ">${e(item.subject)}</span>
                        ${
                          item.role
                            ? `
                          <span class="role-badge" style="
                            background-color: #f1f3f4;
                            color: #3c4043;
                            font-size: 12px;
                            font-weight: 600;
                            padding: 3px 8px;
                            border-radius: 8px;
                          ">${e(item.role)}</span>
                        `
                            : ''
                        }
                      </div>
                      <h4 style="margin: 4px 0 0 0; font-size: 16px; color: ${COLOR_TEXT}; line-height: 1.4;">
                        ${e(item.title)}
                      </h4>
                      ${
                        item.taskRef
                          ? `<span style="font-size: 12px; font-family: monospace; color: #888888;">ID: ${e(item.taskRef.id)}</span>`
                          : ''
                      }
                    </div>

                    <button type="button" class="remove-bookmark-btn" data-bookmark-id="${e(item.bookmarkId)}" aria-label="Remove bookmark" style="
                      min-width: ${minHit};
                      min-height: ${minHit};
                      border: none;
                      background: transparent;
                      color: ${COLOR_TEXT_MUTED};
                      font-size: 18px;
                      cursor: pointer;
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 50%;
                    " title="Remove bookmark">✕</button>
                  </div>

                  ${
                    isWithdrawn
                      ? `
                    <div class="withdrawn-tombstone-banner" role="alert" style="
                      background-color: #fff8e1;
                      border: 1px solid #ffe082;
                      border-radius: 8px;
                      padding: 10px 14px;
                      font-size: 13px;
                      color: ${COLOR_WARNING};
                      line-height: 1.4;
                    ">
                      <strong>⚠️ Notice:</strong> ${e(tombstoneMsg)}
                    </div>
                  `
                      : ''
                  }

                  <!-- User Notes Field -->
                  <div class="notes-container" style="
                    background: #f8f9fa;
                    border: 1px solid #e8eaed;
                    border-radius: 8px;
                    padding: 10px 12px;
                  ">
                    <label for="notes-${e(item.bookmarkId)}" style="display: block; font-size: 12px; font-weight: 600; color: ${COLOR_TEXT_MUTED}; margin-bottom: 4px;">
                      Personal Notes
                    </label>
                    <textarea id="notes-${e(item.bookmarkId)}" class="notes-input" data-bookmark-id="${e(item.bookmarkId)}" rows="2" style="
                      width: 100%;
                      box-sizing: border-box;
                      border: 1px solid ${COLOR_BORDER};
                      border-radius: 6px;
                      padding: 8px;
                      font-size: 13px;
                      font-family: inherit;
                      resize: vertical;
                    " placeholder="Add study notes, reminders, or questions here...">${e(item.notes)}</textarea>
                  </div>

                  <!-- Actions Row -->
                  <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px;">
                    ${
                      isWithdrawn
                        ? `
                      <button type="button" class="navigate-btn" disabled style="
                        min-height: ${minHit};
                        padding: 0 16px;
                        background-color: #f1f3f4;
                        color: #9aa0a6;
                        border: 1px solid #dadce0;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 500;
                        cursor: not-allowed;
                      ">Unavailable (Withdrawn)</button>
                    `
                        : `
                      <button type="button" class="navigate-btn" data-route="${e(item.route)}" style="
                        min-height: ${minHit};
                        padding: 0 16px;
                        background-color: ${COLOR_PRIMARY};
                        color: #ffffff;
                        border: none;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 500;
                        cursor: pointer;
                      ">Open Task →</button>
                    `
                    }
                  </div>
                </article>
              `;
            })
            .join('');

    this.rootElement.innerHTML = `
      <div class="bookmarks-page-container" style="
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px;
        box-sizing: border-box;
      ">
        <header style="margin-bottom: 24px;">
          <h2 style="margin: 0 0 8px 0; font-size: 24px; color: ${COLOR_TEXT};">Saved Bookmarks & Notes</h2>
          <p style="margin: 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px;">
            Personal library of bookmarked tasks, questions, and revision notes.
          </p>
        </header>

        <!-- Search and Subject Filters Row -->
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
          <div style="display: flex; gap: 8px;">
            <input type="search" class="bookmark-search-input" placeholder="Search saved titles or notes..." value="${e(this.searchQuery)}" style="
              flex: 1;
              min-height: ${minHit};
              border: 1px solid ${COLOR_BORDER};
              border-radius: 8px;
              padding: 0 16px;
              font-size: 14px;
              box-sizing: border-box;
            " />
          </div>
          <div class="subject-filters-row" style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${subjectFilterChipsHtml}
          </div>
        </div>

        <main class="bookmarks-list" style="display: flex; flex-direction: column; gap: 12px;">
          ${itemsHtml}
        </main>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    if (!this.rootElement || typeof this.rootElement.querySelectorAll !== 'function') return;

    // Subject filter chips
    const chips = this.rootElement.querySelectorAll<HTMLButtonElement>('.subject-filter-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const sub = chip.getAttribute('data-subject') as 'ALL' | BookmarkSubject;
        if (sub) {
          this.setSubjectFilter(sub);
        }
      });
    });

    // Search input
    const searchInput = this.rootElement.querySelector<HTMLInputElement>('.bookmark-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.setSearchQuery(searchInput.value);
      });
    }

    // Remove bookmark buttons
    const removeBtns = this.rootElement.querySelectorAll<HTMLButtonElement>('.remove-bookmark-btn');
    removeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-bookmark-id');
        if (id) {
          this.removeBookmark(id);
        }
      });
    });

    // Notes textarea changes
    const notesInputs = this.rootElement.querySelectorAll<HTMLTextAreaElement>('.notes-input');
    notesInputs.forEach((input) => {
      input.addEventListener('change', () => {
        const id = input.getAttribute('data-bookmark-id');
        if (id) {
          this.updateNotes(id, input.value);
        }
      });
    });

    // Navigate buttons
    const navBtns = this.rootElement.querySelectorAll<HTMLButtonElement>('.navigate-btn:not([disabled])');
    navBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const route = btn.getAttribute('data-route');
        if (route && this.onNavigate) {
          this.onNavigate(route);
        }
      });
    });
  }
}
