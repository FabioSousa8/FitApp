# Branding — Etapa 1: entendimento do produto, pesquisa de mercado e naming

**Status: em andamento.** Este documento cobre as etapas 1-5 do processo de branding (entendimento do produto → pesquisa de concorrência → candidatos a nome → investigação específica do nome "FitApp" → comparação e recomendação). Pelo próprio desenho do processo, ele **para aqui**: as etapas seguintes (direção criativa, logotipos, paletas, ícone, sistema visual, manual) dependem do nome escolhido — não faz sentido desenhar um logotipo antes de saber quais letras ele precisa formar.

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

**Modelo de negócio / registro de preço.** Não está documentado em nenhum lugar do projeto se o app será gratuito, pago ou freemium. Isso muda o registro visual (minimalista-acessível é diferente de minimalista-premium/exclusivo, mesmo os dois sendo minimalistas). Minha hipótese, só pelo próprio motivo de existir do produto ("quem não pode pagar personal trainer"): **acessível**, não um posicionamento de luxo. Preciso que você confirme — isso entra direto na escolha de paleta e tom mais adiante.

Essas são as únicas duas perguntas que considero essenciais pra seguir com critério — o resto dá pra inferir do que já existe.

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

### Perguntas em aberto (seção 1) — preciso da sua resposta antes de seguir pra identidade visual

1. A hipótese de personalidade — **rigor/raciocínio, não hype** — está certa, ou você imagina um tom diferente?
2. O produto vai ser gratuito, pago ou freemium? Isso muda o registro visual entre "acessível" e "premium".

E, claro, a decisão principal desta etapa: **qual nome seguir** — Lastro, Sinapse, ou algum ajuste/combinação das duas, ou nenhum dos cinco. A partir daí, as etapas 6-16 (direção criativa, logotipos, paletas, matriz, ícone, sistema visual, manual e arquivos finais) entram em ação.
