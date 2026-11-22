// A36 host-mounted personal study pages.
import type {PersonalStudyStore} from '../runtime/personal-study.ts';
import {Router} from '../app/router.ts';

export type PersonalTab='overview'|'progress'|'mistakes'|'bookmarks'|'settings';

export const el=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{
  const n=document.createElement(tag);
  if(text!==undefined)n.textContent=text;
  return n;
};

export interface PersonalContext{
  store:PersonalStudyStore;
  box:HTMLElement;
  action:(run:()=>Promise<unknown>,preserve?:()=>void)=>void;
  button:(parent:HTMLElement,label:string,run:()=>Promise<unknown>,id?:string,className?:string)=>HTMLButtonElement;
  launch:(r:import('../runtime/types.ts').Ref)=>Promise<unknown>;
}

export type RenderPersonal=(ctx:PersonalContext)=>Promise<void>;

const SVG_ICONS: Record<PersonalTab, string> = {
  overview: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  progress: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  mistakes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  bookmarks: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
};

const css=`
.g9-personal {
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
  overflow-wrap: anywhere;
  line-height: 1.6;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: clamp(1.25rem, 2.5vw, 2.5rem);
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #0f172a;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
}
.g9-personal * { box-sizing: border-box; min-width: 0; }
.g9-personal-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
}
.g9-personal-header-left { flex: 1 1 320px; }
.g9-personal-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.g9-personal-breadcrumb a {
  color: #0284c7;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s ease;
}
.g9-personal-breadcrumb a:hover { color: #0369a1; text-decoration: underline; }
.g9-personal-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 0.4rem;
}
.g9-personal h1.personal-hub-title {
  margin: 0;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
  display: flex;
  align-items: center;
  gap: 12px;
}
.g9-personal-sub {
  color: #64748b;
  font-size: 1.05rem;
  margin: 0 0 0.75rem;
  line-height: 1.5;
}
.g9-personal-meta-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 0.5rem;
}
.g9-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.g9-pill-hold {
  background: #f8fafc;
  color: #475569;
  border: 1px solid #cbd5e1;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
.g9-pill-storage {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  font-weight: 600;
}
.g9-pill-cas {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #e2e8f0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
.g9-pill-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #16a34a;
  display: inline-block;
}

/* 5-Tool Segmented Navigation Tabs */
.g9-personal-nav-wrap {
  margin-bottom: 2rem;
  max-width: 100%;
}
.g9-personal-tabs, .g9-personal .controls {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  background: #f1f5f9;
  padding: 6px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  max-width: 100%;
}
.g9-personal-tab-btn {
  font: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  min-height: 48px;
  min-width: 48px;
  max-width: 100%;
  padding: 10px 18px;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #64748b;
  background: transparent;
  transition: all 0.15s ease;
  white-space: normal;
  overflow-wrap: anywhere;
  flex: 1 1 150px;
}
.g9-personal-tab-btn:hover {
  color: #0f172a;
  background: rgba(255, 255, 255, 0.7);
}
.g9-personal-tab-btn[aria-selected="true"] {
  background: #0f172a !important;
  color: #ffffff !important;
  font-weight: 700;
  border-color: #0f172a !important;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.15);
}
.g9-personal-tab-btn[aria-selected="true"] svg {
  stroke: #38bdf8;
}

/* Tool Content Cards & Sections */
.g9-personal-tool-body {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: clamp(1.25rem, 2.5vw, 2.25rem);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}
.g9-personal-tool-body h2 {
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.5rem;
  letter-spacing: -0.015em;
}
.g9-personal-tool-body h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 1.5rem 0 0.75rem;
}
.g9-personal-tool-body p.subtext {
  color: #64748b;
  font-size: 0.98rem;
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

/* Universal Button Targets */
.g9-personal button {
  font: inherit;
  font-weight: 600;
  min-height: 48px;
  min-width: 48px;
  max-width: 100%;
  padding: 8px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #ffffff;
  color: #0f172a;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.15s ease;
  white-space: normal;
  overflow-wrap: anywhere;
}
.g9-personal button:hover:not(:disabled) {
  background: #f1f5f9;
  border-color: #94a3b8;
}
.g9-personal button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.g9-personal button.btn-primary {
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
  font-weight: 700;
}
.g9-personal button.btn-primary:hover:not(:disabled) {
  background: #1e293b;
  border-color: #1e293b;
}
.g9-personal button.btn-danger {
  background: #ffffff;
  color: #e11d48;
  border-color: #fecdd3;
}
.g9-personal button.btn-danger:hover:not(:disabled) {
  background: #fff1f2;
  border-color: #fda4af;
}
.g9-personal button[data-action=bookmark-save] {
  min-height: 48px;
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
  font-weight: 700;
}
.g9-personal button[data-action=bookmark-save]:hover:not(:disabled) {
  background: #0369a1;
}

.g9-personal-return-btn {
  min-height: 52px;
  min-width: 48px;
  padding: 12px 24px;
  background: #0f172a;
  color: #ffffff;
  border: 1px solid #1e293b;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.95rem;
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.1);
  transition: all 0.15s ease;
}
.g9-personal-return-btn:hover {
  background: #1e293b;
  border-color: #334155;
  box-shadow: 0 4px 8px rgba(15, 23, 42, 0.15);
}

/* Form Elements */
.g9-personal select, .g9-personal input[type=search], .g9-personal textarea {
  font: inherit;
  min-height: 48px;
  min-width: 48px;
  max-width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  background: #ffffff;
  color: #0f172a;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  white-space: normal;
}
.g9-personal select:focus, .g9-personal input[type=search]:focus, .g9-personal textarea:focus {
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}
.g9-personal textarea {
  width: 100%;
  min-height: 110px;
  line-height: 1.5;
  resize: vertical;
}
.g9-personal label {
  display: block;
  font-weight: 700;
  font-size: 0.95rem;
  color: #334155;
  margin: 1rem 0 0.5rem;
}

/* Card Articles */
.g9-personal article {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  margin: 1rem 0;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(15,23,42,0.03);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  overflow-wrap: anywhere;
  max-width: 100%;
}
.g9-personal article:hover {
  border-color: #cbd5e1;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
}
.g9-personal pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9rem;
  background: #0f172a;
  color: #38bdf8;
  padding: 1rem;
  border-radius: 8px;
  margin: 0.75rem 0;
  max-width: 100%;
}
.g9-personal :focus-visible {
  outline: 3px solid #0284c7;
  outline-offset: 2px;
}
.g9-personal [data-grid] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  max-width: 100%;
}
@media (min-width: 768px) {
  .g9-personal [data-grid] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
  overflow-wrap: anywhere;
}
.g9-personal select:focus, .g9-personal input[type=search]:focus, .g9-personal textarea:focus {
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}
.g9-personal textarea {
  width: 100%;
  min-height: 110px;
  line-height: 1.5;
  resize: vertical;
}
.g9-personal label {
  display: block;
  font-weight: 700;
  font-size: 0.95rem;
  color: #334155;
  margin: 1rem 0 0.5rem;
}

/* Card Articles */
.g9-personal article {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  margin: 1rem 0;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(15,23,42,0.03);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  overflow-wrap: anywhere;
  max-width: 100%;
}
.g9-personal article:hover {
  border-color: #cbd5e1;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
}
.g9-personal pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9rem;
  background: #0f172a;
  color: #38bdf8;
  padding: 1rem;
  border-radius: 8px;
  margin: 0.75rem 0;
  max-width: 100%;
}
.g9-personal :focus-visible {
  outline: 3px solid #0284c7;
  outline-offset: 2px;
}
.g9-personal [data-grid] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  max-width: 100%;
}
@media (min-width: 768px) {
  .g9-personal [data-grid] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
`;

export class PersonalPageHost {
  readonly #root: HTMLElement;
  readonly #store: PersonalStudyStore;
  readonly #router: Router;
  readonly #renderers: Readonly<Record<PersonalTab, RenderPersonal>>;
  #epoch = 0;
  #closed = false;
  #busy = false;
  #tab: PersonalTab = 'progress';
  #off: () => void;

  constructor(
    root: HTMLElement,
    store: PersonalStudyStore,
    router: Router,
    renderers: Readonly<Record<PersonalTab, RenderPersonal>>
  ) {
    this.#root = root;
    this.#store = store;
    this.#router = router;
    this.#renderers = renderers;
    this.#off = router.subscribe(() => this.close());
  }

  async open(tab: PersonalTab = 'progress') {
    if (this.#closed || this.#busy || !Object.hasOwn(this.#renderers, tab)) return false;
    this.#tab = tab;
    return this.#refresh();
  }

  #frame() {
    const box = el('main');
    box.className = 'g9-personal';

    // Header layout
    const header = el('div');
    header.className = 'g9-personal-header';

    const left = el('div');
    left.className = 'g9-personal-header-left';

    const breadcrumb = el('div');
    breadcrumb.className = 'g9-personal-breadcrumb';
    breadcrumb.innerHTML = `<a href="#/home">Curriculum Home</a> <span style="color:#94a3b8;font-size:0.8rem;">›</span> <span>Personal Study: ${this.#tab.toUpperCase()}</span>`;

    const titleRow = el('div');
    titleRow.className = 'g9-personal-title-row';

    const h1 = el('h1');
    h1.className = 'placeholder-title personal-hub-title';
    h1.innerHTML = `<span style="display:inline-flex;align-items:center;color:#0284c7;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg></span> <span>My Personal Study Hub</span>`;

    titleRow.append(h1);

    const sub = el(
      'p',
      'Review authenticated study history, recorded mistakes, saved problem bookmarks, and settings'
    );
    sub.className = 'g9-personal-sub';

    const pills = el('div');
    pills.className = 'g9-personal-meta-pills';
    pills.innerHTML = `
      <span class="g9-pill-badge g9-pill-hold">Academic Admission: HOLD</span>
      <span class="g9-pill-badge g9-pill-storage"><span class="g9-pill-dot"></span> IndexedDB Persistent Storage</span>
      <span class="g9-pill-badge g9-pill-cas">CAS: SHA-256</span>
      <span style="font-size:0.85rem;color:#64748b;font-style:italic;">Diagnostic evidence only · No exam-readiness inference</span>
    `;

    left.append(breadcrumb, titleRow, sub, pills);
    header.append(left);

    box.append(el('style', css), header);
    return box;
  }

  #hold(message: string) {
    const box = this.#frame();
    const holdCard = el('div');
    holdCard.className = 'g9-personal-tool-body';
    holdCard.style.textAlign = 'center';
    holdCard.style.padding = '3rem 1.5rem';

    const p = el('p', message);
    p.setAttribute('role', 'status');
    p.style.fontSize = '1.1rem';
    p.style.color = '#475569';
    p.style.marginBottom = '1.5rem';

    const b = el('button', 'Reload verified state');
    b.className = 'btn-primary';
    b.addEventListener('click', () => {
      void this.open(this.#tab);
    });

    holdCard.append(p, b);
    box.append(holdCard);
    this.#root.replaceChildren(box);
  }

  async #refresh() {
    if (this.#closed) return false;
    const epoch = ++this.#epoch;
    this.#hold('Checking personal evidence…');

    try {
      const p = await this.#store.profile();
      const box = this.#frame();
      box.style.fontSize = p.fontStep / 20 + 'em';

      // 5-Tool Segmented Navigation
      const navWrap = el('div');
      navWrap.className = 'g9-personal-nav-wrap';

      const nav = el('nav');
      nav.className = 'controls g9-personal-tabs';
      nav.setAttribute('aria-label', 'Personal study sections');
      nav.setAttribute('role', 'tablist');

      const tabs: readonly { tab: PersonalTab; label: string }[] = [
        { tab: 'overview', label: 'Overview' },
        { tab: 'progress', label: 'Progress Tracker' },
        { tab: 'mistakes', label: 'Mistakes Journal' },
        { tab: 'bookmarks', label: 'Saved Bookmarks' },
        { tab: 'settings', label: 'Settings' },
      ];

      for (const item of tabs) {
        const b = el('button');
        b.type = 'button';
        b.dataset.tab = item.tab;
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-pressed', String(item.tab === this.#tab));
        b.setAttribute('aria-selected', String(item.tab === this.#tab));
        b.className = 'g9-personal-tab-btn';
        b.innerHTML = `<span style="display:inline-flex;align-items:center;">${SVG_ICONS[item.tab]}</span> <span>${item.label}</span>`;

        b.addEventListener('click', (e) => {
          e.preventDefault();
          if (typeof window !== 'undefined') {
            try {
              history.replaceState(null, '', '#/personal/' + item.tab);
            } catch {}
          }
          void this.open(item.tab);
        });
        nav.append(b);
      }
      navWrap.append(nav);
      box.append(navWrap);

      // Tool Body Container
      const toolBody = el('div');
      toolBody.className = 'g9-personal-tool-body';

      const action = (run: () => Promise<unknown>, preserve?: () => void) => {
        void this.#act(epoch, run, preserve);
      };

      const button = (
        parent: HTMLElement,
        label: string,
        run: () => Promise<unknown>,
        id?: string,
        className?: string
      ) => {
        const b = el('button', label);
        b.type = 'button';
        if (id) b.dataset.action = id;
        if (className) b.className = className;
        b.addEventListener('click', () => action(run));
        parent.append(b);
        return b;
      };

      await this.#renderers[this.#tab]({
        store: this.#store,
        box: toolBody,
        action,
        button,
        launch: (r) =>
          this.#store.launch(r, this.#router, () => !this.#closed && epoch === this.#epoch),
      });

      box.append(toolBody);

      // Primary Return Button at bottom
      const returnBtn = el('button');
      returnBtn.type = 'button';
      returnBtn.className = 'g9-personal-return-btn';
      returnBtn.innerHTML = `<span>←</span> <span>Return to Curriculum Home</span>`;
      returnBtn.addEventListener('click', () => {
        if (typeof window !== 'undefined') {
          window.location.hash = '#/home';
        }
      });
      box.append(returnBtn);

      await this.#store.assertLive();
      if (this.#closed || epoch !== this.#epoch) return false;
      this.#root.replaceChildren(box);
      return true;
    } catch {
      if (!this.#closed && epoch === this.#epoch) {
        this.#hold(
          'Personal evidence unavailable or unauthorized. No unverified progress is displayed.'
        );
      }
      return false;
    }
  }

  async #act(epoch: number, run: () => Promise<unknown>, preserve?: () => void) {
    if (this.#closed || this.#busy || epoch !== this.#epoch) return;
    this.#busy = true;

    const box = this.#root.querySelector('.g9-personal')!;
    const status = el('p', 'Checking durable state…');
    status.setAttribute('role', 'status');
    status.style.cssText =
      'padding:10px 16px;background:#e0f2fe;color:#0369a1;border-radius:6px;font-weight:700;margin:1rem 0;';
    box.append(status);

    for (const n of box.querySelectorAll<
      HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >('button,input,textarea,select')) {
      n.disabled = true;
    }

    try {
      await run();
      if (!this.#closed && epoch === this.#epoch) {
        await this.#refresh();
        preserve?.();
      }
    } catch {
      if (!this.#closed && epoch === this.#epoch) {
        try {
          await this.#store.assertLive();
          status.textContent =
            'Operation not verified. No success claimed. Copy unsaved notes before reloading.';
          status.style.background = '#fee2e2';
          status.style.color = '#b91c1c';
          for (const n of box.querySelectorAll<HTMLTextAreaElement>('textarea')) {
            n.disabled = false;
          }
          const b = el('button', 'Reload verified state');
          b.className = 'btn-primary';
          b.addEventListener('click', () => {
            void this.open(this.#tab);
          });
          box.append(b);
        } catch {
          this.#hold('Personal authorization unavailable.');
        }
      }
    } finally {
      this.#busy = false;
    }
  }

  close() {
    if (this.#closed) return;
    this.#closed = true;
    this.#epoch++;
    this.#off();
    this.#root.replaceChildren();
  }
}
