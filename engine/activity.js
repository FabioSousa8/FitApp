// Objetivo via ranking de atividades (activity-priority-rules.json) — maintenanceSupportTriggers
// (activity-priority-rules.json): DOIS gatilhos independentes levam a "maintenance_support" —
// rankBased (rank > 1, tratado via tier) e goalBased (rank == 1 mas a pessoa escolheu "saúde
// geral, sem meta específica" E já é treinada — level != beginner). Correção de feedback do
// fundador: rank 1 decide PRIORIDADE entre atividades, não implica objetivo de crescimento.
const { activityPriority } = require("./data");

function resolveActivityObjective(persona, levelFinalValue) {
  const activities = persona.physicalActivities || [];
  const musc = activities.find((a) => a.name === "Musculação");
  const totalWeeklyActivityDays = activities.reduce((s, a) => s + a.frequencyPerWeek, 0);
  const isRank1 = !!musc && musc.rank === 1;
  const tier = activityPriority.weeklyLoadBudget.tiers.find((t) => {
    const min = t.minTotalDays || 0;
    const max = t.maxTotalDays === undefined ? Infinity : t.maxTotalDays;
    return totalWeeklyActivityDays >= min && totalWeeklyActivityDays <= max;
  });
  // beginnerException (activity-priority-rules.json/maintenanceSupportTriggers.goalBased) agora
  // olha levelFinal (cruzado com trainingTimeYears), não o "level" autodeclarado puro — um
  // intermediate autodeclarado com poucos meses reais de treino não escapa mais da exceção.
  const goalBasedMaintenance =
    isRank1 && persona.goalCategory === "saude_geral_sem_meta_especifica" && levelFinalValue !== "beginner";
  return { musc, isRank1, totalWeeklyActivityDays, tier, goalBasedMaintenance };
}

module.exports = { resolveActivityObjective };
