# CLAUDE.md — Oracle Services Sarl Website

## Project overview

Marketing website for **Oracle Services Sarl**, a company registered in **Kolwezi, DRC** (the "Copper Capital of the World") that operates countrywide. Oracle Services acts as a **consultant and connector**: it partners with suppliers of products and services (in any industry — fintech, solution builders, financial institutions, mining, etc.) and links them with customers who need those solutions. DRC is the starting focus, but the company positions itself as **pan-African with a global outlook** — "without borders".

- **Tagline:** Connecting Expertise. Delivering Solutions.
- **Domain:** oraclesces.com
- **Vision:** Work with partners to exceed our customers' expectations.
- **Closing message:** Join us on this journey of success in our beloved continent, Africa. Our continent deserves world-class services and project execution.

This is a **static site — no custom backend**. Everything must be deployable to free static hosting.

## Primary goal: credibility

The site exists mainly so that people can **verify the company is real and well-connected**. Typical scenario: Oracle Services submits a tender → the prospective customer visits the site → they see a professional company with recognisable partners and happy customers.

Every design decision should serve: **trust, legitimacy, confidence.**

### Audience
1. Prospective customers (including tender evaluators)
2. Prospective business partners / suppliers
3. Anyone verifying the company exists

## Hard rules (client requirements)

- **"We want it to be real."** Never invent partners, logos, testimonials, statistics, project counts, or client names. Use clearly labelled empty states or hide sections until real content exists.
- **Partner logos only with written permission** from that partner. Logos are added over time.
- **No team/founders section** for now — the founders are employed elsewhere and want to stay discreet. Design so a team section can be added later without restructuring.
- **Tone: pragmatic and simple.** No hype, no "we'll take you to the moon" language. Short, clear, confident sentences.
- **Bilingual: English and French**, full parity. French is essential (DRC is francophone). Language switcher visible in the header on every page.
- Content must be **easy to update** (partners, testimonials, gallery, countries) without touching layout code — use data files.

## Tech stack

- **Framework:** Astro (static output) with built-in i18n routing (`/en/...`, `/fr/...`; default `fr` or `en` — confirm with client)
- **Styling:** Tailwind CSS
- **Content:** Astro content collections / JSON data files in `src/data/`
- **Contact form:** Netlify Forms (if hosted on Netlify) or Web3Forms / Formspree — no server code
- **Map:** Inline SVG of Africa, countries highlighted from data
- **Hosting:** Netlify or Cloudflare Pages (free tier), custom domain oraclesces.com
- **No** databases, auth, CMS servers, or login areas.

## Sitemap

1. **Home** — hero (logo, tagline, one-line value proposition, CTA "Contact us"), what we do (short), partners strip, map teaser, testimonials (hidden if empty), CTA band
2. **About** — who we are, Kolwezi/DRC base, pan-African/global outlook, vision, how we work (the connector model)
3. **Services / How we work** — consultancy + supply of services and solutions; industries served (fintech, financial institutions, solution builders, mining & industrial, etc. — confirm list); simple 3-step "Tell us the need → We match the right partner → We deliver together"
4. **Partners** — two groups: **Suppliers/Partners** and **Customers**. Logo grid, each logo optionally linked. Clear "Become a partner" CTA.
5. **Where we operate** — Africa map. DRC highlighted as base. Other countries added over time, each with a short "country potential" card (sector opportunities). Only add countries the client approves.
6. **Gallery** — photos from partner meetings, expos, events. Data-driven, with captions in EN/FR and dates. Hidden from nav until it has content.
7. **Testimonials** — referrals from happy customers (name, company, quote, optional logo). Hidden until real entries exist.
8. **Contact** — form + email addresses + location (Kolwezi, DRC)

Future (design for, don't build yet): Team, News/Updates.

## Contact details

| Purpose | Email |
|---|---|
| General | info@oraclesces.com |
| Sales | sales@oraclesces.com |
| Yvette | MMY@oraclesces.com |
| Didier | Dkani@oraclesces.com |
| Adhemar | PAK@oraclesces.com |

On the public site, show **info@** and **sales@** prominently. Personal addresses: confirm with client whether to display them (they want to stay discreet for now — default to hiding them).

### Contact form fields
- Full name (required)
- Company / organisation
- Email (required)
- Phone / WhatsApp
- Country
- "I am a…" → Customer looking for a solution / Supplier or partner / Other
- What are you looking for? (required, textarea)
- Submissions go to info@oraclesces.com (and/or sales@). Include honeypot spam protection. Show a bilingual success message.

## Brand & design

Derived from the supplied logo (`public/images/logo.png`):

- **Navy** (wordmark): ~`#0B1F5B` — primary text/brand
- **Royal blue** (globe): ~`#1257A8` — accents, links
- **Gold** (Africa, "SERVICES", circuit lines): ~`#B8893A`, lighter `#E3C170` — highlights, CTAs, dividers
- **White / off-white** backgrounds, generous whitespace
- Sample exact hex values from the logo file before finalising.

Typography: clean geometric sans (e.g. Montserrat or Poppins for headings, Inter for body) with wide letter-spacing for small caps labels, echoing "SERVICES".

Visual motifs: the gold circuit-line pattern from the logo can be used subtly as section dividers or background accents. Feel: corporate, premium, calm — not flashy.

Requirements:
- Mobile-first (many visitors will be on phones), fast on slow connections — optimise/compress images, lazy-load gallery
- Accessible: semantic HTML, alt text in both languages, sufficient contrast (check gold on white)
- Basic SEO per language: titles, meta descriptions, Open Graph image, `hreflang` tags, sitemap.xml
- Favicon from the globe mark

## Data files (easy updates)

```
src/data/
  partners.json      # { name, type: "supplier"|"customer", logo, url?, since?, approved: true }
  testimonials.json  # { name, role, company, quote_en, quote_fr, logo? }
  countries.json     # { iso, name_en, name_fr, status: "base"|"active"|"potential", potential_en, potential_fr }
  gallery.json       # { image, caption_en, caption_fr, date, location }
src/i18n/
  en.json
  fr.json
```

Sections driven by empty arrays must **hide themselves** rather than show placeholders on the live site.

## Content drafting guidance

Claude drafts copy in English and French together. Keep it short and factual. Starting points:

- **Hero (EN):** Connecting expertise. Delivering solutions. — Based in Kolwezi, DRC, we connect organisations with trusted partners to deliver the services and solutions they need, across Africa and beyond.
- **Hero (FR):** Relier l'expertise. Livrer des solutions. — Basés à Kolwezi, en RDC, nous mettons en relation les organisations avec des partenaires de confiance pour leur fournir les services et solutions dont elles ont besoin, en Afrique et au-delà.
- **Positioning:** Not locked into one industry — we collaborate with reliable, professional partners in any sector to meet market requirements.

All copy must be reviewed and approved by the client before launch. French should be reviewed by a native speaker (Didier / Yvette).

## Open questions for the client

- Default language: French or English?
- Final list of industries/sectors to name on the Services page
- Physical address to display (or just "Kolwezi, DRC")?
- Phone / WhatsApp number to display?
- Which email receives form submissions?
- Any existing social media links (LinkedIn etc.)?
- Company registration number (RCCM) to show in the footer? (Boosts credibility for tenders.)

## Working conventions

- Commit small, descriptive changes
- Every user-facing string lives in `src/i18n/*.json` — no hard-coded text in components
- Test both languages and mobile widths before each deploy
- Never add a logo, testimonial, or country without confirmation that the client has approval
