# FitApp — app mobile

Expo (React Native + TypeScript, Expo Router, SDK 58). Faz parte do monorepo FitApp
(ver `../README.md`) como workspace npm — por isso `npm install` e deps rodam a partir
da raiz do repo, não daqui.

## Rodar

```bash
cd ..            # raiz do repo, se ainda não estiver lá
npm install      # instala tudo (motor + app), já que app/ é um workspace npm
cd app
npx expo start
```

Sem simulador/dispositivo conectado, `npx expo start --web` também funciona pra
navegar o fluxo no navegador (login, cadastro, protocolo).

## Estrutura

```
src/
  app/                    # Rotas (Expo Router — cada arquivo aqui é uma tela)
    _layout.tsx           # Layout raiz: SessionProvider + guarda de autenticação
    sign-in.tsx            # Login
    sign-up.tsx            # Criar conta
    (app)/                 # Grupo de rotas autenticadas
      _layout.tsx
      index.tsx             # Home — status do cadastro, link pro protocolo
      intake.tsx            # Tela que renderiza o wizard de cadastro
      resultado.tsx          # Protocolo gerado, lido do motor
  ctx.tsx                 # Contexto de autenticação (useSession/SessionProvider)
  useStorageState.ts      # Persistência da sessão (SecureStore nativo / localStorage web)
  intake/
    types.ts               # Tipos do perfil — espelha o shape que engine/ consome
    IntakeWizard.tsx        # Os 7 passos do cadastro, fiéis a data/intake-flow-rules.json
  lib/
    supabase.ts             # Cliente Supabase (ou null, se não configurado)
    engine.ts                # Reexporta generateProtocol() de ../../../engine
    profileStore.ts          # Persiste perfil+protocolo (AsyncStorage + Supabase quando configurado)
  components/
    ui.tsx                   # Primitivos de UI (Button, Field, Chip, Card...) — neutros, sem branding ainda
supabase/
  migrations/0001_profiles.sql   # Schema da tabela profiles (RLS por usuário)
```

## O motor roda embarcado no app

`src/lib/engine.ts` importa `generateProtocol` direto de `../../../engine` (fora da
raiz deste projeto Expo) — é o MESMO código usado em `test/simulate-engine.js`, não
uma cópia. Funciona porque:

1. `engine/data.js` carrega as regras via `require()` (não `fs.readFileSync`) — Metro
   sabe resolver isso igual o Node.
2. A raiz do repo declara `app` como workspace npm (`package.json` raiz), e o Metro
   do SDK 58+ detecta monorepos assim automaticamente — sem `metro.config.js` customizado.

Validado rodando `npx expo export -p ios` (bundla sem simulador) e confirmando que o
bundle inclui o motor sem erro de resolução de módulo.

Isso significa que, hoje, o protocolo é gerado NO APARELHO, sem precisar de backend —
o que é rápido pra validar o fluxo completo, mas também significa que uma mudança nas
regras do motor exige publicar uma nova versão do app, não só atualizar um servidor.
Mover a geração pra um backend (ou Supabase Edge Function) é uma opção pra revisitar
quando isso incomodar.

## Autenticação

`src/ctx.tsx` usa Supabase quando configurado (ver `.env.example`), com um modo local
de fallback (sem `.env`) só pra dar pra navegar login → cadastro → protocolo sem
precisar criar um projeto Supabase ainda. **O modo local não autentica de verdade** —
qualquer e-mail/senha entra, a "conta" é só uma chave derivada do e-mail guardada no
aparelho. Ligar o Supabase de verdade:

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Rode `supabase/migrations/0001_profiles.sql` no SQL editor do projeto.
3. Copie `.env.example` pra `.env` e preencha com a URL + anon key do projeto
   (Project Settings → API).
4. Reinicie `npx expo start`.

## Pendências deste scaffold

- ~~Modo local de auth é só pra demonstração — nenhum dado fica seguro nele.~~ — resolvido (out/2026): projeto Supabase real criado (`anujgpaucafrpfbfapgi`, região São Paulo), migration `0001_profiles.sql` aplicada (com RLS endurecida — ver histórico do arquivo), `.env` configurado. Login/cadastro autenticam de verdade agora; o modo local em `src/ctx.tsx` só entra em jogo se `.env` estiver ausente (ex: outra máquina sem as chaves).
- `currentRoutineRaw` (passo 7 do cadastro) é coletado mas ainda não alimenta
  `currentRoutine`/`exerciseCountByGroup` — a extração não existe no motor ainda
  (ver `docs/engine-flow.md` na raiz).
- Reordenar atividades físicas usa botões ▲▼ em vez de arrastar — funciona, mas não é
  o gesto de arrastar mencionado em `activity-priority-rules.json/intakeSchema`.
- Nenhuma tela de edição de perfil/configurações ainda — só cadastro inicial e
  resultado.
- Branding (decisão de produto #3 — nome definitivo, paleta, ícone) ainda está aberta;
  `src/components/ui.tsx` usa uma paleta neutra de propósito até isso ser decidido.
- `userRequestedEscalation` (escalada manual de `maintenance_support`, já suportada
  pelo motor) ainda não tem ação na UI — fica pra quando existir uma tela de
  acompanhamento/check-in.
