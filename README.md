# Tukk Solutions — Portfolio Website

The sales-front-door website for **Tukk Solutions**, which builds modern,
mobile-first websites for local businesses (trades & services) across the GTA.

## Architecture: one App Service, many portfolios

The whole site is **one static website** (plain HTML/CSS/JS, no build step)
deployed to a **single Azure App Service**. It is organised so outreach can
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

## How deployment works

`.github/workflows/azure-deploy.yml` runs on every push to `main`
(and manually via *Actions → Run workflow*):

1. `actions/checkout@v4` checks out the repo.
2. No build step — the repo root is the web root.
3. `azure/webapps-deploy@v3` publishes the package (`.`) to the Azure
   Web App named **`tukk-solutions-portfolio`**, authenticated with the
   publish profile stored in the `AZURE_WEBAPP_PUBLISH_PROFILE` repo secret.

One workflow, one App Service, one deploy — all pages (home, work, every
industry portfolio) ship together.

## One-time setup (Azure side)

1. **Create the App Service** in the Azure Portal:
   *Create a resource → Web App* — name it `tukk-solutions-portfolio`
   (or rename the app in the workflow to match), publish type **Code**,
   runtime stack any static-friendly stack (e.g. Node or PHP — the content
   is static), OS **Linux**, on the cheapest tier that fits (F1/B1 to start).
   Alternatively use **Azure Static Web Apps** — the same files deploy
   unchanged; only the workflow action would differ.
2. **Download the publish profile**: in the Web App's *Overview* page,
   choose **Get publish profile** and save the `.PublishSettings` file.
   (Basic authentication for publishing must be enabled — *Configuration →
   General settings → SCM basic auth publishing* — for publish-profile
   deploys to work.)
3. **Add the repo secret**: in this GitHub repo, *Settings → Secrets and
   variables → Actions → New repository secret* — name it exactly
   `AZURE_WEBAPP_PUBLISH_PROFILE` and paste the entire contents of the
   `.PublishSettings` file.
4. **Push to `main`** (or run the workflow manually) and watch the
   *Actions* tab. When it's green, the site is live at
   `https://tukk-solutions-portfolio.azurewebsites.net`
   (plus any custom domain you bind to the App Service).

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
