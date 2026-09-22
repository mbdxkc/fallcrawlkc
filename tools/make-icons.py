#!/usr/bin/env python3
"""
================================================================================

  EAST CROSSROADS FALL CRAWL
  Icon builder

================================================================================
  PROJECT
================================================================================

  @project      fallcrawlkc
  @file         tools/make-icons.py
  @version      1.0.0
  @updated      2026-09-22
  @client       East Crossroads Fall Crawl - East Crossroads, Kansas City, MO
  @url          https://fallcrawlkc.com/
  @repository   https://github.com/mbdxkc/fallcrawlkc

================================================================================
  AUTHORSHIP
================================================================================

  @author       Valdez Campos <dez@mediabrilliance.io>
  @studio       mediaBrilliance - https://www.mediabrilliance.io
  @contact      dez@mediabrilliance.io

================================================================================
  LICENSE
================================================================================

  Copyright (c) 2026 mediaBrilliance. All rights reserved.
  Proprietary. See LICENSE at the repository root.

================================================================================
  WHAT THIS DOES
================================================================================

  Cuts the skeleton lady out of images/logo.png and writes every icon the
  site declares. Run it instead of cropping by hand, so the artwork stays
  reproducible from the one source the client supplied:

      python3 tools/make-icons.py

  Writes favicon.ico, images/mark.png and images/apple-touch-icon.png.

  MARK is the square that holds the whole figure. The three KNOCKOUT
  rectangles blank the skyline buildings that sit behind her shoulders and
  the serif of the orange "E" that reaches into the top-left corner. Those
  read as stray marks once the wordmark around them is gone.

  HEAD is a tighter square on the skull and the glass, and it is what the
  .ico carries at 32 and 48: the full figure turns to grey mush that small,
  while her profile with the drink still reads.

  SKULL drops the glass and fills the frame with the head, because at 16 even
  HEAD loses the drink to a smudge. The 16px entry is the worst of the set no
  matter how it is cropped, and it only reaches non-retina displays, since a
  retina tab asks for 32.

  The gamma lift compensates for a 1px white line averaging down to grey
  when the art is reduced this far. Raising it further starts to bloom the
  lines into each other.

  Requires Pillow.

================================================================================
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "images" / "logo.png"

MARK = (254, 16, 342, 342)                 # x, y, w, h in source pixels
KNOCKOUTS = [(0, 0, 40, 34),               # serif of the orange "E"
             (0, 238, 37, 342),            # skyline, behind her left arm
             (311, 236, 342, 342)]         # skyline, behind her right shoulder
HEAD = (20, 4, 322, 306)                   # box within the mark, not the source
SKULL = (88, 30, 258, 200)                 # ditto
GAMMA = 0.62
ICO_CROPS = {16: SKULL, 32: HEAD, 48: HEAD}
PALETTE = 64                               # the art is three inks plus edges


def build_mark():
    x, y, w, h = MARK
    mark = Image.open(SOURCE).convert("RGB").crop((x, y, x + w, y + h))
    black = Image.new("RGB", mark.size, (0, 0, 0))
    for x0, y0, x1, y1 in KNOCKOUTS:
        mark.paste(black.crop((x0, y0, x1, y1)), (x0, y0))
    return mark


GAMMA_LUT = [round(255 * (level / 255) ** GAMMA) for level in range(256)]


def lift(image):
    return image.point(GAMMA_LUT * len(image.getbands()))


def shrink(image):
    """Cut the file by two thirds. Line art on black spends its palette on
    antialiasing, and 64 entries covers that with no visible loss."""
    return image.quantize(colors=PALETTE, method=Image.MEDIANCUT,
                          dither=Image.NONE)


def main():
    mark = build_mark()
    head = mark.crop(HEAD)

    shrink(mark.resize((684, 684), Image.LANCZOS)).save(
        ROOT / "images" / "mark.png", optimize=True)
    shrink(mark.resize((180, 180), Image.LANCZOS)).save(
        ROOT / "images" / "apple-touch-icon.png", optimize=True)
    lift(head.resize((32, 32), Image.LANCZOS)).save(
        ROOT / "images" / "favicon-32.png", optimize=True)

    # append_images is what makes the .ico carry a DIFFERENT crop per size.
    # Passing sizes alone would resample the one image handed to save().
    frames = [lift(mark.crop(box).resize((size, size), Image.LANCZOS))
              for size, box in sorted(ICO_CROPS.items())]
    frames[-1].save(ROOT / "favicon.ico", format="ICO",
                    sizes=sorted((s, s) for s in ICO_CROPS),
                    append_images=frames[:-1])

    for name in ("favicon.ico", "images/mark.png",
                 "images/apple-touch-icon.png", "images/favicon-32.png"):
        print(f"{name:34} {(ROOT / name).stat().st_size:>7} bytes")


if __name__ == "__main__":
    main()
