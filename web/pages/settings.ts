import {el,type PersonalContext} from './personal-host.ts';
export async function renderSettings({store,box,button,action}:PersonalContext){
 const p=await store.profile(),d=await store.diagnostics();box.append(el('h2','Settings and storage'),el('p','Storage: '+d.mode+' · '+d.status),el('p',d.mode==='MEMORY_VOLATILE'?'Memory only: changes are not durable across reload.':'A successful probe is not a guarantee of future storage or backup.'));
 const font=el('p','Text scale: '+(p.fontStep/20).toFixed(2));font.dataset.font='true';box.append(font);
 const controls=el('div');controls.className='controls';box.append(controls);
 button(controls,'Decrease text',async()=>{await store.setFontStep(p.revision,p.fontStep-1);},'font-down').disabled=p.fontStep<=17;
 button(controls,'Increase text',async()=>{await store.setFontStep(p.revision,p.fontStep+1);},'font-up').disabled=p.fontStep>=30;
 button(controls,'Reset text',async()=>{await store.setFontStep(p.revision,20);},'font-reset');
 box.append(el('h3','Backup and restore'),el('p','Private files contain personal study data. Store securely. Progress and profile backups are separate; restore requires an authorized empty target. Imported attempt history is not disclosure authority.'));
 const download=async(blob:Blob,name:string)=>{await store.assertLive();const url=URL.createObjectURL(blob),a=el('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 button(box,'Export progress archive',async()=>download(await store.exportProgress(),'grade9-progress.json'),'export-progress');
 button(box,'Export bookmarks and settings',async()=>download(await store.exportProfile(),'grade9-profile.json'),'export-profile');
 for(const [name,handler] of [['Restore progress history',(b:Blob)=>store.importProgress(b)],['Restore bookmarks and settings',(b:Blob)=>store.importProfile(b)]] as const){
  const l=el('label',name),input=el('input');input.type='file';input.accept='application/json,.json';l.append(input);box.append(l);
  button(box,name,async()=>{const b=input.files?.[0];if(!b)throw Error('FILE_REQUIRED');await handler(b);});
 }
}
