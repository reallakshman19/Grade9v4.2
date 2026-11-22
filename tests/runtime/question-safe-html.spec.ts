import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderSafeQuestionMarkup} from '../../web/runtime/rendering.ts';

test('imported question HTML never retains active markup or event handler attributes',()=>{
 const html=renderSafeQuestionMarkup('<p>Conserve energy</p><img src=x onerror="window.pwned=1"><script>window.pwned=2</script><svg onload=alert(3)></svg>');
 assert.match(html,/<p>Conserve energy<\/p>/);
 assert.doesNotMatch(html,/<img|<script|<svg|onerror|onload|alert\(/i);
});

test('sanitized question text still renders accessible MathML',()=>{
 const html=renderSafeQuestionMarkup('Compute $x^{2}+y^{2}$ <img src=x onerror=alert(1)>');
 assert.match(html,/<math/);
 assert.match(html,/<msup/);
 assert.doesNotMatch(html,/<img|onerror|alert\(/i);
});
