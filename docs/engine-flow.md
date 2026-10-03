# Fluxo do motor

1. **Intake** → nível (anos de treino + consistência, não auto-relato puro), objetivo, dias disponíveis, tempo por sessão, equipamento, limitações, e o ranking de atividades físicas (ver passo 2).

2. **Classificação do objetivo via ranking de atividades** (`activity-priority-rules.json`) → o usuário ordena suas atividades físicas por importância (ex: Musculação, Cardio, Vôlei) e informa a frequência semanal de cada uma.
   - Se "Musculação" é rank 1 → objetivo segue normal (hipertrofia/força), progressão MEV → MAV sem restrição extra.
   - Se "Musculação" não é rank 1 → objetivo vira `maintenance_support` (repRangesByGoal e targetRIRByPhase próprios em `progression-rules.json`), e o teto de volume semanal passa a ser decidido pelo orçamento de carga semanal (`weeklyLoadBudget`), não pelo MRV padrão.
   - A soma da frequência de todas as atividades (`totalWeeklyActivityDays`) decide o quanto o motor pode empurrar o volume das atividades que não são rank 1 (normal / travado no MEV / abaixo do MEV).

3. **Seleção de split** (baseado em daysAvailable):
   - 2-3 dias → Full body ou Upper/Lower alternado
   - 4 dias → Upper/Lower 2x
   - 5 dias → Upper/Lower + Push/Pull/Legs híbrido (ênfase nos grupos prioritários do usuário)
   - 6 dias → PPL 2x

4. **Alocação de volume** → para cada grupo muscular, pega o MEV do nível (`training-volume-landmarks.json`) como ponto de partida do mesociclo, distribui entre os dias do split escolhido. O teto (MAV normal, ou o limite de `activity-priority-rules.json` quando aplicável) depende do passo 2.
   - Depois de alocado, o total de séries de cada dia passa pelo teto de tempo (`session-time-rules.json`): `sessionMinutes` (45 min de musculação como referência, se o usuário não informar outro valor) converte em `maxSetsPerSession` via `avgMinutesPerWorkingSet`. Se o volume do dia ultrapassar esse teto, corta-se primeiro o excesso acima do MEV antes de cortar abaixo dele — e se nem no MEV couber, o motor sinaliza que o tempo disponível é insuficiente pro split/dias escolhidos.
   - Quando cardio e musculação acontecem no mesmo dia, o orçamento de referência é 45 min musculação + 30 min cardio (até ~1h30 no total com aquecimento/transição); a atividade rank 1 recebe sua fatia integral primeiro.

5. **Seleção de exercícios** → banco curado (fora do escopo destes arquivos, ainda não construído) filtrado por equipamento disponível e limitações reportadas (ex: joelho sensível remove agachamento livre pesado da lista). Quando o objetivo é `maintenance_support`, prefere exercícios de menor custo de recuperação (ver `exerciseSelectionNote` em `activity-priority-rules.json`).

6. **Geração do protocolo inicial** → treino + cardio + dieta (macro a parte) + suplementação, essa última só usando `supplementation-rules.json`.

7. **Check-ins** → cada log de sessão passa por `progression-rules.json`: decide subir carga, segurar, reduzir, ou disparar deload/revisão. Nunca é o LLM decidindo isso livremente — é a regra que decide, o LLM só explica o "porquê" em linguagem natural.

8. **Reavaliação de mesociclo** → ao fim do ciclo (ou por trigger de deload), sobe o volume-alvo em direção ao teto definido no passo 2 (MAV normal, ou o limite reduzido de quem não tem a musculação como rank 1).

## Pendências conhecidas

- **Tempo por sessão (`sessionMinutes`)**: a regra de conversão tempo → teto de séries já existe (`session-time-rules.json`), mas `simulate-engine.js` ainda não a aplica — hoje o simulador só mostra os números semanais de MEV/MAV/MRV por grupo (referência), sem distribuir isso em séries por dia nem checar o teto de tempo. Falta ligar essa regra na simulação (e depois num motor de verdade).
- **Agendamento por dia da semana**: o motor ainda não sabe em que dias a pessoa faz cada atividade, só a frequência total — então não consegue evitar agendar musculação pesada de pernas no dia anterior a um jogo, nem fatiar o tempo entre cardio e musculação quando caem no mesmo dia com precisão (`schedulingNote` em `activity-priority-rules.json`, regra 5 de `session-time-rules.json`).
- **Banco de exercícios** com seleção fina por atividade de suporte (ex: exercícios de prevenção de lesão específicos por esporte) ainda não existe. Também é o que permitiria ter `avgMinutesPerWorkingSet` por tipo de exercício em vez de uma média única.
