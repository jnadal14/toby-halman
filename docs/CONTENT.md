# Content & Portfolio Guide

How to update site copy, images, and portfolio projects.

---

## About & Contact

Both sections live in `index.html`.

**About** — search for `<!-- About Panel -->`. Edit the `<p>` tags inside `.about-content`.

**Contact** — search for `<!-- Contact Panel -->`. Update the heading and the `mailto:` link:

```html
<a href="mailto:Thalman.studio@gmail.com">Thalman.studio@gmail.com</a>
```

**Headshot** — replace `ASSETS/toby-headshot.jpg` with a new image (keep the same filename, or update the `src` in `index.html` and the favicon `<link>` tags in `<head>`).

---

## Portfolio projects

All project data is in **`projects-manifest.js`**. Media files live in **`ASSETS/projects/<slug>/`**.

### Project entry structure

```js
{
    slug: "westlo-district",          // URL: #work/westlo-district
    title: "Westlo District",         // Display name on Work page
    order: 2,                         // Sort order (lower = earlier)
    cover: { type: "image", src: "ASSETS/projects/westlo-district/cover.jpg", aspect: 1.7778 },
    items: [
        { type: "image", src: "ASSETS/projects/westlo-district/01.jpg", aspect: 1.7778 },
        { type: "video", src: "ASSETS/projects/westlo-district/09.mp4", aspect: 1.7778 },
        // ...
    ],
}
```

| Field | Purpose |
|---|---|
| `slug` | Folder name and URL segment |
| `title` | Project name shown in the UI |
| `order` | Position on the Work page (1 = first) |
| `cover` | Thumbnail on the Work grid |
| `items` | Gallery media, in display order |
| `aspect` | Width ÷ height — controls justified row layout |
| `columns` | Optional — three-column layout (only used by Vape Brand Exploration) |

Supported media types: `"image"` (jpg, png, webp, gif) and `"video"` (mp4, mov, webm).

### Adding a new project

1. Create a folder: `ASSETS/projects/<slug>/`
2. Add a cover image named `cover.jpg` (or `cover.mp4` for a video cover)
3. Add gallery files with sequential names: `01.jpg`, `02.jpg`, `03.mp4`, etc.
4. Add a new entry to the `PROJECTS_MANIFEST` array in `projects-manifest.js`
5. Set `order` to control where it appears relative to other projects
6. Commit, push to `main` — Cloudflare deploys automatically

### Updating an existing project

1. Drop new files into `ASSETS/projects/<slug>/`
2. Update the matching entry in `projects-manifest.js` (add/reorder/remove items, adjust `aspect` values)
3. Commit and push

### Reordering projects

Change the `order` number on each project entry. Lower numbers appear first.

### Aspect ratios

Each image and video should have an `aspect` value (width ÷ height). Examples:

| Shape | aspect |
|---|---|
| 16:9 landscape | `1.7778` |
| 9:16 portrait (phone video) | `0.5625` |
| Square | `1.0` |
| 4:5 portrait photo | `0.8` |

To find the aspect ratio of a file on macOS:

```bash
sips -g pixelWidth -g pixelHeight ASSETS/projects/<slug>/01.jpg
```

Then divide width by height (e.g. 1920 ÷ 1080 = 1.7778).

The gallery uses these values to build justified rows that align flush at the bottom.

### Three-column layout

Only the Vape Brand Exploration project uses `columns` instead of `items`. Each sub-array is one vertical column of images. Do not add `columns` to other projects unless you also update the rendering logic in `index.html`.

---

## `build_assets.py` (bulk import)

Optional Python script for importing from the raw `TOBY PORTFOLIO/` source folder. **Not part of the normal workflow** — the manifest has been hand-tuned beyond what the script produces.

```
TOBY PORTFOLIO/
├── About Page/
│   └── <headshot>.jpeg
└── Projects/
    └── <Title> (<order>)/
        ├── <thumbnail file>    → becomes cover
        └── <other media>       → becomes 01, 02, 03…
```

Run from the repo root:

```bash
python3 build_assets.py
```

**Warning:** This deletes and rebuilds the entire `ASSETS/` folder and overwrites `projects-manifest.js`, wiping custom gallery order, aspect ratios, and column layouts. Only use it for a full reset from raw source files.

Slug and title mappings are defined in the `TITLES` dict at the top of `build_assets.py`.

---

## File naming conventions

| File | Convention |
|---|---|
| Cover | `cover.jpg` or `cover.mp4` |
| Gallery | `01.jpg`, `02.jpg`, `03.mp4` — zero-padded, sequential |
| Slug | Lowercase, hyphenated (`westlo-district`) |

Keep filenames URL-safe (no spaces or special characters).

---

## Checklist before pushing

- [ ] New media files are in `ASSETS/` (not only in `TOBY PORTFOLIO/`)
- [ ] `projects-manifest.js` paths match actual filenames
- [ ] `aspect` values are set on gallery items
- [ ] Tested locally with `python3 -m http.server 1234`
- [ ] Committed and pushed to `main`
