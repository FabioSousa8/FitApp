#!/usr/bin/env python3
"""Renderiza os slides HTML do case Behance em PNG 2800x2100 (DPR 2) e monta o PDF.

Uso:  python3 generate.py && python3 render.py
"""
import pathlib
from playwright.sync_api import sync_playwright
from PIL import Image

HERE = pathlib.Path(__file__).parent
OUT = HERE / "png"
OUT.mkdir(exist_ok=True)
pages = sorted(HERE.glob("[0-9][0-9]-*.html"))
assert pages, "nenhum slide HTML encontrado; rode generate.py antes"

# remove PNGs sem slide correspondente; slides com PNG mais novo que HTML e CSS são mantidos
stems = {h.stem for h in pages}
for old in OUT.glob("*.png"):
    if old.stem not in stems:
        old.unlink()
css_mtime = (HERE / "shared.css").stat().st_mtime

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1400, "height": 1050}, device_scale_factor=2)
    page = ctx.new_page()
    for html in pages:
        png = OUT / f"{html.stem}.png"
        if png.exists() and png.stat().st_mtime >= max(html.stat().st_mtime, css_mtime):
            print("mantido", html.stem)
            continue
        page.goto(html.resolve().as_uri())
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(250)
        page.screenshot(path=str(OUT / f"{html.stem}.png"), full_page=False)
        print("ok", html.stem)
    browser.close()

pngs = sorted(OUT.glob("*.png"))
imgs = [Image.open(f).convert("RGB") for f in pngs]
imgs[0].save(HERE / "FortEvo-case-behance.pdf", save_all=True, append_images=imgs[1:], resolution=144.0)
print(f"{len(pngs)} PNGs e PDF gerados")
