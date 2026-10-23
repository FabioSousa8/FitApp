// Guarda o perfil (respostas do cadastro) + protocolo gerado. Sempre grava local
// (AsyncStorage) — funciona mesmo sem Supabase configurado. Quando o Supabase está
// configurado E a sessão é uma de verdade (não o modo local "local:<email>"), também
// tenta sincronizar pra tabela public.profiles (ver app/supabase/migrations) — se
// falhar, o app continua funcionando com a cópia local, só avisa no console.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import type { UserProfile } from "@/intake/types";

export type StoredProfile = {
  profile: UserProfile;
  // Retorno de generateProtocol() (engine/) — ainda sem tipo próprio (o motor é JS
  // puro, sem .d.ts dedicado ainda). `any` aqui é deliberado, não descuido.
  protocol: any;
  updatedAt: string;
  // true quando o upsert pro Supabase falhou e o perfil ficou só local (ver
  // saveProfile abaixo). Antes essa falha só ia pro console — ver critique de
  // UX, observação menor sobre falha silenciosa de sync.
  syncFailed?: boolean;
};

function storageKey(userId: string) {
  return `fitapp_profile:${userId}`;
}

export async function saveProfile(userId: string, profile: UserProfile, protocol: unknown) {
  const record: StoredProfile = { profile, protocol, updatedAt: new Date().toISOString() };
  await AsyncStorage.setItem(storageKey(userId), JSON.stringify(record));

  if (supabaseConfigured && supabase && !userId.startsWith("local:")) {
    const { error } = await supabase.from("profiles").upsert({
      user_id: userId,
      intake: profile,
      protocol,
      updated_at: record.updatedAt,
    });
    if (error) {
      console.warn("[FitApp] não deu pra sincronizar o perfil com o Supabase (ficou salvo localmente):", error.message);
      record.syncFailed = true;
      await AsyncStorage.setItem(storageKey(userId), JSON.stringify(record));
    }
  }
}

export async function loadProfile(userId: string): Promise<StoredProfile | null> {
  const raw = await AsyncStorage.getItem(storageKey(userId));
  return raw ? (JSON.parse(raw) as StoredProfile) : null;
}

export async function clearProfile(userId: string) {
  await AsyncStorage.removeItem(storageKey(userId));
}
