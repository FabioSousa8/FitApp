import { useState } from "react";
import { Link, router } from "expo-router";
import { Button, Field, HelperText, Screen, Subtitle, Title } from "@/components/ui";
import { useSession } from "@/ctx";

export default function SignUp() {
  const { signUp, usingLocalAuth } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmMessage, setConfirmMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setError(null);
    setConfirmMessage(null);
    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    const result = await signUp(email.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.needsEmailConfirmation) {
      setConfirmMessage("Conta criada! Confirme seu e-mail antes de entrar.");
      return;
    }
    router.replace("/");
  }

  return (
    <Screen>
      <Title>Criar conta</Title>
      <Subtitle>Pra guardar seu protocolo e acompanhar sua evolução.</Subtitle>
      {usingLocalAuth && (
        <HelperText>Modo local (sem Supabase configurado ainda): a conta fica só neste aparelho.</HelperText>
      )}
      <Field
        label="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Field
        label="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={error ?? undefined}
        helper={!error ? "Mínimo de 6 caracteres." : undefined}
      />
      {confirmMessage && <HelperText>{confirmMessage}</HelperText>}
      <Button title="Criar conta" onPress={handleSignUp} loading={loading} />
      <Link href="/sign-in" asChild>
        <Button title="Já tenho conta" variant="secondary" />
      </Link>
    </Screen>
  );
}
