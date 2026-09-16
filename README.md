# base_site

Starter template for mediaBrilliance client sites. Static HTML, hand-rolled CSS, vanilla JS.

**by mediaBrilliance.io**

---

## What it is

The skeleton every new client build starts from. Ships with placeholder copy on purpose: `<title>page title</title>`, `content="page description"`, `content="site name"`. Filling those in is step one, and their presence in a deployed page is the tell that a step was skipped.

No framework, no build step, no dependencies. A client site should still render in ten years.

---

## Structure

```
/
├── index.html          # Single page, header + footer includes
├── style.css           # 1,069 lines, mobile-first
└── js/
    ├── header.js       # Injects the shared site header
    ├── footer.js       # Injects the shared site footer
    ├── page-transition.js  # Fade between pages
    └── utils.js        # Shared helpers
```

Header and footer are injected by JS rather than duplicated per page, so a nav change is one edit rather than one per file.

---

## Conventions

Inherited from `mBcode/CLAUDE.md`:

- **Mobile-first.** Breakpoints at 480, 768 and 900 px
- **`clamp()` for fluid sizing**, CSS variables for color
- **`prefers-reduced-motion`** respected on every transition
- **JSDoc headers** on JS files, a constants object for config
- **Event delegation** for anything dynamic

---

## Performance targets

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Images ship as WebP at 80 percent quality, lazy-loaded below the fold. The LCP image carries `fetchpriority="high"`.

---

## Starting a client build

1. Copy the tree, rename, `git init`
2. Replace every placeholder: title, description, site name, OG tags
3. Add `sitemap.xml` with `www.` URLs and a `robots.txt`
4. Add Schema.org JSON-LD, Open Graph and Twitter Card meta
5. Set up 301 redirects for any URL the previous site exposed

Sites derived from this template: MuNiKC, Cafe Corazón, theEmbers.

---

Copyright © 2026 mediaBrilliance. All rights reserved. See LICENSE.
