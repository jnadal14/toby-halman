#!/usr/bin/env python3
"""
Organizes Toby Halman's raw portfolio (TOBY PORTFOLIO/) into a clean, web-ready
ASSETS/ structure and generates projects-manifest.js.

- Each project folder is named "<Title> (<order>)".
- The file whose name contains "thumbnail" becomes the project cover.
- Remaining files become the project gallery (natural-sorted).
- Filenames are slugified so they are URL-safe.
"""

import json
import re
import shutil
import struct
import subprocess
from pathlib import Path


def js(value):
    """JSON-encode a value so it is valid (double-quoted) JS."""
    return json.dumps(value, ensure_ascii=False)


def image_aspect(path: Path):
    """Width / height of an image via macOS `sips`."""
    try:
        out = subprocess.run(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
            capture_output=True, text=True, timeout=30,
        ).stdout
        w = h = None
        for line in out.splitlines():
            if "pixelWidth" in line:
                w = int(line.split(":")[-1])
            elif "pixelHeight" in line:
                h = int(line.split(":")[-1])
        if w and h:
            return round(w / h, 4)
    except Exception:
        pass
    return None


def video_aspect(path: Path):
    """Width / height of an mp4/mov by reading the largest track header box."""
    try:
        data = path.read_bytes()
        best = (0, 0)
        i = 0
        while True:
            i = data.find(b"tkhd", i + 1)
            if i < 0:
                break
            start = i - 4
            if start < 0:
                continue
            size = struct.unpack(">I", data[start:start + 4])[0]
            if size < 20 or start + size > len(data):
                continue
            box = data[start:start + size]
            w = struct.unpack(">I", box[-8:-4])[0] / 65536.0
            h = struct.unpack(">I", box[-4:])[0] / 65536.0
            if w * h > best[0] * best[1]:
                best = (w, h)
        if best[0] and best[1]:
            return round(best[0] / best[1], 4)
    except Exception:
        pass
    return None


def media_aspect(path: Path, kind: str):
    return video_aspect(path) if kind == "video" else image_aspect(path)

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "TOBY PORTFOLIO"
PROJECTS_SRC = SRC / "Projects"
ASSETS = ROOT / "ASSETS"

# slug + display title overrides, keyed by the order number in the folder name.
TITLES = {
    1: ("city-park", "City Park \u2014 Corporate Rebrand"),
    2: ("westlo-district", "Westlo District"),
    3: ("central-cee", "Central Cee Concert Poster"),
    4: ("tamarack", "Tamarack \u2014 Corporate Rebrand"),
    5: ("vape-brand-exploration", "Vape Brand Exploration"),
    6: ("the-bogart-hills", "The Bogart Hills"),
    7: ("maximes-golden-hour", "Maxime's Golden Hour"),
    8: ("personal-necklace-project", "Personal Necklace Project"),
}

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
VIDEO_EXTS = {".mp4", ".mov", ".webm"}


def natural_key(s: str):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", s)]


def media_type(path: Path):
    ext = path.suffix.lower()
    if ext in IMAGE_EXTS:
        return "image"
    if ext in VIDEO_EXTS:
        return "video"
    return None


def main():
    if ASSETS.exists():
        shutil.rmtree(ASSETS)
    (ASSETS / "projects").mkdir(parents=True)

    # Headshot for the About page.
    headshot = SRC / "About Page" / "1709654473401.jpeg"
    if headshot.exists():
        shutil.copy2(headshot, ASSETS / "toby-headshot.jpeg")

    projects = []
    for folder in sorted(PROJECTS_SRC.iterdir()):
        if not folder.is_dir():
            continue
        m = re.search(r"\((\d+)\)\s*$", folder.name)
        if not m:
            continue
        order = int(m.group(1))
        slug, title = TITLES[order]

        out_dir = ASSETS / "projects" / slug
        out_dir.mkdir(parents=True, exist_ok=True)

        files = [f for f in folder.iterdir() if f.is_file() and media_type(f)]
        cover_file = next(
            (f for f in files if "thumbnail" in f.name.lower()), None
        )
        gallery_files = sorted(
            (f for f in files if f is not cover_file),
            key=lambda f: natural_key(f.name),
        )

        cover = None
        if cover_file:
            ext = cover_file.suffix.lower()
            dest = out_dir / f"cover{ext}"
            shutil.copy2(cover_file, dest)
            kind = media_type(cover_file)
            cover = {
                "type": kind,
                "src": f"ASSETS/projects/{slug}/cover{ext}",
                "aspect": media_aspect(dest, kind),
            }

        items = []
        for i, f in enumerate(gallery_files, start=1):
            ext = f.suffix.lower()
            name = f"{i:02d}{ext}"
            shutil.copy2(f, out_dir / name)
            items.append(
                {"type": media_type(f), "src": f"ASSETS/projects/{slug}/{name}"}
            )

        projects.append(
            {
                "order": order,
                "slug": slug,
                "title": title,
                "cover": cover,
                "items": items,
            }
        )

    projects.sort(key=lambda p: p["order"])

    # Emit projects-manifest.js
    lines = [
        "/**",
        " * Project order & contents \u2014 edit this file to add/reorder projects or media.",
        " * `order` controls display order on the Work page. Generated by build_assets.py.",
        " */",
        "window.PROJECTS_MANIFEST = [",
    ]
    for p in projects:
        lines.append("    {")
        lines.append(f"        slug: {js(p['slug'])},")
        lines.append(f"        title: {js(p['title'])},")
        lines.append(f"        order: {p['order']},")
        if p["cover"]:
            c = p["cover"]
            aspect = (" aspect: %s," % c["aspect"]) if c.get("aspect") else ""
            lines.append(
                "        cover: { type: %s, src: %s,%s },"
                % (js(c["type"]), js(c["src"]), aspect)
            )
        else:
            lines.append("        cover: null,")
        lines.append("        items: [")
        for it in p["items"]:
            lines.append(
                "            { type: %s, src: %s },"
                % (js(it["type"]), js(it["src"]))
            )
        lines.append("        ],")
        lines.append("    },")
    lines.append("];")
    text = "\n".join(lines) + "\n"
    (ROOT / "projects-manifest.js").write_text(text, encoding="utf-8")

    print("Done. Projects:")
    for p in projects:
        cover = p["cover"]["src"] if p["cover"] else "(none)"
        print(f"  {p['order']}. {p['title']} [{p['slug']}] "
              f"cover={cover} items={len(p['items'])}")


if __name__ == "__main__":
    main()
