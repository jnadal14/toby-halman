# Deployment Guide

The site is hosted on **Cloudflare Workers** (static assets) with automatic deploys from GitHub. No build step — files are served directly from the repository.

| | |
|---|---|
| **Production URL** | [tobyhalman.com](https://tobyhalman.com) |
| **Workers preview URL** | `toby-halman.<account>.workers.dev` |
| **Cloudflare project** | `toby-halman` (Workers & Pages) |
| **GitHub repo** | [jnadal14/toby-halman](https://github.com/jnadal14/toby-halman) |
| **Deploy trigger** | Push to `main` |

---

## How deployment works

```
GitHub (main)  →  Cloudflare Workers  →  tobyhalman.com
     push              auto-deploy            visitors
```

1. You push changes to the `main` branch
2. Cloudflare pulls the repo and runs `npx wrangler deploy`
3. Static files (`index.html`, `projects-manifest.js`, `ASSETS/`) are published globally
4. No CNAME file in the repo is needed — DNS is managed in the Cloudflare dashboard

Configuration lives in **`wrangler.jsonc`** at the repo root (added via Cloudflare's autoconfig PR).

---

## Deploying an update

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

Cloudflare picks up the push within a minute or two. Check status under **Workers & Pages → toby-halman → Deployments**.

---

## Cloudflare dashboard

Log in at [dash.cloudflare.com](https://dash.cloudflare.com).

| Section | Path |
|---|---|
| Worker project | Workers & Pages → **toby-halman** |
| Deployments | Workers & Pages → toby-halman → **Deployments** |
| Custom domains | Workers & Pages → toby-halman → **Domains** |
| DNS records | Websites → **tobyhalman.com** → **DNS** |
| Domain status | Websites → **tobyhalman.com** (overview) |

---

## Custom domain setup

The domain `tobyhalman.com` must be in **two places** in Cloudflare. These are separate steps:

### 1. Domain in Cloudflare account (DNS management)

**Websites → tobyhalman.com**

This puts Cloudflare in charge of the domain's DNS. The domain must show **Active** (not Pending). If it says Pending, nameservers at the domain registrar need to point to Cloudflare's assigned nameservers (e.g. `samara.ns.cloudflare.com`, `damiete.ns.cloudflare.com`).

### 2. Domain connected to the Worker (routing)

**Workers & Pages → toby-halman → Domains → + Add Domain**

Select `tobyhalman.com` and `www.tobyhalman.com`. Cloudflare auto-creates the DNS records and routes traffic to the portfolio site.

> You do **not** need a `CNAME` file in the GitHub repo. That is only required for GitHub Pages hosting.

### Domain status reference

| Status | Meaning | Action |
|---|---|---|
| **Pending** (on domain) | Cloudflare hasn't verified nameservers yet | Wait, or update nameservers at registrar |
| **Active** (on domain) | DNS is managed by Cloudflare | Connect to Worker via Domains tab |
| **Initializing** (on Worker domain) | SSL certificate provisioning | Wait 2–5 minutes |
| **Active** (on Worker domain) | Site is live at the custom URL | Done |

---

## Making the GitHub repo private

The site stays public even if the repo is private. Cloudflare's GitHub integration works with private repos.

1. Confirm the site works at [tobyhalman.com](https://tobyhalman.com)
2. GitHub → **jnadal14/toby-halman** → Settings → General
3. Danger Zone → **Change repository visibility** → **Private**

No changes needed on the Cloudflare side.

---

## Cloudflare Free plan

The Free plan is sufficient for this portfolio site.

| Resource | Free limit | Typical usage |
|---|---|---|
| Workers requests | 100,000 / day | A few hundred per day for a portfolio |
| Build minutes | 3,000 / month | ~1 min per deploy |
| SSL | Universal (free) | Included |
| CDN & DNS | Included | Included |

Upgrade only if traffic grows significantly beyond portfolio-scale visits.

---

## Local preview vs production

| | Local | Production |
|---|---|---|
| Command | `python3 -m http.server 1234` | Push to `main` |
| URL | `http://localhost:1234` | `https://tobyhalman.com` |
| HTTPS | No | Yes (auto SSL) |
| CDN | No | Yes (Cloudflare edge) |

---

## Troubleshooting

### Site works on `*.workers.dev` but not on `tobyhalman.com`

- Check **Websites → tobyhalman.com** is **Active**
- Check **Workers & Pages → toby-halman → Domains** lists both `tobyhalman.com` and `www.tobyhalman.com` as **Active**
- Check **DNS** tab has records (added automatically when you connect the domain to the Worker)
- SSL can take up to 30 minutes on first setup

### Domain shows "Pending" when connecting to Worker

The domain zone isn't fully active yet. Go to **Websites → tobyhalman.com** and follow the nameserver instructions. Wait for status to change to **Active**, then retry **+ Add Domain**.

### Deploy failed

- Check **Workers & Pages → toby-halman → Deployments** for the error log
- Ensure `wrangler.jsonc` exists on `main`
- Ensure no files exceed Cloudflare's size limits (individual Worker asset limit is 25 MB)

### New images not showing after deploy

- Confirm files are in `ASSETS/` and committed to git (not only in gitignored `TOBY PORTFOLIO/`)
- Confirm `projects-manifest.js` paths match actual filenames
- Hard-refresh the browser (Cmd+Shift+R) to bypass cache

### Email at `@tobyhalman.com`

The site uses an external Gmail address for contact. MX records are **not** required for the website to work. Add MX records separately only if Toby wants email hosted on his domain.

---

## Manual deploy (optional)

Normally unnecessary — GitHub auto-deploy handles everything. For manual deploys:

```bash
npx wrangler deploy
```

Requires the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) and Cloudflare API credentials.
