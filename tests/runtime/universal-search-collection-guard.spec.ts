import {it} from 'node:test';
import assert from 'node:assert/strict';
import {UNIVERSAL_SEARCH_CORPUS,queryUniversalSearch} from '../../web/runtime/universal-search-index.ts';

it('unverified question deep links are labeled as collections rather than question targets',()=>{
  assert.equal(UNIVERSAL_SEARCH_CORPUS.length,1114);
  const direct=UNIVERSAL_SEARCH_CORPUS.filter(d=>d.category==='question');
  const collection=UNIVERSAL_SEARCH_CORPUS.filter(d=>d.type==='QUESTION_COLLECTION');
  assert.equal(direct.length,812);
  assert.equal(collection.length,164);
  assert(direct.every(d=>new RegExp('^#/question/[^/?#]+$').test(d.route)));
  assert(collection.every(d=>d.category==='curriculum'&&d.badge==='COLLECTION'&&
    d.breadcrumb.includes('not individual question')&&
    !new RegExp('^#/question/[^/?#]+$').test(d.route)));
  const totals=queryUniversalSearch();
  assert.equal(totals.counts.question,812);
  assert.equal(totals.counts.curriculum,208);
  for(const id of ['circ-01','M2D-Q25']){
    const result=queryUniversalSearch(id);
    const row=result.results.find(d=>d.id===id);
    assert(row&&row.type==='QUESTION_COLLECTION');
    assert(!queryUniversalSearch(id,'question').results.some(d=>d.id===id));
  }
});
