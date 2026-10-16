// Carrega as regras de data/*.json pros módulos do motor. require() em vez de
// fs.readFileSync (mudança out/2026, ver item "cadastro/login + scaffold mobile" do
// README) — Node resolve JSON via require() nativamente, e isso também é o que o
// bundler Metro (Expo/React Native) sabe fazer, sem precisar de fs no runtime. Isso
// deixa o motor utilizável tanto num backend Node quanto embarcado direto no app
// mobile (ver app/metro.config.js pro watchFolders que permite o app, fora da raiz
// deste pacote, alcançar engine/ e data/).
module.exports = {
  landmarks: require("../data/training-volume-landmarks.json"),
  progression: require("../data/progression-rules.json"),
  activityPriority: require("../data/activity-priority-rules.json"),
  sessionTimeRules: require("../data/session-time-rules.json"),
  exerciseBank: require("../data/exercise-bank.json"),
  splitStyleRules: require("../data/split-style-rules.json"),
  cardioRules: require("../data/cardio-rules.json"),
};
