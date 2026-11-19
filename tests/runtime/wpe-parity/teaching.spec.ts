import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lesson} from '../../fixtures/wave8-synthetic.ts';
import {Core1ATeachingJourney,CORE1A_ORDERED_ROLES,ANCHOR_LEVELS} from '../../../web/journeys/core1a.ts';
test('A54 actual A1-A9 teaching structure and three distinct anchor tiers; no automatic eligibility',()=>{
 const d=lesson(),j=new Core1ATeachingJourney(d);
 assert.equal(d.units.length,9);assert.deepEqual(d.units.map(u=>u.role),CORE1A_ORDERED_ROLES);
 assert.deepEqual(d.anchors.map(a=>a.level),ANCHOR_LEVELS);assert.equal(new Set(d.anchors.map(a=>a.taskRef.id)).size,3);
 for(const role of CORE1A_ORDERED_ROLES){j.selectSection(role);assert.equal(j.getActiveUnit().role,role);}
 assert.equal(j.getVisitedRoles().length,9);assert.deepEqual(j.getCompletedRoles(),[]);assert.equal(j.canRouteToFreshTransfer(),false);
 assert(!JSON.stringify(j.getLesson()).includes('SECRET_'));assert.equal(j.toggleWorkedExample('A6'),false);assert.equal(j.toggleAnchorSolution('ADVANCED'),false);
 const saved=j.toDraft();assert.throws(()=>j.restoreDraft({...saved,completedRoles:['A1']}));assert.throws(()=>j.restoreDraft({...saved,revealedAnchorSolutions:['ADVANCED']}));
});
