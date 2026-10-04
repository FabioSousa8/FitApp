# Fluxo do motor

1. **Intake** → nível (anos de treino + consistência, não auto-relato puro), objetivo, dias disponíveis, tempo por sessão, equipamento, limitações, e o ranking de atividades físicas (ver passo 2).

2. **Classificação do objetivo via ranking de atividades** (`activity-priority-rules.json`) → o usuário ordena suas atividades físicas por importância (ex: Musculação, Cardio, Vôlei) e informa a frequência semanal de cada uma.
   - Se "Musculação" é rank 1 → objetivo segue normal (hipertrofia/força), progressão MEV → MAV sem restrição extra.
   - Se "Musculação" não é rank 1 → objetivo vira `maintenance_support` (repRangesByGoal e targetRIRByPhase próprios em `progression-rules.json`), e o teto de volume semanal passa a ser decidido pelo orçamento de carga semanal (`weeklyLoadBudget`), não pelo MRV padrão.
   - A soma da frequência de todas as atividades (`totalWeeklyActivityDays`) decide o quanto o motor pode empurrar o volume das atividades que não são rank 1 (normal / travado no MEV / abaixo do MEV). **Cuidado**: essa soma superestima quando atividades caem no mesmo dia (ex: musculação + cardio no mesmo dia) — ver `weeklyLoadBudget.knownFlaw` em `activity-priority-rules.json`.
   - Rank reflete prioridade declarada, não frequência nem nível de competitividade — uma atividade praticada de forma séria/competitiva (ex: time amador) não é automaticamente rank 1 (ver `rankClarification` em `activity-priority-rules.json`).

3. **Seleção de split** (`split-style-rules.json`) → não existe um único estilo certo por quantidade de dias. O motor conhece 7 estilos — Full Body (FB), Full Body Every Other Day (FBEOD), Upper/Lower (U/L), PPL/ABC, ABCD, ABCDE/Bro Split, e um híbrido U/L+PPL — cada um com um ciclo de tipos de dia que se repete até preencher `daysAvailable`. A escolha do default olha `daysAvailable` + nível + se musculação é rank 1 (`selectionGuidance.preferredOrderByProfile`): mais frequência (FB/FBEOD) pra iniciante ou quando musculação não é rank 1, mais especialização (ABCD/ABCDE) pra avançado com musculação rank 1. As outras opções viáveis pro mesmo perfil continuam sendo mostradas junto — o motor sugere, não fecha numa resposta única.

4. **Alocação de volume** → para cada grupo muscular, pega o MEV do nível (`training-volume-landmarks.json`) como ponto de partida do mesociclo, distribui entre os dias do split escolhido. O teto (MAV normal, ou o limite de `activity-priority-rules.json` quando aplicável) depende do passo 2.
   - Depois de alocado, o total de séries de cada dia passa pelo teto de tempo (`session-time-rules.json`): `sessionMinutes` (45 min de musculação como referência, se o usuário não informar outro valor) converte em `maxSetsPerSession` via `avgMinutesPerWorkingSet`. Se o volume do dia ultrapassar esse teto, corta-se primeiro o excesso acima do MEV antes de cortar abaixo dele — e se nem no MEV couber, o motor sinaliza que o tempo disponível é insuficiente pro split/dias escolhidos.
   - Quando cardio e musculação acontecem no mesmo dia, o orçamento de referência é 45 min musculação + 30 min cardio (até ~1h30 no total com aquecimento/transição); a atividade rank 1 recebe sua fatia integral primeiro.

5. **Seleção de exercícios** → `exercise-bank.json` (209 exercícios, cobrindo os 13 grupos musculares × papel × equipamento) filtrado por `exercise-selection-rules.json`: equipamento disponível e limitações reportadas via tags fechadas (ex: `knee_sensitive` remove agachamento livre pesado da lista — ver `contraindicationTagVocabulary`). Quando o objetivo é `maintenance_support`, prefere exercícios de menor `recoveryCost` (ver `exerciseSelectionNote` em `activity-priority-rules.json`). Dentro da sessão, série/reps variam pelo papel do exercício (composto principal vs. secundário vs. isolamento/acessório) — `exerciseRoleProgramming` em `progression-rules.json`. A ordem também importa: alternar grupos antagonistas (empurrar/puxar) é o que permite caber mais séries no tempo disponível (ver `session-time-rules.json`).

6. **Geração do protocolo inicial** → treino + cardio + dieta (macro a parte) + suplementação, essa última só usando `supplementation-rules.json`.

7. **Check-ins** → cada log de sessão passa por `progression-rules.json`: decide subir carga, segurar, reduzir, ou disparar deload/revisão. Nunca é o LLM decidindo isso livremente — é a regra que decide, o LLM só explica o "porquê" em linguagem natural.

8. **Reavaliação de mesociclo** → ao fim do ciclo (ou por trigger de deload), sobe o volume-alvo em direção ao teto definido no passo 2 (MAV normal, ou o limite reduzido de quem não tem a musculação como rank 1).

## Status: motor rodando de ponta a ponta

Desde a versão atual, `test/simulate-engine.js` liga TODAS as regras acima — ranking de atividade, teto de tempo por sessão, banco de exercícios — e gera o protocolo semanal completo (dia por dia, exercício, séries, reps) pras 4 personas de teste, não só a tabela de referência de MEV/MAV/MRV.

## Decisão de produto: sem agendamento por dia da semana

O motor não atribui dia da semana aos treinos — gera sessões rotativas (Upper A, Upper B, Lower A, Lower B...) e o usuário encaixa cada uma na própria rotina, como numa ficha impressa normal. Não é uma pendência, é escopo definido (ver `schedulingNote` em `activity-priority-rules.json`). A única informação de cadastro que esse ponto ainda precisa é uma pergunta simples (sim/não: cardio e musculação caem no mesmo dia?) pra fatiar o tempo entre as duas quando acontece — isso NÃO exige calendário.

## Pendências conhecidas

- **Equipamento disponível**: o campo existe (`availableEquipment` nas personas, usado no filtro), mas não existe pergunta real no cadastro ainda — fica pra quando desenharmos as telas.
- **Fórmula de quantos exercícios por grupo**: ancorada em `currentRoutine` quando o usuário informa (ver `exerciseCountFormula` em `exercise-selection-rules.json`); sem isso, cai num cálculo frio (volume ÷ 3 séries/exercício) que é só uma estimativa de bom senso.
- **Cobertura secundária só olha o dia, não a semana**: o corte por falta de tempo agora protege grupos sem estímulo secundário de nenhum composto *naquele dia* (ex: deltoide posterior) e sacrifica primeiro quem já é estimulado por outro exercício (ex: tríceps via supino, bíceps via puxada) — ver `selectionAlgorithm` passo 5 em `exercise-selection-rules.json`. Falta expandir isso pra olhar a semana inteira, não só o dia isolado.
- **Ordenação por antagonistas** (empurrar/puxar) validada contra UMA rotina real (a do fundador) — não testada contra outros perfis/splits ainda.
- **Cadastro não pergunta qual split o usuário já treina/prefere** — a escolha de estilo hoje só olha dias/nível/rank da musculação (ver `openQuestions` em `split-style-rules.json`); isso devia pesar tanto quanto `currentRoutine` já pesa na contagem de exercícios por grupo.
- **ABC tem mais de uma convenção real no Brasil** — modelado aqui igual ao PPL (A=empurrar, B=puxar, C=pernas), mas algumas academias usam Peito+Tríceps/Costas+Bíceps/Pernas+Ombro. Ver `openQuestions` em `split-style-rules.json`.
