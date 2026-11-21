/** Resolve universal-search destinations in a GitHub Pages subpath safely.
 * Hash routes belong to the SPA; standalone HTML resources belong under the
 * current deployed app directory, never the domain origin.
 */
export function resolveUniversalSearchHref(route: string, pageHref: string): string {
  if (typeof route !== 'string' || !route.trim()) throw Error('SEARCH_ROUTE_INVALID');
  if (route.startsWith('#/') && !route.startsWith('#//') &&
      !/[\\\r\n]/.test(route)) return route;

  // Explicitly allow only packaged, root-relative HTML in the curated corpus.
  // No absolute URLs, protocols, dot-segments or protocol-relative destinations.
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.html$/.test(route)) {
    throw Error('SEARCH_ROUTE_INVALID');
  }
  const base = new URL('./',pageHref);
  if (!['https:','http:'].includes(base.protocol)) throw Error('SEARCH_BASE_INVALID');
  return new URL('.'+route,base).href;
}
