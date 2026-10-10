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

Single-page event site. Static HTML, hand-rolled CSS, vanilla JS. One build step: `tools/build.sh` minifies the stylesheet and the page script, then stamps each page's reference to them with `?v=` plus eight hex of the built file's SHA-256, and must run after any edit to either (the data file is never minified or stamped; each page loads it as `data/crawl.js?m=<current minute>` instead, so a client edit reaches every browser within about a minute). GitHub Pages lets a browser reuse a file for 10 minutes, so an unstamped stylesheet can pair new HTML with old CSS; `--check` fails on a stale stamp as well as a stale build.
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

Went live 22 September 2026. DNS moved off Squarespace to GitHub Pages
(`185.199.108-111.153`, `www` CNAMEd to `mbdxkc.github.io`), the `CNAME` file
went in after the A records, and Let's Encrypt issued the certificate the same
afternoon. `noindex` and the `robots.txt` disallow came off once the domain
answered publicly.

All 13 spots are listed with address, hours, Instagram and featured brands
(1 Oct). Specials, entertainment, menus and cover charges are still to come and
appear on each spot's wheel card as they are added. Crawl Guide and Suggested
Crawls stay hidden until they have content.

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
│   ├── gagalin.woff2 # display face, Basic Latin subset of Iordanis Passas's free Gagalin
│   └── OFL-antic.txt
├── tools/
│   ├── make-icons.py # cuts every icon out of images/logo.png
│   ├── make-og.py    # builds images/og.png, the 1200x630 share card
│   ├── make-webp.py  # rebuilds the page images, plus the map and logo srcset widths
│   ├── make-brands.py # crops the featured-brand logos and builds their WebP
│   └── build.sh      # minifies style.css and js/crawl.js and stamps their ?v=; --check fails if either is stale
└── images/
    ├── logo.webp     # the lockup, as the page loads it
    ├── icons.webp    # free / 21+ / no wristbands / costumes strip
    ├── map.webp      # the final map: 13 spots, each with its brand logo
    ├── og.png        # share card (og/twitter/JSON-LD), built by make-og.py
    ├── brands/       # featured-brand logos: <slug>.webp served, <slug>.png source
    ├── logo.png      # SOURCE, and a second JSON-LD image
    ├── icons.png     # SOURCE only, nothing links to it
    ├── map.png       # SOURCE only, nothing links to it
    ├── mark.png      # the skeleton lady alone, for a social avatar
    ├── mb-mark.svg   # studio credit mark, a copy of mbdx/images/mb-mark.svg
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
| `images/map.png` | `Fall Crawl Final Map 11x17 2026-10-02.png` (Amy's 11x17 poster, 2 Oct) | The map sits in a black poster field at (77, 357); cropped to the 1141x1143 map. Each spot carries its brand logo, The Den replaces The Fold. Replaced the 29 Sep unofficial map, which replaced the 24 Sep teaser |
| `images/*.webp` | the `.png` beside each | Built by `tools/make-webp.py`, including `map-480`/`map-736` and `logo-500`/`logo-700` for srcset (29 Sep). Re-run it rather than converting by hand |
| `images/brands/*` | `Brand Logos/` (Amy, 1 Oct): 17 Instagram-post PNGs, a small mark on a white 1080x1350 canvas | `tools/make-brands.py` crops each to its ink (palette kept) as the `.png` source, then builds an 88px-tall WebP, lossless or lossy by whichever is smaller. About 33 KB for all 14 |
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
the desktop header (script-built above 1200px) its 51px, and the What to Expect
list a little under its smallest measured height, which keeps everything below it
off screen until the cards land. The hours and blurb lines take no space while
empty. Before this the page scored CLS 0.536 on a phone (29 Sep); after, five live
mobile runs read 100/100/100/100 with CLS 0. Anything new the script fills above
or inside the first screen needs the same reservation, checked by loading the
page with js/crawl.min.js blocked and comparing positions.

**Cache lifetime is GitHub Pages', not ours.** Pages serves everything with a
10-minute `Cache-Control` and the repo cannot change it; Lighthouse flags it on
every run. Two workarounds keep it from showing stale content (3 Oct): the
stylesheet and page script carry a content-hash `?v=` from `tools/build.sh`, so a
changed file is a new URL, and each page requests the data file as
`data/crawl.js?m=<current minute>`, so an edit reaches every visitor within about
a minute. Images and fonts still take up to 10 minutes. Anything beyond that
needs a CDN or host in front of Pages.

**Brand orange is `#C84008`**, sampled from the logo artwork rather than picked. It
measures **4.19:1 on black**: clears 3:1 for large text, fails 4.5:1 for body copy.
It is restricted to display type, rules and hover. Body copy uses `#F8F8F8`.

**The page loads WebP, the share tags load PNG.** Converting the three images the
page actually requests took them from 1,701 KB to 216 KB, an 87% cut, and `map.png`
alone was two thirds of the whole site. Settings differ per image and
`tools/make-webp.py` explains why: `icons` is lossless because four flat shapes with
transparency compress better that way, 27 KB against 66 for lossy. Checked at 1:1
against the originals before shipping.

**Two self-hosted webfonts.** Body type is Antic (SIL OFL), display type is
Gagalin (2 Oct), both served from `fonts/` and preloaded (without the preload
Antic's swap shifted the desktop layout 0.14 CLS; with both preloaded, three
local mobile runs read CLS 0). Gagalin is Iordanis Passas's free display face,
from the official FreeTypography zip; its `fsType` is 0 and the zip carries no
license file, so written terms would have to come from him. It is subset to
Basic Latin (40 KB) and declared at `font-weight: 100 900`, because it has one
weight and the headings ask for 800: a narrower range makes the browser fake a
bold. It has **no apostrophe and no hyphen**, so those two characters in a
heading render from Arial Black, the next face in `--display`. Distillery Strong
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
of live spots (each labelled with its event name, or the business name until it
has one), whose card shows the collab heading, event, address, hours, Instagram,
brands, any prize (Ted's free cover), then the same write-up and lists as the
Crawl Guide, or "Details coming soon." otherwise, with a text link to EZ Pedicabs for the long walks; the wheel sits
under the map and shows now (29 Sep, for the weekend launch); a date in
`wheelFrom` would take it off the page until that day, nav link included; a header scene of ghosts, a goblin and a monster
(size sets speed, randomised per load), fog thickest behind the title, and the
real moon for Kansas City (position and phase computed in the browser, gliding
along its real path at the moon's own pace); a bat
drawn per frame from a 3D wing model about once a minute; and a flock of 1,000
ravens on one canvas, first within a minute of arriving, then at random at least
five minutes apart; behind every page, the real sky over Kansas City (5 Oct):
the 288 stars of magnitude 3.5 and brighter placed for the visitor's current
time, the southern sky with east at the left edge, redrawn each minute as it
turns, the five brightest in view twinkling, all under a streetlight haze along
the bottom of the window. The star list is built into `js/crawl.js`; nothing is
fetched. The header reads "East Crossroads
Fall Crawl - KCMO" (29 Sep), and "Kansas City" sits between the lockup and the
date in wide white caps, flanked by the lockup's orange sparkles. The nav stays
behind the menu button below 1200px, where five links would run into the title.
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
- [ ] Venue details in `data/crawl.js`. All 13 have address, hours, Instagram and featured brands; ten have Amy's full write-ups (10 Oct, entered verbatim as `collab`, `event`, `about` and `lists`). Cigar Box, Grinder's and International Tap House still read "More coming soon" and have no event name. King G is Wild Turkey (10 Oct). The Fold is listed as The Den at its owner's request, and the final map (2 Oct) says so too
- [ ] Confirm `mod.gallery.space2` exactly as Amy typed it. Ricochet was `ricocherkcmo` as typed and is `ricochetkcmo` (confirmed 3 Oct). Instagram serves the same page for real and made-up handles, so neither can be checked from outside
- [x] Lucky One logo and a darker Rosaluna badge (2 Oct). Every brand now has a logo; the text chip only appears for a name not in `LOGOS`
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
      profile. Both are usable now that the domain serves the live site
- [ ] Client asset fix: the pedicab promo reads "WINE & COCKAILS"
- [x] Gagalin, self-hosted 2 Oct from the designer's free release
- [x] `Fall Crawl Unoffical Map.png` from the client (received 29 Sep)
- [x] No made-up spots or specials (Amy, 28 Sep). The 13 example spots and
      `showExamples` were deleted on 3 Oct once the real list was in, so an
      invented special can no longer reach the page
- [x] Trick-or-Treat Routes copy (Amy, 29 Sep). The line under the Instagram
      button is settled as none: the icon in the button carries it (`ig.blurb`
      stays empty). Amy offered a two-sentence version on 1 Oct; still none
- [ ] Client copy still to write: the headline blurb under the map heading;
      Crawl Guide is hidden (`guide: false`)
- [x] Play It Safe is Amy's own copy (1 Oct), five items. Spellings
      confirmed: Beckett's and Grinder's
- [x] Amy's final map, with The Den (2 Oct)

Page order (3 Oct): hero, What to Expect, map, Fall Crawl Roulette,
Trick-or-Treat Routes, What's Happening, Play It Safe, the EZ Pedicabs card (no
heading since 3 Oct), icon strip, footer with the studio credit. Crawl Guide
and Suggested Crawls sit in the markup and stay hidden while empty. The menu
follows the page: Home, Expect, Where, Spin, Spots.

---

Copyright © 2026 mediaBrilliance. All rights reserved. See LICENSE.
