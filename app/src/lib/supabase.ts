// Cliente Supabase do FitApp — auth + persistência da conta/perfil.
//
// EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY vêm de um .env na raiz
// deste projeto (app/.env — ver app/.env.example). Expo embute automaticamente
// qualquer var prefixada EXPO_PUBLIC_ no bundle, sem config extra.
//
// Sem essas duas vars definidas (ainda não existe projeto Supabase real — ver
// pendência "preparação legal/infra pra beta" no README raiz), supabase fica null
// e o app roda em modo local (ver src/ctx.tsx) só pra dar pra navegar/demonstrar o
// fluxo de cadastro → motor → protocolo sem depender de backend ainda.
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!supabaseConfigured) {
  console.warn(
    "[FitApp] EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY não configurados — " +
      "login/cadastro vão rodar em modo local (ver app/.env.example e app/README.md)."
  );
}

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;
