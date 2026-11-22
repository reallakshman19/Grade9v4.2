#!/usr/bin/env python3
"""
scripts/ingest_question_lot.py
CLI Utility for Validating & Scaffolding 30-Question Lots into Grade9 STEM.

Usage:
    python scripts/ingest_question_lot.py --lot path/to/lot.json --validate --scaffold-core1a --scaffold-core1b --export
"""

import argparse
import json
import sys
from pathlib import Path

# Ensure src is on sys.path
root_dir = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root_dir / "src"))

from grade9build.lot_engine import QuestionLotEngine, LotValidationError

def main():
    parser = argparse.ArgumentParser(description="Grade9 30-Question Lot Batch Ingestion & Scaffolding Engine")
    parser.add_argument("--lot", required=True, help="Path to Question Lot Manifest JSON")
    parser.add_argument("--validate", action="store_true", help="Run 5-layer validation gate")
    parser.add_argument("--scaffold-core1a", action="store_true", help="Generate Core 1A Declarative Concept Construction")
    parser.add_argument("--scaffold-core1b", action="store_true", help="Generate Core 1B Pedagogical Reconstruction")
    parser.add_argument("--export", help="Output path for unified question entries JSON")

    args = parser.parse_args()

    lot_path = Path(args.lot)
    if not lot_path.is_file():
        print(f"Error: File not found: {lot_path}", file=sys.stderr)
        sys.exit(1)

    try:
        data = json.loads(lot_path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"Error parsing JSON from {lot_path}: {e}", file=sys.stderr)
        sys.exit(1)

    engine = QuestionLotEngine(data)
    print(f"Loaded Lot: {engine.lot_id} ({engine.subject} · {engine.topic}) with {len(engine.questions)} questions.")

    if args.validate or not (args.scaffold_core1a or args.scaffold_core1b or args.export):
        try:
            report = engine.validate_batch()
            print("\n[SUCCESS] Lot Validation Gate Passed:")
            print(f"  • Lot ID: {report['lot_id']}")
            print(f"  • Questions Validated: {report['question_count']}")
            print(f"  • Difficulty Distribution: {report['distribution']}")
        except LotValidationError as e:
            print(f"\n[FAIL] Validation findings:\n{e}", file=sys.stderr)
            sys.exit(2)

    if args.scaffold_core1a:
        core1a = engine.scaffold_core1a()
        out_file = lot_path.parent / f"core1a-{engine.topic_code.lower()}.json"
        out_file.write_text(json.dumps(core1a, indent=2), encoding="utf-8")
        print(f"\n[SCAFFOLD] Generated Core 1A Construction ({len(core1a['units'])} Units) -> {out_file}")

    if args.scaffold_core1b:
        core1b = engine.scaffold_core1b()
        out_file = lot_path.parent / f"core1b-{engine.topic_code.lower()}.json"
        out_file.write_text(json.dumps(core1b, indent=2), encoding="utf-8")
        print(f"[SCAFFOLD] Generated Core 1B Reconstruction ({len(core1b['structural_reconstruction_scenarios'])} Scenarios) -> {out_file}")

    if args.export:
        entries = engine.export_unified_entries()
        out_file = Path(args.export)
        out_file.write_text(json.dumps(entries, indent=2), encoding="utf-8")
        print(f"[EXPORT] Exported {len(entries)} UnifiedQuestionEntry objects -> {out_file}")

if __name__ == "__main__":
    main()
