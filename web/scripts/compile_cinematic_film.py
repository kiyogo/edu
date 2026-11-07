import os
import subprocess

raw_dir = 'E:/DATA/source/edu/web/public/videos/raw'
out_path = 'E:/DATA/source/edu/web/public/videos/kiyoedu-master-film.mp4'

# Step 1: Preprocess and trim each segment to standard 1280x720 @ 30fps with unified color grading
segments = [
    { 'file': 'book.mp4', 'start': 0.5, 'dur': 5.0 },
    { 'file': 'nature.mp4', 'start': 2.0, 'dur': 5.5 },
    { 'file': 'campus.mp4', 'start': 1.0, 'dur': 5.0 },
    { 'file': 'student.mp4', 'start': 0.5, 'dur': 5.0 },
    { 'file': 'laptop.mp4', 'start': 0.5, 'dur': 5.0 },
    { 'file': 'matrix_data.mp4', 'start': 1.0, 'dur': 5.0 },
    { 'file': 'tech_devices.mp4', 'start': 0.0, 'dur': 5.0 },
]

processed_files = []
os.makedirs('E:/DATA/source/edu/web/public/videos/tmp', exist_ok=True)

for i, seg in enumerate(segments):
    tmp_out = f"E:/DATA/source/edu/web/public/videos/tmp/seg_{i}.mp4"
    in_file = os.path.join(raw_dir, seg['file'])
    print(f"Processing segment {i}: {seg['file']} ({seg['dur']}s)...")
    
    # Scale, crop, fps, and apply color grading (contrast, saturation, slight emerald tint, vignette)
    vf = (
        "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=30,"
        "eq=contrast=1.06:brightness=0.01:saturation=1.12,"
        "vignette=PI/4.5"
    )
    cmd = [
        'ffmpeg', '-y',
        '-ss', str(seg['start']),
        '-i', in_file,
        '-t', str(seg['dur']),
        '-vf', vf,
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-crf', '19',
        '-pix_fmt', 'yuv420p',
        tmp_out
    ]
    subprocess.run(cmd, check=True)
    processed_files.append(tmp_out)

print("All segments processed. Now assembling Master Film with seamless crossfades...")

# Step 2: Build FFmpeg filter_complex with xfade crossfades (0.6s overlap)
inputs = []
for p in processed_files:
    inputs.extend(['-i', p])

# Durations are 5.0s, 5.5s, 5.0s, 5.0s, 5.0s, 5.0s, 5.0s
# Overlap = 0.6s
filter_complex = (
    "[0:v][1:v]xfade=transition=fade:duration=0.6:offset=4.4[v01];"
    "[v01][2:v]xfade=transition=smoothleft:duration=0.6:offset=9.3[v02];"
    "[v02][3:v]xfade=transition=fade:duration=0.6:offset=13.7[v03];"
    "[v03][4:v]xfade=transition=circleopen:duration=0.6:offset=18.1[v04];"
    "[v04][5:v]xfade=transition=fade:duration=0.6:offset=22.5[v05];"
    "[v05][6:v]xfade=transition=radial:duration=0.6:offset=26.9[vout]"
)

cmd_master = [
    'ffmpeg', '-y',
    *inputs,
    '-filter_complex', filter_complex,
    '-map', '[vout]',
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-crf', '19',
    '-g', '1',               # ALL-INTRA for instantaneous 0ms frame seeking!
    '-keyint_min', '1',
    '-sc_threshold', '0',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    out_path
]

print("Rendering Master All-Intra Cinematic Movie...")
subprocess.run(cmd_master, check=True)
print(f"Master Film successfully created at: {out_path} ({os.path.getsize(out_path)/(1024*1024):.2f} MB)")
