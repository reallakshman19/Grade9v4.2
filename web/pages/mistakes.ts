import {el,type PersonalContext} from './personal-host.ts';
export async function renderMistakes({store,box,button,launch}:PersonalContext){
 const e=await store.evidence();box.append(el('h2','Mistakes notebook'),el('p','Only qualified assessment failure codes or recorded learner diagnoses are shown. A recorded repair does not prove correctness.'));
 const label=el('label','Repair status'),select=el('select');for(const [v,t] of [['ALL','All'],['OPEN','No repair recorded'],['RECORDED','Repair recorded']]){const o=el('option',t);o.value=v;select.append(o);}label.append(select);box.append(label);
 const list=el('section');box.append(list);
 const render=()=>{list.replaceChildren();for(const m of e.mistakes.filter(v=>select.value==='ALL'||(select.value==='RECORDED')===v.repairRecorded)){const a=el('article');a.append(el('h3',m.ref.id),el('p',m.reason),el('p',m.repairRecorded?'Repair recorded — correctness not inferred.':'No repair recorded.'),el('p',m.at));if(m.diagnosis!==null)a.append(el('p','Learner-selected diagnosis: '+m.diagnosis));if(m.response)a.append(el('h4','Original committed response'),el('pre',JSON.stringify(m.response,null,2)));if(m.available)button(a,'Open current diagnostic question',async()=>{if(!await launch(m.ref))throw Error('ROUTE_UNAVAILABLE');});else a.append(el('p','Historical or unavailable; no recovery route admitted.'));list.append(a);}if(!list.childElementCount)list.append(el('p','No matching qualified mistake evidence.'));};
 select.addEventListener('change',render);render();
}
