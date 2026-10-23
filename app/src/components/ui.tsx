// Primitivos de UI compartilhados — tema FortEvo.
//
// Neutros (tinta/papel) e acento (Azul Protocolo) vêm do branding fechado em
// branding/02-identidade-visual.md (etapas 6-8). Fundo ESCURO fixo, não segue o
// tema claro/escuro do sistema — é a mesma leitura "ferramenta séria, de dado e
// protocolo, não wellness" validada nos mockups de contexto real da etapa 8
// (branding/colors/palette-study.html, azul-protocolo-sistema.html), não uma
// escolha de paleta por paleta: todo o estudo de cor já foi feito em cima de
// fundo escuro.
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  type PressableProps,
  type ViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Neutros de marca (etapa 6) — não mudam entre paletas de acento.
const INK = "#15140F";
const PAPER = "#F5F3EE";

// Acento (etapa 8) — Azul Protocolo, com os estados já derivados em
// branding/colors/azul-protocolo-sistema.html.
export const ACCENT = "#3A64FF"; // base — preenchimento (CTA, progresso, destaque)
const ACCENT_PRESSED = "#0031E7"; // toque ativo / seleção forte (ex: chip marcado)
const ACCENT_TEXT = "#5E80FF"; // único uso do acento como COR DE TEXTO/ícone sobre
// fundo escuro — a base (#3A64FF) fica abaixo do mínimo de contraste AA como texto
// (gap documentado na etapa 8, resolvido aqui: variante clareada até 4.5:1+)

const SURFACE = "#22211D"; // tinta clareada ~6% — elevação de card sobre o fundo
const BORDER = "rgba(245, 243, 238, 0.12)"; // papel a 12% — linha sutil sobre fundo escuro
export const MUTED = "rgba(245, 243, 238, 0.64)"; // papel a 64% — texto secundário
const DANGER = "#E5564A"; // vermelho de erro recalibrado pra contraste AA sobre fundo escuro
const BG = INK;
export const TEXT = PAPER;

// `footer` renderiza FORA do ScrollView, fixo no rodapé da tela (dentro da
// SafeAreaView, então o inset de baixo continua respeitado). É pra qualquer
// linha de ação (Voltar/Avançar, CTA principal) que não pode rolar junto com
// o conteúdo — ver nota de "CTA fora do alcance do polegar" no critique de UX.
export function Screen({ children, footer, style, ...rest }: ViewProps & { footer?: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.screenContent, style]}
        keyboardShouldPersistTaps="handled"
        {...rest}>
        {children}
      </ScrollView>
      {footer ? <View style={styles.screenFooter}>{footer}</View> : null}
    </SafeAreaView>
  );
}

// Lockup pra topo de tela — marca + nome. Só o mínimo necessário (não é o
// logotipo completo de apresentação, é o cabeçalho de uma tela real).
export function Brand() {
  return (
    <View style={styles.brandRow}>
      <Image source={require("../../assets/brand/mark-paper.png")} style={styles.brandMark} />
      <Text style={styles.brandWordmark}>FortEvo</Text>
    </View>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

export function Label({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function HelperText({ children }: { children: React.ReactNode }) {
  return <Text style={styles.helper}>{children}</Text>;
}

export function ErrorText({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return <Text style={styles.error}>{children}</Text>;
}

// Feedback de toque compartilhado (botão e chip): encolhe pra 0.97 na entrada do
// toque, volta na saída — ease-out, ~120/160ms. Mesmo princípio em todo elemento
// "pressionável": confirma que a interface ouviu o toque sem precisar de opacidade
// genérica.
function usePressScale(disabled?: boolean) {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () => {
    if (disabled) return;
    Animated.timing(scale, {
      toValue: 0.97,
      duration: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 160,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };
  return { scale, onPressIn, onPressOut };
}

type ButtonProps = PressableProps & {
  title: string;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

export function Button({ title, variant = "primary", loading, disabled, style, ...rest }: ButtonProps) {
  const isDisabled = disabled || loading;
  const { scale, onPressIn, onPressOut } = usePressScale(isDisabled);
  return (
    <Pressable disabled={isDisabled} onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      <Animated.View
        style={[
          styles.button,
          variant === "primary" && styles.buttonPrimary,
          variant === "secondary" && styles.buttonSecondary,
          variant === "ghost" && styles.buttonGhost,
          isDisabled && styles.buttonDisabled,
          { transform: [{ scale }] },
          style as object,
        ]}>
        {loading ? (
          <ActivityIndicator color={variant === "primary" ? PAPER : ACCENT_TEXT} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              variant === "primary" && styles.buttonTextPrimary,
              variant !== "primary" && styles.buttonTextSecondary,
            ]}>
            {title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

export function Field({
  label,
  helper,
  error,
  ...rest
}: TextInputProps & { label: string; helper?: string; error?: string }) {
  return (
    <View style={styles.field}>
      <Label>{label}</Label>
      <TextInput
        placeholderTextColor={MUTED}
        style={[styles.input, !!error && styles.inputError]}
        {...rest}
      />
      {helper && !error ? <HelperText>{helper}</HelperText> : null}
      <ErrorText>{error}</ErrorText>
    </View>
  );
}

export function Chip({
  label,
  selected,
  onPress,
  role = "checkbox",
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  // "radio" pra grupos de escolha única (nível, objetivo, consistência, etc.) —
  // "checkbox" (default) só pra grupos onde várias seleções fazem sentido ao
  // mesmo tempo (equipamento, limitações). Antes o Chip sempre dizia "checkbox"
  // pra leitor de tela mesmo em grupos de escolha única — ver critique de UX,
  // red flag da persona Sam.
  role?: "checkbox" | "radio";
}) {
  const { scale, onPressIn, onPressOut } = usePressScale();
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      // Área visual do chip mede ~35-38px de altura, abaixo do mínimo de
      // 44pt(iOS)/48dp(Android) — hitSlop estende a área tocável sem mudar o
      // tamanho visual (ver critique de UX, P2 de alvo de toque).
      hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
      accessibilityRole={role}
      accessibilityState={role === "radio" ? { selected } : { checked: selected }}>
      <Animated.View style={[styles.chip, selected && styles.chipSelected, { transform: [{ scale }] }]}>
        <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export function ChipRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.chipRow}>{children}</View>;
}

export function Card({ children, style }: ViewProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <View style={styles.progressRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.progressDot, i < step && styles.progressDotDone, i === step - 1 && styles.progressDotCurrent]} />
      ))}
    </View>
  );
}

// Escala de espaçamento — progressão limpa de 4 em 4. Antes a escala real em
// uso tinha dois números fora da progressão (6 e 9, ver critique de UX,
// observação menor); os dois usos foram arredondados pro múltiplo de 4 mais
// próximo (6→8, 9→8) em vez de inventar um valor novo.
export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 } as const;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  screenContent: { padding: 20, paddingBottom: 40, gap: 16 },
  screenFooter: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    backgroundColor: BG,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  brandMark: { width: 22, height: 22 },
  brandWordmark: { fontSize: 17, fontWeight: "700", letterSpacing: -0.2, color: TEXT },
  title: { fontSize: 24, fontWeight: "700", color: TEXT },
  subtitle: { fontSize: 15, color: MUTED, lineHeight: 21 },
  label: { fontSize: 13, fontWeight: "600", color: TEXT, marginBottom: SPACING.sm },
  helper: { fontSize: 12, color: MUTED, marginTop: 4 },
  error: { fontSize: 12, color: DANGER, marginTop: 4 },
  field: { gap: 0 },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: TEXT,
    backgroundColor: SURFACE,
  },
  inputError: { borderColor: DANGER },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  buttonPrimary: { backgroundColor: ACCENT },
  buttonSecondary: { backgroundColor: SURFACE, borderWidth: 1, borderColor: BORDER },
  buttonGhost: { backgroundColor: "transparent" },
  buttonDisabled: { opacity: 0.5 },
  // fontSize 19/700 no texto primário não é só estética: é o que deixa o papel
  // (#F5F3EE) sobre o azul base (#3A64FF) cruzar a faixa de "texto grande" do
  // WCAG (contraste medido ~4.3:1 — passa em 3:1 pra texto grande, não passaria
  // em 4.5:1 no tamanho pequeno original).
  buttonText: { fontSize: 19, fontWeight: "700" },
  buttonTextPrimary: { color: PAPER },
  buttonTextSecondary: { color: ACCENT_TEXT },
  chip: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: SPACING.sm,
    backgroundColor: SURFACE,
  },
  // Chip selecionado usa o tom PRESSED (mais escuro/saturado que a base), não a
  // base — é o que dá contraste suficiente pro texto claro no tamanho pequeno do
  // chip sem precisar aumentar a fonte (ver nota de contraste em
  // branding/02-identidade-visual.md etapa 8).
  chipSelected: { backgroundColor: ACCENT_PRESSED, borderColor: ACCENT_PRESSED },
  chipText: { fontSize: 14, color: TEXT, fontWeight: "500" },
  chipTextSelected: { color: PAPER },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  card: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 16,
    backgroundColor: SURFACE,
    gap: 8,
  },
  progressRow: { flexDirection: "row", gap: SPACING.sm, marginBottom: SPACING.xs },
  progressDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: BORDER },
  progressDotDone: { backgroundColor: ACCENT },
  progressDotCurrent: { backgroundColor: ACCENT },
});
