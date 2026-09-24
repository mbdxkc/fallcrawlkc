#!/usr/bin/env python3
"""
================================================================================

  EAST CROSSROADS FALL CRAWL
  WebP builder

================================================================================

  @project      fallcrawlkc
  @file         tools/make-webp.py
  @updated      2026-09-24
  @author       Valdez Campos <dez@mediabrilliance.io>
  @studio       mediaBrilliance - https://www.mediabrilliance.io

  Copyright (c) 2026 mediaBrilliance. All rights reserved.

================================================================================
  WHAT THIS DOES
================================================================================

  Rebuilds the three WebP images the page actually loads:

      python3 tools/make-webp.py

  The .png files beside them are SOURCES, not served assets. Nothing in the
  markup points at map.png or icons.png any more, so a visitor never
  downloads them; they stay in the repo because map.png was processed from
  the client's teaser by hand and is the only copy of that work.

  logo.png is the exception and is still referenced: og:image and
  twitter:image keep pointing at it, because a share-card scraper is the one
  client left where PNG is safer than WebP, and tools/make-icons.py reads it
  to cut the favicons.

  WHY THE SETTINGS DIFFER

  map      Lossy. A hand-drawn map full of fine strokes, and at 1251 KB it
           was two thirds of the whole site. Its alpha channel was fully
           opaque, so the mode drops to RGB before encoding.
  logo     Lossy. Lossless costs three times as much here for no visible
           gain; checked at 1:1 against the original on the skull, which is
           the finest line work in the file.
  icons    LOSSLESS, and smaller than lossy would be. Four flat shapes with
           real transparency compress better losslessly, 27 KB against 66.

================================================================================
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "images"

JOBS = [
    # source,        output,        lossless, drop alpha
    ("map.png",      "map.webp",    False,    True),
    ("logo.png",     "logo.webp",   False,    False),
    ("icons.png",    "icons.webp",  True,     False),
]
QUALITY = 90


def main():
    for src_name, out_name, lossless, flatten in JOBS:
        src, out = ROOT / src_name, ROOT / out_name
        image = Image.open(src)
        if flatten:
            image = image.convert("RGB")
        if lossless:
            image.save(out, "WEBP", lossless=True, method=6)
        else:
            image.save(out, "WEBP", quality=QUALITY, method=6)
        was, now = src.stat().st_size, out.stat().st_size
        how = "lossless" if lossless else f"q{QUALITY}"
        print(f"{out_name:12} {how:8} {was // 1024:5} KB -> {now // 1024:4} KB"
              f"  ({100 - now * 100 // was}% smaller)")


if __name__ == "__main__":
    main()
