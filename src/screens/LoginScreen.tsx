import { Text, View } from 'react-native';

interface Props {
  onToSignUp: () => void;
  onBack: () => void;
}

/**
 * Login screen.
 *
 * TODO: build the email + password form here. When the form succeeds, call
 * `onLoginSuccess` (add it to this component's props and wire it in App.tsx).
 * See TASK.md.
 */
export default function LoginScreen({ onToSignUp, onBack }: Props) {
  return (
    <View>
      <Text>LoginScreen</Text>
      {/* Build the login form here */}
    </View>
  );
}