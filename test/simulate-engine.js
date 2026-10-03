// Simulador do motor: roda as personas de teste contra as regras de volume/progressão
// e mostra o plano semanal inicial (split + volume alocado por grupo muscular).
//
// Rodar com: node test/simulate-engine.js
// (a partir da pasta raiz do projeto FitApp)

const fs = require("fs");
const path = require("path");

const landmarks = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "training-volume-landmarks.json"), "utf8"));
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

// Quais grupos cada tipo de dia trabalha (simplificado p/ simulação)
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

// --- 2. Alocação de volume: MEV do nível como ponto de partida do mesociclo ---
function allocateVolume(level, days) {
  const groupsHit = new Set();
  days.forEach((d) => dayMuscleMap[dayType(d)].forEach((g) => groupsHit.add(g)));

  const allocation = {};
  groupsHit.forEach((group) => {
    const l = landmarks.muscleGroups[group][level];
    allocation[group] = {
      mev_semanal: l.mev,
      mav_faixa: l.mav,
      mrv_teto: l.mrv,
    };
  });
  return allocation;
}

// --- 3. Rodar cada persona ---
console.log("=".repeat(70));
console.log("SIMULAÇÃO DO MOTOR — 4 personas de teste");
console.log("=".repeat(70));

personas.forEach((p) => {
  console.log(`\n--- Persona: ${p.id} ---`);
  console.log(`Nível: ${p.level} | Idade: ${p.age} | Dias/semana: ${p.daysAvailable} | Objetivo: ${p.goal}`);
  if (p.limitations.length) console.log(`Limitações: ${p.limitations.join("; ")}`);

  const split = selectSplit(p.daysAvailable);
  console.log(`\nSplit escolhido: ${split.name}`);
  console.log(`Dias: ${split.days.join(" | ")}`);

  const allocation = allocateVolume(p.level, split.days);
  console.log("\nVolume semanal alocado (início de mesociclo = MEV):");
  Object.entries(allocation)
    .sort()
    .forEach(([group, v]) => {
      console.log(
        `  ${group.padEnd(15)} MEV inicial: ${String(v.mev_semanal).padStart(2)} séries/sem  |  faixa MAV: ${v.mav_faixa[0]}-${v.mav_faixa[1]}  |  teto MRV: ${v.mrv_teto}`
      );
    });
});

console.log("\n" + "=".repeat(70));
console.log("Fim da simulação. Confira se o split e os volumes fazem sentido");
console.log("antes de plugar essa lógica num backend de verdade.");
console.log("=".repeat(70));
