// Carrega as regras de data/*.json uma vez e expõe pros módulos do motor. Caminho é
// relativo a este arquivo (engine/), não a quem faz o require — funciona igual seja
// chamado de test/, de um backend futuro, ou de dentro do próprio pacote.
const fs = require("fs");
const path = require("path");

function loadData(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", file), "utf8"));
}

module.exports = {
  landmarks: loadData("training-volume-landmarks.json"),
  progression: loadData("progression-rules.json"),
  activityPriority: loadData("activity-priority-rules.json"),
  sessionTimeRules: loadData("session-time-rules.json"),
  exerciseBank: loadData("exercise-bank.json"),
  splitStyleRules: loadData("split-style-rules.json"),
  cardioRules: loadData("cardio-rules.json"),
};
