import { router } from "expo-router";
import { useSession } from "@/ctx";
import { IntakeWizard } from "@/intake/IntakeWizard";
import type { UserProfile } from "@/intake/types";
import { generateProtocol } from "@/lib/engine";
import { saveProfile } from "@/lib/profileStore";

export default function Intake() {
  const { session } = useSession();

  async function handleComplete(profile: UserProfile) {
    const protocol = generateProtocol(profile);
    if (session) {
      await saveProfile(session, profile, protocol);
    }
    router.replace("/resultado");
  }

  return <IntakeWizard onComplete={handleComplete} />;
}
