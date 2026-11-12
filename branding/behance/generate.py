#!/usr/bin/env python3
"""Gera os slides do case Behance da FortEvo (14 telas, 1400x1050).

O caminho do símbolo é extraído literalmente de branding/logos/iterations/icon-14.svg
(nunca redigitado à mão), então não pode divergir da fonte de verdade.

Os números e fatos citados nos slides vêm do registro do projeto:
  - branding/01-pesquisa-e-naming.md  (busca de nome, concorrência, tom de voz)
  - branding/02-identidade-visual.md  (iterações do logo, cor, contrastes)
  - data/*.json e engine/             (209 exercícios, saída real do motor)
Rodar:  python3 generate.py && python3 render.py
"""
import re
import pathlib

HERE = pathlib.Path(__file__).parent
SRC_SVG = (HERE / ".." / "logos" / "iterations" / "icon-14.svg").read_text()
MARK_PATH = re.search(r'<path[^>]*\sd="([^"]+)"', SRC_SVG).group(1)
assert MARK_PATH.startswith("M 36.00,0.00") and MARK_PATH.endswith("124.00,232.00 Z"), "extração do caminho do símbolo falhou"

TOTAL = 14

SYMBOL_BLOCK = f'''<svg width="0" height="0" style="position:absolute">
  <symbol id="fe-mark" viewBox="-16.80 -16.80 273.60 273.60">
    <path fill="currentColor" fill-rule="nonzero" d="{MARK_PATH}"/>
  </symbol>
</svg>'''

ARROW = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M3 12h16M13 6l6 6-6 6" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'


def wrap(title, extra_style, body, meta, n):
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
<div class="page-no">{n:02d} / {TOTAL:02d}</div>
<div class="grain"></div>
</div>

</body>
</html>
'''


slides = {}

# ------------------------------------------------------------------ 01 capa
slides["01-capa"] = wrap(
    "FortEvo: capa",
    '''
  .slide { align-items: center; justify-content: center; }
  .bg-grid {
    position: absolute; inset: 0;
    -webkit-mask-image: radial-gradient(ellipse 60% 55% at 50% 50%, #000 15%, transparent 78%);
            mask-image: radial-gradient(ellipse 60% 55% at 50% 50%, #000 15%, transparent 78%);
  }
  .stage { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; }
  .mark { width: 210px; height: 210px; filter: drop-shadow(0 22px 40px rgba(0,0,0,0.55)); }
  .wordmark { font-family: var(--wordmark); font-size: 120px; font-weight: 700; letter-spacing: -1px; line-height: 1; margin-top: 30px; }
  .bar { width: 40px; height: 4px; border-radius: 2px; background: var(--accent); margin: 34px 0 22px; }
  .tagline { font-size: 26px; color: var(--muted); letter-spacing: -0.005em; }
    ''',
    '''
<div class="bg-grid grid-motif"></div>
<div class="stage">
  <svg class="mark" style="color: var(--paper)"><use href="#fe-mark"/></svg>
  <div class="wordmark">FortEvo</div>
  <div class="bar"></div>
  <div class="tagline">Força em evolução.</div>
</div>
    ''',
    "Case de marca e produto", 1
)

# -------------------------------------------------------------------- 02 app
slides["02-app"] = wrap(
    "FortEvo: o app",
    '''
  .flow { display: flex; align-items: stretch; margin-top: 46px; }
  .step { flex: 1; padding: 28px 28px 30px; }
  .step h3 { font-family: var(--display); font-weight: 700; font-size: 26px; letter-spacing: -0.02em; }
  .step .sub { font-size: 15px; color: var(--accent-text); margin: 4px 0 18px; }
  .step ul { list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 16px; line-height: 1.42; }
  .step li { padding-left: 18px; position: relative; }
  .step li::before { content: ""; position: absolute; left: 0; top: 0.58em; width: 7px; height: 7px; border-radius: 2px; background: var(--accent); }
  .link { width: 52px; display: flex; align-items: center; justify-content: center; color: var(--accent-text); flex: none; }
  .sample { margin-top: 30px; border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: 12px; padding: 20px 26px; font-size: 17px; line-height: 1.6; color: var(--muted); }
  .sample b { color: var(--paper); font-weight: 600; }
  .fine { margin-top: 22px; max-width: 1100px; }
    ''',
    '''
<div class="h1">Um treinador de verdade para quem não pode pagar um.</div>
<p class="lede">O FortEvo é um app de treino para quem já tem experiência de academia e não tem personal. Em vez de só anotar o que a pessoa decide, ele decide junto: lê histórico, equipamento e limitações e monta o protocolo.</p>

<div class="flow">
  <div class="step panel">
    <h3>Cadastro</h3>
    <div class="sub">7 passos</div>
    <ul>
      <li>Nível e anos de treino</li>
      <li>Objetivo, principal e secundário</li>
      <li>Limitações físicas</li>
      <li>Atividades físicas</li>
      <li>Consistência de treino</li>
      <li>Equipamento disponível</li>
      <li>Rotina atual</li>
    </ul>
  </div>
  <div class="link">__ARROW__</div>
  <div class="step panel">
    <h3>Motor de regras</h3>
    <div class="sub">Roda dentro do app</div>
    <ul>
      <li>Cruza o nível declarado com os anos de treino</li>
      <li>Escolhe a divisão da semana, de full body a bro split</li>
      <li>Calcula o volume por grupo muscular</li>
      <li>Seleciona, entre 209 exercícios, os que cabem no equipamento e nas limitações</li>
      <li>Define o cardio</li>
    </ul>
  </div>
  <div class="link">__ARROW__</div>
  <div class="step panel">
    <h3>Protocolo</h3>
    <div class="sub">Sessões, blocos e deload</div>
    <ul>
      <li>Sessões em rotação, sem dia da semana fixo</li>
      <li>Blocos medidos em treinos concluídos, não em dias de calendário</li>
      <li>Exercícios fixos dentro do bloco; a troca só acontece entre blocos</li>
      <li>Uma semana de deload entre blocos</li>
    </ul>
  </div>
</div>

<div class="sample"><b>Saída real do motor</b> para uma persona de teste (intermediário, 4 dias por semana, 60 min): divisão Upper / Lower, bloco de 35 treinos, deload de 7 dias, cardio MISS de 3 a 4 vezes por semana.</div>
<p class="fine">Mobile, iOS e Android, modelo pago, em pré-beta fechado. Fora de escopo por decisão: dieta e suplementação, que exigem profissional e dados sensíveis.</p>
    '''.replace("__ARROW__", ARROW),
    "O app", 2
)

# --------------------------------------------------------------- 03 mercado
slides["03-mercado"] = wrap(
    "FortEvo: o espaço em aberto",
    '''
  .tbl { margin-top: 44px; border-top: 1px solid var(--border); }
  .row { display: grid; grid-template-columns: 270px 1fr 1fr; gap: 36px; padding: 25px 0; border-bottom: 1px solid var(--border); align-items: baseline; }
  .row.head { padding: 16px 0; font-size: 14px; color: var(--muted); }
  .row .app { font-family: var(--display); font-weight: 700; font-size: 27px; letter-spacing: -0.015em; }
  .row .what { font-size: 19px; line-height: 1.45; }
  .row .gap { font-size: 18px; line-height: 1.45; color: var(--muted); }
  .row.us { background: linear-gradient(90deg, rgba(58,100,255,0.20), rgba(58,100,255,0.05)); border: 1px solid rgba(94,128,255,0.5); border-radius: 14px; padding: 30px 28px; margin: 12px -28px 0; }
  .row.us .gap { color: var(--paper); }
  .fine { margin-top: 28px; max-width: 980px; font-size: 15px; }
    ''',
    '''
<div class="h1 sm">Os apps registram ou entregam conteúdo. Falta quem raciocine o seu treino.</div>

<div class="tbl">
  <div class="row head"><span>App</span><span>O que faz</span><span>Onde para</span></div>
  <div class="row"><span class="app">Hevy</span><span class="what">Registra treino e rotina, com rede social e relógio.</span><span class="gap">Você decide tudo, ele anota.</span></div>
  <div class="row"><span class="app">Strong</span><span class="what">Registro rápido, sem fricção. Concorre com o caderno.</span><span class="gap">Você decide tudo, ele anota.</span></div>
  <div class="row"><span class="app">Nike Training Club</span><span class="what">Treinos guiados em vídeo, por atletas e treinadores.</span><span class="gap">Conteúdo pronto, não individualizado.</span></div>
  <div class="row"><span class="app">Fitbod</span><span class="what">Plano que se ajusta ao que você registra, focado em força.</span><span class="gap">O mais próximo. Não se posiciona como leitura de histórico, limitações e consistência.</span></div>
  <div class="row us"><span class="app">FortEvo</span><span class="what">Lê histórico, limitações, equipamento e consistência e monta divisão, periodização e progressão.</span><span class="gap">A lógica de um treinador, seguida de verdade.</span></div>
</div>
<p class="fine">A marca nasce desse vazio: critério de treinador, não motivação. Fontes: páginas oficiais de Hevy, Strong e Fitbod; Nike Training Club por fontes secundárias (out/2026).</p>
    ''',
    "Mercado", 3
)

# ------------------------------------------------------------- 04 direção
slides["04-direcao"] = wrap(
    "FortEvo: direção de marca",
    '''
  .cols { display: grid; grid-template-columns: 500px 1fr; gap: 72px; margin-top: 64px; }
  .lede { margin-top: 0; font-size: 21px; }
  .lists { display: flex; flex-direction: column; gap: 46px; margin-top: 46px; }
  .lists h4 { font-family: var(--display); font-size: 20px; margin-bottom: 18px; }
  .lists .do-list li, .lists .dont-list li { font-size: 18px; }
  .voice-col { display: flex; flex-direction: column; gap: 22px; }
  .voice { padding: 30px 32px; border-radius: 16px; border: 1px dashed var(--border); color: var(--muted); }
  .voice .tag { font-size: 14px; margin-bottom: 10px; }
  .voice p { font-size: 23px; line-height: 1.42; }
  .voice.on { border: 1px solid var(--accent); background: rgba(0,32,150,0.38); color: var(--paper); padding: 38px 32px; }
  .voice.on .tag { color: var(--accent-text); font-weight: 600; }
  .voice.on p { font-size: 31px; letter-spacing: -0.015em; line-height: 1.3; }
  .more { margin-top: 12px; font-size: 17px; line-height: 1.7; color: var(--muted); }
  .more b { color: var(--paper); font-weight: 600; }
    ''',
    '''
<div class="h1">Rigor, não hype.</div>
<div class="cols">
  <div>
    <p class="lede">Sóbria, confiável, adulta. O app é pago e faz o trabalho de decidir o treino, então a marca precisa parecer ferramenta de treinador, não motivação de internet.</p>
    <div class="lists">
      <div>
        <h4>A marca evita</h4>
        <ul class="dont-list">
          <li>Halteres, chamas, raios, escudos e silhuetas musculosas</li>
          <li>O vermelho e o laranja de "Sports Fitness"</li>
          <li>O tom imperativo de internet</li>
        </ul>
      </div>
      <div>
        <h4>A marca usa</h4>
        <ul class="do-list">
          <li>Tinta e papel, com um único acento</li>
          <li>Letra, geometria e peso no lugar de ícone</li>
          <li>Linguagem de protocolo</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="voice-col">
    <div class="voice"><div class="tag">Formal demais</div><p>Seu protocolo foi recalculado. O nível foi reclassificado para avançado com base no histórico informado.</p></div>
    <div class="voice on"><div class="tag">O registro da marca</div><p>Recalculamos seu protocolo. Pelo seu histórico, você já é avançado.</p></div>
    <div class="voice"><div class="tag">Informal demais</div><p>Mano, você tá voando! Partiu subir de nível!</p></div>
    <p class="more"><b>Mais do mesmo registro:</b> "Bateu PR? Hora de ajustar a carga." e "Chegou na falha antes do esperado. Vamos revisar o volume."</p>
  </div>
</div>
    ''',
    "Direção de marca", 4
)

# ---------------------------------------------------------- 05 nome: busca
slides["05-nome-busca"] = wrap(
    "FortEvo: a busca do nome",
    '''
  .cols { display: grid; grid-template-columns: 450px 1fr; gap: 76px; margin-top: 60px; align-items: start; }
  .lastro { padding: 40px 38px 42px; }
  .lastro .nm { font-family: var(--display); font-weight: 700; font-size: 60px; letter-spacing: -0.03em; }
  .lastro .sc { font-size: 16px; color: var(--accent-text); margin: 6px 0 24px; }
  .lastro p { font-size: 19px; line-height: 1.55; color: var(--muted); }
  .lastro p + p { margin-top: 16px; }
  .lastro .lesson { margin-top: 30px; padding-top: 28px; border-top: 1px solid var(--border); font-size: 21px; line-height: 1.4; color: var(--paper); font-weight: 600; }
  .finds-lede { font-size: 18px; line-height: 1.55; color: var(--muted); margin-bottom: 22px; max-width: 660px; }
  .find { display: grid; grid-template-columns: 200px 96px 1fr; gap: 20px; align-items: center; padding: 25px 0; border-bottom: 1px solid var(--border); }
  .find:first-of-type { border-top: 1px solid var(--border); }
  .find .w { font-family: var(--display); font-weight: 700; font-size: 28px; letter-spacing: -0.015em; }
  .find .n { font-family: var(--display); font-weight: 700; font-size: 56px; line-height: 1; color: var(--accent-text); text-align: right; letter-spacing: -0.03em; }
  .find .d { font-size: 17px; line-height: 1.4; color: var(--muted); }
    ''',
    '''
<div class="h1 sm">Cinco rodadas de nomes. As palavras óbvias já tinham dono.</div>
<div class="cols">
  <div class="lastro panel">
    <div class="nm">Lastro</div>
    <div class="sc">69 de 90 na régua</div>
    <p>O primeiro nome fechado: sóbrio, com o menor risco de conflito entre os cinco candidatos.</p>
    <p>Depois de alguns dias, a objeção: soava pesado e estático, e não comunicava evolução.</p>
    <div class="lesson">Os candidatos tinham sido escolhidos por sobriedade e critério, não por trajetória.</div>
  </div>
  <div>
    <p class="finds-lede">Cada nome passou por busca real de conflito antes de ser defendido. Toda palavra de treino curta e óbvia, em qualquer idioma, já era app ou marca de fitness.</p>
    <div class="find"><span class="w">Forge</span><span class="n">10</span><span class="d">apps de treino já publicados com esse nome, e marcas registradas nos EUA</span></div>
    <div class="find"><span class="w">Apex</span><span class="n">6</span><span class="d">marcas de fitness registradas nos EUA, mais um app de treino</span></div>
    <div class="find"><span class="w">Rack</span><span class="n">4+</span><span class="d">apps de treino com o nome</span></div>
    <div class="find"><span class="w">One More Rep</span><span class="n">2+</span><span class="d">apps com o mesmo nome, mais variantes</span></div>
    <div class="find"><span class="w">Deload</span><span class="n">1</span><span class="d">app com o mesmo nome</span></div>
  </div>
</div>
    ''',
    "Naming", 5
)

# ------------------------------------------------------- 06 nome: FortEvo
slides["06-nome-fortevo"] = wrap(
    "FortEvo: o nome",
    '''
  .name { display: flex; justify-content: center; gap: 30px; margin-top: 74px; }
  .part { display: flex; flex-direction: column; align-items: stretch; position: relative; }
  .part .w { font-family: var(--wordmark); font-weight: 700; font-size: 212px; line-height: 1; letter-spacing: -7px; }
  .part .br { height: 16px; border: 2px solid var(--accent-text); border-top: none; border-radius: 0 0 8px 8px; margin: 10px 10px 0; }
  .part .gl { font-size: 18px; color: var(--muted); text-align: center; margin-top: 14px; }
  .part.evo::before { content: ""; position: absolute; left: -16px; top: -10px; bottom: -6px; width: 2px; background: var(--accent); }
  .cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px; margin-top: 100px; }
  .col { border-top: 1px solid var(--border); padding-top: 24px; }
  .col h4 { font-family: var(--display); font-weight: 700; font-size: 22px; line-height: 1.25; margin-bottom: 12px; letter-spacing: -0.01em; }
  .col p { font-size: 17px; line-height: 1.55; color: var(--muted); }
    ''',
    '''
<div class="h1 sm">Fort + Evo: força em evolução.</div>
<div class="name">
  <div class="part"><div class="w">Fort</div><div class="br"></div><div class="gl">Fortis, latim: forte</div></div>
  <div class="part evo"><div class="w">Evo</div><div class="br"></div><div class="gl">evolução</div></div>
</div>
<div class="cols">
  <div class="col"><h4>Inventado de propósito</h4><p>Uma palavra que não existe não disputa busca com nenhuma palavra de dicionário, o problema das rodadas anteriores.</p></div>
  <div class="col"><h4>A maiúscula no meio</h4><p>Pedida de propósito. O E maiúsculo marca onde força vira evolução e coincide com as duas letras do símbolo.</p></div>
  <div class="col"><h4>Som de treino, não de wellness</h4><p>Auxora e Numora estavam limpos de conflito, mas o final em "-ora" soava a bem-estar. Fort + Evo tem consoantes duras e dá a direção.</p></div>
  <div class="col"><h4>Risco assumido</h4><p>O prefixo Fort- é populoso no fitness (Fortis Fitness, Fort Fitness, Fortë). Nenhuma colisão com a grafia exata apareceu. Falta a busca formal no INPI.</p></div>
</div>
    ''',
    "Naming", 6
)

# ---------------------------------------------------------- 07 exploração
slides["07-exploracao"] = wrap(
    "FortEvo: 14 iterações",
    '''
  .groups { display: grid; grid-template-columns: repeat(6, 1fr); gap: 18px; margin-top: 52px; }
  .grp { border-top: 2px solid var(--border); padding-top: 10px; font-size: 14px; color: var(--muted); }
  .grp.a { grid-column: 1 / span 2; }
  .grp.b { grid-column: 3 / span 3; }
  .grp.c { grid-column: 6 / span 1; border-top-color: var(--accent); color: var(--accent-text); font-weight: 600; }
  .tiles { display: grid; grid-template-columns: repeat(6, 1fr); gap: 18px; margin-top: 18px; }
  .art { aspect-ratio: 1; background: var(--paper); border-radius: 16px; display: flex; align-items: center; justify-content: center; padding: 22px; box-shadow: 0 18px 36px rgba(0,0,0,0.35); }
  .art img { max-width: 100%; max-height: 100%; }
  .tile.final .art { outline: 3px solid var(--accent); outline-offset: 4px; }
  .tile .nm { font-family: var(--display); font-weight: 700; font-size: 17px; margin-top: 18px; letter-spacing: -0.01em; }
  .tile .ls { font-size: 15px; line-height: 1.5; color: var(--muted); margin-top: 8px; }
  .turn { margin-top: 56px; border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: 12px; padding: 26px 32px; font-size: 20px; line-height: 1.55; color: var(--muted); max-width: 1100px; }
  .turn b { color: var(--paper); font-weight: 600; }
  .tile .it { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: 4px; }
    ''',
    '''
<div class="h1">14 iterações até o símbolo certo.</div>
<p class="lede">Sem ícone literal de academia, a busca de forma foi só letra, geometria e peso. Cada rodada resolveu um problema e abriu outro.</p>

<div class="groups">
  <div class="grp a">Primeiras rodadas</div>
  <div class="grp b">Linha inclinada, encerrada na 13</div>
  <div class="grp c">Linha modular</div>
</div>
<div class="tiles">
  <div class="tile"><div class="art"><img src="../logos/concepts/concept-1.svg"></div><div class="nm">Emenda</div><div class="it">conceito 1</div><div class="ls">Silhueta forte e legível a 16px, mas sem letras.</div></div>
  <div class="tile"><div class="art"><img src="../logos/iterations/icon-4.svg"></div><div class="nm">Selo com E</div><div class="it">iteração 4</div><div class="ls">A letra lê limpo até 16px, mas os cantos arredondados liam como SaaS, não como atlético.</div></div>
  <div class="tile"><div class="art"><img src="../logos/iterations/icon-8.svg"></div><div class="nm">F·E inclinado</div><div class="it">iteração 8</div><div class="ls">Ângulo e peso resolveram o "não parece fit". A fusão ainda era acidental.</div></div>
  <div class="tile"><div class="art"><img src="../logos/iterations/icon-12.svg"></div><div class="nm">Fusão e cantos</div><div class="it">iteração 12</div><div class="ls">Letras fundidas numa só silhueta, cantos arredondados vértice a vértice.</div></div>
  <div class="tile"><div class="art"><img src="../logos/iterations/icon-13.svg"></div><div class="nm">Escada no E</div><div class="it">iteração 13</div><div class="ls">Hastes crescentes sugerem progressão, sem forma nova.</div></div>
  <div class="tile final"><div class="art"><img src="../logos/iterations/icon-14.svg"></div><div class="nm">Monograma achatado</div><div class="it">iteração 14</div><div class="ls">Ortogonal, traço constante, F e E numa peça. Direção final.</div></div>
</div>
<div class="turn"><b>A virada.</b> Uma referência externa de monograma FE achatado, com a barra superior do F servindo também ao E, abriu uma rota alternativa à linha inclinada. A inclinada parou na 13 e a 14 virou a direção definitiva.</div>
    ''',
    "Logotipo", 7
)

# --------------------------------------------------------- 08 construção
CONSTRUCTION_SVG = '''<svg viewBox="-96 -52 452 346" width="780" height="597" xmlns="http://www.w3.org/2000/svg" style="font-family: Inter, sans-serif">
  <!-- destaque da barra compartilhada: braço superior do E = barra do F -->
  <rect x="44" y="0" width="196" height="44" fill="#3A64FF" opacity="0.30"/>
  <!-- guias da grade -->
  <g stroke="#5E80FF" stroke-width="0.5" stroke-dasharray="3 3" opacity="0.42" fill="none">
    <path d="M-20 0H266 M-20 44H266 M-20 98H266 M-20 142H266 M-20 196H266 M-20 240H266"/>
    <path d="M0 -16V262 M44 -16V262 M96 -16V262 M124 -16V262 M240 -16V262"/>
  </g>
  <path d="__PATH__" fill="#F5F3EE" fill-rule="nonzero"/>
  <!-- cadeia de cotas vertical -->
  <g stroke="#5E80FF" stroke-width="0.9" fill="none">
    <path d="M-34 0V240"/>
    <path d="M-39 0H-29 M-39 44H-29 M-39 98H-29 M-39 142H-29 M-39 196H-29 M-39 240H-29"/>
  </g>
  <g fill="#F5F3EE" font-size="11" font-weight="600" text-anchor="end">
    <text x="-46" y="26">44</text>
    <text x="-46" y="75">54</text>
    <text x="-46" y="124">44</text>
    <text x="-46" y="173">54</text>
    <text x="-46" y="222">44</text>
  </g>
  <!-- cota horizontal total -->
  <g stroke="#5E80FF" stroke-width="0.9" fill="none">
    <path d="M0 -30H240 M0 -35V-25 M240 -35V-25"/>
  </g>
  <text x="120" y="-38" fill="#F5F3EE" font-size="11" font-weight="600" text-anchor="middle">240</text>
  <!-- vão entre as letras -->
  <g stroke="#5E80FF" stroke-width="0.9" fill="none">
    <path d="M96 120H124 M96 114V126 M124 114V126"/>
    <path d="M110 126V158"/>
  </g>
  <text x="110" y="172" fill="#F5F3EE" font-size="11" font-weight="600" text-anchor="middle">28</text>
  <!-- raio do canto -->
  <circle cx="232" cy="8" r="8" fill="none" stroke="#5E80FF" stroke-width="0.9"/>
  <path d="M237 3L262 -14" stroke="#5E80FF" stroke-width="0.9" fill="none"/>
  <text x="266" y="-10" fill="#F5F3EE" font-size="11" font-weight="600">r 8</text>
  <!-- legenda da barra compartilhada -->
  <text x="252" y="28" fill="#5E80FF" font-size="9.5">barra do F</text>
  <text x="252" y="40" fill="#5E80FF" font-size="9.5">= braço do E</text>
</svg>'''.replace("__PATH__", MARK_PATH)

slides["08-construcao"] = wrap(
    "FortEvo: construção do símbolo",
    '''
  .cols { display: grid; grid-template-columns: 780px 1fr; gap: 44px; margin-top: 36px; align-items: center; }
  .rows { display: flex; flex-direction: column; }
  .r { display: grid; grid-template-columns: 70px 1fr; gap: 16px; align-items: baseline; padding: 28px 0; border-bottom: 1px solid var(--border); }
  .r:first-child { border-top: 1px solid var(--border); }
  .r .n { font-family: var(--display); font-weight: 700; font-size: 44px; line-height: 1; color: var(--accent-text); letter-spacing: -0.03em; text-align: right; }
  .r .t { font-size: 18px; line-height: 1.5; color: var(--muted); }
  .r .t b { color: var(--paper); font-weight: 600; }
    ''',
    '''
<div class="h1 sm">Uma peça só, sobre uma grade de 240.</div>
<p class="lede" style="margin-top:16px;">O F empresta a barra superior ao E, que fica com dois traços próprios. É uma silhueta única, não duas letras encostadas.</p>
<div class="cols">
  <div>__SVG__</div>
  <div class="rows">
    <div class="r"><span class="n">44</span><span class="t"><b>Traço constante.</b> Uma só medida dá o ritmo de todas as barras.</span></div>
    <div class="r"><span class="n">54</span><span class="t"><b>Respiro constante.</b> O espaço entre as barras é sempre o mesmo.</span></div>
    <div class="r"><span class="n">28</span><span class="t"><b>Vão entre as letras.</b> Separa o F do E sem soltá-los. Mede menos que um traço.</span></div>
    <div class="r"><span class="n">8</span><span class="t"><b>Raio dos cantos.</b> Tira a aresta de esquadro sem virar pílula.</span></div>
  </div>
</div>
    '''.replace("__SVG__", CONSTRUCTION_SVG),
    "Logotipo", 8
)

# ------------------------------------------------------------ 09 por quê
slides["09-porque"] = wrap(
    "FortEvo: por que o símbolo é assim",
    '''
  .tbl { margin-top: 40px; border-top: 1px solid var(--border); }
  .row { display: grid; grid-template-columns: 300px 1fr 1fr; gap: 44px; padding: 28px 0; border-bottom: 1px solid var(--border); align-items: start; }
  .row.head { padding: 16px 0; font-size: 14px; color: var(--muted); }
  .row .d { font-family: var(--display); font-weight: 700; font-size: 29px; line-height: 1.15; letter-spacing: -0.02em; }
  .row .p { font-size: 19px; line-height: 1.52; }
  .row .c { font-size: 18px; line-height: 1.52; color: var(--muted); }
  .close { margin-top: 36px; font-family: var(--display); font-weight: 700; font-size: 30px; line-height: 1.25; letter-spacing: -0.02em; max-width: 1000px; }
    ''',
    '''
<div class="h1">Por que o símbolo é assim.</div>
<div class="tbl">
  <div class="row head"><span>Decisão</span><span>Porque</span><span>O que custa</span></div>
  <div class="row"><span class="d">Letras, não ícone.</span><span class="p">O nome já carrega o conceito. Haltere, chama e raio são o clichê da categoria e brigam com a legibilidade do monograma.</span><span class="c">À primeira vista a marca não grita academia. Um haltere dentro do monograma foi proposto e descartado antes de desenhar.</span></div>
  <div class="row"><span class="d">Uma peça só.</span><span class="p">A barra superior do F se estende e vira o braço de cima do E. As duas letras formam uma faixa contínua cortada por um vão.</span><span class="c">O E perde a haste e a barra de cima. Foram 3 tentativas de proporção até ele parar de ler como dois tracinhos soltos.</span></div>
  <div class="row"><span class="d">Reta, não inclinada.</span><span class="p">A referência era estática e modular. Sem ângulo, tudo se mede numa grade só: traço constante, respiro constante, leitura limpa em 16px.</span><span class="c">Sem inclinação o símbolo não sugere movimento. A ideia de evolução fica com o nome e com o produto.</span></div>
  <div class="row"><span class="d">Sem cor.</span><span class="p">O símbolo é a parte fixa da marca. A cor de produto vive na interface, não no logotipo.</span><span class="c">O azul identifica o produto, não o logotipo.</span></div>
</div>
<p class="close">Cada decisão troca energia por precisão. É o mesmo princípio do nome e do tom de voz.</p>
    ''',
    "Logotipo", 9
)

# ------------------------------------------------------------- 10 sistema
slides["10-sistema"] = wrap(
    "FortEvo: sistema do logotipo",
    '''
  .row { display: flex; gap: 22px; margin-top: 44px; }
  .card { flex: 1; min-height: 350px; border-radius: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; padding: 44px 28px; border: 1px solid var(--border); box-shadow: 0 20px 44px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25); }
  .card.dark { background: linear-gradient(180deg, #27261E 0%, var(--surface) 100%); }
  .card.light { background: linear-gradient(180deg, #FBFAF6 0%, var(--paper) 100%); }
  .lockup { display: flex; align-items: center; gap: 12px; }
  .lockup svg { width: 74px; height: 74px; }
  .lockup span { font-family: var(--wordmark); font-size: 52px; font-weight: 700; letter-spacing: -0.5px; }
  .mark-only { width: 130px; height: 130px; }
  .cap { font-size: 13px; color: var(--muted); }
  .sizes { display: flex; gap: 52px; align-items: flex-end; margin-top: 76px; }
  .size-cell { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .swatch { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
  .checks { display: flex; gap: 80px; margin-top: 90px; }
    ''',
    '''
<div class="h1 sm">Como o símbolo se comporta.</div>
<div class="row">
  <div class="card dark"><div class="lockup"><svg style="color:var(--paper)"><use href="#fe-mark"/></svg><span>FortEvo</span></div><span class="cap">Lockup, papel sobre tinta</span></div>
  <div class="card dark"><svg class="mark-only" style="color:var(--paper)"><use href="#fe-mark"/></svg><span class="cap">Símbolo, papel sobre tinta</span></div>
  <div class="card light"><svg class="mark-only" style="color:var(--ink)"><use href="#fe-mark"/></svg><span class="cap" style="color:#6b6a63;">Símbolo, tinta sobre papel</span></div>
</div>
<div class="sizes">
  <div class="size-cell"><div class="swatch" style="width:80px;height:80px;"><svg style="width:60px;height:60px;color:var(--paper)"><use href="#fe-mark"/></svg></div><span class="cap">64 px</span></div>
  <div class="size-cell"><div class="swatch" style="width:52px;height:52px;"><svg style="width:34px;height:34px;color:var(--paper)"><use href="#fe-mark"/></svg></div><span class="cap">32 px</span></div>
  <div class="size-cell"><div class="swatch" style="width:34px;height:34px;"><svg style="width:18px;height:18px;color:var(--paper)"><use href="#fe-mark"/></svg></div><span class="cap">16 px</span></div>
  <p class="fine" style="align-self:center;max-width:380px;">Lê "FE" com clareza até o menor tamanho real de favicon.</p>
</div>
<div class="checks">
  <ul class="do-list">
    <li>Sempre monocromático: tinta sobre papel, ou o inverso</li>
    <li>Espaço de respiro ao redor, sem encostar outros elementos</li>
  </ul>
  <ul class="dont-list">
    <li>Sem gradiente, sombra, contorno ou recolorir com o azul</li>
    <li>Sem halteres, chamas, raios ou o vermelho e laranja de academia</li>
  </ul>
</div>
    ''',
    "Logotipo", 10
)

# ---------------------------------------------------------------- 11 cor
slides["11-cor"] = wrap(
    "FortEvo: cor",
    '''
  .cols { display: grid; grid-template-columns: 560px 1fr; gap: 72px; margin-top: 38px; align-items: start; }
  .cands { display: flex; gap: 12px; height: 460px; align-items: stretch; }
  .cand { flex: 1; border-radius: 14px; padding: 16px 14px; display: flex; flex-direction: column; justify-content: flex-end; opacity: 0.55; border: 1px solid var(--border); }
  .cand .n { font-size: 14px; font-weight: 600; line-height: 1.2; }
  .cand .h { font-family: var(--mono); font-size: 11px; margin-top: 3px; opacity: 0.85; }
  .cand.pick { flex: 1.7; opacity: 1; outline: 3px solid var(--paper); outline-offset: 3px; box-shadow: 0 18px 40px rgba(58,100,255,0.35); }
  .cand.pick .n { font-size: 20px; }
  .cands-cap { margin-top: 28px; font-size: 17px; line-height: 1.6; color: var(--muted); }
  .cands-cap b { color: var(--paper); font-weight: 600; }
  h3.sec { font-family: var(--display); font-weight: 700; font-size: 22px; letter-spacing: -0.015em; margin-bottom: 8px; }
  .sec-sub { font-size: 16px; color: var(--muted); line-height: 1.5; margin-bottom: 34px; max-width: 560px; }
  .bars { position: relative; display: flex; flex-direction: column; gap: 38px; margin-top: 8px; }
  .bar-row .lab { display: flex; justify-content: space-between; font-size: 16px; margin-bottom: 12px; gap: 20px; }
  .bar-row .lab span:last-child { font-family: var(--mono); font-size: 14px; flex: none; }
  .track { position: relative; height: 12px; border-radius: 6px; background: rgba(245,243,238,0.08); }
  .fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 6px; }
  .track::after { content: ""; position: absolute; top: -7px; bottom: -7px; left: 56.25%; border-left: 2px dashed rgba(245,243,238,0.75); }
  .verdict { font-size: 14px; color: var(--muted); margin-top: 10px; }
  .verdict.ok { color: var(--accent-text); }
  .verdict.no { color: var(--danger); }
    ''',
    '''
<div class="h1 sm">Azul Protocolo: o acento mais previsível, de propósito.</div>
<div class="cols">
  <div>
    <div class="cands">
      <div class="cand pick" style="background:#3A64FF;color:#F5F3EE;"><span class="n">Azul Protocolo</span><span class="h">#3A64FF</span></div>
      <div class="cand" style="background:#5C7A47;color:#F5F3EE;"><span class="n">Verde Tático</span><span class="h">#5C7A47</span></div>
      <div class="cand" style="background:#C1862E;color:#15140F;"><span class="n">Bronze Forjado</span><span class="h">#C1862E</span></div>
      <div class="cand" style="background:#B6E23C;color:#15140F;"><span class="n">Lima Técnica</span><span class="h">#B6E23C</span></div>
      <div class="cand" style="background:#7A2E3B;color:#F5F3EE;"><span class="n">Granada Profunda</span><span class="h">#7A2E3B</span></div>
    </div>
    <p class="cands-cap"><b>Cinco acentos comparados em mockups de contexto real.</b> Nenhum é o vermelho ou o laranja de academia. O azul é o mais esperado do grupo, e por isso o mais coerente num produto sobre dado e protocolo recalculado.</p>
  </div>
  <div>
    <h3 class="sec">O azul sozinho não serve como texto</h3>
    <p class="sec-sub">Contraste medido no app escuro. A marca tracejada em cada barra é o mínimo de 4,5:1 do WCAG AA para texto pequeno.</p>
    <div class="bars">
      <div class="bar-row"><div class="lab"><span>Azul base como texto, sobre tinta</span><span>3,9:1</span></div><div class="track"><div class="fill" style="width:__W1__%;background:#E5564A;"></div></div><div class="verdict no">Abaixo do mínimo. Vira só preenchimento.</div></div>
      <div class="bar-row"><div class="lab"><span>Variante clareada #5E80FF, sobre tinta</span><span>5,3:1</span></div><div class="track"><div class="fill" style="width:__W2__%;background:#5E80FF;"></div></div><div class="verdict ok">Passa. Único uso do azul como texto.</div></div>
      <div class="bar-row"><div class="lab"><span>Chip marcado: papel sobre #0031E7</span><span>7,3:1</span></div><div class="track"><div class="fill" style="width:__W3__%;background:#5E80FF;"></div></div><div class="verdict ok">Passa com folga, sem aumentar a fonte.</div></div>
      <div class="bar-row"><div class="lab"><span>Botão primário: papel sobre #3A64FF</span><span>4,3:1</span></div><div class="track"><div class="fill" style="width:__W4__%;background:#5E80FF;"></div></div><div class="verdict ok">Texto de 19 px em negrito conta como texto grande (mínimo 3:1).</div></div>
    </div>
  </div>
</div>
    '''.replace("__THR__", f"{4.5/8*100:.1f}")
       .replace("__W1__", f"{3.9/8*100:.1f}")
       .replace("__W2__", f"{5.3/8*100:.1f}")
       .replace("__W3__", f"{7.3/8*100:.1f}")
       .replace("__W4__", f"{4.3/8*100:.1f}"),
    "Cor", 11
)

# -------------------------------------------------------------- 12 ícone
slides["12-icone"] = wrap(
    "FortEvo: ícone de app",
    '''
  .top { display: flex; gap: 64px; align-items: center; margin-top: 42px; }
  .hero { width: 270px; height: 270px; border-radius: 22.37%; flex: none; box-shadow: 0 30px 56px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.35); }
  .home { flex: 1; background: linear-gradient(180deg, #2A2823 0%, #1B1A16 100%); border-radius: 34px; border: 1px solid var(--border); padding: 34px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 22px; }
  .app { aspect-ratio: 1; border-radius: 22.37%; }
  .app.me { overflow: hidden; box-shadow: 0 0 0 2px rgba(245,243,238,0.0); }
  .app.me img { width: 100%; height: 100%; display: block; }
  .masks { display: flex; gap: 44px; align-items: flex-end; margin-top: 46px; }
  .mask-cell { display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .mask { width: 124px; height: 124px; background: var(--ink); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .mask img { width: 100%; height: 100%; }
  .cap { font-size: 13px; color: var(--muted); }
    ''',
    '''
<div class="h1 sm">Do monograma ao ícone de app.</div>
<div class="top">
  <img class="hero" src="../../app/assets/icon.png">
  <div class="home">
    <div class="app" style="background:linear-gradient(160deg,#5B8DEF,#3B5BDB);"></div>
    <div class="app" style="background:linear-gradient(160deg,#F2B35A,#E0872B);"></div>
    <div class="app me"><img src="../../app/assets/icon.png"></div>
    <div class="app" style="background:linear-gradient(160deg,#6FD0A0,#2FA374);"></div>
    <div class="app" style="background:linear-gradient(160deg,#E98AA6,#C9486F);"></div>
    <div class="app" style="background:linear-gradient(160deg,#A58BE8,#6B4FD1);"></div>
    <div class="app" style="background:linear-gradient(160deg,#F0D66A,#D9AE22);"></div>
    <div class="app" style="background:linear-gradient(160deg,#7CC8E8,#2E8FBF);"></div>
    <div class="app" style="background:linear-gradient(160deg,#F08A7A,#D2543F);"></div>
    <div class="app" style="background:linear-gradient(160deg,#9CA3AF,#6B7280);"></div>
  </div>
</div>
<p class="lede" style="max-width:900px;">O ícone é o símbolo em papel sobre tinta, sem cantos embutidos (cada sistema aplica a sua máscara). Numa tela cheia de ícones coloridos, o preto sólido se destaca sem destoar.</p>
<div class="masks">
  <div class="mask-cell"><div class="mask" style="border-radius:22.37%;"><img src="../../app/assets/icon.png"></div><span class="cap">iOS, máscara arredondada</span></div>
  <div class="mask-cell"><div class="mask" style="border-radius:50%;"><img src="../../app/assets/android-icon-foreground.png"></div><span class="cap">Android, círculo</span></div>
  <div class="mask-cell"><div class="mask" style="border-radius:32%;"><img src="../../app/assets/android-icon-foreground.png"></div><span class="cap">Android, arredondado</span></div>
  <p class="fine" style="align-self:center;max-width:420px;">Testado com as três máscaras mais comuns, sobre os arquivos exportados de verdade. A marca se sustenta com folga em todas.</p>
</div>
    ''',
    "Ícone", 12
)

# -------------------------------------------------------------- 13 telas
slides["13-telas"] = wrap(
    "FortEvo: telas do app",
    '''
  .floor { position: absolute; z-index: 0; left: 0; right: 0; bottom: 0; height: 380px; background: linear-gradient(180deg, rgba(58,100,255,0) 0%, rgba(58,100,255,0.11) 100%); pointer-events: none; }
  .head { position: relative; z-index: 1; }
  .phones { position: relative; z-index: 1; display: flex; gap: 44px; justify-content: center; margin-top: 36px; }
  .phone { width: 322px; height: 690px; background: var(--ink); border: 1px solid rgba(245,243,238,0.2); border-radius: 40px; padding: 26px 20px 0; box-shadow: 0 44px 90px rgba(0,0,0,0.55); position: relative; overflow: hidden; display: flex; flex-direction: column; }
  .phone .fade { position: absolute; left: 0; right: 0; bottom: 0; height: 90px; background: linear-gradient(180deg, rgba(21,20,15,0), #15140F); pointer-events: none; }
  .ui { display: flex; flex-direction: column; gap: 12px; }
  .brand { display: flex; align-items: center; gap: 8px; }
  .brand svg { width: 22px; height: 22px; }
  .brand span { font-family: var(--wordmark); font-size: 17px; font-weight: 700; letter-spacing: -0.2px; }
  .sub { font-size: 14px; line-height: 1.45; color: var(--muted); }
  .t { font-size: 24px; font-weight: 700; letter-spacing: -0.01em; }
  .lab { font-size: 13px; font-weight: 600; margin-bottom: 8px; }
  .help { font-size: 12px; color: var(--muted); margin-top: 4px; line-height: 1.4; }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 15px; display: flex; flex-direction: column; gap: 6px; }
  .btn { border-radius: 12px; min-height: 46px; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 700; }
  .btn.p { background: var(--accent); color: var(--paper); }
  .btn.s { background: var(--surface); border: 1px solid var(--border); color: var(--accent-text); }
  .btn.g { color: var(--accent-text); }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { font-size: 13.5px; font-weight: 500; padding: 8px 13px; border-radius: 20px; background: var(--surface); border: 1px solid var(--border); }
  .chip.sel { background: var(--accent-pressed); border-color: var(--accent-pressed); }
  .prog { display: flex; gap: 8px; }
  .prog i { flex: 1; height: 4px; border-radius: 2px; background: var(--border); display: block; }
  .prog i.on { background: var(--accent); }
  .input { border: 1px solid var(--border); border-radius: 10px; padding: 11px 13px; font-size: 15px; background: var(--surface); color: var(--muted); }
  .footer { position: absolute; left: 0; right: 0; bottom: 0; padding: 12px 20px 18px; border-top: 1px solid var(--border); background: var(--ink); z-index: 2; }
  .ex { font-size: 13px; line-height: 1.35; }
    ''',
    '''
<div class="head">
  <div class="h1 sm">No app de verdade.</div>
  <p class="lede" style="margin-top:14px;">Telas do pré-beta, com saída real do motor.</p>
</div>
<div class="floor"></div>
<div class="phones">

  <div class="phone"><div class="ui" style="gap:14px;">
    <div class="brand"><svg viewBox="-16.80 -16.80 273.60 273.60" style="color:var(--paper)"><use href="#fe-mark"/></svg><span>FortEvo</span></div>
    <div class="sub">nome@email.com</div>
    <div class="card" style="margin-top:6px;">
      <div class="lab" style="margin-bottom:2px;">Seu protocolo já foi gerado</div>
      <div class="help" style="margin:0 0 8px;font-size:13px;">Split: Upper / Lower (U/L)</div>
      <div class="btn p">Ver protocolo</div>
      <div class="btn s" style="margin-top:4px;">Refazer cadastro</div>
    </div>
    <div class="btn g">Sair</div>
  </div></div>

  <div class="phone"><div class="ui" style="gap:14px;">
    <div class="prog"><i class="on"></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="t">Treino básico</div>
    <div class="sub">Pra calibrar volume e split certos pro seu ponto de partida.</div>
    <div><div class="lab">Como você classificaria seu nível?</div>
      <div class="chips"><div class="chip">Iniciante</div><div class="chip sel">Intermediário</div><div class="chip">Avançado</div><div class="chip">Muito avançado (anos de treino ininterrupto)</div></div>
      <div class="help">Isso é cruzado com os anos de treino abaixo: tempo de treino só pode puxar o nível pra baixo, nunca pra cima.</div></div>
    <div><div class="lab">Há quantos anos você treina musculação?</div><div class="input">ex: 2 ou 0.5</div></div>
    <div><div class="lab">Quantos dias por semana você tem disponível?</div>
      <div class="chips"><div class="chip">1</div><div class="chip">2</div><div class="chip">3</div><div class="chip sel">4</div><div class="chip">5</div></div></div>
  </div>
  <div class="footer"><div class="btn p">Avançar</div></div></div>

  <div class="phone"><div class="ui" style="gap:12px;">
    <div class="t">Seu protocolo</div>
    <div class="card"><div class="lab" style="margin:0;">Split: Upper / Lower (U/L)</div><div class="help" style="margin:0;">upper#1 · lower#1 · upper#2 · lower#2</div><div class="help" style="margin:0;">Também viável: ABCD, ABC</div></div>
    <div class="card"><div class="lab" style="margin:0;">Periodização</div><div class="help" style="margin:0;">Bloco 1: treino (35 treinos)</div><div class="help" style="margin:0;">Bloco 2: deload (7d de calendário)</div><div class="help" style="margin:0;">Bloco 3: treino (35 treinos)</div></div>
    <div class="card"><div class="lab" style="margin:0;">Cardio</div><div class="help" style="margin:0;">MISS, 3-4x/semana, 25-35min/sessão</div></div>
    <div class="card"><div class="lab" style="margin:0 0 4px;">UPPER#1</div>
      <div class="ex">Supino reto (barra): 4x8-10</div>
      <div class="ex">Supino inclinado (máquina): 3x8-12</div>
      <div class="ex">Puxada alta (pegada aberta): 4x8-10</div>
      <div class="ex">Puxada alta (pegada fechada/triângulo): 3x8-12</div></div>
  </div><div class="fade"></div></div>

</div>
    ''',
    "Aplicação", 13
)

# --------------------------------------------------------- 14 encerramento
slides["14-encerramento"] = wrap(
    "FortEvo: próximas validações",
    '''
  .cols { display: grid; grid-template-columns: 1fr 380px; gap: 80px; margin-top: 64px; align-items: center; }
  .items { display: flex; flex-direction: column; }
  .it { padding: 40px 0; border-bottom: 1px solid var(--border); }
  .it:first-child { border-top: 1px solid var(--border); }
  .it h4 { font-family: var(--display); font-weight: 700; font-size: 29px; letter-spacing: -0.02em; margin-bottom: 12px; }
  .it p { font-size: 19px; line-height: 1.55; color: var(--muted); max-width: 700px; }
  .end { display: flex; flex-direction: column; align-items: center; gap: 26px; }
  .end .mark { width: 190px; height: 190px; filter: drop-shadow(0 16px 30px rgba(0,0,0,0.5)); }
  .end .wm { font-family: var(--wordmark); font-weight: 700; font-size: 68px; letter-spacing: -0.5px; }
    ''',
    '''
<div class="h1">O que falta validar.</div>
<div class="cols">
  <div class="items">
    <div class="it"><h4>Reação de quem treina</h4><p>Beta fechado com 5 a 10 pessoas que já treinam, de objetivos, equipamentos e níveis diferentes. A pergunta central: o protocolo faz sentido para o meu perfil? E o nome e a cara do app funcionam?</p></div>
    <div class="it"><h4>Registro e disponibilidade do nome</h4><p>Busca formal de marca no INPI, domínio e @handle para FortEvo. A busca geral não achou colisão com a grafia exata, mas não substitui a formal.</p></div>
    <div class="it"><h4>O ciclo completo de treino</h4><p>Executar a sessão, registrar a carga, progredir e fechar o bloco no app. Hoje o motor gera o protocolo; o loop de treino é o próximo passo do produto.</p></div>
  </div>
  <div class="end">
    <svg class="mark" style="color: var(--paper)"><use href="#fe-mark"/></svg>
    <div class="wm">FortEvo</div>
  </div>
</div>
    ''',
    "Próximos passos", 14
)

# -------------------------------------------------------------- escrita
for old in HERE.glob("[0-9][0-9]-*.html"):
    old.unlink()
for name, html in slides.items():
    (HERE / f"{name}.html").write_text(html)

assert len(slides) == TOTAL, f"esperava {TOTAL} slides, gerei {len(slides)}"
print(f"escrevi {len(slides)} slides")
