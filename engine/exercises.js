// Séries/reps por papel do exercício (progression-rules.json) e seleção de exercícios
// (exercise-bank.json + exercise-selection-rules.json).
const { progression, exerciseBank } = require("./data");

function setsForRole(role) {
  const r = progression.exerciseRoleProgramming.roles[role];
  if (!r) return 3;
  const [lo, hi] = r.setsRange;
  return Math.round((lo + hi) / 2);
}

function repsForRole(role, goalKey) {
  const [lo, hi] = progression.repRangesByGoal[goalKey] || progression.repRangesByGoal.hypertrophy;
  if (role === "primary_compound") return [lo, Math.round((lo + hi) / 2)];
  if (role === "isolation_accessory") return [Math.round((lo + hi) / 2), hi + (goalKey === "maintenance_support" ? 0 : 3)];
  return [lo, hi];
}

const RECOVERY_ORDER = { low: 0, medium: 1, high: 2 };
const EQUIPMENT_COMPLEXITY_ORDER = exerciseBank.equipmentComplexityOrder || [];

function equipmentComplexityRank(e) {
  const ranks = e.equipment.map((eq) => {
    const i = EQUIPMENT_COMPLEXITY_ORDER.indexOf(eq);
    return i === -1 ? EQUIPMENT_COMPLEXITY_ORDER.length : i;
  });
  return Math.min(...ranks);
}

function pickForGroup(group, exerciseCount, availableEquipment, limitationTags, preferLowRecovery, usedIds, preferGuidedEquipment) {
  const pool = exerciseBank.exercises.filter(
    (e) =>
      e.primaryMuscleGroup === group &&
      e.equipment.some((eq) => availableEquipment.includes(eq)) &&
      !e.contraindicationTags.some((t) => limitationTags.includes(t))
  );
  const byRole = {
    primary_compound: pool.filter((e) => e.role === "primary_compound"),
    secondary_compound: pool.filter((e) => e.role === "secondary_compound"),
    isolation_accessory: pool.filter((e) => e.role === "isolation_accessory"),
  };
  if (preferLowRecovery) {
    Object.values(byRole).forEach((list) => list.sort((a, b) => RECOVERY_ORDER[a.recoveryCost] - RECOVERY_ORDER[b.recoveryCost]));
  }
  // Preferir exercícios ainda não usados nos outros dias da semana (variedade),
  // sem perder a ordenação por recoveryCost já aplicada acima.
  if (usedIds) {
    Object.values(byRole).forEach((list) => list.sort((a, b) => (usedIds.has(a.id) ? 1 : 0) - (usedIds.has(b.id) ? 1 : 0)));
  }
  // trainingConsistency == "esporadico" (exercise-selection-rules.json passo 2.5): favorece
  // equipamento guiado (máquina/smith/cabo) sobre peso livre, independente do nível autodeclarado.
  // Vira o critério DOMINANTE (último sort, igual ao usedIds acima) — variedade e recoveryCost
  // ainda decidem empates dentro do mesmo nível de complexidade de equipamento.
  if (preferGuidedEquipment) {
    Object.values(byRole).forEach((list) => list.sort((a, b) => equipmentComplexityRank(a) - equipmentComplexityRank(b)));
  }
  const chosen = [];
  const idx = { primary_compound: 0, secondary_compound: 0, isolation_accessory: 0 };
  const firstPass = ["primary_compound", "secondary_compound", "isolation_accessory"];
  let remaining = exerciseCount;
  firstPass.forEach((role) => {
    if (remaining <= 0) return;
    const list = byRole[role];
    if (idx[role] < list.length) {
      chosen.push({ ...list[idx[role]], role });
      idx[role]++;
      remaining--;
    }
  });
  const fillCycle = ["isolation_accessory", "secondary_compound", "primary_compound"];
  while (remaining > 0) {
    let added = false;
    for (const role of fillCycle) {
      const list = byRole[role];
      if (idx[role] < list.length) {
        chosen.push({ ...list[idx[role]], role });
        idx[role]++;
        remaining--;
        added = true;
        if (remaining <= 0) break;
      }
    }
    if (!added) break;
  }
  return { chosen, gap: chosen.length === 0 };
}

module.exports = { setsForRole, repsForRole, pickForGroup, equipmentComplexityRank };
