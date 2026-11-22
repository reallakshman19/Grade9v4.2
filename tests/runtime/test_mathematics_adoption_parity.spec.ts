/**
 * tests/runtime/test_mathematics_adoption_parity.spec.ts
 * Workpack A63 / v3.5 Parity — Comprehensive Mathematics Adoption & Fault N09 Unit Test Suite
 *
 * Verifies:
 * 1. LinearCoordinatesController (2D Cartesian plane, orthogonal projections, synthetic division, cubic identity & forceZeroSum)
 * 2. VectorAlgebraController (3D vectors, Gram-Schmidt orthogonal decomposition, 13 JEE Main questions, answer evaluation)
 * 3. ImoMasterController (15 Olympiad domains, 68 authenticated past-paper items, 7 authored cards, 2-tier hint ladders)
 * 4. AppRegistry & Subject Screen Integration (7 mathematics topics, standalone lab bindings, zero registry errors)
 * 5. Strict Fault N09 Key Defense & "no iframe" Native DOM Compliance across all suites
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  LinearCoordinatesController,
  mountLinearCoordinatesWorkbench,
} from '../../web/pages/workbenches/linear-coordinates.ts';
import {
  VectorAlgebraController,
  mountVectorAlgebraWorkbench,
  JEE_QUESTIONS,
} from '../../web/pages/workbenches/vector-algebra.ts';
import {
  ImoMasterController,
  mountImoMaster,
  IMO_DOMAINS_DATA,
} from '../../web/pages/imo-master.ts';
import {
  DEFAULT_APP_REGISTRY,
  validateRegistrySnapshot,
} from '../../web/runtime/registry/index.ts';
import {
  MATHEMATICS_SUBJECT_DETAIL,
  createSubjectScreen,
  mountSubjectScreen,
} from '../../web/pages/subject.ts';
import { buildGlobalNavigationHtml } from '../../web/app/main.ts';
import {
  createTopicScreen,
  mountTopicWorkspace,
  MATH_POLYNOMIALS_TOPIC,
  MATH_EUCLID_TOPIC,
  MATH_RIEMANN_TOPIC,
  MATH_COORD_GEOM_TOPIC,
  MATH_THEORY_EQUATIONS_TOPIC,
  MATH_VECTORS_TOPIC,
  MATH_LINEAR_EQ_TOPIC,
  MATH_IMO_GRADE9_TOPIC,
} from '../../web/pages/topic.ts';

// Minimal mock element for Node.js unit testing of DOM rendering
class MockElement {
  innerHTML: string = '';
  private listeners: Record<string, Function[]> = {};
  private children: Record<string, MockElement> = {};

  querySelector<T = any>(sel: string): T | null {
    if (!this.children[sel]) {
      this.children[sel] = new MockElement();
    }
    return this.children[sel] as any;
  }

  querySelectorAll<T = any>(_sel: string): T[] {
    return [];
  }

  addEventListener(event: string, fn: Function) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
  }

  removeEventListener(event: string, fn: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((f) => f !== fn);
    }
  }

  replaceChildren() {
    this.innerHTML = '';
  }
}

describe('Component 1: Linear Coordinates & Polynomial Research Suite Parity', () => {
  it('correctly calculates Cartesian telemetry, quadrants, and projections', () => {
    const ctrl = new LinearCoordinatesController();

    // Quadrant I test
    ctrl.setPoint(3, 4);
    const p1 = ctrl.getPoint();
    assert.equal(p1.x, 3);
    assert.equal(p1.y, 4);
    const t1 = ctrl.getPointTelemetry();
    assert.match(t1.quadrant, /Quadrant I/);
    assert.equal(t1.radius, 5);
    assert.equal(t1.distX, 4); // distance to x-axis is |y|
    assert.equal(t1.distY, 3); // distance to y-axis is |x|

    // Quadrant III test
    ctrl.setPoint(-5, -12);
    const t2 = ctrl.getPointTelemetry();
    assert.match(t2.quadrant, /Quadrant III/);
    assert.equal(t2.radius, 13);

    // Axis boundary test
    ctrl.setPoint(0, 7);
    const t3 = ctrl.getPointTelemetry();
    assert.match(t3.quadrant, /On Y-Axis/);
  });

  it('solves 2-line linear systems with unique and parallel classifications', () => {
    const ctrl = new LinearCoordinatesController();

    // Line 1: 2x + y = 5, Line 2: x - y = 1
    // Intersection: 3x = 6 -> x = 2, y = 1
    ctrl.setLine1({ a: 2, b: 1, c: 5 });
    ctrl.setLine2({ a: 1, b: -1, c: 1 });

    const sol = ctrl.getSystemSolution();
    assert.equal(sol.status, 'UNIQUE');
    assert.ok(sol.intersection);
    assert.equal(Math.round(sol.intersection.x), 2);
    assert.equal(Math.round(sol.intersection.y), 1);

    // Parallel lines: 2x + 4y = 8 and 2x + 4y = 12
    ctrl.setLine1({ a: 2, b: 4, c: 8 });
    ctrl.setLine2({ a: 2, b: 4, c: 12 });
    const parallelSol = ctrl.getSystemSolution();
    assert.equal(parallelSol.status, 'PARALLEL_NO_SOLUTION');
    assert.equal(parallelSol.intersection, null);
  });

  it('evaluates Polynomial Remainder Theorem P(k) and synthetic division', () => {
    const ctrl = new LinearCoordinatesController();

    // P(x) = 2x³ - 3x² + 4x - 5, divisor (x - 2) so k = 2
    // P(2) = 2(8) - 3(4) + 4(2) - 5 = 16 - 12 + 8 - 5 = 7
    // q₂ = 2, q₁ = -3 + 2(2) = 1, q₀ = 4 + 2(1) = 6, R = -5 + 2(6) = 7
    ctrl.setPoly({ a: 2, b: -3, c: 4, d: -5, k: 2 });
    const res = ctrl.evaluateRemainder();

    assert.equal(res.remainder, 7);
    assert.equal(res.isRoot, false);
    assert.equal(res.quotient.q2, 2);
    assert.equal(res.quotient.q1, 1);
    assert.equal(res.quotient.q0, 6);
    assert.equal(res.steps.length, 5);

    // Test a root: P(x) = x³ - 6x² + 11x - 6 at k = 1 (roots are 1, 2, 3)
    ctrl.setPoly({ a: 1, b: -6, c: 11, d: -6, k: 1 });
    const rootRes = ctrl.evaluateRemainder();
    assert.equal(rootRes.remainder, 0);
    assert.equal(rootRes.isRoot, true);
  });

  it('verifies Cubic Identity a³+b³+c³-3abc and forceZeroSum condition', () => {
    const ctrl = new LinearCoordinatesController();

    // General case: a=2, b=3, c=4
    ctrl.setCubicIdentityVars(2, 3, 4);
    const idRes = ctrl.evaluateCubicIdentity();
    assert.equal(idRes.lhs, idRes.rhs); // algebraic identity must hold exactly
    assert.equal(idRes.isZeroSum, false);

    // Conditional forceZeroSum: a+b+c=0 implies a³+b³+c³=3abc (LHS=0)
    ctrl.setCubicIdentityVars(2, 3, 5);
    ctrl.forceZeroSum(); // sets c = -(2 + 3) = -5
    const zeroRes = ctrl.evaluateCubicIdentity();
    assert.equal(zeroRes.sumABC, 0);
    assert.equal(zeroRes.isZeroSum, true);
    assert.equal(zeroRes.lhs, 0);
    assert.equal(zeroRes.rhs, 0);
  });
});

describe('Component 2: 3D Vector Algebra & JEE Main Question Hub Parity', () => {
  it('computes 3D isometric vector operations: dot, cross, angles', () => {
    const ctrl = new VectorAlgebraController();

    // a = (3, 4, 0), b = (0, 5, 0)
    ctrl.setVectorA({ x: 3, y: 4, z: 0 });
    ctrl.setVectorB({ x: 0, y: 5, z: 0 });

    assert.equal(ctrl.magnitude(ctrl.getVectorA()), 5);
    assert.equal(ctrl.magnitude(ctrl.getVectorB()), 5);
    assert.equal(ctrl.dotProduct(), 20); // 3*0 + 4*5 + 0*0 = 20
    assert.equal(ctrl.scalarProjectionOnB(), 4); // 20 / 5 = 4

    // Cross product: (3i + 4j) x (5j) = 15k
    const cross = ctrl.crossProduct();
    assert.equal(cross.x, 0);
    assert.equal(cross.y, 0);
    assert.equal(cross.z, 15);
  });

  it('performs Gram-Schmidt orthogonal projection split (parallel & rejection)', () => {
    const ctrl = new VectorAlgebraController();

    // a = (3, 4, 0), b = (1, 0, 0)
    ctrl.setVectorA({ x: 3, y: 4, z: 0 });
    ctrl.setVectorB({ x: 1, y: 0, z: 0 });

    const proj = ctrl.vectorProjectionOnB();
    const rej = ctrl.vectorRejectionOnB();

    // Parallel projection on x-axis is (3, 0, 0)
    assert.equal(proj.x, 3);
    assert.equal(proj.y, 0);
    assert.equal(proj.z, 0);

    // Orthogonal rejection is a - proj = (0, 4, 0)
    assert.equal(rej.x, 0);
    assert.equal(rej.y, 4);
    assert.equal(rej.z, 0);

    // Sum must equal original vector a
    assert.equal(proj.x + rej.x, 3);
    assert.equal(proj.y + rej.y, 4);
    assert.equal(proj.z + rej.z, 0);

    // Dot product between projection and rejection must be zero (orthogonal)
    const dotProjRej = proj.x * rej.x + proj.y * rej.y + proj.z * rej.z;
    assert.equal(dotProjRej, 0);
  });

  it('contains all 13 authenticated JEE Main questions with verified solutions', () => {
    assert.equal(JEE_QUESTIONS.length, 13);

    for (let i = 1; i <= 13; i++) {
      const qid = `VEC-Q${i.toString().padStart(2, '0')}`;
      const q = JEE_QUESTIONS.find((item) => item.id === qid);
      assert.ok(q, `Missing JEE Question ${qid}`);
      assert.equal(q.options.length, 4, `Question ${qid} must have 4 options`);
      assert.ok(q.steps.length >= 3, `Question ${qid} must have step-by-step solution`);
      assert.ok(q.formula.length > 5, `Question ${qid} must cite a mathematical formula`);
    }

    // Verify answer checking mechanism via private key
    const ctrl = new VectorAlgebraController();
    assert.equal(ctrl.isCorrect('VEC-Q01', 'opt-A'), true);
    assert.equal(ctrl.isCorrect('VEC-Q01', 'opt-B'), false);
    assert.equal(ctrl.isCorrect('VEC-Q02', 'opt-A'), true);
    assert.equal(ctrl.isCorrect('VEC-Q03', 'opt-B'), true);
  });
});

describe('Component 3: IMO Grade 9 Master Suite Parity', () => {
  it('reconstructs all 15 Olympiad curriculum domains and 68 past paper references', () => {
    assert.equal(IMO_DOMAINS_DATA.length, 15);

    const domainIds = IMO_DOMAINS_DATA.map((d) => d.id);
    const expectedIds = [
      'logic', 'alg_id', 'triangle_areas', 'circles', 'coord', 'euclid',
      'probability', 'lin_eq', 'angles', 'ns', 'poly', 'statistics',
      'mensuration', 'triangles', 'quant'
    ];
    for (const exp of expectedIds) {
      assert.ok(domainIds.includes(exp), `Domain ${exp} must be present`);
    }

    const ctrl = new ImoMasterController();
    const totalItems = ctrl.getTotalItemCount();
    const authoredItems = ctrl.getAuthoredItems();
    const referencedItems = ctrl.getReferencedItems();

    assert.equal(authoredItems.length, 7, 'Must have exactly 7 interactive practice cards');
    assert.equal(referencedItems.length, 68, 'Must have exactly 68 authenticated past-paper references');
    assert.equal(totalItems, 75, 'Total items must be 75 (7 authored + 68 referenced)');
  });

  it('filters items by domain and supports search queries', () => {
    const ctrl = new ImoMasterController();

    // Filter authored items by coordinate geometry domain
    ctrl.setSelectedDomain('coord');
    const coordAuthored = ctrl.getAuthoredItems();
    assert.equal(coordAuthored.length, 2);
    assert.ok(coordAuthored.every((c) => c.domain.id === 'coord'));

    // Filter referenced items by circles domain
    ctrl.setSelectedDomain('circles');
    const circleReferenced = ctrl.getReferencedItems();
    assert.equal(circleReferenced.length, 2);
    assert.ok(circleReferenced.every((c) => c.domain.id === 'circles'));

    // Search query matching
    ctrl.setSelectedDomain('all');
    ctrl.setSearchQuery('triangle');
    const searchResults = ctrl.getAuthoredItems();
    assert.ok(searchResults.length >= 2);
    assert.ok(searchResults.every((r) => r.item.problem.toLowerCase().includes('triangle') || r.item.title.toLowerCase().includes('triangle')));
  });

  it('supports progressive 2-level hint ladder and response commitment', () => {
    const ctrl = new ImoMasterController();
    const itemId = 'SOF-IMO-G09-L1-2024-25-B-Q044';

    // Initial state: no hints
    assert.equal(ctrl.getState().revealedHints[itemId], undefined);

    // Unlock Level 1 hint
    ctrl.unlockHint(itemId, 1);
    assert.equal(ctrl.getState().revealedHints[itemId], 1);

    // Unlock Level 2 hint
    ctrl.unlockHint(itemId, 2);
    assert.equal(ctrl.getState().revealedHints[itemId], 2);

    // Commit learner response
    ctrl.commitResponse(itemId, '36');
    assert.equal(ctrl.getState().committedResponses[itemId], '36');
  });
});

describe('Component 4: AppRegistry & Subject Screen Integration', () => {
  it('validates platform AppRegistry with all 7 Mathematics topics registered', () => {
    const validation = validateRegistrySnapshot(DEFAULT_APP_REGISTRY);
    assert.equal(validation.valid, true, `Registry snapshot must be valid: ${validation.errors.join('; ')}`);

    const mathSubj = DEFAULT_APP_REGISTRY.subjects.find((s) => s.id === 'subject:mathematics');
    assert.ok(mathSubj, 'subject:mathematics must exist in registry');
    assert.equal(mathSubj.topicIds.length, 7, 'Mathematics must list 7 topics');

    const expectedTopicIds = [
      'topic:polynomials',
      'topic:riemann',
      'topic:euclid-geometry',
      'topic:coordinate-geometry',
      'topic:theory-of-equations',
      'topic:vectors',
      'topic:linear-equations',
    ];
    for (const tid of expectedTopicIds) {
      assert.ok(mathSubj.topicIds.includes(tid), `Topic ${tid} must be in subject:mathematics.topicIds`);
      const topicDesc: any = DEFAULT_APP_REGISTRY.topics.find((t: any) => t.id === tid);
      assert.ok(topicDesc, `Topic descriptor ${tid} must exist in registry topics`);
      assert.equal(topicDesc.subjectId, 'subject:mathematics');
      assert.equal(topicDesc.disclosurePolicy.preCommitDisclosure, 'FORBIDDEN');
    }
  });

  it('registers standalone mathematics labs in AppRegistry', () => {
    const labIds = DEFAULT_APP_REGISTRY.standaloneLabs.map((l) => l.id);
    assert.ok(labIds.includes('lab:circles-master'), 'lab:circles-master must be registered');
    assert.ok(labIds.includes('lab:vector-3d'), 'lab:vector-3d must be registered');
    assert.ok(labIds.includes('lab:riemann-sums'), 'lab:riemann-sums must be registered');
    assert.ok(labIds.includes('lab:linear-coordinates'), 'lab:linear-coordinates must be registered');
    assert.ok(labIds.includes('lab:imo-master'), 'lab:imo-master must be registered');
  });

  it('MATHEMATICS_SUBJECT_DETAIL defines all 7 topics with total itemCount 193', () => {
    assert.equal(MATHEMATICS_SUBJECT_DETAIL.code, 'MATHEMATICS');
    assert.equal(MATHEMATICS_SUBJECT_DETAIL.topics.length, 7);

    const totalItems = MATHEMATICS_SUBJECT_DETAIL.topics.reduce((acc, t) => acc + t.itemCount, 0);
    assert.equal(totalItems, 193, 'Total itemCount across all 7 topics must equal 193');

    const ctrl = createSubjectScreen(MATHEMATICS_SUBJECT_DETAIL);
    const state = ctrl.getViewState();
    assert.equal(state.status, 'POPULATED');
    assert.equal(state.totalItemCount, 193);
    assert.equal(state.visibleTopics.length, 7);
  });
});

describe('Component 5: Strict Fault N09 Key Defense & "no iframe" Native DOM Compliance', () => {
  it('enforces Fault N09 across Linear Coordinates workbench DOM', () => {
    const root = new MockElement() as any;
    const ctrl = new LinearCoordinatesController();
    const m = mountLinearCoordinatesWorkbench(root, ctrl);

    // No answer keys or leaked evaluation secrets in learner DOM
    assert.doesNotMatch(root.innerHTML, /data-correct/);
    assert.doesNotMatch(root.innerHTML, /data-answer/);
    assert.doesNotMatch(root.innerHTML, /<iframe/i, 'Strict compliance: NO IFRAME permitted');

    m.dispose();
  });

  it('enforces Fault N09 across 3D Vector Algebra workbench DOM', () => {
    const root = new MockElement() as any;
    const ctrl = new VectorAlgebraController();
    ctrl.setActiveTab('questions');
    const m = mountVectorAlgebraWorkbench(root, ctrl);

    // Critical Fault N09 Check: Pre-commitment DOM must not disclose correct option IDs
    assert.doesNotMatch(root.innerHTML, /data-correct=/);
    assert.doesNotMatch(root.innerHTML, /data-answer-key/);
    assert.doesNotMatch(root.innerHTML, /<iframe/i, 'Strict compliance: NO IFRAME permitted');

    m.dispose();
  });

  it('enforces Fault N09 across IMO Master Suite DOM', () => {
    const root = new MockElement() as any;
    const ctrl = new ImoMasterController();
    const m = mountImoMaster(root, ctrl);

    // Must not contain pre-commit answer leaks
    assert.doesNotMatch(root.innerHTML, /data-correct/);
    assert.doesNotMatch(root.innerHTML, /data-solution-key/);
    assert.doesNotMatch(root.innerHTML, /<iframe/i, 'Strict compliance: NO IFRAME permitted');

    // Must visibly display honest academic status HOLD
    assert.match(root.innerHTML, /Academic Status: HOLD/);

    m.dispose();
  });

  it('renders Mathematics Subject Screen with 6 Visual Suites and zero iframes', () => {
    const root = new MockElement() as any;
    const ctrl = createSubjectScreen(MATHEMATICS_SUBJECT_DETAIL);
    const m = mountSubjectScreen(root, ctrl);

    // Must contain Mathematics hub banner and 6 visual suites
    assert.match(root.innerHTML, /Mathematics Hub &amp; Master Visual Suites/);
    assert.match(root.innerHTML, /Circles Master Suite/);
    assert.match(root.innerHTML, /Polynomials &amp; Coordinate Geometry Suite/);
    assert.match(root.innerHTML, /IMO Grade 9 Master Suite/);
    assert.match(root.innerHTML, /3D Vector Algebra &amp; Spatial Geometry/);
    assert.match(root.innerHTML, /Riemann Sums Partition Refinement/);
    assert.match(root.innerHTML, /Polynomial Long Division Scaffold/);

    // Must strictly NOT use iframes
    assert.doesNotMatch(root.innerHTML, /<iframe/i, 'Strict compliance: NO IFRAME permitted');

    m.dispose();
  });
});

describe('Component 6: Global Header Navigation & Topic Workspace Dispatch Parity', () => {
  it('renders dedicated touch targets for all STEM disciplines and core platform hubs', () => {
    const navHtml = buildGlobalNavigationHtml('subject/mathematics', 'SUBJECT');

    // 1. Brand Logo
    assert.match(navHtml, /<a href="#\/home" class="header-brand"/);
    assert.match(navHtml, /Grade9 STEM<\/a>/);

    // 2. Dedicated Subject Navigation Buttons with distinct IDs and touch targets >= 48px
    assert.match(navHtml, /id="nav-btn-math" data-route="#\/subject\/mathematics"/);
    assert.match(navHtml, /id="nav-btn-phys" data-route="#\/subject\/physics"/);
    assert.match(navHtml, /id="nav-btn-chem" data-route="#\/subject\/chemistry"/);
    assert.match(navHtml, /id="nav-btn-bio" data-route="#\/subject\/biology"/);

    // 3. Platform Hubs
    assert.match(navHtml, /data-route="#\/home"/);
    assert.match(navHtml, /data-route="#\/bank"/);
    assert.match(navHtml, /data-route="#\/competitive\/exam:nsejs"/);
    assert.match(navHtml, /data-route="#\/labs"/);
    assert.match(navHtml, /data-route="#\/personal"/);
    assert.match(navHtml, /data-route="#\/architecture"/);
    assert.match(navHtml, /data-action="search-modal"/);

    // 4. Touch target compliance: all elements specify min-height:48px and min-width:48px
    const buttonsAndLinks = navHtml.match(/<(button|a)[^>]+>/g) || [];
    assert.ok(buttonsAndLinks.length >= 10, 'Must have at least 10 navigation buttons/links');
    for (const tag of buttonsAndLinks) {
      assert.match(tag, /min-height:\s*48px/, `Tag must satisfy 48px min-height: ${tag}`);
      assert.match(tag, /min-width:\s*48px/, `Tag must satisfy 48px min-width: ${tag}`);
    }
  });

  it('dynamically highlights active route button with contrasting brand blue #0284c7', () => {
    // Active on Mathematics
    const mathNav = buildGlobalNavigationHtml('subject/mathematics', 'SUBJECT');
    assert.match(mathNav, /id="nav-btn-math"[^>]*background:#0284c7/);
    assert.match(mathNav, /id="nav-btn-phys"[^>]*background:#1e293b/);

    // Active on Physics
    const physNav = buildGlobalNavigationHtml('subject/physics', 'SUBJECT');
    assert.match(physNav, /id="nav-btn-phys"[^>]*background:#0284c7/);
    assert.match(physNav, /id="nav-btn-math"[^>]*background:#1e293b/);

    // Active on Chemistry
    const chemNav = buildGlobalNavigationHtml('subject/chemistry', 'SUBJECT');
    assert.match(chemNav, /id="nav-btn-chem"[^>]*background:#0284c7/);

    // Active on Home
    const homeNav = buildGlobalNavigationHtml('home', 'HOME');
    assert.match(homeNav, /data-route="#\/home"[^>]*background:#0284c7/);
  });

  it('dispatches and mounts full workspace for all 7 Mathematics topics without placeholders', () => {
    const mathTopics = [
      MATH_COORD_GEOM_TOPIC,
      MATH_EUCLID_TOPIC,
      MATH_POLYNOMIALS_TOPIC,
      MATH_THEORY_EQUATIONS_TOPIC,
      MATH_VECTORS_TOPIC,
      MATH_LINEAR_EQ_TOPIC,
      MATH_IMO_GRADE9_TOPIC,
      MATH_RIEMANN_TOPIC,
    ];

    for (const topic of mathTopics) {
      const root = new MockElement() as any;
      const ctrl = createTopicScreen(topic);
      const state = ctrl.getViewState();

      assert.equal(state.status, 'POPULATED', `Topic ${topic.code} state must be POPULATED`);
      assert.equal(state.topic?.code, topic.code);

      const m = mountTopicWorkspace(root, ctrl, 'questions');

      // Verify breadcrumb and titles
      assert.match(root.innerHTML, /class="g9-topic-workspace"/);
      assert.match(root.innerHTML, /12\.7" Tablet Workspace/);
      assert.match(root.innerHTML, /Home<\/a>\s*&gt;\s*<a href="#\/subject\/mathematics"/);

      // Verify 4 canonical tabs present
      assert.match(root.innerHTML, /1\. 📋 Question Bank/);
      assert.match(root.innerHTML, /2\. 💡 Learn &amp; Try/);
      assert.match(root.innerHTML, /3\. 🔬 Explorer Simulation/);
      assert.match(root.innerHTML, /4\. 🧰 Standalone Labs/);

      // Zero iframe invariant
      assert.doesNotMatch(root.innerHTML, /<iframe/i, `Topic ${topic.code} must not use iframes`);

      // Zero Fault N09 secret leakage
      assert.doesNotMatch(root.innerHTML, /data-correct=/);
      assert.doesNotMatch(root.innerHTML, /data-answer-key/);
      assert.doesNotMatch(root.innerHTML, /data-solution-key/);

      m.dispose();
    }
  });
});
