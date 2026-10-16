// Simulador do motor: roda as personas de teste contra o módulo engine/ (motor extraído
// pra fora deste arquivo em out/2026 — ver engine/index.js) e imprime o protocolo semanal
// completo — dia por dia, exercício por exercício — pra conferência manual.
//
// Rodar com: node test/simulate-engine.js
// (a partir da pasta raiz do projeto FitApp)

const fs = require("fs");
const path = require("path");

const { generateProtocol } = require("../engine");

function loadData(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", file), "utf8"));
}

// Só pra imprimir detalhes do deload (volumeReduction, RIR) — o motor já usa esses
// mesmos dados internamente em engine/periodization.js.
const progression = loadData("progression-rules.json");
const personas = JSON.parse(fs.readFileSync(path.join(__dirname, "test-personas.json"), "utf8")).personas;

console.log("=".repeat(70));
console.log(`SIMULAÇÃO DO MOTOR — protocolo completo das ${personas.length} personas de teste`);
console.log("=".repeat(70));

personas.forEach((p) => {
  console.log(`\n${"-".repeat(70)}\nPersona: ${p.id}`);
  console.log(`Nível autodeclarado: ${p.level} | trainingTimeYears: ${p.trainingTimeYears} | Idade: ${p.age} | Dias/semana: ${p.daysAvailable} | Sessão: ${p.sessionMinutes}min | Meta: ${p.goal} [goalCategory: ${p.goalCategory || "não informado"}]`);
  if (p.limitations.length) console.log(`Limitações: ${p.limitations.map((l) => `${l.description} [${l.tag}]`).join("; ")}`);
  console.log(`Equipamento disponível: ${(p.availableEquipment || []).join(", ")}`);
  if (p.trainingConsistency === "esporadico") {
    console.log(`Consistência de treino: esporádico → viés pra equipamento guiado (máquina/smith/cabo) nos exercícios, independente do nível autodeclarado.`);
  }

  const protocol = generateProtocol(p);
  const { objective, levelInfo } = protocol;
  if (levelInfo.derived !== levelInfo.selfDeclared) {
    console.log(
      `Cruzamento de nível (training-volume-landmarks.json/levelClassification): autodeclarado=${levelInfo.selfDeclared}, derivado de ${p.trainingTimeYears}a de treino=${levelInfo.derived} → levelFinal=${levelInfo.final} ${levelInfo.final !== levelInfo.selfDeclared ? "(puxado pra baixo pelo tempo de treino)" : "(tempo de treino não puxou pra baixo — derivado é igual ou acima do autodeclarado)"}`
    );
  }
  if (objective.musc) {
    console.log(
      `Atividades: ${p.physicalActivities.map((a) => `${a.name} (rank ${a.rank}, ${a.frequencyPerWeek}x/sem)`).join(" | ")}`
    );
    const maintenanceOrigin = objective.goalBasedMaintenance
      ? ` — goalBased (rank 1, mas goalCategory=saude_geral_sem_meta_especifica + levelFinal!=beginner — teto direto no MEV, sem passar por weeklyLoadBudget)${protocol.escalationActive ? " · ESCALADA MANUAL ATIVA (userRequestedEscalation): teto levantado pra MEV→MAV/MRV normal" : ""}`
      : !objective.isRank1
      ? ` — rankBased (${objective.tier ? objective.tier.label : "sem tier"})`
      : "";
    console.log(
      `Objetivo da musculação: ${protocol.goalKey}${maintenanceOrigin} ` +
        `(totalWeeklyActivityDays=${objective.totalWeeklyActivityDays}, soma simples — ver knownFlaw em activity-priority-rules.json)`
    );
  } else {
    console.log("Atividades: não informadas nesta persona — objetivo padrão (hipertrofia).");
  }

  console.log(`Split escolhido: ${protocol.split.name} (${protocol.split.days.join(" | ")})`);
  if (protocol.split.alternatives && protocol.split.alternatives.length) {
    console.log(`  (também viável pro perfil: ${protocol.split.alternatives.join(", ")} — não é resposta fechada, só o default sugerido)`);
  }
  console.log(`Teto de tempo: ${p.sessionMinutes}min → orçamento de trabalho ${protocol.budgetMinutes}min após aquecimento`);

  const per = protocol.periodization;
  const periodLabel =
    per.mode === "sem_periodo_informado"
      ? `sem goalDurationDays informado → 1 mesociclo padrão de ${per.idealBlockSessions} treinos (fallback)`
      : `goalDurationDays=${p.goalDurationDays} (contado em TREINOS, não dias de calendário — ver progression-rules.json/periodizationByGoalDuration.unitChange_outOfOutubro2026)${p.eventBound ? " (eventBound: taper no bloco final)" : ""}`;
  console.log(`Periodização: ${periodLabel}`);
  console.log(`  Cadência mínima de descanso (restDayModel, Opção B — aviso não-bloqueante): até ${per.restCadence} treinos seguidos antes de recomendar descanso (daysAvailable=${p.daysAvailable})`);
  per.blocks.forEach((b, i) => {
    if (b.type === "deload") {
      console.log(`  Bloco ${i + 1}: DELOAD — ${b.lengthDays}d de calendário, fora do orçamento de sessões (${progression.deloadProtocol.volumeReduction} volume, RIR ${progression.deloadProtocol.intensityTargetRIR.join("-")})`);
    } else {
      const flags = [
        b.compressed ? "comprimido: rampa de volume acelerada rumo ao MAV" : null,
        b.exerciseRefresh ? "exercício reconsiderado no início deste bloco" : i === 0 ? "exercícios escolhidos para este protocolo" : "mesmos exercícios do bloco anterior",
        b.taper ? "taper nos treinos finais (eventBound)" : null,
      ].filter(Boolean);
      console.log(`  Bloco ${i + 1}: TREINO — ${b.lengthSessions} treinos (~${b.restDaysEstimate} descanso(s) estimado(s) ao longo do caminho) (${flags.join("; ")})`);
    }
  });
  if (per.blocks.length > 1 || per.mode !== "sem_periodo_informado") {
    console.log(`  (o treino detalhado abaixo é o do bloco 1 — blocos seguintes reaplicam a seleção de exercício no refresh, não simulados exercício-a-exercício ainda)`);
  }

  const cp = protocol.cardioPlan;
  if (cp.skipped) {
    console.log(`Cardio: não gerado — ${cp.reason}`);
  } else {
    console.log(
      `Cardio (cardio-rules.json): ${cp.modality} — ${cp.frequencyPerWeek[0]}-${cp.frequencyPerWeek[1]}x/semana, ${cp.minutesPerSession[0]}-${cp.minutesPerSession[1]}min/sessão ` +
        `(recoverySlack=${cp.recoverySlack}, cardioEmphasis=${cp.cardioEmphasis}${cp.band.length > 1 ? `, banda=${cp.band.join("/")}` : ""})`
    );
    if (cp.note) console.log(`  (${cp.note})`);
  }

  protocol.dayPlans.forEach((day) => {
    console.log(`\n  ${day.dayLabel.toUpperCase()}  (~${day.usedMinutes}/${protocol.budgetMinutes}min)`);
    day.items.forEach((it) => {
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
console.log("Fim da simulação. O motor em si já vive em engine/ como módulo separado —");
console.log("confira se exercícios, séries e cortes por tempo fazem sentido antes de");
console.log("consumir engine/ num backend ou app de verdade.");
console.log("=".repeat(70));
