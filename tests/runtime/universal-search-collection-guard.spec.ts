import {it} from 'node:test';
import assert from 'node:assert/strict';
import {CANONICAL_UNIFIED_QUESTIONS} from '../../web/data/unified-questions.generated.ts';
import {UNIVERSAL_SEARCH_CORPUS,queryUniversalSearch} from '../../web/runtime/universal-search-index.ts';

it('question search makes target existence, collection-only and unavailable records distinguishable',()=>{
  assert.equal(UNIVERSAL_SEARCH_CORPUS.length,1114);
  assert.equal(CANONICAL_UNIFIED_QUESTIONS.length,737);
  const ids=new Set(CANONICAL_UNIFIED_QUESTIONS.map(q=>q.id));
  const direct=UNIVERSAL_SEARCH_CORPUS.filter(d=>d.category==='question');
  const collection=UNIVERSAL_SEARCH_CORPUS.filter(d=>d.type==='QUESTION_COLLECTION');
  const unavailable=UNIVERSAL_SEARCH_CORPUS.filter(d=>d.type==='QUESTION_UNAVAILABLE');
  assert.equal(direct.length,737);
  assert.equal(collection.length,164);
  assert.equal(unavailable.length,75);
  assert(direct.every(d=>d.route==='#/question/'+d.id&&ids.has(d.id)));
  assert(collection.every(d=>d.category==='curriculum'&&d.badge==='COLLECTION'&&
    d.breadcrumb.includes('not individual question')&&
    !/^#\/question\/[^/?#]+$/.test(d.route)));
  assert(unavailable.every(d=>d.category==='curriculum'&&d.badge==='NOT READY'&&
    d.breadcrumb.includes('No question target')&&!ids.has(d.id)));
  const totals=queryUniversalSearch();
  assert.equal(totals.counts.question,737);
  assert.equal(totals.counts.curriculum,283);
  for(const id of ['circ-01','M2D-Q25']){
    const row=queryUniversalSearch(id).results.find(d=>d.id===id);
    assert(row&&row.type==='QUESTION_COLLECTION');
    assert(!queryUniversalSearch(id,'question').results.some(d=>d.id===id));
  }
  const missing=queryUniversalSearch('Q-PHY-WPE-B1-01').results.find(d=>d.id==='Q-PHY-WPE-B1-01');
  assert(missing&&missing.type==='QUESTION_UNAVAILABLE');
  assert(!queryUniversalSearch('Q-PHY-WPE-B1-01','question').results.some(d=>d.id==='Q-PHY-WPE-B1-01'));
});
