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

Motor em validação. Todas as regras abaixo existem como dados/regras, mas **nenhuma ainda está plugada em `simulate-engine.js`** — o simulador hoje só mostra os números semanais de referência (MEV/MAV/MRV). Ligar tudo isso é o próximo passo grande. Pendências conhecidas (ver `docs/engine-flow.md`):

- `sessionMinutes` → teto de séries por sessão (`session-time-rules.json`).
- Agendamento por dia da semana (evitar treino pesado de pernas no dia anterior a um jogo, ou fatiar com precisão o tempo entre cardio e musculação no mesmo dia).
- Banco de exercícios (`exercise-bank.json`, `exercise-selection-rules.json`): falta coletar equipamento disponível no cadastro, e a fórmula exata de quantos exercícios por grupo.
