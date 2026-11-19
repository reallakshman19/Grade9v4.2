// A53 corrected diagnostic structure. A shape check is not academic admission.
import {refOk} from '../runtime/progress.ts';
import type {ReasoningCell,Ref} from '../runtime/types.ts';
export const QRT_OPERATIONS=['RETRIEVE','EXPLAIN','APPLY','MODEL','REPRESENT','SYNTHESIZE','JUSTIFY'] as const;
export const DEMAND_BANDS=['D1','D2','D3','D4'] as const;
export type QrtOperation=typeof QRT_OPERATIONS[number];
export type DemandBand=typeof DEMAND_BANDS[number];
export type MatrixCellState='EMPTY'|'PENDING_REVIEW'|'UNAVAILABLE'|'SYNTHETIC_STRUCTURAL';
const keys=['schema_version','cell_id','subject_id','topic_ref','operation','demand_band','native_contract_ref','instances','main','status','c06_v11'].sort().join(',');
const subjects=['PHYSICS','CHEMISTRY','MATHEMATICS','BIOLOGY'];
const task=(r:Ref)=>refOk(r)&&['QUESTION','FRESH_TASK','CONSTRUCTION'].includes(r.type);
export function validateC06(cell:ReasoningCell):{valid:boolean;errors:readonly string[]}{
 const errors:string[]=[];
 if(!cell||typeof cell!=='object'||Object.keys(cell).sort().join(',')!==keys||cell.schema_version!=='g9-reasoning-cell/1'||typeof cell.cell_id!=='string'||!cell.cell_id.trim()||!subjects.includes(cell.subject_id)||!QRT_OPERATIONS.includes(cell.operation)||!DEMAND_BANDS.includes(cell.demand_band)||!refOk(cell.topic_ref)||!refOk(cell.native_contract_ref)||!['SYNTHETIC','HOLD','CANDIDATE'].includes(cell.status)||typeof cell.c06_v11!=='boolean'||!Array.isArray(cell.instances)||!cell.instances.every(task)||cell.main!==null&&!task(cell.main))return {valid:false,errors:['INVALID_CELL_SCHEMA']};
 if(cell.c06_v11&&(!cell.main||cell.instances.length<2))errors.push('C06_MAIN_AND_TWO_INSTANCES_REQUIRED');
 const refs=[...cell.instances,...(cell.main?[cell.main]:[])];
 if(new Set(refs.map(r=>r.id)).size!==refs.length||new Set(refs.map(r=>r.sha256)).size!==refs.length)errors.push('C06_TASK_ALIAS');
 return {valid:errors.length===0,errors};
}
export function evaluateCellState(cell?:ReasoningCell|null):MatrixCellState{
 if(!cell)return 'EMPTY';if(!validateC06(cell).valid)return 'UNAVAILABLE';
 if(cell.status!=='SYNTHETIC'||!cell.c06_v11)return 'PENDING_REVIEW';
 return 'SYNTHETIC_STRUCTURAL';
}
export class ReasoningMatrixComponent{
 readonly #cells:readonly ReasoningCell[];
 constructor(cells:readonly ReasoningCell[]){
  const list=structuredClone(cells);if(!list.every(c=>validateC06(c).valid))throw Error('INVALID_CELL');
  if(new Set(list.map(c=>c.cell_id)).size!==list.length||new Set(list.map(c=>c.operation+':'+c.demand_band)).size!==list.length)throw Error('DUPLICATE_CELL');
  this.#cells=list;
 }
 getCell(op:QrtOperation,band:DemandBand){return structuredClone(this.#cells.find(c=>c.operation===op&&c.demand_band===band)??null);}
 getSummary(){const counts={EMPTY:0,PENDING_REVIEW:0,UNAVAILABLE:0,SYNTHETIC_STRUCTURAL:0};for(const op of QRT_OPERATIONS)for(const band of DEMAND_BANDS)counts[evaluateCellState(this.getCell(op,band))]++;return {total:28,...counts};}
}
