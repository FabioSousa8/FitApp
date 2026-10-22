// Tipos do perfil coletado no cadastro — espelha o shape que engine/ consome (ver
// test/test-personas.json) e a ordem/ramificação definida em data/intake-flow-rules.json.
// Os enums e vocabulários fechados (equipamento, tags de limitação) vêm literalmente
// de exercise-bank.json — não são inventados aqui, só tipados.

export type Level = "beginner" | "intermediate" | "advanced" | "highly_advanced";

export type GoalCategory =
  | "hypertrophy_estetica"
  | "forca"
  | "emagrecimento_recomposicao"
  | "saude_geral_sem_meta_especifica"
  | "evento_especifico";

export type TrainingConsistency = "continuo" | "pausas_curtas" | "esporadico";

export type EquipmentType = "barbell" | "dumbbell" | "machine" | "cable" | "smith" | "bodyweight";

export type ContraindicationTag =
  | "knee_sensitive"
  | "lower_back_sensitive"
  | "shoulder_sensitive"
  | "wrist_sensitive"
  | "elbow_sensitive"
  | "neck_sensitive"
  | "hip_sensitive"
  | "ankle_sensitive";

export type SameDayOrder = "antes" | "depois" | null;

export type PhysicalActivity = {
  rank: number;
  name: string;
  frequencyPerWeek: number;
  sameDayAsMusculacao?: SameDayOrder;
};

export type Limitation = {
  tag: ContraindicationTag;
  description: string;
};

// Shape final passado pra generateProtocol() (engine/) — ver engine/protocol.js pra
// quais campos cada regra de fato lê. currentRoutineRaw é coletado (passo 7, opcional)
// mas ainda NÃO alimenta currentRoutine: a extração pra exerciseCountByGroup ainda não
// tem regra (ver openQuestions em intake-flow-rules.json) — fica guardado pra quando
// essa extração existir; até lá o motor cai no cálculo frio (coldStartCount) mesmo.
export type UserProfile = {
  level: Level;
  trainingTimeYears: number;
  daysAvailable: number;
  sessionMinutes?: number;
  goalCategory: GoalCategory;
  secondaryGoalCategory?: Exclude<GoalCategory, "evento_especifico">;
  goalDetail?: string;
  goal?: string;
  goalDurationDays?: number;
  eventSubFocus?: Exclude<GoalCategory, "evento_especifico">;
  eventBound: boolean;
  limitations: Limitation[];
  limitationSafetyNote?: string;
  physicalActivities: PhysicalActivity[];
  cardioPreference?: string;
  trainingConsistency: TrainingConsistency;
  availableEquipment: EquipmentType[];
  currentRoutineRaw?: string;
  currentRoutine?: { exerciseCountByGroup: Record<string, number> } | null;
};

export const CONTRAINDICATION_LABELS: Record<ContraindicationTag, string> = {
  knee_sensitive: "Joelho sensível",
  lower_back_sensitive: "Lombar sensível",
  shoulder_sensitive: "Ombro sensível",
  wrist_sensitive: "Punho sensível",
  elbow_sensitive: "Cotovelo sensível",
  neck_sensitive: "Pescoço sensível",
  hip_sensitive: "Quadril sensível",
  ankle_sensitive: "Tornozelo sensível",
};

export const EQUIPMENT_LABELS: Record<EquipmentType, string> = {
  barbell: "Barra",
  dumbbell: "Halteres",
  machine: "Máquina",
  cable: "Cabo/polia",
  smith: "Smith",
  bodyweight: "Peso do corpo",
};

export const GOAL_CATEGORY_LABELS: Record<GoalCategory, string> = {
  hypertrophy_estetica: "Hipertrofia / estética",
  forca: "Força",
  emagrecimento_recomposicao: "Emagrecimento / recomposição",
  saude_geral_sem_meta_especifica: "Saúde geral, sem meta específica",
  evento_especifico: "Evento específico (tenho uma data em mente)",
};

// Decisão de produto (Fabio, out/2026): "Objetivo" ganhou meta principal + meta
// secundária (não multi-select livre). A secundária por enquanto é só contexto/exibição
// no resultado — NÃO entra em goalCategory nem muda cardioEmphasis/repRangesByGoal no
// motor ainda (ver engine/cardio.js, data/cardio-rules.json). Pra não deixar escolher uma
// combinação que já se sabe incoerente, bloqueamos o único eixo de conflito que já existe
// nos dados: cardioEmphasisTable (cardio-rules.json) opõe "alta" (emagrecimento_recomposicao)
// a "mínima" (hypertrophy_estetica, forca) — pedir as duas ao mesmo tempo seria prescrever
// cardio alto e mínimo pro mesmo treino. saude_geral (mínima/moderada) e evento_especifico
// (reaproveita outro foco, por isso nem aparece como opção de secundária) não entram nesse
// conflito. Se um dia a secundária passar a influenciar o motor de verdade, essa tabela é
// o ponto de partida pra decidir a regra de combinação real.
export const GOAL_CATEGORY_CARDIO_CONFLICTS: Record<GoalCategory, GoalCategory[]> = {
  hypertrophy_estetica: ["emagrecimento_recomposicao"],
  forca: ["emagrecimento_recomposicao"],
  emagrecimento_recomposicao: ["hypertrophy_estetica", "forca"],
  saude_geral_sem_meta_especifica: [],
  evento_especifico: [],
};

export const LEVEL_LABELS: Record<Level, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
  highly_advanced: "Muito avançado (anos de treino ininterrupto)",
};
