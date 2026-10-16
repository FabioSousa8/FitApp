// Volume semanal alvo por grupo (MEV como início de mesociclo, com teto de prioridade).
const { landmarks } = require("./data");

function weeklyTargetSets(group, level, objective, userRequestedEscalation) {
  const l = landmarks.muscleGroups[group][level];
  // manualEscalation (activity-priority-rules.json): SÓ o gatilho goalBased pode ser escalado
  // manualmente — o rankBased reflete recuperação de fato dividida com outra atividade, não
  // escolha pessoal, então nunca é levantado por essa via (ver whyNotRankBased).
  if (objective.goalBasedMaintenance && userRequestedEscalation) {
    return { sets: l.mev, mev: l.mev, mav: l.mav, mrv: l.mrv, capLabel: "teto: mav/mrv (maintenance_support, mas escalada manual solicitada pelo usuário — ver activity-priority-rules.json/manualEscalation; volta pra progressão normal MEV→MAV/MRV mesmo mantendo rep range/RIR de maintenance_support)" };
  }
  if (objective.goalBasedMaintenance) {
    return { sets: l.mev, mev: l.mev, mav: l.mav, mrv: l.mrv, capLabel: "teto: mev (maintenance_support — objetivo pessoal, sem atividade concorrente, ver maintenanceSupportTriggers.goalBased)" };
  }
  if (objective.isRank1 || !objective.musc) {
    return { sets: l.mev, mev: l.mev, mav: l.mav, mrv: l.mrv, capLabel: "progressão normal rumo ao MAV/MRV (rank 1)" };
  }
  const capType = objective.tier ? objective.tier.volumeCapForNonRank1 : "mav";
  let capSets = l.mav[1];
  if (capType === "mev") capSets = l.mev;
  if (capType === "below_mev") {
    const [lo, hi] = (objective.tier && objective.tier.volumeReductionPct) || [10, 20];
    capSets = Math.round(l.mev * (1 - (lo + hi) / 2 / 100));
  }
  const sets = Math.min(l.mev, capSets);
  return { sets, mev: l.mev, mav: l.mav, mrv: l.mrv, capLabel: `teto: ${capType} (musculação não é rank 1)`, capSets };
}

module.exports = { weeklyTargetSets };
