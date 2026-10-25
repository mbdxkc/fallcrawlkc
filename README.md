# East Crossroads Fall Crawl

The event site for the East Crossroads Fall Crawl, a free, choose-your-own-adventure
bar crawl through 13 spots in Kansas City's East Crossroads. The 2026 crawl ran
Saturday, Oct. 24; the home page now thanks everyone, and the event page lives on at
[fallcrawlkc.com/2026](https://fallcrawlkc.com/2026/).

Live at **[fallcrawlkc.com](https://fallcrawlkc.com)** · built by
[mediaBrilliance](https://www.mediabrilliance.io)

---

## Editing the site

### [Open the event details →](https://github.com/mbdxkc/fallcrawlkc/edit/main/data/crawl.js)

1. Type between the quote marks. Leave the quotes and commas alone.
2. Click the green **Commit changes** button, then **Commit changes** again in the box.
3. Reload [fallcrawlkc.com](https://fallcrawlkc.com) after a minute.

To undo: **Commits** at the top of this page, find yours, **...**, **Revert**.

---

## Between crawls

Since Oct. 25, 2026, the site has two parts:

- **`index.html`, the home page:** thank you, the night in numbers, every spot
  linked to its Instagram, and a link to the 2026 page. Its words are written in the
  page itself; `data/crawl.js` supplies only the header bar's title and icons.
- **`2026/`, the archive:** the event page exactly as it ran on crawl night, with
  its own frozen copies of the stylesheet, the page script and the data file. Editing
  the live files for a future crawl cannot change it, and `tools/build.sh` leaves it
  alone. Images and fonts are shared from the root. The countdown, calendar date and
  check-in switch themselves off after the date; the wheel still spins.

The live `style.css` and `js/crawl.js` still carry the event page's parts (wheel,
check-in, spot lists) so the next crawl's page can be built on them; only the bat,
ravens and header figures were deleted. The sections below describe the event page,
which is what `2026/` holds and what a future crawl's page will start from.

## What the event page does

- **Lists the night from one data file.** Spots, events, featured brands, drink
  lists, hours, safety notes and the pedicab partner all render from
  `data/crawl.js`, which the organizer edits in GitHub's web editor.
- **Fall Crawl Roulette.** A wheel of the 13 spots. Each spin picks the next stop
  by weighted chance and opens a card with the spot's details and walking
  directions from wherever the phone is.
- **Check in.** One tap compares the phone's location with each spot's map pin
  *on the phone* and checks the visitor in. That spot sits out the next spin, and
  nearer spots become likelier.
- **The real night sky.** The moon in the header is placed and phased for Kansas
  City in real time and dims under real cloud cover. Behind every page, the 288
  stars of magnitude 3.5 and brighter sit where they are in the southern sky right
  now.
- **Halloween motion (2026 page only).** Ghosts, a goblin and a monster cross the
  header; a bat drawn from a 3D wing model crosses about once a minute; now and then
  a flock of 1,000 ravens pours through. All of it was removed from the live script
  on Oct. 25, 2026, and survives in `2026/crawl.min.js` and git history. The moon,
  fog and stars stay on every page.
- **The practical bits.** A countdown, an add-to-calendar date, a 21+ check, the
  map, and a text-a-pedicab link on every card.

All motion stops under `prefers-reduced-motion`.

---

## How it works

**Static and dependency-free.** Plain HTML, one hand-written stylesheet and one
vanilla JavaScript file, hosted on GitHub Pages. No framework, no bundler, no
package manager, no third-party scripts beyond Google Analytics.

**Load order.** Each page loads, in order:

```
data/crawl.js?m=<current minute>   the content, as window.FALL_CRAWL
js/crawl.min.js?v=<content hash>   renders it and runs everything else
```

The minute stamp on the data file means an organizer's edit reaches every
visitor within about a minute, past GitHub Pages' 10-minute cache. The content
hash on the script and stylesheet means a new build is a new URL.

**Rendering rules** (`js/crawl.js`):

- Every value from the data file is written with `textContent`, never
  `innerHTML`. The file is hand-edited, so it must not be able to inject markup.
- A section whose list is empty is removed from the page, not hidden, so no
  half-built heading reaches a visitor or a screen reader.
- The header links are built *after* the sections render, so a section that
  removed itself never leaves a dead link.
- Content filled in after load has its space reserved in CSS, so the page does
  not shift as it arrives (CLS went from 0.536 to 0 on a phone, Sept. 29, 2026).

### The Roulette odds

Slices are equal on screen; the odds behind them are not. For each spot, `odds()`
in `js/crawl.js` works out a weight:

| Condition | Weight |
|---|---|
| The spot the visitor is checked in at | 0 |
| The spot the last spin landed on | 0, so "Spin again" always moves |
| After a check-in | `1 / (metres from the check-in + 200)`, so next door weighs 3-4x the far end of the neighborhood |
| Checked into earlier tonight | a quarter of the above |
| `chance: N` in the data file | a flat N percent, whatever else applies |

The pick is a weighted draw over those numbers. The wheel then turns so the
chosen slice lands under the pointer, with a little jitter so it never stops
dead center.

### Check-in and privacy

`navigator.geolocation` runs only when the visitor taps **Check in where I am**.
The position is compared with each spot's `pin` on the device; the coordinates
are never sent anywhere. Some spots are closer together than a phone can locate
itself indoors (Grinders and International Tap House are 9 m apart), so every
spot inside the reading's margin of error is offered as a choice instead of
guessed.

The only thing sent is the spot's name, to Google Analytics, as a `check_in`
event with a `Spot` parameter. Each spin sends a `spin` event the same way, with
the spot it landed on, so Analytics counts spins and landings. Spots checked into are kept in `localStorage` so
the odds survive a reload; the list is ignored, then deleted, once the check-in
window closes at 4 a.m. after the event. The [privacy page](https://fallcrawlkc.com/privacy.html)
describes all of this in plain language.

### The sky

- **Moon:** position and phase from the low-precision lunar formulas popularized
  by SunCalc (after Meeus), computed in the browser for Kansas City. It glides at
  the moon's real pace and fades when it passes behind header text.
- **Weather:** the one outside request the script makes. Open-Meteo's current
  conditions for Kansas City's fixed coordinates, cached 30 minutes per tab. Cloud
  cover veils the moon; fog and rain thicken the header fog. If it fails, the
  sky stays clear.
- **Stars:** 288 stars (d3-celestial's catalog, after Hipparcos) stored in the
  script as right ascension, declination and magnitude, mapped to the southern
  sky with east at the left edge and redrawn each minute.
- **Bat and ravens (2026 page only):** each bird is a projected 3D wing model.
  The ravens draw on one canvas from 24 prebuilt wingbeat poses, so a bird costs one
  fill and one stroke a frame; the canvas exists only while the flock is in view.

---

## Build and deploy

```bash
tools/build.sh           # minify style.css and js/crawl.js, stamp ?v=<hash> in all four pages
tools/build.sh --check   # change nothing; exit 1 if any .min file or stamp is stale
```

Requires `cleancss` and `terser` (`brew install clean-css-cli terser`).

The pages load only the `.min` files, so an edit to `style.css` or `js/crawl.js`
does nothing until the build runs. `data/crawl.js` is never minified: it is the
file the organizer edits, and it has to stay readable.

Pushing to `main` deploys through GitHub Pages. `_config.yml` keeps this README
and `tools/` off the site.

The image tools rebuild artwork from the client's source files, so nothing is
cropped or converted by hand:

| Script | Builds |
|---|---|
| `tools/make-webp.py` | every page image as WebP, plus `srcset` widths for the map and logo |
| `tools/make-brands.py` | the featured-brand logos, cropped to their ink |
| `tools/make-icons.py` | `favicon.ico`, the touch icon and the avatar, from the logo |
| `tools/make-og.py` | `images/og.png`, the 1200x630 share card |

---

## Performance, accessibility and privacy

- **Weight:** about 15 KB of gzipped script and 5.5 KB of gzipped CSS (Oct. 24, 2026). Images
  are WebP (the three the page requests went from 1,701 KB as PNG to 216 KB at
  the switch, Sept. 24, 2026).
  Two self-hosted fonts, preloaded; nothing is fetched from a font service.
- **Accessibility:** WCAG 2.1 AA is the target, with the details on the
  [accessibility page](https://fallcrawlkc.com/accessibility.html). Skip link,
  one `h1`, landmarks, labeled controls, and every main action at least 44px
  tall on a phone.
  Brand orange `#C84008` measures 4.19:1 on black, so it is used for display type
  and accents only; body copy is `#F8F8F8`.
- **Analytics:** Google Analytics 4 loads after the page has finished and gone
  idle, so it never competes with the first screen.

---

## Project structure

```
/
├── index.html          # home: thank you and see you next fall
├── 2026/               # the 2026 event page, frozen: its own CSS, script and data
├── privacy.html        # what is collected and why, in plain language
├── terms.html
├── accessibility.html
├── style.css           # SOURCE, mobile-first
├── style.min.css       # built
├── data/
│   └── crawl.js        # THE ONLY FILE THE ORGANIZER EDITS
├── js/
│   ├── crawl.js        # SOURCE: rendering, roulette, check-in, sky, motion
│   └── crawl.min.js    # built
├── fonts/              # Antic (SIL OFL) and Gagalin, both self-hosted
├── images/             # .webp served; .png kept as sources (og.png and logo.png are also served)
│   └── brands/         # featured-brand logos
├── tools/              # build script and image builders
├── _config.yml         # keeps README and tools/ off GitHub Pages
├── CNAME, robots.txt, sitemap.xml
└── LICENSE
```

### Where the artwork comes from

| Site file | Source |
|---|---|
| `images/logo.png` | the organizer's lockup, cropped |
| `images/map.png` | Amy's final 11x17 map (Oct. 2), cropped out of its black poster field to 1141x1143 |
| `images/icons.png` | `Fall Crawl Icons.pdf`, rendered at 2194px with its black background knocked out |
| `images/brands/*` | the organizer's brand files, cropped to their ink by `tools/make-brands.py` |
| `images/*.webp` | the `.png` beside each, via `tools/make-webp.py` |
| icons and favicon | `images/logo.png`, via `tools/make-icons.py` |

---

## Decisions worth knowing

**Paths are relative, not root-absolute.** A GitHub Pages project site is served
from `/fallcrawlkc/`, where `/images/...` would resolve outside the project.
Relative paths work at that subpath and at the custom domain alike.

**`<meta charset>` sits above each page's header comment.** The header runs past
the spec's 1024-byte window for the charset declaration.

**Inline SVG for icons, not image files.** An `<img>` cannot inherit
`currentColor`, and the header icons tint on hover from one file.

**Gagalin has no apostrophe or hyphen.** Those two characters in a heading render
from the next face in the stack. It is declared at `font-weight: 100 900` because
it has one weight and the headings ask for 800; a narrower range makes the
browser fake a bold.

**The event date lives in two files.** `data/crawl.js` has `date`, which drives
the countdown, the calendar link and the check-in window. The `<title>`, meta
description and Event JSON-LD in `index.html` are written by hand. A date change
means both.

**Text inside images cannot be edited from the data file.** The map labels (and
the brand logos on it) are artwork; changing one means a new map.

**Cache lifetime is GitHub Pages'.** It serves everything with a 10-minute
`Cache-Control` that the repo cannot change. The hashed and minute-stamped URLs
above route around it for code and content; images and fonts can take up to 10
minutes to refresh.

---

Copyright © 2026 mediaBrilliance. All rights reserved. The source is published
for reference and review; see [LICENSE](LICENSE). Antic is licensed under the SIL
Open Font License (`fonts/OFL-antic.txt`).
