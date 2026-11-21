# Tukk Solutions — Portfolio Website

The sales-front-door website for **Tukk Solutions**, which builds modern,
mobile-first websites for local businesses (trades & services) across the GTA.

## Architecture: one Static Web App, many portfolios

The whole site is **one static website** (plain HTML/CSS/JS, no build step)
deployed to a **single Azure Static Web App** (Free tier). It is organised so outreach can
send a prospect **one link that lands them in their own industry's showcase**:

| Page | Purpose |
|---|---|
| `index.html` | Hero, stats, featured work, industries index, process, pricing teaser, FAQ |
| `work.html` | All-industries index — every sample & tool, filterable by industry |
| `industries/plumbing.html` | Plumbing portfolio (6 live samples) |
| `industries/hvac.html` | HVAC portfolio (5 live samples) |
| `industries/electrical.html` | Electrical portfolio (3 live samples) |
| `industries/garage-doors.html` | Garage Doors portfolio (2 samples + repair calculator) |
| `industries/cleaning.html` | Cleaning portfolio (2 live samples) |
| `industries/pest-control.html` | Pest Control portfolio (1 live sample) |
| `industries/handyman.html` | Handyman portfolio (1 live sample) |
| `industries/pet-grooming.html` | Pet Grooming portfolio (1 sample + price estimator) |
| `industries/appliance-repair.html` | Appliance Repair portfolio (repair estimator) |
| `industries/chimney.html` | Chimney Services portfolio (sweep estimator) |
| `industries/painting.html` | Painting portfolio (per-room estimator) |
| `industries/roofing.html` | Roofing portfolio (roofing cost estimator) |
| `services.html` | Services, incl. managing an existing site |
| `pricing.html` | The offer: CA$99/month, no setup fee, free draft first |
| `contact.html` | Free-draft request via tukksolutions@gmail.com |

Each industry page has its own accent colour and trade-specific copy (what
customers in that trade need: tap-to-call, quote forms, reviews up front,
service-area pages), plus cards linking to the **live sample sites and
interactive calculators** currently hosted at
`tukksolutions-blip.github.io/previews/<slug>/` and `/tools/<slug>/`.
Ratings and review counts on the cards are the businesses' real Google
numbers. Design rationale lives in `DESIGN-NOTES.md`.

Shared assets: `assets/styles.css`, `assets/app.js`, `assets/logo-mark.png`
(the Rising Bars brand mark).

## How deployment works — the tukkhome model

Same pattern as `kishsal/tukkhome` (tukkhome.xyz): this repo holds the code;
deployment runs from the **Deploy Tukk Solutions Portfolio** workflow in the
`kishsal/tukkhome` repo (`.github/workflows/deploy-portfolio.yml`), on the
self-hosted runner (`azure-deploy` label) whose Azure CLI login holds the
access — no publish profiles, no repo secrets, no Azure portal work.

That workflow, on manual dispatch:
1. Checks out THIS repo (`kishsal/tukk-solutions-portfolio@main`).
2. Creates the Static Web App if it doesn't exist yet
   (`tukk-solutions-portfolio`, resource group `family-hub-rg`, Free SKU).
3. Fetches the deployment token via `az staticwebapp secrets list` and
   deploys the site files (`*.html`, `industries/`, `assets/`) with the
   SWA CLI (`swa deploy --env production`).
4. Smoke-tests the live home page and the plumbing portfolio page.

This repo's own `.github/workflows/ci.yml` is validate-only (HTML parse
check on push/PR), mirroring tukkhome's validate-first pattern.

**To ship a change:** push to `main` here, then dispatch *Deploy Tukk
Solutions Portfolio* in the tukkhome repo (Arlo runs it).

**Live:** https://green-river-0101fc30f.5.azurestaticapps.net
(first deployed Nov 21, 2026; home, work index, industry portfolios and
pricing all verified HTTP 200).

## Local preview

Any static server works, e.g.:

```bash
cd tukk-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes

- No build tooling, no dependencies — edits are plain HTML/CSS/JS.
- Sample-site and tool links point at the existing GitHub Pages host so
  links already sent to prospects keep working.
- Accessibility: skip link, focus states, semantic landmarks, and
  `prefers-reduced-motion` support are built into the shared CSS/JS.
