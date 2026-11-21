# Design Research Notes — Tukk Solutions Portfolio
Researched Nov 21, 2026 (web search: 2026 trend roundups, Awwwards SOTD Nov 2026, agency portfolio roundups).
Patterns only — no site's copy, branding, or assets were copied.

## Architecture (Kish, Nov 21, 2026): one App Service, many portfolios

- ONE static site → ONE Azure App Service (GitHub Actions, `azure/webapps-deploy@v3`,
  app `tukk-solutions-portfolio`). Cost-minimal: a single deploy ships everything.
- A dedicated portfolio page per industry under `/industries/`, built around the
  industries of businesses Tukk has ALREADY contacted (verified against
  outreach-batch1/2, outreach-rolling, outreach-retest + mockups_data.py), so
  outreach sends a prospect ONE link into their own trade's showcase.
- Industry focus (contacted set): Plumbing (6 samples), HVAC (5), Electrical (3),
  Garage Doors (2 + calculator), Cleaning (2), Pest Control (1), Handyman (1),
  Pet Grooming (1 + estimator), Appliance Repair (estimator), Chimney Services
  (estimator), Painting (estimator), Roofing (estimator) — 21 live sample sites
  + 6 interactive tools total.
- Each industry page: own accent colour, trade-specific "what customers need"
  copy (tap-to-call, quote forms, reviews up front, service-area pages),
  cards to the live previews/tools with the businesses' real Google ratings.
- `work.html` remains the all-industries index with filter pills.
- The wow bar (Kish): rich gradient/colour work per section, oversized display
  type, animated Rising Bars hero visual, scroll reveals, hover lift + pointer
  tilt and cursor spotlight on cards, big display ratings, count-up stats,
  marquee strip — all vanilla CSS/JS, no frameworks, reduced-motion respected.

## What the research says is winning right now

1. **Kinetic / oversized typography as the hero itself**
   - Where: Awwwards SOTD winners Nov 2026 (Grail, Nov 4 — giant bold type on dark charcoal; Sweet Tape, Nov 17; Carter Ogunsola, Nov 19); 2026 Q3 trends snapshot (Awwwards/CSSDA/Godly/SiteInspire): "static headlines are rare on award-winning sites"; trend roundups: oversized headlines taking 50%+ of the screen, type as the design element, no hero image needed.
   - Apply: Home hero = viewport-scale headline ("Websites that turn Google searches into booked jobs") at clamp(2.6rem, 8vw, 6rem), tight tracking, one word in the cyan→indigo brand gradient. Words stagger/rise in on load (CSS animation, transform/opacity only).

2. **Dark-mode-first with one rationed accent**
   - Where: Linear (near-black theme, elevation via lighter surfaces, zero drop shadows), Lando Norris (Awwwards Site of the Year 2025 — single vibrant accent on dark carries the whole site), Grail SOTD (dark charcoal minimalism). Multiple 2026 roundups: "dark mode is the standard, not the option."
   - Apply: Whole site on deep navy (#060d1f → #0a1730 surfaces), cyan→indigo gradient used ONLY for key words, CTAs, ratings, and hover states. Depth from lighter surfaces + 1px borders, not shadows.

3. **Reactive bento grids (Bento 2.0)**
   - Where: Stripe homepage (dense bento that stays fast; effect concentrated in the hero gradient, rest restrained), Apple product pages, 2026 Q3 snapshot: tiles with 12–24px radii that react on hover, reveal data layers; measured +23% scroll depth vs 12-column grids.
   - Apply: Home "featured work" + "what every site includes" sections as bento grids — mixed tile sizes, each portfolio tile carries the business's own brand-colour gradient, rating data layer reveals/brightens on hover, cursor-tracking spotlight glow (radial gradient following the mouse, vanilla JS).

4. **Scroll as narrative — reveals + big numbers**
   - Where: Awwwards/CSSDA winners use scroll-triggered reveals throughout (IntersectionObserver / ScrollTimeline); Stripe pairs dated figures + stats with the bento; agency roundups (Ramotion, Lollypop, Metalab): animated portfolio reveals, process visualization, oversized type.
   - Apply: Every section fades/slides in on scroll (IntersectionObserver, `prefers-reduced-motion` respected). A stats band with count-up numbers (21 sample sites · 6 interactive tools · 4,590 Google reviews showcased · 11 GTA cities). Numbered process steps (01/02/03) at display size.

5. **Marquee / scrolling logo-band strip**
   - Where: Stripe's scrolling band of logos; Extrafazant (Awwwards SOTD Nov 8, 2026) client-logo strip; standard on high-polish agency sites.
   - Apply: Infinite CSS marquee under the hero listing the trades we build for (Plumbing • HVAC • Garage Doors • Electrical • …) — motion that signals breadth without a stock photo.

6. **Glassmorphism 2.0 + sticky blur nav**
   - Where: 2026 UI trend roundups (Glassmorphism 2.0, dark mode + subtle glass); agency sites普遍 use frosted sticky headers.
   - Apply: Sticky header with backdrop-filter blur over translucent navy, border-bottom hairline; glass treatment also on the pricing card and hero stat chips. Graceful fallback: solid navy when backdrop-filter unsupported.

7. **Film grain / noise texture (anti-AI-sameness "human craft")**
   - Where: 2026 Q3 snapshot: tactile brutalism & human craft — film grain, noise textures, sharp rules as a counter-reaction to AI-generated sameness.
   - Apply: A subtle SVG-noise overlay at low opacity across the dark background + sharp hairline rules between sections. Kept whisper-quiet so it reads premium, not grungy.

8. **Micro-interactions, done with restraint**
   - Where: Playbook research (Stripe CTA hover = light overlay, not recolor; Framer cards lift on Y only; Raycast: borders for depth, 100–200ms snappy keyframes); motion roundups warn: borrow the idea, not the weight — heavy WebGL/scroll-jacking hurts LCP and accessibility on real business sites.
   - Apply: 150–250ms transitions; buttons get a light-sheen hover; cards lift 4px on Y with border brightening; link arrows nudge. NO scroll-jacking, NO WebGL, NO heavy libraries — the site must load instantly on a trades owner's phone, which is itself the sales pitch.

9. **One idea per screen / hierarchy before decoration**
   - Where: Synqro's analysis of the 15 best 2026 sites (Awwwards/CSSDA/Webby winners + Stripe/Linear/Apple/Notion/Figma): "what sets them apart is consistency — one idea per screen, typography carries the identity, animation explains something, Core Web Vitals in the green."
   - Apply: Each section has exactly one job (hero = promise, marquee = breadth, stats = proof, bento = work, process = how, pricing = offer, FAQ = objections, CTA = email). Generous whitespace, max-width 1200px, big section headings with small mono-style eyebrow labels.

10. **Portfolio rules that convert**
    - Where: Gleam Studio's 2026 portfolio rules: say who you are, what you make, for whom, and where the work is — on the first screen; ~57% of viewing time is above the fold; every project links out.
    - Apply: Hero states all four in the first viewport. Every portfolio card links to the LIVE sample site (not a screenshot) — prospects click through and use a real multi-page site, which no screenshot gallery can match. Work page grouped by industry so a plumber instantly finds plumbers.

## Deliberately NOT used
- Fabricated testimonials (none exist yet) — proof comes from factual Google ratings/review counts of the sample businesses, labelled as sample sites.
- Stock photography / heavy hero media — type + gradient mesh carries the hero; keeps LCP fast.
- Custom cursors, WebGL, scroll-jacking — award-site theatre that would slow a phone on 4G and undercut the "fast, modern, mobile-first" claim we're selling.
