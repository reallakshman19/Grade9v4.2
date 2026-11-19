"""Summarize actual npm advisory response without claiming an unavailable audit passed."""
import json
import subprocess
import sys

p = subprocess.run(["npm", "audit", "--json"], capture_output=True, text=True, timeout=90)
try:
    report = json.loads(p.stdout)
    counts = report["metadata"]["vulnerabilities"]
    if p.returncode not in (0, 1) or not all(isinstance(counts[k], int) for k in ("info", "low", "moderate", "high", "critical", "total")):
        raise ValueError("bad audit result")
except (KeyError, ValueError, TypeError):
    print(json.dumps({"audit": "UNAVAILABLE", "exit": p.returncode}))
    sys.exit(0)
print(json.dumps({"audit": "COMPLETED", "counts": counts, "status": "ADVISORIES_PRESENT" if counts["total"] else "NO_REPORTED_ADVISORIES"}))
