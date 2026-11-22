import fs from 'node:fs';
import { CANONICAL_UNIFIED_QUESTIONS } from '../web/data/unified-questions.generated.ts';
import { UNIVERSAL_SEARCH_CORPUS as OLD_CORPUS } from '../web/runtime/universal-search-index.ts';
import { EXPLORER_ENTRIES } from '../web/pages/explorer-catalog.ts';

const canonicalMap = new Map();
for (const q of CANONICAL_UNIFIED_QUESTIONS) {
  const subject = q.subject || 'STEM';
  const topic = q.topic || '';
  const exam = q.exam ? ` · ${q.exam}` : '';
  const diff = q.difficultyBand ? `[${q.difficultyBand}]` : '';
  const title = q.title || `${q.code || q.id}: ${q.topic}`;
  const subtitle = `${subject} · ${topic}${exam} · ${diff}`;
  const route = `#/question/${encodeURIComponent(q.id || q.code)}`;
  const breadcrumb = `${subject} · ${topic} · Question`;
  const cleanStem = (q.stem || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 300).trim();
  const searchText = `${q.id} ${q.code || ''} ${q.title || ''} ${subject} ${topic} ${q.subtopic || ''} ${q.exam || ''} ${diff} ${cleanStem}`.trim();

  canonicalMap.set(q.id, {
    id: q.id,
    title,
    subtitle,
    category: 'question',
    type: 'QUESTION',
    badge: q.difficultyBand || 'QUESTION',
    route,
    breadcrumb,
    search_text: searchText,
  });
}

// 1. Curated non-questions from existing corpus (excluding any previous dynamic explorer duplicates)
const existingNonQuestions = OLD_CORPUS.filter(d => 
  d.category !== 'question' && 
  !d.id.startsWith('EXPLORER-') && 
  !d.id.startsWith('SUITE-')
);

// 2. Generate 24 GCDR Interactive Explorer search documents
const gcdrExplorerDocs = EXPLORER_ENTRIES.map(entry => {
  const normId = entry.id.replace(/[-_]/g, ' ');
  const sUrl = entry.standaloneUrl || '';
  return {
    id: `EXPLORER-${entry.id.toUpperCase().replace(/-/g, '_')}`,
    title: entry.title,
    subtitle: `${entry.subject} · ${entry.topic} · ${entry.strand} · Explorer`,
    category: 'tablet',
    type: 'EXPLORER',
    badge: 'EXPLORER',
    route: `#/explorer/${entry.id}`,
    breadcrumb: `${entry.subject} · ${entry.topic} · Interactive Explorer`,
    search_text: `${entry.id} ${normId} ${entry.title} ${entry.subject} ${entry.topic} ${entry.strand} ${entry.description} ${entry.formulaBadge} ${sUrl} interactive simulation explorer lab gcdr`.trim(),
  };
});

// 3. Generate Standalone Master Suite and Specialized Proof search documents
const masterSuiteDocs = [
  {
    id: 'SUITE-CHEM-REDOX',
    title: 'Grade 9 Bridge → JEE Chemistry · Redox Reactions Master Suite',
    subtitle: 'Chemistry · Physical · 8 Content Tracks · 20 JEE Main Questions',
    category: 'tablet',
    type: 'MASTER_SUITE',
    badge: 'MASTER SUITE',
    route: '/chemistry/redox/explorers/redox_reactions/index.html',
    breadcrumb: 'Chemistry · Redox Reactions · Master Suite',
    search_text: 'redox reactions master suite oxidation state structural exceptions cro5 butterfly cr o 5 mn o 4 permanganate disproportionation h2o2 half cell balancing oxidation number electron transfer formal charge ledger /chemistry/redox/explorers/redox_reactions/index.html jee pyqs titration n-factor equivalent weight',
  },
  {
    id: 'SUITE-CHEM-BONDING',
    title: 'Chemical Bonding & Molecular Structure · 3D Master Suite',
    subtitle: 'Chemistry · Inorganic · VSEPR & Hybridization · 20 JEE Main Questions',
    category: 'tablet',
    type: 'MASTER_SUITE',
    badge: 'MASTER SUITE',
    route: '/chemistry/bonding/explorers/chemical_bonding/index.html',
    breadcrumb: 'Chemistry · Chemical Bonding · Master Suite',
    search_text: 'chemical bonding molecular structure vsepr geometry hybridization sp3 sp2 sp dsp2 dipole moment lewis octet formal charge bond angle geometry /chemistry/bonding/explorers/chemical_bonding/index.html valence shell electron pair repulsion',
  },
  {
    id: 'SUITE-CHEM-GASES',
    title: 'Behaviour of Gases & Real Gases · Master Suite',
    subtitle: 'Chemistry · Physical · Kinetic Theory & Real Gas Laws · 20 JEE Main Questions',
    category: 'tablet',
    type: 'MASTER_SUITE',
    badge: 'MASTER SUITE',
    route: '/chemistry/gases/explorers/behaviour_of_gases/index.html',
    breadcrumb: 'Chemistry · States of Matter · Master Suite',
    search_text: 'behaviour of gases kinetic molecular theory ideal gas equation pv nrt boyle charles avogadro van der waals real gases compressibility factor z graham diffusion effusion /chemistry/gases/explorers/behaviour_of_gases/index.html',
  },
  {
    id: 'SUITE-CHEM-MOLE',
    title: 'Some Basic Concepts & Mole Concept · Master Suite',
    subtitle: 'Chemistry · Physical · Stoichiometry & Yield · 20 JEE Main Questions',
    category: 'tablet',
    type: 'MASTER_SUITE',
    badge: 'MASTER SUITE',
    route: '/chemistry/some-basic-concepts/explorers/mole_concept/index.html',
    breadcrumb: 'Chemistry · Basic Concepts · Master Suite',
    search_text: 'mole concept stoichiometry limiting reagent molarity molality normality mole fraction stp molar volume mass percentage avogadro constant /chemistry/some-basic-concepts/explorers/mole_concept/index.html',
  },
  {
    id: 'SUITE-MATH-VECTORS',
    title: 'Vector Algebra · 3D Spatial Master Suite & Question Hub',
    subtitle: 'Mathematics · Vectors & 3D · 13 JEE Main Questions',
    category: 'tablet',
    type: 'MASTER_SUITE',
    badge: 'MASTER SUITE',
    route: '/mathematics/vectors/explorers/vector_algebra/index.html',
    breadcrumb: 'Mathematics · Vector Algebra · Master Suite',
    search_text: 'vector algebra 3d spatial geometry dot product scalar product cross product vector product projection unit vector linear independence coplanar vectors /mathematics/vectors/explorers/vector_algebra/index.html',
  },
  {
    id: 'SUITE-PHYS-1D',
    title: 'Motion in 1D · Master Suite & Kinematics Question Hub',
    subtitle: 'Physics · Kinematics · Rectilinear Mechanics · 18 JEE Main Questions',
    category: 'tablet',
    type: 'MASTER_SUITE',
    badge: 'MASTER SUITE',
    route: '/physics/motion-1d/explorers/motion_in_1d/index.html',
    breadcrumb: 'Physics · Motion in 1D · Master Suite',
    search_text: 'motion in 1d one dimension kinematics position velocity acceleration displacement time graph rectilinear motion calculus derivative integral /physics/motion-1d/explorers/motion_in_1d/index.html',
  },
  {
    id: 'SUITE-PHYS-2D',
    title: 'Motions in 2D · Master Suite & Trajectory Hub',
    subtitle: 'Physics · Kinematics · 2D Motion & Projectiles · 104 Questions',
    category: 'tablet',
    type: 'MASTER_SUITE',
    badge: 'MASTER SUITE',
    route: '/physics/motion-in-2d/explorers/motions_in_2d/index.html',
    breadcrumb: 'Physics · Motion in 2D · Master Suite',
    search_text: 'motions in 2d two dimensions projectile motion trajectory angle horizontal range maximum height time of flight relative velocity phase space /physics/motion-in-2d/explorers/motions_in_2d/index.html',
  },
  {
    id: 'EXPLORER-CHEM-REDOX-ADAPTIVE-PROOF',
    title: 'Redox Adaptive Visual Proof · 50% Entry Gate',
    subtitle: 'Chemistry · Redox Reactions · Adaptive Concept Proof',
    category: 'tablet',
    type: 'EXPLORER',
    badge: 'EXPLORER',
    route: '/chemistry/redox/explorers/redox_reactions/adaptive-hard-concept-proof.html',
    breadcrumb: 'Chemistry · Redox Reactions · Adaptive Visual Proof',
    search_text: 'redox adaptive visual proof 50% entry gate oxidation state peroxide superoxide /chemistry/redox/explorers/redox_reactions/adaptive-hard-concept-proof.html',
  },
];

// Combine all non-question items (curated + 24 explorers + 8 suites)
const allNonQuestions = [...existingNonQuestions, ...gcdrExplorerDocs, ...masterSuiteDocs];

// 4. Extra unique legacy questions not in canonical database
const extraLegacyQuestions = OLD_CORPUS.filter(d => d.category === 'question' && !canonicalMap.has(d.id));

// 5. Canonical questions
const canonicalDocs = Array.from(canonicalMap.values());

// Order: Curated non-questions first (for instant discovery of topics/labs/explorers), followed by canonical and legacy questions
const fullCorpus = [...allNonQuestions, ...canonicalDocs, ...extraLegacyQuestions];

console.log('Writing updated search index with', fullCorpus.length, 'items...');
console.log('  Questions:', canonicalDocs.length + extraLegacyQuestions.length);
console.log('  Tablets & Explorers:', allNonQuestions.filter(d => d.category === 'tablet').length);
console.log('  Curriculum Topics:', allNonQuestions.filter(d => d.category === 'curriculum').length);

const fileContent = `/**
 * web/runtime/universal-search-index.ts
 * Grade9 STEM Universal Search Index & Engine
 * Full ${fullCorpus.length}-item offline indexed corpus: ${canonicalDocs.length + extraLegacyQuestions.length} Questions, ${allNonQuestions.filter(d => d.category === 'tablet').length} Tablets & Explorers, ${allNonQuestions.filter(d => d.category === 'curriculum').length} Topics & Concepts.
 * Sub-50ms instant fuzzy token search with multi-tier relevance scoring and Fault N09 answer isolation.
 */

export interface UniversalSearchDoc {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: 'question' | 'tablet' | 'curriculum' | 'other';
  readonly type: string;
  readonly badge: string;
  readonly route: string;
  readonly breadcrumb: string;
  readonly search_text: string;
}

export interface UniversalSearchCounts {
  readonly all: number;
  readonly question: number;
  readonly tablet: number;
  readonly curriculum: number;
}

export interface UniversalSearchResponse {
  readonly query: string;
  readonly category: string;
  readonly totalMatches: number;
  readonly executionTimeMs: number;
  readonly counts: UniversalSearchCounts;
  readonly results: readonly UniversalSearchDoc[];
}

export function normalizeSearchTerm(v: string): string {
  return String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/**
 * Full ${fullCorpus.length}-Item Unified STEM Corpus
 */
export const UNIVERSAL_SEARCH_CORPUS: readonly UniversalSearchDoc[] = Object.freeze(${JSON.stringify(fullCorpus, null, 2)});

function scoreItem(item: UniversalSearchDoc, tokens: string[], term: string): number {
  let score = 1000;
  const titleNorm = normalizeSearchTerm(item.title);
  const idNorm = normalizeSearchTerm(item.id);
  const textNorm = normalizeSearchTerm(item.search_text);

  if (idNorm === term || item.id === term || idNorm === 'q ' + term) score += 25000;
  else if (idNorm.includes(term)) score += 5000;

  if (titleNorm === term) score += 15000;
  else if (titleNorm.startsWith(term)) score += 6000;
  else if (tokens.length > 0 && tokens.every(tok => titleNorm.includes(tok))) score += 3000;
  else if (tokens.some(tok => titleNorm.includes(tok))) score += 1000;

  if (tokens.length > 0 && tokens.every(tok => textNorm.includes(tok))) score += 500;
  if (textNorm.includes(term)) score += 300;

  if (item.type === 'EXPLORER' || item.type === 'MASTER_SUITE') score += 800;
  else if (item.type === 'CONCEPT' || item.type === 'TOPIC') score += 400;

  return score;
}

/**
 * Queries the universal index with optional category filtering and dynamic counts.
 */
export function queryUniversalSearch(query: string = '', category: string = 'all'): UniversalSearchResponse {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const term = normalizeSearchTerm(query);
  const tokens = term.split(/\\s+/).filter(Boolean);

  let matched: UniversalSearchDoc[];
  if (!term) {
    matched = [...UNIVERSAL_SEARCH_CORPUS];
  } else {
    matched = UNIVERSAL_SEARCH_CORPUS.filter(item => {
      const hay = normalizeSearchTerm([item.title, item.id, item.search_text, item.type].join(' '));
      return tokens.every(t => {
        if (hay.includes(t)) return true;
        if (t.length >= 4) {
          const stem = t.slice(0, 4);
          if (hay.includes(stem)) return true;
        }
        return false;
      });
    });

    matched.sort((a, b) => scoreItem(b, tokens, term) - scoreItem(a, tokens, term));
  }

  const countAll = matched.length;
  const countQuestions = matched.filter(m => m.category === 'question').length;
  const countTablets = matched.filter(m => m.category === 'tablet').length;
  const countCurriculum = matched.filter(m => m.category === 'curriculum').length;

  const counts: UniversalSearchCounts = {
    all: countAll,
    question: countQuestions,
    tablet: countTablets,
    curriculum: countCurriculum,
  };

  let results: UniversalSearchDoc[];
  if (category === 'question') {
    results = matched.filter(m => m.category === 'question');
  } else if (category === 'tablet') {
    results = matched.filter(m => m.category === 'tablet');
  } else if (category === 'curriculum') {
    results = matched.filter(m => m.category === 'curriculum');
  } else {
    results = matched;
  }

  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return {
    query,
    category,
    totalMatches: results.length,
    executionTimeMs: Math.round((end - start) * 100) / 100,
    counts,
    results,
  };
}
`;

fs.writeFileSync('web/runtime/universal-search-index.ts', fileContent, 'utf8');
console.log('Successfully wrote web/runtime/universal-search-index.ts');
