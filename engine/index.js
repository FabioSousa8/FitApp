// Ponto de entrada público do motor FitApp. Extraído de test/simulate-engine.js em
// out/2026 — até então o motor só existia como script de teste/print, inseparável da
// impressão no terminal. Essa extração é o primeiro passo pra ligar essa lógica a
// qualquer camada de cima (API, app mobile, outro script de teste) sem depender do
// simulador.
//
// generateProtocol(persona) é a única função que um consumidor externo deveria
// precisar: recebe o perfil do usuário (mesmo shape de test/test-personas.json —
// level, trainingTimeYears, daysAvailable, sessionMinutes, goalCategory, physicalActivities,
// limitations, availableEquipment, goalDurationDays, eventBound, etc.) e devolve o
// protocolo completo (split escolhido + alternativas, periodização em blocos, plano
// dia a dia com exercício/séries/reps, cardio, avisos).
//
// Módulos internos (não exportados aqui de propósito — use generateProtocol, não as
// peças soltas, a menos que esteja escrevendo um teste que precisa inspecionar uma
// etapa isolada, caso em que dá pra importar o arquivo específico diretamente):
//   data.js            → carrega e expõe as regras de data/*.json
//   level.js           → classificação de nível (cruzamento autodeclarado × tempo de treino)
//   activity.js        → objetivo da musculação via ranking de atividades
//   volume.js          → volume semanal alvo por grupo muscular (MEV/MAV/MRV)
//   periodization.js   → blocos de treino/deload por goalDurationDays + modelo de descanso
//   exercises.js       → séries/reps por papel + seleção de exercício no banco
//   cardio.js          → modalidade/frequência/duração de cardio
//   protocol.js        → orquestra tudo acima em buildProtocol(persona)
const { buildProtocol } = require("./protocol");

module.exports = {
  generateProtocol: buildProtocol,
};
