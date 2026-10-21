#!/usr/bin/env python3
"""Generate the 9 Behance case-study slides from shared content + the
canonical mark path (pulled verbatim from branding/logos/iterations/icon-14.svg
so it's never hand-retyped and can't drift from the source of truth)."""
import re
import pathlib

HERE = pathlib.Path(__file__).parent
SRC_SVG = (HERE / ".." / "logos" / "iterations" / "icon-14.svg").read_text()
MARK_PATH = re.search(r'<path[^>]*\sd="([^"]+)"', SRC_SVG).group(1)
assert MARK_PATH.startswith("M 36.00,0.00") and MARK_PATH.endswith("124.00,232.00 Z"), "mark path extraction looks wrong"

SYMBOL_BLOCK = f'''<svg width="0" height="0" style="position:absolute">
  <symbol id="fe-mark" viewBox="-16.80 -16.80 273.60 273.60">
    <path fill="currentColor" fill-rule="nonzero" d="{MARK_PATH}"/>
  </symbol>
</svg>'''

def wrap(slide_id, title, extra_style, body, meta, page_no):
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<link rel="stylesheet" href="shared.css">
<style>
{extra_style}
</style>
</head>
<body>

{SYMBOL_BLOCK}

<div class="slide">
{body}

<div class="meta">{meta}</div>
<div class="page-no">{page_no} / 09</div>
<div class="grain"></div>
</div>

</body>
</html>
'''

slides = {}

# ---------------------------------------------------------------- 01 capa
slides["01-capa"] = wrap(
    "01-capa", "FortEvo — Capa",
    '''
  .slide {
    align-items: center; justify-content: center;
    background-image:
      linear-gradient(to right, rgba(245,243,238,0.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(245,243,238,0.045) 1px, transparent 1px);
    background-size: 44px 44px;
  }
  .stage { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 36px; }
  .mark { width: 180px; height: 180px; position: relative; filter: drop-shadow(0 18px 32px rgba(0,0,0,0.5)); }
  .wordmark { font-family: Arial, Helvetica, sans-serif; font-size: 108px; font-weight: 700; letter-spacing: -0.5px; line-height: 1; }
  .tagline { font-size: 22px; color: var(--muted); letter-spacing: 0.01em; margin-top: -8px; }
    ''',
    '''
<div class="stage">
  <svg class="mark" style="color: var(--paper)"><use href="#fe-mark"/></svg>
  <div class="wordmark">FortEvo</div>
  <div class="tagline">Fortis + Evo — força em evolução.</div>
</div>
    ''',
    "Identidade de marca", "01"
)

# ------------------------------------------------------------ 02 conceito
slides["02-conceito"] = wrap(
    "02-conceito", "FortEvo — Conceito",
    '''
  .slide { flex-direction: row; align-items: center; gap: 80px; overflow: hidden; }
  .ghost-mark { position: absolute; z-index: 0; right: -110px; top: 50%; transform: translateY(-50%); width: 560px; height: 560px; color: rgba(245,243,238,0.045); pointer-events: none; }
  .col-text { position: relative; z-index: 1; flex: 1.3; }
  .heading { font-size: 52px; font-weight: 700; letter-spacing: -1.2px; line-height: 1.15; margin-bottom: 28px; }
  .body-text { font-size: 19px; color: var(--muted); line-height: 1.6; max-width: 520px; }
  .body-text + .body-text { margin-top: 16px; }
  .col-name { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; gap: 32px; }
  .root .bar { width: 28px; height: 4px; border-radius: 2px; background: var(--accent); margin-bottom: 12px; }
  .root .word { font-size: 40px; font-weight: 700; letter-spacing: -0.5px; }
  .root .gloss { font-size: 15px; color: var(--muted); margin-top: 4px; }
    ''',
    '''
<svg class="ghost-mark"><use href="#fe-mark"/></svg>
<div class="col-text">
  <div class="heading">O raciocínio de um treinador, sistematizado.</div>
  <p class="body-text">Não é mais um app de treino — é critério aplicado de verdade, sem precisar pagar por um personal. Competente, direta, confiável. Sóbria, não clínica/fria.</p>
  <p class="body-text">Ferramenta profissional que vale pagar, porque ainda é mais barato que contratar alguém. Nem bargain/gratuito, nem luxo/exclusivo.</p>
</div>
<div class="col-name">
  <div class="root"><div class="bar"></div><div class="word">Fortis</div><div class="gloss">força, latim</div></div>
  <div class="root"><div class="bar"></div><div class="word">Evo</div><div class="gloss">evolução</div></div>
</div>
    ''',
    "Conceito", "02"
)

# --------------------------------------------------- 03 construção do logo
slides["03-construcao"] = wrap(
    "03-construcao", "FortEvo — Construção do logotipo",
    '''
  .slide { padding: 80px 96px 56px; }
  .heading { font-size: 40px; font-weight: 700; letter-spacing: -0.8px; margin-bottom: 8px; }
  .sub { font-size: 17px; color: var(--muted); max-width: 640px; margin-bottom: 44px; }
  .stage { flex: 1; display: flex; align-items: center; justify-content: center; position: relative; }
  .grid-bg {
    position: absolute; width: 440px; height: 440px;
    background-image:
      linear-gradient(to right, rgba(245,243,238,0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(245,243,238,0.08) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .mark { width: 320px; height: 320px; position: relative; z-index: 1; filter: drop-shadow(0 24px 44px rgba(0,0,0,0.55)); }
  .callout { position: absolute; z-index: 1; font-size: 14px; color: var(--accent-text); display: flex; align-items: center; gap: 8px; }
  .callout .line { height: 1px; background: var(--accent-text); opacity: 0.5; }
  .c1 { top: 120px; left: 230px; }
  .c1 .line { width: 90px; }
  .c2 { bottom: 150px; right: 230px; flex-direction: row-reverse; }
  .c2 .line { width: 90px; }
    ''',
    '''
<div class="heading">Monograma F+E</div>
<p class="sub">O F empresta sua barra superior pro E, que fica reduzido a dois traços flutuantes. Uma peça única sobre grade modular — não duas letras encostadas.</p>
<div class="stage">
  <div class="grid-bg"></div>
  <svg class="mark" style="color: var(--paper)"><use href="#fe-mark"/></svg>
  <div class="callout c1"><span class="line"></span>Barra do F vira o traço superior do E</div>
  <div class="callout c2">Módulo de traço constante em toda a peça<span class="line"></span></div>
</div>
    ''',
    "Logotipo", "03"
)

# ---------------------------------------------------- 04 sistema do logo
slides["04-sistema"] = wrap(
    "04-sistema", "FortEvo — Sistema do logotipo",
    '''
  .slide { padding: 72px 96px 56px; justify-content: center; }
  .heading { font-size: 40px; font-weight: 700; letter-spacing: -0.8px; margin-bottom: 32px; }
  .row { display: flex; gap: 24px; margin-bottom: 28px; }
  .stage-card {
    flex: 1; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
    padding: 28px; border: 1px solid var(--border);
    box-shadow: 0 20px 44px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25);
  }
  .stage-card.dark { background: linear-gradient(180deg, #27261E 0%, var(--surface) 100%); }
  .stage-card.light { background: linear-gradient(180deg, #FBFAF6 0%, var(--paper) 100%); box-shadow: 0 20px 44px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3); }
  .lockup { display: flex; align-items: center; gap: 10px; }
  .lockup svg { width: 44px; height: 44px; }
  .lockup span { font-family: Arial, Helvetica, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: -0.2px; }
  .mark-only { width: 72px; height: 72px; }
  .cap { font-size: 13px; color: var(--muted); }
  .size-row { display: flex; gap: 40px; align-items: flex-end; margin-bottom: 36px; }
  .size-cell { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .size-swatch { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
  .checks { display: flex; gap: 64px; }
  .checks .do-list, .checks .dont-list { font-size: 15px; }
  .checks li { font-size: 15px !important; }
    ''',
    '''
<div class="heading">Sistema do logotipo</div>
<div class="row">
  <div class="stage-card dark">
    <div class="lockup"><svg style="color:var(--paper)"><use href="#fe-mark"/></svg><span>FortEvo</span></div>
    <span class="cap">Lockup — tinta</span>
  </div>
  <div class="stage-card dark">
    <svg class="mark-only" style="color:var(--paper)"><use href="#fe-mark"/></svg>
    <span class="cap">Marca isolada — papel sobre tinta</span>
  </div>
  <div class="stage-card light">
    <svg class="mark-only" style="color:var(--ink)"><use href="#fe-mark"/></svg>
    <span class="cap" style="color:#6b6a63;">Marca isolada — tinta sobre papel</span>
  </div>
</div>
<div class="size-row">
  <div class="size-cell"><div class="size-swatch" style="width:72px;height:72px;"><svg style="width:56px;height:56px;color:var(--paper)"><use href="#fe-mark"/></svg></div><span class="cap">64px</span></div>
  <div class="size-cell"><div class="size-swatch" style="width:48px;height:48px;"><svg style="width:32px;height:32px;color:var(--paper)"><use href="#fe-mark"/></svg></div><span class="cap">32px</span></div>
  <div class="size-cell"><div class="size-swatch" style="width:32px;height:32px;"><svg style="width:16px;height:16px;color:var(--paper)"><use href="#fe-mark"/></svg></div><span class="cap">16px</span></div>
  <div class="cap" style="align-self:center;max-width:320px;">Lê "FE" com clareza até o menor tamanho real de favicon.</div>
</div>
<div class="checks">
  <ul class="do-list">
    <li>Sempre monocromática — tinta sobre papel, ou o inverso</li>
    <li>Espaço de respiro ao redor, sem encostar outros elementos</li>
  </ul>
  <ul class="dont-list">
    <li>Sem gradiente, sombra, contorno ou recolorir com o acento</li>
    <li>Sem halteres, chamas, raios ou o vermelho/laranja de "Sports Fitness"</li>
  </ul>
</div>
    ''',
    "Logotipo", "04"
)

# ------------------------------------------------------------- 05 paleta
slides["05-paleta"] = wrap(
    "05-paleta", "FortEvo — Paleta de cores",
    '''
  .slide { padding: 80px 96px 56px; }
  .heading { font-size: 40px; font-weight: 700; letter-spacing: -0.8px; margin-bottom: 8px; }
  .sub { font-size: 17px; color: var(--muted); max-width: 680px; margin-bottom: 44px; }
  .row { display: flex; gap: 20px; flex: 1; margin-bottom: 44px; }
  .swatch { flex: 1; position: relative; overflow: hidden; border-radius: 16px; display: flex; flex-direction: column; justify-content: flex-end; padding: 22px; border: 1px solid var(--border); box-shadow: 0 18px 36px rgba(0,0,0,0.3); }
  .swatch .name { font-size: 17px; font-weight: 700; }
  .swatch .hex { font-size: 14px; font-family: ui-monospace, "SF Mono", Menlo, monospace; opacity: 0.75; margin-top: 2px; }
  .swatch .use { font-size: 13px; margin-top: 10px; max-width: 220px; }
    ''',
    '''
<div class="heading">Tinta, papel e Azul Protocolo</div>
<p class="sub">Dois neutros fixos e um único acento de produto — previsível é coerência, não covardia, quando o produto é sobre dado e protocolo recalculado.</p>
<div class="row">
  <div class="swatch" style="background:#15140F;"><div class="name">Tinta</div><div class="hex">#15140F</div><div class="use" style="color:var(--muted);">Fundo de tela, texto sobre papel</div></div>
  <div class="swatch" style="background:#F5F3EE;color:#15140F;"><div class="name">Papel</div><div class="hex">#F5F3EE</div><div class="use" style="color:#6b6a63;">Texto sobre tinta, logo sobre fundo escuro</div></div>
  <div class="swatch" style="background:linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 65%), #3A64FF;"><div class="name">Base</div><div class="hex" style="opacity:0.95;">#3A64FF</div><div class="use" style="color:rgba(245,243,238,0.95);">CTA, progresso, destaque</div></div>
  <div class="swatch" style="background:#0031E7;"><div class="name">Pressed</div><div class="hex">#0031E7</div><div class="use" style="color:rgba(245,243,238,0.85);">Toque ativo, seleção forte</div></div>
  <div class="swatch" style="background:linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 65%), #5E80FF;"><div class="name">Accent-text</div><div class="hex" style="opacity:0.95;">#5E80FF</div><div class="use" style="color:rgba(245,243,238,0.95);">Único uso do acento como cor de texto</div></div>
</div>
    ''',
    "Cor", "05"
)

# --------------------------------------------------------- 06 tipografia
slides["06-tipografia"] = wrap(
    "06-tipografia", "FortEvo — Tipografia",
    '''
  .slide { padding: 80px 96px 56px; justify-content: center; overflow: hidden; }
  .ghost-glyph { position: absolute; z-index: 0; right: -40px; bottom: -170px; font-family: Arial, Helvetica, sans-serif; font-weight: 700; font-size: 580px; line-height: 1; color: rgba(245,243,238,0.045); pointer-events: none; user-select: none; }
  .content-col { position: relative; z-index: 1; }
  .heading { font-size: 40px; font-weight: 700; letter-spacing: -0.8px; margin-bottom: 8px; }
  .sub { font-size: 17px; color: var(--muted); max-width: 680px; margin-bottom: 36px; }
  .type-row { display: flex; align-items: baseline; gap: 24px; padding: 20px 0; border-bottom: 1px solid var(--border); }
  .type-row:last-child { border-bottom: none; }
  .type-row .sample { flex: 1; }
  .type-row .spec { font-size: 14px; color: var(--muted); font-family: ui-monospace, "SF Mono", Menlo, monospace; flex: none; }
    ''',
    '''
<div class="ghost-glyph">Aa</div>
<div class="content-col">
<div class="heading">Escala do produto</div>
<p class="sub">Fonte do sistema (San Francisco/Roboto) em todo o produto — só o wordmark do logotipo usa fonte fixa (Arial/Helvetica Bold).</p>
<div class="type-row"><div class="sample" style="font-size:28px;font-weight:700;">Seu protocolo</div><div class="spec">title · 24/700</div></div>
<div class="type-row"><div class="sample" style="font-size:22px;font-weight:700;">Começar treino</div><div class="spec">button · 19/700</div></div>
<div class="type-row"><div class="sample" style="font-family:Arial, Helvetica, sans-serif;font-size:19px;font-weight:700;letter-spacing:-0.1px;">FortEvo</div><div class="spec">brand wordmark · 17/700 (Arial/Helvetica)</div></div>
<div class="type-row"><div class="sample" style="font-size:17px;color:var(--muted);">fabio@email.com</div><div class="spec">subtitle · 15/400</div></div>
<div class="type-row"><div class="sample" style="font-size:15px;font-weight:600;">Split: Push / Pull / Legs</div><div class="spec">label · 13/600</div></div>
<div class="type-row"><div class="sample" style="font-size:14px;color:var(--muted);">Mínimo de 6 caracteres.</div><div class="spec">helper · 12/400</div></div>
</div>
    ''',
    "Tipografia", "06"
)

# ------------------------------------------------------------- 07 ícone
slides["07-icone"] = wrap(
    "07-icone", "FortEvo — Ícone de app",
    '''
  .slide { padding: 80px 96px 56px; }
  .heading { font-size: 40px; font-weight: 700; letter-spacing: -0.8px; margin-bottom: 44px; }
  .row { display: flex; gap: 60px; align-items: center; flex: 1; }
  .hero-icon { position: relative; width: 220px; height: 220px; border-radius: 48px; background: linear-gradient(180deg, #221F1A 0%, var(--ink) 100%); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; flex: none; box-shadow: 0 28px 52px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.35); }
  .hero-icon svg { position: relative; z-index: 1; width: 110px; height: 110px; }
  .homescreen { flex: 1; background: var(--surface); border-radius: 28px; border: 1px solid var(--border); padding: 36px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .tile { aspect-ratio: 1; border-radius: 20px; }
  .tile.placeholder { background: rgba(245,243,238,0.08); }
  .tile.hero { background: var(--ink); border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; }
  .tile.hero svg { width: 46%; height: 46%; }
    ''',
    '''
<div class="heading">Ícone de app</div>
<div class="row">
  <div class="hero-icon"><svg style="color:var(--paper)"><use href="#fe-mark"/></svg></div>
  <div class="homescreen">
    <div class="tile placeholder"></div><div class="tile placeholder"></div><div class="tile hero"><svg style="color:var(--paper)"><use href="#fe-mark"/></svg></div><div class="tile placeholder"></div>
    <div class="tile placeholder"></div><div class="tile placeholder"></div><div class="tile placeholder"></div><div class="tile placeholder"></div>
    <div class="tile placeholder"></div><div class="tile placeholder"></div><div class="tile placeholder"></div><div class="tile placeholder"></div>
  </div>
</div>
    ''',
    "Ícone", "07"
)

# -------------------------------------------------------- 08 telas do app
slides["08-telas"] = wrap(
    "08-telas", "FortEvo — Telas do app",
    '''
  .slide { padding: 72px 96px 56px; overflow: hidden; }
  .heading { position: relative; z-index: 1; font-size: 40px; font-weight: 700; letter-spacing: -0.8px; margin-bottom: 36px; }
  .floor { position: absolute; z-index: 0; left: 0; right: 0; bottom: 0; height: 340px; background: linear-gradient(180deg, rgba(58,100,255,0) 0%, rgba(58,100,255,0.10) 100%); pointer-events: none; }
  .phones { position: relative; z-index: 1; display: flex; gap: 40px; flex: 1; align-items: center; justify-content: center; }
  .phone { width: 280px; background: var(--ink); border: 1px solid var(--border); border-radius: 32px; padding: 20px; box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
  .p-brand-row { display: flex; align-items: center; gap: 7px; margin-bottom: 4px; }
  .p-brand-row svg { width: 18px; height: 18px; }
  .p-brand-row span { font-size: 15px; font-weight: 700; letter-spacing: -0.2px; }
  .p-subtitle { font-size: 13px; color: var(--muted); margin: 8px 0 0; }
  .p-title { font-size: 19px; font-weight: 700; margin: 0 0 10px; }
  .p-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 14px; margin-top: 12px; }
  .p-label { font-size: 13px; font-weight: 700; margin-bottom: 2px; }
  .p-helper { font-size: 13px; color: var(--muted); }
  .p-btn { border-radius: 10px; padding: 12px; text-align: center; font-size: 14px; font-weight: 700; margin-top: 10px; }
  .p-btn.primary { background: var(--accent); color: var(--paper); }
  .p-btn.secondary { background: var(--surface); border: 1px solid var(--border); color: var(--accent-text); }
  .p-chip-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .p-chip { font-size: 13px; font-weight: 600; padding: 7px 10px; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); color: var(--paper); }
  .p-chip.sel { background: var(--accent-pressed); border-color: var(--accent-pressed); color: var(--paper); }
  .p-ex { font-size: 13px; color: var(--paper); margin-top: 4px; }
    ''',
    '''
<div class="heading">No app de verdade</div>
<div class="floor"></div>
<div class="phones">
  <div class="phone">
    <div class="p-brand-row"><svg viewBox="-16.80 -16.80 273.60 273.60" style="color:var(--paper)"><use href="#fe-mark"/></svg><span>FortEvo</span></div>
    <div class="p-subtitle">fabio@email.com</div>
    <div class="p-card">
      <div class="p-label">Seu protocolo já foi gerado</div>
      <div class="p-helper">Split: Push / Pull / Legs</div>
      <div class="p-btn primary">Ver protocolo</div>
      <div class="p-btn secondary">Refazer cadastro</div>
    </div>
  </div>
  <div class="phone">
    <div class="p-title">Seu protocolo</div>
    <div class="p-card">
      <div class="p-label">PUSH</div>
      <div class="p-ex">Supino reto barra — 4x6-8</div>
      <div class="p-ex">Desenvolvimento halteres — 3x8-10</div>
      <div class="p-ex">Elevação lateral — 3x12-15</div>
    </div>
    <div class="p-btn secondary" style="margin-top:16px;">Refazer cadastro</div>
  </div>
  <div class="phone">
    <div class="p-title" style="font-size:17px;">Qual seu nível de treino?</div>
    <div class="p-chip-row">
      <div class="p-chip">Iniciante</div>
      <div class="p-chip sel">Intermediário</div>
      <div class="p-chip">Avançado</div>
    </div>
    <div class="p-btn primary" style="margin-top:18px;">Continuar</div>
  </div>
</div>
    ''',
    "Aplicação", "08"
)

# -------------------------------------------------------- 09 encerramento
slides["09-encerramento"] = wrap(
    "09-encerramento", "FortEvo — Encerramento",
    '''
  .slide {
    align-items: center; justify-content: center;
    background-image:
      linear-gradient(to right, rgba(245,243,238,0.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(245,243,238,0.045) 1px, transparent 1px);
    background-size: 44px 44px;
  }
  .stage { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 28px; }
  .mark { width: 120px; height: 120px; filter: drop-shadow(0 14px 24px rgba(0,0,0,0.5)); }
  .wordmark { font-family: Arial, Helvetica, sans-serif; font-size: 56px; font-weight: 700; letter-spacing: -0.3px; }
    ''',
    '''
<div class="stage">
  <svg class="mark" style="color: var(--paper)"><use href="#fe-mark"/></svg>
  <div class="wordmark">FortEvo</div>
</div>
    ''',
    "Obrigado", "09"
)

for name, html in slides.items():
    (HERE / f"{name}.html").write_text(html)

print(f"wrote {len(slides)} slides")
