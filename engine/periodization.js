// Periodização por goalDurationDays (progression-rules.json/periodizationByGoalDuration).
// O treino fica FIXO dentro de um bloco (não troca toda hora — aderência em primeiro lugar).
// O que varia é o TAMANHO e a QUANTIDADE de blocos, calculados a partir da janela que a
// própria pessoa estipulou (goalDurationDays), não um número universal fixo.
// goalDurationDays é perguntado em linguagem de dias no cadastro, mas desde out/2026 o motor
// conta esse número em TREINOS completados, não dias de calendário (progression-rules.json/
// periodizationByGoalDuration.unitChange_outOfOutubro2026) — exemplo do fundador: um bloco de
// "25 dias" é contado como 25 TREINOS, descanso no meio do caminho não entra nessa contagem.
// isMaintenance (já considerando escalada manual) deixa "comprimido" inerte: não existe MAV
// pra acelerar rumo a quando o teto é maintenance_support sem escalada.
const { progression } = require("./data");

function planPeriodization(goalDurationDays, level, eventBound, isMaintenance) {
  const { mesocycleLengthWeeks } = progression.volumeProgression;
  const { minPartialBlockSessionsToStandAlone } = progression.periodizationByGoalDuration.constants;
  const idealWeeks = level === "advanced" ? mesocycleLengthWeeks.advanced : mesocycleLengthWeeks.default;
  const idealBlockSessions = idealWeeks * 7; // reinterpretado: treinos-alvo do bloco, não dias de calendário
  const deloadDays = progression.deloadProtocol.durationWeeks * 7; // deload continua em dias de calendário — ver nota abaixo

  const isCompressible = (sessions) => !isMaintenance && sessions < idealBlockSessions;

  if (!goalDurationDays) {
    return {
      mode: "sem_periodo_informado",
      idealBlockSessions,
      blocks: [{ type: "treino", lengthSessions: idealBlockSessions, compressed: false, exerciseRefresh: false, taper: false }],
    };
  }

  if (goalDurationDays <= idealBlockSessions) {
    return {
      mode: "bloco_unico",
      idealBlockSessions,
      blocks: [
        {
          type: "treino",
          lengthSessions: goalDurationDays,
          compressed: isCompressible(goalDurationDays),
          exerciseRefresh: false,
          taper: !!eventBound,
        },
      ],
    };
  }

  // O deload (calendário, 1 semana) fica FORA do orçamento de sessões — cada ciclo completo
  // soma só idealBlockSessions treinos ao orçamento; a semana de deload entre blocos é "de
  // graça", do mesmo jeito que um dia de descanso não conta contra o contador de treinos.
  const numFullCycles = Math.floor(goalDurationDays / idealBlockSessions);
  const remainderSessions = goalDurationDays - numFullCycles * idealBlockSessions;

  const blocks = [];
  for (let i = 0; i < numFullCycles; i++) {
    blocks.push({ type: "treino", lengthSessions: idealBlockSessions, compressed: false, exerciseRefresh: i > 0, taper: false });
    blocks.push({ type: "deload", lengthDays: deloadDays });
  }

  const lastTreino = () => [...blocks].reverse().find((b) => b.type === "treino");

  if (remainderSessions >= minPartialBlockSessionsToStandAlone) {
    blocks.push({
      type: "treino",
      lengthSessions: remainderSessions,
      compressed: isCompressible(remainderSessions),
      exerciseRefresh: true,
      taper: !!eventBound,
    });
  } else if (remainderSessions > 0) {
    const t = lastTreino();
    if (t) {
      t.lengthSessions += remainderSessions;
      if (eventBound) t.taper = true;
    }
  } else if (eventBound) {
    const t = lastTreino();
    if (t) t.taper = true;
  }

  // Nunca termina em deload: se não há bloco de treino depois, o deload final não serve a nada.
  if (blocks.length && blocks[blocks.length - 1].type === "deload") blocks.pop();

  return { mode: "multi_bloco", idealBlockSessions, blocks };
}

// Descanso (progression-rules.json/restDayModel, Opção B confirmada) — cadência mínima
// derivada de daysAvailable; aviso não-bloqueante (nunca impede o registro de treino). Quem
// consome este módulo estaticamente (sem log de sessão real pra simular passagem de tempo)
// só consegue reportar a cadência e uma ESTIMATIVA de quantos descansos cada bloco deveria
// ter ao longo do caminho — o aviso dinâmico em si é lógica do backend de check-in.
function maxConsecutiveSessionsWithoutRest(daysAvailable) {
  const row = progression.restDayModel.minRestCadenceTable.rows.find((r) => {
    const min = r.minDaysAvailable || 0;
    const max = r.maxDaysAvailable === undefined ? Infinity : r.maxDaysAvailable;
    return daysAvailable >= min && daysAvailable <= max;
  });
  return row ? row.maxConsecutiveSessionsWithoutRest : 3;
}

function estimateRestDays(lengthSessions, cadence) {
  if (!lengthSessions) return 0;
  return Math.floor(lengthSessions / cadence);
}

module.exports = { planPeriodization, maxConsecutiveSessionsWithoutRest, estimateRestDays };
