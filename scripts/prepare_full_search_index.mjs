import { CANONICAL_UNIFIED_QUESTIONS } from '../web/data/unified-questions.generated.ts';
import { UNIVERSAL_SEARCH_CORPUS as OLD_CORPUS } from '../web/runtime/universal-search-index.ts';
import fs from 'node:fs';

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

// Extract curated non-question items (tablets, curriculum, portal)
const curatedNonQuestions = OLD_CORPUS.filter(d => d.category !== 'question');

// Extract unique legacy questions not in canonical database
const extraLegacyQuestions = OLD_CORPUS.filter(d => d.category === 'question' && !canonicalMap.has(d.id));

console.log('Curated non-questions:', curatedNonQuestions.length);
console.log('Canonical questions:', canonicalMap.size);
console.log('Extra legacy questions:', extraLegacyQuestions.length);
console.log('Total:', curatedNonQuestions.length + canonicalMap.size + extraLegacyQuestions.length);
