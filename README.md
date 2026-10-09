# FitApp

App de treinador pessoal via IA para pessoas que já têm experiência de treino, mas não têm como investir em personal trainer ou assessoria particular.

## Contexto

O motor deste app nasceu de um processo pessoal: usar IA para montar um protocolo completo de treino, cardio, dieta e suplementação a partir da ficha de academia, exames e dieta já existentes — em vez de simplesmente pedir "me monta um treino".

## Estrutura

```
data/
  training-volume-landmarks.json   # Volume (séries/semana) por grupo muscular e nível: MV, MEV, MAV, MRV
  progression-rules.json           # Regras de progressão de carga, deload, platô e aderência
  supplementation-rules.json       # Classificação de suplementos (essencial/opcional/desnecessário) + filtro de segurança
  activity-priority-rules.json     # Ranking de atividades físicas do cadastro → objetivo da musculação e teto de volume semanal
  session-time-rules.json          # Tempo disponível por sessão → teto de séries por sessão (45min musculação / 30min cardio de referência)
  split-style-rules.json           # Biblioteca de estilos de divisão (FB, FBEOD, U/L, PPL, ABC, ABCD, ABCDE/Bro Split, híbrido) e como escolher um default por dias/nível/objetivo sem fechar nas outras opções
  exercise-bank.json               # 209 exercícios: grupo muscular, papel, equipamento, tags de contraindicação, custo de recuperação
  exercise-selection-rules.json    # Como cruzar grupo-alvo × papel × equipamento × limitações pra escolher os exercícios do dia
test/
  test-personas.json               # 6 perfis de teste para validar a lógica do motor (limitações como tags fechadas, não texto livre)
  simulate-engine.js                # Simulador: roda as personas contra as regras e mostra o plano gerado
docs/
  engine-flow.md                    # Como as peças do motor se conectam (intake → split → volume → progressão)
```

## Rodar a simulação

```bash
node test/simulate-engine.js
```

## Status

Motor rodando de ponta a ponta: `node test/simulate-engine.js` gera o protocolo completo (split, plano de periodização, exercício, séries, reps por dia) pras 6 personas de teste, já aplicando ranking de atividade, teto de tempo por sessão e banco de exercícios.

O split não é mais um único estilo fixo por quantidade de dias: o motor conhece 7 estilos (Full Body, FBEOD, Upper/Lower, PPL, ABC, ABCD, ABCDE/Bro Split, híbrido U/L+PPL — ver `data/split-style-rules.json`), sugere um default pela combinação dias/nível/objetivo, e sempre mostra as outras opções viáveis pro mesmo perfil junto, sem fechar numa resposta única. PPL e ABC são dois estilos de 3 dias DIFERENTES, não o mesmo nome em dois idiomas: PPL agrupa por função do movimento (empurrar/puxar/pernas), ABC agrupa por músculo principal + sinergista (peito+tríceps / costas+bíceps / pernas+ombro+abdômen).

Ao cortar exercício por falta de tempo, o motor prioriza manter os grupos que não têm nenhum outro exercício estimulando eles secundariamente naquele dia (ex: deltoide posterior) e corta primeiro os que já são estimulados por outro composto (ex: tríceps via supino). Quando o mesmo tipo de dia se repete na semana (ex: Full Body 3x), a prioridade de grupo roda a cada repetição, pra não sacrificar sempre os mesmos grupos nos dias com pouco tempo.

Primeira rodada de feedback real de personal trainer já incorporada ao motor: (1) exercícios com troca de carga pesada entre séries (ex: Levantamento Terra, Agachamento Livre barra — tag `highSetupOverhead`) somam +1min/série no cálculo de tempo; (2) quando musculação é a atividade prioridade e outra atividade cai no mesmo dia ANTES dela, o protocolo avisa que isso pode reduzir o estímulo; (3) um novo sinal `trainingConsistency` (contínuo/esporádico), separado do nível autodeclarado, faz o motor preferir equipamento guiado (máquina/smith/cabo) sobre peso livre pra quem treina de forma inconsistente — cobrindo o aluno que entra e sai da academia e se autodeclara "intermediário" sem ter a coordenação de quem treina sem pausas.

Decisão de produto: o motor não atribui dia da semana aos treinos — gera sessões rotativas (Upper A/B, Lower A/B...) que o usuário encaixa na própria rotina, não um calendário fixo.

Decisão de produto: o treino fica FIXO durante um bloco (trocar toda semana quebra aderência), mas o tamanho e a quantidade de blocos não são um número universal fixo — são calculados a partir de `goalDurationDays`, o período que a própria pessoa estipulou pra aquele protocolo (ex: 35 dias, 60 dias, 90 dias — o que ela definir). Sem data informada, cai num mesociclo padrão único. Com data, o motor monta um plano de blocos (mesociclo + deload entre eles) e só reconsidera a seleção de exercício nas FRONTEIRAS entre blocos — nunca dentro de um bloco. Se a pessoa tem uma data-alvo específica (evento, não só um objetivo genérico), o último bloco tapera nos dias finais; sem isso, mantém estímulo alto até o fim. Como o público não são iniciantes, não existe fase de "rodagem" — janelas curtas aceleram a rampa de volume em vez de diluí-la. Ver `periodizationByGoalDuration` em `data/progression-rules.json`.

Pendências conhecidas (ver `docs/engine-flow.md`):

- Tela de cadastro pra coletar equipamento disponível (o campo e o filtro já existem) — fica pra quando desenharmos as telas.
- Fórmula de quantos exercícios por grupo ainda é uma estimativa de bom senso quando não há rotina atual informada pra ancorar.
- A cobertura secundária que decide o corte por tempo só olha o dia, não a semana inteira.
- Cadastro ainda não pergunta qual split o usuário já treina/prefere — isso devia pesar na escolha, não só dias/nível/rank.
- Cadastro também ainda não pergunta `trainingConsistency`, `sameDayAsMusculacao`, `goalDurationDays` nem `eventBound` (campos novos) — a lógica já está no motor, falta a tela.
- Esperando retorno de outros personal trainers pra validar os ajustes desta rodada antes de calibrar mais a fundo (ex: `highSetupOverheadExtraMinutes`, quais outros exercícios mereceriam a tag, se o viés de equipamento guiado devia valer só pra compostos).
- O plano de periodização por `goalDurationDays` só materializa exercício-a-exercício o bloco 1 — blocos seguintes aparecem no plano (duração, deload, refresh, taper) mas sem a lista de exercício gerada ainda.
