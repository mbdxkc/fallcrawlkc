#!/usr/bin/env python3
"""
================================================================================

  EAST CROSSROADS FALL CRAWL
  Brand logo builder

================================================================================

  @project      fallcrawlkc
  @file         tools/make-brands.py
  @updated      2026-10-02
  @author       Valdez Campos <dez@mediabrilliance.io>
  @studio       mediaBrilliance - https://www.mediabrilliance.io

  Copyright (c) 2026 mediaBrilliance. All rights reserved.

================================================================================
  WHAT THIS DOES
================================================================================

  Builds the featured-brand logos shown on each spot and its Roulette card:

      python3 tools/make-brands.py

  The client sent each logo as a 1080x1350 Instagram post: a small mark in
  the middle of a white canvas, no alpha channel. Two steps:

  1. CROP. When the client folder is present, each original is cropped to
     its ink plus a margin and saved as images/brands/<slug>.png. Cropping
     only removes white canvas, so these are the sources of record and the
     repo can rebuild without the client folder.
  2. BUILD. Each source is scaled to HEIGHT px (2x the largest chip) and
     written as images/brands/<slug>.webp, lossless or lossy, whichever
     measures smaller for that logo.

  The page shows them on white chips, not knocked out onto the dark page:
  Jack Daniel's, Crystal Head, Ole Smoky, Holladay and American Honey are
  black marks that would disappear.

  Run it again after adding a logo to BRANDS, then paste the printed sizes
  into LOGOS in js/crawl.js.

================================================================================
"""

from pathlib import Path
import io

from PIL import Image, ImageChops

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "images" / "brands"
CLIENT = REPO.parent.parent / "mediaBrilliance" / "FallCrawlKC" / "Brand Logos"

HEIGHT = 88          # 2x the 44px chip on the Roulette card
MARGIN = 0.06        # of the ink's longer side, kept around the crop
QUALITY = 90

# slug -> client file. Where she sent two versions, the one that holds up
# at chip size: the round Old Forester and Tito's badges, and the Chica
# Chida mark that carries the name. Rosaluna is the darker badge she sent
# 2 Oct; the pale 1 Oct file is kept beside it, unused.
BRANDS = {
    "ben-holladay":   "Ben Holladay Logo.png",
    "chica-chida":    "Chica Chida Logo.png",
    "crystal-head":   "Crystal Head Vodka Logo.png",
    "espolon":        "Espolon Logo.png",
    "fireball":       "Fireball Logo.png",
    "four-roses":     "Four Roses Logo.png",
    "high-noon":      "High Noon Logo.png",
    "jack-daniels":   "Jack Daniel's Logo.png",
    "justin":         "Justin Winery Logo.png",
    "lucky-one":      "Lucky One Logo.png",
    "old-forester":   "Old Forester Logo.png",
    "ole-smoky":      "Ole Smoky Logo.png",
    "rosaluna":       "Rosaluna Logo.png",
    "titos":          "Tito's Handmade Vodka.png",
    "american-honey": "Wild Turkey American Honey Logo.png",
    "wild-turkey":    "Wild Turkey Logo.jpg",
}


def on_white(image):
    """Flatten onto white. A file with transparency would otherwise turn its
    clear pixels black on conversion, and the chips are white."""
    if image.mode in ("RGBA", "LA") or "transparency" in image.info:
        rgba = image.convert("RGBA")
        base = Image.new("RGBA", rgba.size, "white")
        base.alpha_composite(rgba)
        return base.convert("RGB")
    return image.convert("RGB")


def crop(path):
    """The logo without its white canvas. Anything short of near-white
    counts as ink, so a pale mark is not cropped into."""
    image = on_white(Image.open(path))
    ink = ImageChops.difference(image, Image.new("RGB", image.size, "white"))
    box = ink.convert("L").point(lambda v: 255 if v > 10 else 0).getbbox()
    if box is None:
        raise ValueError(f"{path.name}: no ink found")
    pad = round(max(box[2] - box[0], box[3] - box[1]) * MARGIN)
    box = (max(box[0] - pad, 0), max(box[1] - pad, 0),
           min(box[2] + pad, image.width), min(box[3] + pad, image.height))
    # Crop the original, not the RGB copy: her files are palette images, and
    # keeping the palette halves the sources (1.3 MB against 2.7).
    return Image.open(path).crop(box)


def smallest(image):
    """Encode both ways and keep the smaller. Flat two-colour marks win
    lossless; the textured ones (Espolon, Fireball) win lossy."""
    best = None
    for lossless in (True, False):
        buf = io.BytesIO()
        if lossless:
            image.save(buf, "WEBP", lossless=True, method=6)
        else:
            image.save(buf, "WEBP", quality=QUALITY, method=6)
        if best is None or buf.tell() < best[1].tell():
            best = (lossless, buf)
    return best


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    if CLIENT.is_dir():
        for slug, name in BRANDS.items():
            crop(CLIENT / name).save(OUT / f"{slug}.png", optimize=True)
    for slug in BRANDS:
        src = OUT / f"{slug}.png"
        image = on_white(Image.open(src))
        width = round(image.width * HEIGHT / image.height)
        image = image.resize((width, HEIGHT), Image.LANCZOS)
        lossless, buf = smallest(image)
        (OUT / f"{slug}.webp").write_bytes(buf.getvalue())
        how = "lossless" if lossless else f"q{QUALITY}"
        print(f"  '{slug}': [{width}, {HEIGHT}],   // {how}, {buf.tell() // 1024 or 1} KB")


if __name__ == "__main__":
    main()
