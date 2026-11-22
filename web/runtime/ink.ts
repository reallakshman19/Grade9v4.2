/**
 * web/runtime/ink.ts
 * A26 — Normalized digital ink stroke engine, pointer events, and artifact serialization.
 *
 * Implements:
 * - Normalized, resolution-independent stroke coordinates [0..1]
 * - Pen, highlighter, eraser, and pan modes
 * - Pointer events handling with safe pointercancel (Fault N19: zero stroke corruption)
 * - Undo and redo history stacks
 * - Typed alternative text support
 * - Non-destructive zoom and pan
 * - Orientation switch preservation (Fault N18: identical draft across rotation)
 * - SVG and JSON export/import with zero data loss
 *
 * No academic approval inferred from software validation.
 */

import type {WorkArtifact,Json} from './types.ts';
import {canonicalJson,computeSha256} from './loader.ts';
const finite=(n:number)=>typeof n==='number'&&Number.isFinite(n);
const dimension=(n:number)=>finite(n)&&n>0&&n<=100000;
const colorOk=(s:string)=>typeof s==='string'&&/^#[0-9a-f]{6}$/i.test(s);
const unit=(n:number)=>finite(n)&&n>=0&&n<=1;
export interface InkPoint {
  readonly x: number;
  readonly y: number;
  readonly pressure?: number;
  readonly time: number;
}

export type InkTool = 'pen' | 'highlighter' | 'eraser' | 'pan';

export interface InkStroke {
  readonly id: string;
  readonly tool: InkTool;
  readonly color: string;
  readonly width: number;
  readonly points: readonly InkPoint[];
  readonly createdAt: string;
}

export interface InkViewport {
  readonly width: number;
  readonly height: number;
  readonly zoom: number;
  readonly panX: number;
  readonly panY: number;
}

export interface WorkArtifactData {
  readonly id: string;
  readonly coordinateSpace:'NORMALIZED_V1';
  readonly type: 'INK' | 'TYPED_TEXT' | 'COMPOSITE';
  readonly strokes: readonly InkStroke[];
  readonly typedText: string;
  readonly viewport: InkViewport;
  readonly revision: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class InkEngine {
  private strokes: InkStroke[] = [];
  private undoStack: InkStroke[][] = [];
  private redoStack: InkStroke[][] = [];
  private inProgressPoints: InkPoint[] = [];
  private currentTool: InkTool = 'pen';
  private currentColor: string = '#000000';
  private currentWidth: number = 2.0;
  private typedText: string = '';
  private viewport: InkViewport;
  private isPointerDown: boolean = false;
  private revision: number = 1;
  private createdAt=new Date().toISOString();
  private updatedAt=this.createdAt;
  private erased=new Set<string>();
  private gestureViewport:InkViewport|null=null;
  private touch(){this.revision++;this.updatedAt=new Date().toISOString();}
  private point(x:number,y:number,pressure:number):InkPoint{
    if(!finite(x)||!finite(y)||!unit(pressure))throw Error('Invalid pointer');
    const v=this.viewport;return {x:Math.max(0,Math.min(1,(x-v.panX)/(v.width*v.zoom))),y:Math.max(0,Math.min(1,(y-v.panY)/(v.height*v.zoom))),pressure,time:Date.now()};
  }

  constructor(initialWidth: number = 800, initialHeight: number = 600) {
    if(!dimension(initialWidth)||!dimension(initialHeight))throw Error('Invalid viewport');
    this.viewport = {
      width: initialWidth,
      height: initialHeight,
      zoom: 1.0,
      panX: 0,
      panY: 0,
    };
  }

  // ---------------------------------------------------------------------------
  // Tool & Attribute Configuration
  // ---------------------------------------------------------------------------

  setTool(tool: InkTool): void {
    if(!['pen','highlighter','eraser','pan'].includes(tool))throw Error('Invalid tool');this.pointerCancel();this.currentTool=tool;
  }

  getTool(): InkTool {
    return this.currentTool;
  }

  setColor(color: string): void {
    if(!colorOk(color))throw Error('Invalid ink color');this.currentColor=color;
  }

  getColor(): string {
    return this.currentColor;
  }

  setWidth(width: number): void {
    if(!finite(width)||width<=0||width>100)throw Error('Invalid width');this.currentWidth=width;
  }

  getWidth(): number {
    return this.currentWidth;
  }

  // ---------------------------------------------------------------------------
  // Viewport, Pan & Zoom
  // ---------------------------------------------------------------------------

  getViewport(): InkViewport {
    return {...this.viewport};
  }

  setZoom(zoom: number): void {
    if(!finite(zoom))throw Error('Invalid zoom');this.pointerCancel();
    const clamped = Math.max(0.5, Math.min(zoom, 4.0));
    this.viewport = { ...this.viewport, zoom: clamped };
  }

  pan(deltaX: number, deltaY: number): void {
    if(!finite(deltaX)||!finite(deltaY)||!finite(this.viewport.panX+deltaX)||!finite(this.viewport.panY+deltaY))throw Error('Invalid pan');
    this.viewport = {
      ...this.viewport,
      panX: this.viewport.panX + deltaX,
      panY: this.viewport.panY + deltaY,
    };
  }

  /**
   * Resizes viewport (e.g. tablet orientation switch).
   * Fault N18: strokes remain normalized and identical without coordinate distortion.
   */
  resizeViewport(newWidth: number, newHeight: number): void {
    if(!dimension(newWidth)||!dimension(newHeight))throw Error('Invalid viewport');this.pointerCancel();
    this.viewport = {
      ...this.viewport,
      width: newWidth,
      height: newHeight,
    };
  }

  // ---------------------------------------------------------------------------
  // Pointer Event Lifecycle
  // ---------------------------------------------------------------------------

  pointerDown(clientX: number, clientY: number, pressure: number = 0.5): void {
    const point=this.point(clientX,clientY,pressure);
    this.pointerCancel();this.isPointerDown=true;this.gestureViewport={...this.viewport};
    this.inProgressPoints=[this.currentTool==='pan'?{x:clientX,y:clientY,pressure,time:Date.now()}:point];
    if(this.currentTool==='eraser')this.eraseAtPoint(clientX,clientY,15);
  }
  pointerMove(clientX:number,clientY:number,pressure:number=0.5):void{
    if(!this.isPointerDown)return;
    const point=this.point(clientX,clientY,pressure);
    if(this.currentTool==='pan'){const last=this.inProgressPoints.at(-1)!;this.pan(clientX-last.x,clientY-last.y);this.inProgressPoints=[{x:clientX,y:clientY,pressure,time:Date.now()}];return;}
    if(this.currentTool==='eraser'){this.eraseAtPoint(clientX,clientY,15);return;}
    if(this.inProgressPoints.length>=10000)throw Error('Stroke point limit');
    this.inProgressPoints.push(point);
  }

  pointerUp(): boolean {
    if (!this.isPointerDown) return false;
    this.isPointerDown = false;

    if(this.currentTool==='eraser'&&this.erased.size){this.recordUndoSnapshot();this.strokes=this.strokes.filter(s=>!this.erased.has(s.id));this.redoStack=[];this.touch();}
    this.erased.clear();this.gestureViewport=null;
    if (this.currentTool === 'pan' || this.currentTool === 'eraser') {this.inProgressPoints=[];return true;}

    if (this.inProgressPoints.length === 0) return false;

    if(this.strokes.length>=2000)throw Error('Stroke limit');
    // Snapshot current state for undo
    this.recordUndoSnapshot();

    const newStroke: InkStroke = {
      id: `strk-${crypto.randomUUID()}`,
      tool: this.currentTool,
      color: this.currentColor,
      width: this.currentWidth,
      points: [...this.inProgressPoints],
      createdAt: new Date().toISOString(),
    };

    this.strokes.push(newStroke);
    this.inProgressPoints = [];
    this.redoStack = []; // New stroke clears redo stack
    this.touch();
    return true;
  }

  /**
   * Pointer Cancel handler (Fault N19).
   * Immediately discards in-progress stroke buffer without corrupting completed strokes.
   */
  pointerCancel(): void {
    if(this.isPointerDown&&this.currentTool==='pan'&&this.gestureViewport)this.viewport=this.gestureViewport;
    this.isPointerDown=false;this.inProgressPoints=[];this.erased.clear();this.gestureViewport=null;
  }

  isDrawing(): boolean {
    return this.isPointerDown && this.inProgressPoints.length > 0;
  }

  getInProgressPoints(): readonly InkPoint[] {
    return structuredClone(this.inProgressPoints);
  }

  // ---------------------------------------------------------------------------
  // Eraser
  // ---------------------------------------------------------------------------

  private eraseAtPoint(x: number, y: number, radius: number): boolean {
    const v=this.viewport;let hit=false;
    for(const stroke of this.strokes)if(stroke.points.some(p=>Math.hypot(p.x*v.width*v.zoom+v.panX-x,p.y*v.height*v.zoom+v.panY-y)<=radius)){this.erased.add(stroke.id);hit=true;}
    return hit;
  }

  // ---------------------------------------------------------------------------
  // Undo & Redo
  // ---------------------------------------------------------------------------

  private recordUndoSnapshot(): void {
    this.undoStack.push([...this.strokes]);
    if (this.undoStack.length > 50) {
      this.undoStack.shift();
    }
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  undo(): boolean {
    this.pointerCancel();if (!this.canUndo()) return false;
    const previous = this.undoStack.pop();
    if (!previous) return false;

    this.redoStack.push([...this.strokes]);
    this.strokes = previous;
    this.touch();
    return true;
  }

  redo(): boolean {
    this.pointerCancel();if (!this.canRedo()) return false;
    const next = this.redoStack.pop();
    if (!next) return false;

    this.undoStack.push([...this.strokes]);
    this.strokes = next;
    this.touch();
    return true;
  }

  clear(): void {
    this.pointerCancel();if (this.strokes.length === 0) return;
    this.recordUndoSnapshot();
    this.strokes = [];
    this.redoStack = [];
    this.touch();
  }

  // ---------------------------------------------------------------------------
  // Typed Alternative Text
  // ---------------------------------------------------------------------------

  setTypedText(text: string): void {
    if(typeof text!=='string'||text.length>100000)throw Error('Invalid typed text');this.typedText=text;
    this.touch();
  }

  getTypedText(): string {
    return this.typedText;
  }

  // ---------------------------------------------------------------------------
  // Stroke Access & Export
  // ---------------------------------------------------------------------------

  getStrokes(): readonly InkStroke[] {
    return structuredClone(this.strokes);
  }

  getRevision(): number {
    return this.revision;
  }

  exportArtifact(artifactId: string = 'artifact-default'): WorkArtifactData {
    return {
      id: artifactId,
      coordinateSpace:'NORMALIZED_V1',
      type: this.strokes.length > 0 && this.typedText ? 'COMPOSITE' : this.strokes.length > 0 ? 'INK' : 'TYPED_TEXT',
      strokes: structuredClone(this.strokes),
      typedText: this.typedText,
      viewport: { ...this.viewport },
      revision: this.revision,
      createdAt:this.createdAt,
      updatedAt:this.updatedAt,
    };
  }

  importArtifact(data: WorkArtifactData): void {
    const v=data?.viewport;
    if(!data||data.coordinateSpace!=='NORMALIZED_V1'||typeof data.id!=='string'||!data.id||!Array.isArray(data.strokes)||data.strokes.length>2000||typeof data.typedText!=='string'||data.typedText.length>100000||!Number.isSafeInteger(data.revision)||data.revision<1||!Number.isFinite(Date.parse(data.createdAt))||!Number.isFinite(Date.parse(data.updatedAt))||!v||!dimension(v.width)||!dimension(v.height)||!finite(v.zoom)||v.zoom<0.5||v.zoom>4||!finite(v.panX)||!finite(v.panY))throw Error('Invalid ink artifact');
    const ids=new Set<string>();
    for(const s of data.strokes){if(!s||typeof s.id!=='string'||!s.id||ids.has(s.id)||!['pen','highlighter'].includes(s.tool)||!colorOk(s.color)||!finite(s.width)||s.width<=0||s.width>100||!Number.isFinite(Date.parse(s.createdAt))||!Array.isArray(s.points)||!s.points.length||s.points.length>10000||!s.points.every((p:InkPoint)=>p&&unit(p.x)&&unit(p.y)&&(p.pressure===undefined||unit(p.pressure))&&finite(p.time)))throw Error('Invalid ink stroke');ids.add(s.id);}
    const expected=data.strokes.length?(data.typedText?'COMPOSITE':'INK'):'TYPED_TEXT';if(data.type!==expected)throw Error('Invalid ink type');
    this.pointerCancel();this.strokes=structuredClone(data.strokes) as InkStroke[];this.typedText=data.typedText;this.viewport={...v};this.undoStack=[];this.redoStack=[];this.revision=data.revision;this.createdAt=data.createdAt;this.updatedAt=data.updatedAt;
  }
  async toWorkArtifact(sessionId:string):Promise<WorkArtifact>{
    if(!sessionId.trim())throw Error('Session identity required');
    const {id:_,...value}=this.exportArtifact();
    const digest=await computeSha256(canonicalJson({sessionId,value}));
    return {id:'ink:'+digest,kind:'INK',version:1,value:value as unknown as Json};
  }

  exportSvg(): string {
    const w = this.viewport.width;
    const h = this.viewport.height;

    const strokePaths = this.strokes.map((stroke) => {
      if (stroke.points.length === 0) return '';
      const d = stroke.points.reduce((acc, pt, idx) => {
        return idx === 0 ? `M ${pt.x*w} ${pt.y*h}` : `${acc} L ${pt.x*w} ${pt.y*h}`;
      }, '');
      const opacity = stroke.tool === 'highlighter' ? 0.4 : 1.0;
      return `<path d="${d}" fill="none" stroke="${stroke.color}" stroke-width="${stroke.width}" stroke-opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round" />`;
    });

    return (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
      strokePaths.join('\n') +
      `</svg>`
    );
  }

  exportIsotropicSvg(): string {
    const s = Math.min(this.viewport.width, this.viewport.height);
    const offsetX = (this.viewport.width - s) / 2;
    const offsetY = (this.viewport.height - s) / 2;
    const w = this.viewport.width;
    const h = this.viewport.height;

    const strokePaths = this.strokes.map((stroke) => {
      if (stroke.points.length === 0) return '';
      const d = stroke.points.reduce((acc, pt, idx) => {
        const px = offsetX + pt.x * s;
        const py = offsetY + pt.y * s;
        return idx === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
      }, '');
      const opacity = stroke.tool === 'highlighter' ? 0.4 : 1.0;
      return `<path d="${d}" fill="none" stroke="${stroke.color}" stroke-width="${stroke.width}" stroke-opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round" />`;
    });

    return (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
      strokePaths.join('\n') +
      `</svg>`
    );
  }
}

export function createInkEngine(width?: number, height?: number): InkEngine {
  return new InkEngine(width, height);
}
