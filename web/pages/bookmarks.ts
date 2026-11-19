import {el,type PersonalContext} from './personal-host.ts';
export async function renderBookmarks({store,box,button,launch}:PersonalContext){
 const lib=await store.library();box.append(el('h2','Bookmarks'),el('p','Personal notes stay attached to the exact revision. Unavailable bookmarks retain notes but cannot navigate.'));
 const options=lib.eligible.filter(g=>!lib.bookmarks.some(b=>b.target.id===g.ref.id&&b.target.revision===g.ref.revision&&b.target.sha256===g.ref.sha256));
 if(options.length){const label=el('label','Save reviewed diagnostic question'),s=el('select');options.forEach((v,i)=>{const o=el('option',v.title);o.value=String(i);s.append(o);});label.append(s);box.append(label);button(box,'Add bookmark',async()=>{await store.addBookmark(lib.revision,options[Number(s.value)].ref);},'bookmark-add');}
 const label=el('label','Filter bookmarks'),query=el('input');query.type='search';label.append(query);box.append(label);const list=el('section');box.append(list);
 // Keep edited note controls in the DOM during filtering.
 for(const b of lib.bookmarks){const a=el('article');a.dataset.bookmark=b.id;a.append(el('h3',b.title),el('p',b.target.id+' · revision '+b.target.revision));
  const l=el('label','Personal notes'),notes=el('textarea');notes.value=b.notes;notes.maxLength=10000;notes.dataset.notes=b.id;l.append(notes);a.append(l);
  button(a,'Save notes',async()=>{await store.editBookmark(lib.revision,b.id,notes.value);},'bookmark-save');
  button(a,'Remove bookmark',async()=>{await store.removeBookmark(lib.revision,b.id);},'bookmark-remove');
  if(b.available)button(a,'Open bookmarked question',async()=>{if(!await launch(b.target))throw Error('ROUTE_UNAVAILABLE');},'bookmark-open');else a.append(el('p','Unavailable or withdrawn — notes preserved.'));
  list.append(a);
 }
 query.addEventListener('input',()=>{const q=query.value.normalize('NFKC').toLowerCase();for(const [i,a] of Array.from(list.children).entries()){const b=lib.bookmarks[i];(a as HTMLElement).hidden=!((b.title+' '+b.target.id+' '+(a.querySelector('textarea')?.value??'')).normalize('NFKC').toLowerCase().includes(q));}});
}
