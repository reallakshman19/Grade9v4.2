import tempfile, unittest
from pathlib import Path
from grade9build.inventory import git,inspect_snapshot
from grade9build.legacy_discovery import catalog_observed,discover_dual,static_links

class DiscoveryTests(unittest.TestCase):
    def test_occurrences_and_closure(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp); git(p,'init','-q'); git(p,'config','user.name','fixture'); git(p,'config','user.email','fixture@example.invalid'); (p/'a').mkdir(); (p/'b').mkdir()
            for x in ['a','b']:
                (p/x/'index.html').write_text('<a href="next.html">next</a>'); (p/x/'next.html').write_text(x)
            git(p,'add','.'); git(p,'commit','-qm','fixture'); obs=inspect_snapshot(p,'HEAD','fixture:one'); r=catalog_observed(p,'fixture',obs,['a/index.html']); self.assertEqual(len(r['html_paths']),4); self.assertEqual(r['unique_html_blobs'],3); self.assertEqual(len(r['duplicate_groups']),1); self.assertEqual(r['html_paths'][0]['static_dependencies'],['a/next.html']); self.assertEqual(r['html_paths'][2]['static_dependencies'],['b/next.html']); self.assertTrue(all(x['eligibility']=='HOLD' for x in r['html_paths'])); self.assertRaises(ValueError,catalog_observed,p,'fixture',obs,['missing.html'])
    def test_unresolved_dynamic(self):
        found,gaps,dynamic=static_links('a/index.html',b'<script src="s.js"></script><a href="/route">x</a><a href="missing">y</a>',{'a/s.js'}); self.assertEqual(found,['a/s.js']); self.assertEqual(len(gaps),2); self.assertIn('script',dynamic)
    def test_missing_dual_inputs(self):
        self.assertRaises(ValueError,discover_dual,{},[],{})

    def test_registry_is_input_derived(self):
        import json
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp); git(p,'init','-q'); git(p,'config','user.name','fixture'); git(p,'config','user.email','fixture@example.invalid'); (p/'public/data').mkdir(parents=True)
            (p/'public/index.html').write_text('<p>fixture</p>'); (p/'public/data/resource-registry.v1.json').write_text(json.dumps([{'id':'fixture','artifact':{'entrypoint':'index.html'},'resource_kind':'OPAQUE_APP'}])); git(p,'add','.'); git(p,'commit','-qm','fixture')
            result=catalog_observed(p,'fixture',inspect_snapshot(p,'HEAD','fixture:one')); self.assertEqual(result['registered_paths'],['public/index.html']); self.assertEqual(result['resource_occurrences'][0]['id'],'fixture'); self.assertEqual(result['native_blueprints'],[]); self.assertEqual(result['portable_packages'],[])
