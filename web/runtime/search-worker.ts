// Dedicated worker: only preverified records arrive from the trusted host.
// No fetch, storage, authorization, HTML or navigation inside the worker.
import {QueryModel,type SearchItem,type QueryRequest} from './search-model.ts';
type Message={id:number;type:'INIT';items:readonly SearchItem[]}|{id:number;type:'QUERY';query:QueryRequest};
const scope=globalThis as unknown as {onmessage:((e:MessageEvent<Message>)=>void)|null;postMessage:(v:unknown)=>void};
let model:QueryModel|null=null;
scope.onmessage=e=>{
 const m=e.data;
 if(!m||!Number.isSafeInteger(m.id))return;
 try{
  if(m.type==='INIT'&&!model&&Array.isArray(m.items)&&m.items.length<=10000){model=new QueryModel(m.items);scope.postMessage({id:m.id,ok:true});return;}
  if(m.type==='QUERY'&&model){scope.postMessage({id:m.id,ok:true,result:model.query(m.query)});return;}
  throw Error('INVALID_WORKER_REQUEST');
 }catch{scope.postMessage({id:m.id,ok:false});}
};
