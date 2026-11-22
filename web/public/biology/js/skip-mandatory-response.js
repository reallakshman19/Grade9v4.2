/**
 * skip-mandatory-response.js
 * Non-destructive audit shim for Grade9 candidate exploration and audit mode.
 */
(function() {
  window.__G9_SKIP_MANDATORY_RESPONSE = true;
  if (typeof window.skipMandatoryResponse !== 'function') {
    window.skipMandatoryResponse = function() { return true; };
  }
})();
