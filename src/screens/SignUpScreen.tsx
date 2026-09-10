import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signUp } from "../api/authApi";
import { useColors } from "../hooks/useColors";
import { IUser } from "../types";

interface ISignUpScreenProps {
  onSuccess: (user: IUser) => void;
  onNavigateToLogin: () => void;
}

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'/`~]/.test(p) },
];

/**
 * Sign Up — single form (email, password, name, description) wired to the fake
 * `/auth/signup` endpoint. No multi-step flow needed.
 *
 * Validation and error handling are wired; own the design/polish.
 */
export default function SignUpScreen({ onSuccess, onNavigateToLogin }: ISignUpScreenProps) {
  const colors = useColors();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
    form?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const next: { email?: string; password?: string; name?: string } = {};

    if (!email.trim()) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Please enter a valid email.";

    if (!password) next.password = "Password is required.";
    else {
      const failedRule = PASSWORD_RULES.find((rule) => !rule.test(password));
      if (failedRule) next.password = `Password needs: ${failedRule.label.toLowerCase()}.`;
    }

    if (!name.trim()) next.name = "Name is required.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || isLoading) return;

    setIsLoading(true);
    setErrors({});
    try {
      const response = await signUp({ email, password, name, description });
      onSuccess(response.user);
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={[styles.title, { color: colors.text }]}>Create your account</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Join Lancemates and start connecting with your community.
        </Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Name</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.borderLight }]}
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
          placeholderTextColor={colors.textTertiary}
        />
        {errors.name && (
          <Text style={[styles.errorText, { color: colors.error }]}>{errors.name}</Text>
        )}

        <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.borderLight }]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor={colors.textTertiary}
        />
        {errors.email && (
          <Text style={[styles.errorText, { color: colors.error }]}>{errors.email}</Text>
        )}

        <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
        <View style={[styles.passwordRow, { borderColor: colors.borderLight }]}>
          <TextInput
            style={[styles.passwordInput, { color: colors.text }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Must be at least 8 characters"
            placeholderTextColor={colors.textTertiary}
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Text style={[styles.eyeToggle, { color: colors.tintDark }]}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={[styles.errorText, { color: colors.error }]}>{errors.password}</Text>
        )}

        <Text style={[styles.label, { color: colors.textSecondary }]}>About you (optional)</Text>
        <TextInput
          style={[
            styles.input,
            styles.descriptionInput,
            { color: colors.text, borderColor: colors.borderLight },
          ]}
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="A short bio, what you offer, or what you're looking for…"
          placeholderTextColor={colors.textTertiary}
        />

        {errors.form && (
          <Text style={[styles.errorText, { color: colors.error }]}>{errors.form}</Text>
        )}

        <TouchableOpacity
          style={[styles.submit, { backgroundColor: colors.tintDark }]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.tintForeground} />
          ) : (
            <Text style={[styles.submitText, { color: colors.tintForeground }]}>Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToLogin}>
          <Text style={[styles.switchText, { color: colors.tintDark }]}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 24, alignItems: "center" },
  card: { width: "100%", maxWidth: 420, paddingVertical: 24, gap: 6 },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 4 },
  subtitle: { fontSize: 15, marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginTop: 4,
  },
  descriptionInput: { minHeight: 90, textAlignVertical: "top" },
  passwordRow: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  passwordInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  eyeToggle: { paddingHorizontal: 14, fontSize: 13, fontWeight: "600" },
  errorText: { fontSize: 13, marginTop: 4 },
  submit: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: { fontSize: 16, fontWeight: "700" },
  switchText: { textAlign: "center", marginTop: 16, fontSize: 14, fontWeight: "600" },
});