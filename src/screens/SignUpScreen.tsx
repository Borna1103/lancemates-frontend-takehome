import { Text, View } from 'react-native';

interface Props {
  onToLogin: () => void;
  onBack: () => void;
}

/**
 * Sign up screen.
 *
 * TODO: build the name, email, password, and description form here. When the
 * form succeeds, call `onSignUpSuccess` (add it to this component's props and
 * wire it in App.tsx). See TASK.md.
 */
export default function SignUpScreen({ onToLogin, onBack }: Props) {
  return (
    <View>
      <Text>SignUpScreen</Text>
      {/* Build the sign-up form here */}
    </View>
  );
}