import hashlib, os, subprocess, tempfile, unittest
from pathlib import Path
from grade9build.inventory import *

class InventoryTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(); self.addCleanup(self.tmp.cleanup); self.repo=Path(self.tmp.name)
        git(self.repo,'init','-q'); git(self.repo,'config','user.name','fixture'); git(self.repo,'config','user.email','fixture@example.invalid')
    def commit(self):
        git(self.repo,'add','.'); git(self.repo,'commit','-qm','fixture'); return git(self.repo,'rev-parse','HEAD').decode().strip()
    @unittest.skipIf(os.name == 'nt', 'NTFS reserved characters and symlinks not supported on Windows user tokens')
    def test_names_binary_symlink_duplicate(self):
        names=[' leading','trailing ','tab\tname','new\nline','é.txt','literal\\backslash']; data=b'\0\xff\n'
        for p in names: (self.repo/p).write_bytes(data)
        os.symlink('missing',self.repo/'link'); (self.repo/names[0]).chmod(0o755); c=self.commit(); r=inspect_snapshot(self.repo,c,'fixture:one'); rows={x['path']:x for x in r['records']}
        self.assertEqual(set(rows),set(names+['link'])); self.assertEqual(rows[names[0]]['mode'],493); self.assertEqual(rows['link']['kind'],'SYMLINK'); self.assertEqual(rows['link']['sha256'],hashlib.sha256(b'missing').hexdigest()); self.assertEqual({rows[p]['sha256'] for p in names},{hashlib.sha256(data).hexdigest()})
    def test_gitlink_and_lfs_block(self):
        (self.repo/'x').write_bytes(LFS+b'oid sha256:'+b'a'*64+b'\nsize 5\n'); c=self.commit(); git(self.repo,'update-index','--add','--cacheinfo','160000,'+c+',sub'); git(self.repo,'commit','-qm','sub'); r=inspect_snapshot(self.repo,'HEAD','fixture:one'); self.assertEqual({g['kind'] for g in r['gaps']},{'GITLINK','LFS_POINTER'}); self.assertRaises(ValueError,enumerate_git_snapshot,self.repo,'HEAD','fixture:one')
    def test_wrong_tree_and_missing_blob(self):
        (self.repo/'x').write_text('x'); c=self.commit(); self.assertRaises(ValueError,inspect_snapshot,self.repo,c,'fixture:one','0'*40); self.assertRaises(ValueError,read_blob,self.repo,'0'*40,1)
    def test_schema_duplicate_and_bad_hash(self):
        (self.repo/'x').write_text('x'); c=self.commit(); rows=enumerate_git_snapshot(self.repo,c,'fixture:one'); self.assertTrue(validate_inventory_data(rows)[0]); self.assertFalse(validate_inventory_data(rows*2)[0]); self.assertFalse(validate_inventory_data([{**rows[0],'sha256':'bad'}])[0])

    def test_reserved_snapshot_rejects_wrong_identity(self):
        (self.repo/'x').write_text('x'); c=self.commit(); self.assertRaises(ValueError,inspect_snapshot,self.repo,c,'grade9v35:wrong')
