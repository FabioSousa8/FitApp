# FitApp

App de treinador pessoal via IA para pessoas que já têm experiência de treino, mas não têm como investir em personal trainer ou assessoria particular.

## Contexto

O motor deste app nasceu de um processo pessoal: usar IA para montar um protocolo completo de treino, cardio, dieta e suplementação a partir da ficha de academia, exames e dieta já existentes — em vez de simplesmente pedir "me monta um treino".

## Estrutura

```
app/
  src/app/                          # Rotas do app mobile (Expo Router): login, cadastro, protocolo — ver app/README.md
  src/intake/IntakeWizard.tsx       # Os 7 passos do cadastro, fiéis a data/intake-flow-rules.json
  src/lib/engine.ts                 # Reexporta engine/ (motor rodando embarcado no app, sem backend ainda)
  src/ctx.tsx                       # Autenticação (Supabase, com modo local de fallback)
  supabase/migrations/              # Schema da tabela profiles (RLS por usuário)
engine/
  index.js                          # Ponto de entrada público do motor — generateProtocol(persona). Extraído de test/simulate-engine.js em out/2026.
  data.js                            # Carrega as regras de data/*.json uma vez só
  level.js                           # Classificação de nível (cruzamento autodeclarado × tempo de treino)
  activity.js                        # Objetivo da musculação via ranking de atividades
  volume.js                          # Volume semanal alvo por grupo muscular (MEV/MAV/MRV)
  periodization.js                   # Blocos de treino/deload por goalDurationDays + modelo de descanso
  exercises.js                       # Séries/reps por papel do exercício + seleção no banco
  cardio.js                          # Modalidade/frequência/duração de cardio
  protocol.js                        # Orquestra tudo acima em buildProtocol(persona)
data/
  training-volume-landmarks.json   # Volume (séries/semana) por grupo muscular e nível: MV, MEV, MAV, MRV
  progression-rules.json           # Regras de progressão de carga, deload, platô e aderência
  supplementation-rules.json       # Classificação de suplementos (essencial/opcional/desnecessário) + filtro de segurança
  activity-priority-rules.json     # Ranking de atividades físicas do cadastro → objetivo da musculação e teto de volume semanal
  session-time-rules.json          # Tempo disponível por sessão → teto de séries por sessão (45min musculação / 30min cardio de referência)
  split-style-rules.json           # Biblioteca de estilos de divisão (FB, FBEOD, U/L, PPL, ABC, ABCD, ABCDE/Bro Split, híbrido) e como escolher um default por dias/nível/objetivo sem fechar nas outras opções
  exercise-bank.json               # 209 exercícios: grupo muscular, papel, equipamento, tags de contraindicação, custo de recuperação
  exercise-selection-rules.json    # Como cruzar grupo-alvo × papel × equipamento × limitações pra escolher os exercícios do dia
  intake-flow-rules.json           # Ordem e ramificação das perguntas do cadastro — o que é sempre perguntado vs. o que só abre quando se aplica ao perfil
  cardio-rules.json                # Cardio decidido por recoverySlack (folga de recuperação da musculação) × cardioEmphasis (objetivo do usuário) — modalidade, frequência, duração
test/
  test-personas.json               # 11 perfis de teste para validar a lógica do motor (limitações como tags fechadas, não texto livre)
  simulate-engine.js                # Simulador: roda as personas contra engine/ e mostra o plano gerado
docs/
  engine-flow.md                    # Como as peças do motor se conectam (intake → split → volume → progressão)
  beta-fechado.md                    # Plano de logística do primeiro grupo de teste: pré-requisitos, tamanho/perfil, distribuição, feedback
legal/
  termo-de-uso.md                   # Termo de uso e aviso de responsabilidade (rascunho — precisa de revisão jurídica antes de publicar)
  politica-de-privacidade.md        # Política de privacidade LGPD (rascunho — mesma pendência de revisão jurídica)
branding/
  01-pesquisa-e-naming.md           # Entendimento do produto, pesquisa de concorrência, candidatos a nome (conceituais + internacionais + gírias de treino + reabertura + portmanteau out/2026) — nome FECHADO: FortEvo, tom aprovado
  02-identidade-visual.md           # Direção criativa e 5 propostas de logotipo (publicadas) concluídas; paletas, ícone, sistema visual e manual — em andamento
```

## Rodar a simulação

```bash
node test/simulate-engine.js
# ou: npm test
```

## Usar o motor em outro lugar

```js
const { generateProtocol } = require("./engine");
const protocol = generateProtocol(persona); // persona: mesmo shape de test/test-personas.json
```

`generateProtocol` é a única função que um consumidor externo (API, app mobile, outro script) deveria precisar — ver o cabeçalho de `engine/index.js` pra entender como os módulos internos se encaixam.

## Status

Motor rodando de ponta a ponta, agora como módulo reutilizável em `engine/` (extraído de dentro do simulador em out/2026 — antes só existia como script de teste/print, sem como ser consumido por nada além do terminal): `node test/simulate-engine.js` chama `generateProtocol()` e gera o protocolo completo (split, plano de periodização em treinos, exercício, séries, reps por dia, e cardio) pras 11 personas de teste, já aplicando cruzamento de nível, ranking de atividade, teto de tempo por sessão e banco de exercícios. Validado byte-a-byte contra a versão anterior (pré-extração): mesma saída, exceto a mensagem final do simulador.

Decisão de produto: o app será mobile pra iOS e Android (o site é só uma página explicativa, sem o motor). Scaffold iniciado out/2026 em `app/` (Expo + TypeScript + Expo Router) — login/cadastro de usuário e o wizard de cadastro (7 passos, fiel a `data/intake-flow-rules.json`) já funcionam de ponta a ponta: cadastro → `generateProtocol()` (o motor roda embarcado no app, mesma função de `test/simulate-engine.js`) → tela de protocolo. Autenticação usa Supabase quando configurado, com um modo local de fallback só pra navegar o app sem backend ainda (ver `app/README.md`). Validado rodando `npx expo export -p ios` com sucesso (bundla sem simulador, confirma que o Metro resolve o motor através do workspace). Branding (nome/paleta/ícone, decisão #3): **nome FECHADO — FortEvo** (out/2026, grafia com F e E maiúsculos, estilização pedida pelo Fabio). Percurso: Lastro fechado → reaberto por não transmitir evolução/crescimento → rodada de nomes inventados/portmanteau multilíngue (Auxora, Slanzo, Trajex...) → variações de Fortis+Evo → FortEvo — detalhe completo em `branding/01-pesquisa-e-naming.md` seção 9. Tom de voz continua aprovado. Identidade visual em `branding/02-identidade-visual.md`: a direção criativa (tipografia + geometria, sem halteres/chamas/raios) segue válida, mas as 5 propostas de logotipo publicadas são específicas pra palavra "LASTRO" e **precisam ser refeitas pra "FortEvo"** (pendência ativa, ainda não feita). "FitApp" continua como nome de trabalho no código e nos documentos (rename pra "fortevo" em identificadores técnicos fica pra quando o Fabio pedir). A UI usa uma paleta neutra até a identidade visual ser definida.

Rascunho do termo de uso e aviso de responsabilidade (decisão #8) em `legal/termo-de-uso.md` — cobre a natureza do serviço (não substitui profissional/médico), responsabilidades do usuário, riscos do exercício e limitação de responsabilidade. **Precisa de revisão jurídica antes de publicar pra qualquer usuário**, mesmo beta fechado.

Rascunho da política de privacidade (decisão #9, out/2026) em `legal/politica-de-privacidade.md` — descreve com precisão os dados reais coletados (conta via Supabase Auth ou modo local; cadastro completo; protocolo gerado), onde ficam guardados (aparelho sempre; Supabase quando configurado), e os direitos do usuário sob a LGPD. Levanta um ponto que a revisão jurídica precisa confirmar: se as limitações físicas do cadastro contam como dado sensível de saúde (art. 5º LGPD) e, se contarem, se o consentimento atual (aceitar o termo ao criar conta) é suficiente. Também precisa, antes de publicar: nome legal do responsável, região de hospedagem do projeto Supabase, e um e-mail de contato real (recomendação de formato já em `legal/termo-de-uso.md` seção 12 — falta criar a conta de verdade).

O split não é mais um único estilo fixo por quantidade de dias: o motor conhece 7 estilos (Full Body, FBEOD, Upper/Lower, PPL, ABC, ABCD, ABCDE/Bro Split, híbrido U/L+PPL — ver `data/split-style-rules.json`), sugere um default pela combinação dias/nível/objetivo, e sempre mostra as outras opções viáveis pro mesmo perfil junto, sem fechar numa resposta única. PPL e ABC são dois estilos de 3 dias DIFERENTES, não o mesmo nome em dois idiomas: PPL agrupa por função do movimento (empurrar/puxar/pernas), ABC agrupa por músculo principal + sinergista (peito+tríceps / costas+bíceps / pernas+ombro+abdômen).

Ao cortar exercício por falta de tempo, o motor prioriza manter os grupos que não têm nenhum outro exercício estimulando eles secundariamente naquele dia (ex: deltoide posterior) e corta primeiro os que já são estimulados por outro composto (ex: tríceps via supino). Quando o mesmo tipo de dia se repete na semana (ex: Full Body 3x), a prioridade de grupo roda a cada repetição, pra não sacrificar sempre os mesmos grupos nos dias com pouco tempo.

Primeira rodada de feedback real de personal trainer já incorporada ao motor: (1) exercícios com troca de carga pesada entre séries (ex: Levantamento Terra, Agachamento Livre barra — tag `highSetupOverhead`) somam +1min/série no cálculo de tempo; (2) quando musculação é a atividade prioridade e outra atividade cai no mesmo dia ANTES dela, o protocolo avisa que isso pode reduzir o estímulo; (3) um novo sinal `trainingConsistency` (contínuo/esporádico), separado do nível autodeclarado, faz o motor preferir equipamento guiado (máquina/smith/cabo) sobre peso livre pra quem treina de forma inconsistente — cobrindo o aluno que entra e sai da academia e se autodeclara "intermediário" sem ter a coordenação de quem treina sem pausas.

Decisão de produto: o motor não atribui dia da semana aos treinos — gera sessões rotativas (Upper A/B, Lower A/B...) que o usuário encaixa na própria rotina, não um calendário fixo.

Decisão de produto: o treino fica FIXO durante um bloco (trocar toda semana quebra aderência), mas o tamanho e a quantidade de blocos não são um número universal fixo — são calculados a partir de `goalDurationDays`, o período que a própria pessoa estipulou pra aquele protocolo. Desde out/2026, um bloco termina por TREINOS COMPLETADOS, não dias de calendário — descanso no meio do caminho não conta contra essa contagem (exemplo do fundador: um bloco de "25 dias" é contado como 25 treinos). Sem data informada, cai num mesociclo padrão único. Com data, o motor monta um plano de blocos (mesociclo + deload de 1 semana entre eles, fora do orçamento de sessões) e só reconsidera a seleção de exercício nas FRONTEIRAS entre blocos — nunca dentro de um bloco. Se a pessoa tem uma data-alvo específica (evento, não só um objetivo genérico), o último bloco tapera nos treinos finais; sem isso, mantém estímulo alto até o fim. Como o público não são iniciantes, não existe fase de "rodagem" — janelas curtas aceleram a rampa de volume em vez de diluí-la, exceto quando o objetivo é `maintenance_support` sem escalada manual (não existe MAV pra acelerar rumo a). Em paralelo, o motor calcula uma cadência mínima de descanso a partir de `daysAvailable` e emite aviso NÃO-BLOQUEANTE (nunca impede registrar um treino) — nunca agenda descanso fixo no calendário. Ver `periodizationByGoalDuration` e `restDayModel` em `data/progression-rules.json`.

Decisão de produto: o cadastro não é um formulário único e estático — a ordem e a ramificação das perguntas (o que é sempre perguntado vs. o que só abre quando se aplica) vêm de `data/intake-flow-rules.json`. Motivado por 2 usuários reais testando o MASTER PROMPT original (texto livre, 48 campos fixos pra qualquer perfil — uma mulher com hérnia de disco e um homem 40+ sem meta estética, os dois acharam grande): limitação física vira uma pergunta-porta fechada (sim/não) que só abre tags fechadas + 1 campo opcional de texto quando existe, em vez de um bloco clínico fixo nomeado por condição; e objetivo tem "saúde geral, sem meta estética específica" como resposta válida por si só.

Decisão de produto (definitiva, não pendência de prioridade): dieta e suplementação ficam de fora do app — precisam ser feitas e direcionadas por profissionais. `supplementation-rules.json` continua existindo pra classificar itens que já vêm de fora, mas o cadastro não pergunta isso (reconfirmado out/2026, depois de uma reversão rápida: precisaria de dados pessoais sensíveis — BF%, peso — que a maioria pode não querer compartilhar, além da LGPD). Cardio, por outro lado, entrou em escopo: `data/cardio-rules.json` decide modalidade (LISS/MISS/HIIT), frequência e duração a partir de dois eixos que não são perguntas novas — `recoverySlack` (quanta folga de recuperação a musculação deixa) × `cardioEmphasis` (qual papel o cardio deve ter, derivado do objetivo do usuário). `evento_especifico` reaproveita o `cardioEmphasis` de um dos outros 4 focos via uma pergunta aninhada (`eventSubFocus`) em vez de ficar sem regra.

Correção de feedback do fundador: "saúde geral, sem meta específica" (`goalCategory`) NÃO é o mesmo que hipertrofia — é `maintenance_support` (MV/MEV, sem rampa de crescimento) quando a pessoa já é treinada (`levelFinal != beginner`, cruzando o nível autodeclarado com `trainingTimeYears` — bandas adaptadas de Santos Junior et al. 2021, ajustadas pelo fundador). Rank 1 decide prioridade entre atividades, não implica objetivo de crescimento: `maintenanceSupportTriggers` em `data/activity-priority-rules.json` agora tem 2 gatilhos independentes pra isso (rank-based e goal-based), ver também `data/progression-rules.json`. O teto do gatilho goal-based pode ser levantado manualmente (`userRequestedEscalation`, ação do app) se o usuário ficar insatisfeito e quiser evoluir — o gatilho rank-based nunca é escalado assim, porque reflete recuperação de fato dividida com outra atividade.

Pendências conhecidas (ver `docs/engine-flow.md`):

- ~~Tela de cadastro pra coletar equipamento disponível~~ — resolvido (out/2026): passo 6 do wizard em `app/src/intake/IntakeWizard.tsx`.
- Fórmula de quantos exercícios por grupo ainda é uma estimativa de bom senso quando não há rotina atual informada pra ancorar — o wizard já coleta `currentRoutineRaw` (passo 7, opcional), mas isso ainda não alimenta `exerciseCountByGroup` (ver bullet de extração abaixo), então cai sempre no cálculo frio por ora.
- A cobertura secundária que decide o corte por tempo só olha o dia, não a semana inteira.
- Cadastro ainda não pergunta qual split o usuário já treina/prefere — isso devia pesar na escolha, não só dias/nível/rank.
- ~~Cadastro ainda não pergunta `trainingConsistency`, `sameDayAsMusculacao`, `goalDurationDays`, `eventBound` nem `eventSubFocus`~~ — resolvido (out/2026): os 7 passos do wizard (`app/src/intake/IntakeWizard.tsx`) cobrem tudo isso, incluindo a ramificação de `evento_especifico` e o `sameDayAsMusculacao` simplificado (pergunta direta com 1 atividade secundária, agregada com 2+). A copy de `goalDurationDays` já é explícita sobre ser contado em treinos, não em dias de calendário.
- `intake-flow-rules.json` já define ordem/ramificação das perguntas, cruzamento de nível e foco aninhado de evento. Só ficou aberto: extração de `currentRoutineRaw` (texto livre/foto da ficha atual) pra `exerciseCountByGroup`.
- `cardio-rules.json`: a tabela de decisão (recoverySlack × cardioEmphasis) é estimativa de bom senso, não validada. Não existe um "banco de cardio" — modalidade específica fica solta em `cardioPreference`, texto livre.
- `highly_advanced` (nova 4ª faixa de nível, out/2026) ainda não tem landmark próprio de MEV/MAV/MRV, perfil de split nem `recoverySlack` — colapsa em `advanced` nesses lookups (simplificação documentada), diferenciando-se só na classificação por tempo de treino.
- Esperando retorno de outros personal trainers pra validar os ajustes desta rodada antes de calibrar mais a fundo (ex: `highSetupOverheadExtraMinutes`, quais outros exercícios mereceriam a tag, se o viés de equipamento guiado devia valer só pra compostos, e agora também a cadência mínima de descanso do `restDayModel`).
- O plano de periodização por `goalDurationDays` só materializa exercício-a-exercício o bloco 1 — blocos seguintes aparecem no plano (duração em treinos, deload, refresh, taper) mas sem a lista de exercício gerada ainda.
- ~~Nenhuma persona de teste autodeclara `level: "beginner"` ou `"highly_advanced"` diretamente~~ — resolvido: `beginner_puro` e `highly_advanced_puro` (out/2026) cobrem os dois extremos da escala por autodeclaração direta, além do caminho beginner por cruzamento já validado em `intermediario_base_recente_sem_meta`.
- ~~Plataforma mobile (iOS + Android) é decisão fechada; abordagem técnica ainda não iniciada~~ — resolvido (out/2026): scaffold React Native/Expo em `app/`, com login/cadastro e geração de protocolo já de ponta a ponta (ver `app/README.md`).
- **Autenticação em modo local (sem Supabase configurado ainda)**: `app/src/ctx.tsx` cai num fallback que não autentica de verdade (qualquer e-mail/senha entra) — existe só pra navegar o app sem backend. Precisa de um projeto Supabase real (`app/supabase/migrations/0001_profiles.sql` já define o schema) antes de qualquer usuário real usar isso.
- **Extração de `currentRoutineRaw` pra `exerciseCountByGroup`**: o wizard já coleta o texto (passo 7), mas a extração em si — texto livre/foto da ficha → quantidade de exercícios por grupo — ainda não tem regra nem no motor, nem no app.
- **Reordenar atividades físicas no wizard** usa botões ▲▼ em vez de arrastar — funciona, mas não é o gesto de arrastar que `activity-priority-rules.json/intakeSchema` menciona.
- **Geração de protocolo roda embarcada no app** (sem backend) — rápido pra validar o fluxo hoje, mas significa que mudar uma regra do motor exige publicar uma nova versão do app. Mover isso pra um backend/Edge Function é uma opção a revisitar quando isso incomodar (ver `app/README.md`).
- **Logística do beta fechado** planejada em `docs/beta-fechado.md` (tamanho/perfil do grupo, Expo Go como via de distribuição, mecanismo de feedback) — mas convidar o primeiro usuário real ainda depende de dois bloqueadores: projeto Supabase real configurado, e um e-mail de contato real (ver pendências dos documentos legais acima).
