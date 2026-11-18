/**
 * web/pages/topic.ts
 * A22 — Topic screen controller.
 *
 * Implements:
 * - Dynamic topic detail with real question/item and resource counts
 * - Six Core role navigation links scoped to this specific topic
 * - Safe unavailable states (HOLD status, missing topic)
 * - Explorer and Resource catalogue links
 * - No hardcoded topic lists
 *
 * No academic approval inferred from software validation.
 */

import { ALL_SIX_CORE_ROLES } from './home.ts';
import type { CoreRoleEntry } from './home.ts';

export interface TopicDetail {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly subjectId: string;
  readonly subjectCode: string;
  readonly strand?: string;
  readonly status: 'AVAILABLE' | 'HOLD';
  readonly verifiedQuestionCount: number;
  readonly interactiveModelCount: number;
  readonly resourceCount: number;
  readonly description?: string;
}

export interface TopicViewState {
  readonly status: 'LOADING' | 'POPULATED' | 'UNAVAILABLE';
  readonly topic: TopicDetail | null;
  readonly coreRoleActions: readonly CoreRoleEntry[];
  readonly explorerRoute: string;
  readonly resourceCatalogueRoute: string;
  readonly reason?: string;
}

export class TopicScreenController {
  private topic: TopicDetail | null = null;
  private state: TopicViewState;

  constructor(initialTopic?: TopicDetail) {
    if (initialTopic) {
      this.loadTopic(initialTopic);
    } else {
      this.state = {
        status: 'LOADING',
        topic: null,
        coreRoleActions: [],
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
      };
    }
  }

  loadTopic(topic: TopicDetail): void {
    this.topic = topic;
    this.updateState();
  }

  setUnavailable(reason: string): void {
    this.topic = null;
    this.state = {
      status: 'UNAVAILABLE',
      topic: null,
      coreRoleActions: [],
      explorerRoute: '/explorer',
      resourceCatalogueRoute: '/resources',
      reason,
    };
  }

  getViewState(): TopicViewState {
    return this.state;
  }

  private updateState(): void {
    if (!this.topic) {
      this.state = {
        status: 'UNAVAILABLE',
        topic: null,
        coreRoleActions: [],
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: 'No topic loaded.',
      };
      return;
    }

    if (this.topic.status === 'HOLD') {
      this.state = {
        status: 'UNAVAILABLE',
        topic: this.topic,
        coreRoleActions: [],
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: `Topic '${this.topic.title}' is on HOLD pending independent academic qualification.`,
      };
      return;
    }

    const topicCode = this.topic.code.toLowerCase();
    const subjectCode = this.topic.subjectCode.toLowerCase();

    const coreRoleActions = ALL_SIX_CORE_ROLES.map((r) => ({
      ...r,
      path: `/topic/${subjectCode}/${topicCode}/${r.role.toLowerCase()}`,
    }));

    this.state = {
      status: 'POPULATED',
      topic: this.topic,
      coreRoleActions,
      explorerRoute: `/explorer?topic=${topicCode}`,
      resourceCatalogueRoute: `/resources?topic=${topicCode}`,
    };
  }
}

export function createTopicScreen(topic?: TopicDetail): TopicScreenController {
  return new TopicScreenController(topic);
}
