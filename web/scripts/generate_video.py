import os
import sys
import subprocess
import numpy as np

# Resolution and framerate
WIDTH = 1280
HEIGHT = 720
FPS = 30
DURATION_SEC = 24
TOTAL_FRAMES = FPS * DURATION_SEC

output_path = os.path.abspath("E:/DATA/source/edu/web/public/videos/kiyoedu-cinematic.mp4")
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# ffmpeg command with ALL-INTRA (-g 1 -keyint_min 1) for instantaneous seek
cmd = [
    "ffmpeg", "-y",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-s", f"{WIDTH}x{HEIGHT}",
    "-pix_fmt", "rgb24",
    "-r", str(FPS),
    "-i", "-",
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", "20",
    "-g", "1",
    "-keyint_min", "1",
    "-sc_threshold", "0",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    output_path
]

process = subprocess.Popen(cmd, stdin=subprocess.PIPE)

# Coordinate grids for fast vectorized rendering
x = np.linspace(-1, 1, WIDTH, dtype=np.float32)
y = np.linspace(-1, 1, HEIGHT, dtype=np.float32)
xx, yy = np.meshgrid(x, y)
dist_center = np.sqrt(xx**2 + yy**2)

# Generate a sequence of floating orbs / celestial light
num_orbs = 18
orb_x = np.random.uniform(-0.8, 0.8, num_orbs).astype(np.float32)
orb_y = np.random.uniform(-0.8, 0.8, num_orbs).astype(np.float32)
orb_z = np.random.uniform(0.1, 1.0, num_orbs).astype(np.float32)
orb_speed = np.random.uniform(0.5, 1.8, num_orbs).astype(np.float32)
orb_color = np.array([
    [49, 89, 69],    # KiyoEdu Emerald #315945
    [80, 150, 110],  # Soft mint green
    [220, 175, 75],  # Warm gold
    [70, 140, 180],  # Cyan blue
    [100, 180, 140], # Light jade
    [49, 89, 69],
    [230, 245, 235], # Off-white glow
    [60, 120, 95]
], dtype=np.float32)

print(f"Generating {TOTAL_FRAMES} frames ({DURATION_SEC}s @ {FPS}fps) to {output_path}...")

# Color palettes for timeline progression:
# 0.0 - 0.2: Morning mist / Pearl white (#F8FAF9 to #E5EFE8)
# 0.2 - 0.4: Vietnam emerald network (#E8F4EC to #C7E3D0)
# 0.4 - 0.6: Bright daylight classroom (#FAFBF9 to #E2EDE6)
# 0.6 - 0.8: Golden sunset / Knowledge (#FBF6EB to #F3E7D3)
# 0.8 - 1.0: Deep cinematic twilight (#D6E7DC to #FAFBF9)

for frame_idx in range(TOTAL_FRAMES):
    t = frame_idx / TOTAL_FRAMES  # 0.0 to 1.0
    
    # Base background gradient interpolation
    if t < 0.25:
        p = t / 0.25
        top_c = (1.0 - p) * np.array([250, 252, 250]) + p * np.array([238, 247, 241])
        bot_c = (1.0 - p) * np.array([235, 244, 238]) + p * np.array([215, 235, 222])
    elif t < 0.5:
        p = (t - 0.25) / 0.25
        top_c = (1.0 - p) * np.array([238, 247, 241]) + p * np.array([245, 250, 247])
        bot_c = (1.0 - p) * np.array([215, 235, 222]) + p * np.array([200, 228, 210])
    elif t < 0.75:
        p = (t - 0.5) / 0.25
        top_c = (1.0 - p) * np.array([245, 250, 247]) + p * np.array([253, 248, 240])
        bot_c = (1.0 - p) * np.array([200, 228, 210]) + p * np.array([242, 228, 208])
    else:
        p = (t - 0.75) / 0.25
        top_c = (1.0 - p) * np.array([253, 248, 240]) + p * np.array([248, 252, 249])
        bot_c = (1.0 - p) * np.array([242, 228, 208]) + p * np.array([225, 240, 230])

    # Vertical linear gradient
    grad_y = (yy + 1.0) * 0.5  # 0 to 1
    r_chan = top_c[0] * (1.0 - grad_y) + bot_c[0] * grad_y
    g_chan = top_c[1] * (1.0 - grad_y) + bot_c[1] * grad_y
    b_chan = top_c[2] * (1.0 - grad_y) + bot_c[2] * grad_y
    
    # Camera flight zoom & vignette
    vignette = 1.0 - 0.28 * (dist_center ** 1.6)
    r_chan *= vignette
    g_chan *= vignette
    b_chan *= vignette
    
    # Dynamic rotating light sweep (cinematic sunbeam / lens aperture)
    angle = np.arctan2(yy, xx) + t * 4.0
    sweep = 0.5 + 0.5 * np.cos(angle * 2.0)
    sweep_glow = np.exp(-dist_center * 1.8) * sweep * 22.0
    r_chan += sweep_glow * 0.7
    g_chan += sweep_glow * 1.0
    b_chan += sweep_glow * 0.8
    
    # 3D Depth Rings (Aperture tunnels flying towards camera)
    for ring_i in range(4):
        ring_phase = (t * 2.5 + ring_i * 0.25) % 1.0
        ring_radius = 0.15 + ring_phase * 1.2
        ring_width = 0.04 + ring_phase * 0.06
        ring_dist = np.abs(dist_center - ring_radius)
        ring_mask = np.exp(-(ring_dist ** 2) / (2 * (ring_width ** 2)))
        ring_alpha = (1.0 - ring_phase) * ring_phase * 4.0 * 25.0
        r_chan += ring_mask * ring_alpha * 0.4
        g_chan += ring_mask * ring_alpha * 0.8
        b_chan += ring_mask * ring_alpha * 0.6

    # Floating depth light particles
    for i in range(num_orbs):
        # Position moving towards camera in 3D
        curr_z = (orb_z[i] - t * orb_speed[i]) % 1.0
        curr_x = orb_x[i] / (curr_z + 0.15)
        curr_y = orb_y[i] / (curr_z + 0.15)
        
        d = np.sqrt((xx - curr_x)**2 + (yy - curr_y)**2)
        radius = (1.0 - curr_z) * 0.14 + 0.03
        intensity = np.exp(-(d**2) / (2 * (radius**2))) * (1.0 - curr_z) * 45.0
        
        c = orb_color[i % len(orb_color)]
        r_chan += intensity * (c[0] / 255.0)
        g_chan += intensity * (c[1] / 255.0)
        b_chan += intensity * (c[2] / 255.0)

    # Soft film glow clamp
    img = np.stack([
        np.clip(r_chan, 0, 255).astype(np.uint8),
        np.clip(g_chan, 0, 255).astype(np.uint8),
        np.clip(b_chan, 0, 255).astype(np.uint8)
    ], axis=-1)
    
    process.stdin.write(img.tobytes())

process.stdin.close()
process.wait()
print("Done generating cinematic video!")
