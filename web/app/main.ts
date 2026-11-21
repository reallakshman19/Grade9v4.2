// A13 diagnostic only. Compile-time interfaces are checked by tsc, not by the browser.
import { createDashboardScreen, mountDashboard, DEFAULT_CURRICULUM_REGISTRY } from '../pages/home.ts';
import { Core1ALessonPageController, mountCore1ALesson } from '../pages/lesson.ts';
import { Core1BTransferPageController, mountCore1BTransfer } from '../pages/transfer.ts';
import { Core1OrientationPageController, mountCore1Orientation } from '../pages/orientation.ts';
import { Core2ASupportedPageController, mountCore2ASupported } from '../pages/supported-practice.ts';
import { Core2BTransferPageController, mountCore2BTransfer } from '../pages/transfer-changed-demand.ts';
import { QuestionPageController, mountQuestionPage } from '../pages/question.ts';
import { GcdrExplorerPageController, mountGcdrExplorer } from '../pages/explorer.ts';
import { getExplorerConfig } from '../pages/explorer-catalog.ts';
import { createTopicScreen, mountTopicWorkspace, type TopicDetail, WPE_PHYSICS_TOPIC, PHY_MOTION_PLANE_TOPIC, PHY_CIRCULAR_BANKING_TOPIC, PHY_GRAVITATION_TOPIC, PHY_FLUIDS_TOPIC, PHY_MOTION_1D_TOPIC, PHY_NLM_TOPIC, PHY_VECTORS_TOPIC, MATH_POLYNOMIALS_TOPIC, MATH_EUCLID_TOPIC, MATH_RIEMANN_TOPIC, MATH_COORD_GEOM_TOPIC, MATH_THEORY_EQUATIONS_TOPIC, MATH_VECTORS_TOPIC, MATH_LINEAR_EQ_TOPIC, MATH_IMO_GRADE9_TOPIC, CHEM_REDOX_TOPIC, CHEM_BONDING_TOPIC, CHEM_STOICHIOMETRY_TOPIC, CHEM_GASES_TOPIC, BIO_LIVING_WORLD_TOPIC, BIO_LIFE_PROCESSES_TOPIC, BIO_COORDINATION_TOPIC, BIO_GENETICS_TOPIC, BIO_ENVIRONMENT_TOPIC } from '../pages/topic.ts';
import { createSubjectScreen, mountSubjectScreen, CHEMISTRY_SUBJECT_DETAIL, PHYSICS_SUBJECT_DETAIL, MATHEMATICS_SUBJECT_DETAIL, BIOLOGY_SUBJECT_DETAIL, type SubjectDetail } from '../pages/subject.ts';
import { createCompetitiveExamScreen, mountCompetitiveExam } from '../pages/competitive.ts';
import { PaperWorkspaceController, mountPaperWorkspace } from '../pages/paper.ts';
import { createAuthorizedIoqmPaperSession } from '../runtime/ioqm-session.ts';
import { createAuthorizedNsejsPaperSession } from '../runtime/nsejs-session.ts';
import { mountStandaloneLab } from '../pages/resources.ts';
import { mountLabsHub } from '../pages/labs-hub.ts';
import { mountChemistryCurriculum, ChemistryCurriculumController } from '../pages/chemistry-curriculum.ts';
import { mountChemistryHub, ChemistryHubController } from '../pages/chemistry-hub.ts';
import { mountNsejsChapterExplorer, NsejsCurriculumController } from '../pages/nsejs-curriculum.ts';
import { mountPhysicsLibrary, PhysicsLibraryController } from '../pages/physics-library.ts';
import { mountNsejsCore2Hub } from '../pages/nsejs-core2-hub.ts';
import { UniversalSearchPageController } from '../pages/search.ts';
import { createDiagnosticSearchEngineFactory } from '../runtime/search-factory.ts';
import { mountArchitectureHub } from '../pages/architecture.ts';
import { mountPersonalStudyPage, type PersonalTab } from '../pages/personal-study.ts';
import { createQuestionBankScreen, mountQuestionBankScreen } from '../pages/bank.ts';
import { UNIFIED_QUESTION_DATABASE } from '../runtime/unified-question-database.ts';
import { getOrCreateUniversalSearchModal } from '../components/universal-search-modal.ts';
import { Router } from './router.ts';
import { DEFAULT_APP_REGISTRY } from '../runtime/registry/index.ts';
import { escapeHtml } from '../runtime/rendering.ts';

interface DiagnosticReport {
  readonly version: '4.2.0';
  readonly uiFreezeStatus: 'NOT_FROZEN';
  readonly learnerUi: 'IMPLEMENTATION_AUTHORIZED';
  readonly academicAdmission: 'HOLD';
  readonly productionRelease: 'NONE';
  readonly diagnosticScript: 'INITIALIZED';
}

export function initializeBuildShell(): DiagnosticReport {
  return {
    version: '4.2.0',
    uiFreezeStatus: 'NOT_FROZEN',
    learnerUi: 'IMPLEMENTATION_AUTHORIZED',
    academicAdmission: 'HOLD',
    productionRelease: 'NONE',
    diagnosticScript: 'INITIALIZED',
  };
}

let activeDisposer: (() => void) | null = null;
const appRouter = new Router({ useHash: true });

export function buildGlobalNavigationHtml(clean: string, matchType: string): string {
  const isHome = matchType === 'HOME' || !clean || clean === 'home';
  const isBank = matchType === 'BANK' || clean === 'bank' || clean === 'question-bank';
  const isMath = clean.startsWith('subject/mathematics') || clean.startsWith('subject/math') || clean.startsWith('mathematics') || clean.startsWith('math') || clean.includes('/mathematics/') || clean.includes('/math/');
  const isPhys = clean.startsWith('subject/physics') || clean.startsWith('subject/phys') || clean.startsWith('physics') || clean.startsWith('phys') || clean.includes('/physics/') || clean.includes('/phys/') || clean === 'nsejs-physics';
  const isChem = clean.startsWith('subject/chemistry') || clean.startsWith('subject/chem') || clean.startsWith('chemistry') || clean.startsWith('chem') || clean.includes('/chemistry/') || clean.includes('/chem/');
  const isBio = clean.startsWith('subject/biology') || clean.startsWith('subject/bio') || clean.startsWith('biology') || clean.startsWith('bio') || clean.includes('/biology/') || clean.includes('/bio/');
  const isExam = matchType === 'COMPETITIVE' || clean.includes('competitive');
  const isLab = matchType === 'LAB' || matchType === 'LAB_HUB' || clean.includes('labs') || clean.includes('resources');
  const isPersonal = matchType === 'PERSONAL' || clean.includes('personal');
  const isArch = matchType === 'ARCHITECTURE' || clean.includes('architecture');
  const isSearch = matchType === 'SEARCH' || clean.includes('search');

  return `
    <a href="#/home" class="header-brand" style="min-height:48px;min-width:48px;padding:0 8px;font-weight:800;font-size:1.15rem;color:#38bdf8;margin-right:12px;letter-spacing:-0.01em;text-decoration:none;cursor:pointer;display:inline-flex;align-items:center;">Grade9 STEM</a>
    <button type="button" data-route="#/home" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isHome ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isHome ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">🏠 Home</button>
    <button type="button" id="nav-btn-math" data-route="#/subject/mathematics" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isMath ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isMath ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">📐 Mathematics</button>
    <button type="button" id="nav-btn-phys" data-route="#/subject/physics" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isPhys ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isPhys ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">⚛️ Physics</button>
    <button type="button" id="nav-btn-chem" data-route="#/subject/chemistry" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isChem ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isChem ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">🧪 Chemistry</button>
    <button type="button" id="nav-btn-bio" data-route="#/subject/biology" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isBio ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isBio ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">🧬 Biology</button>
    <button type="button" data-route="#/bank" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isBank ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isBank ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">📋 Question Bank</button>
    <button type="button" data-route="#/competitive/exam:nsejs" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isExam ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isExam ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">🏆 Competitive</button>
    <button type="button" data-route="#/labs" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isLab ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isLab ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">🔬 Standalone Labs</button>
    <button type="button" data-route="#/personal" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isPersonal ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isPersonal ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">📈 Personal Study</button>
    <button type="button" data-route="#/architecture" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isArch ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isArch ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;">🧭 Architecture</button>
    <button type="button" data-action="search-modal" data-route="#/search" style="min-height:48px;min-width:48px;padding:8px 14px;background:${isSearch ? '#0284c7' : '#1e293b'};color:white;border:1px solid ${isSearch ? '#38bdf8' : '#334155'};border-radius:6px;cursor:pointer;font-weight:700;font-size:0.92rem;margin-left:auto;">🔍 Search <span style="font-size:0.75rem;opacity:0.8;margin-left:4px;border:1px solid rgba(255,255,255,0.3);border-radius:3px;padding:1px 5px;font-family:sans-serif;">Ctrl K</span></button>
  `;
}

export function mountRoute(targetHash: string, root: HTMLElement): void {
  if (activeDisposer) {
    activeDisposer();
    activeDisposer = null;
  }

  const match = appRouter.match(targetHash || '#/home');
  const clean = targetHash.replace(/^#\/?/, '').toLowerCase();

  const container = document.createElement('div');
  container.className = 'g9-runtime-container';
  container.style.cssText = 'min-width:0;max-width:100%;box-sizing:border-box;font-family:var(--g9-font-family,system-ui,-apple-system,sans-serif);font-size:17px;line-height:1.6;color:#0f172a;';

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Global navigation');
  nav.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;padding:14px 20px;background:#0f172a;color:white;align-items:center;border-radius:8px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.15);';
  
  const isHome = match.type === 'HOME' || !clean || clean === 'home';
  const isBank = match.type === 'BANK' || clean === 'bank' || clean === 'question-bank';
  const isMath = clean.startsWith('subject/mathematics') || clean.startsWith('subject/math') || clean.startsWith('mathematics') || clean.startsWith('math') || clean.includes('/mathematics/') || clean.includes('/math/');
  const isPhys = clean.startsWith('subject/physics') || clean.startsWith('subject/phys') || clean.startsWith('physics') || clean.startsWith('phys') || clean.includes('/physics/') || clean.includes('/phys/') || clean === 'nsejs-physics';
  const isChem = clean.startsWith('subject/chemistry') || clean.startsWith('subject/chem') || clean.startsWith('chemistry') || clean.startsWith('chem') || clean.includes('/chemistry/') || clean.includes('/chem/');
  const isBio = clean.startsWith('subject/biology') || clean.startsWith('subject/bio') || clean.startsWith('biology') || clean.startsWith('bio') || clean.includes('/biology/') || clean.includes('/bio/');
  const isExam = match.type === 'COMPETITIVE' || clean.includes('competitive');
  const isLab = match.type === 'LAB' || match.type === 'LAB_HUB' || clean.includes('labs') || clean.includes('resources');
  const isPersonal = match.type === 'PERSONAL' || clean.includes('personal');
  const isArch = match.type === 'ARCHITECTURE' || clean.includes('architecture');
  const isSearch = match.type === 'SEARCH' || clean.includes('search');

  // Update document title based on route
  if (typeof document !== 'undefined') {
    if (isHome) document.title = 'Grade9 STEM · Interactive Curriculum Hub';
    else if (isBank) document.title = 'Question Bank · Grade9 STEM';
    else if (isMath) document.title = 'Mathematics · Grade9 STEM';
    else if (isPhys) document.title = 'Physics · Grade9 STEM';
    else if (isChem) document.title = 'Chemistry Hub · Grade9 STEM';
    else if (isBio) document.title = 'Biology · Grade9 STEM';
    else if (isExam) document.title = 'Competitive Exams · Grade9 STEM';
    else if (isLab) document.title = 'Standalone Labs · Grade9 STEM';
    else if (isPersonal) document.title = 'Personal Study · Grade9 STEM';
    else if (isArch) document.title = 'Architecture Hub · Grade9 STEM';
    else document.title = 'Grade9 STEM Platform';
  }

  nav.innerHTML = buildGlobalNavigationHtml(clean, match.type);

  nav.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>('button');
    if (btn) {
      if (btn.dataset.action === 'search-modal') {
        const modal = getOrCreateUniversalSearchModal();
        modal.open();
        return;
      }
      if (btn.dataset.route !== undefined) {
        window.location.hash = btn.dataset.route;
      }
    }
  });

  const content = document.createElement('div');
  content.className = 'g9-route-content';
  content.style.cssText = 'min-width:0;max-width:100%;box-sizing:border-box;';
  container.append(nav, content);
  root.replaceChildren(container);

  // Dispatch route based on Router match
  if (match.type === 'TOPIC' || match.type === 'TOPIC_TAB') {
    const subjId = match.params.subjectId?.toLowerCase() || '';
    const topId = match.params.topicId?.toLowerCase() || '';
    const activeTab = match.params.tab || 'questions';

    if (subjId === 'physics' || subjId === 'phys') {
      let topicDetail: TopicDetail | null = null;
      if (topId.includes('1d') || topId === 'motion-1d') topicDetail = PHY_MOTION_1D_TOPIC;
      else if (topId.includes('fluid') || topId.includes('thrust') || topId.includes('pressure')) topicDetail = PHY_FLUIDS_TOPIC;
      else if (topId.includes('nlm') || topId.includes('newton') || topId.includes('force')) topicDetail = PHY_NLM_TOPIC;
      else if (topId.includes('vec')) topicDetail = PHY_VECTORS_TOPIC;
      else if (topId.includes('motion') || topId.includes('plane') || topId.includes('kin')) topicDetail = PHY_MOTION_PLANE_TOPIC;
      else if (topId.includes('circular') || topId.includes('bank')) topicDetail = PHY_CIRCULAR_BANKING_TOPIC;
      else if (topId.includes('grav')) topicDetail = PHY_GRAVITATION_TOPIC;
      else if (topId.includes('wpe') || topId.includes('work') || topId.includes('energy')) topicDetail = WPE_PHYSICS_TOPIC;

      if (topicDetail) {
        const topicController = createTopicScreen(topicDetail);
        const m = mountTopicWorkspace(content, topicController, activeTab, (route) => {
          window.location.hash = '#' + route;
        });
        activeDisposer = () => m.dispose();
      } else {
        renderTopicWorkspacePlaceholder(content, match.params.subjectId, match.params.topicId, match.params.tab);
      }
    } else if (subjId === 'mathematics' || subjId === 'math') {
      let topicDetail: TopicDetail | null = null;
      if (topId.includes('coord') || topId.includes('cartesian')) topicDetail = MATH_COORD_GEOM_TOPIC;
      else if (topId.includes('euclid') || topId.includes('circle')) topicDetail = MATH_EUCLID_TOPIC;
      else if (topId.includes('poly') || topId.includes('remainder')) topicDetail = MATH_POLYNOMIALS_TOPIC;
      else if (topId.includes('theor') || (topId.includes('equation') && !topId.includes('linear'))) topicDetail = MATH_THEORY_EQUATIONS_TOPIC;
      else if (topId.includes('vec')) topicDetail = MATH_VECTORS_TOPIC;
      else if (topId.includes('linear')) topicDetail = MATH_LINEAR_EQ_TOPIC;
      else if (topId.includes('imo') || topId.includes('olympiad')) topicDetail = MATH_IMO_GRADE9_TOPIC;
      else if (topId.includes('riemann') || topId.includes('sum')) topicDetail = MATH_RIEMANN_TOPIC;

      if (topicDetail) {
        const topicController = createTopicScreen(topicDetail);
        const m = mountTopicWorkspace(content, topicController, activeTab, (route) => {
          window.location.hash = '#' + route;
        });
        activeDisposer = () => m.dispose();
      } else {
        renderTopicWorkspacePlaceholder(content, match.params.subjectId, match.params.topicId, match.params.tab);
      }
    } else if (subjId === 'chemistry' || subjId === 'chem') {
      let topicDetail: TopicDetail | null = null;
      if (topId.includes('redox')) topicDetail = CHEM_REDOX_TOPIC;
      else if (topId.includes('bond')) topicDetail = CHEM_BONDING_TOPIC;
      else if (topId.includes('gases') || topId.includes('gas')) topicDetail = CHEM_GASES_TOPIC;
      else if (topId.includes('stoich') || topId.includes('titrat') || topId.includes('mole')) topicDetail = CHEM_STOICHIOMETRY_TOPIC;

      if (topicDetail) {
        const topicController = createTopicScreen(topicDetail);
        const m = mountTopicWorkspace(content, topicController, activeTab, (route) => {
          window.location.hash = '#' + route;
        });
        activeDisposer = () => m.dispose();
      } else {
        renderTopicWorkspacePlaceholder(content, match.params.subjectId, match.params.topicId, match.params.tab);
      }
    } else if (subjId === 'biology' || subjId === 'bio') {
      let topicDetail: TopicDetail | null = null;
      if (topId.includes('living') || topId.includes('cell') || topId.includes('world') || topId.includes('organ')) topicDetail = BIO_LIVING_WORLD_TOPIC;
      else if (topId.includes('process') || topId.includes('life') || topId.includes('nephron')) topicDetail = BIO_LIFE_PROCESSES_TOPIC;
      else if (topId.includes('coord') || topId.includes('neuro') || topId.includes('immun')) topicDetail = BIO_COORDINATION_TOPIC;
      else if (topId.includes('genet') || topId.includes('hered')) topicDetail = BIO_GENETICS_TOPIC;
      else if (topId.includes('env') || topId.includes('ecol')) topicDetail = BIO_ENVIRONMENT_TOPIC;
      else topicDetail = BIO_LIVING_WORLD_TOPIC;

      if (topicDetail) {
        const topicController = createTopicScreen(topicDetail);
        const m = mountTopicWorkspace(content, topicController, activeTab, (route) => {
          window.location.hash = '#' + route;
        });
        activeDisposer = () => m.dispose();
      } else {
        renderTopicWorkspacePlaceholder(content, match.params.subjectId, match.params.topicId, match.params.tab);
      }
    } else {
      renderTopicWorkspacePlaceholder(content, match.params.subjectId, match.params.topicId, match.params.tab);
    }
  } else if (clean.includes('core1a') || (match.type === 'ROLE' && match.params.coreRole?.toUpperCase() === 'CORE1A')) {
    const topicCode = match.query.topic || match.params.topicId;
    const controller = new Core1ALessonPageController({ topicCode });
    const m = mountCore1ALesson(content, controller);
    activeDisposer = () => m.dispose();
  } else if (clean.includes('core1b') || (match.type === 'ROLE' && match.params.coreRole?.toUpperCase() === 'CORE1B')) {
    const topicCode = match.query.topic || match.params.topicId;
    const controller = new Core1BTransferPageController({ topicCode });
    const m = mountCore1BTransfer(content, controller);
    activeDisposer = () => m.dispose();
  } else if ((clean.includes('core1') && !clean.includes('core1a') && !clean.includes('core1b')) || (match.type === 'ROLE' && match.params.coreRole?.toUpperCase() === 'CORE1')) {
    const controller = new Core1OrientationPageController();
    const m = mountCore1Orientation(content, controller);
    activeDisposer = () => m.dispose();
  } else if (clean.includes('core2a') || (match.type === 'ROLE' && match.params.coreRole?.toUpperCase() === 'CORE2A')) {
    const controller = new Core2ASupportedPageController();
    const m = mountCore2ASupported(content, controller);
    activeDisposer = () => m.dispose();
  } else if (clean.includes('core2b') || (match.type === 'ROLE' && match.params.coreRole?.toUpperCase() === 'CORE2B')) {
    const controller = new Core2BTransferPageController();
    const m = mountCore2BTransfer(content, controller);
    activeDisposer = () => m.dispose();
  } else if (clean.includes('competitive/core2') || clean.includes('nsejs-core2') || clean === 'core2' || clean.includes('core2-hub')) {
    const m = mountNsejsCore2Hub(content, (route: string) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (match.type === 'BANK' || clean === 'bank' || clean === 'question-bank') {
    const controller = createQuestionBankScreen();
    if (Object.keys(match.query).length > 0) {
      const searchParams = new URLSearchParams(match.query);
      controller.loadFromUrlParams(searchParams);
    }
    const m = mountQuestionBankScreen(content, controller, (route) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (match.type === 'QUESTION' || clean.startsWith('question/') || clean === 'question' || (clean.includes('core2') && !clean.includes('core2a') && !clean.includes('core2b')) || (match.type === 'ROLE' && match.params.coreRole?.toUpperCase() === 'CORE2')) {
    const qid = match.params.questionId || (clean.startsWith('question/') ? clean.replace(/^question\//, '') : '');
    const entry = qid ? UNIFIED_QUESTION_DATABASE.getById(qid) : undefined;
    const controller = new QuestionPageController(
      entry?.subjectCode ? String(entry.subjectCode).toLowerCase() : 'phys',
      entry?.topicCode ? String(entry.topicCode).toLowerCase() : 'wpe'
    );
    if (entry) {
      const qHints = (entry.hints && entry.hints.length > 0)
        ? entry.hints.filter((h: string) => h && h.trim().length > 0).map((h: string, i: number) => ({ id: `hint-${i+1}`, text: h, penaltyPercent: 0 }))
        : [];
      controller.loadQuestion({
        id: entry.id,
        code: entry.code,
        title: entry.title,
        stemText: entry.stem,
        kind: entry.kind === 'MULTIPLE_CHOICE' ? 'MULTIPLE_CHOICE' : (entry.kind === 'NUMERIC_QUANTITY' || entry.kind === 'INTEGER') ? 'NUMERIC_QUANTITY' : 'SINGLE_CHOICE',
        options: entry.options ? entry.options.map(o => ({ id: o.id, text: o.text })) : undefined,
        status: entry.status,
        keyStatus: 'VERIFIED',
        maxPoints: entry.maxPoints,
        figures: entry.figures ? entry.figures.map(f => ({ id: f.id, caption: f.caption, available: f.available })) : [],
        hints: qHints,
        solutionSteps: entry.steps && entry.steps.length > 0 ? entry.steps : undefined,
        explanationHtml: entry.steps && entry.steps.length > 0 ? entry.steps.join('<br>') : undefined,
        limitingCheck: (entry as any).limitingCheck || (entry as any).check || undefined,
        correctKey: (entry as any).correctKey || undefined,
      });
    }
    const m = mountQuestionPage(content, controller);
    activeDisposer = () => m.dispose();
  } else if (match.type === 'EXPLORER' || clean.includes('explorer') || (match.type === 'ROLE' && match.params.coreRole?.toUpperCase() === 'EXPLORER')) {
    const explorerId = match.params.explorerId || (clean.startsWith('explorer/') ? clean.replace(/^explorer\//, '') : 'wpe-explorer-01');
    const config = getExplorerConfig(explorerId);
    const controller = new GcdrExplorerPageController(config);
    const m = mountGcdrExplorer(content, controller);
    activeDisposer = () => m.dispose();
  } else if (clean === 'chemistry' || clean.includes('chemistry-hub') || clean.includes('hub/chemistry')) {
    const controller = new ChemistryHubController();
    const m = mountChemistryHub(content, controller, (route: string) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (clean.includes('curriculum/chemistry') || clean.includes('chemistry-curriculum')) {
    const controller = new ChemistryCurriculumController();
    const m = mountChemistryCurriculum(content, controller, (route: string) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (clean.includes('curriculum/nsejs-physics') || clean.includes('nsejs-curriculum') || clean === 'nsejs-physics') {
    const controller = new NsejsCurriculumController();
    const parts = clean.split('/');
    if (parts.length >= 3) {
      const chId = parts[2].toUpperCase();
      controller.setSelectedChapter(chId);
      if (parts.length >= 4) {
        controller.setSelectedSubtopicId(parts[3]);
      }
    }
    const m = mountNsejsChapterExplorer(content, controller, (route: string) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (clean.includes('physics-library') || clean.includes('library/physics') || clean === 'library') {
    const controller = new PhysicsLibraryController();
    const m = mountPhysicsLibrary(content, controller, (route: string) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (match.type === 'SUBJECT') {
    const sId = match.params.subjectId?.toLowerCase() || '';
    if (sId === 'mathematics' || sId === 'math') {
      const controller = createSubjectScreen(MATHEMATICS_SUBJECT_DETAIL);
      const m = mountSubjectScreen(content, controller, (route) => {
        window.location.hash = '#' + route;
      });
      activeDisposer = () => m.dispose();
    } else if (sId === 'physics' || sId === 'phys') {
      const controller = createSubjectScreen(PHYSICS_SUBJECT_DETAIL);
      const m = mountSubjectScreen(content, controller, (route) => {
        window.location.hash = '#' + route;
      });
      activeDisposer = () => m.dispose();
    } else if (sId === 'chemistry' || sId === 'chem') {
      const controller = createSubjectScreen(CHEMISTRY_SUBJECT_DETAIL);
      const m = mountSubjectScreen(content, controller, (route) => {
        window.location.hash = '#' + route;
      });
      activeDisposer = () => m.dispose();
    } else if (sId === 'biology' || sId === 'bio') {
      const controller = createSubjectScreen(BIOLOGY_SUBJECT_DETAIL);
      const m = mountSubjectScreen(content, controller, (route) => {
        window.location.hash = '#' + route;
      });
      activeDisposer = () => m.dispose();
    } else {
      renderSubjectPlaceholder(content, match.params.subjectId);
    }
  } else if (match.type === 'COMPETITIVE') {
    const examId = match.params.examId || 'exam:nsejs';
    const controller = createCompetitiveExamScreen(examId);
    const m = mountCompetitiveExam(content, controller, (route) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (match.type === 'PRACTICE') {
    if (match.params.paperId?.toLowerCase().includes('ioqm')) {
      void createAuthorizedIoqmPaperSession().then(async ({ config, binding }) => {
        const controller = new PaperWorkspaceController(config, binding);
        await controller.restore();
        const m = mountPaperWorkspace(content, controller, (route) => {
          window.location.hash = '#' + route;
        });
        activeDisposer = () => m.dispose();
      });
    } else if (match.params.paperId?.toLowerCase().includes('nsejs')) {
      void createAuthorizedNsejsPaperSession().then(async ({ config, binding }) => {
        const controller = new PaperWorkspaceController(config, binding);
        await controller.restore();
        const m = mountPaperWorkspace(content, controller, (route) => {
          window.location.hash = '#' + route;
        });
        activeDisposer = () => m.dispose();
      });
    } else {
      renderPracticePaperPlaceholder(content, match.params.paperId);
    }
  } else if (match.type === 'LAB_HUB') {
    const m = mountLabsHub(content, undefined, (route) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (match.type === 'LAB') {
    const m = mountStandaloneLab(content, match.params.labId, (route) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (match.type === 'PERSONAL') {
    const tabParam = match.params.tab?.toLowerCase();
    const validTab = (['overview', 'progress', 'mistakes', 'bookmarks', 'settings'].includes(tabParam || '')
      ? tabParam
      : 'overview') as PersonalTab;
    mountPersonalStudyPage(content, validTab, (route) => {
      window.location.hash = '#' + route;
    }).then((m) => {
      activeDisposer = () => m.dispose();
    }).catch((err) => {
      console.error('PERSONAL MOUNT ERROR:', err);
    });
  } else if (match.type === 'ARCHITECTURE') {
    const m = mountArchitectureHub(content, match.params.docId, (route) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  } else if (match.type === 'SEARCH') {
    const factory = createDiagnosticSearchEngineFactory();
    const searchController = new UniversalSearchPageController(content, appRouter, factory);
    activeDisposer = () => {
      searchController.close();
    };
    const targetPath = appRouter.toHref('/search' + (match.query.q !== undefined ? '?q=' + encodeURIComponent(match.query.q) : ''));
    void searchController.open(targetPath);
  } else if (match.type === 'NOT_FOUND') {
    renderNotFoundScreen(content, match.path);
  } else {
    // Default to Curriculum Dashboard
    const controller = createDashboardScreen(DEFAULT_CURRICULUM_REGISTRY, DEFAULT_APP_REGISTRY);
    const m = mountDashboard(content, controller, (route) => {
      window.location.hash = '#' + route;
    });
    activeDisposer = () => m.dispose();
  }
}

function renderSubjectPlaceholder(root: HTMLElement, subjectId: string): void {
  const subj = DEFAULT_APP_REGISTRY.subjects.find(s => s.id === subjectId || s.code.toLowerCase() === subjectId.toLowerCase());
  const name = subj ? subj.name : subjectId;
  const topics = DEFAULT_APP_REGISTRY.topics.filter(t => t.subjectId === (subj ? subj.id : subjectId));

  root.innerHTML = `
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:2rem;max-width:100%;box-sizing:border-box;">
      <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:1rem;">
        <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; <span>Subject: ${escapeHtml(name)}</span>
      </div>
      <h1 class="placeholder-title" style="margin:0 0 0.5rem;font-size:2rem;font-weight:800;color:#0f172a;">${subj?.code === 'PHYSICS' ? '⚛️ ' : subj?.code === 'CHEMISTRY' ? '🧪 ' : '📐 '}${escapeHtml(name)} Curriculum</h1>
      <p style="color:#475569;font-size:1.1rem;margin:0 0 1.5rem;">${escapeHtml(subj?.tagline || 'Subject topics and interactive learning workspaces')}</p>
      
      <div style="margin-bottom:2rem;">
        <h2 style="font-size:1.35rem;font-weight:700;color:#0f172a;margin-bottom:1rem;">Curriculum Topics (${topics.length})</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:1rem;">
          ${topics.map(t => `
            <div style="border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;background:#f8fafc;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">${escapeHtml(t.code)}</span>
                <h3 style="margin:0.5rem 0 0.25rem;font-size:1.15rem;color:#0f172a;">${escapeHtml(t.title)}</h3>
                <p style="margin:0 0 1rem;font-size:0.9rem;color:#64748b;">${t.indexedQuestionCount} Indexed Practice Items ${t.hasExplorer ? '· 🔬 Explorer Available' : ''}</p>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;">
                <button type="button" onclick="window.location.hash='#/subject/${subj ? subj.code.toLowerCase() : 'physics'}/topic/${t.code.toLowerCase()}/questions'" style="min-height:48px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.9rem;">Question Bank</button>
                <button type="button" onclick="window.location.hash='#/subject/${subj ? subj.code.toLowerCase() : 'physics'}/topic/${t.code.toLowerCase()}/learn-try'" style="min-height:48px;padding:8px 12px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.9rem;">Learn &amp; Try</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <button type="button" onclick="window.location.hash='#/home'" style="min-height:56px;padding:12px 24px;background:#0f172a;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;">← Return to Curriculum Home</button>
    </div>
  `;
}

function renderTopicWorkspacePlaceholder(root: HTMLElement, subjectId: string, topicId: string, activeTab?: string): void {
  const tab = activeTab || 'questions';
  root.innerHTML = `
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:2rem;max-width:100%;box-sizing:border-box;">
      <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:1rem;">
        <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
        <a href="#/subject/${encodeURIComponent(subjectId)}" style="color:#0284c7;text-decoration:none;font-weight:600;">${escapeHtml(subjectId.toUpperCase())}</a> &gt; 
        <span>Topic: ${escapeHtml(topicId.toUpperCase())}</span>
      </div>

      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid #e2e8f0;">
        <div>
          <h1 class="placeholder-title" style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">Topic Workspace: ${escapeHtml(topicId.toUpperCase())}</h1>
          <p style="margin:0.25rem 0 0;color:#64748b;">Subject: ${escapeHtml(subjectId.toUpperCase())} · Progress: 42% Completed</p>
        </div>
        <button type="button" onclick="window.location.hash='#/subject/${encodeURIComponent(subjectId)}'" style="min-height:48px;padding:8px 16px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;">← Back to ${escapeHtml(subjectId.toUpperCase())}</button>
      </div>

      <!-- 4 Canonical Workspace Tabs -->
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:2rem;border-bottom:2px solid #e2e8f0;padding-bottom:12px;" role="tablist">
        <button type="button" onclick="window.location.hash='#/subject/${encodeURIComponent(subjectId)}/topic/${encodeURIComponent(topicId)}/questions'" style="min-height:48px;padding:10px 18px;background:${tab === 'questions' ? '#0284c7' : '#f1f5f9'};color:${tab === 'questions' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">1. 📋 Question Bank (Core 2)</button>
        <button type="button" onclick="window.location.hash='#/subject/${encodeURIComponent(subjectId)}/topic/${encodeURIComponent(topicId)}/learn-try'" style="min-height:48px;padding:10px 18px;background:${tab === 'learn-try' ? '#0284c7' : '#f1f5f9'};color:${tab === 'learn-try' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">2. 💡 Learn &amp; Try (Core 1A / 1B)</button>
        <button type="button" onclick="window.location.hash='#/subject/${encodeURIComponent(subjectId)}/topic/${encodeURIComponent(topicId)}/explorer'" style="min-height:48px;padding:10px 18px;background:${tab === 'explorer' ? '#0284c7' : '#f1f5f9'};color:${tab === 'explorer' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">3. 🔬 Explorer Simulation</button>
        <button type="button" onclick="window.location.hash='#/subject/${encodeURIComponent(subjectId)}/topic/${encodeURIComponent(topicId)}/labs'" style="min-height:48px;padding:10px 18px;background:${tab === 'labs' ? '#0284c7' : '#f1f5f9'};color:${tab === 'labs' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">4. 🧰 Standalone Labs</button>
      </div>

      <!-- Tab Content Placeholder -->
      <div class="placeholder-box" style="background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px;padding:2rem;text-align:center;">
        <h3 style="margin:0 0 0.5rem;font-size:1.35rem;color:#0f172a;">Active Tab: ${escapeHtml(tab.toUpperCase())}</h3>
        <p style="color:#64748b;max-width:600px;margin:0 auto 1.5rem;">
          ${tab === 'questions' ? 'Houses authentic original questions with strict assessment-policy scoring after verified response commitment.' :
            tab === 'learn-try' ? 'Houses 9-unit progressive concept construction (Core 1A) and 7-stage phenomenological reconstruction (Core 1B).' :
            tab === 'explorer' ? 'Houses 10-stage GCDR interactive simulation runtime with dynamic parameter sliders and real-time phase space plots.' :
            'Houses isolated sandbox simulations and portable workbench packages.'}
        </p>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
          ${tab === 'questions' ? `<button type="button" onclick="window.location.hash='#/learning/core2'" style="min-height:56px;padding:12px 24px;background:#0284c7;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;">Open Core 2 Question Workspace →</button>` : ''}
          ${tab === 'learn-try' ? `<button type="button" onclick="window.location.hash='#/learning/core1a'" style="min-height:56px;padding:12px 24px;background:#0284c7;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;">Launch Core 1A Lesson →</button><button type="button" onclick="window.location.hash='#/learning/core1b'" style="min-height:56px;padding:12px 24px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:8px;cursor:pointer;font-weight:700;">Launch Core 1B Transfer →</button>` : ''}
          ${tab === 'explorer' ? `<button type="button" onclick="window.location.hash='#/explorer'" style="min-height:56px;padding:12px 24px;background:#0284c7;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;">Open Explorer Simulation →</button>` : ''}
          ${tab === 'labs' ? `<button type="button" onclick="window.location.hash='#/labs/lab:circles-master'" style="min-height:56px;padding:12px 24px;background:#0284c7;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;">Launch Circles Master Lab →</button>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderCompetitiveExamPlaceholder(root: HTMLElement, examId: string): void {
  const exam = DEFAULT_APP_REGISTRY.competitiveExams.find(e => e.id === examId || e.code.toLowerCase() === examId.toLowerCase());
  const title = exam ? exam.title : examId;
  const isHold = exam ? exam.availability !== 'AVAILABLE' : false;

  root.innerHTML = `
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:2rem;max-width:100%;box-sizing:border-box;">
      <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:1rem;">
        <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; <span>Competitive Exam: ${escapeHtml(title)}</span>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:0.5rem;">
        <span style="font-size:0.875rem;font-weight:800;background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;">${escapeHtml(exam ? exam.category : 'OLYMPIAD')}</span>
        <span style="font-size:0.875rem;font-weight:700;background:#f1f5f9;color:#64748b;padding:2px 8px;border-radius:4px;">Conducting Body: ${escapeHtml(exam ? exam.conductingBody : 'HBCSE')}</span>
      </div>
      <h1 class="placeholder-title" style="margin:0 0 0.5rem;font-size:2rem;font-weight:800;color:#0f172a;">🏆 ${escapeHtml(title)}</h1>
      <p style="color:#475569;font-size:1.1rem;margin:0 0 1.5rem;">Authentic previous-year examination papers, problem decks, and multi-disciplinary challenges</p>
      
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;margin-bottom:2rem;">
        <h3 style="margin:0 0 0.75rem;font-size:1.2rem;color:#0f172a;">Available Past Papers</h3>
        <p style="color:#64748b;font-size:0.95rem;margin:0 0 1rem;">
          ${exam && exam.availableYears.length > 0 ? `Authenticated paper years: ${exam.availableYears.join(', ')}` : 'Syllabus and papers currently scheduled for Phase 3/4 Ingestion.'}
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:10px;">
          ${(exam?.availableYears || [2024, 2023, 2022]).map(yr => `
            <button type="button" style="min-height:48px;padding:8px 16px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;color:#0f172a;cursor:pointer;">${yr} Exam Paper</button>
          `).join('')}
        </div>
      </div>

      <button type="button" onclick="window.location.hash='#/home'" style="min-height:56px;padding:12px 24px;background:#0f172a;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;">← Return to Curriculum Home</button>
    </div>
  `;
}

function renderPracticePaperPlaceholder(root: HTMLElement, paperId: string): void {
  const paper = DEFAULT_APP_REGISTRY.papers.find(p => p.id === paperId || p.canonicalRoute.includes(paperId));
  const title = paper ? paper.title : paperId;

  root.innerHTML = `
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:2rem;max-width:100%;box-sizing:border-box;">
      <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:1rem;">
        <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; <span>Practice Paper: ${escapeHtml(title)}</span>
      </div>
      <h1 style="margin:0 0 0.5rem;font-size:2rem;font-weight:800;color:#0f172a;">📝 ${escapeHtml(title)}</h1>
      <p style="color:#475569;font-size:1.1rem;margin:0 0 1.5rem;">Full-length timed assessment paper with section navigation and digital ink scratchpad</p>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;margin-bottom:2rem;">
        <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:1rem;">
          <span>⏱ Duration: <strong>${paper?.durationMinutes || 120} Mins</strong></span>
          <span>📋 Questions: <strong>${paper?.questionCount || 60}</strong></span>
          <span>⭐ Total Marks: <strong>${paper?.totalMarks || 216}</strong></span>
        </div>
        <p style="color:#64748b;margin:0;">
          Status: <strong>Content under review (HOLD)</strong>. Scheduled for formal validation before enabling live timer.
        </p>
      </div>

      <button type="button" onclick="window.location.hash='#/home'" style="min-height:56px;padding:12px 24px;background:#0f172a;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;">← Return to Curriculum Home</button>
    </div>
  `;
}

function renderStandaloneLabPlaceholder(root: HTMLElement, labId: string): void {
  const lab = DEFAULT_APP_REGISTRY.standaloneLabs.find(l => l.id === labId || l.canonicalRoute.includes(labId));
  const title = lab ? lab.title : labId;

  root.innerHTML = `
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:2rem;max-width:100%;box-sizing:border-box;">
      <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:1rem;">
        <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; <span>Standalone Lab: ${escapeHtml(title)}</span>
      </div>
      <h1 class="placeholder-title" style="margin:0 0 0.5rem;font-size:2rem;font-weight:800;color:#0f172a;">🔬 ${escapeHtml(title)}</h1>
      <p style="color:#475569;font-size:1.1rem;margin:0 0 1.5rem;">Isolated simulation workbench conforming to portable workbench adapter specifications</p>

      <div style="background:#0f172a;color:#f8fafc;border-radius:8px;padding:2rem;margin-bottom:2rem;text-align:center;">
        <p style="margin:0 0 1rem;font-size:1.1rem;color:#38bdf8;">Simulation Sandbox: ${escapeHtml(lab?.engineType || 'CANVAS_3D')}</p>
        <p style="margin:0 0 1.5rem;color:#94a3b8;font-size:0.95rem;">Execution container running in sandbox mode: ${escapeHtml(lab?.sandboxMode || 'ISOLATED_IFRAME')}</p>
        <button type="button" onclick="window.location.hash='#/explorer'" style="min-height:56px;padding:12px 24px;background:#0284c7;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;">Launch in Interactive Explorer →</button>
      </div>

      <button type="button" onclick="window.location.hash='#/home'" style="min-height:56px;padding:12px 24px;background:#0f172a;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;">← Return to Curriculum Home</button>
    </div>
  `;
}

function renderSearchPlaceholder(root: HTMLElement, query: string): void {
  root.innerHTML = `
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:2rem;max-width:100%;box-sizing:border-box;">
      <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:1rem;">
        <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; <span>Universal Search</span>
      </div>
      <h1 class="placeholder-title" style="margin:0 0 0.5rem;font-size:2rem;font-weight:800;color:#0f172a;">🔍 Universal Search &amp; Topic Index</h1>
      <p style="color:#475569;font-size:1.1rem;margin:0 0 1.5rem;">Off-main-thread sub-200ms search engine with virtual formula toolbar and Fault N09 answer-leakage defense</p>

      <div style="display:flex;gap:8px;margin-bottom:1.5rem;max-width:600px;">
        <input type="search" id="g9-page-search" value="${escapeHtml(query)}" placeholder="Search across all curriculum items, formulas, and exams..." style="flex:1;min-height:48px;padding:0.75rem 1rem;font-size:1rem;border:2px solid #cbd5e1;border-radius:8px;" />
        <button type="button" onclick="const v = document.getElementById('g9-page-search').value; window.location.hash='#/search?q=' + encodeURIComponent(v);" style="min-height:48px;padding:0 20px;background:#0284c7;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Search</button>
      </div>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;margin-bottom:2rem;">
        <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;">${query ? `Query Results for "${escapeHtml(query)}"` : 'Quick Exploration Suggestions'}</h3>
        <p style="color:#64748b;font-size:0.95rem;margin:0 0 1rem;">Click any verified concept or question to navigate directly:</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <button type="button" onclick="window.location.hash='#/learning/core1a'" style="min-height:48px;padding:8px 14px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;color:#0284c7;font-weight:600;">Work, Power &amp; Energy (Core 1A)</button>
          <button type="button" onclick="window.location.hash='#/learning/core2'" style="min-height:48px;padding:8px 14px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;color:#0284c7;font-weight:600;">WPE Practice Item 01 (Core 2)</button>
          <button type="button" onclick="window.location.hash='#/competitive/exam:nsejs'" style="min-height:48px;padding:8px 14px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;color:#0284c7;font-weight:600;">NSEJS Junior Science Olympiad</button>
          <button type="button" onclick="window.location.hash='#/competitive/exam:ioqm'" style="min-height:48px;padding:8px 14px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;color:#0284c7;font-weight:600;">IOQM Mathematics Qualifier</button>
        </div>
      </div>

      <button type="button" onclick="window.location.hash='#/home'" style="min-height:56px;padding:12px 24px;background:#0f172a;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;">← Return to Curriculum Home</button>
    </div>
  `;
}

function renderNotFoundScreen(root: HTMLElement, failedPath: string): void {
  root.innerHTML = `
    <div style="background:#ffffff;border:1px solid #fecaca;border-radius:12px;padding:2.5rem;max-width:100%;box-sizing:border-box;text-align:center;">
      <div style="font-size:3rem;margin-bottom:0.5rem;">🧭</div>
      <h1 class="not-found-title" style="margin:0 0 0.5rem;font-size:2rem;font-weight:800;color:#991b1b;"><span class="not-found-code">404</span> - Page Not Found</h1>
      <p style="color:#475569;font-size:1.1rem;max-width:540px;margin:0 auto 1.5rem;">
        The requested path <code style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:4px;">${escapeHtml(failedPath)}</code> does not exist, has been tombstoned, or is currently restricted.
      </p>
      <button type="button" onclick="window.location.hash='#/home'" style="min-height:56px;padding:12px 28px;background:#0f172a;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1.05rem;">← Return to Curriculum Home</button>
    </div>
  `;
}

export function handleNavigation(): void {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash;
  const app = document.getElementById('app');
  if (!app) return;

  const target = hash || '#/home';
  if (!hash && window.location.hash !== '#/home') {
    try {
      history.replaceState(null, '', '#/home');
    } catch {}
  }
  mountRoute(target, app);
}

if (typeof document !== 'undefined') {
  initializeBuildShell();
  if (typeof window !== 'undefined') {
    getOrCreateUniversalSearchModal();
    window.addEventListener('hashchange', () => handleNavigation());
    handleNavigation();
  }
}
