// A13 diagnostic only. Compile-time interfaces are checked by tsc, not by the browser.
import { createDashboardScreen, mountDashboard } from '../pages/home.ts';
import { Core1ALessonPageController, mountCore1ALesson } from '../pages/lesson.ts';
import { Core1BTransferPageController, mountCore1BTransfer } from '../pages/transfer.ts';
import { QuestionPageController, mountQuestionPage } from '../pages/question.ts';
import { GcdrExplorerPageController, mountGcdrExplorer } from '../pages/explorer.ts';

interface DiagnosticReport {
  readonly version: '4.2.0';
  readonly uiFreezeStatus: 'NOT_FROZEN';
  readonly learnerUi: 'IMPLEMENTATION_AUTHORIZED';
  readonly academicAdmission: 'HOLD';
  readonly productionRelease: 'NONE';
  readonly diagnosticScript: 'INITIALIZED';
}

export function initializeBuildShell(): DiagnosticReport {
  const report: DiagnosticReport = {
    version: '4.2.0',
    uiFreezeStatus: 'NOT_FROZEN',
    learnerUi: 'IMPLEMENTATION_AUTHORIZED',
    academicAdmission: 'HOLD',
    productionRelease: 'NONE',
    diagnosticScript: 'INITIALIZED',
  };
  const diag = typeof document === 'undefined' ? null : document.getElementById('diagnostics');
  if (diag) {
    diag.textContent = `Diagnostic script: ${report.diagnosticScript}\nBuild shell version: ${report.version}\nUI freeze: ${report.uiFreezeStatus}\nLearner UI: ${report.learnerUi}\nAcademic admission: ${report.academicAdmission}\nProduction release: ${report.productionRelease}\nRuntime interfaces: compile-time only; not verified by this page.`;
    diag.dataset.initialized = 'true';
  }
  return report;
}

let activeDisposer: (() => void) | null = null;

export function mountRoute(targetHash: string, root: HTMLElement): void {
  if (activeDisposer) {
    activeDisposer();
    activeDisposer = null;
  }

  const clean = targetHash.replace(/^#\/?/, '').toLowerCase();

  const container = document.createElement('div');
  container.className = 'g9-runtime-container';
  container.style.cssText = 'min-width:0;max-width:100%;box-sizing:border-box;font-family:system-ui,sans-serif;';

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Global navigation');
  nav.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;padding:12px;background:#172c40;color:white;align-items:center;border-radius:6px;margin-bottom:16px;';
  nav.innerHTML = `
    <button type="button" data-route="#/home" style="min-height:48px;min-width:48px;padding:8px 16px;background:${clean === 'home' || !clean ? '#125d82' : '#2d4960'};color:white;border:none;border-radius:4px;cursor:pointer;font-weight:700;">🏠 Home Dashboard</button>
    <button type="button" data-route="#/learning/core1a" style="min-height:48px;min-width:48px;padding:8px 12px;background:${clean.includes('core1a') ? '#125d82' : '#2d4960'};color:white;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Core 1A Lesson</button>
    <button type="button" data-route="#/learning/core1b" style="min-height:48px;min-width:48px;padding:8px 12px;background:${clean.includes('core1b') ? '#125d82' : '#2d4960'};color:white;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Core 1B Transfer</button>
    <button type="button" data-route="#/learning/core2" style="min-height:48px;min-width:48px;padding:8px 12px;background:${clean.includes('core2') ? '#125d82' : '#2d4960'};color:white;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Core 2 Question</button>
    <button type="button" data-route="#/explorer" style="min-height:48px;min-width:48px;padding:8px 12px;background:${clean.includes('explorer') ? '#125d82' : '#2d4960'};color:white;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Explorer Simulation</button>
    <button type="button" data-route="#" style="min-height:48px;min-width:48px;padding:8px 12px;background:#374151;color:#cbd5e1;border:none;border-radius:4px;cursor:pointer;margin-left:auto;">📋 Diagnostic View</button>
  `;

  nav.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>('button');
    if (btn && btn.dataset.route !== undefined) {
      window.location.hash = btn.dataset.route;
    }
  });

  const content = document.createElement('div');
  content.className = 'g9-route-content';
  container.append(nav, content);
  root.replaceChildren(container);

  if (clean.includes('core1a')) {
    const controller = new Core1ALessonPageController();
    const m = mountCore1ALesson(content, controller);
    activeDisposer = () => m.dispose();
  } else if (clean.includes('core1b')) {
    const controller = new Core1BTransferPageController();
    const m = mountCore1BTransfer(content, controller);
    activeDisposer = () => m.dispose();
  } else if (clean.includes('core2')) {
    const controller = new QuestionPageController('phys', 'wpe');
    const m = mountQuestionPage(content, controller);
    activeDisposer = () => m.dispose();
  } else if (clean.includes('explorer')) {
    const controller = new GcdrExplorerPageController({
      explorerId: 'wpe-explorer-01',
      title: 'Work, Power & Energy — Interactive Explorer',
      subject: 'Physics',
      topic: 'Work, Power and Energy',
      helpers: {
        exactnessBadge: {
          fidelity: 'NUMERICAL_EXACT',
          binding: 'CANONICAL_BINDING',
          academicClaimDisclaimer: 'PROTECTED_FALSE_CLAIM',
        },
        chalkboardNote: 'PROTECTED_HELPER',
      },
    });
    const m = mountGcdrExplorer(content, controller);
    activeDisposer = () => m.dispose();
  } else {
    const controller = createDashboardScreen();
    const m = mountDashboard(content, controller, (route) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  }
}

export function handleNavigation(): void {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash;
  const search = window.location.search;
  const app = document.getElementById('app');
  if (!app) return;

  if (hash || search.includes('home') || search.includes('app') || search.includes('mode')) {
    mountRoute(hash || '#/home', app);
  } else {
    if (activeDisposer) {
      activeDisposer();
      activeDisposer = null;
    }
    app.innerHTML = `
      <h1>Grade9v4.2 Build Shell</h1>
      <p>Local static toolchain diagnostics. This is not a learner application or an approved release.</p>
      <div class="statuses" aria-label="Authority status">
        <span class="status" id="badge-ui-freeze">UI: NOT_FROZEN</span>
        <span class="status" id="badge-admission">ADMISSION: HOLD</span>
        <span class="status" id="badge-release">RELEASE: NONE</span>
      </div>
      <div id="diagnostics" role="status" aria-live="polite" data-initialized="false">Diagnostic script has not initialized. No runtime or build verification is claimed.</div>
    `;
    initializeBuildShell();
  }
}

if (typeof document !== 'undefined') {
  initializeBuildShell();
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => handleNavigation());
    const diag = document.getElementById('diagnostics');
    if (diag) {
      diag.style.cursor = 'pointer';
      diag.addEventListener('click', () => {
        window.location.hash = '#/home';
      });
    }
    if (window.location.hash || window.location.search) {
      handleNavigation();
    }
  }
}
