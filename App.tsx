import { useState } from 'react';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

type Screen = 'landing' | 'login' | 'signup';

/**
 * App root. Minimal screen switcher — swap for a real navigation library
 * (expo-router / react-navigation) once the app grows.
 */
export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');

  return (
    <>
      {screen === 'landing' && <LandingScreen onNavigate={setScreen} />}
      {screen === 'login' && (
        <LoginScreen onToSignUp={() => setScreen('signup')} onBack={() => setScreen('landing')} />
      )}
      {screen === 'signup' && (
        <SignUpScreen onToLogin={() => setScreen('login')} onBack={() => setScreen('landing')} />
      )}
    </>
  );
}