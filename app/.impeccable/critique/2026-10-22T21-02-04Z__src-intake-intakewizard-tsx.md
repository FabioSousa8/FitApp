---
target: cadastro (IntakeWizard) + resultado + primitivos ui.tsx
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/home/claude/fitapp/app/src/intake/IntakeWizard.tsx"
target_fingerprint: "sha256:ba02b4e6c6df51feacf6618aaf2c7d481c939d3db8f2d093cb5f1066e80c3362"
target_path: /home/claude/fitapp/app/src/intake/IntakeWizard.tsx
timestamp: 2026-10-22T21-02-04Z
slug: src-intake-intakewizard-tsx
---
Method: design review only (detector not applicable, native platform — React Native/Expo, no web markup to scan)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | "Gerar meu protocolo" gives zero feedback during the async save |
| 2 | Match System / Real World | 3/4 | Plain PT-BR throughout, smart defaults called out in copy |
| 3 | User Control and Freedom | 2/4 | No visible way to exit the cadastro wizard back to Home |
| 4 | Consistency and Standards | 3/4 | Strong shared primitives undercut by icon-only ▲/▼ outlier |
| 5 | Error Prevention | 3/4 | Good field validation; Supabase sync failure not surfaced |
| 6 | Recognition Rather Than Recall | 3/4 | Options always visible; ▲/▼ glyphs are the guess-what-this-does spot |
| 7 | Flexibility and Efficiency of Use | 1/4 | "Refazer cadastro" always starts blank, full 7-step redo |
| 8 | Aesthetic and Minimalist Design | 2/4 | Clean per-screen, but 7 steps share one skeleton; CTA scrolls away |
| 9 | Error Recovery | 2/4 | Field errors specific; failed cloud sync silently swallowed |
| 10 | Help and Documentation | 2/4 | HelperText does real work; nothing beyond that exists |
| Total | | 23/40 | Acceptable — significant improvements needed before users are happy |

## Design Specificity Verdict
LLM assessment: structurally generic wizard (chips/cards/fields/progress dots) that could belong to any onboarding flow. The bespoke layer is color only (dark ink/paper + Azul Protocolo, contrast documented and independently verified). FortEvo's actual differentiator — a rigorous data-driven protocol engine — has no visual expression before the result screen, which is still plain text rows.
Deterministic scan: not applicable (native platform).
Visual overlays: not applicable (native platform).

## Overall Impression
Bones are more disciplined than "sem refino" suggests: shared primitives, a real press-feedback system, measured contrast. Missing pieces are specific and fixable, not a redesign: loading feedback at the highest-stakes tap, two unlabeled icon controls, touch targets a few px short, a wizard that never varies its rhythm across 7 screens.

## What's Working
1. Contrast is genuinely correct, independently reverified (MUTED-on-INK 7.29:1, PAPER-on-ACCENT 4.26:1 for large/bold text, PAPER-on-ACCENT_PRESSED 7.3:1).
2. Press feedback is systemic via one shared usePressScale hook (scale 0.97, ease-out, 120/160ms), not copy-pasted per component.
3. Validation is specific per field, not generic ("fill required fields").

## Priority Issues

[P1] "Gerar meu protocolo" gives no feedback during an async save
Why it matters: intake.tsx's handleComplete awaits saveProfile (AsyncStorage + possible Supabase network upsert), but IntakeWizard's next() calls onComplete without awaiting or touching loading state, even though Button already supports a loading prop (correctly wired in sign-in.tsx).
Fix: wire loading into the final-step button; await onComplete before navigating.
Suggested command: /impeccable polish

[P1] Reorder controls (▲/▼) are icon-only with no accessible label anywhere in the app
Why it matters: accessibilityLabel/Role appears exactly once in the codebase, on Chip. The ▲/▼/"Remover" row in StepAtividades is unlabeled — screen-reader users hit unidentified glyphs.
Fix: add accessibilityLabel to both controls; consider text labels ("Subir"/"Descer") to match the app's text-first style.
Suggested command: /impeccable audit, then /impeccable clarify

[P2] Primary CTA scrolls away instead of staying in the thumb zone
Why it matters: Screen wraps the Voltar/Avançar row inside the same ScrollView as the step content. On long steps (Atividades) the CTA isn't pinned.
Fix: pin the button row outside the ScrollView.
Suggested command: /impeccable layout

[P2] Chip touch targets measure ~35px, under the 44/48px minimum
Why it matters: paddingVertical:9 + text height ≈35px tappable height; Chip is the primary input across 5 of 7 steps.
Fix: raise paddingVertical to 12-13, or add hitSlop.
Suggested command: /impeccable adapt

[P2] No visible way to exit the cadastro wizard
Why it matters: only "Voltar" exists; headerShown:false removes the native back chevron; no labeled escape to Home.
Fix: add a "Sair do cadastro" control.
Suggested command: /impeccable onboard

## Persona Red Flags
Jordan (first-timer): hits the unlabeled ▲/▼ and has to guess by tapping.
Sam (accessibility): ▲/▼ have no label; additionally Chip hardcodes accessibilityRole="checkbox" even for single-select groups (nível, objetivo, consistência) that behave like radio buttons, not checkboxes.
Casey (mobile/distracted): CTA can scroll out of thumb reach on long steps; no confirmation her progress saved if interrupted mid-flow.

## Minor Observations
- "Refazer cadastro" always starts from EMPTY_DRAFT — no prefill from the last saved profile, so one wrong answer means redoing all 7 steps.
- Spacing scale isn't a clean progression (4,6,8,9,12,14,16,20 across ui.tsx) — part of what reads as "sem refino" independent of color/type.
- A failed Supabase sync on cadastro completion is swallowed silently (console.warn only) with no user-facing signal.
- All 7 wizard steps share one Title+Subtitle+ChipRow/Field skeleton regardless of question type (choice vs free text vs ranking).

## Questions to Consider
- Should the "Objetivo" step (the single most consequential answer) look visually distinct from the other six?
- Is 7 strictly sequential steps the right shape, or would grouping (sobre você / seu treino / equipamento) help?
- Is it worth making the result screen look like it came from a protocol engine, or is that better left until after real feedback on the numbers?
