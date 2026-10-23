import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
import { ACCENT, Screen } from "@/components/ui";
import { useSession } from "@/ctx";
import { IntakeWizard } from "@/intake/IntakeWizard";
import type { UserProfile } from "@/intake/types";
import { generateProtocol } from "@/lib/engine";
import { loadProfile, saveProfile } from "@/lib/profileStore";

export default function Intake() {
  const { session } = useSession();
  const [initialProfile, setInitialProfile] = useState<UserProfile | undefined>(undefined);
  const [ready, setReady] = useState(false);

  // Carrega o perfil já salvo (se houver) pra "Refazer cadastro" reabrir
  // preenchido em vez de sempre voltar pro rascunho vazio — ver critique de
  // UX, observação menor.
  useEffect(() => {
    if (!session) {
      setReady(true);
      return;
    }
    loadProfile(session).then((stored) => {
      setInitialProfile(stored?.profile);
      setReady(true);
    });
  }, [session]);

  async function handleComplete(profile: UserProfile) {
    const protocol = generateProtocol(profile);
    if (session) {
      await saveProfile(session, profile, protocol);
    }
    router.replace("/resultado");
  }

  if (!ready) {
    return (
      <Screen style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={ACCENT} />
      </Screen>
    );
  }

  return (
    <IntakeWizard
      onComplete={handleComplete}
      onExit={() => router.replace("/")}
      initialProfile={initialProfile}
    />
  );
}
