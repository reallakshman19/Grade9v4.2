import {escapeHtml as e} from '../../runtime/rendering.ts';
import {publicModel,type Core1AModelConfig,type PublicModelConfig,type IntrinsicDepthBadge} from '../../journeys/core1a.ts';
import {getModelRegistry} from '../../runtime/models.ts';
export class Core1AModelStageController{
 private readonly config:PublicModelConfig;private params:Record<string,number>;private prediction:number|null=null;private depth:IntrinsicDepthBadge='MEDIUM';
 constructor(c:Core1AModelConfig|PublicModelConfig,d:IntrinsicDepthBadge='MEDIUM'){this.config=publicModel(c);this.params=structuredClone(this.config.defaultParameters);this.setDepthMode(d);}
 setDepthMode(d:IntrinsicDepthBadge){if(!['EASY','MEDIUM','HARD'].includes(d))throw Error('Invalid depth');this.depth=d;}
 predict(i:number){if(!Number.isInteger(i)||i<0||i>=this.config.predictionOptions.length)throw Error('Invalid prediction');this.prediction=i;}
 observe():never{throw Error('DURABLE_MODEL_EXPOSURE_REQUIRED');}
 updateParameter(k:string,v:number){const b=this.config.parameterBounds;if(!Object.hasOwn(b,k)||!Number.isFinite(v)||v<b[k].min||v>b[k].max)throw Error('Invalid model domain');this.params[k]=v;}
 computeTelemetry():null{return null;}
 async readAuthorized(binding:Parameters<ReturnType<typeof getModelRegistry>['evaluateAuthorized']>[2]){if(this.prediction===null)return null;return getModelRegistry().evaluateAuthorized(this.config.modelId,this.params,binding);}
 getViewState(){return {modelId:this.config.modelId,modelName:this.config.modelName,predictionIndex:this.prediction,isObserved:false,isDomainValid:true,domainErrorMessage:null,parameters:structuredClone(this.params),telemetry:null,minHitTargetPx:48};}
 render(){return '<section class="g9-model-stage-component"><h3>'+e(this.config.modelName)+'</h3><p>Unbound diagnostic — outputs withheld</p><p>'+e(this.config.qualitativePredictionPrompt)+'</p>'+this.config.predictionOptions.map((o,i)=>'<label style="min-height:48px"><input type="radio" name="prediction" value="'+i+'" '+(this.prediction===i?'checked':'')+'>'+e(o)+'</label>').join('')+Object.entries(this.config.parameterBounds).map(([k,b])=>'<label>'+e(k)+'<input type="range" data-parameter="'+e(k)+'" aria-label="'+e(k)+'" step="any" style="min-height:48px" min="'+b.min+'" max="'+b.max+'" value="'+this.params[k]+'"></label>').join('')+'<button disabled>Reviewed exposure required</button></section>';}
}
export type ModelStageViewState=ReturnType<Core1AModelStageController['getViewState']>;
