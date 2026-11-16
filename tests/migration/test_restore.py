import hashlib, os, tempfile, unittest
from pathlib import Path
from grade9build.inventory import git,enumerate_git_snapshot
from grade9build.restore import *

class RestoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(); self.addCleanup(self.tmp.cleanup); self.root=Path(self.tmp.name); self.repo=self.root/'repo'; self.repo.mkdir(); git(self.repo,'init','-q'); git(self.repo,'config','user.name','fixture'); git(self.repo,'config','user.email','fixture@example.invalid'); (self.repo/'x').write_bytes(b'abc'); (self.repo/'x').chmod(0o755); os.symlink('missing',self.repo/'link'); git(self.repo,'add','.'); git(self.repo,'commit','-qm','fixture'); self.rows=enumerate_git_snapshot(self.repo,'HEAD','fixture:one'); self.backup=self.root/'backup'; restore_snapshot_from_git(self.repo,'HEAD',self.rows,self.backup)
    def test_backup_restore_exact(self):
        dest=self.root/'restore'; self.assertEqual(restore_from_backup(self.rows,self.backup,dest)['verified_files'],2); self.assertTrue((dest/'link').is_symlink()); self.assertEqual(os.readlink(dest/'link'),'missing')
    def test_mode_rejected(self):
        (self.backup/'x').chmod(0o644); self.assertRaises(ValueError,verify_restored_directory,self.rows,self.backup)
    def test_type_rejected(self):
        (self.backup/'x').unlink(); os.symlink('abc',self.backup/'x'); self.assertRaises(ValueError,verify_restored_directory,self.rows,self.backup)
    def test_extra_dangling_rejected(self):
        os.symlink('absent',self.backup/'extra'); self.assertRaises(ValueError,verify_restored_directory,self.rows,self.backup)
    def test_unknown_empty_or_extras_rejected(self):
        self.assertRaises(ValueError,verify_restored_directory,self.rows,self.backup,'unknown'); self.assertRaises(ValueError,verify_restored_directory,[],self.backup); self.assertRaises(ValueError,verify_restored_directory,self.rows,self.backup,None,True)
    def test_aliases_rejected(self):
        for p in ['a/../x','a/./x','a//x','/x','C:x','a\\x','..','']:
            self.assertRaises(ValueError,safe_rel_path,p)
    def test_tampered_missing_rejected(self):
        (self.backup/'x').write_bytes(b'xyz'); self.assertRaises(ValueError,verify_restored_directory,self.rows,self.backup); (self.backup/'x').unlink(); self.assertRaises(ValueError,verify_restored_directory,self.rows,self.backup)
    def test_partial_inventory_rejected(self):
        self.assertRaises(ValueError,restore_snapshot_from_git,self.repo,'HEAD',self.rows[:1],self.root/'partial')
    def test_root_and_ancestor_symlink_rejected(self):
        os.symlink(self.backup,self.root/'alias'); self.assertRaises(ValueError,verify_restored_directory,self.rows,self.root/'alias')
