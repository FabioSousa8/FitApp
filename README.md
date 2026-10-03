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
  exercise-bank.json               # 209 exercícios: grupo muscular, papel, equipamento, tags de contraindicação, custo de recuperação
  exercise-selection-rules.json    # Como cruzar grupo-alvo × papel × equipamento × limitações pra escolher os exercícios do dia
test/
  test-personas.json               # 4 perfis de teste para validar a lógica do motor (limitações como tags fechadas, não texto livre)
  simulate-engine.js                # Simulador: roda as personas contra as regras e mostra o plano gerado
docs/
  engine-flow.md                    # Como as peças do motor se conectam (intake → split → volume → progressão)
```

## Rodar a simulação

```bash
node test/simulate-engine.js
```

## Status

Motor rodando de ponta a ponta: `node test/simulate-engine.js` gera o protocolo semanal completo (split, exercício, séries, reps por dia) pras 4 personas de teste, já aplicando ranking de atividade, teto de tempo por sessão e banco de exercícios. Pendências conhecidas (ver `docs/engine-flow.md`):

- Tela de cadastro pra coletar equipamento disponível (o campo e o filtro já existem).
- Fórmula de quantos exercícios por grupo ainda é uma estimativa de bom senso quando não há rotina atual informada pra ancorar.
- Grupos pequenos (deltoide, bíceps, tríceps) ficam sistematicamente de fora em sessões muito curtas — falta rotacionar o corte entre os dias.
- Agendamento por dia da semana (evitar treino pesado de pernas no dia anterior a um jogo, ou fatiar com precisão o tempo entre cardio e musculação no mesmo dia).
