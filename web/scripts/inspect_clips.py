import os
import subprocess

raw_dir = 'E:/DATA/source/edu/web/public/videos/raw'
for f in os.listdir(raw_dir):
    p = os.path.join(raw_dir, f)
    cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', p]
    res = subprocess.run(cmd, capture_output=True, text=True)
    dur = float(res.stdout.strip()) if res.stdout.strip() else 0.0
    print(f"{f}: {dur:.2f}s")
