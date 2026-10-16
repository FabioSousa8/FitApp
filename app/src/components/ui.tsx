// Primitivos de UI compartilhados — neutros de propósito: branding (decisão de
// produto #3, nome/paleta definitiva) ainda está aberta, então aqui é só o
// suficiente pra ter hierarquia e espaçamento consistentes, não uma identidade visual
// final. Troque ACCENT quando a marca for decidida.
import React from "react";
import {
  ActivityIndicator,
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

export const ACCENT = "#2563EB";
const INK = "#111827";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const BG = "#FFFFFF";
const SURFACE = "#F9FAFB";
const DANGER = "#DC2626";

export function Screen({ children, style, ...rest }: ViewProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.screenContent, style]}
        keyboardShouldPersistTaps="handled"
        {...rest}>
        {children}
      </ScrollView>
    </SafeAreaView>
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

type ButtonProps = PressableProps & {
  title: string;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

export function Button({ title, variant = "primary", loading, disabled, style, ...rest }: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        variant === "primary" && styles.buttonPrimary,
        variant === "secondary" && styles.buttonSecondary,
        variant === "ghost" && styles.buttonGhost,
        isDisabled && styles.buttonDisabled,
        pressed && !isDisabled && styles.buttonPressed,
        style as object,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : ACCENT} />
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
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  screenContent: { padding: 20, paddingBottom: 40, gap: 16 },
  title: { fontSize: 24, fontWeight: "700", color: INK },
  subtitle: { fontSize: 15, color: MUTED, lineHeight: 21 },
  label: { fontSize: 13, fontWeight: "600", color: INK, marginBottom: 6 },
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
    color: INK,
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
  buttonPressed: { opacity: 0.85 },
  buttonText: { fontSize: 16, fontWeight: "600" },
  buttonTextPrimary: { color: "#fff" },
  buttonTextSecondary: { color: ACCENT },
  chip: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: SURFACE,
  },
  chipSelected: { backgroundColor: ACCENT, borderColor: ACCENT },
  chipText: { fontSize: 14, color: INK, fontWeight: "500" },
  chipTextSelected: { color: "#fff" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  card: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    padding: 16,
    backgroundColor: SURFACE,
    gap: 8,
  },
  progressRow: { flexDirection: "row", gap: 6, marginBottom: 4 },
  progressDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: BORDER },
  progressDotDone: { backgroundColor: ACCENT },
  progressDotCurrent: { backgroundColor: ACCENT },
});
