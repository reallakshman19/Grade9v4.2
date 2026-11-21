import {test} from 'node:test';
import assert from 'node:assert/strict';
import {resolveUniversalSearchHref} from '../../web/runtime/search-route.ts';
import {UNIVERSAL_SEARCH_CORPUS} from '../../web/runtime/universal-search-index.ts';

test('standalone search results resolve under the application deployment subdirectory',()=>{
  const base='https://example.test/Grade9v4.2/#/search?q=redox';
  const standalone=UNIVERSAL_SEARCH_CORPUS.filter(item=>item.route.startsWith('/'));
  assert(standalone.length >= 7,'seven master suites must remain discoverable');
  for(const item of standalone) {
    const href=resolveUniversalSearchHref(item.route,base);
    assert.equal(href,'https://example.test/Grade9v4.2'+item.route);
    assert.equal(new URL(href).origin,'https://example.test');
  }
  const firstHash=UNIVERSAL_SEARCH_CORPUS.find(item=>item.route.startsWith('#/'));
  assert(firstHash);
  assert.equal(resolveUniversalSearchHref(firstHash.route,base),firstHash.route);
});

test('search resolver fails closed for absolute URLs, traversal and executable routes',()=>{
  const base='https://example.test/Grade9v4.2/';
  for(const bad of ['//evil.test/path','https://evil.test/x','javascript:alert(1)','/../x.html','/chemistry/../x.html','/%2e%2e/x.html','/chemistry/x.js','#//evil.test/path','/chemistry/x.html?download=1']) {
    assert.throws(()=>resolveUniversalSearchHref(bad,base),/SEARCH_ROUTE_INVALID/,bad);
  }
  assert.equal(resolveUniversalSearchHref('/chemistry/redox/index.html','https://example.test/'), 'https://example.test/chemistry/redox/index.html');
});
