// Contexto de autenticação do FitApp — padrão oficial do Expo Router
// (docs.expo.dev/router/advanced/authentication), adaptado pro Supabase.
//
// Modo local (sem EXPO_PUBLIC_SUPABASE_URL/ANON_KEY configurados, ver src/lib/supabase.ts):
// signIn/signUp NÃO autenticam de verdade — só geram um id local a partir do e-mail
// digitado, pra dar pra navegar cadastro → motor → protocolo sem backend ainda. Isso
// é intencional e temporário: existe pra o scaffold do app ser testável hoje, não é
// autenticação real nem deve ser tratado como tal em nenhuma build de verdade.
import { createContext, use, useEffect, useState, type PropsWithChildren } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { useStorageState } from "@/useStorageState";

export type AuthResult = {
  error: string | null;
  needsEmailConfirmation?: boolean;
};

type AuthContextValue = {
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  session: string | null; // user id (Supabase) ou "local:<email>" em modo local
  isLoading: boolean;
  usingLocalAuth: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession precisa ser usado dentro de <SessionProvider>");
  }
  return value;
}

function localUserId(email: string) {
  return `local:${email.trim().toLowerCase()}`;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, storedSession], setStoredSession] = useStorageState("fitapp_session");
  const [session, setSession] = useState<string | null>(storedSession);

  // Mantém o state local em sincronia depois que o useStorageState termina de
  // carregar do SecureStore/localStorage (isLoading some assíncrono).
  useEffect(() => {
    if (!isLoading) setSession(storedSession);
  }, [isLoading, storedSession]);

  // Em modo Supabase, a sessão pode mudar por fora deste componente (token
  // expirado, logout em outra aba no web) — escuta e mantém os dois em sincronia.
  useEffect(() => {
    if (!supabaseConfigured || !supabase) return;
    const { data: sub } = supabase.auth.onAuthStateChange((_event, authSession) => {
      const uid = authSession?.user?.id ?? null;
      setSession(uid);
      setStoredSession(uid);
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    if (!supabaseConfigured || !supabase) {
      const uid = localUserId(email);
      setSession(uid);
      setStoredSession(uid);
      return { error: null };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    const uid = data.user?.id ?? null;
    setSession(uid);
    setStoredSession(uid);
    return { error: null };
  };

  const signUp = async (email: string, password: string): Promise<AuthResult> => {
    if (!supabaseConfigured || !supabase) {
      const uid = localUserId(email);
      setSession(uid);
      setStoredSession(uid);
      return { error: null };
    }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    if (!data.session) {
      // Confirmação de e-mail habilitada no projeto Supabase — conta criada, mas
      // ainda sem sessão. A tela de cadastro trata esse caso separado de um erro.
      return { error: null, needsEmailConfirmation: true };
    }
    const uid = data.user?.id ?? null;
    setSession(uid);
    setStoredSession(uid);
    return { error: null };
  };

  const signOut = async () => {
    if (supabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setStoredSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session,
        isLoading,
        usingLocalAuth: !supabaseConfigured,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
