# Maison Levain — Bakery Website Demo

A multi-page, responsive, vanilla HTML/CSS/JavaScript portfolio website for a **fictional** artisan bakery. All business details, prices, opening hours, address, testimonials and contact information are sample content. This is not a real bakery and must not be presented as one.

## Run locally
Use a simple static server from this folder (ES modules do not reliably work from `file://`):

```bash
python -m http.server 8000
```
Then open `http://localhost:8000`. You can also use VS Code Live Server.

## Pages
- `index.html` — home / brand introduction
- `menu.html` — searchable, filterable and sortable sample menu; enquiry cart stored in localStorage; WhatsApp order message
- `about.html` — story, philosophy and FAQ
- `contact.html` — opening status, validated contact form, WhatsApp handoff and map embed
- `404.html` — branded not-found page

## Replace before showing to a real client
Search the project for `FICTIONAL`, `example.com`, `0000000`, `Maison Levain`, and `Bahawalpur`. Replace:
1. Brand name, logo mark, tagline and copy.
2. Business type, city, neighbourhood, country and full verified address.
3. All product names, descriptions, prices and categories in `js/data.js`.
4. Phone and WhatsApp number in `js/data.js`, `js/app.js`, footer and contact page. WhatsApp number must be digits only with country code.
5. Email address, opening hours, map query and map iframe.
6. Canonical URLs, Open Graph URLs, JSON-LD, sitemap and robots host.
7. All fictional story claims and sample dietary information. Do not publish ingredient/allergen or dietary claims without verification.

### Opening hours
The demo badge uses Pakistan Standard Time (UTC+5) and sample hours Tuesday–Sunday 08:00–20:00, Monday closed. Update `setupOpenBadge()` in `js/app.js` and the visible schedule in `contact.html` together.

### WhatsApp behaviour
The cart and contact form open a pre-filled WhatsApp message. The visitor still presses Send in WhatsApp. No order is transmitted or stored by a server. This is not payment processing, stock management or a live POS integration.

## Images to replace
All artwork currently ships as local SVG illustration placeholders (no external image CDN). Replace each SVG with your own licensed image using the same filename, or update the relevant `src` in the HTML / `js/data.js`. Recommended replacement: JPG/WebP, landscape 1400×1100 for cards, portrait 1200×1500 for editorial images, hero 1800×1400. Keep descriptive alt text and explicit width/height.

- `images/hero-croissant.svg` — hero pastry image
- `images/baker-hands.svg` — hands shaping dough
- `images/bakery-interior.svg` — bakery interior
- `images/butter-croissant.svg` — butter croissant
- `images/pain-au-chocolat.svg` — pain au chocolat
- `images/almond-danish.svg` — almond danish
- `images/sourdough-loaf.svg` — sourdough loaf
- `images/milk-bread.svg` — milk bread
- `images/focaccia.svg` — focaccia
- `images/cinnamon-roll.svg` — cinnamon roll
- `images/lemon-tart.svg` — lemon tart
- `images/brownie.svg` — brownie
- `images/favicon.svg` — favicon (replace with your own mark)

## Design / implementation notes
- No CDN, remote font dependency or third-party runtime dependency is required. The design uses system fonts to remain self-contained and work offline.
- The hero uses a lightweight canvas radial-light effect with a static local SVG illustration. It is not a Three.js mesh or shader-based 3D scene.
- GSAP, ScrollTrigger, Lenis, bloom post-processing and a shared WebGL image-distortion canvas are not bundled. Scroll reveals use native IntersectionObserver and the hero effect uses Canvas 2D. This keeps the package offline-ready and avoids pretending unbundled libraries are present.
- Replace system font stacks with properly licensed, self-hosted WOFF2 display/body fonts if brand licensing/assets are available.
- The map iframe requires an internet connection. All other primary page content and interactions work locally.

## SEO / deployment
- Every main page has a unique title, meta description, canonical placeholder, Open Graph basics and favicon.
- JSON-LD is included where relevant. Replace `https://example.com` with the final production domain and validate the structured data before launch.
- Update `sitemap.xml` and `robots.txt` to the production domain.
- Deploy the folder contents to Netlify, GitHub Pages or any static host. Ensure the host serves `404.html` as the not-found page.
- For GitHub Pages, use a repository root or configure the correct base path. All asset references are relative.

## Quality checks
The package includes semantic page structure, keyboard focus styling, skip links, reduced-motion handling, responsive breakpoints, form validation and localStorage cart persistence. Run a manual browser QA pass at 360, 390, 768, 1024 and 1440px; verify external WhatsApp and map behaviour, update the business hours, and test links after replacing content. Automated Lighthouse scores are not claimed by this demo package.


## Photography update
This version includes the supplied bakery photography, optimized as local WebP files for faster loading. The original image filenames were retained (with `.webp` extensions). The photography is used across the homepage, menu, story and contact pages. `images/og-cover.webp` is the social sharing preview image. Replace the demo brand details, prices, WhatsApp number, map and canonical URLs before publishing for a real business.
