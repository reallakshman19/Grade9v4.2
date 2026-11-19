import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
it('A53 corrected diagnostic matrix: actual click, keyboard, compact layout and revoked launch',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');
 const browser=await chromium.launch({headless:true});try{
 const page=await browser.newPage({viewport:{width:1000,height:800}});await page.goto('http://127.0.0.1:'+addr.port+'/');
 const path='/@fs/'+process.cwd()+'/tests/fixtures/a53-synthetic.ts';
 await page.evaluate(async path=>{const {a53Fixture}=await import(path),{mountReasoningPage}=await import('/pages/reasoning.ts' as string);const x=await a53Fixture(),c=await x.create(),h=mountReasoningPage(document.getElementById('app')!,c);(window as any).a53={x,c,h};await h.refresh();},path);
 assert.equal(await page.locator('[data-coord]').count(),28);
 await page.locator('[data-coord="RETRIEVE:D1"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator(':focus').getAttribute('data-coord'),'RETRIEVE:D2');
 await page.locator('[data-coord="APPLY:D2"]').click();await page.getByRole('button',{name:'Open main question'}).waitFor();assert.equal(await page.getByRole('button',{name:'Open instance question'}).count(),0);
 await page.setViewportSize({width:360,height:640});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.equal(await page.evaluate(()=>Array.from(document.querySelectorAll('.g9-a53 button')).every(n=>{const r=n.getBoundingClientRect();return r.width>=48&&r.height>=48;})),true);
 await page.evaluate(()=> (window as any).a53.x.revoke());await page.getByRole('button',{name:'Open main question'}).click();await page.getByText('Reviewed diagnostic curriculum unavailable.').waitFor();assert.equal(await page.locator('[data-coord]').count(),0);
 }finally{await browser.close();await server.close();}
});
