// Classificação de nível (training-volume-landmarks.json/levelClassification) — levelFinal
// só pode puxar o autodeclarado pra baixo. engineLevel() colapsa "highly_advanced" em
// "advanced" pros lookups que ainda só têm 3 faixas (landmarks, split, cardio) — ver
// engineLevelMapping.
const { landmarks } = require("./data");

const LEVEL_ORDER = landmarks.levelClassification.levelOrder;

function derivedLevelFromTime(trainingTimeYears) {
  const bands = landmarks.levelClassification.derivedLevelFromTimeBands;
  const years = trainingTimeYears || 0;
  const band = bands.find((b) => years >= b.minYears && (b.maxYears == null || years < b.maxYears));
  return band ? band.level : bands[0].level;
}

function resolveLevelFinal(selfDeclaredLevel, trainingTimeYears) {
  const derived = derivedLevelFromTime(trainingTimeYears);
  const selfIdx = LEVEL_ORDER.indexOf(selfDeclaredLevel);
  const derivedIdx = LEVEL_ORDER.indexOf(derived);
  const finalIdx = Math.min(selfIdx, derivedIdx);
  return { derived, final: LEVEL_ORDER[finalIdx] };
}

function engineLevel(level) {
  return level === "highly_advanced" ? "advanced" : level;
}

module.exports = { resolveLevelFinal, engineLevel, derivedLevelFromTime, LEVEL_ORDER };
