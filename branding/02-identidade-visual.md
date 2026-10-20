# Identidade visual — FortEvo

Continuação de `01-pesquisa-e-naming.md`. Nome final: **FortEvo** (grafia com F e E maiúsculos). Este arquivo documenta as etapas 6+ do branding (identidade visual) — refeito do zero depois da troca de nome de "Lastro" pra "FortEvo"; a rodada anterior (em torno de "LASTRO") está obsoleta.

**Status: em andamento.** Etapa 7 passou por uma segunda rodada (SVG profissional, ver abaixo) e aguarda reação do Fabio antes de seguir pra paleta de cores (etapa 8).

## Limitação declarada (vale pra esta rodada também)

Este ambiente não tem chave de API de geração de imagem configurada (`GEMINI_API_KEY`, `ATLASCLOUD_API_KEY`, `MUAPI_API_KEY` ausentes, `google-genai` não instalado) — a via de logotipo gerado por IA não está disponível aqui. A primeira rodada da etapa 7 foi construída como peça de tipografia + geometria em HTML/CSS (artefato publicado); a segunda rodada, abaixo, usa SVG real desenhado à mão por agentes especializados (skill `logo-designer`), o que é mais próximo do que viraria asset de produção.

## Etapa 6 — Direção criativa (revisada pra FortEvo)

A direção de fundo não muda — personalidade de marca continua rigor/raciocínio, não hype (ver tom de voz em `01-pesquisa-e-naming.md`), e as mesmas proibições seguem valendo: sem halteres, siluetas musculosas, chamas, raios, escudos — o vocabulário visual padrão de app de treino.

O que muda é o material de trabalho. "Lastro" era uma palavra única e precisava de um símbolo externo pra carregar o conceito (base, peso, ângulo reto). **"FortEvo" já carrega o conceito na própria escrita**: é duas raízes emendadas (Fort + Evo), marcadas pela letra "E" maiúscula no meio da palavra. Em vez de inventar um ícone por fora, a direção escolhida foi **revelar essa emenda através da própria tipografia** — peso, posição, um traço mínimo — e só recorrer a uma forma geométrica adicionada quando a tipografia sozinha não bastava (um conceito dos cinco, não todos).

- **Grafia da marca**: em qualquer texto corrido (telas, documentos, loja de apps), a marca se escreve exatamente **"FortEvo"**, sem caractere adicionado. Qualquer traço/seta/degrau usado num logotipo específico é recurso visual daquele logotipo, não parte da string do nome.
- **Fonte de exploração**: Space Grotesk (mesma da rodada anterior) — geométrica, presente, não gritada.
- **Cor**: nenhuma ainda, de propósito — etapa 8/9.

## Etapa 7 — Cinco propostas de logotipo

Publicadas como peça visual: **[ver as 5 propostas](https://claude.ai/artifact/Hir34icLNAei3a2FyfovUd)** — mesmo artefato da rodada anterior, atualizado (as 5 propostas antigas em torno de "LASTRO" foram substituídas, não ficam mais acessíveis nesse link).

Resumo de cada conceito (lógica completa e pontos fortes/limitações na peça publicada):

1. **Aceno** — "Fort" fica quieto (é a base); só "Evo" recebe um pequeno aceno (▲) por cima, como a parte que está em movimento.
2. **Degrau** — "Fort" no chão (com uma trave de apoio), "Evo" sobe fisicamente um degrau — progressão literal na posição das letras.
3. **Ganho de peso** — "Fort" em peso regular, "Evo" em peso cheio — a espessura da letra aumenta ao longo da palavra. O mais minimalista dos 5, só tipografia.
4. **Emenda** — uma seta diagonal mínima marca o ponto exato onde "Fort" vira "Evo". O único que adiciona uma forma própria, não só tipografia — também o mais parecido com ícone de app de analytics/produtividade (maior risco de genérico).
5. **Monograma F·E** — as duas maiúsculas que já existem na palavra ("F" de Fort, "E" de Evo) isoladas num tile, pensado desde o início pra virar o ícone do app.

## Etapa 7 (revisão) — Logo profissional via SVG (out/2026)

A rodada CSS/tipografia acima (os 5 conceitos "Aceno/Degrau/Ganho de peso/Emenda/Monograma") fica como registro histórico, mas foi **substituída** por esta segunda rodada: 5 marcas combinadas (ícone + wordmark) desenhadas como SVG real, cada uma por um agente especializado trabalhando em paralelo, seguindo as convenções da skill `logo-designer` (viewBox sem tamanho fixo, grupos `#icon`/`#wordmark`, fill sólido, legibilidade a 32px). A direção de fundo é a mesma da etapa 6 (revelar a emenda Fort/Evo, não inventar símbolo externo) — exceto no conceito 3, que usa um "F" geométrico customizado como forma própria, e no conceito 5, que é um monograma com as duas maiúsculas que já existem na palavra.

**Validação de contexto**: antes de desenhar, usei a busca local de referência de estilo/indústria da skill `ui-ux-pro-max:design` (sem precisar de chave de API) pra confirmar duas coisas — (1) a direção "Minimalist/Geometric/Abstract Mark" escolhida pro projeto é uma categoria de estilo real e reconhecida, não um gosto pessoal meu; (2) a convenção genérica de "Sports Fitness" (vermelho/laranja/preto, halteres, sans bold condensada, "energetic powerful dynamic") é exatamente o que este projeto decidiu evitar desde a etapa 6 — então o distanciamento do clichê é uma escolha deliberada e evidenciada, não um esquecimento.

Arquivos: **[preview com as 5 marcas lado a lado](logos/preview.html)** (abrir no navegador; tem alternância claro/escuro) e os SVGs individuais em `branding/logos/concepts/concept-1.svg` a `concept-5.svg`.

Resumo de cada conceito:

1. **Emenda** — dois blocos geométricos arredondados que se sobrepõem numa emenda em degrau (bloco maior, no chão = Fort/fundação; bloco menor, subindo = Evo/movimento). Nenhuma peça externa, só geometria; silhueta única e conectada, não dois blocos soltos.
2. **Ascensão** — uma única forma em cunha que sobe da esquerda pra direita, com três entalhes internos de profundidade crescente que criam a leitura de "barras se fundindo em uma coisa só" sem virar infográfico (sem base, sem eixo, sem números).
3. **F negativo** — um "F" geométrico sólido e customizado (não é uma letra de fonte) com um recorte em espaço negativo que revela uma seta ascendente — like a técnica do FedEx, mas desenho original. É o mais "achado" dos 5: a seta é um detalhe que recompensa quem olha de novo.
4. **Selo de crescimento** — um selo arredondado com uma forma menor aninhada dentro, deslocada pro canto superior-direito (não centralizada) — sugere algo crescendo a partir de um núcleo, sem virar medalha/troféu.
5. **Monograma F·E** — as duas maiúsculas que já existem na palavra ("F" de Fort, "E" de Evo) isoladas num tile escuro com as letras em paper — pensado desde o início pra também funcionar como ícone do app sozinho (sem o wordmark ao lado).

**Teste de legibilidade a favicon (64/32/16px)**: rodei os 5 ícones nesses três tamanhos pra checar o que sobrevive pequeno. Conceito 1 (Emenda) e conceito 4 (Selo) seguram a forma com clareza até 16px — são os mais robustos pra virar ícone de app. Conceito 2 (Ascensão) perde os entalhes finos a 16px mas ainda lê como uma cunha subindo. Conceito 3 (F negativo) e conceito 5 (Monograma) continuam reconhecíveis a 32px, mas a 16px o detalhe fino (a seta do 3, a separação das letras do 5) começa a embaçar — não são inutilizáveis, mas precisariam de um ajuste de espessura na etapa de refino (Fase 3 da skill) se um desses virar o escolhido pra ícone do app.

## Etapa 7 (refino) — Variações de Emenda e Selo com as letras F/E (out/2026)

O Fabio escolheu as direções **1 (Emenda)** e **4 (Selo de crescimento)** como favoritas e pediu variações tentando incluir as letras F e E diretamente na marca. Gerei 6 variações em paralelo (3 por direção), mantendo a silhueta já aprovada como base e mexendo só no que cada variação se propõe a mudar.

Arquivos: preview atualizado (`branding/logos/preview.html`, agora mostrando as iterações + checagem de favicon 64/32/16px) e os SVGs em `branding/logos/iterations/iteration-1.svg` a `iteration-6.svg` (+ `icon-1.svg` a `icon-6.svg`, versões isoladas do ícone recortadas em viewBox quadrado, pra teste de favicon).

**Avaliação honesta depois de renderizar e checar tamanho pequeno** — nem todas funcionaram igualmente bem:

- **iteration-1** (F recortado em negativo no bloco maior da Emenda) — o recorte não ficou legível como "F"; lê mais como um entalhe/degrau abstrato do que como a letra. Não recomendo essa.
- **iteration-2** (os dois blocos da Emenda redesenhados como F e E literais, interligados) — dá pra reconhecer as duas letras se você procurar, mas o resultado ficou visualmente carregado/confuso, perde a limpeza que fazia a Emenda original funcionar. Também não recomendo.
- **iteration-3** (Emenda original quase intocada, com um "F·E" minúsculo escondido na emenda) — a silhueta forte que você já gostou fica 100% preservada; o detalhe "F·E" só aparece de perto (em 32-16px ele some, o que é esperado e intencional — é um "achado" pra quem olha de novo, não uma leitura funcional em tamanho de ícone). Opção segura se você quiser manter a Emenda como está hoje com só um toque extra.
- **iteration-4** (Selo com a janela interna em formato de E) — ficou muito boa: o selo externo continua idêntico ao que você já curtiu, e o E interno lê limpo e claro até 16px.
- **iteration-5** (Selo com a janela interna em formato de F) — mesma qualidade da 4, par natural dela (F em vez de E).
- **iteration-6** (o selo externo inteiro vira um F, com o E encaixado dentro) — a mais ambiciosa das 6, e a que ficou mais "de marca": lê como F com clareza em qualquer tamanho, o E interno some um pouco em 16px mas o F sozinho já comunica. É a que mais parece um ícone de app de verdade, pronta pra ser usada sozinha.

**Minha recomendação, se quiser um atalho**: 4, 5 e 6 (as três do Selo) saíram consistentemente melhores que as três da Emenda nessa rodada — a geometria do selo dá mais espaço pra esconder uma letra limpa dentro sem perder a silhueta externa. Se a letra dentro do ícone for algo que você quer de verdade, a Selo é o caminho que está funcionando; se preferir manter a Emenda como estava, a iteration-3 é a forma de fazer isso sem abrir mão da letra.

## Etapa 7 (refino 2) — Mais "fit": força, evolução e fitness na geometria (out/2026)

Feedback do Fabio sobre a rodada anterior: gostou do F e do E, mas a marca não estava lendo como fitness de jeito nenhum — pediu pra juntar as estéticas de fitness, evolução e força. O problema não era falta de ícone (continuamos sem halteres/chamas/raios/escudos — isso não muda), era que a linguagem geométrica em si (cantos todos arredondados tipo "squircle" de app) lia como SaaS corporativo, não como atlético. Gerei 4 direções novas mexendo só nisso — ângulo, peso, tensão — mantendo F e E:

Arquivos: `branding/logos/iterations/iteration-7.svg` a `iteration-10.svg` (+ `icon-7.svg` a `icon-10.svg`).

- **iteration-7 — Chanfrado**: o selo F+E com cantos cortados em 45° em vez de arredondados, F dominante e grande, E menor aninhado embaixo. Lê como chapa forjada/selo cortado, não como ícone de app. **Segura muito bem até 16px.**
- **iteration-8 — F·E inclinado**: as letras com 9° de inclinação pra frente e pontas cortadas em ângulo (não é itálico, é um cisalhamento real computado letra por letra), fundidas numa marca só. É a que carrega mais sensação de movimento/impulso. **Também segura muito bem até 16px.**
- **iteration-9 — E com barras crescentes num selo F**: o E ganha três barras de tamanho crescente (60%→80%→100%) dentro de um selo-F arredondado. Conceito interessante (evolução codificada na própria letra), mas a execução recaiu no mesmo selo arredondado que você já apontou como "não fit", e em 16px o E vira um corte ambíguo (parece um "3" espelhado, não um E). Essa não ficou boa — não recomendo.
- **iteration-10 — F comprimido + E com cunha diagonal**: F curto e denso (força comprimida), E com a barra do meio virando uma cunha diagonal que "explode" pra fora (impulso/evolução). Visual mais ousado e com tensão real. Segura bem até 32px; em 16px fica mais compacto/denso mas ainda reconhecível.

**Minha leitura**: 7 e 8 são claramente as que resolveram o problema que você apontou — ficaram com peso, ângulo e tensão de verdade, sem perder a letra nem virar clichê de ícone de academia. A 10 é a mais ousada/distinta, boa se você quiser algo com mais drama visual. A 9 eu deixaria de lado — ela tenta a coisa certa (crescimento na própria letra) mas a execução não ficou à altura das outras três.

## Etapa 7 (refino 3) — iteration-8 desenvolvida pra energia de elite (out/2026)

O Fabio escolheu a **iteration-8** (F·E inclinado) e pediu um desenvolvimento mais a fundo pra passar energia de aplicativo fitness de elite. O problema concreto na versão 8: F e E se sobrepunham de um jeito meio acidental no meio (um entalhe estreito e um pouco confuso onde a ponta do F encontrava o E), o que tirava um pouco da sensação de "desenhado com precisão".

**O que mudou na `iteration-11.svg`** (`branding/logos/iterations/iteration-11.svg` + `icon-11.svg`):

- F e E agora têm um **corte diagonal limpo e constante entre eles** (não mais sobreposição) — construído matematicamente: desenhei as duas letras num grid reto, com um espaço vertical fixo entre elas, e só depois apliquei a inclinação (12°, um pouco mais acentuada que os 9° da v8) em cima de tudo. Como a inclinação desloca igualmente as duas bordas do espaço, o resultado é um corte diagonal perfeitamente paralelo ao ângulo das próprias letras — em vez de um encontro acidental, vira um gesto único e intencional cortando a marca inteira, tipo "velocidade/precisão", bem mais parecido com o que marcas esportivas de ponta fazem (Jordan, Under Armour, roupas de performance).
- Kerning do wordmark "FortEvo" mais fechado (`letter-spacing: -3` em vez de `-1`) — mais "travado"/confiante, menos solto.
- Testei em 64/32/16px: essa versão segura **melhor** que a v8 original em tamanho pequeno — a separação limpa lê mais nítido que a sobreposição confusa.
- Também montei um mockup de apresentação em fundo escuro (`branding/logos/showcase/showcase-11.html`, linkado no preview) pra visualizar a marca como teria no splash screen do app — contexto de "app fitness premium" de verdade, não só a marca isolada em fundo branco de teste.

## Etapa 7 (refino 4) — Reconstrução pra craft de alto padrão (out/2026)

O Fabio deu um feedback direto, com 7 imagens de referência (monogramas "FE"/geométricos, maioria branco-sobre-preto, cantos arredondados e refinados, uma delas com textura tipo malha/diamante atlética de fundo): *"Você ta criando algo extremamente básico, preciso que vc crie algo de alta qualidade."* Isso não era sobre o conceito (F+E inclinado já estava aprovado) — era sobre o acabamento. Comparando com as referências, o que faltava na iteration-11:

- **Terminações cruas**: cantos retos/chanfrados em vez de arredondamento genuíno e proporcional.
- **Fusão pouco sofisticada**: a v11 resolveu o problema da v8 trocando a sobreposição acidental por um corte/gap limpo — uma solução segura, mas um gap ainda lê como "duas peças encostadas", não como um monograma de verdade fundido numa peça só (que é o que as referências mostram, especialmente a imagem 5).
- **Apresentação rasa**: mockup em fundo escuro liso, sem a textura/profundidade que dá a sensação "produto premium".

**O que mudou na `iteration-12.svg`** (`branding/logos/iterations/iteration-12.svg` + `icon-12.svg`):

- Reconstruí o F e o E do zero com uma **fusão controlada**: em vez de manter um espaço entre as duas letras, deixei o braço superior do F e a haste do E se sobreporem de propósito numa única zona bem definida (verifiquei à mão que só existe essa UMA zona de sobreposição, nada acidental) e usei união booleana de polígonos (biblioteca `shapely`) pra fundir as duas formas numa silhueta só, topologicamente limpa — sem furos, sem auto-interseção. É a diferença entre "duas letras coladas" e "um monograma desenhado como peça única".
- Apliquei um **algoritmo próprio de arredondamento de cantos** (não é um `rx`/`ry` genérico de SVG — calculei, pra cada vértice do contorno final, um ponto de entrada e saída recuados pelo raio desejado, com curva de Bézier quadrática entre eles, e o raio é limitado por vértice pra nunca estourar em arestas curtas). Isso dá cantos e reentrâncias arredondados de verdade, incluindo nos ângulos internos da fusão — é o nível de polimento que as referências do Fabio têm e que as versões anteriores não tinham.
- Traço mais robusto (mais grosso que a v11) e inclinação um pouco mais suave (11° em vez de 12°) — menos "cortante", mais "sólido".
- Testado em 64/32/16px: segura muito bem, inclusive melhor que a v11 — o traço mais grosso e os cantos arredondados ajudam a silhueta a não "sujar" em tamanho pequeno.
- Novo mockup de apresentação (`branding/logos/showcase/showcase-12.html`) com fundo escuro texturizado — malha diagonal sutil em diamante (inspirada na referência 5 do Fabio, tecido técnico/performance), vinheta e sombra suave sob o ícone pra dar sensação de profundidade/produto, não só a marca plana num fundo liso.

**Avaliação honesta**: essa é, na minha visão, a primeira versão que realmente fecha o gap que o Fabio apontou — o "FE" agora lê como uma peça de design única e deliberada, não como duas letras geométricas encostadas. Se ainda não bater o nível das referências, o próximo ajuste provável é no raio de arredondamento (mais generoso) ou na proporção/peso do traço, não um retrabalho conceitual.

## Etapa 7 (refino 5) — Escada ascendente no E, sem ícone literal (out/2026)

O Fabio pediu pra encaixar a silhueta de um haltere/kettlebell dentro do F+E, pra reforçar a leitura "fit". Isso contrariava uma decisão já documentada desde a fase "Lastro" (etapa 6: "sem halteres, siluetas musculosas, chamas, raios, escudos — o vocabulário visual padrão de app de treino"). Expliquei o porquê — ícone literal de academia é clichê, compete com a legibilidade do monograma recém-limpo, e vai contra o pilar de que o FortEvo carrega o conceito fitness pela própria tipografia, não por ícone emprestado — e propus resolver via geometria pura. O Fabio concordou em manter a proibição.

**O que mudou na `iteration-13.svg`** (`branding/logos/iterations/iteration-13.svg` + `icon-13.svg`):

- As três hastes horizontais do E (que antes eram quase do mesmo tamanho, com a do meio um pouco menor por convenção tipográfica) agora **crescem de cima pra baixo**: a de cima é a mais curta, a do meio intermediária, a de baixo a mais longa. O efeito é uma "escada" ascendente só pela proporção das próprias hastes — sem nenhuma forma nova adicionada à marca. Lê como progressão/evolução (a letra "ganhando" largura conforme desce, uma base mais larga sustentando o que vem acima) e reforça "Fort" (base sólida) + "Evo" (crescimento), continuando a resolver a pegada fitness só por tipografia/geometria, dentro do que já estava decidido pro projeto.
- Testei 3 variações (hastes crescendo cima→baixo, assimetria sutil, e o inverso — longa→curta) antes de escolher: a escada "curto→longo" foi a mais clara e intencional; a versão sutil demais passava despercebida; a invertida (base mais estreita) lia como instável/"tombando", não como força.
- Mantive toda a construção da iteration-12 (fusão booleana F+E, cantos arredondados via algoritmo próprio, inclinação de 11°) — essa rodada mexeu só nas proporções do E, não refez a base.
- Testado em 64/32/16px: continua lendo "FE" com clareza, a escada ainda é perceptível mesmo em 32px.
- Showcase atualizado (`branding/logos/showcase/showcase-13.html`) com o mesmo tratamento de fundo escuro + textura da rodada anterior.

## Etapa 7 (direção nova) — Monograma achatado, referência externa do Fabio (out/2026)

O Fabio trouxe uma imagem de referência externa (não gerada por mim) de um monograma "FE" — achatado, sem inclinação, traço superior do F e do E unificado numa única barra, E reduzido a dois traços sem haste própria, apresentado tanto como lockup empilhado (ícone em cima, nome embaixo) quanto como ícone de app num quadrado de cantos bem arredondados em fundo escuro — e pediu pra desenvolver algo nessa linha. Isso é uma ruptura de direção em relação às iterations 7-13 (que eram todas inclinadas/"em movimento"): aqui a estética é estática, modular, minimalista.

**O que é a `iteration-14.svg`** (`branding/logos/iterations/iteration-14.svg` + `icon-14.svg` + `appicon-14.svg`):

- Construção totalmente ortogonal (sem inclinação/shear) — F padrão (haste + barra superior + barra do meio) e E reduzido a **dois traços próprios** (meio e base), sem haste e sem barra superior dele mesmo — a barra superior do F se estende por toda a largura do ícone e faz esse papel pros dois, um "ligature" de traço compartilhado. O traço do meio do E fica alinhado na mesma altura da barra do meio do F (lê como uma faixa horizontal contínua cortada por um vão), e o traço de base fecha rente à linha de base do F.
- Arredondamento de canto bem mais sutil que nas iterations 11-13 (raio pequeno, só pra tirar o aspecto 100% de esquadro, sem virar "pílula").
- Precisei de 3 tentativas de proporção até o E parar de ler como "dois tracinhos soltos" (ponto/dois-pontos) e virar um E reconhecível — a chave foi dar aos traços do E a mesma largura generosa da metade direita da barra superior, em vez de espremê-los num canto.
- Como o Fabio mandou a referência já no formato empilhado (ícone em cima, "FortEvo" embaixo) e também como app icon, gerei as duas apresentações: `iteration-14.svg` é o lockup empilhado; `appicon-14.svg` é a mesma marca dentro de um quadrado de cantos bem arredondados (fundo `#15140F`, marca em `#F5F3EE`) — é a primeira vez que a gente mostra essa visualização de "ícone de app de verdade" nesse projeto, não só a marca solta.
- Testado em 64/32/16px: ainda lê "FE" em todos os tamanhos, inclusive 16px.
- **Nota aberta sobre a tipografia**: na referência que o Fabio mandou, o wordmark parece usar uma fonte mais redonda/geométrica (tipo Poppins/Century Gothic) do que o Arial/Helvetica Bold que uso em todas as iterations por ser uma fonte de sistema segura (renderiza em qualquer navegador sem depender de fonte externa). Mantive Arial/Helvetica por enquanto — se o Fabio quiser mais fidelidade à referência nesse ponto, é um ajuste à parte (ou troco a fonte de sistema, ou desenho o wordmark em path, o que trava a marca de vez contra variação de fonte do dispositivo).

Essa é uma direção **estruturalmente diferente** das iterations 11-13 (achatada vs. inclinada/dinâmica) — não é um refino incremental, é uma rota alternativa. Vale decidir qual das duas direções (a "em movimento" das iterations 11-13, ou essa "achatada/modular") é o caminho antes de continuar refinando.

## Como decidir a partir daqui

- Essa direção achatada (iteration-14) bate com o que você tinha em mente pela referência, ou precisa ajustar proporção/traço antes de fechar?
- Entre as duas rotas que o projeto tem agora — a inclinada/dinâmica (iteration-13) e essa achatada/modular (iteration-14) — qual você quer levar adiante? (Dá pra manter as duas em aberto mais uma rodada se preferir comparar lado a lado antes de decidir.)
- Quer que eu já experimente o wordmark numa fonte mais redonda/geométrica pra bater mais com a referência, ou isso fica pra depois?
- Quer ver essa mesma marca testada em cor (mesmo que ainda provisória) antes de decidir, ou prefere fechar o ícone 100% em preto-e-branco primeiro e só depois ir pra paleta (etapa 8)?

## Próximos passos (etapas 8-16, não iniciados)

Estudo de cor → 5 paletas → matriz logotipo×paleta (5×5) → ícone do app → telas-conceito → manual de marca → arquivos finais de exportação.
