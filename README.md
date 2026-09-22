# East Crossroads Fall Crawl

Single-page event site. Static HTML, hand-rolled CSS, vanilla JS, no build step.

**Saturday, October 24, 2026** — the Saturday before Halloween. East Crossroads, Kansas City.
No tickets, no wristbands, no set route.

The long-form date is **no longer shown on the page** (client, 22 September). The
big `10.24.26` carries it. `date` stays in `data/crawl.js` because the page title
and the search listing still say it in full.

**by mediaBrilliance.io**

---

## Status: live at https://fallcrawlkc.com

Client first look 15 September: positive on the build. The site is still missing
its venue list and running an unverified Instagram handle, so that covers the
shape, not the content.


Went live 22 September 2026. DNS moved off Squarespace to GitHub Pages
(`185.199.108-111.153`, `www` CNAMEd to `mbdxkc.github.io`), the `CNAME` file
went in after the A records, and Let's Encrypt issued the certificate the same
afternoon. `noindex` and the `robots.txt` disallow came off once the domain
answered publicly.

Still missing its venue list, so the Spots section is absent by design.

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
├── privacy.html      # collects nothing, and says so specifically
├── terms.html        # plain language, not lawyer-reviewed
├── style.css         # 339 lines, mobile-first
├── robots.txt        # disallow while pre-launch
├── data/
│   └── crawl.js      # THE ONLY FILE THE CLIENT EDITS
├── js/
│   └── crawl.js      # renders every list from data/crawl.js
└── images/
    ├── logo.png      # lockup, cropped from the pitch board
    ├── icons.png     # free / 21+ / no wristbands / costumes strip
    └── map.png       # teaser map, positions only, no names yet
```

### Where the artwork comes from

Client assets live in `mediaBrilliance/FallCrawlKC/`. Provenance, so nobody
re-derives it:

| Site file | Source | Checked |
|---|---|---|
| `images/icons.png` | `Fall Crawl Icons.pdf` (22 Sep) | Re-rendered 22 Sep and byte-identical to the file on the site |
| `images/logo.png` | `Fall Crawl The Pitch.png` | Cropped lockup |
| `images/map.png` | `Fall Crawl Map 1 Teaser.png` | Processed, not the raw file (1400x1367 against her 1326x1300) |

**`Instagram logo.png` is deliberately unused.** Rendered beside the inline SVG
the site already draws, at the 20px both appear at, the two are
indistinguishable. Swapping would cost the `currentColor` tint the header hover
depends on, add a request, and put a black rectangle on the orange button, since
her file has no alpha channel. The SVG is the same mark for none of that.

`icons.png` is rendered from the client's `Fall Crawl Icons.pdf` at 2194px wide
with its black background knocked out, so it sits on the page colour instead of
on a black rectangle of its own. The words are baked into the artwork, so the
`alt` text carries them: that string is the only place the page states 21+
outside the footer's legal line.

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

- [x] Point `fallcrawlkc.com` at the site, swap the absolute URLs, add `CNAME`.
      Registered 2026-09-14, nameservers at Squarespace, currently a "Coming Soon" page.
      Held there deliberately until the content is in. Change the Squarespace A records to
      GitHub Pages (185.199.108-111.153) **first**, then add `CNAME` — never the reverse
- [ ] Add venues to `data/crawl.js`. The Spots section is absent until then
- [ ] Replace `images/map.png` with the full map once names are locked
- [x] Remove `noindex` and the `robots.txt` disallow, across all three pages
- [ ] `favicon.ico` 404s on every page. No icon asset exists yet
- [ ] Privacy and terms name no email. Contact routes to the Instagram DM,
      because the only address in this repo is the studio's, and a studio
      byline is not the client's legal contact. Swap it if Amy wants one
- [ ] Decide the QR destination. The pedicab promo's QR currently points at
      Instagram, not this site. **Two codes generated 2026-09-22** and verified
      by decoding them back: one to `fallcrawlkc.com`, one to the Instagram
      profile. The website one is only correct once the domain stops serving
      Squarespace's "Coming Soon" page
- [ ] Client asset fix: the pedicab promo reads "WINE & COCKAILS"

---

Copyright © 2026 mediaBrilliance. All rights reserved. See LICENSE.
