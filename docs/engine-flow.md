# Fluxo do motor

1. **Intake** → nível (anos de treino + consistência, não auto-relato puro), objetivo, dias disponíveis, tempo por sessão, equipamento, limitações.

2. **Seleção de split** (baseado em daysAvailable):
   - 2-3 dias → Full body ou Upper/Lower alternado
   - 4 dias → Upper/Lower 2x
   - 5 dias → Upper/Lower + Push/Pull/Legs híbrido (ênfase nos grupos prioritários do usuário)
   - 6 dias → PPL 2x

3. **Alocação de volume** → para cada grupo muscular, pega o MEV do nível (training-volume-landmarks.json) como ponto de partida do mesociclo, distribui entre os dias do split escolhido.

4. **Seleção de exercícios** → banco curado (fora do escopo destes arquivos, mas cadastro próprio) filtrado por equipamento disponível e limitações reportadas (ex: joelho sensível remove agachamento livre pesado da lista).

5. **Geração do protocolo inicial** → treino + cardio + dieta (macro a parte) + suplementação, essa última só usando `supplementation-rules.json`.

6. **Check-ins** → cada log de sessão passa por `progression-rules.json`: decide subir carga, segurar, reduzir, ou disparar deload/revisão. Nunca é o LLM decidindo isso livremente — é a regra que decide, o LLM só explica o "porquê" em linguagem natural.

7. **Reavaliação de mesociclo** → ao fim do ciclo (ou por trigger de deload), sobe o volume-alvo em direção ao MAV, mantendo o teto do MRV como limite.
