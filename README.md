# East Crossroads Fall Crawl

Live at **[fallcrawlkc.com](https://fallcrawlkc.com)**

---

## Editing the site

### [Open the event details →](https://github.com/mbdxkc/fallcrawlkc/edit/main/data/crawl.js)

1. Type between the quote marks. Leave the quotes and commas alone.
2. Click the green **Commit changes** button, then **Commit changes** again in the box.
3. Reload [fallcrawlkc.com](https://fallcrawlkc.com) after a minute.

To undo: **Commits** at the top of this page, find yours, **...**, **Revert**.

---

# Notes for whoever maintains this

Single-page event site. Static HTML, hand-rolled CSS, vanilla JS, no build step.
**by mediaBrilliance.io**

The long-form date came off the page on 22 September at the client's request; the
big `10.24.26` carries it now. `data/crawl.js` has a `date` field (added 28 Sep)
that drives the countdown and the add-to-calendar links, but the `<title>`, meta
description and Event JSON-LD in `index.html` are still hardcoded and do not read
it. Changing the event date means both files.

An empty list removes its whole section from the page rather than rendering an
empty heading, so nothing half-finished can reach a visitor. The header links are
built *after* the sections render, so a section that removes itself never leaves a
dead anchor behind.

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

## Structure

```
/
├── index.html        # the page
├── privacy.html      # collects nothing, and says so specifically
├── terms.html        # plain language, not lawyer-reviewed
├── style.css         # mobile-first, no build step
├── robots.txt        # Allow: /, since launch
├── favicon.ico       # 16 / 32 / 48, built, not hand-cropped
├── data/
│   └── crawl.js      # THE ONLY FILE THE CLIENT EDITS
├── js/
│   └── crawl.js      # renders every list, the wheel, the header scene, the bat, the ravens
├── fonts/
│   ├── antic.woff2   # body face, self-hosted, SIL OFL
│   └── OFL-antic.txt
├── tools/
│   ├── make-icons.py # cuts every icon out of images/logo.png
│   ├── make-og.py    # builds images/og.png, the 1200x630 share card
│   └── make-webp.py  # rebuilds the three images the page loads
└── images/
    ├── logo.webp     # the lockup, as the page loads it
    ├── icons.webp    # free / 21+ / no wristbands / costumes strip
    ├── map.webp      # teaser map, positions only, no names yet
    ├── og.png        # share card (og/twitter/JSON-LD), built by make-og.py
    ├── logo.png      # SOURCE, and a second JSON-LD image
    ├── icons.png     # SOURCE only, nothing links to it
    ├── map.png       # SOURCE only, nothing links to it
    ├── mark.png      # the skeleton lady alone, for a social avatar
    ├── apple-touch-icon.png
    └── favicon-32.png
```

The `.png` files are sources, except `og.png` and `logo.png`, which the share-card
scrapers fetch. `map.png` stays because it was processed from the client's teaser by
hand and no command reproduces it.

### Where the artwork comes from

Client assets live in `mediaBrilliance/FallCrawlKC/`. Provenance, so nobody
re-derives it:

| Site file | Source | Checked |
|---|---|---|
| `images/icons.png` | `Fall Crawl Icons.pdf` (22 Sep) | Re-rendered 22 Sep and byte-identical to the file on the site |
| `images/logo.png` | `Fall Crawl The Pitch.png` | Cropped lockup |
| `images/map.png` | `Fall Crawl Map 1 Teaser.png` | Processed, not the raw file (1400x1367 against her 1326x1300) |
| `images/*.webp` | the `.png` beside each | Built 24 Sep by `tools/make-webp.py`. Re-run it rather than converting by hand |
| `images/mark.png`, `favicon.ico`, `apple-touch-icon.png`, `favicon-32.png` | `images/logo.png` | Built 22 Sep by `tools/make-icons.py`. Re-run it rather than re-cropping |

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

**The page loads WebP, the share tags load PNG.** Converting the three images the
page actually requests took them from 1,701 KB to 216 KB, an 87% cut, and `map.png`
alone was two thirds of the whole site. Settings differ per image and
`tools/make-webp.py` explains why: `icons` is lossless because four flat shapes with
transparency compress better that way, 27 KB against 66 for lossy. Checked at 1:1
against the originals before shipping.

**One self-hosted webfont.** Body type is Antic (SIL OFL), served from `fonts/` and
preloaded (without the preload its swap shifted the desktop layout 0.14 CLS).
Display type names Gagalin first and falls back to a heavy system stack until the
client sends the file; add it to `fonts/` with an `@font-face`. Distillery Strong
lives only in the logo artwork. Nothing is fetched from a font service.

**Paths are relative, not root-absolute.** A GitHub Pages project site is served from
`/fallcrawlkc/`, where `/images/...` resolves outside the project and 404s.

**`canonical`, `og:url` and `og:image` point at `fallcrawlkc.com`.** They pointed
at the Pages URL until the domain resolved on 22 September, because head tags
aimed at a domain with no DNS are worse than none.

**The icons are built, not drawn.** `tools/make-icons.py` cuts the skeleton lady
out of `images/logo.png`, blanks the three skyline fragments and the stray serif
that the wordmark used to hide, and writes every size. The `.ico` carries a
tighter crop at 16 than at 32 and 48: the whole figure turns to grey mush that
small, and her skull in profile does not. Run `python3 tools/make-icons.py`
instead of cropping by hand, so the artwork stays reproducible from the one file
the client supplied.

**`<meta charset>` sits above the file header comment.** The header runs past the
spec's 1024-byte limit for the charset declaration.

**What the page does beyond the lists (28 Sep).** A 21+ check (sessionStorage,
per tab); a countdown and add-to-calendar links; the "Where to Next?" spin wheel
of live spots, whose card shows drinks, entertainment, menu and cover where known
and "details drop day-of" otherwise, with 13 made-up example spots while the venue
list is empty (`showExamples`, off since 28 Sep at Amy's request); the wheel sits
last before the icon strip and stays off the page, nav link included, until
`wheelFrom` (2026-10-17); a header scene of ghosts, a goblin and a monster
(size sets speed, randomised per load), fog thickest behind the title, and the
real moon for Kansas City (position and phase computed in the browser); a bat
drawn per frame from a 3D wing model about once a minute; and a flock of 1,000
ravens on one canvas, first within a minute of arriving, then at random at least
five minutes apart; behind every page, a sparse, faint starfield (one canvas,
drawn once, five twinkling stars) under a streetlight haze along the bottom of
the window, the sky as it looks from downtown. The header reads "East Crossroads
Fall Crawl - KCMO" (29 Sep, the only visible place the page names the city), and
the nav stays behind the menu button below 1100px, where five links would run
into the title. All motion is off under
`prefers-reduced-motion`. Every header layer was contrast-checked against the
title and links.

**The one outside request is weather.** Open-Meteo, for Kansas City's fixed
coordinates, cached 30 minutes; clouds veil the moon and bad weather thickens the
fog. The privacy page says so. If it fails, the sky stays clear.

---

## Open before launch

- [x] Point `fallcrawlkc.com` at the site, swap the absolute URLs, add `CNAME`.
      Registered 2026-09-14, nameservers at Squarespace, currently a "Coming Soon" page.
      Held there deliberately until the content is in. Change the Squarespace A records to
      GitHub Pages (185.199.108-111.153) **first**, then add `CNAME` — never the reverse
- [ ] Add venues to `data/crawl.js`. The Spots section is absent until then
- [ ] Replace `images/map.png` with the full map once names are locked
- [x] Remove `noindex` and the `robots.txt` disallow, across all three pages
- [x] `favicon.ico`, `apple-touch-icon.png` and `favicon-32.png`, declared on
      all three pages. Built from the logo by `tools/make-icons.py`
- [ ] Privacy and terms name no email. Contact routes to the Instagram DM,
      because the only address in this repo is the studio's, and a studio
      byline is not the client's legal contact. Swap it if Amy wants one
- [ ] Decide the QR destination. The pedicab promo's QR currently points at
      Instagram, not this site. **Two codes generated 2026-09-22** and verified
      by decoding them back: one to `fallcrawlkc.com`, one to the Instagram
      profile. The website one is only correct once the domain stops serving
      Squarespace's "Coming Soon" page
- [ ] Client asset fix: the pedicab promo reads "WINE & COCKAILS"
- [ ] Gagalin font file from the client; headings use a fallback until then
- [ ] `Fall Crawl Unofficial Map.png` from the client (not received)
- [x] `showExamples: false`. Amy, 28 Sep: no made-up spots or specials, so
      nobody is disappointed when the real list lands. The wheel reads
      "Coming soon" until the first venue is added
- [ ] Client copy still to write: headline blurb, the line under the Follow
      button, Trick-or-Treat Routes; Crawl Guide is hidden (`guide: false`)

---

Copyright © 2026 mediaBrilliance. All rights reserved. See LICENSE.
