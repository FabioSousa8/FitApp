// Seleção de split (split-style-rules.json) — não existe UM estilo certo por quantidade
// de dias: cada estilo (FB, FBEOD, U/L, PPL/ABC, ABCD, ABCDE/Bro Split, híbrido) define um
// ciclo de tipos de dia, e o motor filtra os que cabem em daysAvailable, sugere um default
// pela combinação nível + (musculação é rank 1?), e sempre expõe as outras opções viáveis
// junto — nunca fecha numa resposta só (ver selectionGuidance em split-style-rules.json).
const { splitStyleRules } = require("./data");

const dayMuscleMap = splitStyleRules.dayMuscleMap;

function profileKey(isRank1, level) {
  return isRank1 ? `rank1_${level}` : "nonRank1_qualquerNivel";
}

function viableStyleEntries(daysAvailable) {
  return Object.entries(splitStyleRules.styles).filter(([, s]) => s.cycle.length <= daysAvailable);
}

function isIdealFit(style, daysAvailable) {
  const [lo, hi] = style.idealDaysRange;
  return daysAvailable >= lo && daysAvailable <= hi;
}

// Repete o ciclo de tipos de dia do estilo até preencher daysAvailable; numera
// (#1, #2...) só o tipo de dia que de fato se repete na semana, pra não poluir
// o label quando o ciclo cabe exatamente (ex: ABCD em 4 dias).
function buildWeekDays(cycle, daysAvailable) {
  const totalOccurrence = {};
  for (let i = 0; i < daysAvailable; i++) {
    const t = cycle[i % cycle.length];
    totalOccurrence[t] = (totalOccurrence[t] || 0) + 1;
  }
  const occurrence = {};
  const days = [];
  for (let i = 0; i < daysAvailable; i++) {
    const t = cycle[i % cycle.length];
    occurrence[t] = (occurrence[t] || 0) + 1;
    days.push(totalOccurrence[t] > 1 ? `${t}#${occurrence[t]}` : t);
  }
  return days;
}

function dayType(dayLabel) {
  return dayLabel.split("#")[0];
}

function pickSplitStyle(daysAvailable, level, isRank1) {
  const guidance = splitStyleRules.selectionGuidance;
  const order = guidance.preferredOrderByProfile[profileKey(isRank1, level)] || guidance.preferredOrderByProfile.nonRank1_qualquerNivel;
  const viable = new Map(viableStyleEntries(daysAvailable));

  const idealMatches = order.filter((key) => viable.has(key) && isIdealFit(viable.get(key), daysAvailable));
  const rest = order.filter((key) => viable.has(key) && !idealMatches.includes(key));
  let orderedViable = idealMatches.length > 0 ? idealMatches.concat(rest) : order.filter((key) => viable.has(key));
  if (orderedViable.length === 0) orderedViable = ["full_body"]; // fallback absoluto, cycle.length 1 sempre cabe

  const chosenKey = orderedViable[0];
  const chosenStyle = viable.get(chosenKey) || splitStyleRules.styles[chosenKey];
  const alternativeKeys = orderedViable.slice(1, 3);
  return {
    key: chosenKey,
    style: chosenStyle,
    days: buildWeekDays(chosenStyle.cycle, daysAvailable),
    alternatives: alternativeKeys.map((k) => splitStyleRules.styles[k].label),
  };
}

module.exports = { dayMuscleMap, pickSplitStyle, buildWeekDays, dayType, profileKey, viableStyleEntries, isIdealFit };
