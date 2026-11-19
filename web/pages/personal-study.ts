import {PersonalPageHost} from './personal-host.ts';
import {renderProgress} from './progress.ts';
import {renderMistakes} from './mistakes.ts';
import {renderBookmarks} from './bookmarks.ts';
import {renderSettings} from './settings.ts';
import type {PersonalStudyStore} from '../runtime/personal-study.ts';
import type {Router} from '../app/router.ts';
export function createPersonalStudyHost(root:HTMLElement,store:PersonalStudyStore,router:Router){return new PersonalPageHost(root,store,router,{progress:renderProgress,mistakes:renderMistakes,bookmarks:renderBookmarks,settings:renderSettings});}
