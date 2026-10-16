import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Button, Card, HelperText, Label, Screen, Subtitle, Title } from "@/components/ui";
import { useSession } from "@/ctx";
import { loadProfile, type StoredProfile } from "@/lib/profileStore";

export default function Home() {
  const { session, signOut } = useSession();
  const [stored, setStored] = useState<StoredProfile | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!session) return;
    loadProfile(session).then((p) => {
      setStored(p);
      setChecked(true);
    });
  }, [session]);

  const displayName = session?.startsWith("local:") ? session.replace("local:", "") : session;

  return (
    <Screen>
      <Title>FitApp</Title>
      <Subtitle>{displayName}</Subtitle>

      {checked &&
        (stored ? (
          <Card>
            <Label>Seu protocolo já foi gerado</Label>
            <HelperText>Split: {stored.protocol?.split?.name}</HelperText>
            <Button title="Ver protocolo" onPress={() => router.push("/resultado")} />
            <Button title="Refazer cadastro" variant="secondary" onPress={() => router.push("/intake")} />
          </Card>
        ) : (
          <Card>
            <Label>Você ainda não fez o cadastro</Label>
            <HelperText>Responda algumas perguntas pra gente montar seu protocolo de treino.</HelperText>
            <Button title="Começar cadastro" onPress={() => router.push("/intake")} />
          </Card>
        ))}

      <Button title="Sair" variant="ghost" onPress={signOut} />
    </Screen>
  );
}
