# Branding — Etapa 1: entendimento do produto, pesquisa de mercado e naming

**Status: CONCLUÍDO.** Nome final: **Lastro.** Tom de voz aprovado. Este documento cobre as etapas 1-5 do processo de branding (entendimento do produto → pesquisa de concorrência → candidatos a nome → investigação específica do nome "FitApp" → comparação e recomendação), mais duas rodadas extras: seção 6 (exploração internacional de nomes) e seção 7 (nomes a partir de frases/gírias de treino + calibração de tom de voz) — até a decisão final na seção "Decisões fechadas". As etapas seguintes (direção criativa, logotipos, paletas, ícone, sistema visual, manual) continuam em `branding/02-identidade-visual.md`.

_out/2026._

---

## 1. Entendimento do produto

### O que já está definido (não é hipótese — vem do projeto)

- **Problema que resolve**: pessoas que já têm experiência de treino, mas não têm como pagar personal trainer ou assessoria particular.
- **Funcionalidades centrais**: cadastro que mapeia nível real (cruzando autodeclaração × tempo de treino), objetivo, limitações físicas, equipamento, consistência de treino e atividades físicas concorrentes; um motor de regras que gera um protocolo completo — divisão de treino (entre 7 estilos), volume por grupo muscular, periodização em blocos (por treinos completados, não por data de calendário), progressão de carga, seleção de exercício respeitando limitações e equipamento, e cardio (modalidade/frequência/duração).
- **Fora de escopo, decisão definitiva**: dieta e suplementação — ficam de fora porque exigem profissional e, além disso, dados sensíveis (peso, %BF) que a LGPD e a maioria dos usuários prefere não compartilhar.
- **Plataforma**: mobile iOS + Android (Expo/React Native); o site é só uma página de apresentação, o motor não roda nele.
- **Estágio atual**: motor validado, scaffold do app funcionando de ponta a ponta (cadastro → protocolo), ainda sem branding, pré-beta fechado.

### Hipóteses (minhas, não fatos — preciso da sua confirmação)

**Personalidade de marca.** A forma como este projeto foi construído até aqui — recusar features que exigiriam dado sensível, incorporar feedback real de personal trainer, preferir "sem meta específica" como resposta válida em vez de forçar todo mundo pra estética, nomear decisões como "definitivas" só depois de evidência — sugere uma marca que se apoia em **rigor e raciocínio, não em hype**. Minha hipótese de personalidade: competente, direta, confiável — mais "a lógica de um treinador de verdade, sistematizada" do que "motivação de internet" (sem abrir mão de energia; é sóbrio, não é clínico/frio).

Em termos mais concretos (reformulando depois de uma primeira pergunta que saiu abstrata demais): é a diferença entre um app que fala "VAMOS DESTRUIR ESSE TREINO 🔥💪" e um que fala "seu protocolo foi recalculado — nível reclassificado pra avançado com base no seu histórico". A hipótese é a segunda linha, não a primeira. **Ainda em aberto, aguardando você confirmar ou corrigir.**

**Modelo de negócio / registro de preço.** ~~Não está documentado...~~ **Respondido: o app será pago.** Isso ajusta a hipótese anterior de "acessível" (seção original) pra algo mais específico: não é bargain/gratuito, mas também não é luxo/exclusivo — é "ferramenta profissional que vale pagar, porque ainda é mais barato que contratar alguém" — o registro visual pode pesar mais pra sóbrio/confiável do que pra democrático/casual. Isso também favorece nomes com som mais "sério" (Lastro, Sinapse) sobre os mais lúdicos (Rumo).

## 2. Pesquisa de mercado e concorrência

Analisei Hevy, Strong e Fitbod diretamente (fetch das páginas oficiais) e Nike Training Club por fontes secundárias (a Nike não expõe copy de posicionamento da mesma forma no site do app).

| App | Proposta de valor | Público | Posicionamento | Identidade visual (o que dá pra confirmar) |
|---|---|---|---|---|
| **[Hevy](https://www.hevyapp.com)** | Registrar treino, montar rotina, acompanhar progresso; forte em social (seguir outros atletas) e relógio (Apple Watch/WearOS) | Do iniciante ao avançado — é um **rastreador** (logger), não gera protocolo | "#1" autoproclamado, 17M+ usuários, prova social agressiva (imprensa, nota 4.9) | Wordmark em preto (`logo-hevy-black`); tom energético/direto ("smash your goals", "Stay Accountable") |
| **[Strong](https://www.strong.app)** | Rastreador rápido, "mais simples e poderoso que um caderno"; foco em não ter fricção pra registrar | De quem levanta peso casualmente a powerlifter competitivo — também é um **logger** | Concorre com o caderno de papel, não com outro app; aposta em simplicidade extrema | Wordmark em caixa alta ("STRONG") com ícone; tom minimalista, frases curtas ("Think less. Lift more.") |
| **[Fitbod](https://fitbod.me)** | O mais próximo de nós: plano que se ajusta sozinho conforme você registra treino, recuperação e progresso | Foco declarado em treino de força especificamente (não fitness genérico); de intermediário a avançado, com porta de entrada pra iniciante | Evita a palavra "IA" — usa "algoritmo proprietário, baseado em ciência"; diferencial é ser **exclusivo pra força**, não um app fitness genérico | Sem cor/tipografia confirmável pelo texto; indício de rosa nos ícones de avaliação; tom confiante e direto ("LESS PLANNING. MORE PROGRESS.") |
| **Nike Training Club** | Treinos guiados em vídeo, por atletas/treinadores da Nike | Fitness geral, não especificamente quem já treina pesado | Marca-guarda-chuva da Nike — produção de altíssima qualidade, mas é conteúdo guiado, não geração de protocolo individualizado | Identidade herda a Nike: preto/branco, tipografia condensada bold, acabamento premium |

### Padrões e clichês identificados

- **Nomes**: curtos, uma ou duas sílabas-chave, geralmente descritivos da ação (Strong = força, Hevy = "heavy" sem o A, Fitbod = fit + body). Nenhum deles usa metáfora abstrata.
- **Visual**: predominância de preto/branco com um acento de cor única; tipografia em caixa alta, condensada, bold; ícone = wordmark ou monograma simples, sem ilustração.
- **Tom de voz**: imperativo, frases curtas, pouca pontuação, foco em ação ("Lift more", "Smash your goals").
- **Clichê de categoria** (nenhum dos quatro cai nele, mas é comum no segmento mais amplo): halteres, silhuetas musculosas, chamas — já descartado pelo seu próprio briefing.

### Onde está o espaço em aberto

Nenhum dos quatro **raciocina** sobre o seu treino da forma que o nosso motor faz: Hevy e Strong são loggers (você decide tudo, eles só registram); o Nike Training Club entrega conteúdo pronto, não individualizado; o Fitbod é o mais próximo — tem algoritmo que ajusta o plano — mas se posiciona explicitamente como "ferramenta de treino de força", não como algo que entende seu histórico, suas limitações físicas, seu equipamento disponível e sua consistência pra montar um plano de divisão + periodização + progressão como um treinador leria essa mesma informação.

Isso é a oportunidade real de diferenciação: **o produto não é um caderno digital nem um algoritmo genérico de ajuste — é mais parecido com a lógica de um treinador sendo seguida de verdade**, e a marca deveria comunicar "raciocínio/critério", não "mais um app de treino".

## 3. Naming: cinco candidatos

Os cinco abaixo evitam: nomes puramente descritivos da categoria, metáforas manjadas (halteres, chamas), e nomes já usados por concorrente direto. Todos funcionam em português (idioma principal do produto) com algum grau de legibilidade em inglês.

---

### 1. Lastro

- **Significado/origem**: palavra portuguesa pra "carga de estabilização" — o peso que mantém um navio equilibrado mesmo sob carga pesada.
- **Conceito**: estabilidade sob carga. Literalmente ressoa com "levantar peso" sem ser descritivo disso, e carrega a ideia de "base sólida" — oposto de achismo.
- **Relação com o produto**: o motor existe justamente pra substituir achismo por critério (cruzamento de nível, volume calculado, periodização real). "Lastro" é essa base.
- **Personalidade/percepção**: sóbria, confiável, adulta — bate com a hipótese de personalidade da seção 1.
- **Pronúncia em PT**: fácil, duas sílabas, sem ambiguidade.
- **Escrita/memorização**: fácil, curta, sem acento problemático.
- **Potencial internacional**: em inglês não significa nada (como "Strava" ou "Fitbod" não significam nada pra quem não sabe a origem) — funciona como nome próprio, não compete com a palavra inglesa "last" na pronúncia.
- **Diferenciação**: nenhum concorrente pesquisado usa metáfora de estabilidade/fundação.
- **Vantagens**: baixo risco aparente de conflito (não é palavra comumente usada como marca); tom certeiro com o posicionamento de rigor.
- **Desvantagens**: menos "óbvio" tematicamente que nomes ligados direto a treino — pode exigir uma linha de tag explicativa.
- **Ambiguidades**: nenhuma relevante identificada.
- **Potencial de logo/ícone**: boa — monograma "L" geométrico, ou um símbolo de base/ancoragem (sem cair em clichê de âncora náutica literal).

---

### 2. Forja

- **Significado/origem**: lugar onde o metal é moldado por calor e trabalho repetido até virar algo mais resistente.
- **Conceito**: transformação através de esforço disciplinado e repetido — bate com a lógica de bloco de periodização (o treino fica fixo, repetido, até o corpo de fato responder).
- **Relação com o produto**: cada bloco do motor é literalmente isso — repetição estruturada até a próxima reavaliação.
- **Personalidade/percepção**: forte, disciplinada, com peso simbólico claro — a mais "muscular" conceitualmente das cinco, mas sem ser ilustrativa (sem desenhar bigorna/martelo).
- **Pronúncia em PT**: fácil, nativa.
- **Escrita/memorização**: fácil.
- **Potencial internacional**: "Forge" existe em inglês com o mesmo significado — funciona nos dois idiomas quase sem perda.
- **Diferenciação**: nenhum concorrente pesquisado usa.
- **Vantagens**: metáfora imediatamente compreensível, boa carga emocional.
- **Desvantagens**: **risco real de conflito** — "Forja"/"The Forge" é um dos nomes de academia mais comuns do mundo (genérico dentro do próprio nicho fitness, mesmo não aparecendo nos 4 apps pesquisados).
- **Ambiguidades**: pode ser confundido com nome de academia física, não de app.
- **Potencial de logo/ícone**: boa — mas precisa fugir de martelo/bigorna pra não cair em clichê.

---

### 3. Sinapse

- **Significado/origem**: a conexão entre neurônios — onde a informação é processada e a decisão acontece.
- **Conceito**: o produto não é um registro passivo, é um sistema que decide (cruza nível, ranking de atividade, limitações, volume) — "Sinapse" é a metáfora mais literal do que o motor realmente faz.
- **Relação com o produto**: a mais precisa conceitualmente das cinco — é "o raciocínio por trás do seu treino", o diferencial que a pesquisa (seção 2) identificou como espaço em aberto.
- **Personalidade/percepção**: inteligente, precisa, um pouco mais "tech" que as outras — pode soar mais a software do que a treino.
- **Pronúncia em PT**: fácil.
- **Escrita/memorização**: fácil, mas uma sílaba a mais que os outros candidatos.
- **Potencial internacional**: "Synapse" é reconhecível globalmente (termo científico), boa portabilidade.
- **Diferenciação**: nenhum concorrente pesquisado usa esse campo semântico.
- **Vantagens**: comunica exatamente o diferencial real do produto (raciocínio, não rastreamento).
- **Desvantagens**: **risco de conflito maior fora do fitness** — "Synapse" é um nome comum em produtos de software/dados (ex: serviços de analytics corporativo) — pode soar mais B2B/SaaS do que app de treino.
- **Ambiguidades**: pode ser confundido com produto de neurociência/saúde mental, não treino físico.
- **Potencial de logo/ícone**: boa — permite símbolo geométrico abstrato (nó/conexão) sem clichê de treino.

---

### 4. Cadência

- **Significado/origem**: o ritmo de uma repetição ou de uma sequência de movimentos — termo que já existe dentro do próprio vocabulário de treino.
- **Conceito**: ritmo certo, nem acelerado nem parado — bate com o `restDayModel` (cadência mínima de descanso) e com a própria ideia de treino fixo por bloco em vez de troca aleatória a cada semana.
- **Relação com o produto**: é literalmente um termo que já aparece no vocabulário de musculação, então comunica categoria sem ser genérico.
- **Personalidade/percepção**: equilibrada, consistente, menos "agressiva" que Forja — boa pra quem valoriza constância sobre intensidade.
- **Pronúncia em PT**: fácil.
- **Escrita/memorização**: fácil, "Cadência" com acento pode perder o acento em domínio/handle (comum em nomes PT com acento).
- **Potencial internacional**: "Cadence" existe em inglês com o mesmo sentido — boa portabilidade.
- **Diferenciação**: nenhum concorrente pesquisado usa.
- **Vantagens**: termo nativo do vocabulário de treino, sem ser descritivo da categoria inteira (diferente de "Strong"/"Fitbod").
- **Desvantagens**: **conflito num setor adjacente** — "Cadence" é usado por sensores/computadores de ciclismo (ex: sensores de cadência da Wahoo) — mesmo não sendo um concorrente direto, pode gerar associação errada (ciclismo, não musculação).
- **Ambiguidades**: pode sugerir foco em cardio/ciclismo pra quem já conhece o termo nesse contexto.
- **Potencial de logo/ícone**: boa — permite motivo rítmico/ondulado geométrico sem ilustrar literalmente.

---

### 5. Rumo

- **Significado/origem**: direção, curso — a direção que se toma (como o rumo de um navio).
- **Conceito**: ter uma direção clara em vez de treinar no escuro — contraste direto com o "antes" do usuário-alvo (treinar sem orientação de verdade, por falta de personal).
- **Relação com o produto**: o protocolo gerado é literalmente isso — uma direção clara, calculada, pro período que a pessoa escolheu.
- **Personalidade/percepção**: direta, confiante, sem ser agressiva — a mais "acessível"/simples das cinco, boa pra hipótese de posicionamento não-premium da seção 1.
- **Pronúncia em PT**: muito fácil, uma palavra curta e comum.
- **Escrita/memorização**: muito fácil.
- **Potencial internacional**: não significa nada em inglês — funciona como nome próprio (mesmo caso de "Lastro"), mas é foneticamente mais simples de pronunciar pra falante não-nativo.
- **Diferenciação**: nenhum concorrente pesquisado usa.
- **Vantagens**: curtíssimo, fácil em qualquer mídia (ícone, redes sociais, boca a boca).
- **Desvantagens**: é uma palavra do dia a dia (menos "distintivo" por si só que Lastro/Sinapse) — maior chance de já existir alguma marca pequena/regional usando (não identificada na pesquisa, mas o risco de palavra comum é estruturalmente mais alto).
- **Ambiguidades**: nenhuma relevante — é uma palavra sem carga negativa.
- **Potencial de logo/ícone**: boa — permite seta/vetor de direção estilizado, mas precisa fugir do clichê óbvio de seta de "progresso" que todo app de produtividade usa.

## 4. Investigação específica: "FitApp"

**O que encontrei:**

- Existe um app real e ativo chamado literalmente **"FitApp"** (listado como "Running Tracker App – FITAPP") tanto na [Apple App Store](https://apps.apple.com/us/app/running-tracker-run-app-fitapp/id1015819468) quanto na Google Play (`com.fitapp`), operado por uma empresa chamada **FITAPP GmbH** (Alemanha). O produto é um rastreador de corrida, não de musculação — categoria adjacente, não idêntica, mas dentro do mesmo guarda-chuva de saúde/fitness nas duas lojas.
- A FITAPP GmbH aparece como empresa registrada em bases de informação de empresas/startups (Crunchbase, CBInsights) — ou seja, não é um app amador isolado, é uma empresa constituída usando esse nome.
- O domínio `fitapp.com` parece estar em uso ativo (o `robots.txt` do site bloqueou minha tentativa de leitura automática, o que geralmente indica um site operacional, não um domínio estacionado/à venda) — **não consegui confirmar o conteúdo nem o proprietário** por essa via.
- Não encontrei um perfil claramente identificável como "@fitapp" nas redes sociais nos resultados de busca — mas busca de disponibilidade de @handle não é confiável por busca comum, precisa de verificação direta em cada rede.
- **Não consultei a base do INPI diretamente** — não tenho uma ferramenta que envie uma consulta formal ao sistema de busca de marcas do INPI (é um formulário interativo, não uma página estática). Isso significa que não posso confirmar nem descartar pedido de registro no Brasil especificamente — é uma verificação que só uma busca formal (direto no INPI ou por profissional da área) resolve.

**Diferenciação entre os tipos de achado** (pra não confundir "existe um app" com "o nome está livre"):

| Pergunta | Resposta |
|---|---|
| Existe um app com esse nome? | Sim — FITAPP GmbH, rastreador de corrida, nas duas lojas. |
| O domínio está disponível? | Provavelmente não (indício de uso ativo) — não confirmado com certeza. |
| O @handle está disponível nas redes? | Não verificado de forma confiável. |
| Existe registro de marca? | Não verificado (sem acesso a busca formal INPI ou internacional). |
| É juridicamente viável adotar o nome? | Não posso avaliar isso — exige profissional qualificado em propriedade industrial. |

**Avaliação de risco: ALTO.** Mesmo sem a confirmação formal de marca registrada, já há uma empresa constituída operando um app com o nome exato "FitApp" em ambas as lojas, na mesma categoria ampla (saúde/fitness). Isso é o tipo de conflito que o seu próprio briefing pediu pra eu identificar antes de tratar um nome como seguro. **Recomendação: não levar "FitApp" como candidato real pra marca final** — ele deve continuar como o nome interno do repositório/projeto (já é, e trocar isso não é urgente), mas não como o nome publicado pro usuário final. Ele não entra na tabela comparativa da seção 5 por esse motivo — o próprio briefing orienta incluí-lo só se fizer sentido como candidata após a pesquisa, e aqui não faz.

## 5. Comparação e recomendação

Escala 1-10. Nenhuma nota de risco de conflito é tratada como definitiva — todas dependem de busca formal antes de qualquer decisão final.

| Critério | Lastro | Forja | Sinapse | Cadência | Rumo |
|---|---|---|---|---|---|
| Adequação ao produto | 8 | 7 | 9 | 8 | 7 |
| Originalidade | 8 | 5 | 7 | 7 | 6 |
| Memorabilidade | 7 | 8 | 7 | 7 | 8 |
| Facilidade de pronúncia/escrita | 8 | 9 | 8 | 7 | 9 |
| Potencial de construção de marca | 8 | 7 | 7 | 7 | 7 |
| Diferenciação competitiva | 8 | 6 | 8 | 7 | 7 |
| Adequação internacional | 7 | 8 | 8 | 8 | 6 |
| Risco preliminar de conflito (10 = baixo risco) | 8 | 4 | 6 | 6 | 6 |
| Potencial pra identidade visual | 7 | 7 | 8 | 7 | 6 |
| **Total (/90)** | **69** | **61** | **67** | **64** | **62** |

**Recomendação: Lastro** como principal, **Sinapse** como segunda alternativa.

- **Lastro** vence porque combina boa aderência conceitual, personalidade certa (sóbria, sem hype — bate com a hipótese da seção 1) e o menor risco aparente de conflito das cinco (não é um nome usado como marca em nenhum lugar que a pesquisa encontrou, nem é uma palavra tão comum quanto "Rumo").
- **Sinapse** é, estrategicamente, a mais fiel ao diferencial real identificado na pesquisa de mercado (é a única que nomeia o "raciocínio" do produto, não só a "força" ou "disciplina") — fica em segundo por carregar risco de soar mais a software corporativo do que a app de treino, e por ter mais concorrência de nome fora do nicho fitness.
- **Forja** é a opção mais "ousada"/com carga emocional mais forte, mas tem o maior risco de conflito das cinco (nome de academia extremamente comum) — não recomendo como principal por esse motivo específico, não por falta de qualidade conceitual.

**O que ainda precisa ser verificado antes de qualquer decisão final** (vale pra Lastro e Sinapse, não só pra FitApp):

- Busca formal de marca no INPI (e, se houver ambição internacional, USPTO/EUIPO) — não fiz essa consulta, só busca geral na web.
- Disponibilidade real de domínio (`.com`, `.com.br`, `.app`) e de @handle nas redes relevantes (Instagram, TikTok) pro nome escolhido.
- Teste de pronúncia/reação informal com algumas pessoas do público-alvo, já que isso é subjetivo por natureza e eu não consigo validar reação humana.

---

## 6. Exploração internacional (após feedback: você gostou de Lastro e Forja, pediu pra olhar outras línguas)

Testei dois caminhos: (a) o equivalente direto de Forja em inglês e italiano, já que "pensar internacional" pra um nome de conceito forte normalmente significa checar a tradução óbvia primeiro; (b) uma rodada nova de candidatos com raiz latina/internacional, no mesmo campo semântico dos cinco originais (força, precisão, direção, núcleo).

### Forja → o equivalente inglês já está tomado, de verdade

"Forge" (o equivalente óbvio em inglês) não é só um nome de academia genérico como eu já tinha apontado — é pior do que isso pra uso internacional: encontrei **múltiplos apps de treino já publicados com esse nome** ("[Forge - Training](https://apps.apple.com/us/app/-/id6757342999)", "Forge AI Workout Trainer", "Workout Forge for Home and Gym", "Forge Strength Trainer", "FORGE - Zero Decision Training", "Forge - Social Gym Tracker") e **marcas registradas nos EUA** em nome de empresas de fitness ("[Forge Fitness, LLC](https://trademarks.justia.com/owners/forge-fitness-llc-2714835)", "Forged Fitness Concepts, LLC"). Pensar em mercado internacional torna Forja **mais arriscado**, não menos — é justamente no mercado americano/inglês que esse nome já está saturado. Testei a variante italiana **Fucina** (= forja/fundição em italiano) como alternativa que mantém o conceito: não encontrei nenhum app ou marca de fitness usando esse nome, soa distinto, e línguas latinas "exóticas" têm precedente como nome de marca (do jeito que Illy, Ferrari soam premium por som mesmo fora da Itália). Pronúncia pra falante de português é razoável (fu-SI-na). Se o conceito de "forjar/transformar pelo esforço repetido" é o que você não quer perder, **Fucina é a forma de manter essa ideia sem herdar a saturação do inglês.**

### Lastro segue limpo mesmo testando mais fundo

Não achei nenhum app ou empresa de fitness usando Lastro, nem equivalentes diretos (Lastre em espanhol, Ballast em inglês) nesse nicho. Um ponto de atenção que encontrei, mas não consegui confirmar com uma fonte forte — então trato como hipótese linguística, não fato: em espanhol, "lastre" aparece usado tanto no sentido neutro (lastro de navio) quanto, informalmente, como "peso que atrapalha" (ex: "ser un lastre para alguien"). Em português o uso é quase sempre neutro/positivo (lastro financeiro, base). **Vale confirmar com um nativo de espanhol antes de fechar**, porque é exatamente o tipo de nuance que eu não tenho como validar com certeza numa busca.

### Outros nomes testados nesta rodada (raiz latina/internacional)

| Nome | Origem/conceito | Veredito |
|---|---|---|
| Vector | Latim — grandeza + direção | **Descartado**: múltiplos apps de treino já existentes ("Vector Strength Training", "VECTOR Limitless Training", "Vector Fitness"). |
| Axis / Eixo | Latim — eixo central, pivô | **Descartado**: múltiplos apps já existentes ("Axis Fitness + Training", "Axis Fitness Method"). |
| Anima | Latim — alma/força vital | **Descartado**: nicho de bem-estar/meditação saturado, inclusive com marca registrada ("ANIMA" nos EUA) — risco de confusão de categoria (meditação, não força). |
| Fortis | Latim — forte/corajoso | **Arriscado**: usado globalmente em saúde/seguros (Fortis Healthcare, seguradoras), e carrega associação negativa específica na Holanda/Bélgica (o banco Fortis quebrou em 2008 e o nome foi abandonado por causa disso). |
| Temper / Têmpera | Inglês/PT — tratamento térmico que torna o metal mais resiliente (etapa seguinte à forja) | **Moderado**: existe "Tempered Strength" (app próximo, não idêntico) — não é um bloqueio claro, mas não é tão limpo quanto Lastro. Conceitualmente interessante (é a etapa de refinamento depois da forja), mas não pesquisei a fundo. |
| Robur | Latim — carvalho / robustez | **Inconclusivo, mas sem conflito claro encontrado** — nome pouco comum, vale olhar com mais profundidade se interessar. |
| Metron / Ferrum | Grego (medida) / Latim (ferro) | **Inconclusivo** — a busca não trouxe nada definitivo em nenhum dos dois sentidos; existe pelo menos um app chamado "Ferrum" (categoria não confirmada). Precisariam de mais uma rodada de pesquisa dedicada se você quiser levá-los a sério. |

### Leitura dessa rodada

O padrão que apareceu: **quase toda palavra forte e "óbvia" em inglês relacionada a força/estrutura (Forge, Vector, Axis, Fortis) já foi usada por algum app ou empresa de fitness** — é exatamente pelo mesmo motivo que elas parecem boas (todo mundo que monta um app de treino em inglês chega nas mesmas palavras). Isso torna **Lastro mais forte, não mais fraco**, depois dessa rodada: continua sem conflito aparente, e funciona do mesmo jeito que "Strava" ou "Oura" funcionam internacionalmente — como nome próprio que não compete com busca de palavra comum em nenhum idioma relevante.

**Recomendação atualizada**: manter **Lastro** como principal. Se quiser preservar o conceito de "Forja" com ambição internacional, **Fucina** é a alternativa que resolve o problema de saturação em inglês sem abandonar a ideia. Nenhum dos nomes testados nesta rodada superou os dois.

---

## 7. Exploração: nomes a partir de frases/gírias ditas na hora do treino

Você pediu pra olhar frases faladas de verdade durante a musculação ("1 more rep"/"1MR", "até a falha"...) como fonte de nome, em vez de uma palavra-conceito isolada. Fui atrás de referências reais (não inventei vocabulário) em três fontes: um glossário de gíria de treino em inglês, uma matéria brasileira sobre "academês", e um dicionário fitness em português.

### O vocabulário real que encontrei

**Esforço/repetição/série (inglês, [Garage Gym Reviews](https://garagegymreviews.com/gym-lingo))**: AMRAP, rep, set, drop set, superset, TUT (time under tension), half rep, ROM, cheating (usar embalo), concêntrico/excêntrico, ATG ("ass to grass" — descer até o fim), all you (incentivo pra terminar sem ajuda), brace (travar o core antes de uma carga pesada), spot, pump, DOMS, RPE/RIR, deload, plateau, gains, PR/PB.

**Esforço/repetição/série (português, [matéria sobre "academês"](https://www.gazetasp.com.br/gazeta-mais/as-academias-tem-idioma-proprio-voce-fala-academes/) e [dicionário fitness](https://www.drogaraia.com.br/blog/atividade-fisica/musculacao/dicionario-fitness))**: carga, reps, série, falha ("segura na falha"), progressão, "3×12", "RPE 7", 1RM, PR. Frases/sinais de comunicação entre quem treina: "quantas faltam?", "dá uma ajuda na última?", aceno discreto pra revezar, polegar pra cima. A matéria brasileira explicitamente **não cobriu gritos de incentivo** ("vai!", "mais uma!", "solta!") — não achei uma fonte confiável catalogando isso especificamente, então não vou tratar essas frases de incentivo como testadas, só como vocabulário do dia a dia que todo mundo reconhece.

### O que descobri testando os candidatos específicos que você deu

- **"1 more rep"**: **já é nome de app, várias vezes.** Existe literalmente um app chamado "[One More Rep](https://apps.apple.com/ca/app/one-more-rep/id6480523240)", e outro "OneMoreRep" com várias variantes — incluindo uma versão já localizada em espanhol ("OneMoreRep: Entrenamiento AI"). Não sobra espaço pra usar essa frase como nome.
- **"1MR"**: o problema aqui não é concorrência — é confusão. **"1RM" já é um termo técnico universal e diferente** (carga máxima pra 1 repetição, não "falta 1 repetição") — confirmado nos dois glossários que li, inglês e português, e há apps literalmente chamados "[1RM Max Calculator](https://apps.apple.com/app/id1110502852)"/"One Rep Max". "1MR" fica visualmente a uma letra de distância de "1RM" — pro público-alvo (gente que já treina e já conhece "1RM" de cor), isso tem boa chance de ler como erro de digitação do termo errado, não como uma sigla nova e espirituosa.
- **"Até a falha" / "to failure"**: a frase em si parece livre como nome — não achei nenhum app chamado assim. Mas o **conceito** (o app saber quando você chegou na falha muscular de verdade) já é o produto inteiro de um app chamado "[Riven](https://www.producthunt.com/products/riven-reach-muscle-failure/launches/riven-3)" (usa o Apple Watch pra detectar falha). Não é um bloqueio de nome, mas vale saber que a ideia-conceito já tem uma bandeira fincada, mesmo com nome diferente.
- **Testei também "Deload" e "Rack"** (ambos vocabulário real e menos óbvio que "1 more rep"): os dois também já são nome de app — "[Deload](https://apps.apple.com/ca/app/deload/id6760390668)" existe como app standalone, e "Rack" aparece em pelo menos quatro apps diferentes ("RackCoach", "Rackd Life", "Rack Strength", "Fit Rack").

### Padrão que se repete (terceira vez que isso acontece nesta pesquisa)

Toda palavra ou frase de treino curta, autêntica e "óbvia" que testei — em qualquer idioma, seja conceito abstrato (Forge, Vector, Axis) ou gíria real de academia (One More Rep, Deload, Rack) — **já está em uso por algum app**. Isso não é falta de sorte: é o motivo pelo qual essas palavras parecem boas pra todo mundo que monta um app de treino. O espaço de "palavra-nome única e óbvia" no nicho de fitness já está bem ocupado.

**Minha leitura**: esse vocabulário de treino que você trouxe é ótimo — só acho que ele tem mais valor como **tom de voz/copy do app** (como o app fala com você: "até a falha", "mais uma", "PR!") do que como nome da marca em si. Isso também conecta com sua resposta da pergunta 1 abaixo: dá pra manter Lastro (ou Fucina) como nome, e usar justamente essas frases reais de treino no microcopy — notificação, tela de resultado, botão — pra garantir que o app "fale a língua" de quem já treina, sem precisar que o NOME sozinho carregue essa autenticidade (e sem brigar com apps que já usaram a frase como nome).

Se quiser insistir em achar uma frase-nome específica ainda não usada, posso ir mais a fundo em termos menos óbvios do glossário que não testei ainda (Brace, All You, TUT, ATG, RIR) — mas o padrão acima é forte o suficiente pra eu recomendar não apostar nessa linha como nome principal.

### Tom de voz — calibrando com sua resposta

Você confirmou: tom de "protocolo recalculado", mas menos formal. Pra garantir que entendi o ajuste certo, três exemplos de como isso ficaria na prática, incorporando o vocabulário de treino desta seção:

- Formal demais (não é isso): *"Seu protocolo foi recalculado. O nível foi reclassificado para avançado com base no histórico informado."*
- Calibrado (o que acho que você quer): *"Recalculamos seu protocolo — pelo seu histórico, você já é avançado."* / *"Bateu PR? Hora de ajustar a carga."* / *"Chegou na falha antes do esperado — vamos revisar o volume."*
- Informal demais (provavelmente não é isso): *"Mano, você tá voando! 🔥 Partiu subir de nível!"*

Se o meio bate, sigo com esse registro pra qualquer copy futura (telas, notificações, nomes de estado do protocolo).

---

### Decisões fechadas (out/2026)

1. **Tom de voz**: aprovado o registro do meio ("Recalculamos seu protocolo — pelo seu histórico, você já é avançado." / "Bateu PR? Hora de ajustar a carga.") — nem o formal ("protocolo foi recalculado... reclassificado"), nem o informal-hype ("Mano, você tá voando! 🔥"). Esse é o registro de copy pra qualquer tela, notificação ou nome de estado a partir de agora.
2. **Modelo de negócio**: pago.
3. **Nome**: **Lastro.** Decisão fechada pelo Fabio em out/2026, depois de duas rodadas de exploração (internacional e vocabulário de treino) que só reforçaram essa escolha — nenhum concorrente encontrado, personalidade certa, baixo risco aparente de conflito.

As etapas 6-16 (direção criativa, logotipos, paletas, matriz, ícone, sistema visual, manual e arquivos finais) continuam em `branding/02-identidade-visual.md`.

**Pendência que não bloqueia o trabalho visual, mas precisa de decisão do Fabio em algum momento**: o repositório, os pacotes (`app/package.json`, `app.json`) e todos os documentos (README, legal/, docs/) ainda dizem "FitApp" — isso é só o nome de trabalho até aqui. Trocar tudo pra "Lastro" é uma tarefa mecânica que posso fazer quando o Fabio quiser (inclusive o nome do repositório no GitHub, se ele topar) — não fiz ainda porque não foi pedido e prefiro não misturar um rename grande no meio do trabalho de identidade visual sem confirmar.
