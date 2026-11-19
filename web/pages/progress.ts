import {el,type PersonalContext} from './personal-host.ts';
export async function renderProgress({store,box,button,launch}:PersonalContext){
 const e=await store.evidence();box.append(el('h2','Progress evidence'),el('p','First unassisted and assisted attempts are separate; repair and boundary evidence are not mastery.'));
 const cats=['FIRST_ATTEMPT','ASSISTED','REPAIR','BOUNDARY_CHECK','ORDINARY_ATTEMPT','HISTORICAL_UNVERIFIED'] as const;
 const summary=el('div');summary.dataset.grid='true';box.append(summary);
 for(const cat of cats){const p=el('article',cat.replaceAll('_',' ')+': '+e.rows.filter(r=>r.category===cat).length);p.dataset.category=cat;summary.append(p);}
 const label=el('label','Evidence category'),filter=el('select');for(const v of ['ALL',...cats]){const o=el('option',v.replaceAll('_',' '));o.value=v;filter.append(o);}label.append(filter);box.append(label);
 const list=el('section');box.append(list);
 const render=()=>{list.replaceChildren();for(const r of e.rows.filter(v=>filter.value==='ALL'||v.category===filter.value)){const a=el('article');a.append(el('h3',r.ref.id),el('p',r.category.replaceAll('_',' ')+' · '+r.status),el('p',r.at+' · '+r.releaseId));if(r.available)button(a,'Open current diagnostic question',async()=>{if(!await launch(r.ref))throw Error('ROUTE_UNAVAILABLE');});else a.append(el('p','Historical or unavailable item; evidence retained.'));list.append(a);}};
 filter.addEventListener('change',render);render();
}
