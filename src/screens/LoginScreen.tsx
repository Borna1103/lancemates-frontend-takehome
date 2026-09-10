import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  onSuccess: (email: string) => void;
  onToSignUp: () => void;
}

/**
 * Log In — simple email + password form. Validates, then calls `onSuccess`.
 * Wire this to a real API later if needed.
 */
export default function LoginScreen({ onSuccess, onToSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = () => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = 'Please enter a valid email.';
    if (!password) next.password = 'Password is required.';

    setErrors(next);
    if (Object.keys(next).length === 0) onSuccess(email.trim());
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subtitle}>Welcome back to Lancemates.</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor="#888"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="••••••••"
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Text style={styles.eyeToggle}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submitText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onToSignUp}>
          <Text style={styles.switchText}>No account yet? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  card: { width: '100%', maxWidth: 420, gap: 6 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#666', marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', marginTop: 10, color: '#666' },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginTop: 4,
  },
  passwordRow: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  passwordInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  eyeToggle: { paddingHorizontal: 14, fontSize: 13, fontWeight: '600', color: '#002c37' },
  error: { color: '#c0392b', fontSize: 13, marginTop: 4 },
  submit: {
    backgroundColor: '#002c37',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  switchText: { textAlign: 'center', marginTop: 16, fontSize: 14, fontWeight: '600', color: '#002c37' },
});