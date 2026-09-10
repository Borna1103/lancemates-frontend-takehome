import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  onSuccess: (email: string, name: string) => void;
  onToLogin: () => void;
}

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  {
    label: 'One special character',
    test: (p: string) => /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'/`~]/.test(p),
  },
];

/**
 * Sign Up — one simple form: name, email, password, description.
 * Validates, then calls `onSuccess`. Wire to a real API later if needed.
 */
export default function SignUpScreen({ onSuccess, onToLogin }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const handleSubmit = () => {
    const next: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) next.name = 'Name is required.';

    if (!email.trim()) next.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = 'Please enter a valid email.';

    if (!password) next.password = 'Password is required.';
    else {
      const failed = PASSWORD_RULES.find((rule) => !rule.test(password));
      if (failed) next.password = `Password needs: ${failed.label.toLowerCase()}.`;
    }

    setErrors(next);
    if (Object.keys(next).length === 0) onSuccess(email.trim(), name.trim());
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Join Lancemates and start connecting with your community.</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your full name" placeholderTextColor="#888" />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

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
            placeholder="At least 8 characters"
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Text style={styles.eyeToggle}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <Text style={styles.label}>About you (optional)</Text>
        <TextInput
          style={[styles.input, styles.description]}
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="A short bio, or what you're looking for…"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submitText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onToLogin}>
          <Text style={styles.switchText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 24, alignItems: 'center' },
  card: { width: '100%', maxWidth: 420, paddingVertical: 24, gap: 6 },
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
  description: { minHeight: 90, textAlignVertical: 'top' },
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