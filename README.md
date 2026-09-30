# Oracle Services Sarl — oraclesces.com

Static bilingual website (French at `/`, English at `/en/`) built with Astro + Tailwind, hosted on Netlify.

```
npm install
npm run dev       # local preview at http://localhost:4321
npm run build     # production build into dist/
```

## Updating content (no layout code needed)

All text lives in `src/i18n/fr.json` and `src/i18n/en.json` — edit both so the languages stay in sync.
Company details (emails, phone, WhatsApp, address, RCCM, social links) are in `src/data/site.json`; empty values are hidden.

Sections below **stay hidden until their file has at least one entry**. Only add real, client-approved content.

### Add a partner or customer logo (written permission required)
1. Put the logo in `src/assets/partners/` (PNG, SVG or JPG).
2. Add an entry to `src/data/partners.json`:
   ```json
   { "name": "Example Ltd", "type": "supplier", "logo": "example.png", "url": "https://example.com", "since": 2026, "approved": true }
   ```
   `type` is `supplier` or `customer`. Entries without `"approved": true` are not shown.

### Add a testimonial
`src/data/testimonials.json` (optional logo in `src/assets/testimonials/`):
```json
{ "name": "Jane Doe", "role": "Director", "company": "Example Ltd", "quote_en": "…", "quote_fr": "…", "logo": "example.png" }
```

### Add gallery photos
Put the photo in `src/assets/gallery/`, then add to `src/data/gallery.json`:
```json
{ "image": "expo-2026.jpg", "caption_en": "…", "caption_fr": "…", "date": "2026-05-14", "location": "Lubumbashi" }
```
Images are compressed and lazy-loaded automatically.

### Add a country to the map
`src/data/countries.json` — `iso` is the two-letter country code, `status` is `base`, `active` or `potential`:
```json
{ "iso": "ZM", "name_en": "Zambia", "name_fr": "Zambie", "status": "potential", "potential_en": "…", "potential_fr": "…" }
```
Small island states (Cabo Verde, Comoros, Mauritius, São Tomé, Seychelles) are too small to show on the map but still appear in the country list.

## Brand assets
`npm run brand` regenerates the favicon, OG image and logo crops from `public/images/logo.jpeg`.

## Deploying (Netlify)
Connect the repository in Netlify; `netlify.toml` sets the build. After the first deploy, open **Forms → contact** in the Netlify dashboard and add an email notification to info@oraclesces.com.
