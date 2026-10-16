// Cardio (cardio-rules.json) — recoverySlack e cardioEmphasis não são perguntas novas:
// vêm da classificação de objetivo da musculação (goalKey, já calculado) e do goalCategory
// declarado.
const { cardioRules } = require("./data");

function resolveRecoverySlack(goalKey, level) {
  if (goalKey === "maintenance_support") return "alta";
  if (level === "advanced") return "baixa";
  return "moderada"; // beginner ou intermediate com objetivo normal
}

// evento_especifico NUNCA tem linha própria em cardioEmphasisTable, de propósito — ele sempre
// reaproveita a linha de UM dos outros 4 focos (eventSubFocus, intake-flow-rules.json passo 2).
function resolveCardioEmphasis(persona) {
  const effectiveCategory =
    persona.goalCategory === "evento_especifico" && persona.eventSubFocus ? persona.eventSubFocus : persona.goalCategory;
  const row = cardioRules.cardioEmphasisTable.rows.find((r) => r.goalCategory === effectiveCategory);
  return row ? row.cardioEmphasis : null; // null = goalCategory não informado, ou evento_especifico sem eventSubFocus respondido
}

// cardioPreference (texto livre) só escolhe a modalidade DENTRO da banda já decidida —
// nunca muda frequência/duração. Heurística simples de palavra-chave com negação curta
// (ex: "não gosta de corrida"), não é parsing real — fica fácil de confundir com frases
// mais complexas, mas evita o erro óbvio de recomendar algo que a pessoa disse que evita.
function pickModality(band, cardioPreference) {
  const text = (cardioPreference || "").toLowerCase();
  const keywordMap = [
    { keywords: ["caminhada", "liss", "leve"], modality: "LISS" },
    { keywords: ["corrida", "elíptico", "eliptico", "miss"], modality: "MISS" },
    { keywords: ["tiro", "intervalado", "hiit"], modality: "HIIT" },
  ];
  const negators = ["não gosta", "nao gosta", "não gosto", "nao gosto", "odeio", "evita", "evito", "detesto"];
  const liked = new Set();
  const disliked = new Set();
  keywordMap.forEach(({ keywords, modality }) => {
    keywords.forEach((k) => {
      const idx = text.indexOf(k);
      if (idx === -1) return;
      const before = text.slice(Math.max(0, idx - 15), idx);
      if (negators.some((n) => before.includes(n))) disliked.add(modality);
      else liked.add(modality);
    });
  });
  const likedInBand = band.find((m) => liked.has(m) && !disliked.has(m));
  if (likedInBand) return likedInBand;
  const bandWithoutDisliked = band.filter((m) => !disliked.has(m));
  return (bandWithoutDisliked.length ? bandWithoutDisliked : band)[0]; // sem preferência utilizável → menor custo de recuperação, evitando o que foi explicitamente rejeitado
}

function buildCardioPlan(persona, goalKey, engineLvl) {
  const recoverySlack = resolveRecoverySlack(goalKey, engineLvl);
  const cardioEmphasis = resolveCardioEmphasis(persona);
  if (!cardioEmphasis) {
    const reason =
      persona.goalCategory === "evento_especifico"
        ? "evento_especifico sem eventSubFocus respondido — sem foco pra reaproveitar (ver cardio-rules.json)"
        : `goalCategory="${persona.goalCategory || "não informado"}" ainda sem regra de cardioEmphasis (ver openQuestions em cardio-rules.json)`;
    return { skipped: true, reason };
  }
  const row = cardioRules.decisionMatrix.rows.find((r) => r.cardioEmphasis === cardioEmphasis && r.recoverySlack === recoverySlack);
  if (!row) return { skipped: true, reason: `combinação ${cardioEmphasis}×${recoverySlack} sem linha na decisionMatrix` };
  return {
    skipped: false,
    recoverySlack,
    cardioEmphasis,
    modality: pickModality(row.modality, persona.cardioPreference),
    band: row.modality,
    frequencyPerWeek: row.frequencyPerWeek,
    minutesPerSession: row.minutesPerSession,
    note: row.note,
  };
}

module.exports = { resolveRecoverySlack, resolveCardioEmphasis, pickModality, buildCardioPlan };
