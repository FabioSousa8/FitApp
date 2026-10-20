# Branding — Etapa 1: entendimento do produto, pesquisa de mercado e naming

**Status: NOME FECHADO (out/2026).** Nome final: **FortEvo** (grafia com F e E maiúsculos — estilização pedida pelo próprio Fabio, não é erro de digitação). Tom de voz continua aprovado (seção 7). O nome tinha sido fechado em Lastro, foi reaberto (seção 8) e passou por duas rodadas de nomes inventados (seção 9: portmanteau multilíngue, depois variações de Fortis/Evo) até fechar em FortEvo — ver o fim da seção 9 e "Decisões fechadas". Este documento cobre as etapas 1-5 do processo de branding (entendimento do produto → pesquisa de concorrência → candidatos a nome → investigação específica do nome "FitApp" → comparação e recomendação), mais quatro rodadas extras: seção 6 (exploração internacional de nomes), seção 7 (nomes a partir de frases/gírias de treino + calibração de tom de voz), seção 8 (reabertura: avaliação de 5 novos candidatos) e seção 9 (nomes inventados/portmanteau multilíngue — decisão final: FortEvo). As etapas seguintes (direção criativa, logotipos, paletas, ícone, sistema visual, manual) continuam em `branding/02-identidade-visual.md` — **as 5 propostas de logotipo já publicadas lá foram construídas em torno da palavra "LASTRO" e precisam ser refeitas pra "FortEvo"**; isso ainda não foi feito (ver pendência no fim deste arquivo).

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

## 8. Reabertura da decisão de nome (out/2026)

Depois de alguns dias observando a decisão, o Fabio voltou com uma objeção de fundo, não um capricho estético: **Lastro soa pesado e estático — não comunica evolução/crescimento**, que é algo que ele acha que o app deveria transmitir. É uma crítica válida e vale agir sobre ela — "lastro"/"sinapse" e os outros quatro candidatos do round 1 realmente foram todos escolhidos buscando *sobriedade/critério*, não *trajetória/progresso*. Ele trouxe 5 candidatos novos: **Apex, Forge (ou FORG3), E.X, HyperFit, Fine-Tune**. Testei os 5 com o mesmo rigor das rodadas anteriores (busca de conflito real, não suposição) antes de dar minha opinião.

### O que a pesquisa encontrou

**Apex** — risco de conflito **altíssimo**, o pior já encontrado até aqui, e não só no fitness: existem múltiplas marcas registradas nos EUA especificamente de academia/fitness usando "Apex" ([APEX FITNESS GROUP VIRTUAL GYM](https://trademark.justia.com/760/91/apex-fitness-group-virtual-gym-76091504.html), [APEX FIT](https://trademarks.justia.com/977/36/apex-97736617.html), [APEX FITNESS INC](https://trademarks.justia.com/owners/apex-fitness-inc-583808), [Apex Predator Fitness LLC](https://trademark.justia.com/owners/apex-predator-fitness-llc-2586159), [JB APEX FITNESS](https://trademarks.justia.com/902/47/jb-apex-90247859.html), [ATHLETIC APEX](https://trademarks.justia.com/850/93/athletic-apex-85093200.html)), além de um app já publicado chamado **[APEX AI TRAINING](https://apps.apple.com/us/app/-/id6761805344)**. Fora do fitness, "Apex" é literalmente o nome da linguagem de programação proprietária da Salesforce — uma colisão de busca relevante justamente no público tech/dev que você também frequenta. E há uma tensão conceitual: "ápice" é um ponto único, o topo — é mais sobre **chegar**, não sobre o processo de **subir**. Pra quem quer "evolução", é uma palavra que descreve o destino, não a jornada.

**Forge / FORG3** — confirma e piora o que já tínhamos achado na seção 6: além dos apps já listados lá, encontrei agora também **[Forge Fitness and Nutrition](https://apps.apple.com/us/app/id1594672878)**, **[Forge Strength Trainer](https://apps.apple.com/app/id6765519720)**, **[Forge Programming](https://apps.apple.com/dk/app/forge-programming/id6742332388)**, **[Forge - Social Gym Tracker](https://apps.apple.com/us/app/-/id6745174764)**, **[FORGE - Zero Decision Training](https://apps.apple.com/us/app/forge-zero-decision-training/id6758532263)**, **ForgeFit**, **Forge: Strength Coach** e **[Forge AI Workout Trainer](https://apps.apple.com/app/id6759990122)** — é, de longe, o nome mais saturado de todo o processo até agora. "FORG3" (com o 3 no lugar do E) resolve o problema de string exata pra domínio/@handle, mas não resolve a colisão falada/de busca (quem procura "forge workout app" cai no meio de uma dúzia de concorrentes) nem muda a leitura como "mais um app de treino chamado Forge". Dito isso — conceitualmente, é o único dos 5 que entrega de verdade a ideia de transformação/evolução pela repetição estruturada que bate com a lógica de bloco do motor.

**E.X** — aqui o problema não é só conflito (não achei nenhum app chamado assim de forma confiável), é a mecânica do nome em si: "E.X" falado é ambíguo (letra por letra? "eks"?), o ponto no meio provavelmente é descartado por qualquer @handle/domínio (viraria só "EX", que é uma string de duas letras — um dos espaços mais disputados que existe, justamente por ser curto demais pra ser distintivo). E em inglês, "ex-" como prefixo isolado lê como "ex-namorado", "ex-funcionário" — **o oposto exato** do que você está buscando (é sobre algo que acabou, não sobre crescimento).

**HyperFit** — risco de conflito confirmado e direto: existe **marca registrada nos EUA** chamada **[HYPERFIT](https://trademarks.justia.com/869/23/hyperfit-86923754.html)**, além de apps publicados como **[HyperFitness Club / HyperFitness by Hyperhuman](https://apps.apple.com/app/id6477295982)** e referências a academias usando o nome. Tem também um problema de adequação ao produto: "hiper" + "fit" puxa a marca pra estética/alta intensidade especificamente — mas o motor atende 4 categorias de objetivo igualmente (hipertrofia, força, emagrecimento/recomposição, saúde geral sem meta estética). Um nome assim sub-representa 3 dos 4 públicos reais do app — é exatamente o padrão "nome descritivo da categoria" que a própria seção 3 (rodada 1) já tinha decidido evitar.

**Fine-Tune** — o único dos 5 sem conflito de fitness encontrado na busca (mesma ressalva de sempre: busca geral, não é registro formal no INPI/USPTO). Adequação ao produto é forte, de verdade: bate exatamente com o público real (gente que já treina, não precisa aprender a fazer agachamento, precisa de ajuste fino de volume/intensidade/periodização — é literalmente o que o motor faz nas fronteiras de bloco). Mas tem duas ressalvas importantes: (1) **"fine-tuning" é um termo hoje muito associado a IA/ML** (ajuste fino de modelo) — pro seu público mais tech-aware isso pode ler como "ferramenta de IA", não "lógica de personal trainer"; (2) e o ponto mais relevante pra essa reabertura — **"ajuste fino" também não é "evolução/crescimento"**. É uma palavra de precisão, não de trajetória — na prática, troca a "sobriedade estática" do Lastro por uma "sobriedade estática" diferente, só que menos abstrata.

### Comparação com a mesma régua da seção 5

| Critério | Apex | Forge/FORG3 | E.X | HyperFit | Fine-Tune |
|---|---|---|---|---|---|
| Adequação ao produto | 5 | 8 | 4 | 3 | 9 |
| Originalidade | 2 | 3 | 4 | 2 | 6 |
| Memorabilidade | 8 | 7 | 4 | 6 | 5 |
| Facilidade de pronúncia/escrita | 9 | 7 | 3 | 8 | 6 |
| Potencial de construção de marca | 5 | 7 | 4 | 4 | 6 |
| Diferenciação competitiva | 2 | 1 | 5 | 2 | 7 |
| Adequação internacional | 6 | 6 | 3 | 5 | 6 |
| Risco preliminar de conflito (10 = baixo risco) | 2 | 1 | 5 | 2 | 7 |
| Potencial pra identidade visual | 5 | 7 | 6 | 5 | 5 |
| **Total (/90)** | **44** | **47** | **38** | **37** | **57** |

Pra referência: Lastro tinha **69/90** e até Forja (a pior opção do round 1, descartada por risco) tinha **61/90**. **Nenhum dos 5 novos candidatos bate a régua usada até aqui** — 3 deles (Apex, Forge, HyperFit) têm o pior risco de conflito documentado em todo o processo, E.X tem problema estrutural de mecânica de nome (não é só conflito), e o melhor do grupo (Fine-Tune, 57/90) é mais limpo mas não resolve o motivo real da reabertura: ele troca uma sobriedade por outra, não entrega a sensação de evolução/crescimento que você está buscando.

### Minha leitura honesta

Sua crítica ao Lastro é legítima e acho que vale agir sobre ela — mas, testados a sério, nenhum destes 5 é a resposta certa: os dois que **realmente** carregam a ideia de evolução (Apex, Forge) são justamente os dois com pior risco de conflito já visto neste processo inteiro — pela quarta vez, a palavra óbvia pro conceito óbvio já está ocupada. E.X tem problema de mecânica mesmo sem conflito. HyperFit estreita o público. Fine-Tune é o único estruturalmente são, mas é precisão, não trajetória — não é por aí que a sua objeção original aponta.

Dois caminhos práticos a partir daqui (sua escolha, não vou decidir por conta própria):

1. **Abrir uma 4ª rodada dedicada** especificamente ao campo semântico de evolução/trajetória/crescimento (ascensão, momentum, composição, salto, trajeto) — com a mesma pesquisa de conflito de verdade antes de qualquer recomendação, do jeito que fizemos pras rodadas anteriores.
2. **Reconsiderar o peso dos critérios**: se "sensação de evolução" for mais importante pra você do que risco de conflito baixo, Forge com uma variação gráfica/ortográfica mais distinta que FORG3 ainda pode valer uma rodada de pesquisa mais profunda (domínio, @handle, INPI) antes de descartar — só não recomendo isso sem essa verificação, dado o volume de concorrência direta já encontrado.

## 9. Nomes inventados/portmanteau multilíngue (out/2026)

Novo pedido do Fabio: em vez de palavras reais de um idioma (o que gerou o problema repetido nas seções 3, 6 e 8 — toda palavra real óbvia já está em uso), construir **nomes inventados por fusão de duas palavras/raízes** — o exemplo dado foi "HYROX" (híbrido + rockstar, na leitura do Fabio). A lógica é sólida: uma palavra inventada não compete por busca com nenhuma palavra de dicionário, então a chance de colisão cai estruturalmente — é a mesma razão pela qual "Strava", "Oura" e "Fitbod" funcionam bem.

Testei 8 candidatos combinando raízes de grego, italiano, latim, espanhol e árabe (nos pedidos do Fabio) com sonoridade curta e moderna, cada um já passado por busca de conflito real antes de entrar na lista final — não é só brainstorm.

### Limpos (nenhum conflito direto encontrado)

- **Auxora** — grego *auxein* (crescer; é a raiz de "auxina", o hormônio vegetal de crescimento) + terminação "-ora" (ressoa com "aurora", novo começo). Crescimento + recomeço — bate bem com a ideia de evolução contínua.
- **Slanzo** — italiano *slancio* (impulso, arremesso, o "ímpeto" de avançar). É literalmente a palavra de "momentum" em italiano, só com grafia levemente adaptada. É o mais direto dos 4 em termos de "soa a evolução".
- **Trajex** — latim *trajetória* + terminação "-ex" (moderna, forte). Comunica "percurso/arco de progresso" — bate com a lógica real do motor (periodização em blocos = trajetória calculada). Ressalva que não é de conflito: "-ex" é um padrão de nome de startup/SaaS genérico (Apex, Nexus, Vertex...) — pode soar menos "fitness" e mais "softwarezinho corporativo".
- **Numora** — tentativa com raiz árabe: *numuw* (نمو, crescimento) + "-ora". **Preciso avisar**: não tenho como confirmar a transliteração/conotação com certeza sem um falante nativo de árabe — é a mesma ressalva que fiz pra "lastre" em espanhol na seção 6. Se este te interessar, vale confirmar antes de levar a sério.

### Com ressalva (achei algo próximo, não é bloqueio claro)

- **Impulsa** — espanhol/italiano *impulso* (impulso, empurrão pra frente). Não achei "Impulsa" diretamente, mas existem marcas registradas de fitness bem próximas na escrita: "[IMPULSE FITNESS CENTERS](https://trademark.justia.com/737/03/impulse-fitness-centers-73703520.html)" e "[IMPULSE (QINGDAO) HEALTH TECH](https://trademarks.justia.com/owners/impulse-qingdao-health-tech-ltd-2366790)" — uma letra de distância, mesma categoria.
- **Vertyx** — latim *vertere* (virar/mudar, raiz de "vértice"/"virada") + "-yx". Não achei conflito de escrita, mas "Vertyx" falado é quase idêntico a **Vertex** — empresa de software fiscal de capital aberto (ticker VERX) — colisão fonética real, mesmo sem colisão de grafia.

### Descartados

- **Kinetra** — grego *kinesis* (movimento) + "-tra". Existe uma **marca registrada nos EUA, pendente desde dez/2024**, chamada exatamente "[KINETRA](https://trademarks.justia.com/989/11/kinetra-98911130.html)" — Classe 028 (artigos de ginástica/esporte), cobrindo halteres, kettlebell, banco, esteira, remo — ou seja, equipamento de fitness, categoria adjacente direta. Bloqueio real, não especulativo.
- **Saltra** — latim *saltare* (saltar, progredir em saltos — ligação boa com a lógica de bloco/nível do motor). Existe uma marca japonesa de salgadinho chamada exatamente "SALTRA" — categoria completamente diferente (alimentos), risco de confusão baixo, mas a string exata já está em uso globalmente.

### Minha leitura

A estratégia de inventar o nome (em vez de usar palavra real) é, estruturalmente, a correção certa pro problema que se repetiu nas três rodadas anteriores — **Auxora**, **Slanzo** e **Trajex** saíram limpos numa busca real, o que não aconteceu com quase nenhum candidato de palavra-real testado até aqui (só Lastro e Sinapse tiveram esse resultado, nas rodadas 1 e 2). Dos três, **Slanzo** é o que mais entrega a sensação de evolução/momentum que motivou a reabertura — é literalmente a palavra italiana pra isso. **Auxora** tem a camada extra do crescimento biológico (auxina) escondida, legível só pra quem for pesquisar, o que pode ser um ponto a favor (profundidade) ou contra (ninguém vai pescar isso sem explicação).

Nenhuma dessas 3 passou por busca formal de marca (INPI/USPTO) nem verificação de domínio/@handle — mesma ressalva de sempre, mas o sinal preliminar é o melhor de toda a pesquisa até agora.

Posso abrir mais uma rodada de combinações (grego+latim, árabe+inglês, etc.) se quiser mais opções antes de decidir, ou já seguimos com os 3 limpos pra uma verificação mais profunda (domínio, @handle, INPI) antes de escolher.

### Auxora/Numora soam a wellness, não a treino — ajuste de som (out/2026)

Feedback do Fabio: Auxora não soa "fit". Faz sentido — "-ora" é a terminação típica de marca de skincare/farmacêutico/wellness (é por isso que "Oura", um anel de sono, funciona bem com esse som: é sonoramente calmo, não é esforço/intensidade). **Numora tem o mesmo problema por construção** (mesma terminação). Dos 4 candidatos limpos desta seção, só **Slanzo** e **Trajex** já tinham terminação mais dura/esportiva.

Testei 3 novos candidatos com som mais duro, desta vez embutindo literalmente "evo" (evolução) na palavra, do jeito que o HYROX embute "híbrido":

- **Fortevo** — latim *fortis* (força) + "evo" (evolução) = "força em evolução", literalmente. Sem conflito de string encontrado.
- ~~Kinevo~~ — **descartado**: colide com produto real, "[ZEISS KINEVO](https://apps.apple.com/us/app/id1305711847)" (linha de microscópio cirúrgico da Zeiss).
- ~~Impulze~~ — **descartado**: já existe como ferramenta de marketing/IA, "[Impulze.ai](https://www.g2.com/sellers/impulze-ai)".

### Variações de Fortevo — Fortis e Evo (out/2026)

Fabio gostou de Fortevo e pediu mais variações na mesma linha (derivadas de "Fortis" ou de "Evo"). Testei 8:

**Sem conflito de string encontrado:**
- **Fortyx** — fortis + terminação dura "-yx" (família sonora de Apex/Onyx/Styx). Curto, forte.
- **Fortaro** — fortis + "-aro". Ressalva leve: existe "Fortaco Group" (grupo industrial europeu) foneticamente próximo, categoria não relacionada.
- **Fortik** — fortis + "-ik", curto e duro.
- **Fortiva** — fortis + "-iva".
- **Evoryx** — evo + "-oryx" (terminação dura, eco de "oryx"/antílope sem ler como literal). Ressalva leve: existe "Aevryx" (biotech) foneticamente próximo.
- **Evortis** — evo + fortis fundidos mais apertado. Ressalva leve: cluster de nomes parecidos de agências de software (Evoltis, Evollis), nenhum idêntico.

**Com ressalva mais forte:**
- **Evoka** — evo + "-ka" (eco de "evoke"). Não achei a string exata, mas "evo" já é prefixo ativo de marca **dentro do próprio nicho fitness**: existe a rede alemã "[EVOFITNESS](https://trademark.justia.com/865/27/evofitness-86527564.html)" com um app chamado "EvoMove". Não é a mesma palavra, mas é o mesmo território.
- **Evofort** — evo + fort(e), ordem invertida de Fortevo. Existe "Evoort Solutions" (empresa de software) com um app "eFort" — próximo demais pra ignorar.

**Achado importante que afeta o próprio Fortevo**: o prefixo **"Fort-" já é uma família bem povoada dentro do fitness** — encontrei marcas registradas reais "[FORTIS FITNESS](https://trademarks.justia.com/771/49/fortis-77149149.html)", "[FORT FITNESS](https://trademark.justia.com/900/80/fort-90080820.html)", "[FORTË](https://trademark.justia.com/867/86/forte-86786394.html)", além dos apps "Fortify Fitness Online" e "Fortis Fitness", e o produto "FitFort". Nenhum colide com a string exata "Fortevo" — mas significa que Fortevo (e qualquer "Fort-" desta lista) nasce numa vizinhança bem mais concorrida do que Slanzo ou Trajex, que não encontraram nenhum parente próximo no nicho fitness. Fabio decidiu seguir com Fortevo mesmo assim, de olhos abertos sobre esse ponto.

### Nome fechado: FortEvo (out/2026)

Fabio escolheu **Fortevo**, com uma estilização específica: **"FortEvo"**, F e E maiúsculos (CamelCase) — não é erro de digitação, foi pedido assim de propósito. A partir de agora, toda referência em documentação, copy e UI usa exatamente essa grafia.

**Nota técnica pra mais adiante (não é urgente agora)**: "FortEvo" com caixa mista não é um valor de identificador comum (nome de pacote npm, slug de domínio, @handle) — essas plataformas costumam normalizar pra minúsculas (`fortevo`) ou exigir escolha entre tudo-minúsculo/tudo-maiúsculo. A estilização "FortEvo" vale pra nome de marca escrito (telas do app, documentos, loja de apps) e pro próprio logotipo; identificadores técnicos (nome do pacote, domínio) provavelmente vão usar a versão simplificada "fortevo" em algum momento — isso é um detalhe de implementação pra quando o rename de verdade acontecer, não uma contradição da decisão de hoje.

### Decisões fechadas (out/2026)

1. **Tom de voz**: aprovado o registro do meio ("Recalculamos seu protocolo — pelo seu histórico, você já é avançado." / "Bateu PR? Hora de ajustar a carga.") — nem o formal ("protocolo foi recalculado... reclassificado"), nem o informal-hype ("Mano, você tá voando! 🔥"). Esse é o registro de copy pra qualquer tela, notificação ou nome de estado a partir de agora.
2. **Modelo de negócio**: pago.
3. **Nome**: **FortEvo.** Decisão final fechada pelo Fabio em out/2026. Percurso completo: Lastro (fechado, seção 1-7) → reaberto por não transmitir evolução/crescimento (seção 8, 5 candidatos de palavra real avaliados e descartados) → rodada de nomes inventados/portmanteau multilíngue (seção 9: Auxora/Slanzo/Trajex/Numora limpos, mas Auxora/Numora soam a wellness não a treino) → variações de Fortis+Evo (Fortevo e 8 variações) → **FortEvo**, estilizado com F e E maiúsculos.

As etapas 6-16 (direção criativa, logotipos, paletas, matriz, ícone, sistema visual, manual e arquivos finais) continuam em `branding/02-identidade-visual.md`.

**Pendência ativa**: as 5 propostas de logotipo já publicadas são específicas pra palavra "LASTRO" e precisam ser refeitas pra "FortEvo" — isso ainda não foi feito.

**Pendência que não bloqueia o trabalho visual, mas precisa de decisão do Fabio em algum momento**: o repositório, os pacotes (`app/package.json`, `app.json`) e todos os documentos (README, legal/, docs/) ainda dizem "FitApp" — isso é só o nome de trabalho até aqui. Trocar tudo pra "FortEvo" (provavelmente `fortevo` em identificadores técnicos, ver nota técnica acima) é uma tarefa mecânica que posso fazer quando o Fabio quiser (inclusive o nome do repositório no GitHub, se ele topar) — não fiz ainda porque não foi pedido.
