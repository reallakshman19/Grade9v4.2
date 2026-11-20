// Base-aware router supporting subpaths, GitHub Pages deployment, deep linking,
// query parameters, and safe return navigation without relying on server-side SPA fallback.
// Conforms to Workpack A15 specifications and Master Architecture requirements.

export type RouteType =
  | 'HOME'
  | 'SUBJECT'
  | 'TOPIC'
  | 'TOPIC_TAB'
  | 'QUESTION'
  | 'ROLE'
  | 'SEARCH'
  | 'EXAM'
  | 'COMPETITIVE'
  | 'PRACTICE'
  | 'LAB'
  | 'PERSONAL'
  | 'NOT_FOUND';

export interface RouteMatch {
  readonly type: RouteType;
  readonly path: string;
  readonly params: Readonly<Record<string, string>>;
  readonly query: Readonly<Record<string, string>>;
  readonly hash: string;
}

export type RouteListener = (match: RouteMatch) => void;

export interface RouterOptions {
  readonly basePath?: string;
  readonly useHash?: boolean;
  readonly origin?:string;
}

export class Router {
  readonly basePath: string;
  readonly useHash: boolean;
  private currentMatch: RouteMatch;
  private readonly origin:string|null;
  private readonly listeners = new Set<RouteListener>();
  private readonly historyStack: RouteMatch[] = [];

  constructor(options: RouterOptions = {}) {
    this.basePath = Router.normalizeBasePath(options.basePath || '');
    this.useHash = options.useHash ?? false;
    this.origin=options.origin??(typeof location!=='undefined'&&location.origin!=='null'?location.origin:null);
    this.currentMatch = {
      type: 'HOME',
      path: '/',
      params: {},
      query: {},
      hash: '',
    };
  }

  static normalizeBasePath(base: string): string {
    if (!base || base === '/') return '';
    let normalized = base.startsWith('/') ? base : `/${base}`;
    if (normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  }

  /**
   * Normalizes a full URL or pathname by removing the basePath prefix.
   */
  stripBasePath(pathOrUrl: string): string {
    let clean = pathOrUrl;
    // If full URL provided, extract path
    if (clean.includes('://')) {
      try {
        const u = new URL(clean);
        clean = u.pathname + u.search + u.hash;
      } catch {
        // Fallback to string handling
      }
    }

    if (this.basePath && (clean === this.basePath || clean.startsWith(this.basePath + '/') || clean.startsWith(this.basePath + '?') || clean.startsWith(this.basePath + '#'))) {
      clean = clean.slice(this.basePath.length);
    }
    if (!clean.startsWith('/')) {
      clean = `/${clean}`;
    }
    return clean;
  }

  /**
   * Parses query string into key-value map.
   */
  static parseQuery(queryString: string): Record<string, string> {
    const params: Record<string, string> = Object.create(null);
    for (const [key,value] of new URLSearchParams(queryString)) params[key]=value;
    return params;
  }

  /**
   * Matches a normalized pathname to registered platform routes.
   */
  match(pathWithQueryAndHash: string): RouteMatch {
    const invalid=():RouteMatch=>({type:'NOT_FOUND',path:pathWithQueryAndHash,params:{},query:{},hash:''});
    if(/^[\s\\/]*\/\//.test(pathWithQueryAndHash)||/^[\s]*[a-z][a-z0-9+.-]*:/i.test(pathWithQueryAndHash)){
      try{const u=new URL(pathWithQueryAndHash);if(!this.origin||u.origin!==this.origin||!['http:','https:'].includes(u.protocol)||u.username||u.password)return invalid();if(this.basePath&&!(u.pathname===this.basePath||u.pathname.startsWith(this.basePath+'/')))return invalid();}catch{return invalid();}
    }
    let stripped = this.stripBasePath(pathWithQueryAndHash);
    if(this.useHash) {
      if (stripped.startsWith('/#/')) stripped = stripped.slice(2);
      else if (stripped.startsWith('/#')) stripped = '/' + stripped.slice(2);
      else if (stripped.startsWith('#/')) stripped = stripped.slice(1);
      else if (stripped.startsWith('#')) stripped = '/' + stripped.slice(1);
    }
    try { decodeURIComponent(stripped); } catch { return {type:'NOT_FOUND',path:stripped,params:{},query:{},hash:''}; }

    // Split pathname, query, and hash
    let pathPart = stripped;
    let queryPart = '';
    let hashPart = '';

    const hashIdx = pathPart.indexOf('#');
    if (hashIdx !== -1) {
      hashPart = pathPart.slice(hashIdx + 1);
      pathPart = pathPart.slice(0, hashIdx);
    }

    const queryIdx = pathPart.indexOf('?');
    if (queryIdx !== -1) {
      queryPart = pathPart.slice(queryIdx);
      pathPart = pathPart.slice(0, queryIdx);
    }

    // Reject encoded separators, dot traversal and ambiguous decoded segments before matching.
    for(const raw of pathPart.split('/')){const part=decodeURIComponent(raw);if(part==='.'||part==='..'||/[\\/\\\\\u0000-\u001f\u007f]/.test(part))return invalid();}
    // Normalize multiple slashes and trailing slash
    pathPart = pathPart.replace(/\/+/g, '/');
    if (pathPart.length > 1 && pathPart.endsWith('/')) {
      pathPart = pathPart.slice(0, -1);
    }

    const seen=new Set<string>();for(const [key] of new URLSearchParams(queryPart)){if(seen.has(key)||['__proto__','constructor','prototype'].includes(key))return invalid();seen.add(key);}
    const query = Router.parseQuery(queryPart);

    // 1. Home Route: "/" or "/home"
    if (pathPart === '' || pathPart === '/' || pathPart === '/home') {
      return {
        type: 'HOME',
        path: '/',
        params: {},
        query,
        hash: hashPart,
      };
    }

    // 2. Search Route: "/search"
    if (pathPart === '/search') {
      return {
        type: 'SEARCH',
        path: pathPart,
        params: {},
        query,
        hash: hashPart,
      };
    }

    // 3. Question Route: "/question/:questionId"
    const questionMatch = pathPart.match(/^\/question\/([^/]+)$/);
    if (questionMatch) {
      return {
        type: 'QUESTION',
        path: pathPart,
        params: { questionId: decodeURIComponent(questionMatch[1]) },
        query,
        hash: hashPart,
      };
    }

    // 4. Topic Tab Route: "/subject/:subjectId/topic/:topicId/:tab"
    const topicTabMatch = pathPart.match(/^\/subject\/([^/]+)\/topic\/([^/]+)\/([^/]+)$/);
    if (topicTabMatch) {
      return {
        type: 'TOPIC_TAB',
        path: pathPart,
        params: {
          subjectId: decodeURIComponent(topicTabMatch[1]),
          topicId: decodeURIComponent(topicTabMatch[2]),
          tab: decodeURIComponent(topicTabMatch[3]),
        },
        query,
        hash: hashPart,
      };
    }

    // 5. Topic Route: "/subject/:subjectId/topic/:topicId"
    const topicMatch = pathPart.match(/^\/subject\/([^/]+)\/topic\/([^/]+)$/);
    if (topicMatch) {
      return {
        type: 'TOPIC',
        path: pathPart,
        params: {
          subjectId: decodeURIComponent(topicMatch[1]),
          topicId: decodeURIComponent(topicMatch[2]),
        },
        query,
        hash: hashPart,
      };
    }

    // 6. Subject Route: "/subject/:subjectId"
    const subjectMatch = pathPart.match(/^\/subject\/([^/]+)$/);
    if (subjectMatch) {
      return {
        type: 'SUBJECT',
        path: pathPart,
        params: { subjectId: decodeURIComponent(subjectMatch[1]) },
        query,
        hash: hashPart,
      };
    }

    // 7. Role Route: "/role/:coreRole/:resourceId"
    const roleMatch = pathPart.match(/^\/role\/([^/]+)\/([^/]+)$/);
    if (roleMatch) {
      return {
        type: 'ROLE',
        path: pathPart,
        params: {
          coreRole: decodeURIComponent(roleMatch[1]),
          resourceId: decodeURIComponent(roleMatch[2]),
        },
        query,
        hash: hashPart,
      };
    }

    // 8. Exam Route: "/exam/:paperId"
    const examMatch = pathPart.match(/^\/exam\/([^/]+)$/);
    if (examMatch) {
      return {
        type: 'EXAM',
        path: pathPart,
        params: { paperId: decodeURIComponent(examMatch[1]) },
        query,
        hash: hashPart,
      };
    }

    // 9. Competitive Exam Route: "/competitive/:examId"
    const compMatch = pathPart.match(/^\/competitive\/([^/]+)$/);
    if (compMatch) {
      return {
        type: 'COMPETITIVE',
        path: pathPart,
        params: { examId: decodeURIComponent(compMatch[1]) },
        query,
        hash: hashPart,
      };
    }

    // 10. Practice Paper Route: "/practice/:paperId"
    const practiceMatch = pathPart.match(/^\/practice\/([^/]+)$/);
    if (practiceMatch) {
      return {
        type: 'PRACTICE',
        path: pathPart,
        params: { paperId: decodeURIComponent(practiceMatch[1]) },
        query,
        hash: hashPart,
      };
    }

    // 11. Standalone Lab Route: "/labs/:labId"
    const labMatch = pathPart.match(/^\/labs\/([^/]+)$/);
    if (labMatch) {
      return {
        type: 'LAB',
        path: pathPart,
        params: { labId: decodeURIComponent(labMatch[1]) },
        query,
        hash: hashPart,
      };
    }

    // 12. Personal Study Route: "/personal" or "/personal/:tab"
    const personalMatch = pathPart.match(/^\/personal(?:\/([^/]+))?$/);
    if (personalMatch) {
      return {
        type: 'PERSONAL',
        path: pathPart,
        params: { tab: personalMatch[1] ? decodeURIComponent(personalMatch[1]) : 'overview' },
        query,
        hash: hashPart,
      };
    }

    // Unmatched / 404 Route
    return {
      type: 'NOT_FOUND',
      path: pathPart,
      params: {},
      query,
      hash: hashPart,
    };
  }

  /**
   * Generates a base-aware URL for navigation or href links.
   */
  toHref(relativePath: string, queryParams: Record<string, string> = {}): string {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\\)/i.test(relativePath)||this.match(relativePath).type==='NOT_FOUND') throw new Error('External or unsafe route forbidden');
    let clean = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
    const queryEntries = Object.entries(queryParams);
    if (queryEntries.length > 0) {
      const q = queryEntries
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
      clean += clean.includes('?') ? `&${q}` : `?${q}`;
    }

    if (this.useHash) {
      return `${this.basePath}/#${clean}`;
    }
    return `${this.basePath}${clean}`;
  }

  /**
   * Navigates to a new route, updating match and history stack.
   */
  navigate(targetPath: string): RouteMatch {
    const nextMatch = this.match(targetPath);
    if (JSON.stringify(nextMatch)!==JSON.stringify(this.currentMatch) && this.currentMatch.type !== 'NOT_FOUND') {
      this.historyStack.push(this.currentMatch);
    }
    this.currentMatch = nextMatch;
    this.notify();
    return nextMatch;
  }

  /**
   * Replaces current route without appending to history stack.
   */
  replace(targetPath: string): RouteMatch {
    const nextMatch = this.match(targetPath);
    this.currentMatch = nextMatch;
    this.notify();
    return nextMatch;
  }

  /**
   * Safe return navigation: Pops previous entry from history stack,
   * falling back to safe fallback route (e.g. topic or home) if stack is empty.
   */
  back(fallbackRoute: string = '/'): RouteMatch {
    const prev = this.historyStack.pop();
    if (prev && JSON.stringify(prev)!==JSON.stringify(this.currentMatch)) {
      this.currentMatch = prev;
      this.notify();
      return prev;
    }
    return this.replace(fallbackRoute);
  }

  /**
   * Returns current active route match.
   */
  getCurrent(): RouteMatch {
    return this.currentMatch;
  }

  /**
   * Subscribes to route change events.
   */
  subscribe(listener: RouteListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.currentMatch);
      } catch (err) {
        console.error('Error in route listener:', err);
      }
    }
  }
}
