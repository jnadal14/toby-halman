# Toby Halman — Portfolio Site

Static portfolio website for graphic designer Toby Halman. Single-page app with Work, About, and Contact sections, deployed on Cloudflare Workers.

| | |
|---|---|
| **Live site** | [tobyhalman.com](https://tobyhalman.com) |
| **Repository** | [jnadal14/toby-halman](https://github.com/jnadal14/toby-halman) |
| **Hosting** | Cloudflare Workers (Free plan) |

---

## Quick start

**Preview locally** (no install required):

```bash
python3 -m http.server 1234
```

Open [http://localhost:1234](http://localhost:1234).

**Deploy changes** — push to `main` on GitHub. Cloudflare deploys automatically.

---

## Repository structure

```
├── index.html              # Site layout, styles, and UI logic
├── projects-manifest.js    # Portfolio projects, media order, and gallery layout
├── wrangler.jsonc          # Cloudflare Workers deployment config
├── build_assets.py         # Optional: bulk-import from raw source folder
├── ASSETS/                 # Web-ready images and videos (committed, deployed)
│   ├── toby-headshot.jpg
│   └── projects/
│       └── <slug>/         # One folder per project (cover + numbered gallery files)
└── TOBY PORTFOLIO/         # Raw source files (gitignored, local only)
```

| File / folder | Role |
|---|---|
| `index.html` | All HTML, CSS, and JavaScript for the site |
| `projects-manifest.js` | Defines which projects appear, in what order, and how galleries are laid out |
| `ASSETS/` | Optimized media served to visitors — this is what goes live |
| `TOBY PORTFOLIO/` | Original client deliverables; kept locally for reference, not deployed |
| `build_assets.py` | Scaffolding script to copy raw files into `ASSETS/` and regenerate the manifest |
| `wrangler.jsonc` | Tells Cloudflare to serve static files from the repo root |

---

## Making changes

See the detailed guides:

- **[Content & portfolio updates](docs/CONTENT.md)** — edit About/Contact text, add or reorder projects, update images
- **[Deployment & domain](docs/DEPLOYMENT.md)** — Cloudflare setup, custom domain, DNS, private repo

### Common tasks

| Task | What to edit |
|---|---|
| Change About bio | `index.html` — About section |
| Change email | `index.html` — Contact section |
| Add/reorder project media | `ASSETS/projects/<slug>/` + `projects-manifest.js` |
| Change project display order | `order` field in `projects-manifest.js` |
| Update headshot | Replace `ASSETS/toby-headshot.jpg` |

> **Important:** `projects-manifest.js` has been hand-curated (custom gallery order, aspect ratios, column layouts). Do not re-run `build_assets.py` unless you intend to reset those edits. See [docs/CONTENT.md](docs/CONTENT.md).

---

## Tech stack

- **Frontend:** Vanilla HTML / CSS / JavaScript (no framework or build step)
- **Fonts:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (display), [Darker Grotesque](https://fonts.google.com/specimen/Darker+Grotesque) (body) — loaded from Google Fonts
- **Hosting:** Cloudflare Workers with static assets (`wrangler.jsonc`)
- **CI/CD:** GitHub → Cloudflare automatic deploys on push to `main`

---

## Local development notes

- Use any static file server (`python3 -m http.server`, VS Code Live Server, etc.)
- Hash-based routing: `#work`, `#about`, `#contact`, and `#work/<slug>` for individual projects
- Project pages support justified image rows (via `aspect` ratios in the manifest) and a special three-column layout for the Vape Brand Exploration project

---

## Credits

Designed and built by [Traversal Imaging](https://thetraversal.ca) for Toby Halman.
