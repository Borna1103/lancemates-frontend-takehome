import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

type Screen = 'landing' | 'login' | 'signup' | 'home';

/**
 * Simple screen switcher. Swap for a navigation library (expo-router /
 * react-navigation) once the app grows.
 */
export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);

  const handleAuth = (email: string, name?: string) => {
    setUser({ email, name });
    setScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('landing');
  };

  if (screen === 'home' && user) {
    return (
      <View style={styles.home}>
        <Text style={styles.homeTitle}>Welcome{user.name ? `, ${user.name}` : ''}!</Text>
        <Text style={styles.homeSubtitle}>Signed in as {user.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'login') {
    return (
      <LoginScreen
        onSuccess={(email) => handleAuth(email)}
        onToSignUp={() => setScreen('signup')}
      />
    );
  }

  if (screen === 'signup') {
    return (
      <SignUpScreen
        onSuccess={(email, name) => handleAuth(email, name)}
        onToLogin={() => setScreen('login')}
      />
    );
  }

  return <LandingScreen onNavigate={setScreen} />;
}

const styles = StyleSheet.create({
  home: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  homeTitle: { fontSize: 24, fontWeight: '800', marginBottom: 6 },
  homeSubtitle: { fontSize: 15, color: '#666', marginBottom: 24 },
  button: { backgroundColor: '#002c37', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});