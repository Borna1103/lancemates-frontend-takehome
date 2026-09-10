import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { login } from "../api/authApi";
import { useColors } from "../hooks/useColors";
import { IUser } from "../types";

interface ILoginScreenProps {
  onSuccess: (user: IUser) => void;
  onNavigateToSignUp: () => void;
}

/**
 * Log In — email + password wired to the fake `/auth/login` endpoint.
 *
 * Expand the styling to match the landing page. Validation and error handling
 * are already wired; keep behavior, own the design.
 */
export default function LoginScreen({ onSuccess, onNavigateToSignUp }: ILoginScreenProps) {
  const colors = useColors();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Please enter a valid email.";
    if (!password) next.password = "Password is required.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || isLoading) return;

    setIsLoading(true);
    setErrors({});
    try {
      const response = await login({ email, password });
      onSuccess(response.user);
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.card}>
        <Text style={[styles.title, { color: colors.text }]}>Log In</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Welcome back to Lancemates.
        </Text>

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
            placeholder="••••••••"
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
            <Text style={[styles.submitText, { color: colors.tintForeground }]}>Log In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToSignUp}>
          <Text style={[styles.switchText, { color: colors.tintDark }]}>
            No account yet? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center" },
  card: { width: "100%", maxWidth: 420, gap: 6 },
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