import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Text } from "react-native";
import { Button, Card, HelperText, Label, Screen, TEXT, Title } from "@/components/ui";
import { useSession } from "@/ctx";
import { loadProfile, type StoredProfile } from "@/lib/profileStore";
import { GOAL_CATEGORY_LABELS } from "@/intake/types";

export default function Resultado() {
  const { session } = useSession();
  const [stored, setStored] = useState<StoredProfile | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!session) return;
    loadProfile(session).then((p) => {
      setStored(p);
      setChecked(true);
    });
  }, [session]);

  if (checked && !stored) {
    return (
      <Screen>
        <Title>Nenhum protocolo ainda</Title>
        <Button title="Fazer cadastro" onPress={() => router.replace("/intake")} />
      </Screen>
    );
  }
  if (!stored) return null;

  const { protocol, profile } = stored;

  return (
    <Screen>
      <Title>Seu protocolo</Title>

      {stored.syncFailed && (
        <HelperText>
          ⚠ Seu protocolo está salvo neste aparelho, mas não deu pra sincronizar com a nuvem agora. A gente
          tenta de novo na próxima vez que salvar.
        </HelperText>
      )}

      {profile.secondaryGoalCategory && (
        <HelperText>
          {`Meta secundária: ${GOAL_CATEGORY_LABELS[profile.secondaryGoalCategory]} (ainda só contexto — não mudou série/cardio deste protocolo).`}
        </HelperText>
      )}

      <Card>
        <Label>{`Split: ${protocol.split.name}`}</Label>
        <HelperText>{protocol.split.days.join(" · ")}</HelperText>
        {protocol.split.alternatives?.length > 0 && (
          <HelperText>{`Também viável: ${protocol.split.alternatives.join(", ")}`}</HelperText>
        )}
      </Card>

      <Card>
        <Label>Periodização</Label>
        {protocol.periodization.blocks.map((b: any, i: number) => (
          <HelperText key={i}>
            {b.type === "deload"
              ? `Bloco ${i + 1}: deload (${b.lengthDays}d de calendário)`
              : `Bloco ${i + 1}: treino (${b.lengthSessions} treinos${b.taper ? ", com taper" : ""})`}
          </HelperText>
        ))}
      </Card>

      {!protocol.cardioPlan.skipped && (
        <Card>
          <Label>Cardio</Label>
          <HelperText>
            {`${protocol.cardioPlan.modality}, ${protocol.cardioPlan.frequencyPerWeek.join("-")}x/semana, ${protocol.cardioPlan.minutesPerSession.join("-")}min/sessão`}
          </HelperText>
        </Card>
      )}

      {protocol.dayPlans.map((day: any) => (
        <Card key={day.dayLabel}>
          <Label>{day.dayLabel.toUpperCase()}</Label>
          {day.items.map((it: any, i: number) => (
            <Text key={i} style={{ fontSize: 14, color: TEXT }}>
              {`${it.name}: ${it.sets}x${it.repsLabel}`}
            </Text>
          ))}
        </Card>
      ))}

      {protocol.warnings?.length > 0 && (
        <Card>
          <Label>Avisos</Label>
          {protocol.warnings.map((w: string, i: number) => (
            <HelperText key={i}>{`⚠ ${w}`}</HelperText>
          ))}
        </Card>
      )}

      <Button title="Refazer cadastro" variant="secondary" onPress={() => router.replace("/intake")} />
    </Screen>
  );
}
