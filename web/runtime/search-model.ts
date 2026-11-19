// A35 deterministic query model for the A34 1.1 integer/string wire domain.
// Casefold exceptions are Unicode 15.1 (Python 3.13); NFKC uses platform Unicode.
// The Python-produced vectors exercise all casefold-vs-lower exceptions in CI.
import type {Ref} from './types.ts';
export const FACETS=['subject','kind','programme','edition','concept'] as const;
export type Facet=typeof FACETS[number];
export type SearchFacets=Partial<Record<Facet,readonly string[]>>;
export interface SearchItem{
 readonly id:string;readonly revision:number;readonly source_ref:Ref<'QUESTION'>;readonly releaseId:string;
 readonly route:string;readonly kind:'QUESTION';readonly subjectIds:readonly string[];
 readonly title:string;readonly summary:string;readonly reviewedTerms:readonly string[];
 readonly programmeIds:readonly string[];readonly editionIds:readonly string[];readonly conceptIds:readonly string[];
 readonly publicFacets:Readonly<Record<Facet,readonly string[]>>;
}
export interface QueryRequest{readonly text:string;readonly facets?:SearchFacets;readonly limit?:number;readonly offset?:number}
export interface RankedIds{readonly results:readonly {readonly id:string;readonly score:number}[];readonly totalMatches:number;readonly suggestion:string|null}
export const BOOST={exact_id:10,exact_title:8,title_tokens:5,concept_aliases:3,summary_tokens:1} as const;
const special:Readonly<Record<string,string>>=Object.freeze({"µ":"μ","ß":"ss","ŉ":"ʼn","ſ":"s","ǰ":"ǰ","ͅ":"ι","ΐ":"ΐ","ΰ":"ΰ","ς":"σ","ϐ":"β","ϑ":"θ","ϕ":"φ","ϖ":"π","ϰ":"κ","ϱ":"ρ","ϵ":"ε","և":"եւ","ᲀ":"в","ᲁ":"д","ᲂ":"о","ᲃ":"с","ᲄ":"т","ᲅ":"т","ᲆ":"ъ","ᲇ":"ѣ","ᲈ":"ꙋ","ẖ":"ẖ","ẗ":"ẗ","ẘ":"ẘ","ẙ":"ẙ","ẚ":"aʾ","ẛ":"ṡ","ẞ":"ss","ὐ":"ὐ","ὒ":"ὒ","ὔ":"ὔ","ὖ":"ὖ","ᾀ":"ἀι","ᾁ":"ἁι","ᾂ":"ἂι","ᾃ":"ἃι","ᾄ":"ἄι","ᾅ":"ἅι","ᾆ":"ἆι","ᾇ":"ἇι","ᾈ":"ἀι","ᾉ":"ἁι","ᾊ":"ἂι","ᾋ":"ἃι","ᾌ":"ἄι","ᾍ":"ἅι","ᾎ":"ἆι","ᾏ":"ἇι","ᾐ":"ἠι","ᾑ":"ἡι","ᾒ":"ἢι","ᾓ":"ἣι","ᾔ":"ἤι","ᾕ":"ἥι","ᾖ":"ἦι","ᾗ":"ἧι","ᾘ":"ἠι","ᾙ":"ἡι","ᾚ":"ἢι","ᾛ":"ἣι","ᾜ":"ἤι","ᾝ":"ἥι","ᾞ":"ἦι","ᾟ":"ἧι","ᾠ":"ὠι","ᾡ":"ὡι","ᾢ":"ὢι","ᾣ":"ὣι","ᾤ":"ὤι","ᾥ":"ὥι","ᾦ":"ὦι","ᾧ":"ὧι","ᾨ":"ὠι","ᾩ":"ὡι","ᾪ":"ὢι","ᾫ":"ὣι","ᾬ":"ὤι","ᾭ":"ὥι","ᾮ":"ὦι","ᾯ":"ὧι","ᾲ":"ὰι","ᾳ":"αι","ᾴ":"άι","ᾶ":"ᾶ","ᾷ":"ᾶι","ᾼ":"αι","ι":"ι","ῂ":"ὴι","ῃ":"ηι","ῄ":"ήι","ῆ":"ῆ","ῇ":"ῆι","ῌ":"ηι","ῒ":"ῒ","ΐ":"ΐ","ῖ":"ῖ","ῗ":"ῗ","ῢ":"ῢ","ΰ":"ΰ","ῤ":"ῤ","ῦ":"ῦ","ῧ":"ῧ","ῲ":"ὼι","ῳ":"ωι","ῴ":"ώι","ῶ":"ῶ","ῷ":"ῶι","ῼ":"ωι","ﬀ":"ff","ﬁ":"fi","ﬂ":"fl","ﬃ":"ffi","ﬄ":"ffl","ﬅ":"st","ﬆ":"st","ﬓ":"մն","ﬔ":"մե","ﬕ":"մի","ﬖ":"վն","ﬗ":"մխ"});
function fold(c:string){const n=c.codePointAt(0)!;if(n>=0x13a0&&n<=0x13f5)return c;if(n>=0x13f8&&n<=0x13fd)return String.fromCodePoint(n-8);if(n>=0xab70&&n<=0xabbf)return String.fromCodePoint(n-0xab70+0x13a0);return Object.hasOwn(special,c)?special[c]:c.toLowerCase();}
const ws=/[\u0009-\u000d\u001c-\u0020\u0085\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]+/gu;
export function normalizeQuery(s:string){if(typeof s!=='string')throw Error('INVALID_QUERY');return Array.from(s.normalize('NFKC'),fold).join('').replace(ws,' ').replace(/^ | $/g,'');}
export function tokenize(s:string){return normalizeQuery(s).split(/[ ,;:.!?()\[\]{}"'=]+/u).filter(Boolean);}
export function safeText(s:unknown,max=1000):s is string{return typeof s==='string'&&Array.from(s).length<=max&&normalizeQuery(s).length>0&&!/[\p{Cc}\p{Cs}\p{Cf}]/u.test(s);}
export function stringList(s:unknown,p:(x:unknown)=>boolean,max=128):s is string[]{return Array.isArray(s)&&s.length<=max&&s.every(p)&&new Set(s).size===s.length;}
export function validateQuery(q:QueryRequest):Required<QueryRequest>{
 if(!q||typeof q.text!=='string'||Array.from(q.text).length>1000||/[\p{Cs}]/u.test(q.text))throw Error('INVALID_SEARCH_QUERY');
 const facets=q.facets??{},limit=q.limit??50,offset=q.offset??0;
 if(!facets||typeof facets!=='object'||Array.isArray(facets)||Object.keys(facets).some(k=>!FACETS.includes(k as Facet))||Object.values(facets).some(v=>!stringList(v,safeText))||!Number.isSafeInteger(limit)||limit<0||limit>200||!Number.isSafeInteger(offset)||offset<0||offset>10000)throw Error('INVALID_SEARCH_OPTIONS');
 return {text:q.text,facets:structuredClone(facets),limit,offset};
}
const intersect=(a:Set<string>,b:Set<string>)=>{let n=0;for(const s of a)if(b.has(s))n++;return n;};
function distance(a:string,b:string){
 const x=Array.from(a),y=Array.from(b),m=x.length,n=y.length;
 if(Math.abs(m-n)>2||m>40||n>40)return 3;
 const d=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i===0?j:j===0?i:0));
 for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){
  d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(x[i-1]===y[j-1]?0:1));
  if(i>1&&j>1&&x[i-1]===y[j-2]&&x[i-2]===y[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);
 }
 return d[m][n];
}
export class QueryModel{
 readonly #rows:readonly {item:SearchItem;id:string;title:string;titleTokens:Set<string>;terms:Set<string>;summary:Set<string>}[];
 constructor(items:readonly SearchItem[]){
  this.#rows=structuredClone(items).map(item=>({item,id:normalizeQuery(item.id),title:normalizeQuery(item.title),titleTokens:new Set(tokenize(item.title)),terms:new Set(item.reviewedTerms.flatMap(tokenize)),summary:new Set(tokenize(item.summary))}));
 }
 query(raw:QueryRequest):RankedIds{
  const q=validateQuery(raw),norm=normalizeQuery(q.text),tokens=new Set(tokenize(norm)),results:{id:string;score:number}[]=[],words=new Set<string>();
  for(const row of this.#rows){
   if(FACETS.some(k=>q.facets[k]?.length&&!q.facets[k]!.some(v=>row.item.publicFacets[k].includes(v))))continue;
   const score=(norm===row.id?BOOST.exact_id:0)+(norm===row.title?BOOST.exact_title:0)+BOOST.title_tokens*intersect(tokens,row.titleTokens)+BOOST.concept_aliases*intersect(tokens,row.terms)+BOOST.summary_tokens*intersect(tokens,row.summary);
   if(!norm||score>0)results.push({id:row.item.id,score});
   if(tokens.size===1){for(const w of [...row.titleTokens,...row.terms])if(words.size<20000&&Array.from(w).length<=40)words.add(w);}
  }
  results.sort((a,b)=>b.score-a.score||(a.id<b.id?-1:a.id>b.id?1:0));
  let suggestion:string|null=null;
  if(!results.length&&tokens.size===1&&Array.from(norm).length>=3&&Array.from(norm).length<=40){
   const candidates=[...words].map(w=>({w,d:w.startsWith(norm)?1:distance(norm,w)})).filter(v=>v.d>0&&v.d<=2);
   candidates.sort((a,b)=>a.d-b.d||(a.w<b.w?-1:a.w>b.w?1:0));suggestion=candidates[0]?.w??null;
  }
  return {results:results.slice(q.offset,q.offset+q.limit),totalMatches:results.length,suggestion};
 }
}
