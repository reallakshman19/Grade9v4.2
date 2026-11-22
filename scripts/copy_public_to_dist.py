import os
import shutil
import time

def copy_tree_safe(src, dst):
    for root, dirs, files in os.walk(src):
        rel = os.path.relpath(root, src)
        dest_dir = os.path.join(dst, rel)
        os.makedirs(dest_dir, exist_ok=True)
        for f in files:
            sf = os.path.join(root, f)
            df = os.path.join(dest_dir, f)
            try:
                shutil.copy2(sf, df)
            except Exception as e:
                # If file is locked, brief retry then pass
                time.sleep(0.05)
                try:
                    shutil.copy2(sf, df)
                except Exception:
                    pass

def main():
    src = "web/public"
    dst = "dist"
    
    if not os.path.exists(src):
        print(f"Source {src} does not exist.")
        return

    os.makedirs(dst, exist_ok=True)

    # Copy all items from web/public to dist, skipping any atlas or operator data
    for item in os.listdir(src):
        if item == "atlas" or item.startswith("."):
            continue
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s):
            copy_tree_safe(s, d)
            print(f"Copied directory: {item} -> {d}")
        else:
            try:
                shutil.copy2(s, d)
                print(f"Copied file: {item} -> {d}")
            except Exception:
                pass

if __name__ == "__main__":
    main()
