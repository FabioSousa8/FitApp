# Logística do beta fechado

Plano operacional pra rodar a primeira rodada de testes com usuários reais. Isto é um plano, não uma decisão de engenharia travada — ajuste conforme a realidade do primeiro grupo.

## 0. Pré-requisitos (bloqueiam convidar qualquer pessoa)

Nesta ordem, porque cada um depende do anterior:

1. ~~Projeto Supabase real criado e configurado~~ — resolvido (out/2026): projeto `anujgpaucafrpfbfapgi` (região São Paulo), migration `0001_profiles.sql` aplicada (RLS endurecida), `app/.env` preenchido. Autenticação passou do modo local pra Supabase Auth de verdade.
2. **Decisão sobre os documentos legais** (`legal/termo-de-uso.md`, `legal/politica-de-privacidade.md`): os dois são rascunhos que ainda não passaram por um advogado. Duas opções, e a escolha é sua, não minha:
   - Esperar a revisão jurídica de verdade antes de convidar qualquer pessoa — mais seguro, mais lento.
   - Rodar esta primeira rodada só com um grupo muito pequeno e de confiança (ver seção 1), sendo transparente com eles de que os termos ainda são rascunho — reduz o risco mas não elimina.
   Qualquer que seja a escolha, o e-mail de contato real (seção 12 do termo de uso) precisa existir antes do primeiro convite — é o canal pra alguém reportar um problema ou pedir exclusão de dados.
3. **Teste end-to-end feito por você mesmo**, do zero (conta nova, cadastro completo, protocolo gerado), depois dos dois pontos acima — antes de pedir pra qualquer outra pessoa fazer isso.

## 1. Tamanho e perfil do primeiro grupo

Recomendo começar pequeno: **5 a 10 pessoas**, não mais — você é o único suporte técnico e a primeira rodada de feedback tende a gerar mais trabalho por pessoa do que parece (dúvida, bug, ajuste). Dá pra abrir mais depois que o primeiro ciclo passar sem problema grave.

Pra validar o motor de verdade (não só "o app abre"), o grupo ideal cobre perfis diferentes, não 8 pessoas parecidas:

- Pelo menos uma pessoa em cada objetivo principal: hipertrofia/estética, força, emagrecimento/recomposição, saúde geral sem meta específica. `evento_especifico` é opcional nesta rodada (é o caminho menos comum).
- Pelo menos uma pessoa com alguma limitação física tagueada (joelho, lombar, ombro...) — é o ramo do cadastro menos testado com gente real até agora.
- Equipamento disponível variado — alguém só com peso do corpo/halteres em casa, alguém com acesso a academia completa.
- Se possível, alguém mais avançado (anos de treino ininterrupto) — testa a faixa `highly_advanced`, que ainda não tem landmark próprio e cai em `advanced` (pendência conhecida, ver `README.md`).
- Todos precisam já ter experiência de treino — é o público do app (quem não pode pagar personal, não quem nunca treinou). Gente sem experiência vai tropeçar em coisas que o app não foi desenhado pra resolver, e isso contamina o feedback.

Fonte mais natural pro primeiro grupo: pessoas que você já conhece de academia ou comunidades de treino — a troca é mais direta, e vocês já têm confiança o suficiente pra rodar com termos ainda em rascunho (se essa for a opção escolhida na seção 0).

## 2. Como distribuir o app

Hoje não existe build publicada em loja nem via EAS — só a validação local (`npx expo export`). Pra gente de fora testar no próprio celular, duas opções:

- **Expo Go** (recomendado pra esta primeira rodada): a pessoa instala o app "Expo Go" (grátis, iOS/Android) e escaneia o QR code que `npx expo start` mostra. Não precisa de build nem de conta de desenvolvedor. Funciona porque o app não usa nenhum módulo nativo fora do que o Expo Go já embute (Supabase, AsyncStorage, SecureStore, gesture-handler, reanimated — todos suportados). Limitação: o aparelho do tester precisa estar na mesma rede, ou você usa o modo túnel do Expo (`npx expo start --tunnel`) pra funcionar à distância.
- **EAS Build** (internal distribution / TestFlight): gera um app instalável de verdade, mais parecido com produção, mas exige conta EAS, configurar `eas.json`, e (no iOS) uma conta de desenvolvedor Apple — mais setup do que vale a pena pra 5-10 pessoas agora. Vale revisitar quando o grupo crescer ou quando o Expo Go virar uma limitação real.

## 3. Mecanismo de feedback

Não existe (e não faz sentido construir agora, antes do motor e do legal estarem resolvidos) nenhum feedback dentro do app. Pra esta rodada, um canal simples por fora é suficiente:

- Um formulário curto (Google Forms ou equivalente) ou mesmo uma conversa estruturada (mensagem/chamada) depois de alguns dias de uso, perguntando especificamente:
  - O cadastro fez sentido? Alguma pergunta confusa ou fora de lugar?
  - O protocolo gerado combina com o que você esperava pro seu objetivo e nível?
  - Encontrou algum erro, trava ou comportamento estranho?
  - (Se a pessoa tem limitação física tagueada) os exercícios sugeridos respeitaram isso?
  - O que sentiu falta?
- Peça pra reportarem bugs ou problema urgente direto pelo e-mail de contato (seção 0, ponto 2), não só no formulário — formulário é pra feedback de produto, e-mail é pro que precisa de resposta rápida (inclusive pedido de exclusão de dados).
- Você mesmo decide se cria esse formulário — não é algo que eu deveria criar em nome do app sem você revisar o texto primeiro.

## 4. O que observar / critério de sucesso desta rodada

Sem analytics embutido, a avaliação é qualitativa. Esta primeira rodada é bem-sucedida se:

- Todo o grupo conseguir completar cadastro → protocolo sem ajuda sua (ou com ajuda mínima, pontual);
- Nenhum bug bloqueante (app trava, perde dados, gera protocolo claramente errado);
- O feedback sobre o protocolo em si (não a UI) for majoritariamente "faz sentido pro meu perfil", ainda que com ajustes a refinar;
- Você sair com uma lista concreta de ajustes pro motor e pro app — não só "gostei"/"não gostei".

Isso também é a primeira oportunidade real de validar a pendência de nomenclatura/visual (decisão de branding, #3): pedir reação ao nome e à cara neutra do app agora é mais barato do que decidir isso no vácuo.

## 5. Cronograma sugerido

Não é uma data travada, é uma ordem de grandeza:

1. Resolver pré-requisitos da seção 0 (tempo varia — depende sobretudo da revisão jurídica, se for a opção escolhida).
2. Seu próprio teste end-to-end.
3. Convite + onboarding do grupo (explicar Expo Go, acompanhar os primeiros cadastros de perto).
4. 1-2 semanas de uso real.
5. Coleta de feedback (formulário + follow-up das pessoas que não responderem).
6. Retro: lista de ajustes priorizada, decisão sobre abrir pra um grupo maior ou iterar primeiro.

## Pendências desta logística

- E-mail/canal de contato real ainda não existe (ver `legal/termo-de-uso.md` seção 12 e `legal/politica-de-privacidade.md` seção 11) — bloqueia o convite do primeiro usuário.
- ~~Projeto Supabase real ainda não existe~~ — resolvido (out/2026).
- Decisão em aberto: esperar revisão jurídica ou rodar com grupo de confiança primeiro (seção 0, ponto 2) — decisão do Fabio.
- Formulário/roteiro de feedback (seção 3) ainda não foi criado de fato.
