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

Single-page event site. Static HTML, hand-rolled CSS, vanilla JS. One build step: `tools/build.sh` minifies the stylesheet and the page script, and must run after any edit to either (the data file is never minified).
**by mediaBrilliance.io**

The long-form date came off the page on 22 September at the client's request; the
big `10.24.26` carries it now. `data/crawl.js` has a `date` field (added 28 Sep)
that drives the countdown and the add-to-calendar date, but the `<title>`, meta
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
├── style.css         # SOURCE, mobile-first. Pages load style.min.css
├── style.min.css     # built by tools/build.sh, never edited by hand
├── robots.txt        # Allow: /, since launch
├── favicon.ico       # 16 / 32 / 48, built, not hand-cropped
├── data/
│   └── crawl.js      # THE ONLY FILE THE CLIENT EDITS
├── js/
│   ├── crawl.js      # SOURCE: renders every list, the wheel, the header scene, the bat, the ravens
│   └── crawl.min.js  # built by tools/build.sh, what the pages load
├── fonts/
│   ├── antic.woff2   # body face, self-hosted, SIL OFL
│   └── OFL-antic.txt
├── tools/
│   ├── make-icons.py # cuts every icon out of images/logo.png
│   ├── make-og.py    # builds images/og.png, the 1200x630 share card
│   ├── make-webp.py  # rebuilds the page images, plus the map and logo srcset widths
│   └── build.sh      # minifies style.css and js/crawl.js; --check fails if either .min is stale
└── images/
    ├── logo.webp     # the lockup, as the page loads it
    ├── icons.webp    # free / 21+ / no wristbands / costumes strip
    ├── map.webp      # the map with all 13 spots named
    ├── og.png        # share card (og/twitter/JSON-LD), built by make-og.py
    ├── logo.png      # SOURCE, and a second JSON-LD image
    ├── icons.png     # SOURCE only, nothing links to it
    ├── map.png       # SOURCE only, nothing links to it
    ├── mark.png      # the skeleton lady alone, for a social avatar
    ├── apple-touch-icon.png
    └── favicon-32.png
```

The `.png` files are sources, except `og.png` and `logo.png`, which the share-card
scrapers fetch. `map.png` is the client's map with its black frame cropped off, so
it meets the page's own 1px border instead of a dead black band.

### Where the artwork comes from

Client assets live in `mediaBrilliance/FallCrawlKC/`. Provenance, so nobody
re-derives it:

| Site file | Source | Checked |
|---|---|---|
| `images/icons.png` | `Fall Crawl Icons.pdf` (22 Sep) | Re-rendered 22 Sep and byte-identical to the file on the site |
| `images/logo.png` | `Fall Crawl The Pitch.png` | Cropped lockup |
| `images/map.png` | `Fall Crawl Unoffical Map.png` (29 Sep; her spelling) | 1158x1168 with a solid black frame of 10/15/15/17px (left/top/right/bottom), cropped to the 1129x1133 interior. Replaced the 24 Sep teaser |
| `images/*.webp` | the `.png` beside each | Built by `tools/make-webp.py`, including `map-480`/`map-736` and `logo-500`/`logo-700` for srcset (29 Sep). Re-run it rather than converting by hand |
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

**Nothing moves once the script runs.** Most of the page is written in from the
data file, so the markup holds it empty and CSS reserves the finished size: the
date, countdown and Instagram handle their height, the Instagram button its width,
the desktop header (script-built above 1100px) its 51px, and the What to Expect
list a little under its smallest measured height, which keeps everything below it
off screen until the cards land. The hours and blurb lines take no space while
empty. Before this the page scored CLS 0.536 on a phone (29 Sep); after, five live
mobile runs read 100/100/100/100 with CLS 0. Anything new the script fills above
or inside the first screen needs the same reservation, checked by loading the
page with js/crawl.min.js blocked and comparing positions.

**Cache lifetime is GitHub Pages', not ours.** Pages serves everything with a
10-minute `Cache-Control` and the repo cannot change it; Lighthouse flags it on
every run. The only fix is a CDN or host in front of Pages, which is a hosting
decision, not a code change.

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
per tab); a countdown; the big date as the add-to-calendar link, marked with a
calendar-plus icon (the calendar file, or Google Calendar on Android, which
cannot open one); the Fall Crawl Roulette wheel, right under the map,
of live spots, whose card shows drinks, entertainment, menu and cover where known
and "details drop day-of" otherwise, with 13 made-up example spots while the venue
list is empty (`showExamples`, off since 28 Sep at Amy's request); the wheel sits
under the map and shows now (29 Sep, for the weekend launch); a date in
`wheelFrom` would take it off the page until that day, nav link included; a header scene of ghosts, a goblin and a monster
(size sets speed, randomised per load), fog thickest behind the title, and the
real moon for Kansas City (position and phase computed in the browser); a bat
drawn per frame from a 3D wing model about once a minute; and a flock of 1,000
ravens on one canvas, first within a minute of arriving, then at random at least
five minutes apart; behind every page, a sparse, faint starfield (one canvas,
drawn once, five twinkling stars) under a streetlight haze along the bottom of
the window, the sky as it looks from downtown. The header reads "East Crossroads
Fall Crawl - KCMO" (29 Sep), and "Kansas City" sits between the lockup and the
date in wide white caps, flanked by the lockup's orange sparkles. The nav stays
behind the menu button below 1100px, where five links would run into the title.
The Instagram button is the icon and handle in a glowing orange ring
(`.cta-ig`), filling on hover; `ig.button` in the data file can put a word in
front of the handle. Play It Safe (getting home, ID-recognizable costumes, no
weapons) renders from `safety` in the data file, in the What to Expect cards. All motion is off under
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
- [ ] Venue details in `data/crawl.js`. All 13 are in by account name with street addresses (29 Sep, A to Z); `hours`, Instagram and the specials are still empty. The Fold is listed as The Den at its owner's request; the map image still says The Fold until Amy's final map arrives
- [x] Replace `images/map.png` with the full map. Done 29 Sep from `Fall Crawl Unoffical Map.png`
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
- [x] `Fall Crawl Unoffical Map.png` from the client (received 29 Sep)
- [x] `showExamples: false`. Amy, 28 Sep: no made-up spots or specials, so
      nobody is disappointed when the real list lands. The wheel reads
      "Coming soon" until the first venue is added
- [x] Trick-or-Treat Routes copy (Amy, 29 Sep). The line under the Instagram
      button is settled as none: the icon in the button carries it (`ig.blurb`
      stays empty)
- [ ] Client copy still to write: the headline blurb under the map heading;
      Crawl Guide is hidden (`guide: false`)
- [ ] Amy to approve the Play It Safe draft (`safety` in the data file), and
      confirm Beckett's vs Becketts and Grinders vs Grinder's
- [ ] Amy's final map, with The Fold relabelled The Den

Page order (29 Sep): hero, What to Expect, map, Fall Crawl Roulette,
Trick-or-Treat Routes, What's Happening, Play It Safe, Partners, icon strip.
The menu follows it: Home, Expect, Where, Spin, Spots.

---

Copyright © 2026 mediaBrilliance. All rights reserved. See LICENSE.
