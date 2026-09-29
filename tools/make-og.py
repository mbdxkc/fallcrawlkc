"""Build images/og.png, the 1200x630 share card, from images/logo.png.

The card is what people see when the link is texted or posted, so it
carries the date and the place, not just the logo. Antic is read from
fonts/antic.woff2 so the card matches the site.

    python3 tools/make-og.py
"""
import io, pathlib, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
W, H = 1200, 630
ORANGE, INK, MUTED = (200, 64, 8), (248, 248, 248), (190, 190, 190)


def antic(size):
    f = TTFont(ROOT / "fonts/antic.woff2"); f.flavor = None
    buf = io.BytesIO(); f.save(buf); buf.seek(0)
    return ImageFont.truetype(buf, size)


def tracked(draw, cx, y, text, font, fill, track):
    """Centre `text` on cx with letter-spacing `track` px."""
    widths = [draw.textlength(c, font=font) for c in text]
    x = cx - (sum(widths) + track * (len(text) - 1)) / 2
    for c, w in zip(text, widths):
        draw.text((x, y), c, font=font, fill=fill)
        x += w + track


card = Image.new("RGB", (W, H), (0, 0, 0))

# Fog: soft puffs behind the logo, same idea as the header.
fog = Image.new("L", (W, H), 0)
d = ImageDraw.Draw(fog)
rnd = random.Random(1024)
for _ in range(9):
    cx, cy = rnd.uniform(250, 950), rnd.uniform(260, 420)
    rw, rh = rnd.uniform(160, 300), rnd.uniform(45, 80)
    d.ellipse((cx - rw, cy - rh, cx + rw, cy + rh), fill=rnd.randint(30, 55))
fog = fog.filter(ImageFilter.GaussianBlur(40))
card = Image.composite(Image.new("RGB", (W, H), (205, 215, 230)), card, fog)

logo = Image.open(ROOT / "images/logo.png").convert("RGB")
lw = 760
logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
# The logo sits on black; screen it so the fog shows through its ground.
lx, ly = (W - lw) // 2, 38
region = card.crop((lx, ly, lx + lw, ly + logo.height))
from PIL import ImageChops
card.paste(ImageChops.lighter(region, logo), (lx, ly))

draw = ImageDraw.Draw(card)
tracked(draw, W / 2, ly + logo.height + 14, "10.24.26", antic(92), ORANGE, 4)
tracked(draw, W / 2, ly + logo.height + 128, "SATURDAY BEFORE HALLOWEEN  ·  EAST CROSSROADS, KC",
        antic(30), INK, 5)
tracked(draw, W / 2, H - 52, "fallcrawlkc.com", antic(24), MUTED, 3)

card.save(ROOT / "images/og.png", optimize=True)
print("images/og.png", card.size)
