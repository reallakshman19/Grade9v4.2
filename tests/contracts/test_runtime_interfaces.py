"""Unit and contract tests for Workpack A12 frontend interfaces and state contracts."""
import os
import re
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TYPES_TS = ROOT / "web" / "runtime" / "types.ts"
CONTRACTS_TS = ROOT / "web" / "runtime" / "contracts.ts"
R4_INTERFACES_TS = ROOT.parent / "grade9-r4-kit" / "Grade9v4.2_Execution_Kit_R4" / "02-contracts" / "runtime" / "interfaces.ts"


class TestRuntimeInterfaces(unittest.TestCase):
    """Verifies strict TypeScript interfaces, cognitive state contracts, and platform parity."""

    @classmethod
    def setUpClass(cls):
        cls.types_content = TYPES_TS.read_text(encoding="utf-8")
        cls.contracts_content = CONTRACTS_TS.read_text(encoding="utf-8")

    def test_files_exist_and_non_empty(self):
        """Types and contracts files must exist within web/runtime/."""
        self.assertTrue(TYPES_TS.exists(), "web/runtime/types.ts missing")
        self.assertTrue(CONTRACTS_TS.exists(), "web/runtime/contracts.ts missing")
        self.assertGreater(len(self.types_content), 500)
        self.assertGreater(len(self.contracts_content), 500)

    def test_node_strip_types_compilation(self):
        """Node 22 experimental-strip-types parses both files with zero syntax errors."""
        script = (
            "import('./web/runtime/types.ts')"
            ".then(() => import('./web/runtime/contracts.ts'))"
            ".then(() => process.exit(0))"
            ".catch(err => { console.error(err); process.exit(1); })"
        )
        res = subprocess.run(
            ["node", "--experimental-strip-types", "-e", script],
            cwd=str(ROOT),
            capture_output=True,
            text=True
        )
        self.assertEqual(res.returncode, 0, f"Node type compilation failed:\n{res.stderr}")

    def test_all_thirteen_response_kinds_present(self):
        """All 13 platform response kinds must be declared in Kind enum."""
        expected_kinds = {
            "SINGLE_CHOICE",
            "MULTIPLE_CHOICE",
            "INTEGER",
            "NUMERIC_QUANTITY",
            "SYMBOLIC_EXPRESSION",
            "CONSTRUCTED_RESPONSE",
            "MATHEMATICAL_PROOF",
            "CHEMICAL_STRUCTURE",
            "REACTION_MECHANISM",
            "DATA_TABLE",
            "GRAPH",
            "EXPERIMENT_ANALYSIS",
            "MULTIPART",
        }
        for kind in expected_kinds:
            self.assertIn(f"'{kind}'", self.types_content, f"Kind '{kind}' missing in types.ts")

    def test_all_nine_cognitive_event_types_present(self):
        """All 9 canonical cognitive event types must be declared in CognitiveEventType."""
        expected_event_types = {
            "PREDICTION_COMMITTED",
            "HELP_EXPOSED",
            "FIRST_COMMITTED",
            "RECONSTRUCTION_COMMITTED",
            "DIAGNOSIS_COMMITTED",
            "REPAIR_COMMITTED",
            "BOUNDARY_COMMITTED",
            "BOUNDARY_FEEDBACK_VIEWED",
            "SOURCE_RETURNED",
        }
        for et in expected_event_types:
            self.assertIn(f"'{et}'", self.types_content, f"CognitiveEventType '{et}' missing in types.ts")

    def test_all_seven_cognitive_stages_present(self):
        """All 7 cognitive stages from R3 cognitive runtime must be declared."""
        expected_stages = {
            "PREDICT",
            "ATTEMPT",
            "RECONSTRUCT",
            "DIAGNOSE",
            "REPAIR",
            "BOUNDARY_TEST",
            "COMPLETE",
        }
        for stage in expected_stages:
            self.assertIn(f"'{stage}'", self.types_content, f"CognitiveStage '{stage}' missing in types.ts")

    def test_all_ten_explorer_stages_present(self):
        """All 10 GCDR Explorer stages must be declared in ExplorerStage."""
        expected_explorer_stages = {
            "PREDICT",
            "MANIPULATE",
            "OBSERVE",
            "CONTRADICT",
            "DECONSTRUCT",
            "RECONSTRUCT",
            "INVARIANT",
            "BOUNDARY",
            "FADE",
            "TRANSFER",
        }
        for es in expected_explorer_stages:
            self.assertIn(f"'{es}'", self.types_content, f"ExplorerStage '{es}' missing in types.ts")

    def test_immutable_attempt_contract(self):
        """Attempt interface must enforce immutable submission with readonly properties."""
        self.assertIn("interface Attempt", self.types_content)
        attempt_match = re.search(r"interface Attempt\s*\{([^}]+)\}", self.types_content)
        self.assertIsNotNone(attempt_match, "Attempt interface declaration not found")
        fields = attempt_match.group(1).split(";")
        for field in fields:
            field_clean = field.strip()
            if field_clean:
                self.assertTrue(
                    field_clean.startswith("readonly"),
                    f"Attempt field '{field_clean}' must be declared readonly"
                )

    def test_exact_ref_contract(self):
        """Ref interface must have type, id, revision, and sha256."""
        self.assertIn("interface Ref", self.types_content)
        ref_match = re.search(r"interface Ref\s*\{([^}]+)\}", self.types_content)
        self.assertIsNotNone(ref_match, "Ref interface declaration not found")
        content = ref_match.group(1)
        for expected in ("type", "id", "revision", "sha256"):
            self.assertIn(expected, content, f"Ref interface missing property '{expected}'")

    def test_all_core_subsystem_interfaces_present_in_contracts(self):
        """All core subsystem service interfaces must be present in contracts.ts."""
        expected_interfaces = [
            "interface Capability",
            "interface AssessmentEngine",
            "interface ProgressStore",
            "interface RelationService",
            "interface CognitiveStore",
            "interface DisclosurePolicy",
            "interface ScientificModelAdapter",
            "interface ResourceRegistry",
            "interface LegacyHost",
        ]
        for iface in expected_interfaces:
            self.assertIn(iface, self.contracts_content, f"Subsystem interface '{iface}' missing in contracts.ts")

    def test_no_unconstrained_any_escape_in_signatures(self):
        """No unconstrained `any` in public return types or parameter contracts."""
        # Check that neither file uses ': any;' or '): any' or '<any>'
        prohibited_patterns = [
            r":\s*any\s*;",
            r"\)\s*:\s*any\b",
            r"Promise\s*<\s*any\s*>",
            r"Array\s*<\s*any\s*>",
        ]
        for pattern in prohibited_patterns:
            self.assertIsNone(
                re.search(pattern, self.types_content),
                f"Prohibited unconstrained 'any' pattern found in types.ts: {pattern}"
            )
            self.assertIsNone(
                re.search(pattern, self.contracts_content),
                f"Prohibited unconstrained 'any' pattern found in contracts.ts: {pattern}"
            )


if __name__ == "__main__":
    unittest.main()
