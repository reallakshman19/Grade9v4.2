import {execFileSync} from 'node:child_process';
import type {SearchPins} from '../../web/runtime/search.ts';
export interface WireFixture{release:string;manifest:string;shards:Record<string,string>;pins:SearchPins;expected:{text:string;ids:string[]}[]}
export interface SearchFixture{actual:WireFixture;withdrawn:WireFixture;bench:WireFixture;vectors:[string,string][]}
export function searchFixture():SearchFixture{return JSON.parse(execFileSync('python',['tests/search/emit_search_fixture.py'],{encoding:'utf8',maxBuffer:20_000_000}));}
