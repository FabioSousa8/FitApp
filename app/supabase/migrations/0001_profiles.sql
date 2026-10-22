-- Tabela de perfil do FitApp: respostas do cadastro (intake) + protocolo gerado pelo
-- motor (engine/). Uma linha por usuário autenticado (auth.users, do Supabase Auth).
--
-- Pra aplicar: crie o projeto Supabase, rode este arquivo no SQL editor (ou via
-- `supabase db push` se usar o CLI), e preencha app/.env com a URL + anon key do
-- projeto (ver app/.env.example).
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  intake jsonb not null,
  protocol jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'Respostas do cadastro (intake, ver app/src/intake/types.ts) + último protocolo gerado por engine/generateProtocol(). Uma linha por usuário.';

alter table public.profiles enable row level security;

-- Cada usuário só lê/escreve a própria linha — nunca a de outra pessoa.
-- `to authenticated` restringe o papel (não só a predicate), e o UPDATE leva
-- tanto USING quanto WITH CHECK: sem o WITH CHECK, nada impediria um usuário
-- autenticado de reatribuir user_id pra outra pessoa num update.
create policy "profiles_select_own" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "profiles_insert_own" on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Mantém updated_at correto em todo upsert, sem depender do client mandar a data certa.
create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_profiles_updated_at();
