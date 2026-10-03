// Simulador do motor: roda as personas de teste contra TODAS as regras (volume,
// progressão, ranking de atividades, tempo por sessão, banco de exercícios) e
// gera o protocolo semanal completo — dia por dia, exercício por exercício.
//
// Rodar com: node test/simulate-engine.js
// (a partir da pasta raiz do projeto FitApp)

const fs = require("fs");
const path = require("path");

function loadData(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", file), "utf8"));
}

const landmarks = loadData("training-volume-landmarks.json");
const progression = loadData("progression-rules.json");
const activityPriority = loadData("activity-priority-rules.json");
const sessionTimeRules = loadData("session-time-rules.json");
const exerciseBank = loadData("exercise-bank.json");
const personas = JSON.parse(fs.readFileSync(path.join(__dirname, "test-personas.json"), "utf8")).personas;

// --- 1. Seleção de split baseada em dias disponíveis ---
function selectSplit(daysAvailable) {
  if (daysAvailable <= 3) return { name: "Full Body / Upper-Lower alternado", days: buildDays(daysAvailable, ["fullbody"]) };
  if (daysAvailable === 4) return { name: "Upper/Lower 2x", days: ["upper", "lower", "upper", "lower"] };
  if (daysAvailable === 5) return { name: "Upper/Lower + PPL híbrido", days: ["upper", "lower", "push", "pull", "legs"] };
  return { name: "PPL 2x", days: ["push", "pull", "legs", "push", "pull", "legs"] };
}
function buildDays(n, base) {
  const days = [];
  for (let i = 0; i < n; i++) days.push(base[0] + "_" + (i + 1));
  return days;
}

// Quais grupos cada tipo de dia trabalha (simplificado p/ simulação).
// A ordem dentro de cada lista já aproxima a alternância empurra/puxa.
const dayMuscleMap = {
  fullbody: ["chest", "backLats", "quads", "hamstrings", "sideDelts", "biceps", "triceps"],
  upper: ["chest", "backLats", "backThickness", "sideDelts", "rearDelts", "biceps", "triceps"],
  lower: ["quads", "hamstrings", "glutes", "calves", "abs"],
  push: ["chest", "frontDelts", "sideDelts", "triceps"],
  pull: ["backLats", "backThickness", "rearDelts", "biceps"],
  legs: ["quads", "hamstrings", "glutes", "calves"],
};
function dayType(dayLabel) {
  return dayLabel.split("_")[0];
}

// --- 2. Objetivo via ranking de atividades (activity-priority-rules.json) ---
function resolveActivityObjective(persona) {
  const activities = persona.physicalActivities || [];
  const musc = activities.find((a) => a.name === "Musculação");
  const totalWeeklyActivityDays = activities.reduce((s, a) => s + a.frequencyPerWeek, 0);
  const isRank1 = !!musc && musc.rank === 1;
  const tier = activityPriority.weeklyLoadBudget.tiers.find((t) => {
    const min = t.minTotalDays || 0;
    const max = t.maxTotalDays === undefined ? Infinity : t.maxTotalDays;
    return totalWeeklyActivityDays >= min && totalWeeklyActivityDays <= max;
  });
  return { musc, isRank1, totalWeeklyActivityDays, tier };
}

// --- 3. Volume semanal alvo por grupo (MEV como início de mesociclo, com teto de prioridade) ---
function weeklyTargetSets(group, level, objective) {
  const l = landmarks.muscleGroups[group][level];
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

// --- 4. Séries/reps por papel do exercício (progression-rules.json) ---
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

// --- 5. Seleção de exercícios (exercise-bank.json + exercise-selection-rules.json) ---
const RECOVERY_ORDER = { low: 0, medium: 1, high: 2 };
function pickForGroup(group, exerciseCount, availableEquipment, limitationTags, preferLowRecovery, usedIds) {
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

// --- 6. Monta o protocolo completo de uma persona ---
function buildProtocol(persona) {
  const objective = resolveActivityObjective(persona);
  const split = selectSplit(persona.daysAvailable);
  const groupsHit = new Set();
  split.days.forEach((d) => dayMuscleMap[dayType(d)].forEach((g) => groupsHit.add(g)));

  const daysPerGroup = {};
  groupsHit.forEach((g) => {
    daysPerGroup[g] = split.days.filter((d) => dayMuscleMap[dayType(d)].includes(g)).length;
  });

  const limitationTags = (persona.limitations || []).map((l) => l.tag);
  const availableEquipment = persona.availableEquipment || ["bodyweight"];
  const currentRoutine = (persona.currentRoutine && persona.currentRoutine.exerciseCountByGroup) || {};
  const goalKey = objective.isRank1 || !objective.musc ? "hypertrophy" : "maintenance_support";
  const preferLowRecovery = goalKey === "maintenance_support";

  const groupInfo = {};
  groupsHit.forEach((g) => {
    const wt = weeklyTargetSets(g, persona.level, objective);
    const perDaySets = wt.sets / daysPerGroup[g];
    const exerciseCount =
      currentRoutine[g] != null ? currentRoutine[g] : Math.max(1, Math.round(perDaySets / 3));
    const anchored = currentRoutine[g] != null;
    groupInfo[g] = { ...wt, perDaySets, exerciseCount, anchored };
  });

  const warnings = [];
  const { avgMinutesPerWorkingSet, generalWarmupMinutesPerSession } = sessionTimeRules.setsPerMinuteModel;
  const budgetMinutes = Math.max(0, persona.sessionMinutes - generalWarmupMinutesPerSession);

  const usedIds = new Set();
  const dayPlans = split.days.map((dayLabel) => {
    const groups = dayMuscleMap[dayType(dayLabel)].filter((g) => groupsHit.has(g));
    let items = [];
    groups.forEach((g) => {
      const info = groupInfo[g];
      const { chosen, gap } = pickForGroup(g, info.exerciseCount, availableEquipment, limitationTags, preferLowRecovery, usedIds);
      if (gap) warnings.push(`Sem exercício disponível pra "${g}" com o equipamento/limitações informados.`);
      chosen.forEach((ex) => usedIds.add(ex.id));
      chosen.forEach((ex) => {
        const sets = setsForRole(ex.role);
        const [rlo, rhi] = repsForRole(ex.role, goalKey);
        items.push({
          group: g,
          name: ex.name,
          role: ex.role,
          sets,
          repsLabel: `${rlo}-${rhi}`,
          minutesPerSet: avgMinutesPerWorkingSet[ex.role === "isolation_accessory" ? "isolation" : "compound"],
        });
      });
    });

    const priority = items.filter((i) => i.role !== "isolation_accessory").concat(items.filter((i) => i.role === "isolation_accessory"));
    let used = 0;
    const kept = [];
    let trimmedCount = 0;
    priority.forEach((it) => {
      const cost = it.sets * it.minutesPerSet;
      if (used + cost <= budgetMinutes) {
        kept.push(it);
        used += cost;
      } else {
        trimmedCount++;
      }
    });
    const order = {};
    groups.forEach((g, i) => (order[g] = i));
    kept.sort((a, b) => order[a.group] - order[b.group]);

    return { dayLabel, items: kept, trimmedCount, usedMinutes: Math.round(used) };
  });

  return { objective, split, groupInfo, dayPlans, warnings, goalKey, budgetMinutes, sessionMinutes: persona.sessionMinutes };
}

// --- 7. Impressão ---
console.log("=".repeat(70));
console.log("SIMULAÇÃO DO MOTOR — protocolo completo das 4 personas de teste");
console.log("=".repeat(70));

personas.forEach((p) => {
  console.log(`\n${"-".repeat(70)}\nPersona: ${p.id}`);
  console.log(`Nível: ${p.level} | Idade: ${p.age} | Dias/semana: ${p.daysAvailable} | Sessão: ${p.sessionMinutes}min | Meta: ${p.goal}`);
  if (p.limitations.length) console.log(`Limitações: ${p.limitations.map((l) => `${l.description} [${l.tag}]`).join("; ")}`);
  console.log(`Equipamento disponível: ${(p.availableEquipment || []).join(", ")}`);

  const protocol = buildProtocol(p);
  const { objective } = protocol;
  if (objective.musc) {
    console.log(
      `Atividades: ${p.physicalActivities.map((a) => `${a.name} (rank ${a.rank}, ${a.frequencyPerWeek}x/sem)`).join(" | ")}`
    );
    console.log(
      `Objetivo da musculação: ${protocol.goalKey}${objective.isRank1 ? "" : ` — ${objective.tier ? objective.tier.label : "sem tier"}`} ` +
        `(totalWeeklyActivityDays=${objective.totalWeeklyActivityDays}, soma simples — ver knownFlaw em activity-priority-rules.json)`
    );
  } else {
    console.log("Atividades: não informadas nesta persona — objetivo padrão (hipertrofia).");
  }

  console.log(`Split escolhido: ${protocol.split.name} (${protocol.split.days.join(" | ")})`);
  console.log(`Teto de tempo: ${p.sessionMinutes}min → orçamento de trabalho ${protocol.budgetMinutes}min após aquecimento`);

  protocol.dayPlans.forEach((day) => {
    console.log(`\n  ${day.dayLabel.toUpperCase()}  (~${day.usedMinutes}/${protocol.budgetMinutes}min)`);
    day.items.forEach((it) => {
      const anchorFlag = protocol.groupInfo[it.group].anchored ? "" : "";
      console.log(`    [${it.group.padEnd(14)}] ${it.name.padEnd(42)} ${it.sets}x${it.repsLabel} (${it.role})`);
    });
    if (day.trimmedCount > 0) {
      console.log(`    ⚠ ${day.trimmedCount} exercício(s) cortado(s) por falta de tempo na sessão.`);
    }
  });

  const anchoredGroups = Object.entries(protocol.groupInfo)
    .filter(([, v]) => v.anchored)
    .map(([g]) => g);
  if (anchoredGroups.length) {
    console.log(`\n  Ancorado na rotina atual do usuário: ${anchoredGroups.join(", ")}`);
  }
  if (protocol.warnings.length) {
    protocol.warnings.forEach((w) => console.log(`  ⚠ ${w}`));
  }
});

console.log("\n" + "=".repeat(70));
console.log("Fim da simulação. Confira se exercícios, séries e cortes por tempo");
console.log("fazem sentido antes de plugar essa lógica num backend de verdade.");
console.log("=".repeat(70));
