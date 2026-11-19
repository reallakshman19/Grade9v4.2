"""Actual advisory identities and fix metadata; never interpret unavailable as cleared."""
import json
import subprocess
import sys

def npm_audit():
    p=subprocess.run(["npm","audit","--json"],capture_output=True,text=True,timeout=90)
    try:
        report=json.loads(p.stdout)
        counts=report["metadata"]["vulnerabilities"]
        if p.returncode not in (0,1) or not all(type(counts[k]) is int and counts[k]>=0 for k in ("info","low","moderate","high","critical","total")):
            raise ValueError("bad audit result")
        if sum(counts[k] for k in ("info","low","moderate","high","critical"))!=counts["total"]:
            raise ValueError("bad totals")
        rows=[]
        for name,v in sorted(report.get("vulnerabilities",{}).items()):
            rows.append({"package":name,"severity":v["severity"],"range":v.get("range"),"direct":v.get("isDirect"),
                         "via":[{k:a.get(k) for k in ("source","name","title","url","severity","range")} if isinstance(a,dict) else a for a in v.get("via",[])],
                         "fixAvailable":v.get("fixAvailable")})
        if len(rows)!=counts["total"]:raise ValueError("bad advisory count")
        return {"audit":"COMPLETED","counts":counts,"advisories":rows,
                "status":"ADVISORIES_PRESENT" if counts["total"] else "NO_REPORTED_ADVISORIES"}
    except (KeyError,ValueError,TypeError):
        return {"audit":"UNAVAILABLE","exit":p.returncode}

if __name__=="__main__":
    try: result=npm_audit()
    except (subprocess.TimeoutExpired,OSError):result={"audit":"UNAVAILABLE"}
    print(json.dumps(result,sort_keys=True))
    if "--gate" in sys.argv and (result["audit"]!="COMPLETED" or result["counts"]["high"] or result["counts"]["critical"]):
        sys.exit(1)
