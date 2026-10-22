// Wizard de cadastro — segue literalmente a ordem e a ramificação de
// data/intake-flow-rules.json (7 passos). Cada passo é uma "página" fixa; as
// ramificações (evento_especifico, limitações, sameDayAsMusculacao simplificado)
// são campos condicionais DENTRO do passo correspondente, não passos extras — é
// assim que o próprio intake-flow-rules.json descreve a ramificação.
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  Chip,
  ChipRow,
  ErrorText,
  Field,
  HelperText,
  Label,
  Screen,
  StepProgress,
  Subtitle,
  Title,
} from "@/components/ui";
import {
  CONTRAINDICATION_LABELS,
  EQUIPMENT_LABELS,
  GOAL_CATEGORY_CARDIO_CONFLICTS,
  GOAL_CATEGORY_LABELS,
  LEVEL_LABELS,
  type ContraindicationTag,
  type EquipmentType,
  type GoalCategory,
  type Level,
  type PhysicalActivity,
  type SameDayOrder,
  type TrainingConsistency,
  type UserProfile,
} from "@/intake/types";

const TOTAL_STEPS = 7;

const LEVELS: Level[] = ["beginner", "intermediate", "advanced", "highly_advanced"];
const GOAL_CATEGORIES: GoalCategory[] = [
  "hypertrophy_estetica",
  "forca",
  "emagrecimento_recomposicao",
  "saude_geral_sem_meta_especifica",
  "evento_especifico",
];
const CONTRAINDICATION_TAGS: ContraindicationTag[] = [
  "knee_sensitive",
  "lower_back_sensitive",
  "shoulder_sensitive",
  "wrist_sensitive",
  "elbow_sensitive",
  "neck_sensitive",
  "hip_sensitive",
  "ankle_sensitive",
];
const EQUIPMENT_TYPES: EquipmentType[] = ["barbell", "dumbbell", "machine", "cable", "smith", "bodyweight"];

type Draft = {
  level?: Level;
  trainingTimeYears?: string;
  daysAvailable?: number;
  sessionMinutes?: string;
  goalCategory?: GoalCategory;
  secondaryGoalCategory?: GoalCategory;
  goalDetail?: string;
  goalDurationDays?: string;
  eventSubFocus?: GoalCategory;
  hasLimitations?: boolean;
  limitationTags: ContraindicationTag[];
  limitationSafetyNote?: string;
  activities: PhysicalActivity[];
  sameDaySelected: string[]; // nomes das atividades secundárias marcadas como "cai no mesmo dia"
  cardioPreference?: string;
  trainingConsistency?: TrainingConsistency;
  availableEquipment: EquipmentType[];
  currentRoutineRaw?: string;
};

const EMPTY_DRAFT: Draft = {
  limitationTags: [],
  activities: [{ rank: 1, name: "Musculação", frequencyPerWeek: 3 }],
  sameDaySelected: [],
  availableEquipment: ["bodyweight"],
};

function toggleInArray<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function IntakeWizard({ onComplete }: { onComplete: (profile: UserProfile) => void }) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [error, setError] = useState<string | null>(null);

  const secondaryActivities = useMemo(
    () => draft.activities.filter((a) => a.name.trim().toLowerCase() !== "musculação"),
    [draft.activities]
  );

  function next() {
    const err = validateStep(step, draft, secondaryActivities);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (step === TOTAL_STEPS) {
      onComplete(buildProfile(draft));
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <Screen>
      <StepProgress step={step} total={TOTAL_STEPS} />
      {step === 1 && <StepTreinoBasico draft={draft} setDraft={setDraft} />}
      {step === 2 && <StepObjetivo draft={draft} setDraft={setDraft} />}
      {step === 3 && <StepLimitacoes draft={draft} setDraft={setDraft} />}
      {step === 4 && (
        <StepAtividades draft={draft} setDraft={setDraft} secondaryActivities={secondaryActivities} />
      )}
      {step === 5 && <StepConsistencia draft={draft} setDraft={setDraft} />}
      {step === 6 && <StepEquipamento draft={draft} setDraft={setDraft} />}
      {step === 7 && <StepRotinaAtual draft={draft} setDraft={setDraft} />}

      <ErrorText>{error}</ErrorText>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
        {step > 1 && <Button title="Voltar" variant="secondary" onPress={back} style={{ flex: 1 }} />}
        <Button title={step === TOTAL_STEPS ? "Gerar meu protocolo" : "Avançar"} onPress={next} style={{ flex: 1 }} />
      </View>
    </Screen>
  );
}

function validateStep(step: number, d: Draft, secondaryActivities: PhysicalActivity[]): string | null {
  if (step === 1) {
    if (!d.level) return "Escolha seu nível de experiência.";
    const years = Number(d.trainingTimeYears);
    if (d.trainingTimeYears == null || d.trainingTimeYears === "" || Number.isNaN(years) || years < 0) {
      return "Informe quantos anos (pode ser fração, ex: 0.5) você treina musculação.";
    }
    if (!d.daysAvailable) return "Escolha quantos dias por semana você tem disponível.";
  }
  if (step === 2) {
    if (!d.goalCategory) return "Escolha seu objetivo.";
    if (d.goalCategory === "evento_especifico") {
      const days = Number(d.goalDurationDays);
      if (!d.goalDurationDays || Number.isNaN(days) || days <= 0) {
        return "Informe em quantos dias (em treinos, não no calendário) é o evento.";
      }
      if (!d.eventSubFocus) return "Escolha o foco desse evento.";
    }
  }
  if (step === 3) {
    if (d.hasLimitations == null) return "Diga se você tem alguma limitação física.";
    if (d.hasLimitations && d.limitationTags.length === 0) {
      return "Selecione pelo menos uma região, ou volte e marque 'não' se não tiver limitação.";
    }
  }
  if (step === 4) {
    const musc = d.activities.find((a) => a.name.trim().toLowerCase() === "musculação");
    if (!musc || !musc.frequencyPerWeek) return "Informe quantos dias por semana você treina musculação.";
    for (const a of d.activities) {
      if (!a.name.trim()) return "Toda atividade precisa de um nome.";
      if (!a.frequencyPerWeek) return `Informe a frequência semanal de "${a.name}".`;
    }
    if (secondaryActivities.length === 1) {
      const a = secondaryActivities[0];
      if (a.sameDayAsMusculacao === undefined) {
        return `Diga se "${a.name}" costuma cair no mesmo dia da musculação.`;
      }
    }
    if (secondaryActivities.length >= 2) {
      for (const name of d.sameDaySelected) {
        const a = secondaryActivities.find((x) => x.name === name);
        if (a && !a.sameDayAsMusculacao) return `Diga se "${name}" cai antes ou depois da musculação.`;
      }
    }
  }
  if (step === 5) {
    if (!d.trainingConsistency) return "Escolha como foi sua consistência de treino.";
  }
  if (step === 6) {
    if (d.availableEquipment.length === 0) return "Selecione pelo menos um equipamento disponível.";
  }
  return null;
}

function buildProfile(d: Draft): UserProfile {
  return {
    level: d.level as Level,
    trainingTimeYears: Number(d.trainingTimeYears),
    daysAvailable: d.daysAvailable as number,
    sessionMinutes: d.sessionMinutes ? Number(d.sessionMinutes) : undefined,
    goalCategory: d.goalCategory as GoalCategory,
    secondaryGoalCategory:
      d.goalCategory !== "evento_especifico"
        ? (d.secondaryGoalCategory as Exclude<GoalCategory, "evento_especifico"> | undefined)
        : undefined,
    goalDetail: d.goalDetail?.trim() || undefined,
    goal: d.goalDetail?.trim() || GOAL_CATEGORY_LABELS[d.goalCategory as GoalCategory],
    goalDurationDays: d.goalDurationDays ? Number(d.goalDurationDays) : undefined,
    eventSubFocus:
      d.goalCategory === "evento_especifico"
        ? (d.eventSubFocus as Exclude<GoalCategory, "evento_especifico"> | undefined)
        : undefined,
    eventBound: d.goalCategory === "evento_especifico",
    limitations: d.hasLimitations
      ? d.limitationTags.map((tag) => ({ tag, description: CONTRAINDICATION_LABELS[tag] }))
      : [],
    limitationSafetyNote: d.limitationSafetyNote?.trim() || undefined,
    physicalActivities: d.activities,
    cardioPreference: d.cardioPreference?.trim() || undefined,
    trainingConsistency: d.trainingConsistency as TrainingConsistency,
    availableEquipment: d.availableEquipment,
    currentRoutineRaw: d.currentRoutineRaw?.trim() || undefined,
    currentRoutine: null, // extração de currentRoutineRaw ainda não existe (ver intake-flow-rules.json/openQuestions)
  };
}

// --- Passo 1: Treino básico ---
function StepTreinoBasico({ draft, setDraft }: { draft: Draft; setDraft: React.Dispatch<React.SetStateAction<Draft>> }) {
  return (
    <>
      <Title>Treino básico</Title>
      <Subtitle>Pra calibrar volume e split certos pro seu ponto de partida.</Subtitle>

      <Label>Como você classificaria seu nível?</Label>
      <ChipRow>
        {LEVELS.map((lvl) => (
          <Chip key={lvl} label={LEVEL_LABELS[lvl]} selected={draft.level === lvl} onPress={() => setDraft((d) => ({ ...d, level: lvl }))} />
        ))}
      </ChipRow>
      <HelperText>Isso é cruzado com os anos de treino abaixo: tempo de treino só pode puxar o nível pra baixo, nunca pra cima.</HelperText>

      <Field
        label="Há quantos anos você treina musculação?"
        placeholder="ex: 2 ou 0.5"
        keyboardType="decimal-pad"
        value={draft.trainingTimeYears ?? ""}
        onChangeText={(v) => setDraft((d) => ({ ...d, trainingTimeYears: v }))}
      />

      <Label>Quantos dias por semana você tem disponível?</Label>
      <ChipRow>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <Chip key={n} label={String(n)} selected={draft.daysAvailable === n} onPress={() => setDraft((d) => ({ ...d, daysAvailable: n }))} />
        ))}
      </ChipRow>

      <Field
        label="Tempo por sessão, em minutos (opcional)"
        placeholder="Se deixar em branco, assumimos 45min"
        keyboardType="number-pad"
        value={draft.sessionMinutes ?? ""}
        onChangeText={(v) => setDraft((d) => ({ ...d, sessionMinutes: v }))}
      />
    </>
  );
}

// --- Passo 2: Objetivo ---
function StepObjetivo({ draft, setDraft }: { draft: Draft; setDraft: React.Dispatch<React.SetStateAction<Draft>> }) {
  const isEvent = draft.goalCategory === "evento_especifico";
  const secondaryOptions = draft.goalCategory
    ? GOAL_CATEGORIES.filter(
        (g) =>
          g !== draft.goalCategory &&
          g !== "evento_especifico" &&
          !GOAL_CATEGORY_CARDIO_CONFLICTS[draft.goalCategory as GoalCategory].includes(g)
      )
    : [];
  return (
    <>
      <Title>Objetivo</Title>
      <Subtitle>"Saúde geral, sem meta específica" é uma resposta completa por si só, sem precisar forçar uma meta estética.</Subtitle>

      <ChipRow>
        {GOAL_CATEGORIES.map((g) => (
          <Chip
            key={g}
            label={GOAL_CATEGORY_LABELS[g]}
            selected={draft.goalCategory === g}
            onPress={() => setDraft((d) => ({ ...d, goalCategory: g, eventSubFocus: undefined, secondaryGoalCategory: undefined }))}
          />
        ))}
      </ChipRow>

      {!isEvent && draft.goalCategory && (
        <View>
          <Label>Meta secundária (opcional)</Label>
          <ChipRow>
            {secondaryOptions.map((g) => (
              <Chip
                key={g}
                label={GOAL_CATEGORY_LABELS[g]}
                selected={draft.secondaryGoalCategory === g}
                onPress={() => setDraft((d) => ({ ...d, secondaryGoalCategory: d.secondaryGoalCategory === g ? undefined : g }))}
              />
            ))}
          </ChipRow>
          <HelperText>
            Por enquanto isso só aparece como contexto no resultado, sem mudar série/cardio ainda. Metas com
            ênfase de cardio opostas (ex: emagrecimento + hipertrofia) não aparecem aqui como combinação.
          </HelperText>
        </View>
      )}

      <Field
        label="Quer elaborar? (opcional)"
        placeholder="ex: quero ficar mais definido pra praia"
        value={draft.goalDetail ?? ""}
        onChangeText={(v) => setDraft((d) => ({ ...d, goalDetail: v }))}
      />

      {isEvent ? (
        <Card>
          <Label>Em quantos treinos é o seu evento?</Label>
          <Field
            label=""
            placeholder="ex: 25, 42 (contado em treinos, não em dias de calendário)"
            keyboardType="number-pad"
            value={draft.goalDurationDays ?? ""}
            onChangeText={(v) => setDraft((d) => ({ ...d, goalDurationDays: v }))}
          />
          <Label>Existe um foco específico pra esse evento?</Label>
          <ChipRow>
            {GOAL_CATEGORIES.filter((g) => g !== "evento_especifico").map((g) => (
              <Chip key={g} label={GOAL_CATEGORY_LABELS[g]} selected={draft.eventSubFocus === g} onPress={() => setDraft((d) => ({ ...d, eventSubFocus: g }))} />
            ))}
          </ChipRow>
        </Card>
      ) : (
        <Field
          label="Quer definir um período pra esse protocolo até reavaliarmos? (opcional)"
          placeholder="ex: 35, 60, 90 (em treinos, não em dias de calendário)"
          keyboardType="number-pad"
          value={draft.goalDurationDays ?? ""}
          onChangeText={(v) => setDraft((d) => ({ ...d, goalDurationDays: v }))}
        />
      )}
    </>
  );
}

// --- Passo 3: Limitações físicas ---
function StepLimitacoes({ draft, setDraft }: { draft: Draft; setDraft: React.Dispatch<React.SetStateAction<Draft>> }) {
  return (
    <>
      <Title>Limitações físicas</Title>
      <Subtitle>Só pra saber quais exercícios evitar. Nenhum diagnóstico clínico é necessário aqui.</Subtitle>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Button
          title="Não tenho"
          variant={draft.hasLimitations === false ? "primary" : "secondary"}
          onPress={() => setDraft((d) => ({ ...d, hasLimitations: false, limitationTags: [], limitationSafetyNote: undefined }))}
          style={{ flex: 1 }}
        />
        <Button
          title="Tenho sim"
          variant={draft.hasLimitations === true ? "primary" : "secondary"}
          onPress={() => setDraft((d) => ({ ...d, hasLimitations: true }))}
          style={{ flex: 1 }}
        />
      </View>

      {draft.hasLimitations && (
        <Card>
          <Label>Quais regiões?</Label>
          <ChipRow>
            {CONTRAINDICATION_TAGS.map((tag) => (
              <Chip
                key={tag}
                label={CONTRAINDICATION_LABELS[tag]}
                selected={draft.limitationTags.includes(tag)}
                onPress={() => setDraft((d) => ({ ...d, limitationTags: toggleInArray(d.limitationTags, tag) }))}
              />
            ))}
          </ChipRow>
          <Field
            label="Alguma recomendação do seu médico/fisioterapeuta? (opcional)"
            placeholder="Fica só como nota de contexto junto do protocolo"
            multiline
            value={draft.limitationSafetyNote ?? ""}
            onChangeText={(v) => setDraft((d) => ({ ...d, limitationSafetyNote: v }))}
          />
        </Card>
      )}
    </>
  );
}

// --- Passo 4: Atividades físicas ---
function StepAtividades({
  draft,
  setDraft,
  secondaryActivities,
}: {
  draft: Draft;
  setDraft: React.Dispatch<React.SetStateAction<Draft>>;
  secondaryActivities: PhysicalActivity[];
}) {
  const [newName, setNewName] = useState("");

  function updateActivity(name: string, patch: Partial<PhysicalActivity>) {
    setDraft((d) => ({
      ...d,
      activities: d.activities.map((a) => (a.name === name ? { ...a, ...patch } : a)),
    }));
  }

  function move(name: string, dir: -1 | 1) {
    setDraft((d) => {
      const idx = d.activities.findIndex((a) => a.name === name);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= d.activities.length) return d;
      const next = [...d.activities];
      [next[idx], next[target]] = [next[target], next[idx]];
      return { ...d, activities: next.map((a, i) => ({ ...a, rank: i + 1 })) };
    });
  }

  function removeActivity(name: string) {
    setDraft((d) => ({
      ...d,
      activities: d.activities.filter((a) => a.name !== name).map((a, i) => ({ ...a, rank: i + 1 })),
      sameDaySelected: d.sameDaySelected.filter((n) => n !== name),
    }));
  }

  function addActivity() {
    const name = newName.trim();
    if (!name) return;
    setDraft((d) => ({
      ...d,
      activities: [...d.activities, { rank: d.activities.length + 1, name, frequencyPerWeek: 1 }],
    }));
    setNewName("");
  }

  return (
    <>
      <Title>Atividades físicas</Title>
      <Subtitle>Ordene da mais pra menos importante: isso decide o teto de volume quando musculação não é a prioridade 1.</Subtitle>

      {draft.activities.map((a, i) => (
        <Card key={a.name}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Label>{`${a.rank}. ${a.name}`}</Label>
            {a.name.trim().toLowerCase() !== "musculação" && (
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Button title="▲" variant="ghost" onPress={() => move(a.name, -1)} disabled={i === 0} />
                <Button title="▼" variant="ghost" onPress={() => move(a.name, 1)} disabled={i === draft.activities.length - 1} />
                <Button title="Remover" variant="ghost" onPress={() => removeActivity(a.name)} />
              </View>
            )}
          </View>
          <Label>Quantas vezes por semana?</Label>
          <ChipRow>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <Chip key={n} label={String(n)} selected={a.frequencyPerWeek === n} onPress={() => updateActivity(a.name, { frequencyPerWeek: n })} />
            ))}
          </ChipRow>
        </Card>
      ))}

      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Field label="Adicionar outra atividade" placeholder="ex: Vôlei, Jiu-jitsu, Corrida" value={newName} onChangeText={setNewName} />
        </View>
        <Button title="Adicionar" variant="secondary" onPress={addActivity} />
      </View>

      {secondaryActivities.length === 1 && (
        <Card>
          <Label>{`"${secondaryActivities[0].name}" costuma cair no mesmo dia da musculação?`}</Label>
          <ChipRow>
            <Chip
              label="Não"
              selected={secondaryActivities[0].sameDayAsMusculacao === null}
              onPress={() => updateActivity(secondaryActivities[0].name, { sameDayAsMusculacao: null })}
            />
            <Chip
              label="Sim, antes"
              selected={secondaryActivities[0].sameDayAsMusculacao === "antes"}
              onPress={() => updateActivity(secondaryActivities[0].name, { sameDayAsMusculacao: "antes" })}
            />
            <Chip
              label="Sim, depois"
              selected={secondaryActivities[0].sameDayAsMusculacao === "depois"}
              onPress={() => updateActivity(secondaryActivities[0].name, { sameDayAsMusculacao: "depois" })}
            />
          </ChipRow>
        </Card>
      )}

      {secondaryActivities.length >= 2 && (
        <Card>
          <Label>Quais dessas você costuma fazer no mesmo dia da musculação?</Label>
          <ChipRow>
            {secondaryActivities.map((a) => (
              <Chip
                key={a.name}
                label={a.name}
                selected={draft.sameDaySelected.includes(a.name)}
                onPress={() =>
                  setDraft((d) => ({ ...d, sameDaySelected: toggleInArray(d.sameDaySelected, a.name) }))
                }
              />
            ))}
          </ChipRow>
          {draft.sameDaySelected.map((name) => {
            const a = secondaryActivities.find((x) => x.name === name);
            if (!a) return null;
            return (
              <View key={name}>
                <Label>{`"${name}" vem antes ou depois da musculação?`}</Label>
                <ChipRow>
                  <Chip label="Antes" selected={a.sameDayAsMusculacao === "antes"} onPress={() => updateActivity(name, { sameDayAsMusculacao: "antes" })} />
                  <Chip label="Depois" selected={a.sameDayAsMusculacao === "depois"} onPress={() => updateActivity(name, { sameDayAsMusculacao: "depois" })} />
                </ChipRow>
              </View>
            );
          })}
        </Card>
      )}

      <Field
        label="Que tipo de cardio você gosta ou evita? (opcional)"
        placeholder="ex: gosto de correr, odeio esteira, sem preferência"
        value={draft.cardioPreference ?? ""}
        onChangeText={(v) => setDraft((d) => ({ ...d, cardioPreference: v }))}
      />
    </>
  );
}

// --- Passo 5: Consistência de treino ---
function StepConsistencia({ draft, setDraft }: { draft: Draft; setDraft: React.Dispatch<React.SetStateAction<Draft>> }) {
  return (
    <>
      <Title>Consistência de treino</Title>
      <Subtitle>Nos últimos 6 meses você treinou sem parar, teve só pausas curtas, ou teve pausas longas de meses?</Subtitle>
      <ChipRow>
        <Chip label="Treinei sem parar" selected={draft.trainingConsistency === "continuo"} onPress={() => setDraft((d) => ({ ...d, trainingConsistency: "continuo" }))} />
        <Chip label="Treinei com pausas curtas" selected={draft.trainingConsistency === "pausas_curtas"} onPress={() => setDraft((d) => ({ ...d, trainingConsistency: "pausas_curtas" }))} />
        <Chip label="Tive pausas longas" selected={draft.trainingConsistency === "esporadico"} onPress={() => setDraft((d) => ({ ...d, trainingConsistency: "esporadico" }))} />
      </ChipRow>
      <HelperText>Isso não muda o volume (quem decide é o nível): só faz o motor preferir equipamento guiado (máquina/smith/cabo) sobre peso livre pra quem teve pausas longas.</HelperText>
    </>
  );
}

// --- Passo 6: Equipamento disponível ---
function StepEquipamento({ draft, setDraft }: { draft: Draft; setDraft: React.Dispatch<React.SetStateAction<Draft>> }) {
  return (
    <>
      <Title>Equipamento disponível</Title>
      <Subtitle>Selecione tudo que você tem acesso na sua academia ou em casa.</Subtitle>
      <ChipRow>
        {EQUIPMENT_TYPES.map((eq) => (
          <Chip
            key={eq}
            label={EQUIPMENT_LABELS[eq]}
            selected={draft.availableEquipment.includes(eq)}
            onPress={() => setDraft((d) => ({ ...d, availableEquipment: toggleInArray(d.availableEquipment, eq) }))}
          />
        ))}
      </ChipRow>
    </>
  );
}

// --- Passo 7: Rotina atual (opcional) ---
function StepRotinaAtual({ draft, setDraft }: { draft: Draft; setDraft: React.Dispatch<React.SetStateAction<Draft>> }) {
  return (
    <>
      <Title>Sua rotina atual</Title>
      <Subtitle>Opcional. Se você já treina, cole ou descreva sua ficha atual: ajuda a calibrar quantos exercícios por grupo.</Subtitle>
      <Field
        label="Ficha atual (opcional)"
        placeholder="ex: Supino 4x, Crucifixo 3x, Puxada 4x..."
        multiline
        style={{ minHeight: 120, textAlignVertical: "top" }}
        value={draft.currentRoutineRaw ?? ""}
        onChangeText={(v) => setDraft((d) => ({ ...d, currentRoutineRaw: v }))}
      />
      <HelperText>
        Por enquanto isso só fica guardado pra referência: a extração automática pra quantidade de
        exercícios por grupo ainda não existe (ver pendências do motor). Sem isso, o cálculo cai numa
        estimativa de bom senso.
      </HelperText>
    </>
  );
}
