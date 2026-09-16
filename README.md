# East Crossroads Fall Crawl

Single-page event site. Static HTML, hand-rolled CSS, vanilla JS, no build step.

**Saturday, October 24, 2026** — the Saturday before Halloween. East Crossroads, Kansas City.
No tickets, no wristbands, no set route.

**by mediaBrilliance.io**

---

## Status: pre-launch, not indexed

Client first look 15 September: positive on the build. The site is still missing
its venue list and running an unverified Instagram handle, so that covers the
shape, not the content.


`index.html` carries `noindex, nofollow` and `robots.txt` disallows everything.
**Both come off before the QR ships.** Live today: no domain, no venue list, and an
unverified Instagram handle.

---

## Editing the content

Everything that changes week to week lives in **`data/crawl.js`**. Nothing else needs
touching, and the client edits it from GitHub's web editor:

1. Open `data/crawl.js` on GitHub
2. Pencil icon, top right
3. Change the text between the quote marks
4. Commit changes

That file holds the date, the Instagram handle, the social icons, the venue list,
the suggested crawls and the partners. Instructions are written at the top of it in
plain language.

An empty list removes its whole section from the page rather than rendering an empty
heading, so nothing half-finished can reach a visitor. The header links are built
*after* the sections render, so a section that removes itself never leaves a dead
anchor behind.

---

## Structure

```
/
├── index.html        # the page
├── style.css         # 339 lines, mobile-first
├── robots.txt        # disallow while pre-launch
├── data/
│   └── crawl.js      # THE ONLY FILE THE CLIENT EDITS
├── js/
│   └── crawl.js      # renders every list from data/crawl.js
└── images/
    ├── logo.png      # lockup, cropped from the pitch board
    └── map.png       # teaser map, positions only, no names yet
```

The four scripts the base template ships (`header.js`, `footer.js`,
`page-transition.js`, `utils.js`) were removed. All four serve a multi-page nav that
does not exist here, so each would have been a request rendering nothing.

---

## Decisions worth knowing

**Brand orange is `#C84008`**, sampled from the logo artwork rather than picked. It
measures **4.19:1 on black**: clears 3:1 for large text, fails 4.5:1 for body copy.
It is restricted to display type, rules and hover. Body copy uses `#F8F8F8`.

**No webfont.** The display face in the artwork is not licensed here, so the lockup
ships as artwork and live type uses a system stack.

**Paths are relative, not root-absolute.** A GitHub Pages project site is served from
`/fallcrawlkc/`, where `/images/...` resolves outside the project and 404s.

**`canonical`, `og:url` and `og:image` point at the Pages URL**, not at
`fallcrawlkc.com`, because that domain is **not registered**. Pointing head tags at a
domain with no DNS is worse than leaving them off. One find-and-replace when it
resolves.

**`<meta charset>` sits above the file header comment.** The header runs past the
spec's 1024-byte limit for the charset declaration.

---

## Open before launch

- [ ] Point `fallcrawlkc.com` at the site, then swap the six absolute URLs and add `CNAME`.
      Registered 2026-09-14, nameservers at Squarespace, currently a "Coming Soon" page.
      Held there deliberately until the content is in. Change the Squarespace A records to
      GitHub Pages (185.199.108-111.153) **first**, then add `CNAME` — never the reverse
- [ ] Add venues to `data/crawl.js`. The Spots section is absent until then
- [ ] Replace `images/map.png` with the full map once names are locked
- [ ] Remove `noindex` and the `robots.txt` disallow
- [ ] Decide the QR destination. The pedicab promo's QR currently points at
      Instagram, not this site
- [ ] Client asset fix: the pedicab promo reads "WINE & COCKAILS"

---

Copyright © 2026 mediaBrilliance. All rights reserved. See LICENSE.
