/**
 * web/pages/personal-overview.ts
 * Executive Overview Dashboard for My Personal Study Hub.
 */

import { el, type PersonalContext } from './personal-host.ts';
import { getActiveLearnerSession, formatSessionTime } from '../runtime/learner-activity.ts';

export async function renderOverview({ store, box, button }: PersonalContext): Promise<void> {
  const e = await store.evidence();
  const lib = await store.library();
  const diag = await store.diagnostics();
  const p = await store.profile();
  const activeSession = getActiveLearnerSession();

  // Active Session Resume Banner
  const sessionBanner = el('div');
  sessionBanner.className = 'personal-active-session-banner';
  sessionBanner.style.cssText =
    'background:linear-gradient(135deg,#e0f2fe 0%,#f0fdf4 100%);border:2px solid #0284c7;border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:1.75rem;box-shadow:0 2px 8px rgba(2,132,199,0.08);';
  sessionBanner.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="background:#0284c7;color:#ffffff;font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0.6rem;border-radius:4px;">LAST ACTIVE SESSION</span>
        ${activeSession.role ? `<span style="background:#dbeafe;color:#1e40af;font-size:0.75rem;font-weight:700;padding:0.25rem 0.5rem;border-radius:4px;">${activeSession.role}</span>` : ''}
      </div>
      <span style="font-size:0.85rem;color:#0369a1;font-weight:700;">${activeSession.progressPercent}% Progress</span>
    </div>
    <h3 style="margin:0.25rem 0;font-size:1.35rem;font-weight:800;color:#0f172a;">${activeSession.title}</h3>
    <p style="margin:0 0 0.75rem;color:#334155;font-size:0.92rem;">
      Topic: <strong>${activeSession.topicId}</strong> · ${formatSessionTime(activeSession.lastActiveAt)}
      ${activeSession.statusText ? ` · <span style="color:#0284c7;font-weight:600;">${activeSession.statusText}</span>` : ''}
    </p>
    <div style="width:100%;height:8px;background:#cbd5e1;border-radius:4px;overflow:hidden;margin-bottom:1rem;">
      <div style="height:100%;background:#0284c7;width:${activeSession.progressPercent}%;"></div>
    </div>
  `;
  button(
    sessionBanner,
    '▶ Resume Session →',
    async () => {
      window.location.hash = '#' + activeSession.route;
    },
    'btn-resume-session-overview',
    'btn-primary'
  );
  box.append(sessionBanner);

  // Active Tool Callout — Executive System Metadata Header
  const activeCallout = el('div');
  activeCallout.style.cssText =
    'background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem 1.75rem;margin-bottom:2rem;';
  activeCallout.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:0.75rem;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:6px;background:#e2e8f0;color:#0f172a;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </span>
        <h3 style="margin:0;font-size:1.15rem;color:#0f172a;font-weight:700;letter-spacing:-0.01em;">Active Tool: OVERVIEW</h3>
      </div>
      <span style="display:inline-flex;align-items:center;gap:6px;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;padding:4px 10px;border-radius:6px;font-size:0.8rem;font-weight:700;font-family:ui-monospace,SFMono-Regular,monospace;">
        <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#16a34a;"></span>
        ${diag.mode} · ${diag.status}
      </span>
    </div>
    <p style="color:#64748b;margin:0 0 1rem;font-size:0.95rem;line-height:1.6;">
      Authenticated personal data backed by IndexedDB persistence. Answers and notes are stored securely in local browser storage.
    </p>
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:20px;font-size:0.85rem;color:#475569;border-top:1px solid #e2e8f0;padding-top:0.75rem;">
      <span>Learner: <strong style="color:#0f172a;font-family:ui-monospace,SFMono-Regular,monospace;">${p.learnerId}</strong></span>
      <span>Profile: <strong style="color:#0f172a;font-family:ui-monospace,SFMono-Regular,monospace;">rev ${p.revision}</strong></span>
      <span>Text Scale: <strong style="color:#0f172a;font-family:ui-monospace,SFMono-Regular,monospace;">${(p.fontStep / 20).toFixed(2)}x</strong></span>
      <span>Admission: <strong style="color:#475569;background:#e2e8f0;padding:2px 6px;border-radius:4px;font-family:ui-monospace,SFMono-Regular,monospace;">HOLD</strong></span>
    </div>
  `;
  box.append(activeCallout);

  // Evidence Overview Stat Cards (High-Precision KPI Metrics)
  const statsGrid = el('div');
  statsGrid.style.cssText =
    'display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:2.25rem;';

  const firstAssisted = e.rows.filter((r) => r.category === 'FIRST_ATTEMPT' || r.category === 'ASSISTED').length;
  const statItems = [
    {
      label: 'Total Attempts Logged',
      val: e.rows.length,
      accent: '#0284c7',
      svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
      note: 'All recorded diagnostic attempts',
    },
    {
      label: 'First / Assisted Attempts',
      val: firstAssisted,
      accent: '#0f766e',
      svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f766e" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
      note: 'Cognitive journey attempts',
    },
    {
      label: 'Logged Mistakes',
      val: e.mistakes.length,
      accent: '#e11d48',
      svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      note: 'Failure codes & diagnoses',
    },
    {
      label: 'Saved Bookmarks',
      val: lib.bookmarks.length,
      accent: '#d97706',
      svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>`,
      note: 'Curriculum questions saved',
    },
  ];

  for (const item of statItems) {
    const card = el('div');
    card.style.cssText = `background:#ffffff;border:1px solid #e2e8f0;border-top:3px solid ${item.accent};border-radius:12px;padding:1.25rem 1.5rem;display:flex;flex-direction:column;justify-content:space-between;gap:8px;box-shadow:0 1px 3px rgba(15,23,42,0.03);`;
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:0.8rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;">${item.label}</span>
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:#f8fafc;">${item.svg}</span>
      </div>
      <div style="font-size:2.25rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;font-feature-settings:'tnum';">${item.val}</div>
      <div style="font-size:0.82rem;color:#94a3b8;">${item.note}</div>
    `;
    statsGrid.append(card);
  }
  box.append(statsGrid);

  // Learning Tools Navigation Grid (Executive Action Cards)
  const toolsHeader = el('h3', 'Personal Study Learning Suite');
  toolsHeader.style.cssText = 'margin:0 0 1rem;font-size:1.25rem;font-weight:800;color:#0f172a;letter-spacing:-0.01em;';
  box.append(toolsHeader);

  const toolsContainer = el('div');
  toolsContainer.style.cssText =
    'display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;margin-bottom:2rem;';

  const tools = [
    {
      tab: 'progress' as const,
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
      title: 'Progress Tracker',
      desc: 'Inspect full diagnostic attempts, unassisted vs assisted breakdown, and launch current curriculum questions.',
      btnText: 'Open Progress Tracker →',
    },
    {
      tab: 'mistakes' as const,
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      title: 'Mistakes Journal',
      desc: 'Review scored failure codes (INCORRECT_INTEGER, etc.), learner-recorded diagnoses, and original committed answers.',
      btnText: 'Open Mistakes Journal →',
    },
    {
      tab: 'bookmarks' as const,
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>`,
      title: 'Saved Bookmarks',
      desc: 'Bookmark questions across Physics, Chemistry, and Mathematics. Record and persist your private reflective notes.',
      btnText: 'Open Saved Bookmarks →',
    },
    {
      tab: 'settings' as const,
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
      title: 'Settings & Storage',
      desc: 'Tune responsive text scale (0.85x–1.50x), verify storage read/write probes, and export or restore study archives.',
      btnText: 'Open Settings →',
    },
  ];

  for (const t of tools) {
    const card = el('div');
    card.style.cssText =
      'background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;gap:14px;box-shadow:0 1px 3px rgba(15,23,42,0.03);';
    card.innerHTML = `
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.75rem;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:8px;background:#f1f5f9;">${t.svg}</span>
          <h4 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">${t.title}</h4>
        </div>
        <p style="margin:0;font-size:0.92rem;color:#64748b;line-height:1.55;">${t.desc}</p>
      </div>
    `;
    button(card, t.btnText, async () => {
      window.location.hash = '#/personal/' + t.tab;
    }, undefined, 'btn-primary');
    toolsContainer.append(card);
  }
  box.append(toolsContainer);
}
