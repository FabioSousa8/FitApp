# Política de Privacidade — FitApp

**Status: RASCUNHO.** Este documento resolve a pendência da seção 8 de `legal/termo-de-uso.md` (política de privacidade completa, alinhada à LGPD — Lei Geral de Proteção de Dados, Lei 13.709/2018). **Antes de publicar isso pra qualquer usuário (mesmo beta fechado), um advogado (de preferência com experiência em LGPD) precisa revisar** — assim como o termo de uso, o texto abaixo é um ponto de partida sólido e tecnicamente preciso sobre o que o app de fato faz com os dados, não um documento juridicamente validado. Em particular, o ponto 3 abaixo (dados sensíveis) precisa de confirmação jurídica antes de publicar.

_Última atualização: a definir na revisão jurídica. Versão inicial: out/2026._

---

## 1. Escopo

Esta política explica quais dados o FitApp ("o app") coleta, pra que usa, onde guarda e quais direitos você tem sobre eles. Ela complementa o `legal/termo-de-uso.md` — leia os dois.

## 2. Quem é o controlador dos dados

[Identificação do responsável pelo app — pessoa física ou CNPJ — a definir.] Essa identificação é pré-requisito pra publicar esta política: a LGPD exige que o controlador seja identificável.

## 3. Quais dados coletamos

**Dados de conta** (criação de login):
- E-mail e senha. A senha é gerenciada pelo Supabase Auth (quando configurado) — o FitApp nunca vê nem guarda a senha em texto puro. No modo local de fallback (sem Supabase configurado ainda, ver `app/README.md`), o e-mail digitado fica só no aparelho, nunca é enviado a lugar nenhum, e não existe senha de verdade sendo verificada.

**Dados do cadastro (intake)** — tudo que `app/src/intake/IntakeWizard.tsx` coleta pra gerar seu protocolo:
- Nível de treino (autodeclarado) e tempo de treino em anos;
- Dias e minutos disponíveis por sessão;
- Objetivo (categoria, detalhe em texto livre opcional, e foco de evento quando aplicável) e data-alvo, quando houver;
- **Limitações físicas**: tags fechadas (ex: "joelho sensível") + descrição em texto livre opcional. **Isto pode ser considerado dado pessoal sensível sob o art. 5º, II da LGPD (dado sobre saúde) — ver nota de risco no rodapé.** Diagnósticos médicos específicos, exames, peso e percentual de gordura NÃO são coletados (decisão de produto, ver `README.md` do repositório principal);
- Atividades físicas praticadas, frequência e ordem em relação à musculação;
- Consistência de treino, equipamento disponível, preferência de cardio;
- Rotina atual em texto livre (opcional, passo 7 do cadastro) — hoje só é guardada, ainda não é usada por nenhuma regra do motor.

**Protocolo gerado**: o resultado de `generateProtocol()` (o motor) a partir dos dados acima — guardado pra você ver de novo sem precisar regenerar.

**O que NÃO coletamos**: dados de localização, contatos, fotos (além do texto opcional do passo 7), nem nenhum identificador de rastreamento de terceiros — o app não tem nenhum SDK de analytics, publicidade ou rastreamento embutido hoje.

## 4. Pra que usamos esses dados

Exclusivamente para gerar e ajustar o seu protocolo de treino e cardio, e pra você poder consultá-lo depois. Não usamos seus dados para publicidade, não montamos perfil comportamental, e não vendemos nem alugamos dados a terceiros, em nenhuma hipótese.

## 5. Onde seus dados ficam guardados

- **No aparelho**: sempre. O cadastro e o protocolo gerado ficam salvos localmente (`AsyncStorage`) independente de qualquer backend — é o que faz o app funcionar mesmo no modo local de autenticação.
- **No Supabase**: quando o projeto Supabase estiver configurado (ver pendência em `README.md` — ainda não existe um projeto real) e você tiver uma conta de verdade (não o modo local), o cadastro e o protocolo também são salvos na tabela `profiles`, protegida por Row Level Security — cada usuário só lê/escreve a própria linha, nunca a de outra pessoa (`app/supabase/migrations/0001_profiles.sql`). O token de sessão fica em `SecureStore` (nativo) ou `localStorage` (web).
- O Supabase atua como operador (processador) desses dados em nosso nome. **Dependendo da região escolhida pro projeto Supabase, os dados podem ficar hospedados fora do Brasil — isso tem implicação de transferência internacional sob a LGPD e precisa ser confirmado na revisão jurídica**, junto com a escolha final da região do projeto.

## 6. Com quem compartilhamos

Com ninguém, exceto o Supabase (como operador, na função descrita acima) quando configurado. Não compartilhamos dados com anunciantes, corretores de dados, ou qualquer outro terceiro.

## 7. Por quanto tempo guardamos

Enquanto sua conta existir. Se você encerrar sua conta (ver seção 10 do termo de uso), seus dados são removidos — tanto a cópia local quanto, quando aplicável, a linha correspondente no Supabase.

## 8. Seus direitos (LGPD, art. 18)

Você pode, a qualquer momento, pedir:
- Confirmação de que tratamos seus dados, e acesso a eles;
- Correção de dados incompletos, inexatos ou desatualizados;
- Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;
- Portabilidade dos seus dados a outro fornecedor;
- Informação sobre com quem compartilhamos seus dados (ver seção 6);
- Revogação do seu consentimento e eliminação dos dados tratados com base nele.

Pra exercer qualquer um desses direitos, use o canal de contato da seção 11.

## 9. Segurança

Usamos Row Level Security no banco (cada usuário só acessa a própria linha), armazenamento de sessão nos mecanismos seguros nativos de cada plataforma (`SecureStore`/`localStorage`), e conexões sempre via HTTPS quando falando com o Supabase. Nenhum sistema é 100% livre de risco — isso descreve as medidas tomadas, não uma garantia absoluta.

## 10. Menores de idade

O FitApp é destinado a pessoas com 18 anos ou mais (mesma regra do termo de uso, seção 3) e não coleta intencionalmente dados de menores.

## 11. Encarregado de dados (DPO) e contato

[E-mail de contato pra dúvidas, solicitações de direitos e encarregado de dados — a definir. Ver pendência no rodapé: precisa de uma conta real, que depende de uma ação do Fabio, não deste assistente.]

A LGPD (art. 41) exige que o controlador publique o contato do encarregado de dados. Enquanto o FitApp for operado por uma única pessoa, esse papel provavelmente é o próprio responsável pelo app — a revisão jurídica deve confirmar se isso é suficiente nesta fase (beta fechado, poucos usuários) ou se algo mais formal é necessário.

## 12. Alterações nesta política

Esta política pode ser atualizada. Mudanças relevantes serão comunicadas aos usuários.

---

### Pendências deste documento (não travam o rascunho, mas precisam ser resolvidas antes de publicar)

- **Revisão por advogado especializado em LGPD** — condição pra publicar, não opcional. Em especial: confirmar se os dados de limitação física (seção 3) são de fato "dado sensível" sob o art. 5º, II e, se forem, se o fluxo de consentimento atual (aceitar o termo de uso ao criar conta) satisfaz o art. 11, ou se é preciso um consentimento destacado e específico só pra esse campo.
- Definir o nome legal/jurídico do responsável pelo app (mesma pendência do termo de uso) — preenche a seção 2.
- Decidir e **criar de verdade** o e-mail/canal de contato da seção 11 — ação do Fabio, não posso criar contas em nome dele.
- Decidir a região de hospedagem do projeto Supabase antes de criá-lo de verdade (seção 5) — afeta se há transferência internacional de dado.
- Confirmar se, nesta fase de poucos usuários, é preciso formalizar um encarregado de dados (seção 11) ou se isso pode esperar um volume maior de usuários — pergunta pra revisão jurídica.
