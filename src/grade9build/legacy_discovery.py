"""Private, dual-source legacy discovery. Static closure is not browser audit."""
from __future__ import annotations
from collections import defaultdict
from html.parser import HTMLParser
import argparse
import json
from pathlib import Path, PurePosixPath
import posixpath
import re
from urllib.parse import urlsplit, unquote
from .inventory import inspect_snapshot, read_blob, PINS


class Links(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.links=[]; self.dynamic=[]
    def handle_starttag(self, tag, attrs):
        for key,val in attrs:
            if not val: continue
            if key in ('src','href','poster','data','action'):
                self.links.append(val)
            elif key in ('srcset','style') or key.startswith('on'):
                self.dynamic.append(key)
        if tag in ('script','base'): self.dynamic.append(tag)


def route_context(path, registered):
    if path in registered: return 'REGISTERED_RESOURCE'
    if path.startswith('standalone/'): return 'STANDALONE'
    if '/explorers/' in path: return 'UNREGISTERED_EXPLORER'
    if path.startswith(('public/','nsejs/','preview/')): return 'PUBLIC_ROUTE_CANDIDATE'
    if path.startswith(('workspace/','evidence/','review/','benchmarks/')): return 'HISTORICAL_OR_RESTRICTED'
    return 'OTHER_ENTRY_CONTEXT'


def static_links(path, data, paths):
    parser=Links(); parser.feed(data.decode('utf-8',errors='strict'))
    found=[]; unresolved=[]
    for value in parser.links:
        u=urlsplit(value)
        if u.scheme or u.netloc:
            if u.scheme not in ('data','mailto','tel'): unresolved.append({'reference':value,'reason':'EXTERNAL_OR_DYNAMIC'})
            continue
        if not u.path: continue
        p=unquote(u.path)
        if p.startswith('/'): unresolved.append({'reference':value,'reason':'ROOT_DEPLOYMENT_CONTEXT_REQUIRED'}); continue
        p=posixpath.normpath(posixpath.join(posixpath.dirname(path),p))
        if p not in paths and p+'/index.html' in paths: p+='/index.html'
        if p in paths: found.append(p)
        else: unresolved.append({'reference':value,'reason':'UNRESOLVED_LOCAL_REFERENCE'})
    return sorted(set(found)), unresolved, sorted(set(parser.dynamic))


def catalog(repo, source_id, inventory, registered=()):
    commit,tree=PINS[source_id]; snapshot=f'grade9{source_id}:{commit}'
    observed=inspect_snapshot(repo,commit,snapshot,tree)
    if observed['gaps']: raise ValueError('unresolved source object custody')
    expected=sorted([r for r in inventory if r['snapshot_id']==snapshot],key=lambda r:r['path'])
    if expected!=observed['records']: raise ValueError('independent inventory equality failed')
    return catalog_observed(repo,source_id,observed,registered)


def catalog_observed(repo,source_id,observed,registered=()):
    rows={r['path']:r for r in observed['records']}; objects={r['path']:r for r in observed['objects']}
    if len(rows)!=len(observed['records']) or rows.keys()!=objects.keys(): raise ValueError('incomplete or duplicate inventory')
    registered=set(registered)
    resource_occurrences=[]; registry_gaps=[]; blueprint_ids=[]; portable_ids=[]
    def json_at(path):
        return json.loads(read_blob(repo,objects[path]['git_blob'],rows[path]['size']))
    registry='public/data/resource-registry.v1.json'
    if registry in rows:
        for entry in json_at(registry):
            artifact=entry.get('artifact',{}); url=artifact.get('entrypoint'); target=None
            if isinstance(url,str):
                u=urlsplit(url); candidate=posixpath.normpath('public/'+unquote(u.path).lstrip('/'))
                if not u.scheme and not u.netloc and candidate in rows: target=candidate; registered.add(target)
            resource_occurrences.append({'registry':registry,'id':entry.get('id'),'kind':entry.get('resource_kind'),'audience':entry.get('audience'),'entrypoint':url,'path':target,'generated':artifact.get('generated'),'eligibility':'HOLD'})
            if target is None: registry_gaps.append({'id':entry.get('id'),'reason':'UNRESOLVED_OR_GENERATED_RESOURCE'})
    bp='Shared/web/interactive-page-blueprints.v1.json'
    if bp in rows:
        blueprint_ids=[{'id':x['id'],'version':x['version'],'roles':x['core_roles']} for x in json_at(bp)['blueprints']]
    for path in sorted(rows):
        if path.startswith('public/portable-workbench/packages/') and path.endswith('.json'):
            portable_ids.append({'path':path,'id':json_at(path)['id']})
    missing=registered-rows.keys()
    if missing: raise ValueError('registered path missing: '+repr(sorted(missing)))
    groups=defaultdict(list); html=[]; graph={}
    for p in sorted(rows):
        if not p.lower().endswith(('.html','.htm')): continue
        row=rows[p]; oid=objects[p]['git_blob']; groups[oid].append(p)
        try: deps,gaps,dynamic=static_links(p,read_blob(repo,oid,row['size']),rows.keys())
        except (UnicodeError,ValueError) as exc: deps,gaps,dynamic=[],[{'reason':'PARSE_BLOCKED','detail':str(exc)}],[]
        graph[p]=deps
        html.append({**row,'git_blob':oid,'entry_context':route_context(p,registered),'static_dependencies':deps,'unresolved_references':gaps,'dynamic_features':dynamic,'browser_audit':'NOT_RUN','eligibility':'HOLD'})
    for row in html:
        seen=set(); todo=list(graph[row['path']]);
        while todo:
            q=todo.pop()
            if q in seen: continue
            seen.add(q); todo.extend(graph.get(q,[]))
        row['static_html_closure']=sorted(seen); row['closure_status']='PARTIAL_STATIC_ONLY'
    paths=sorted(rows)
    packages=[p for p in paths if re.fullmatch(r'(Physics|Chemistry|Mathematics)/library/[^/]+\.v1\.json',p)]
    manifests=[p for p in paths if p.lower().endswith('.json') and re.search(r'manifest|registry|index|blueprint|adapter|package|topic',p,re.I)]
    return {'source_id':source_id,'commit':observed['commit'],'tree':observed['tree'],'tracked_paths':len(rows),'html_paths':html,'duplicate_groups':{k:v for k,v in groups.items() if len(v)>1},'unique_html_blobs':len(groups),'standalone':[p for p in paths if p.startswith('standalone/') and p.lower().endswith(('.html','.htm'))],'explorer_entrypoints':[p for p in paths if '/explorers/' in p and p.endswith('/index.html')],'root_library_packages':packages,'portable_manifests':[p for p in paths if p.startswith('public/portable-workbench/packages/') and p.endswith('.json')],'manifest_candidates':manifests,'registered_paths':sorted(registered),'generated_variant_candidates':[p for p in paths if re.search(r'generated|publication|preview|dist|build',p,re.I)],'resource_occurrences':resource_occurrences,'registry_gaps':registry_gaps,'native_blueprints':blueprint_ids,'portable_packages':portable_ids,'dynamic_closure':'NOT_RUN','owner_local_scope':observed['owner_local_scope'],'status':'HOLD'}


def discover_dual(repos, inventory, registered):
    if set(repos)!=set(PINS): raise ValueError('both exact sources required')
    expected_ids={f'grade9{k}:{v[0]}' for k,v in PINS.items()}
    if {r['snapshot_id'] for r in inventory}!=expected_ids: raise ValueError('unexpected or missing snapshot')
    return {key:catalog(repos[key],key,inventory,registered.get(key,())) for key in PINS}


def main():
    p=argparse.ArgumentParser(); p.add_argument('--v35',required=True); p.add_argument('--v41',required=True); p.add_argument('--inventory-v35',required=True); p.add_argument('--inventory-v41',required=True); p.add_argument('--output',required=True); p.add_argument('--target-root',required=True)
    a=p.parse_args(); out=Path(a.output).resolve()
    if any(out.is_relative_to(Path(x).resolve()) for x in (a.v35,a.v41,a.target_root)): raise ValueError('private discovery output must be external')
    records=[]
    for path in (a.inventory_v35,a.inventory_v41):
        data=json.loads(Path(path).read_text()); records.extend(data['records'])
    result=discover_dual({'v35':a.v35,'v41':a.v41},records,{})
    out.parent.mkdir(parents=True,exist_ok=True); out.write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')

if __name__=='__main__': main()
