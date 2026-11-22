import { CANONICAL_UNIFIED_QUESTIONS } from '../web/data/unified-questions.generated.ts';
import { UNIVERSAL_SEARCH_CORPUS } from '../web/runtime/universal-search-index.ts';

const existingDocMap = new Map();
for (const doc of UNIVERSAL_SEARCH_CORPUS) existingDocMap.set(doc.id, doc);

for (const q of CANONICAL_UNIFIED_QUESTIONS) {
  if (!existingDocMap.has(q.id)) {
    const subject = q.subject || 'STEM';
    const topic = q.topic || '';
    const exam = q.exam ? ` · ${q.exam}` : '';
    const diff = q.difficultyBand ? `[${q.difficultyBand}]` : '';
    const title = q.title || `${q.code || q.id}: ${q.topic}`;
    const subtitle = `${subject} · ${topic}${exam} · ${diff}`;
    const route = `#/question/${encodeURIComponent(q.id || q.code)}`;
    const breadcrumb = `${subject} · ${topic} · Question`;
    const cleanStem = (q.stem || '').replace(/<[^>]+>/g, ' ').slice(0, 300);
    const searchText = `${q.id} ${q.code || ''} ${q.title || ''} ${subject} ${topic} ${q.subtopic || ''} ${q.exam || ''} ${diff} ${cleanStem}`.trim();

    existingDocMap.set(q.id, {
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
}

const testCorpus = Array.from(existingDocMap.values());
console.log('Total Indexed Items:', testCorpus.length);
const queries = ['', 'Redox', 'Circles', 'Motion', 'velocity', '1D-Q01', 'biology', 'cell', 'kinetic', 'tangents'];

for (const q of queries) {
  const t0 = performance.now();
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = testCorpus.filter(item => {
    const hay = `${item.title} ${item.id} ${item.search_text}`.toLowerCase();
    return tokens.every(t => hay.includes(t));
  });
  const t1 = performance.now();
  console.log(`Query: "${q}" -> ${results.length} matches in ${(t1 - t0).toFixed(2)}ms`);
}
