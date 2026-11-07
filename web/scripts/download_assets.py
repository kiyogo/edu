import os
import urllib.request

clips = [
    { 'name': 'book.mp4', 'url': 'https://assets.mixkit.co/videos/4723/4723-720.mp4' },
    { 'name': 'nature.mp4', 'url': 'https://assets.mixkit.co/videos/51585/51585-720.mp4' },
    { 'name': 'student.mp4', 'url': 'https://assets.mixkit.co/videos/50111/50111-720.mp4' },
    { 'name': 'campus.mp4', 'url': 'https://assets.mixkit.co/videos/4519/4519-720.mp4' },
    { 'name': 'tech_devices.mp4', 'url': 'https://assets.mixkit.co/videos/99786/99786-720.mp4' },
    { 'name': 'laptop.mp4', 'url': 'https://assets.mixkit.co/videos/242/242-720.mp4' },
    { 'name': 'matrix_data.mp4', 'url': 'https://assets.mixkit.co/videos/50748/50748-720.mp4' }
]

out_dir = os.path.abspath('E:/DATA/source/edu/web/public/videos/raw')
os.makedirs(out_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

for c in clips:
    path = os.path.join(out_dir, c['name'])
    print(f"Downloading {c['name']} from {c['url']}...")
    req = urllib.request.Request(c['url'], headers=headers)
    with urllib.request.urlopen(req) as resp, open(path, 'wb') as f:
        f.write(resp.read())
    size_mb = os.path.getsize(path) / (1024 * 1024)
    print(f"-> {c['name']} saved ({size_mb:.2f} MB)")

print("All clips downloaded successfully!")
