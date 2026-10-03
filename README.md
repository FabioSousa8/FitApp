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
test/
  test-personas.json               # 4 perfis de teste para validar a lógica do motor
  simulate-engine.js                # Simulador: roda as personas contra as regras e mostra o plano gerado
docs/
  engine-flow.md                    # Como as peças do motor se conectam (intake → split → volume → progressão)
```

## Rodar a simulação

```bash
node test/simulate-engine.js
```

## Status

Motor em validação. Pendências conhecidas (ver `docs/engine-flow.md`):

- Incorporar `sessionMinutes` (tempo disponível por treino) na alocação de volume — hoje o motor decide o volume semanal total, mas não limita quantas séries cabem numa sessão curta.
- Agendamento por dia da semana (evitar treino pesado de pernas no dia anterior a um jogo, por exemplo).
- Banco de exercícios com seleção fina por atividade de suporte.
