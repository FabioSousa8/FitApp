// Monta o protocolo completo de uma persona — o orquestrador do motor: cruza nível,
// objetivo, split, volume, periodização, descanso, exercícios e cardio.
const { sessionTimeRules } = require("./data");
const { resolveLevelFinal, engineLevel } = require("./level");
const { resolveActivityObjective } = require("./activity");
const { dayMuscleMap, pickSplitStyle, dayType } = require("./split");
const { weeklyTargetSets } = require("./volume");
const { planPeriodization, maxConsecutiveSessionsWithoutRest, estimateRestDays } = require("./periodization");
const { setsForRole, repsForRole, pickForGroup } = require("./exercises");
const { buildCardioPlan } = require("./cardio");

function buildProtocol(persona) {
  // Cruzamento de nível (training-volume-landmarks.json/levelClassification) — levelFinal
  // só pode puxar o autodeclarado pra baixo. engineLvl colapsa highly_advanced→advanced pros
  // lookups que ainda só têm 3 faixas (landmarks, split, cardio/recoverySlack, mesocycle).
  const { derived: levelDerived, final: levelFinalValue } = resolveLevelFinal(persona.level, persona.trainingTimeYears);
  const engineLvl = engineLevel(levelFinalValue);

  const objective = resolveActivityObjective(persona, levelFinalValue);
  const isRank1ForSplit = objective.isRank1 || !objective.musc;
  const splitPick = pickSplitStyle(persona.daysAvailable, engineLvl, isRank1ForSplit);
  const split = { name: splitPick.style.label, days: splitPick.days, alternatives: splitPick.alternatives };
  const groupsHit = new Set();
  split.days.forEach((d) => dayMuscleMap[dayType(d)].forEach((g) => groupsHit.add(g)));

  const daysPerGroup = {};
  groupsHit.forEach((g) => {
    daysPerGroup[g] = split.days.filter((d) => dayMuscleMap[dayType(d)].includes(g)).length;
  });

  const limitationTags = (persona.limitations || []).map((l) => l.tag);
  const availableEquipment = persona.availableEquipment || ["bodyweight"];
  const currentRoutine = (persona.currentRoutine && persona.currentRoutine.exerciseCountByGroup) || {};
  // maintenance_support agora tem 2 gatilhos independentes (ver resolveActivityObjective) —
  // o rankBased (musc existe e não é rank1) OU o goalBased (já calculado em objective).
  const isMaintenance = objective.goalBasedMaintenance || (!!objective.musc && !objective.isRank1);
  // manualEscalation (activity-priority-rules.json): só o gatilho goalBased pode ser escalado.
  const escalationActive = objective.goalBasedMaintenance && !!persona.userRequestedEscalation;
  // "comprimido" (periodização) fica inerte quando o teto é maintenance_support flat — mas
  // volta a valer se a escalada manual já levantou o teto pra MEV→MAV/MRV normal.
  const periodizationIsMaintenance = isMaintenance && !escalationActive;
  const goalKey = isMaintenance ? "maintenance_support" : "hypertrophy";
  const preferLowRecovery = goalKey === "maintenance_support";
  // "pausas_curtas" (interrupções breves) cai no mesmo tratamento de "continuo" aqui, de propósito:
  // o viés de equipamento guiado existe pra quem perde coordenação motora em hiatos longos
  // (meses sem treinar), não pra quem só teve pausas curtas — ver trainingConsistencyNote em
  // data/exercise-selection-rules.json.
  const preferGuidedEquipment = persona.trainingConsistency === "esporadico";

  const groupInfo = {};
  groupsHit.forEach((g) => {
    const wt = weeklyTargetSets(g, engineLvl, objective, persona.userRequestedEscalation);
    const perDaySets = wt.sets / daysPerGroup[g];
    const exerciseCount =
      currentRoutine[g] != null ? currentRoutine[g] : Math.max(1, Math.round(perDaySets / 3));
    const anchored = currentRoutine[g] != null;
    groupInfo[g] = { ...wt, perDaySets, exerciseCount, anchored };
  });

  const warnings = [];
  const { avgMinutesPerWorkingSet, generalWarmupMinutesPerSession, highSetupOverheadExtraMinutes } = sessionTimeRules.setsPerMinuteModel;
  const budgetMinutes = Math.max(0, persona.sessionMinutes - generalWarmupMinutesPerSession);

  // Ordem atividade secundária x musculação no mesmo dia (activity-priority-rules.json/
  // sameDayOrderingNote): feedback real de PT é que isso impacta o estímulo aplicado,
  // mas o motor não tenta recalcular volume/RIR a partir disso — só alerta quando
  // musculação é a prioridade e outra atividade vem antes dela no mesmo dia.
  if (objective.isRank1) {
    (persona.physicalActivities || []).forEach((a) => {
      if (a.name !== "Musculação" && a.sameDayAsMusculacao === "antes") {
        warnings.push(
          `${a.name} antes da musculação no mesmo dia pode reduzir o estímulo de força/hipertrofia — se musculação é prioridade, considere treiná-la primeiro ou separar os dias.`
        );
      }
    });
  }

  // Quando um tipo de dia se repete na semana (ex: fullbody#1/#2/#3, ou upper#1/#2),
  // dayMuscleMap lista os grupos sempre na mesma ordem — sem rotação, o corte por
  // tempo (fase 1 abaixo) sempre sacrificaria os MESMOS grupos no fim da lista em
  // TODAS as repetições (ex: full body com pouco tempo nunca treinaria perna/abdômen
  // a semana inteira). Rotacionar o ponto de partida a cada ocorrência garante que,
  // ao longo da semana, a prioridade passe por mais grupos possíveis antes de repetir.
  const dayTypeOccurrences = {};
  split.days.forEach((d) => {
    const t = dayType(d);
    dayTypeOccurrences[t] = (dayTypeOccurrences[t] || 0) + 1;
  });

  const usedIds = new Set();
  const dayPlans = split.days.map((dayLabel) => {
    const t = dayType(dayLabel);
    const baseGroups = dayMuscleMap[t].filter((g) => groupsHit.has(g));
    const totalOccurrences = dayTypeOccurrences[t];
    const occMatch = dayLabel.match(/#(\d+)$/);
    const occurrence = occMatch ? parseInt(occMatch[1], 10) : 1;
    const rotateBy = totalOccurrences > 1 ? Math.floor(((occurrence - 1) * baseGroups.length) / totalOccurrences) : 0;
    const groups = baseGroups.slice(rotateBy).concat(baseGroups.slice(0, rotateBy));
    let items = [];
    groups.forEach((g) => {
      const info = groupInfo[g];
      const { chosen, gap } = pickForGroup(g, info.exerciseCount, availableEquipment, limitationTags, preferLowRecovery, usedIds, preferGuidedEquipment);
      if (gap) warnings.push(`Sem exercício disponível pra "${g}" com o equipamento/limitações informados.`);
      chosen.forEach((ex) => usedIds.add(ex.id));
      chosen.forEach((ex) => {
        const sets = setsForRole(ex.role);
        const [rlo, rhi] = repsForRole(ex.role, goalKey);
        const baseMinutes = avgMinutesPerWorkingSet[ex.role === "isolation_accessory" ? "isolation" : "compound"];
        items.push({
          group: g,
          name: ex.name,
          role: ex.role,
          sets,
          repsLabel: `${rlo}-${rhi}`,
          minutesPerSet: baseMinutes + (ex.highSetupOverhead ? highSetupOverheadExtraMinutes : 0),
          secondaryMuscleGroups: ex.secondaryMuscleGroups || [],
        });
      });
    });

    // Fase 1: compostos (primary/secondary_compound) entram primeiro, na ordem dos grupos do dia.
    const compounds = items.filter((i) => i.role !== "isolation_accessory");
    let used = 0;
    const kept = [];
    let trimmedCount = 0;
    compounds.forEach((it) => {
      const cost = it.sets * it.minutesPerSet;
      if (used + cost <= budgetMinutes) {
        kept.push(it);
        used += cost;
      } else {
        trimmedCount++;
      }
    });

    // Fase 2: isolamento entra ordenado por "quanto estímulo secundário o grupo já recebeu"
    // dos compostos que sobreviveram — quem já é estimulado por outro exercício (ex: tríceps
    // via supino) cede espaço primeiro pra quem não tem estímulo secundário de ninguém
    // (ex: deltoide posterior, raramente secundário de um composto).
    const secondaryCoverage = {};
    kept.forEach((it) => {
      it.secondaryMuscleGroups.forEach((g) => {
        secondaryCoverage[g] = (secondaryCoverage[g] || 0) + 1;
      });
    });
    const isolationItems = items
      .filter((i) => i.role === "isolation_accessory")
      .map((it, originalIndex) => ({ it, originalIndex, coverage: secondaryCoverage[it.group] || 0 }))
      .sort((a, b) => a.coverage - b.coverage || a.originalIndex - b.originalIndex)
      .map((x) => x.it);
    isolationItems.forEach((it) => {
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

  const periodization = planPeriodization(persona.goalDurationDays, engineLvl, persona.eventBound, periodizationIsMaintenance);
  // restDayModel (progression-rules.json, Opção B): estimativa de descansos por bloco de
  // treino, derivada da cadência mínima pra daysAvailable — aviso não-bloqueante, nunca
  // bloqueia o registro real de um treino (isso é lógica de check-in, fora deste motor).
  const restCadence = maxConsecutiveSessionsWithoutRest(persona.daysAvailable);
  periodization.restCadence = restCadence;
  periodization.blocks.forEach((b) => {
    if (b.type === "treino") b.restDaysEstimate = estimateRestDays(b.lengthSessions, restCadence);
  });

  const cardioPlan = buildCardioPlan(persona, goalKey, engineLvl);
  // orderingAndSafety (cardio-rules.json): quando cardioEmphasis é mínima e existe uma
  // entrada "Cardio" caindo no mesmo dia da musculação, sinalizar — nunca recalcular nada.
  if (!cardioPlan.skipped && cardioPlan.cardioEmphasis === "minima") {
    const cardioActivity = (persona.physicalActivities || []).find((a) => a.name === "Cardio" && a.sameDayAsMusculacao);
    if (cardioActivity) {
      warnings.push(
        `Cardio e musculação no mesmo dia com cardioEmphasis mínima: priorizar musculação primeiro e preferir LISS nesse dia específico, mesmo que a banda geral permita mais (cardio-rules.json/orderingAndSafety).`
      );
    }
  }

  return {
    objective,
    split,
    groupInfo,
    dayPlans,
    warnings,
    goalKey,
    budgetMinutes,
    sessionMinutes: persona.sessionMinutes,
    periodization,
    cardioPlan,
    levelInfo: { selfDeclared: persona.level, derived: levelDerived, final: levelFinalValue },
    escalationActive,
  };
}

module.exports = { buildProtocol };
