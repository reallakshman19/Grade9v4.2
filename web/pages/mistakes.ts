import { el, type PersonalContext } from './personal-host.ts';

export async function renderMistakes({ store, box, button, launch }: PersonalContext): Promise<void> {
  const e = await store.evidence();

  const title = el('h2', 'Mistakes notebook');
  const sub = el(
    'p',
    'Only qualified assessment failure codes or recorded learner diagnoses are shown. A recorded repair does not prove correctness.'
  );
  sub.className = 'subtext';
  box.append(title, sub);

  // Filter Bar
  const filterWrap = el('div');
  filterWrap.style.cssText =
    'background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:1rem;margin-bottom:1.5rem;display:flex;flex-wrap:wrap;align-items:center;gap:12px;';

  const label = el('label', 'Repair status');
  label.style.cssText = 'margin:0;font-weight:700;font-size:0.95rem;color:#334155;';

  const select = el('select');
  select.style.cssText = 'min-height:48px;padding:8px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-weight:600;';

  for (const [v, t] of [
    ['ALL', 'All'],
    ['OPEN', 'No repair recorded'],
    ['RECORDED', 'Repair recorded'],
  ]) {
    const o = el('option', t);
    o.value = v;
    select.append(o);
  }
  filterWrap.append(label, select);
  box.append(filterWrap);

  const list = el('section');
  box.append(list);

  const render = () => {
    list.replaceChildren();
    const filtered = e.mistakes.filter(
      (v) => select.value === 'ALL' || (select.value === 'RECORDED') === v.repairRecorded
    );

    if (filtered.length === 0) {
      const empty = el('p', 'No matching qualified mistake evidence.');
      empty.style.cssText =
        'text-align:center;padding:3rem 1rem;color:#64748b;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:10px;font-size:1.05rem;';
      list.append(empty);
      return;
    }

    for (const m of filtered) {
      const a = el('article');
      a.style.cssText =
        'background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #f43f5e;border-radius:12px;padding:1.5rem;margin-bottom:1.25rem;box-shadow:0 1px 3px rgba(15,23,42,0.03);display:flex;flex-direction:column;gap:12px;';

      const head = el('div');
      head.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;';

      const h3 = el('h3', m.ref.id);
      h3.style.cssText = 'margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;';

      const reasonPill = el('span', m.reason);
      reasonPill.style.cssText =
        'background:#ffe4e6;color:#be123c;font-weight:800;font-size:0.82rem;padding:4px 10px;border-radius:6px;border:1px solid #fecdd3;';

      head.append(h3, reasonPill);

      const statusText = m.repairRecorded
        ? 'Repair recorded — correctness not inferred.'
        : 'No repair recorded.';
      const pStatus = el('p', statusText);
      pStatus.style.cssText = `margin:0;font-size:0.92rem;font-weight:700;color:${m.repairRecorded ? '#166534' : '#b91c1c'};`;

      const pTime = el('p', m.at);
      pTime.style.cssText = 'margin:0;font-size:0.85rem;color:#64748b;';

      a.append(head, pStatus, pTime);

      if (m.diagnosis !== null) {
        const diagBox = el('div');
        diagBox.style.cssText = 'background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 14px;';
        const pDiag = el('p', 'Learner-selected diagnosis: ' + m.diagnosis);
        pDiag.style.cssText = 'margin:0;font-size:0.92rem;color:#166534;font-weight:600;';
        diagBox.append(pDiag);
        a.append(diagBox);
      }

      if (m.response) {
        const responseWrap = el('div');
        responseWrap.style.cssText = 'border-top:1px solid #f1f5f9;padding-top:0.75rem;';
        const h4 = el('h4', 'Original committed response');
        h4.style.cssText = 'margin:0 0 6px;font-size:0.95rem;font-weight:700;color:#334155;';
        const pre = el('pre', JSON.stringify(m.response, null, 2));
        responseWrap.append(h4, pre);
        a.append(responseWrap);
      }

      if (m.available) {
        const bLaunch = button(
          a,
          'Open current diagnostic question',
          async () => {
            if (!(await launch(m.ref))) throw Error('ROUTE_UNAVAILABLE');
          },
          undefined,
          'btn-primary'
        );
        bLaunch.style.alignSelf = 'flex-start';
        bLaunch.style.marginTop = '0.5rem';
      } else {
        const pNotice = el('p', 'Historical or unavailable; no recovery route admitted.');
        pNotice.style.cssText = 'margin:0;font-size:0.9rem;color:#94a3b8;font-style:italic;';
        a.append(pNotice);
      }
      list.append(a);
    }
  };

  select.addEventListener('change', render);
  render();
}
