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

## Como decidir a partir daqui

- Qual dos 5 conceitos SVG parece mais "FortEvo" — ou dá pra combinar peças de mais de um (ex: o ícone do 5 como app icon, com o 1 ou 3 como wordmark principal)?
- O conceito 3 (F negativo) é o mais "achado"/trabalhado, mas também o que mais perde detalhe em tamanho pequeno — vale esse troca, ou prefere um dos mais robustos (1 ou 4)?
- Alguma direção da etapa 6 (revelar a emenda Fort/Evo em vez de símbolo externo) que você queira revisitar antes da paleta de cores?

## Próximos passos (etapas 8-16, não iniciados)

Estudo de cor → 5 paletas → matriz logotipo×paleta (5×5) → ícone do app → telas-conceito → manual de marca → arquivos finais de exportação.
