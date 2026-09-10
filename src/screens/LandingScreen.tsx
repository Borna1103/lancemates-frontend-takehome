import { Text, View } from 'react-native';

export type AuthScreen = 'login' | 'signup';

interface Props {
  onNavigate: (screen: AuthScreen) => void;
}

/**
 * Landing / marketing page.
 *
 * TODO: build the responsive nav bar, hero, features grid, "how it works",
 * final CTA, and footer here. See TASK.md.
 */
export default function LandingScreen({ onNavigate }: Props) {
  return (
    <View>
      <Text>LandingScreen</Text>
      {/* Build the landing page here */}
    </View>
  );
}