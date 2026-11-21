import fs from 'node:fs';
import { CANONICAL_UNIFIED_QUESTIONS } from '../web/data/unified-questions.generated.ts';
import { UNIVERSAL_SEARCH_CORPUS as OLD_CORPUS } from '../web/runtime/universal-search-index.ts';

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

// 1. Curated non-questions (tablets, curriculum topics, portal)
const curatedNonQuestions = OLD_CORPUS.filter(d => d.category !== 'question');

// 2. Extra unique legacy questions not in canonical database
const extraLegacyQuestions = OLD_CORPUS.filter(d => d.category === 'question' && !canonicalMap.has(d.id));

// 3. Canonical questions
const canonicalDocs = Array.from(canonicalMap.values());

// Order: Curated non-questions first (for instant discovery of topics/labs), followed by canonical and legacy questions
const fullCorpus = [...curatedNonQuestions, ...canonicalDocs, ...extraLegacyQuestions];

console.log('Writing updated search index with', fullCorpus.length, 'items...');

const fileContent = `/**
 * web/runtime/universal-search-index.ts
 * Grade9 STEM Universal Search Index & Engine
 * Full ${fullCorpus.length}-item offline indexed corpus: ${canonicalDocs.length + extraLegacyQuestions.length} Questions, ${curatedNonQuestions.filter(d => d.category === 'tablet').length} Tablets, ${curatedNonQuestions.filter(d => d.category === 'curriculum').length} Topics & Concepts.
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
