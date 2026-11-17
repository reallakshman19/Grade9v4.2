// A13 diagnostic only. Compile-time interfaces are checked by tsc, not by the browser.
interface DiagnosticReport {
  readonly version: '4.2.0';
  readonly uiFreezeStatus: 'NOT_FROZEN';
  readonly learnerUi: 'NOT_PERMITTED';
  readonly academicAdmission: 'HOLD';
  readonly productionRelease: 'NONE';
  readonly diagnosticScript: 'INITIALIZED';
}

export function initializeBuildShell(): DiagnosticReport {
  const report: DiagnosticReport = {
    version: '4.2.0',
    uiFreezeStatus: 'NOT_FROZEN',
    learnerUi: 'NOT_PERMITTED',
    academicAdmission: 'HOLD',
    productionRelease: 'NONE',
    diagnosticScript: 'INITIALIZED',
  };
  const diag = typeof document === 'undefined' ? null : document.getElementById('diagnostics');
  if (diag) {
    diag.textContent = `Diagnostic script: ${report.diagnosticScript}\nBuild shell version: ${report.version}\nUI freeze: ${report.uiFreezeStatus}\nLearner UI: ${report.learnerUi}\nAcademic admission: ${report.academicAdmission}\nProduction release: ${report.productionRelease}\nRuntime interfaces: compile-time only; not verified by this page.`;
    diag.dataset.initialized = 'true';
  }
  return report;
}

if (typeof document !== 'undefined') initializeBuildShell();
