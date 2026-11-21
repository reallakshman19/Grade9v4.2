import { el, type PersonalContext } from './personal-host.ts';

export async function renderProgress({ store, box, button, launch }: PersonalContext): Promise<void> {
  const e = await store.evidence();

  const title = el('h2', 'Progress evidence');
  const sub = el(
    'p',
    'First unassisted and assisted attempts are separate; repair and boundary evidence are not mastery.'
  );
  sub.className = 'subtext';
  box.append(title, sub);

  const cats = [
    'FIRST_ATTEMPT',
    'ASSISTED',
    'REPAIR',
    'BOUNDARY_CHECK',
    'ORDINARY_ATTEMPT',
    'HISTORICAL_UNVERIFIED',
  ] as const;

  // Category Summary Grid
  const summary = el('div');
  summary.dataset.grid = 'true';
  summary.style.cssText =
    'display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;margin-bottom:1.75rem;';
  box.append(summary);

  for (const cat of cats) {
    const count = e.rows.filter((r) => r.category === cat).length;
    const p = el('article', `${cat.replaceAll('_', ' ')}: ${count}`);
    p.dataset.category = cat;
    p.style.cssText =
      'background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;margin:0;font-weight:700;font-size:0.95rem;color:#0f172a;box-shadow:0 1px 2px rgba(15,23,42,0.03);font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;display:flex;align-items:center;justify-content:space-between;letter-spacing:-0.01em;';
    summary.append(p);
  }

  // Filter Section
  const filterWrap = el('div');
  filterWrap.style.cssText = 'background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:1rem;margin-bottom:1.5rem;display:flex;flex-wrap:wrap;align-items:center;gap:12px;';

  const label = el('label', 'Evidence category');
  label.style.cssText = 'margin:0;font-weight:700;font-size:0.95rem;color:#334155;';

  const filter = el('select');
  filter.style.cssText = 'min-height:48px;padding:8px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-weight:600;';

  for (const v of ['ALL', ...cats]) {
    const o = el('option', v.replaceAll('_', ' '));
    o.value = v;
    filter.append(o);
  }
  filterWrap.append(label, filter);
  box.append(filterWrap);

  const list = el('section');
  box.append(list);

  const render = () => {
    list.replaceChildren();
    const filtered = e.rows.filter((v) => filter.value === 'ALL' || v.category === filter.value);

    if (filtered.length === 0) {
      const empty = el('div');
      empty.style.cssText = 'text-align:center;padding:3rem 1rem;color:#64748b;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:10px;';
      empty.innerHTML = '<p style="font-size:1.1rem;margin:0;">No attempts recorded for this category.</p>';
      list.append(empty);
      return;
    }

    for (const r of filtered) {
      const a = el('article');
      a.style.cssText =
        'background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:1rem;box-shadow:0 2px 4px rgba(15,23,42,0.03);display:flex;flex-direction:column;gap:10px;';

      const head = el('div');
      head.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;';

      const h3 = el('h3', r.ref.id);
      h3.style.cssText = 'margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;';

      const badgeGroup = el('div');
      badgeGroup.style.cssText = 'display:flex;gap:6px;align-items:center;';

      const catBadge = el('span', r.category.replaceAll('_', ' '));
      catBadge.style.cssText =
        'background:#e0f2fe;color:#0369a1;font-size:0.8rem;font-weight:700;padding:3px 8px;border-radius:4px;';

      const statusBadge = el('span', r.status);
      statusBadge.style.cssText =
        'background:#f1f5f9;color:#475569;font-size:0.8rem;font-weight:700;padding:3px 8px;border-radius:4px;';

      badgeGroup.append(catBadge, statusBadge);
      head.append(h3, badgeGroup);

      const pMeta = el('p', `${r.at} · ${r.releaseId}`);
      pMeta.style.cssText = 'margin:0;font-size:0.88rem;color:#64748b;';

      a.append(head, pMeta);

      if (r.available) {
        const bLaunch = button(
          a,
          'Open current diagnostic question',
          async () => {
            if (!(await launch(r.ref))) throw Error('ROUTE_UNAVAILABLE');
          },
          undefined,
          'btn-primary'
        );
        bLaunch.style.alignSelf = 'flex-start';
        bLaunch.style.marginTop = '0.5rem';
      } else {
        const pNotice = el('p', 'Historical or unavailable item; evidence retained.');
        pNotice.style.cssText = 'margin:0;font-size:0.9rem;color:#94a3b8;font-style:italic;';
        a.append(pNotice);
      }
      list.append(a);
    }
  };

  filter.addEventListener('change', render);
  render();
}
