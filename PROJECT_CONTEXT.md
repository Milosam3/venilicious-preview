# Venilicious: Project Context

> Handoff brief for Claude Cowork. Last updated 2026-09-29 (trailer hire page + SEO sweep).
> The code is the source of truth. This file summarises it; if something here disagrees with the code, trust the code and update this file.

---

## TL;DR

- **Venilicious** is a South African brand selling **wild-harvested game meat** (venison, lamb, game) with **same-day delivery in Johannesburg**, plus **fridge trailer hire** (a towable refrigerated trailer, mostly hired by hunters in season, marketed to functions and events in summer).
- The **meat shop is the main thing**. Fridge trailer hire has its own page at `/fridge-trailer-hire/`.
- The shop sells **year round** (not only game meat: lamb etc. too). The summer marketing push is the trailer hire, which hunters mostly book in season.
- This repo is a **static site, no backend, no build step**. The meat cart is still fake (a counter and a toast). The trailer page takes enquiries via WhatsApp and a Formspree form (both need owner config, see §8).
- Live on Vercel at **https://venilicious-preview.vercel.app**.
- Mobile-first, dark "fire and embers" aesthetic, South African English, prices in ZAR.

---

## 1. Business & brand context

All of this comes from the site copy. Treat it as **draft positioning, not confirmed fact**. See §10, Open questions.

| Topic | What the site says |
|---|---|
| Company | Venilicious (Pty) Ltd |
| Product | Wild-harvested, hormone-free game meat: venison, lamb, kudu, springbok, venison boerewors, braai bundles, freezer packs |
| Service | **Fridge trailer hire**: towable fridge trailer for hunting trips, weddings & functions, farms & butcheries, backup cold storage. Collected in Johannesburg |
| Sourcing | "Hunting grounds" in **Limpopo & Northern Cape**. Meat is field-dressed, dry-aged, vacuum-sealed and delivered frozen |
| Market | Johannesburg families (Sandton, Greenside, Fourways, Rosebank, Bryanston). Trailer: hunters heading to farms, event organisers, farms |
| Core promise | Cold chain "field to door", same-day Joburg delivery before a daily cutoff, freshness guarantee |
| Offers | **Build your box** (any 5 cuts, save 15%, R799 to R1,899) · **Braai Club** (from R799/month) · per-product **Subscribe & save 15%** · free delivery over R1,500 |
| Trailer rates | **Not set yet.** Page shows Day / Weekend / Weekly cards with "On request" |
| Support | WhatsApp (number not set yet) |
| Payments shown | Peach Payments, Visa, Mastercard, SnapScan (badges only, no checkout) |
| Brand touch | Footer quotes **Genesis 27:3–4**. Deliberate, keep it unless the owner says otherwise |

### Voice & copy rules
- Warm, premium-rustic, confident, never hypey. Outdoorsy, family and braai centred.
- South African English: "favourites", "colour", "Joburg". Local words used naturally: *braai, boerewors, oupa, bakkie*.
- **No dashes in copy** (Richard's rule). Use commas or full stops instead of em/en dashes. Numeric ranges (6–8) are fine.
- Currency format **`R1,099`**.
- Headline pattern: short declarative sentence, one phrase italicised in amber (`<em>Delivered</em>`).

### Glossary (for non-SA readers)
| Term | Meaning |
|---|---|
| Braai | South African barbecue over wood or charcoal |
| Boerewors | Spiced coiled farm sausage, a braai staple |
| Kudu, Springbok | Antelope species sold as game meat |
| Koelwa | Afrikaans for "cool wagon", i.e. fridge trailer (`/koelwa/` redirects to the trailer page) |
| Bakkie | Pickup truck |
| Heritage Day | 24 September, "National Braai Day" |
| Peach Payments / SnapScan | SA payment gateway / SA QR payment app |
| CIPC | SA company registry |
| POPIA | SA privacy law, comparable to GDPR |

---

## 2. Repo & tech

```
venilicious-preview/
├── index.html                    # Homepage (meat shop), served at /
├── fridge-trailer-hire/index.html # Trailer hire page
├── venison-fillet/index.html     # Product page (was /product/)
├── assets/
│   ├── site.css                  # Shared chrome: menu drawer, toast, focus styles, announce-bar fix
│   └── site.js                   # SHARED CONFIG (WhatsApp number, Formspree ID) + drawer + WhatsApp links
├── images/
│   ├── *-1200.webp, *-600.webp   # Optimised photos (6 photos × 2 sizes)
│   ├── logo-mark.webp, logo-wordmark.webp, logo-lockup.webp
│   ├── og/og-home.jpg, og-trailer.jpg, og-fillet.jpg   # 1200×630 social share cards
│   └── originals/                # Source PNGs (not deployed, see .vercelignore)
├── favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest
├── robots.txt, sitemap.xml
├── vercel.json                   # trailingSlash, 301 redirects, cache headers
├── .vercelignore                 # keeps *.md and images/originals off the live site
└── PROJECT_CONTEXT.md            # this file (not deployed)
```

- Plain HTML, CSS and vanilla JS. No framework, no package.json, no build step, no tests.
- **All asset paths are root-absolute** (`/images/…`, `/assets/…`). Pages must be served over HTTP; opening from disk breaks paths.
- Each page keeps its own CSS in `<style>` and page JS inline. **Shared chrome** (announcement bar, nav, menu drawer, footer) is duplicated in all 3 pages; drawer + toast styles/behaviour live in `assets/site.css` + `assets/site.js`. If you change the header, drawer or footer, change **all 3 pages**.
- Bump `?v=1` on `site.css`/`site.js` links after editing them (assets are cached 1 day).
- Fonts: Google Fonts, **Playfair Display**, **Archivo**, **Spline Sans Mono**.
- Git: `main` only, remote `github.com/Milosam3/venilicious-preview`. Commit messages lowercase with a prefix: `add:`, `fix:`, `chore:`.

### Run locally
```bash
cd ~/Projects/venilicious-preview && python3 -m http.server 8000
```
Open http://localhost:8000/.

### Deploy
- Vercel project `venilicious-preview`, team `milosam3s-projects`. Static files, no build.
- Deploy with `vercel --prod` from the repo root. `.vercelignore` keeps this file and the original PNGs off the site.
- `vercel.json` 301s: `/homepage/` → `/`, `/product/` → `/venison-fillet/`, `/trailer-hire/` and `/koelwa/` → `/fridge-trailer-hire/`.
- **Canonical/OG/sitemap URLs are hard-coded to `https://venilicious-preview.vercel.app`.** When a custom domain goes live, find/replace that string across the repo (HTML, sitemap.xml, robots.txt) and redeploy.

---

## 3. Design system

### Colour tokens (in `:root` of every page)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#141210` | Page background |
| `--bg-2` | `#1b1611` | Cards, inputs |
| `--brown` / `--brown-2` | `#2a1f14` / `#352513` | Gradients, deep accents |
| `--amber` | `#c85a1e` | **Primary brand/CTA** |
| `--amber-2` | `#e0843b` | Hover, italic emphasis, eyebrows |
| `--ember` | `#ff7a2a` | Pulsing dot, glows |
| `--cream` / `--cream-2` | `#f5efe6` / `#e8dfd0` | Text |
| `--dim` / `--dim-2` | cream @ 62% / 40% | Muted text |
| `--line` / `--line-2` | cream @ 12% / 7% | Borders |
| `--ok` | `#7fae6b` | Success, WhatsApp green |

**Logo:** bronze antelope mark + black wordmark, so it sits on a white pill in the nav and is inverted to white in the footer. Favicons put the mark on a cream rounded square.

### Typography
Playfair Display (headings, prices, display type), Archivo (body/UI, `.label` eyebrows), Spline Sans Mono (small captions).

### Recurring patterns
Eyebrow label with amber rule · `.btn-amber` / `.btn-ghost` / `.textlink` · cards with `--bg-2` + `--line-2` border, amber on hover · urgency/"now booking" pill with pulsing ember dot · film grain overlay · scroll reveal (`.rv`, homepage) · giant italic display word ("WILD." on home, "COLD." on trailer page) · mobile sticky bottom bar (PDP + trailer page).

**Trailer illustration:** inline SVG line drawing of a fridge trailer (homepage promo, trailer hero, trailer spec section, OG image). It is a stand-in until real photos exist.

---

## 4. Pages

### Homepage `/` (`index.html`)
Sticky header (rotating announcement bar incl. link to trailer hire; menu drawer; cart) → hero (H1 "Wild-harvested meat. *Delivered* to Joburg.") → trust bar → "WILD." bleed → **Best cuts** `#best-cuts` (fillet card links to `/venison-fillet/`) → **Build your box** `#build-box` → **Fridge trailer hire promo** `#trailer-hire` (replaced the fake reviews section) → **Braai Club** `#braai-club` → footer.

### Fridge trailer hire `/fridge-trailer-hire/`
Breadcrumb → hero (H1 "Fridge trailer hire. *Keep it cold* from bush to braai.", Book on WhatsApp + Check dates) → trust bar → "COLD." bleed → **Who it's for** (4 use cases) → **The trailer** spec table `#trailer` (mostly TBC) → **Rates** `#rates` (Day / Weekend / Weekly, "On request", each with a prefilled WhatsApp quote link) → **How it works** `#how-it-works` → **Hunter's guide** `#tips` (SEO content: keeping game meat cold) → **FAQ** `#faq` (9 Qs, native `<details>`, FAQPage JSON-LD generated from the same text) → **Booking** `#book` (form: name, number, use, collect/return dates, destination, notes; "Send on WhatsApp" builds a prefilled message, "Send enquiry" posts to Formspree) → cross-sell to meat shop → footer → mobile sticky "Book on WhatsApp" bar.

If the FAQ text changes, update the FAQPage JSON-LD in the `<head>` to match.

### Product page `/venison-fillet/` (was `/product/`)
Same header + breadcrumb (Shop / Venison / Fillet) → gallery → info (title, countdown, price, plan toggle, size, qty, add) → trust row → delivery estimator → accordions (with `aria-expanded`) → frequently bought together → you might also like → recipes (not links) → "Heading out on a hunt?" trailer cross-link → footer.
Pricing logic: `PRICES` object in the page script; subscription = one-time × 0.85 rounded to R5.

---

## 5. Catalogue (mock data)

| Product | Size | Price | "Was" | Where |
|---|---|---|---|---|
| Venison Fillet | 500g / 1kg / 2kg | R289 / R519 / R879 (sub R245 / R440 / R745) | R359 / R639 / R1,079 | Home card, PDP |
| Braai Feeder | ~3.2kg, serves 6–8 | R1,099 | R1,340 | Home card |
| Family Freezer Pack | ~5kg | R1,399 | R1,720 | Home card |
| Kudu Steak | n/a | R319 | R389 | PDP |
| Venison Boerewors | n/a | R129 | R159 | PDP |
| Springbok Chops | n/a | R149 | R189 | PDP |
| Fillet bundle | n/a | R489 | R567 | PDP |

Star ratings and review counts were **removed** (they were invented).

---

## 6. Image assets

Photos are AI-generated (Runway). Source PNGs (1200×896, ~2 MB each) live in `images/originals/`. The site uses WebP at 1200w and 600w (30 to 170 KB each) with `srcset`, explicit `width`/`height`, and `loading="lazy"` below the fold. Hero images are preloaded with `fetchpriority="high"`.

| Photo | Used for |
|---|---|
| `hero-sear` | Homepage hero, PDP gallery #1, recipe tile |
| `cuts-slate` | Fillet card, PDP gallery #2, FBT, Kudu card, recipe tile, trailer page cross-sell |
| `boerewors-braai` | Braai Feeder card, FBT, Boerewors card |
| `delivery-box` | Freezer Pack card, PDP gallery #4, Springbok card |
| `family-braai` | PDP gallery #3, FBT Springbok |
| `butcher-hands` | Build-your-box background |

**No trailer photos exist yet.** The trailer page uses an SVG illustration and says "Real trailer photos coming soon".

---

## 7. SEO setup (done 2026-09-29)

- Unique `<title>` + meta description per page, `lang="en-ZA"`, canonical, robots meta, `og:*` + Twitter cards with 1200×630 images, favicon set + web manifest, theme colour.
- JSON-LD: homepage `Organization` + `WebSite`; trailer page `Organization` + `Service` (areaServed Johannesburg/Gauteng) + `BreadcrumbList` + `FAQPage`; PDP `WebPage` + `BreadcrumbList`. **No Product/ratings markup** until prices, stock and reviews are real.
- `robots.txt` + `sitemap.xml` (3 URLs). Clean URLs with trailing slashes and 301s from old paths.
- One H1 per page, logical H2/H3, descriptive alt text on every content image, no `href="#"` links left, all internal links resolve.
- Performance: images cut from ~11 MB to ~1.3 MB, lazy loading, dimensions set (no layout shift), logos resized from 3508px to 2–3× display size.
- Accessibility: menu drawer (Esc to close, focus handling), visible focus styles, labelled icons and thumbnails, accordions with `aria-expanded`, reduced-motion support.

### Still to do for SEO (needs the owner / Richard)
1. **Google Business Profile** for the trailer hire ("fridge trailer hire near me" is a local search; this matters more than anything on the site).
2. **Google Search Console**: verify the site, submit `sitemap.xml`.
3. **Custom domain** (e.g. `venilicious.co.za`) then swap the canonical base URL (see §2 Deploy).
4. Real trailer photos with descriptive file names + alt text.
5. Fill the TBC specs and rates (more useful content ranks better and converts better).

---

## 8. Owner checklist: placeholders to replace

| Item | Where | How |
|---|---|---|
| **WhatsApp number** | `assets/site.js` → `whatsapp` **and** the `27000000000` placeholder in all HTML hrefs | Find/replace `27000000000` with the real number (27 + number without leading 0) across the repo. Until set, WhatsApp buttons scroll to the booking form / show a "being set up" message instead of opening a dead chat |
| **Formspree form ID** | `assets/site.js` → `formspreeId` | Create a form at formspree.io, paste the ID. Until set, "Send enquiry" says enquiries open soon (or falls back to WhatsApp once the number is set) |
| Trailer specs (size, capacity, temp range, power, GVM, rails/shelves, plug type) | `fridge-trailer-hire/index.html`, spec table (`dd.tbc`) | Replace `TBC` values, drop the `tbc` class |
| Trailer rates, deposit, delivery | `fridge-trailer-hire/index.html`, `#rates` + FAQ | Replace "On request" with e.g. `R850 <small>/ day</small>` |
| Pickup area | "How it works" step 2, FAQ "Do you deliver", booking sidebar | |
| FAQ answers to confirm | power ("plugs into a power point"), taking it outside Gauteng ("Yes"), delivery, deposit | Edit text **and** the FAQPage JSON-LD |
| Social links | Footer (commented TODO) + `sameAs` in homepage JSON-LD | |
| CIPC reg number | Footer `.fbase` (fake number removed) | |
| Real reviews | Removed. Add back only real, attributable reviews | Publishing invented reviews is misleading and a legal risk under SA consumer protection law |
| Meat claims | "hormone-free", "higher in omega-3 than beef", "dry-aged", "within 24 hours", nutrition figures | Owner to confirm |
| Mock prices, "was" prices, cutoff times, delivery thresholds | Homepage + PDP | Owner to confirm |

---

## 9. Known issues

1. **Same-day cutoff disagrees**: homepage countdown 17:00, PDP 10:00; countdowns use device time, not SAST.
2. Cart is fake, resets per page. Cart icon does nothing.
3. Subscribe mode ignores quantity on the PDP.
4. Delivery estimator accepts any suburb.
5. Product photos reused across different products (no real per-product shots).
6. Plan/size selectors on the PDP are clickable `<div>`s (not keyboard accessible).
7. Build-your-box and Braai Club buttons have no destination pages yet.

---

## 10. Open questions for the owner

1. Trailer: size, capacity, temperature range, power needs, GVM, fittings, plug type?
2. Trailer: daily / weekend / weekly rates, deposit, delivery options and fee, pickup area, any distance limits?
3. How many trailers? (Page assumes one.)
4. Real WhatsApp number, company registration, social handles?
5. Full product range (lamb and anything else beyond game), real prices and stock?
6. What will the real store run on (Shopify, WooCommerce, custom)?
7. Real photography for the trailer and products?
8. Custom domain?

---

## 11. Working rules for Cowork

- Keep it static and dependency-free unless the owner asks otherwise.
- **New page** = `/<slug>/index.html`, root-absolute asset paths, copy header/drawer/footer + `:root` tokens from an existing page, link `assets/site.css` + `assets/site.js`, add it to `sitemap.xml`, give it a unique title/description/canonical/OG.
- Test at 375px and ≥1240px, no horizontal scroll.
- Copy: SA English, `R1,099`, no dashes, don't invent facts (use `TODO(owner)` + "TBC"/"On request").
- Git: lowercase prefixed commit messages. Don't push to GitHub or deploy without approval.
- Keep this file current.

---

## 12. Backlog

| # | Pri | Task |
|---|---|---|
| 1 | P1 | Owner fills §8 checklist (WhatsApp + Formspree first: until then the trailer page can't take bookings) |
| 2 | P1 | Google Business Profile + Search Console + custom domain (§7) |
| 3 | P1 | Unify the same-day cutoff and compute it in SAST (§9 #1) |
| 4 | P2 | Real trailer photos → replace SVG in hero/spec, add `ImageObject` to Service JSON-LD |
| 5 | P2 | Accessibility: PDP plan/size selectors as real radio inputs |
| 6 | P2 | Shop-all page, persistent cart, fix subscribe × quantity |
| 7 | P3 | Build-your-box and Braai Club pages |
| 8 | P3 | Analytics (GA4 or Vercel Analytics) with events on WhatsApp clicks and form sends |
| 9 | P3 | Photography shot list, competitor scan, copy audit |
