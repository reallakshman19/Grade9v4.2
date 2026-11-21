import {PersonalPageHost, type PersonalTab} from './personal-host.ts';
import {renderOverview} from './personal-overview.ts';
import {renderProgress} from './progress.ts';
import {renderMistakes} from './mistakes.ts';
import {renderBookmarks} from './bookmarks.ts';
import {renderSettings} from './settings.ts';
import type {PersonalStudyStore} from '../runtime/personal-study.ts';
import {Router} from '../app/router.ts';
import {createAuthorizedPersonalStudySession} from '../runtime/personal-study-session.ts';

export function createPersonalStudyHost(root:HTMLElement,store:PersonalStudyStore,router:Router){
  return new PersonalPageHost(root,store,router,{
    overview:renderOverview,
    progress:renderProgress,
    mistakes:renderMistakes,
    bookmarks:renderBookmarks,
    settings:renderSettings
  });
}

export async function mountPersonalStudyPage(
  root: HTMLElement,
  tab: PersonalTab = 'overview',
  onNavigate?: (route: string) => void
): Promise<{ host: PersonalPageHost; dispose: () => void }> {
  const session = await createAuthorizedPersonalStudySession();
  const router = new Router({ useHash: true });
  const host = createPersonalStudyHost(root, session.store, router);
  await host.open(tab);
  return {
    host,
    dispose: () => host.close(),
  };
}

export type { PersonalTab };
