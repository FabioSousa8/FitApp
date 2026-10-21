# Identidade visual — FortEvo

Continuação de `01-pesquisa-e-naming.md`. Nome final: **FortEvo** (grafia com F e E maiúsculos). Este arquivo documenta as etapas 6+ do branding (identidade visual) — refeito do zero depois da troca de nome de "Lastro" pra "FortEvo"; a rodada anterior (em torno de "LASTRO") está obsoleta.

**Status: fechado.** Etapa 7 está **fechada**: **iteration-14** (monograma achatado, lockup empilhado) é a direção definitiva do logo. Etapa 8 também está **fechada**: **Azul Protocolo (`#3A64FF`)** é o acento definitivo, com sistema de estados (hover/pressed/tints) documentado abaixo. Etapa 9 (ícone final do app) também está **fechada**: exportado e integrado em `app/assets/` e `app.json`. Etapa 10 (telas-conceito) também está **fechada**: marca aplicada direto no app real (`app/src/components/ui.tsx` + telas), não num mockup solto. Etapa 11 (manual de marca) também está **fechada**: `branding/manual/manual-de-marca.html` + PDF. Etapa 12 (kit de marca) também está **fechada**: tudo empacotado em `branding/kit/fortevo-brand-kit.zip`. A linha inclinada/dinâmica do logo (iterations 7-13) e as outras 4 propostas de cor ficam registradas como histórico. Nenhuma etapa de branding em aberto.

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

## Decisão (out/2026)

O Fabio escolheu a **iteration-14** como direção definitiva pra seguir. A linha inclinada/dinâmica (iterations 7-13) para de ser desenvolvida a partir daqui — fica só como histórico documentado acima. Fonte do wordmark (Arial/Helvetica Bold) confirmada, sem necessidade de testar alternativa mais redonda.

## Etapa 7 (refino final) — Polimento da iteration-14 + teste em contexto real (out/2026)

O Fabio pediu uma última rodada de refino na iteration-14 antes de considerar o preto-e-branco 100% fechado. Três ajustes de precisão, nenhum deles muda a leitura da marca:

- **Vão F→E mais largo**: o espaço entre a barra do meio do F e os traços do E era de 20 unidades; aumentei pra 28 (encurtei a barra do F de 100 pra 96, e empurrei o início dos traços do E de 120 pra 124). Com isso a separação entre as duas letras fica mais clara, menos "colado".
- **Cantos um pouco mais macios**: raio de arredondamento de 6 pra 8 (ainda bem longe de virar "pílula" — é só tirar a aresta 100% de esquadro).
- **Ícone de app com preenchimento mais confiante**: a margem interna do `appicon-14.svg` era generosa demais (136 de 512, ~27%) e deixava a marca pequena dentro do quadrado; reduzi pra 118 (~23%), mais alinhado com o padrão de ícone de app (iOS/Android costumam preencher mais o quadrado).

**Teste em contexto real** (não só a marca isolada): montei um mockup com (1) a marca como favicon de verdade dentro de abas de navegador + barra de endereço, e (2) o ícone de app dentro de uma home screen simulada ao lado de outros ícones coloridos genéricos, pra ver se ele se sustenta visualmente numa tela cheia de ícones e não "some". Nos dois casos a marca segurou bem — no favicon ela lê "FE" nítido mesmo na aba pequena, e na home screen o preto sólido contrasta bem contra os ícones coloridos ao redor sem parecer destoante.

Considero o preto-e-branco da iteration-14 fechado depois desse refino — **confirmado pelo Fabio em out/2026.**

## Etapa 8 — Estudo de cor (out/2026)

A base neutra (tinta `#15140F` / papel `#F5F3EE`) fica como está em qualquer paleta — é a fundação construída desde a etapa 6 e não muda. O que etapa 8 decide é o **acento** — a cor usada em CTA, progresso, badges e destaques do produto, não no logotipo em si (o logo segue monocromático, disciplina mantida desde o início do projeto).

Fundamentei as 5 propostas na personalidade de marca já fechada (`01-pesquisa-e-naming.md`, seção 1): *"competente, direta, confiável — mais a lógica de um treinador de verdade, sistematizada do que motivação de internet; sóbrio, não clínico/frio"* — e no tom de voz já aprovado (*"Recalculamos seu protocolo — pelo seu histórico, você já é avançado."*). Evitei deliberadamente o vermelho/laranja saturado — é o clichê padrão de app de academia que o projeto já tinha banido pro logotipo (etapa 6) e que não faz sentido reintroduzir pela porta dos fundos na paleta de cor.

Em vez de mostrar só chips de cor soltos, testei cada acento aplicado num cartão de produto real — ícone + nome, progresso semanal, badge de "PR batido" e botão de CTA, com a copy já aprovada — pra avaliar como cada cor se comporta no tom do app, não só isoladamente. Publicado em `branding/colors/palette-study.html`:

1. **Azul Protocolo** (`#3A64FF`) — cobalto saturado, a leitura mais direta de "rigor e raciocínio": precisão, dado, confiança. A mais segura/esperada das cinco — funciona bem, mas é a que menos surpreende.
2. **Verde Tático** (`#5C7A47`) — oliva escurecido, disciplina/controle/resistência, registro "operacional" em vez de "wellness". Mais sóbrio que o azul, bate direto com "sistematizado, não hype".
3. **Bronze Forjado** (`#C1862E`) — âmbar/bronze metálico, não o laranja-chapado de app de academia genérico. Remete a "forja" (metal sob esforço, eco do candidato de nome "Forja" da etapa 1), conquista e calor sem cair no clichê proibido.
4. **Lima Técnica** (`#B6E23C`) — verde-limão frio e saturado, leitura de "sinal vital"/painel de performance em tempo real. A mais "tech/dado" das cinco, maior contraste contra a tinta escura.
5. **Granada Profunda** (`#7A2E3B`) — vinho escurecido e dessaturado. Não é o vermelho/laranja padrão proibido — é mais sério, "esforço" sem gritar. A opção mais arriscada/distinta das cinco.

**Minha leitura honesta**: as cinco passam no teste de "não parecer genérico de academia" — nenhuma é vermelho/laranja saturado. Se eu tivesse que apostar em uma só olhando pra personalidade da marca (sóbria mas com energia, rigor sem ser fria), diria que **Verde Tático** ou **Bronze Forjado** encaixam melhor que Azul Protocolo — o azul é tecnicamente correto mas é a escolha mais previsível/segura de qualquer app "de dados"; não é errado, só não é distintivo. Lima Técnica é a mais ousada e pode funcionar bem se o posicionamento for puxar mais pro lado "performance science" do que "treinador de confiança". Granada é a aposta mais arriscada e também a mais exclusiva — nenhum concorrente vai estar nessa região de cor.

## Decisão (out/2026)

O Fabio escolheu **Azul Protocolo** (`#3A64FF`) como acento — contra minha sugestão (eu puxava pro Verde Tático ou Bronze Forjado), e tudo bem: a escolha é dele, e "previsível/seguro" não é defeito quando o produto é literalmente sobre dado e protocolo recalculado — é coerência, não covardia.

### Sistema do acento Azul Protocolo

Um hex só não é suficiente pra usar em produto — precisa de estados de interação e de variações de superfície. Derivei os seguintes valores (ajuste de luminosidade/saturação em cima da base, verificado visualmente, não só calculado):

| Uso | Hex | Onde aplica |
|---|---|---|
| Base | `#3A64FF` | Preenchimento de botão, barra de progresso, ícone de destaque |
| Hover | `#1144FF` | Estado de passar o mouse/toque em botões |
| Pressed | `#0031E7` | Estado de clique/toque ativo |
| Tint escuro | `#002096` | Fundo de superfície de destaque (ex: card selecionado) em tema escuro — não substitui a tinta `#15140F` padrão, é só pra estados de seleção/destaque |
| Tint claro | `#DFE2F0` | Chip/badge sutil sobre fundo de papel `#F5F3EE`, pro caso de telas em tema claro |

**Nota de contraste**: o Azul Protocolo funciona bem como **preenchimento** (com texto claro ou escuro por cima, dependendo do tom — testado no estudo de cor) mas **não deve ser usado como cor de texto direto** sobre a tinta `#15140F` nem sobre o papel `#F5F3EE` — o contraste fica abaixo do mínimo de acessibilidade (AA) nos dois casos. Pra link/texto em azul, usar um tom mais claro que o acento base (não documentado ainda — resolver quando a etapa de telas-conceito precisar de link de texto).

## Como decidir a partir daqui

A matriz logotipo×paleta 5×5 do roadmap original não se aplica mais como estava pensada — o logo já é um único direcionado (iteration-14) e a paleta já é uma só (Azul Protocolo), então não há mais "matriz" pra montar; o que faltava era aplicar essa combinação já decidida nos próximos entregáveis. O Fabio decidiu: os dois — ícone primeiro, telas-conceito em seguida.

## Etapa 9 — Ícone final do app (exports) (out/2026)

Exportei a marca (monocromática, tinta `#15140F` / papel `#F5F3EE` — sem acento azul aqui; disciplina de etapa 6 mantida: logo não leva cor de produto) direto pros slots reais do app Expo (`app/assets/`), substituindo os placeholders padrão do Expo que ainda estavam lá:

| Arquivo | Tamanho/modo | Tratamento |
|---|---|---|
| `icon.png` | 1024×1024, RGB opaco | Quadrado liso (sem cantos arredondados embutidos — o próprio iOS aplica a máscara), fundo tinta cheio + marca em papel, mesma proporção do `appicon-14.svg` aprovado |
| `favicon.png` | 48×48, RGBA | Marca escura sobre transparente — mesmo tratamento já validado no teste de aba de navegador da etapa 7 |
| `splash-icon.png` | 1024×1024, RGBA | Marca escura sobre transparente (pro fundo claro padrão da splash screen do Expo) |
| `android-icon-foreground.png` | 512×512, RGBA | Marca em papel sobre transparente, com margem de ~20% de cada lado (zona de segurança do adaptive icon) |
| `android-icon-monochrome.png` | 432×432, RGBA | Marca em branco sobre transparente — ícone temático do Android 13+, o sistema aplica a cor |

`app.json`: troquei `android.adaptiveIcon.backgroundColor` do azul-claro placeholder (`#E6F4FE`) pra tinta da marca (`#15140F`) e removi `backgroundImage` (não precisa de PNG de fundo separado quando é cor sólida — um campo a menos pra manter sincronizado). Removi o `android-icon-background.png` antigo (não usado por nenhum ícone).

Validação: simulei a máscara que o SO aplica por cima — squircle do iOS, círculo e squircle do Android (os dois formatos de máscara mais comuns) — em cima dos arquivos exportados de verdade (não da ilustração `appicon-14.svg`). A marca se sustenta com folga em qualquer uma das três máscaras, sem cortar nada importante.

Também gerei (fora do app, como registro de marca em `branding/logos/export/`) um `favicon.ico` multi-resolução (16/32/48) e duas versões isoladas da marca em alta resolução (tinta sobre transparente e papel sobre transparente, 1024px/512px) pra uso fora do app — site institucional, materiais impressos, etc., quando precisar.

## Etapa 10 — Telas-conceito: marca aplicada no app real (out/2026)

A pergunta em aberto da etapa 9 era "aplicar logo + paleta numa tela de verdade do app". Decidi aplicar direto no código real do app (`app/`), não num mockup HTML solto como os das etapas 7-9 — o app já tem um kit de UI compartilhado (`app/src/components/ui.tsx`) com um comentário literal esperando por isso: *"branding... ainda está aberta... Troque ACCENT quando a marca for decidida."* Era exatamente o encaixe certo.

**Decisão de design que não estava escrita em lugar nenhum até agora, então documento aqui**: o app roda em **tema escuro fixo** (não segue claro/escuro do sistema). Isso não foi uma escolha nova feita agora — é a consequência direta de como a etapa 8 inteira já foi validada: todo mockup de contexto real da paleta (`palette-study.html`, `azul-protocolo-sistema.html`) usou fundo `#15140F` como base do produto, nunca papel claro. Theming claro nunca foi desenhado nem testado neste projeto. Apliquei essa mesma leitura ("ferramenta séria, de dado e protocolo recalculado, não wellness") no app de verdade: `userInterfaceStyle: "dark"` em `app.json`, `<StatusBar style="light" />`.

**Tokens em `ui.tsx`**:

| Token | Valor | Uso |
|---|---|---|
| `INK` / `BG` | `#15140F` | Fundo de tela |
| `PAPER` / `TEXT` | `#F5F3EE` | Texto principal |
| `SURFACE` | `#22211D` (tinta clareada ~6%) | Elevação de card/input sobre o fundo |
| `BORDER` | papel a 12% (`rgba`) | Linha sutil |
| `MUTED` | papel a 64% (`rgba`) | Texto secundário |
| `ACCENT` | `#3A64FF` | Preenchimento de CTA, progresso, destaque |
| `ACCENT_PRESSED` | `#0031E7` | Toque ativo e seleção forte (chip marcado) |
| `ACCENT_TEXT` | `#5E80FF` | **Novo** — único uso do acento como cor de TEXTO/ícone sobre fundo escuro |
| `DANGER` | `#E5564A` | Erro — vermelho original (`#DC2626`) recalibrado pra contraste AA sobre fundo escuro |

**Resolvendo a lacuna que eu tinha deixado em aberto na etapa 8** ("Pra link/texto em azul, usar um tom mais claro que o acento base — não documentado ainda"): o Azul Protocolo base (`#3A64FF`) não serve como cor de TEXTO sobre fundo escuro — fica em ~3.4-3.9:1 de contraste, abaixo do mínimo AA (4.5:1). Resolvido com dois ajustes, cada um reaproveitando algo que já existia no sistema em vez de inventar cor nova:
- **Texto/ícone em azul** (label de botão secundário/ghost, link): usa `ACCENT_TEXT` (`#5E80FF`), uma variante clareada do mesmo azul — 4.6-5.3:1 de contraste, passa AA.
- **Chip selecionado**: em vez de clarear o texto ou aumentar a fonte do chip (que é pequena, 14px, de propósito), usei o tom `ACCENT_PRESSED` (`#0031E7`) como fundo — já existia no sistema de estados da etapa 8, só não tinha esse uso. Com texto papel por cima, contraste sobe pra 7.3:1.
- **Texto de botão primário** (papel sobre azul base): sobe de 16px pra 19px/700 — cruza a faixa de "texto grande" do WCAG (que pede só 3:1, não 4.5:1), onde o contraste real (~4.3:1) passa com folga. Preferi isso a escurecer o preenchimento do botão, que já é a leitura mais correta de CTA primário no resto do produto.

**Microinteração** (bula do design engineering aplicada, não só cor): todo elemento tocável (`Button`, `Chip`) agora encolhe pra 0.97 na entrada do toque e volta na saída, via `Animated.timing` com `ease-out` (120ms entrando / 160ms saindo) — substitui o dim de opacidade genérico que existia antes. Sem biblioteca nova: usa o `Animated` nativo do React Native, não `react-native-reanimated` (já é dependência do projeto, mas a API mudou bastante entre versões maiores — não valia o risco de sintaxe desatualizada pra uma animação desse tamanho).

**Telas tocadas**:
- `app/src/components/ui.tsx` — kit de UI inteiro (tokens + `Button`/`Chip`/`Field`/`Card` + novo componente `Brand`, o lockup ícone+"FortEvo" pro topo de tela).
- `app/src/app/(app)/index.tsx` (home) — troca `<Title>FitApp</Title>` pelo lockup `<Brand />` de verdade.
- `app/src/app/(app)/resultado.tsx` (fluxo de treino/protocolo) — cor de texto hardcoded (`#111827`, ilegível no fundo novo) corrigida pro token `TEXT`.
- `app/src/app/sign-in.tsx` — copy da tela ("Bem-vindo de volta ao FitApp.") → "FortEvo".
- `app/src/app/_layout.tsx` — `<StatusBar style="light" />`.
- Novo asset: `app/assets/brand/mark-paper.png` (marca clara sobre transparente, pro lockup em `Brand`).

**O que eu NÃO toquei, de propósito**: o rename completo "FitApp"→"FortEvo" (nome do repo, `package.json`, `slug`, prefixos de log tipo `[FitApp]` em `useStorageState.ts`/`profileStore.ts`/`supabase.ts`, comentários de código) continua **fora de escopo** — é uma decisão pendente separada, maior que uma tela, documentada em `01-pesquisa-e-naming.md`. Troquei só a copy que o usuário efetivamente VÊ na tela (título da home, saudação do login), porque deixar "FitApp" escrito do lado do ícone novo da marca, bem na tela que essa etapa pediu pra brandear, seria pior que não mexer em nada.

**Validação**: `npx tsc --noEmit` limpo. `npx expo start --web` não roda neste ambiente sandboxed (proxy bloqueia a checagem de rede que o Expo CLI faz no boot, nada a ver com o código) — então a verificação visual foi feita com uma réplica estática (HTML/Playwright, mesmas cores/tokens/medidas) das 3 telas principais (home, resultado, um passo do intake com chips), só pra conferir visualmente antes de levar pro código de verdade. Print enviado no chat.

## Etapa 11 — Manual de marca (out/2026)

Consolidei tudo que estava espalhado nas etapas 6-10 (e a voz/nome de `01-pesquisa-e-naming.md`) numa referência única: `branding/manual/manual-de-marca.html`. Seis seções — marca (personalidade/posicionamento/nome), logotipo (construção, lockup, teste de legibilidade 64/32/16px, ícone de app, faça/não faça), cor (neutros + tabela completa dos 6 tokens do acento), tipografia (escala real tirada de `ui.tsx`, não inventada pra esse documento), voz (os 3 exemplos de calibração já aprovados) e aplicação (preview das telas reais, mesma estrutura/cor do app de verdade).

Não é um documento novo com decisões novas — é o ponto único de consulta pra quem (incluindo eu, em sessões futuras) precisar saber "qual o hex do pressed" ou "o logo pode ficar azul?" sem garimpar o histórico inteiro deste arquivo.

## Etapa 12 — Kit de marca (out/2026)

Os arquivos finais de exportação, na prática, já tinham saído prontos ao longo das etapas 9 e 11 (ícones do app, marca isolada em alta resolução, `favicon.ico`, manual em HTML/PDF) — só estavam espalhados em pastas diferentes do repo. Esta etapa empacotou tudo num único `.zip` autossuficiente, `branding/kit/fortevo-brand-kit.zip`, pra uso fora do repositório (site institucional, material impresso, qualquer pessoa que precise da marca sem clonar o projeto):

- `manual/` — `manual-de-marca.html` + `manual-de-marca.pdf`
- `marca-vetor/` — fonte vetorial: `fortevo-mark.svg` (marca isolada, cópia de `branding/logos/iterations/icon-14.svg`) e `fortevo-app-icon.svg` (composição aprovada do ícone de app, cópia de `appicon-14.svg`)
- `marca-raster/` — `favicon.ico`, marca em tinta 1024px e em papel 512px sobre transparente
- `app-icons/` — cópia de referência dos arquivos já integrados em `app/assets/`
- `README.md` — índice do kit + essencial de cor/regras de uso, pra quem abrir o zip sem contexto nenhum

Com isso, as seis etapas do branding (naming, identidade visual, ícone, telas, manual, kit) estão fechadas.

## Próximos passos

Nenhum item de branding em aberto no momento.
