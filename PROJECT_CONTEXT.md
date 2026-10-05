# Venilicious: Project Context

> Handoff brief for Claude Cowork. Last updated 2026-10-05 (full redesign: light editorial "Direction A", see §3).
> The code is the source of truth. This file summarises it; if something here disagrees with the code, trust the code and update this file.

---

## TL;DR

- **Venilicious** is a South African brand selling **wild-harvested game meat** (venison, lamb, game) with **same-day delivery in Johannesburg**, plus **fridge trailer hire** (a towable refrigerated trailer, mostly hired by hunters in season, marketed to functions and events in summer).
- The **meat shop is the main thing**. Fridge trailer hire has its own page at `/fridge-trailer-hire/`.
- The shop sells **year round** (not only game meat: lamb etc. too). The summer marketing push is the trailer hire, which hunters mostly book in season.
- This repo is a **static site, no backend, no build step**. The meat cart is still fake (a counter and a toast). The trailer page takes bookings via WhatsApp (071 195 7072), call, email, and a form that opens WhatsApp or the visitor's email app.
- **The real business site is WordPress at https://www.venilicious.co.za** (About, Services, Bookings, Contact, Careers, Privacy, T&Cs, HuntEx 2026 competition terms). This build is a **preview** at **https://venilicious-preview.vercel.app** and is **noindexed** (`X-Robots-Tag: noindex` in `vercel.json`) until the owner decides to move the domain. See §2 "Moving the domain".
- Mobile-first, **light editorial design** (bone paper, black ink, logo bronze, condensed display type, hairlines), South African English, prices in ZAR. Redesigned 2026-10-05 to stop it looking AI-generated; see §3 for the rules that keep it that way.

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
| Trailers & rates | **Short Boy** 2.34 × 1.5 × 1.5 m, 390 kg, R750/day · **Tall Boy** 2.5 × 1.5 × 1.8 m, 390 kg, R750/day · **1 Tonner** 2.5 × 1.5 × 1.6 m, 1,100 kg, braked, R950/day · **Double Tonner** 3 × 1.5 × 1.6 m, 2,080 kg, braked, R1,050/day (source: venilicious.co.za/bookings/) |
| Every trailer | +10°C to −16°C (fridge or freezer), meat rail for hanging, galvanised shelving on request, compressor runs off mains or a generator (source: venilicious.co.za/services/) |
| Contacts | Adriaan 071 195 7072 (WhatsApp + calls, confirmed by Richard) · Blair 076 403 5829 · bookings@venilicious.co.za (flyer) · adriaan@venilicious.co.za (current site) |
| Socials | Facebook `profile.php?id=100068164663368` · Instagram `@venilicious_ptyltd` |
| Promo history | HuntEx 2026 "Rent & Win": rent a trailer Apr to Aug 2026 to win a Winchester 375 H&H M70 Safari Express; winner announced 24 Sep 2026 (over) |
| Payments shown | Peach Payments, Visa, Mastercard, SnapScan (badges only, no checkout) |
| Brand touch | Footer quotes **Genesis 27:3–4**. Deliberate, keep it unless the owner says otherwise |

### Voice & copy rules
- Warm, premium-rustic, confident, never hypey. Outdoorsy, family and braai centred.
- South African English: "favourites", "colour", "Joburg". Local words used naturally: *braai, boerewors, oupa, bakkie*.
- **No dashes in copy** (Richard's rule). Use commas or full stops instead of em/en dashes. Numeric ranges (6–8) are fine.
- Currency format **`R1,099`**.
- Headline pattern: short, plain declarative sentence set in condensed caps ("Fridge trailers for hire."). No italic accent words.

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
│   ├── site.css                  # THE design system (tokens, type, header, menu, footer, sections, forms, tiles)
│   ├── site.js                   # SHARED CONFIG (WhatsApp number, email, Formspree ID) + menu + WhatsApp links + toast
│   └── fonts/                    # Self-hosted: archivo.woff2 (variable wdth 62 to 125, wght 100 to 900), plex-mono-400/500.woff2
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
- **All styling lives in `assets/site.css`.** Pages only add small page-specific `<style>` (the product page has one). Page JS is inline at the bottom of each page.
- **Shared markup** (header, menu overlay, footer) is duplicated in all 3 pages. If you change it, change **all 3 pages**.
- Bump `?v=3` on `site.css`/`site.js` links after editing them (assets are cached 1 day).
- Fonts are **self-hosted** (no Google Fonts request): Archivo variable + IBM Plex Mono, preloaded in each `<head>`.
- Git: `main` only, remote `github.com/Milosam3/venilicious-preview`. Commit messages lowercase with a prefix: `add:`, `fix:`, `chore:`.

### Run locally
```bash
cd ~/Projects/venilicious-preview && python3 -m http.server 8000
```
Open http://localhost:8000/.

### Deploy
- Vercel project `venilicious-preview`, team `milosam3s-projects`. Static files, no build.
- **Git-connected (since 2026-09-29): every push to `main` deploys to production.** `vercel --prod` from the repo root still works as a manual fallback. `.vercelignore` keeps this file and the original PNGs off the site.
- `vercel.json` 301s: `/homepage/` → `/`, `/product/` → `/venison-fillet/`, `/trailer-hire/` and `/koelwa/` → `/fridge-trailer-hire/`.
- **Canonical/OG/sitemap URLs are hard-coded to `https://venilicious-preview.vercel.app`.**

### Moving the domain (when the owner says go)
1. Copy over pages the WordPress site has that this one doesn't: Privacy Policy, Terms and Conditions, HuntEx 2026 competition terms, Careers, About.
2. Add 301s in `vercel.json` from the old WordPress URLs: `/about/`, `/services/` → `/fridge-trailer-hire/`, `/bookings/` → `/fridge-trailer-hire/#book`, `/contact/`, `/careers/`, `/privacy-policy/`, `/terms-and-conditions/`, `/huntex-2026-competition-terms-and-conditions/`.
3. Find/replace `https://venilicious-preview.vercel.app` → `https://www.venilicious.co.za` (HTML, sitemap.xml, robots.txt).
4. Remove the `X-Robots-Tag: noindex` header from `vercel.json`.
5. Add the domain in Vercel, update DNS (A `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`), then submit the sitemap in Google Search Console.

---

## 3. Design system (Direction A, light editorial, 2026-10-05)

Goal: look like a bespoke agency built it, not an AI. Everything is in `assets/site.css`.

### Tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#EEEAE2` | Bone paper background |
| `--bg-2` | `#E5E0D6` | Image placeholders |
| `--ink` | `#121212` | Type, buttons, strong rules |
| `--ink-2` | `#2B2A27` | Body copy |
| `--mute` | `#5D5A54` | Captions, labels |
| `--rule` | ink @ 16% | Hairlines |
| `--accent` | `#7D5C26` | Logo bronze (darkened for contrast): section numbers, tags, hover |
| `--inv-*` | `#121212` / `#ECE7DD` / `#C49A57` | Inverse bands: booking section + footer (`.inv`) |

### Type
- **Display:** Archivo at `font-stretch:62%`, weight 800, uppercase, line-height .88 (`.display`, `.h1`, `.h2`, `.h3`, `.h4`). Echoes the condensed VENILICIOUS wordmark.
- **Text:** Archivo at normal width.
- **Data / labels:** IBM Plex Mono 12px (`.mono`) for kickers, specs, captions, prices' units. Sentence case, no letter-spaced caps.

### Components
`.hero` (copy left, photo bleeding off the right edge) · `.specline` (4 key facts on hairlines) · `.shead` (mono section number "01 / Name", big display heading, short note) · `.row` price list (trailers) · `.tiles` (products) · `.split` (text + image) · `.nlist` (numbered list) · `.cols` (2/4 column text grid) · `.faq` (`<details>`) · `.form` (underline fields) · `.btn`, `.btn.line`, `.tlink` (underlined text link with arrow) · `.stickybar` (mobile) · `.site-head` (sticky, bone, hairline) · `.drawer` (full screen menu) · `.site-foot.inv`.

### Rules that keep it from looking AI-made (don't reintroduce these)
- No Playfair / italic accent words, no orange, no glows, no film grain, no pulsing dots or countdown timers.
- No tiny letter-spaced eyebrow labels with a line in front. Use the mono "01 / Section" style.
- No rounded cards with soft borders and hover lift. Use hairlines, rows and square corners (2px max radius).
- No icon trios, no emoji, no "Most popular" or "Save R70" badges, no strike-through "was" prices.
- Real photos big and edge-to-edge. Never use images with other brands or garbled AI text (the old `delivery-box` image showed "Wild Harvest Provisions" and was removed).
- Copy: plain, specific, no dashes.

**Logo:** shown as designed (bronze mark + black wordmark) on the bone background; inverted to off-white in the footer. Favicons: mark on a cream square.

---

## 4. Pages

### Homepage `/` (`index.html`)
Header → hero (H1 "Venison, game & lamb.", hero-sear photo) → spec line (same day Joburg, field to door, free delivery over R1,500, Limpopo & N. Cape) → **01 Best sellers** `#best-sellers` (3 tiles; fillet links to its page) → **02 Build a box** `#build-a-box` (WhatsApp order) → **03 Fridge trailer hire** `#trailer-hire` (mini price list + fleet photo) → **04 Braai Club** `#braai-club` (WhatsApp) → footer `#contact`. Mock cart: badge + toast only.

### Fridge trailer hire `/fridge-trailer-hire/`
Breadcrumb → hero (H1 "Fridge trailers for hire.", tandem photo) → spec line → **01 Sizes & rates** `#rates` (4 rows, each with a prefilled WhatsApp book link) → **02 Every trailer** `#trailer` (5 features + fleet photo) → **03 Who hires them** `#uses` → **04 How it works** `#how-it-works` → **05 Hunter's guide** `#tips` → **06 Questions** `#faq` (12 Qs; FAQPage JSON-LD in `<head>` must match) → **07 Book** `#book` (dark band: WhatsApp / call / email list + form: name, number, use, trailer, dates, destination, notes; "Send on WhatsApp" builds a message, "Send by email" uses Formspree if set, else opens the visitor's email app to bookings@) → cross-sell to the meat shop → footer → mobile sticky "Book on WhatsApp".

### Product page `/venison-fillet/`
Breadcrumb → gallery (3 images, swipe + thumbnails) → info (H1, size line, price, Plan radios one-time / subscribe 15%, Size radios, qty, add) → delivery note (WhatsApp) → details accordions → "The braai bundle" (R489) → related tiles → recipes → trailer cross-link → footer → mobile sticky add bar.
Pricing logic: `PRICES` in the page script; subscription = one-time × 0.85 rounded to R5; total = unit × qty in both modes. "Was" prices and the fake delivery estimator were removed in the redesign.

---

## 5. Catalogue (mock data)

| Product | Size | Price | Old mock "was" price (no longer shown) | Where |
|---|---|---|---|---|
| Venison Fillet | 500g / 1kg / 2kg | R289 / R519 / R879 (sub R245 / R440 / R745) | R359 / R639 / R1,079 | Home card, PDP |
| Braai Feeder | ~3.2kg, serves 6–8 | R1,099 | R1,340 | Home card |
| Family Freezer Pack | ~5kg | R1,399 | R1,720 | Home card |
| Kudu Steak | n/a | R319 | R389 | PDP |
| Venison Boerewors | n/a | R129 | R159 | PDP |
| Springbok Chops | n/a | R149 | R189 | PDP |
| Fillet bundle | n/a | R489 | R567 | PDP |

Star ratings, review counts, badges and "was" prices were **removed** (they were invented).

---

## 6. Image assets

Photos are AI-generated (Runway). Source PNGs (1200×896, ~2 MB each) live in `images/originals/`. The site uses WebP at 1200w and 600w (30 to 170 KB each) with `srcset`, explicit `width`/`height`, and `loading="lazy"` below the fold. Hero images are preloaded with `fetchpriority="high"`.

| Photo | Used for |
|---|---|
| `hero-sear` | Homepage hero, PDP gallery #1, recipe tile |
| `cuts-slate` | Fillet tile, PDP gallery #2, Kudu tile, recipe tile, trailer page cross-sell |
| `boerewors-braai` | Braai Feeder tile, Boerewors tile |
| `family-braai` | Family Freezer Pack tile, PDP gallery #3 |
| `butcher-hands` | Build a box, Springbok tile |

The AI `delivery-box` image was deleted: it showed another brand ("Wild Harvest Provisions") and garbled AI text. Replace all of these with real product photography when possible.

**Trailer photos (real, from Richard):** sources `images/originals/trailer1.jpg` (tandem axle trailer, low angle) and `trailer2.jpg` (single axle trailer + fleet line-up, side lists festivals, events, functions, catering, weddings, florists, camping, hunting, sports events). Web versions: `venilicious-fridge-trailer-tandem-{600,1200,1800}.webp` (trailer page hero, OG card) and `venilicious-fridge-trailer-fleet-{600,1200}.webp` (trailer page "Every trailer" section, homepage promo). The old SVG trailer illustration is no longer used.

---

## 7. SEO setup (done 2026-09-29)

- Unique `<title>` + meta description per page, `lang="en-ZA"`, canonical, robots meta, `og:*` + Twitter cards with 1200×630 images, favicon set + web manifest, theme colour.
- JSON-LD: homepage `Organization` (with phone, email, socials) + `WebSite`; trailer page `Organization` + `Service` (areaServed Johannesburg/Gauteng, 4 `Offer`s with ZAR daily prices) + `BreadcrumbList` + `FAQPage` (12 Qs); PDP `WebPage` + `BreadcrumbList`. **No Product/ratings markup** until prices, stock and reviews are real.
- `robots.txt` + `sitemap.xml` (3 URLs). Clean URLs with trailing slashes and 301s from old paths.
- One H1 per page, logical H2/H3, descriptive alt text on every content image, no `href="#"` links left, all internal links resolve.
- Performance: images cut from ~11 MB to ~1.3 MB, lazy loading, dimensions set (no layout shift), logos resized from 3508px to 2–3× display size.
- Accessibility: menu drawer (Esc to close, focus handling), visible focus styles, labelled icons and thumbnails, accordions with `aria-expanded`, reduced-motion support.

### Still to do for SEO (needs the owner / Richard)
1. **Google Business Profile** for the trailer hire ("fridge trailer hire near me" is a local search; this matters more than anything on the site).
2. **Google Search Console**: verify the site, submit `sitemap.xml`.
3. **Move venilicious.co.za** to this site with 301s from the old WordPress URLs and drop the noindex header (see §2 "Moving the domain"). Until then this preview is deliberately kept out of Google.
4. Real trailer photos with descriptive file names + alt text.
5. Confirm deposit, delivery and weekly rates (more useful content ranks better and converts better).

---

## 8. Owner checklist: still to confirm

| Item | Where | Status |
|---|---|---|
| WhatsApp number | `assets/site.js` + HTML hrefs (`27711957072`) | **Done** (Adriaan 071 195 7072) |
| Formspree form ID | `assets/site.js` → `formspreeId` | Optional. Empty = "Send by email" opens the visitor's email app addressed to bookings@ |
| Trailer sizes, loads, daily rates, temp range, rail/shelving, power | `fridge-trailer-hire/index.html` `#rates`, `#trailer`, FAQ, Service JSON-LD offers | **Done** (from current site) |
| Weekly / multi-day rates, deposit, delivery options, pickup area, distance limits | "How it works" step 2, `.ratenote`, FAQ (deliver / deposit / outside Gauteng), booking sidebar | Owner to confirm. Edit text **and** the FAQPage JSON-LD |
| Photos per trailer size (Short Boy, Tall Boy, 1 Tonner, Double Tonner) | Fleet cards in `#rates` | Nice to have: 2 real photos are live |
| CIPC reg number | Footer `.fbase` | Owner to supply |
| Real reviews | Removed. Add back only real, attributable reviews | Invented reviews are misleading and a legal risk under SA consumer protection law |
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

1. Weekly / multi-day rates, deposit, delivery options and fee, pickup area, any distance limits?
2. Company registration number?
3. Full meat range (lamb and beyond), real prices and stock?
4. What will the real store run on (Shopify, WooCommerce, custom)?
5. Real photography for each trailer and the meat products?
6. When to move venilicious.co.za from WordPress to this site (§2 "Moving the domain")?
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
| 1 | P1 | Owner confirms remaining §8 items (deposit, delivery, pickup area, weekly rates) |
| 2 | P1 | Move venilicious.co.za to this site (§2), then Google Business Profile + Search Console (§7) |
| 3 | P1 | Unify the same-day cutoff and compute it in SAST (§9 #1) |
| 4 | P2 | Real photos of each trailer → replace hero SVG + flyer crop, add `ImageObject` to Service JSON-LD |
| 5 | P2 | Accessibility: PDP plan/size selectors as real radio inputs |
| 6 | P2 | Shop-all page, persistent cart, fix subscribe × quantity |
| 7 | P3 | Build-your-box and Braai Club pages |
| 8 | P3 | Analytics (GA4 or Vercel Analytics) with events on WhatsApp clicks and form sends |
| 9 | P3 | Photography shot list, competitor scan, copy audit |
