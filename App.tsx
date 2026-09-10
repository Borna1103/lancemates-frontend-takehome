import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { useColors } from './src/hooks/useColors';
import LandingScreen, { ScreenName } from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { IUser } from './src/types';

/**
 * Root screen switcher. No navigation library yet — keep this until the app
 * grows. Swap for expo-router/react-navigation once there are real routes.
 */
function AppContent() {
  const colors = useColors();
  const { resolvedTheme } = useTheme();
  const [screen, setScreen] = useState<ScreenName>('landing');
  const [user, setUser] = useState<IUser | null>(null);

  const handleSignedIn = (signedInUser: IUser) => {
    setUser(signedInUser);
    // TODO: navigate to the app's main screen (feed/dashboard) once it exists.
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('landing');
  };

  if (user) {
    return (
      <View style={[styles.signedIn, { backgroundColor: colors.background }]}>
        <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
        <Text style={[styles.signedInTitle, { color: colors.text }]}>
          Welcome, {user.name}!
        </Text>
        <Text style={[styles.signedInSubtitle, { color: colors.textSecondary }]}>
          Signed in as {user.email}
        </Text>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.tintDark }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, { color: colors.tintForeground }]}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
      {screen === 'landing' && <LandingScreen onNavigate={setScreen} />}
      {screen === 'login' && (
        <LoginScreen
          onSuccess={handleSignedIn}
          onNavigateToSignUp={() => setScreen('signup')}
        />
      )}
      {screen === 'signup' && (
        <SignUpScreen
          onSuccess={handleSignedIn}
          onNavigateToLogin={() => setScreen('login')}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  signedIn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  signedInTitle: { fontSize: 24, fontWeight: '800', marginBottom: 6 },
  signedInSubtitle: { fontSize: 15, marginBottom: 24 },
  logoutButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  logoutText: { fontSize: 15, fontWeight: '700' },
});