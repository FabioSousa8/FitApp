# Fluxo do motor

1. **Intake** → nível (anos de treino + consistência, não auto-relato puro), objetivo, dias disponíveis, tempo por sessão, equipamento, limitações, e o ranking de atividades físicas (ver passo 2).

2. **Classificação do objetivo via ranking de atividades** (`activity-priority-rules.json`) → o usuário ordena suas atividades físicas por importância (ex: Musculação, Cardio, Vôlei) e informa a frequência semanal de cada uma.
   - Se "Musculação" é rank 1 → objetivo segue normal (hipertrofia/força), progressão MEV → MAV sem restrição extra.
   - Se "Musculação" não é rank 1 → objetivo vira `maintenance_support` (repRangesByGoal e targetRIRByPhase próprios em `progression-rules.json`), e o teto de volume semanal passa a ser decidido pelo orçamento de carga semanal (`weeklyLoadBudget`), não pelo MRV padrão.
   - A soma da frequência de todas as atividades (`totalWeeklyActivityDays`) decide o quanto o motor pode empurrar o volume das atividades que não são rank 1 (normal / travado no MEV / abaixo do MEV). **Cuidado**: essa soma superestima quando atividades caem no mesmo dia (ex: musculação + cardio no mesmo dia) — ver `weeklyLoadBudget.knownFlaw` em `activity-priority-rules.json`.
   - Rank reflete prioridade declarada, não frequência nem nível de competitividade — uma atividade praticada de forma séria/competitiva (ex: time amador) não é automaticamente rank 1 (ver `rankClarification` em `activity-priority-rules.json`).

3. **Seleção de split** (baseado em daysAvailable):
   - 2-3 dias → Full body ou Upper/Lower alternado
   - 4 dias → Upper/Lower 2x
   - 5 dias → Upper/Lower + Push/Pull/Legs híbrido (ênfase nos grupos prioritários do usuário)
   - 6 dias → PPL 2x

4. **Alocação de volume** → para cada grupo muscular, pega o MEV do nível (`training-volume-landmarks.json`) como ponto de partida do mesociclo, distribui entre os dias do split escolhido. O teto (MAV normal, ou o limite de `activity-priority-rules.json` quando aplicável) depende do passo 2.
   - Depois de alocado, o total de séries de cada dia passa pelo teto de tempo (`session-time-rules.json`): `sessionMinutes` (45 min de musculação como referência, se o usuário não informar outro valor) converte em `maxSetsPerSession` via `avgMinutesPerWorkingSet`. Se o volume do dia ultrapassar esse teto, corta-se primeiro o excesso acima do MEV antes de cortar abaixo dele — e se nem no MEV couber, o motor sinaliza que o tempo disponível é insuficiente pro split/dias escolhidos.
   - Quando cardio e musculação acontecem no mesmo dia, o orçamento de referência é 45 min musculação + 30 min cardio (até ~1h30 no total com aquecimento/transição); a atividade rank 1 recebe sua fatia integral primeiro.

5. **Seleção de exercícios** → `exercise-bank.json` (209 exercícios, cobrindo os 13 grupos musculares × papel × equipamento) filtrado por `exercise-selection-rules.json`: equipamento disponível e limitações reportadas via tags fechadas (ex: `knee_sensitive` remove agachamento livre pesado da lista — ver `contraindicationTagVocabulary`). Quando o objetivo é `maintenance_support`, prefere exercícios de menor `recoveryCost` (ver `exerciseSelectionNote` em `activity-priority-rules.json`). Dentro da sessão, série/reps variam pelo papel do exercício (composto principal vs. secundário vs. isolamento/acessório) — `exerciseRoleProgramming` em `progression-rules.json`. A ordem também importa: alternar grupos antagonistas (empurrar/puxar) é o que permite caber mais séries no tempo disponível (ver `session-time-rules.json`).

6. **Geração do protocolo inicial** → treino + cardio + dieta (macro a parte) + suplementação, essa última só usando `supplementation-rules.json`.

7. **Check-ins** → cada log de sessão passa por `progression-rules.json`: decide subir carga, segurar, reduzir, ou disparar deload/revisão. Nunca é o LLM decidindo isso livremente — é a regra que decide, o LLM só explica o "porquê" em linguagem natural.

8. **Reavaliação de mesociclo** → ao fim do ciclo (ou por trigger de deload), sobe o volume-alvo em direção ao teto definido no passo 2 (MAV normal, ou o limite reduzido de quem não tem a musculação como rank 1).

## Status: motor rodando de ponta a ponta

Desde a versão atual, `test/simulate-engine.js` liga TODAS as regras acima — ranking de atividade, teto de tempo por sessão, banco de exercícios — e gera o protocolo semanal completo (dia por dia, exercício, séries, reps) pras 4 personas de teste, não só a tabela de referência de MEV/MAV/MRV.

## Pendências conhecidas

- **Equipamento disponível**: o campo existe (`availableEquipment` nas personas, usado no filtro), mas não existe pergunta real no cadastro ainda — é preciso desenhar essa tela.
- **Fórmula de quantos exercícios por grupo**: ancorada em `currentRoutine` quando o usuário informa (ver `exerciseCountFormula` em `exercise-selection-rules.json`); sem isso, cai num cálculo frio (volume ÷ 3 séries/exercício) que é só uma estimativa de bom senso.
- **Grupos pequenos ficam sistematicamente de fora em sessões muito curtas**: o corte por falta de tempo hoje sempre sacrifica os mesmos grupos (deltoide/bíceps/tríceps, que vêm depois na ordem do dia) em vez de rotacionar quem fica de fora entre os dias da semana — achado real na simulação, ainda não corrigido.
- **Agendamento por dia da semana**: o motor ainda não sabe em que dias a pessoa faz cada atividade, só a frequência total — então não consegue evitar agendar musculação pesada de pernas no dia anterior a um jogo, nem fatiar o tempo entre cardio e musculação quando caem no mesmo dia com precisão (`schedulingNote` em `activity-priority-rules.json`, regra 5 de `session-time-rules.json`).
- **Ordenação por antagonistas** (empurrar/puxar) validada contra UMA rotina real (a do fundador) — não testada contra outros perfis/splits ainda.
