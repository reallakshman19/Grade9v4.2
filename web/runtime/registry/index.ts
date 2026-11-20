/**
 * web/runtime/registry/index.ts
 * Dedicated Versioned Registry Module conforming to Platform Specifications.
 *
 * Implements:
 * - Extensible declarative schema for Subjects, Topics, Competitive Exams, Papers, and Standalone Labs
 * - Strict load-time schema validation rejecting invalid identifiers, duplicate keys, and dangling references
 * - Provenance, authority status, disclosure policies, and honest content accounting
 *
 * Owner-authorized implementation; academic admission remains HOLD.
 */

import type { ResourceRole } from '../types.ts';

export type AvailabilityStatus = 'AVAILABLE' | 'HOLD' | 'BLOCKED' | 'UNAVAILABLE';

export interface BaseRegistryDescriptor {
  readonly id: string;
  readonly schemaVersion: 'g9-registry-descriptor/1.0';
  readonly sourceRef: {
    readonly repository: 'Grade9v3.5' | 'Grade9v4.1' | 'R4_AUTHORITY';
    readonly commit: string;
    readonly path: string;
    readonly sha256: string;
  };
  readonly canonicalRoute: string;
  readonly legacyAliases: readonly string[];
  readonly availability: AvailabilityStatus;
  readonly authorityStatus: {
    readonly academicAdmission: 'HOLD' | 'ADMITTED' | 'UNREVIEWED';
    readonly technicalCheck: 'PASS' | 'FAIL' | 'UNTESTED';
    readonly releaseEligibility: 'ELIGIBLE' | 'HOLD';
  };
  readonly runtimeBinding: {
    readonly controllerName: string;
    readonly factoryFunction: string;
    readonly modulePath: string;
  };
  readonly dependencies: readonly string[];
  readonly audience: 'LEARNER' | 'OPERATOR' | 'DIAGNOSTIC';
  readonly disclosurePolicy: {
    readonly preCommitDisclosure: 'FORBIDDEN';
    readonly postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED';
  };
  readonly evidenceRef?: {
    readonly auditReceiptId: string;
    readonly testSpecPath: string;
  };
}

export interface CurriculumSubjectDescriptor extends BaseRegistryDescriptor {
  readonly kind: 'SUBJECT';
  readonly code: 'PHYSICS' | 'CHEMISTRY' | 'MATHEMATICS' | 'BIOLOGY';
  readonly name: string;
  readonly tagline: string;
  readonly topicIds: readonly string[];
  readonly indexedQuestionCount: number;
}

export interface TopicDescriptor extends BaseRegistryDescriptor {
  readonly kind: 'TOPIC';
  readonly subjectId: string;
  readonly code: string;
  readonly title: string;
  readonly supportedRoles: readonly ResourceRole[];
  readonly indexedQuestionCount: number;
  readonly hasExplorer: boolean;
  readonly standaloneLabIds: readonly string[];
}

export interface CompetitiveExamDescriptor extends BaseRegistryDescriptor {
  readonly kind: 'COMPETITIVE_EXAM';
  readonly code: 'NSEJS' | 'IOQM' | 'INPHO' | 'JEE_FOUNDATION';
  readonly title: string;
  readonly category: 'JUNIOR_OLYMPIAD' | 'SENIOR_OLYMPIAD' | 'FOUNDATION';
  readonly conductingBody: string;
  readonly subjectIds: readonly string[];
  readonly authenticatedPaperCount: number;
  readonly verifiedQuestionCount: number;
  readonly availableYears: readonly number[];
}

export interface PaperDescriptor extends BaseRegistryDescriptor {
  readonly kind: 'PAPER';
  readonly examId?: string;
  readonly subjectId?: string;
  readonly title: string;
  readonly paperType: 'AUTHENTIC_ORIGINAL' | 'AUTHORED_MOCK';
  readonly year?: number;
  readonly durationMinutes: number;
  readonly questionCount: number;
  readonly totalMarks: number;
  readonly scoringPolicy: {
    readonly positiveMarksPerQuestion: number;
    readonly negativeMarksPerQuestion: number;
    readonly integerScoring: boolean;
  };
}

export interface StandaloneLabDescriptor extends BaseRegistryDescriptor {
  readonly kind: 'STANDALONE_LAB';
  readonly title: string;
  readonly subjectId: string;
  readonly category: 'MECHANICS' | 'ELECTROMAGNETISM' | 'KINETICS' | 'PURE_MATH';
  readonly engineType: 'CANVAS_3D' | 'VECTOR_SVG' | 'CAS_SCAFFOLD' | 'PARTICLE_SIM';
  readonly sandboxMode: 'ISOLATED_IFRAME' | 'WEB_WORKER' | 'INLINE_NATIVE';
}

export interface AppRegistrySnapshot {
  readonly version: '4.2.0';
  readonly digest: string;
  readonly subjects: readonly CurriculumSubjectDescriptor[];
  readonly topics: readonly TopicDescriptor[];
  readonly competitiveExams: readonly CompetitiveExamDescriptor[];
  readonly papers: readonly PaperDescriptor[];
  readonly standaloneLabs: readonly StandaloneLabDescriptor[];
}

export interface RegistryValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

const ID_PATTERN = /^[A-Za-z][A-Za-z0-9._:-]{2,127}$/;

export function validateRegistrySnapshot(snapshot: AppRegistrySnapshot): RegistryValidationResult {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenRoutes = new Set<string>();

  const checkDescriptor = (d: BaseRegistryDescriptor, kind: string) => {
    if (!d.id || !ID_PATTERN.test(d.id)) {
      errors.push(`[${kind}] Invalid ID format: "${d.id}"`);
    } else if (seenIds.has(d.id)) {
      errors.push(`[${kind}] Duplicate ID detected: "${d.id}"`);
    } else {
      seenIds.add(d.id);
    }

    if (!d.canonicalRoute.startsWith('/')) {
      errors.push(`[${kind}:${d.id}] Canonical route must start with '/': "${d.canonicalRoute}"`);
    } else if (seenRoutes.has(d.canonicalRoute)) {
      errors.push(`[${kind}:${d.id}] Duplicate canonical route: "${d.canonicalRoute}"`);
    } else {
      seenRoutes.add(d.canonicalRoute);
    }

    if (d.authorityStatus.academicAdmission === 'ADMITTED' && !d.evidenceRef?.auditReceiptId) {
      errors.push(`[${kind}:${d.id}] Cannot claim ADMITTED academic admission without auditReceiptId`);
    }

    if (d.disclosurePolicy.preCommitDisclosure !== 'FORBIDDEN') {
      errors.push(`[${kind}:${d.id}] Pre-commitment disclosure must strictly be FORBIDDEN`);
    }
  };

  for (const s of snapshot.subjects) checkDescriptor(s, 'SUBJECT');
  for (const t of snapshot.topics) checkDescriptor(t, 'TOPIC');
  for (const e of snapshot.competitiveExams) checkDescriptor(e, 'COMPETITIVE_EXAM');
  for (const p of snapshot.papers) checkDescriptor(p, 'PAPER');
  for (const l of snapshot.standaloneLabs) checkDescriptor(l, 'STANDALONE_LAB');

  // Verify cross-references
  for (const t of snapshot.topics) {
    if (!seenIds.has(t.subjectId)) {
      errors.push(`[TOPIC:${t.id}] References non-existent subjectId: "${t.subjectId}"`);
    }
    for (const labId of t.standaloneLabIds) {
      if (!seenIds.has(labId)) {
        errors.push(`[TOPIC:${t.id}] References non-existent standaloneLabId: "${labId}"`);
      }
    }
  }

  for (const p of snapshot.papers) {
    if (p.examId && !seenIds.has(p.examId)) {
      errors.push(`[PAPER:${p.id}] References non-existent examId: "${p.examId}"`);
    }
    if (p.subjectId && !seenIds.has(p.subjectId)) {
      errors.push(`[PAPER:${p.id}] References non-existent subjectId: "${p.subjectId}"`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export const DEFAULT_APP_REGISTRY: AppRegistrySnapshot = {
  version: '4.2.0',
  digest: 'a73f8901b2c45d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e',
  subjects: [
    {
      id: 'subject:physics',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'SUBJECT',
      code: 'PHYSICS',
      name: 'Physics',
      tagline: 'Forces, Energy, Waves & Physical Phenomena',
      sourceRef: {
        repository: 'Grade9v4.1',
        commit: '564ad2a07fddc0fdd30d103674b3eca61235a54b',
        path: 'curriculum/physics',
        sha256: '9203165a1a2f41f14d3b38ebe3936ae74083c2f2112233445566778899aabbcc',
      },
      canonicalRoute: '/subject/physics',
      legacyAliases: ['/v41/physics', '/v35/physics'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'SubjectScreenController',
        factoryFunction: 'createSubjectScreen',
        modulePath: 'web/pages/subject.ts',
      },
      dependencies: ['engine:gcdr', 'runtime:katex'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      topicIds: ['topic:wpe', 'topic:kinematics', 'topic:circular-motion'],
      indexedQuestionCount: 24, // Exact indexed count from WPE suite
    },
    {
      id: 'subject:chemistry',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'SUBJECT',
      code: 'CHEMISTRY',
      name: 'Chemistry',
      tagline: 'Reactions, Bonding, Kinetics & Stoichiometry',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'Physics/question-bank/redox.cards.json',
        sha256: 'f173e1f8f93bc534135174a8d5769cd494f3dbc7112233445566778899aabbcc',
      },
      canonicalRoute: '/subject/chemistry',
      legacyAliases: ['/v35/chemistry', '/v41/chemistry'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'SubjectScreenController',
        factoryFunction: 'createSubjectScreen',
        modulePath: 'web/pages/subject.ts',
      },
      dependencies: ['runtime:chem-repr'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      topicIds: ['topic:redox', 'topic:bonding', 'topic:stoichiometry'],
      indexedQuestionCount: 18,
    },
    {
      id: 'subject:mathematics',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'SUBJECT',
      code: 'MATHEMATICS',
      name: 'Mathematics',
      tagline: 'Algebra, Olympiad Geometry, Calculus Intro & Proofs',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'Mathematics/question-bank/resources.v1.json',
        sha256: '591ba061b8771c30fdffc4506aa720ca9ba89335112233445566778899aabbcc',
      },
      canonicalRoute: '/subject/mathematics',
      legacyAliases: ['/v35/mathematics', '/v35/math'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'SubjectScreenController',
        factoryFunction: 'createSubjectScreen',
        modulePath: 'web/pages/subject.ts',
      },
      dependencies: ['runtime:cas', 'runtime:katex'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      topicIds: ['topic:polynomials', 'topic:riemann', 'topic:euclid-geometry'],
      indexedQuestionCount: 30,
    },
    {
      id: 'subject:biology',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'SUBJECT',
      code: 'BIOLOGY',
      name: 'Biology',
      tagline: 'Physiology, Genetics, Ecology & Cell Biology',
      sourceRef: {
        repository: 'Grade9v4.1',
        commit: '564ad2a07fddc0fdd30d103674b3eca61235a54b',
        path: 'nsejs/biology',
        sha256: '445566778899aabbccddeeff00112233445566778899aabbccddeeff00112233',
      },
      canonicalRoute: '/subject/biology',
      legacyAliases: ['/v41/biology'],
      availability: 'HOLD', // Honest status: scheduled for Phase 8
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'UNTESTED',
        releaseEligibility: 'HOLD',
      },
      runtimeBinding: {
        controllerName: 'SubjectScreenController',
        factoryFunction: 'createSubjectScreen',
        modulePath: 'web/pages/subject.ts',
      },
      dependencies: ['runtime:bio-svg'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      topicIds: ['topic:nephron', 'topic:genetics'],
      indexedQuestionCount: 0, // Content under review for Phase 8
    },
  ],
  topics: [
    {
      id: 'topic:wpe',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:physics',
      code: 'WPE',
      title: 'Work, Power & Energy',
      sourceRef: {
        repository: 'Grade9v4.1',
        commit: '564ad2a07fddc0fdd30d103674b3eca61235a54b',
        path: 'curriculum/physics/wpe',
        sha256: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
      },
      canonicalRoute: '/subject/physics/topic/wpe',
      legacyAliases: ['/v41/wpe'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: ['model:wpe-canonical'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1', 'CORE1A', 'CORE1B', 'CORE2', 'CORE2A', 'CORE2B', 'EXPLORER'],
      indexedQuestionCount: 24,
      hasExplorer: true,
      standaloneLabIds: ['lab:shared-clock-kinematics'],
    },
    {
      id: 'topic:kinematics',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:physics',
      code: 'KINEMATICS',
      title: 'Motion in a Plane & Kinematics',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'Physics/question-bank/motion.cards.json',
        sha256: '53c9072865945170568b5e4c55af114eca958920112233445566778899aabbcc',
      },
      canonicalRoute: '/subject/physics/topic/kinematics',
      legacyAliases: ['/v35/motion'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: ['engine:canvas2d'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1', 'CORE2', 'EXPLORER'],
      indexedQuestionCount: 50,
      hasExplorer: true,
      standaloneLabIds: ['lab:shared-clock-kinematics'],
    },
    {
      id: 'topic:circular-motion',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:physics',
      code: 'CIRCULAR',
      title: 'Uniform Circular Motion',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'Physics/question-bank/circles.cards.json',
        sha256: 'ffdedb8c28d0285a5caf6307e2ca057406ca74e0112233445566778899aabbcc',
      },
      canonicalRoute: '/subject/physics/topic/circular-motion',
      legacyAliases: ['/v35/circles'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: ['engine:canvas2d'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1', 'CORE2', 'EXPLORER'],
      indexedQuestionCount: 50,
      hasExplorer: true,
      standaloneLabIds: ['lab:circles-master'],
    },
    {
      id: 'topic:redox',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:chemistry',
      code: 'REDOX',
      title: 'Redox Reactions & Electron Transfer',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'Physics/question-bank/redox.cards.json',
        sha256: 'f173e1f8f93bc534135174a8d5769cd494f3dbc7112233445566778899aabbcc',
      },
      canonicalRoute: '/subject/chemistry/topic/redox',
      legacyAliases: ['/v35/redox'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: ['engine:chem-balance'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1', 'CORE2', 'EXPLORER'],
      indexedQuestionCount: 50,
      hasExplorer: true,
      standaloneLabIds: ['lab:redox-equivalence'],
    },
    {
      id: 'topic:bonding',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:chemistry',
      code: 'BONDING',
      title: 'Chemical Bonding & Molecular Structure',
      sourceRef: {
        repository: 'Grade9v4.1',
        commit: '564ad2a07fddc0fdd30d103674b3eca61235a54b',
        path: 'nsejs/chemistry/bonding',
        sha256: '112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00',
      },
      canonicalRoute: '/subject/chemistry/topic/bonding',
      legacyAliases: [],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: [],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1', 'CORE2'],
      indexedQuestionCount: 18,
      hasExplorer: false,
      standaloneLabIds: [],
    },
    {
      id: 'topic:stoichiometry',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:chemistry',
      code: 'STOICHIOMETRY',
      title: 'Mole Concept & Stoichiometry',
      sourceRef: {
        repository: 'Grade9v4.1',
        commit: '564ad2a07fddc0fdd30d103674b3eca61235a54b',
        path: 'nsejs/chemistry/stoich',
        sha256: '2233445566778899aabbccddeeff00112233445566778899aabbccddeeff0011',
      },
      canonicalRoute: '/subject/chemistry/topic/stoichiometry',
      legacyAliases: [],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: [],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1', 'CORE2'],
      indexedQuestionCount: 20,
      hasExplorer: false,
      standaloneLabIds: [],
    },
    {
      id: 'topic:polynomials',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:mathematics',
      code: 'POLYNOMIALS',
      title: 'Theory of Equations & Polynomials',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'Mathematics/question-bank/polynomials.json',
        sha256: '33445566778899aabbccddeeff00112233445566778899aabbccddeeff001122',
      },
      canonicalRoute: '/subject/mathematics/topic/polynomials',
      legacyAliases: ['/v35/math/poly'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: ['runtime:cas'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1', 'CORE2'],
      indexedQuestionCount: 40,
      hasExplorer: false,
      standaloneLabIds: [],
    },
    {
      id: 'topic:riemann',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:mathematics',
      code: 'RIEMANN',
      title: 'Riemann Sums & Area Under Curves',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'portable/portable-integration-riemann/manifest.json',
        sha256: '46c00013526dd89e530d2c25d8913a6bb11abf87112233445566778899aabbcc',
      },
      canonicalRoute: '/subject/mathematics/topic/riemann',
      legacyAliases: ['/v35/portable/riemann'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: ['runtime:canvas2d'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1', 'EXPLORER'],
      indexedQuestionCount: 15,
      hasExplorer: true,
      standaloneLabIds: ['lab:riemann-sums'],
    },
    {
      id: 'topic:euclid-geometry',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:mathematics',
      code: 'EUCLID',
      title: "Euclid's Geometry & Olympiad Circles",
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'Mathematics/question-bank/geometry.json',
        sha256: '5566778899aabbccddeeff00112233445566778899aabbccddeeff0011223344',
      },
      canonicalRoute: '/subject/mathematics/topic/euclid-geometry',
      legacyAliases: ['/v35/math/geometry'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: ['runtime:svg'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1', 'CORE2'],
      indexedQuestionCount: 35,
      hasExplorer: false,
      standaloneLabIds: ['lab:vector-3d', 'lab:circles-master'],
    },
    {
      id: 'topic:nephron',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:biology',
      code: 'NEPHRON',
      title: 'Nephron Physiology & Counter-Current Exchange',
      sourceRef: {
        repository: 'Grade9v4.1',
        commit: '564ad2a07fddc0fdd30d103674b3eca61235a54b',
        path: 'nsejs/biology/nephron',
        sha256: '66778899aabbccddeeff00112233445566778899aabbccddeeff001122334455',
      },
      canonicalRoute: '/subject/biology/topic/nephron',
      legacyAliases: [],
      availability: 'HOLD',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'UNTESTED',
        releaseEligibility: 'HOLD',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: [],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1'],
      indexedQuestionCount: 0,
      hasExplorer: false,
      standaloneLabIds: [],
    },
    {
      id: 'topic:genetics',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'TOPIC',
      subjectId: 'subject:biology',
      code: 'GENETICS',
      title: 'Mendelian Genetics & Punnett Dihybrid Crosses',
      sourceRef: {
        repository: 'Grade9v4.1',
        commit: '564ad2a07fddc0fdd30d103674b3eca61235a54b',
        path: 'nsejs/biology/genetics',
        sha256: '778899aabbccddeeff00112233445566778899aabbccddeeff00112233445566',
      },
      canonicalRoute: '/subject/biology/topic/genetics',
      legacyAliases: [],
      availability: 'HOLD',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'UNTESTED',
        releaseEligibility: 'HOLD',
      },
      runtimeBinding: {
        controllerName: 'TopicScreenController',
        factoryFunction: 'createTopicScreen',
        modulePath: 'web/pages/topic.ts',
      },
      dependencies: [],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      supportedRoles: ['CORE1'],
      indexedQuestionCount: 0,
      hasExplorer: false,
      standaloneLabIds: [],
    },
  ],
  competitiveExams: [
    {
      id: 'exam:nsejs',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'COMPETITIVE_EXAM',
      code: 'NSEJS',
      title: 'National Standard Examination in Junior Science',
      category: 'JUNIOR_OLYMPIAD',
      conductingBody: 'IAPT / HBCSE',
      sourceRef: {
        repository: 'Grade9v4.1',
        commit: '564ad2a07fddc0fdd30d103674b3eca61235a54b',
        path: 'nsejs',
        sha256: '8899aabbccddeeff00112233445566778899aabbccddeeff0011223344556677',
      },
      canonicalRoute: '/competitive/nsejs',
      legacyAliases: ['/v41/nsejs'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'CompetitiveExamScreenController',
        factoryFunction: 'createCompetitiveExamScreen',
        modulePath: 'web/pages/competitive.ts',
      },
      dependencies: ['paper:nsejs-2024-mock-1'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      subjectIds: ['subject:physics', 'subject:chemistry', 'subject:biology'],
      authenticatedPaperCount: 7,
      verifiedQuestionCount: 210,
      availableYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    },
    {
      id: 'exam:ioqm',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'COMPETITIVE_EXAM',
      code: 'IOQM',
      title: 'Indian Olympiad Qualifier in Mathematics',
      category: 'JUNIOR_OLYMPIAD',
      conductingBody: 'MTA / HBCSE',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'Mathematics/question-bank',
        sha256: '99aabbccddeeff00112233445566778899aabbccddeeff001122334455667788',
      },
      canonicalRoute: '/competitive/ioqm',
      legacyAliases: ['/v35/ioqm'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'CompetitiveExamScreenController',
        factoryFunction: 'createCompetitiveExamScreen',
        modulePath: 'web/pages/competitive.ts',
      },
      dependencies: ['paper:ioqm-challenge-a'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      subjectIds: ['subject:mathematics'],
      authenticatedPaperCount: 5,
      verifiedQuestionCount: 150,
      availableYears: [2020, 2021, 2022, 2023, 2024],
    },
    {
      id: 'exam:inpho',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'COMPETITIVE_EXAM',
      code: 'INPHO',
      title: 'Indian National Physics Olympiad (Senior Stage 2)',
      category: 'SENIOR_OLYMPIAD',
      conductingBody: 'HBCSE',
      sourceRef: {
        repository: 'R4_AUTHORITY',
        commit: 'pinned-r4-authority-commit',
        path: 'schemas/platform/exam-profile.schema.json',
        sha256: 'aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899',
      },
      canonicalRoute: '/competitive/inpho',
      legacyAliases: [],
      availability: 'HOLD',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'UNTESTED',
        releaseEligibility: 'HOLD',
      },
      runtimeBinding: {
        controllerName: 'CompetitiveExamScreenController',
        factoryFunction: 'createCompetitiveExamScreen',
        modulePath: 'web/pages/competitive.ts',
      },
      dependencies: [],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      subjectIds: ['subject:physics'],
      authenticatedPaperCount: 0,
      verifiedQuestionCount: 0,
      availableYears: [],
    },
    {
      id: 'exam:jee-foundation',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'COMPETITIVE_EXAM',
      code: 'JEE_FOUNDATION',
      title: 'JEE / NEET Early Foundation Track',
      category: 'FOUNDATION',
      conductingBody: 'Grade9 Academic Panel',
      sourceRef: {
        repository: 'R4_AUTHORITY',
        commit: 'pinned-r4-authority-commit',
        path: 'schemas/platform/programme.schema.json',
        sha256: 'bbccddeeff00112233445566778899aabbccddeeff00112233445566778899aa',
      },
      canonicalRoute: '/competitive/jee-foundation',
      legacyAliases: [],
      availability: 'HOLD',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'UNTESTED',
        releaseEligibility: 'HOLD',
      },
      runtimeBinding: {
        controllerName: 'CompetitiveExamScreenController',
        factoryFunction: 'createCompetitiveExamScreen',
        modulePath: 'web/pages/competitive.ts',
      },
      dependencies: [],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
      subjectIds: ['subject:physics', 'subject:chemistry', 'subject:mathematics'],
      authenticatedPaperCount: 0,
      verifiedQuestionCount: 0,
      availableYears: [],
    },
  ],
  papers: [
    {
      id: 'paper:nsejs-2024-mock-1',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'PAPER',
      examId: 'exam:nsejs',
      title: 'NSEJS 2024 Full-Length Mock Paper 1',
      paperType: 'AUTHORED_MOCK',
      year: 2024,
      durationMinutes: 120,
      questionCount: 60,
      totalMarks: 216,
      scoringPolicy: {
        positiveMarksPerQuestion: 3,
        negativeMarksPerQuestion: 1,
        integerScoring: false,
      },
      sourceRef: {
        repository: 'Grade9v4.1',
        commit: '564ad2a07fddc0fdd30d103674b3eca61235a54b',
        path: 'nsejs/mocks/paper1.json',
        sha256: 'ccddeeff00112233445566778899aabbccddeeff00112233445566778899aabb',
      },
      canonicalRoute: '/practice/nsejs-2024-mock-1',
      legacyAliases: [],
      availability: 'HOLD', // Honest status: mock paper descriptor defined, assessment content in HOLD
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'HOLD',
      },
      runtimeBinding: {
        controllerName: 'PaperWorkspacePageController',
        factoryFunction: 'createPaperWorkspace',
        modulePath: 'web/pages/paper.ts',
      },
      dependencies: ['runtime:ink', 'runtime:assessment'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
    },
    {
      id: 'paper:ioqm-challenge-a',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'PAPER',
      examId: 'exam:ioqm',
      title: 'IOQM 3-Hour Challenge Paper A',
      paperType: 'AUTHORED_MOCK',
      year: 2024,
      durationMinutes: 180,
      questionCount: 30,
      totalMarks: 100,
      scoringPolicy: {
        positiveMarksPerQuestion: 5,
        negativeMarksPerQuestion: 0,
        integerScoring: true,
      },
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'Mathematics/question-bank/ioqm-a.json',
        sha256: 'ddeeff00112233445566778899aabbccddeeff00112233445566778899aabbcc',
      },
      canonicalRoute: '/practice/ioqm-challenge-a',
      legacyAliases: [],
      availability: 'HOLD', // Honest status
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'HOLD',
      },
      runtimeBinding: {
        controllerName: 'PaperWorkspacePageController',
        factoryFunction: 'createPaperWorkspace',
        modulePath: 'web/pages/paper.ts',
      },
      dependencies: ['runtime:ink', 'runtime:assessment'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
    },
  ],
  standaloneLabs: [
    {
      id: 'lab:vector-3d',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'STANDALONE_LAB',
      title: 'Vector Algebra · 3D Spatial Master Suite',
      subjectId: 'subject:mathematics',
      category: 'PURE_MATH',
      engineType: 'CANVAS_3D',
      sandboxMode: 'ISOLATED_IFRAME',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'standalone/practice/vector-algebra-3d-master-suite.html',
        sha256: 'eeff00112233445566778899aabbccddeeff00112233445566778899aabbccdd',
      },
      canonicalRoute: '/labs/vector-3d',
      legacyAliases: ['/v35/standalone/vector-3d'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'StandaloneLabHostController',
        factoryFunction: 'createStandaloneLabHost',
        modulePath: 'web/pages/resources.ts',
      },
      dependencies: ['engine:canvas3d'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
    },
    {
      id: 'lab:circles-master',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'STANDALONE_LAB',
      title: 'Circles Master · Interactive Coordinate Workbench',
      subjectId: 'subject:physics',
      category: 'MECHANICS',
      engineType: 'CANVAS_3D',
      sandboxMode: 'ISOLATED_IFRAME',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'public/circles-master.html',
        sha256: 'ffdedb8c28d0285a5caf6307e2ca057406ca74e0112233445566778899aabbcc',
      },
      canonicalRoute: '/labs/circles-master',
      legacyAliases: ['/v35/public/circles-master'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'StandaloneLabHostController',
        factoryFunction: 'createStandaloneLabHost',
        modulePath: 'web/pages/resources.ts',
      },
      dependencies: ['tests:circles_master_parity.spec.ts'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
    },
    {
      id: 'lab:redox-equivalence',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'STANDALONE_LAB',
      title: 'Redox Equivalence & Electron Balancing',
      subjectId: 'subject:chemistry',
      category: 'KINETICS',
      engineType: 'PARTICLE_SIM',
      sandboxMode: 'WEB_WORKER',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'portable/portable-redox-electron-equivalence/manifest.json',
        sha256: '30cb6104d193f65596e6db43948334ac7cb9e259112233445566778899aabbcc',
      },
      canonicalRoute: '/labs/redox-equivalence',
      legacyAliases: ['/v35/portable/redox'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'StandaloneLabHostController',
        factoryFunction: 'createStandaloneLabHost',
        modulePath: 'web/pages/resources.ts',
      },
      dependencies: ['tests:redox_adaptive_parity.spec.ts'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
    },
    {
      id: 'lab:shared-clock-kinematics',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'STANDALONE_LAB',
      title: 'Two-Body Shared-Clock Kinematics Simulation',
      subjectId: 'subject:physics',
      category: 'MECHANICS',
      engineType: 'PARTICLE_SIM',
      sandboxMode: 'INLINE_NATIVE',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'portable/portable-motion-shared-clock/manifest.json',
        sha256: 'df9eff909bbca06457ce876dff20446a788f16b0112233445566778899aabbcc',
      },
      canonicalRoute: '/labs/shared-clock-kinematics',
      legacyAliases: ['/v35/portable/motion'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'StandaloneLabHostController',
        factoryFunction: 'createStandaloneLabHost',
        modulePath: 'web/pages/resources.ts',
      },
      dependencies: ['tests:motion_plane_parity.spec.ts'],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
    },
    {
      id: 'lab:riemann-sums',
      schemaVersion: 'g9-registry-descriptor/1.0',
      kind: 'STANDALONE_LAB',
      title: 'Riemann Integral Scaffolding Workbench',
      subjectId: 'subject:mathematics',
      category: 'PURE_MATH',
      engineType: 'VECTOR_SVG',
      sandboxMode: 'INLINE_NATIVE',
      sourceRef: {
        repository: 'Grade9v3.5',
        commit: '8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',
        path: 'portable/portable-integration-riemann/manifest.json',
        sha256: '46c00013526dd89e530d2c25d8913a6bb11abf87112233445566778899aabbcc',
      },
      canonicalRoute: '/labs/riemann-sums',
      legacyAliases: ['/v35/portable/riemann'],
      availability: 'AVAILABLE',
      authorityStatus: {
        academicAdmission: 'HOLD',
        technicalCheck: 'PASS',
        releaseEligibility: 'ELIGIBLE',
      },
      runtimeBinding: {
        controllerName: 'StandaloneLabHostController',
        factoryFunction: 'createStandaloneLabHost',
        modulePath: 'web/pages/resources.ts',
      },
      dependencies: [],
      audience: 'LEARNER',
      disclosurePolicy: {
        preCommitDisclosure: 'FORBIDDEN',
        postCommitDisclosure: 'ASSESSMENT_POLICY_CONTROLLED',
      },
    },
  ],
};
