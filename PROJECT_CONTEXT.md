# Venilicious: Project Context

> Handoff brief for Claude Cowork. Last updated 2026-09-29 (trailer hire page, SEO sweep, real trailer data + contacts).
> The code is the source of truth. This file summarises it; if something here disagrees with the code, trust the code and update this file.

---

## TL;DR

- **Venilicious** is a South African brand selling **wild-harvested game meat** (venison, lamb, game) with **same-day delivery in Johannesburg**, plus **fridge trailer hire** (a towable refrigerated trailer, mostly hired by hunters in season, marketed to functions and events in summer).
- The **meat shop is the main thing**. Fridge trailer hire has its own page at `/fridge-trailer-hire/`.
- The shop sells **year round** (not only game meat: lamb etc. too). The summer marketing push is the trailer hire, which hunters mostly book in season.
- This repo is a **static site, no backend, no build step**. The meat cart is still fake (a counter and a toast). The trailer page takes bookings via WhatsApp (071 195 7072), call, email, and a form that opens WhatsApp or the visitor's email app.
- **The real business site is WordPress at https://www.venilicious.co.za** (About, Services, Bookings, Contact, Careers, Privacy, T&Cs, HuntEx 2026 competition terms). This build is a **preview** at **https://venilicious-preview.vercel.app** and is **noindexed** (`X-Robots-Tag: noindex` in `vercel.json`) until the owner decides to move the domain. See §2 "Moving the domain".
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

**Trailer photos (real, from Richard):** sources `images/originals/trailer1.jpg` (tandem axle trailer, low angle) and `trailer2.jpg` (single axle trailer + fleet line-up, side lists festivals, events, functions, catering, weddings, florists, camping, hunting, sports events). Web versions: `venilicious-fridge-trailer-tandem-{600,1200}.webp` (trailer page hero, OG card) and `venilicious-fridge-trailer-fleet-{600,1200}.webp` (trailer page "Every trailer" section, homepage promo). The old SVG trailer illustration is no longer used.

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
