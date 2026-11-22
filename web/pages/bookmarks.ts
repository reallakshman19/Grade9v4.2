import { el, type PersonalContext } from './personal-host.ts';

export async function renderBookmarks({ store, box, button, launch }: PersonalContext): Promise<void> {
  const lib = await store.library();

  const title = el('h2', 'Bookmarks');
  const sub = el(
    'p',
    'Personal notes stay attached to the exact revision. Unavailable bookmarks retain notes but cannot navigate.'
  );
  sub.className = 'subtext';
  box.append(title, sub);

  const options = lib.eligible.filter(
    (g) =>
      !lib.bookmarks.some(
        (b) =>
          b.target.id === g.ref.id &&
          b.target.revision === g.ref.revision &&
          b.target.sha256 === g.ref.sha256
      )
  );

  // Add Bookmark Section
  if (options.length) {
    const addCard = el('div');
    addCard.style.cssText =
      'background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:2rem;display:flex;flex-direction:column;gap:12px;box-shadow:0 1px 3px rgba(15,23,42,0.03);';

    const cardTitle = el('h3', 'Save Reviewed Diagnostic Question');
    cardTitle.style.cssText = 'margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;';

    const label = el('label', 'Save reviewed diagnostic question');
    label.style.cssText = 'margin:0;font-weight:600;font-size:0.9rem;color:#475569;';

    const s = el('select');
    s.style.cssText = 'min-height:48px;padding:8px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-weight:600;';

    options.forEach((v, i) => {
      const o = el('option', v.title);
      o.value = String(i);
      s.append(o);
    });
    label.append(s);

    addCard.append(cardTitle, label);

    const bAdd = button(
      addCard,
      'Add bookmark',
      async () => {
        await store.addBookmark(lib.revision, options[Number(s.value)].ref);
      },
      'bookmark-add',
      'btn-primary'
    );
    bAdd.style.alignSelf = 'flex-start';
    bAdd.style.marginTop = '4px';

    box.append(addCard);
  }

  // Search Filter Bar
  const searchWrap = el('div');
  searchWrap.style.cssText =
    'background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:10px 16px;margin-bottom:1.5rem;display:flex;align-items:center;gap:10px;box-shadow:0 1px 2px rgba(15,23,42,0.04);';

  const label = el('label', 'Filter bookmarks');
  label.style.cssText = 'margin:0;display:flex;align-items:center;gap:10px;width:100%;font-weight:700;color:#334155;';

  const query = el('input');
  query.type = 'search';
  query.placeholder = 'Search saved bookmarks by title, question ID, or notes content…';
  query.style.cssText = 'flex:1;min-height:48px;padding:8px 14px;border:1.5px solid #cbd5e1;border-radius:8px;';

  label.append(query);
  searchWrap.append(label);
  box.append(searchWrap);

  const list = el('section');
  box.append(list);

  if (lib.bookmarks.length === 0) {
    const empty = el('div');
    empty.style.cssText =
      'text-align:center;padding:3rem 1.5rem;background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:12px;color:#64748b;';
    empty.innerHTML = `
      <p style="font-size:1.15rem;font-weight:700;color:#0f172a;margin:0 0 6px;">No Bookmarks Saved Yet</p>
      <p style="font-size:0.95rem;margin:0;">Select a reviewed question from the dropdown above to save it with your private study notes.</p>
    `;
    list.append(empty);
  }

  // Keep edited note controls in the DOM during filtering
  for (const b of lib.bookmarks) {
    const a = el('article');
    a.dataset.bookmark = b.id;
    a.style.cssText =
      'background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 2px 4px rgba(15,23,42,0.03);display:flex;flex-direction:column;gap:14px;';

    const header = el('div');
    header.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:8px;';

    const h3 = el('h3', b.title);
    h3.style.cssText = 'margin:0;font-size:1.25rem;font-weight:700;color:#0f172a;';

    const refPill = el('span', `${b.target.id} · revision ${b.target.revision}`);
    refPill.style.cssText =
      'background:#e0f2fe;color:#0369a1;font-size:0.8rem;font-weight:700;padding:4px 8px;border-radius:4px;';

    header.append(h3, refPill);

    const l = el('label', 'Personal notes');
    l.style.cssText = 'margin:0;font-weight:700;font-size:0.95rem;color:#334155;';

    const notes = el('textarea');
    notes.value = b.notes;
    notes.maxLength = 10000;
    notes.dataset.notes = b.id;
    notes.placeholder = 'Write your private reflection notes, formulas, or reminders for this question…';
    l.append(notes);

    const actions = el('div');
    actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;align-items:center;';

    button(
      actions,
      'Save notes',
      async () => {
        await store.editBookmark(lib.revision, b.id, notes.value);
      },
      'bookmark-save'
    );

    if (b.available) {
      button(
        actions,
        'Open bookmarked question',
        async () => {
          if (!(await launch(b.target))) throw Error('ROUTE_UNAVAILABLE');
        },
        'bookmark-open',
        'btn-primary'
      );
    } else {
      const pWithdrawn = el('span', 'Unavailable or withdrawn — notes preserved.');
      pWithdrawn.style.cssText = 'font-size:0.9rem;color:#94a3b8;font-style:italic;';
      actions.append(pWithdrawn);
    }

    button(
      actions,
      'Remove bookmark',
      async () => {
        await store.removeBookmark(lib.revision, b.id);
      },
      'bookmark-remove',
      'btn-danger'
    );

    a.append(header, l, actions);
    list.append(a);
  }

  query.addEventListener('input', () => {
    const q = query.value.normalize('NFKC').toLowerCase();
    for (const [i, a] of Array.from(list.children).entries()) {
      const b = lib.bookmarks[i];
      if (!b) continue;
      (a as HTMLElement).hidden = !(
        b.title +
        ' ' +
        b.target.id +
        ' ' +
        (a.querySelector('textarea')?.value ?? '')
      )
        .normalize('NFKC')
        .toLowerCase()
        .includes(q);
    }
  });
}
