import { el, type PersonalContext } from './personal-host.ts';

export async function renderSettings({ store, box, button, action }: PersonalContext): Promise<void> {
  const p = await store.profile();
  const d = await store.diagnostics();

  const title = el('h2', 'Settings and storage');
  box.append(title);

  // Section 1: Storage Diagnostics Card
  const storageCard = el('div');
  storageCard.style.cssText =
    'background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #10b981;border-radius:12px;padding:1.5rem;margin-bottom:1.75rem;box-shadow:0 1px 3px rgba(15,23,42,0.03);';

  const cardTitle = el('h3', 'Persistence & Storage Engine');
  cardTitle.style.cssText = 'margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;';

  const pStorage = el('p', `Storage: ${d.mode} · ${d.status}`);
  pStorage.style.cssText =
    'font-size:0.95rem;font-weight:700;color:#166534;background:#f0fdf4;border:1px solid #bbf7d0;display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:6px;margin:0 0 0.75rem;font-family:ui-monospace,SFMono-Regular,monospace;';

  const pNotice = el(
    'p',
    d.mode === 'MEMORY_VOLATILE'
      ? 'Memory only: changes are not durable across reload.'
      : 'A successful probe is not a guarantee of future storage or backup.'
  );
  pNotice.style.cssText = 'margin:0;font-size:0.95rem;color:#64748b;line-height:1.5;';

  storageCard.append(cardTitle, pStorage, pNotice);
  box.append(storageCard);

  // Section 2: Typography & Text Scale Card
  const fontCard = el('div');
  fontCard.style.cssText =
    'background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin-bottom:1.75rem;box-shadow:0 1px 3px rgba(15,23,42,0.03);';

  const fontTitle = el('h3', 'Display & Text Scale');
  fontTitle.style.cssText = 'margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;';

  const font = el('p', `Text scale: ${(p.fontStep / 20).toFixed(2)}`);
  font.dataset.font = 'true';
  font.style.cssText = 'font-size:1.25rem;font-weight:800;color:#0f172a;margin:0 0 1rem;';

  const controls = el('div');
  controls.className = 'controls';
  controls.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;margin-bottom:1rem;';

  const btnDown = button(
    controls,
    'Decrease text',
    async () => {
      await store.setFontStep(p.revision, p.fontStep - 1);
    },
    'font-down'
  );
  btnDown.disabled = p.fontStep <= 17;

  const btnReset = button(
    controls,
    'Reset text',
    async () => {
      await store.setFontStep(p.revision, 20);
    },
    'font-reset'
  );

  const btnUp = button(
    controls,
    'Increase text',
    async () => {
      await store.setFontStep(p.revision, p.fontStep + 1);
    },
    'font-up',
    'btn-primary'
  );
  btnUp.disabled = p.fontStep >= 30;

  const previewBox = el('div');
  previewBox.style.cssText =
    'background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;font-size:1em;color:#334155;';
  previewBox.innerHTML =
    '<strong>Preview:</strong> <em>"The work done by a conservative force along any closed trajectory is identically zero."</em>';

  fontCard.append(fontTitle, font, controls, previewBox);
  box.append(fontCard);

  // Section 3: Backup & Restore Card
  const backupCard = el('div');
  backupCard.style.cssText =
    'background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:1.5rem;box-shadow:0 2px 4px rgba(15,23,42,0.03);';

  const h3Backup = el('h3', 'Backup and restore');
  h3Backup.style.cssText = 'margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;';

  const pBackup = el(
    'p',
    'Private files contain personal study data. Store securely. Progress and profile backups are separate; restore requires an authorized empty target. Imported attempt history is not disclosure authority.'
  );
  pBackup.style.cssText = 'margin:0 0 1.25rem;font-size:0.95rem;color:#64748b;line-height:1.5;';

  backupCard.append(h3Backup, pBackup);

  const download = async (blob: Blob, name: string) => {
    await store.assertLive();
    const url = URL.createObjectURL(blob),
      a = el('a');
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const exportRow = el('div');
  exportRow.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;margin-bottom:1.5rem;';

  button(
    exportRow,
    'Export progress archive',
    async () => download(await store.exportProgress(), 'grade9-progress.json'),
    'export-progress',
    'btn-primary'
  );

  button(
    exportRow,
    'Export bookmarks and settings',
    async () => download(await store.exportProfile(), 'grade9-profile.json'),
    'export-profile'
  );
  backupCard.append(exportRow);

  const restoreGrid = el('div');
  restoreGrid.style.cssText =
    'display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;border-top:1px solid #f1f5f9;padding-top:1.25rem;';

  for (const [name, handler] of [
    ['Restore progress history', (b: Blob) => store.importProgress(b)],
    ['Restore bookmarks and settings', (b: Blob) => store.importProfile(b)],
  ] as const) {
    const col = el('div');
    col.style.cssText = 'background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;';

    const l = el('label', name);
    l.style.cssText = 'margin:0 0 8px;font-size:0.95rem;font-weight:700;color:#334155;';

    const input = el('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.style.cssText = 'margin-bottom:10px;font-size:0.9rem;';
    l.append(input);
    col.append(l);

    button(
      col,
      name,
      async () => {
        const b = input.files?.[0];
        if (!b) throw Error('FILE_REQUIRED');
        await handler(b);
      },
      undefined,
      'btn-primary'
    );

    restoreGrid.append(col);
  }

  backupCard.append(restoreGrid);
  box.append(backupCard);
}
