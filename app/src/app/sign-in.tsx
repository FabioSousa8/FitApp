import { useState } from "react";
import { Link, router } from "expo-router";
import { Button, Field, HelperText, Screen, Subtitle, Title } from "@/components/ui";
import { useSession } from "@/ctx";

export default function SignIn() {
  const { signIn, usingLocalAuth } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    const result = await signIn(email.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.replace("/");
  }

  return (
    <Screen>
      <Title>Entrar</Title>
      <Subtitle>Bem-vindo de volta ao FortEvo.</Subtitle>
      {usingLocalAuth && (
        <HelperText>
          Modo local (sem Supabase configurado ainda): qualquer e-mail/senha entra, sem validar de
          verdade. Ver app/README.md pra ligar o backend real.
        </HelperText>
      )}
      <Field
        label="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Field label="Senha" secureTextEntry value={password} onChangeText={setPassword} error={error ?? undefined} />
      <Button title="Entrar" onPress={handleSignIn} loading={loading} />
      <Link href="/sign-up" asChild>
        <Button title="Criar conta" variant="secondary" />
      </Link>
    </Screen>
  );
}
