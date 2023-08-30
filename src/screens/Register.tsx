import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {registerUser} from '../services/firebaseService';
import Button from '../components/CustomButton';
import {colors} from '../util/theme';
import Input from '../components/Input';
import {z} from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

interface RegisterProps {
  navigation: any;
  handleLogin: (todo: any) => void;
}
const schema = z.object({
  email: z
    .string({
      required_error: 'Email address is required',
    })
    .email('Invalid email address')
    .trim(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters')
    .trim(),
});

export type RegisterSchema = z.infer<typeof schema>;

const Register: React.FC<RegisterProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error message

  const {control, handleSubmit} = useForm<RegisterSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const handleRegister: SubmitHandler<RegisterSchema> = async data => {
    const {email, password} = data;
    if (email && password) {
      try {
        setIsLoading(true);
        const response = await registerUser(email, password);
        Alert.alert('Registration is successfull');
        // You can navigate to another screen or display a success message
      } catch (error) {
        Alert.alert('Registration is Failed');

        // Display an error message to the user
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    }
  };

  return (
    <View style={styles.registerContainer}>
      <View style={styles.formContainer}>
        <Input
          control={control}
          name="email"
          label="Email"
          placeholder={'Email'}
        />

        <Input
          control={control}
          name="password"
          label="Password"
          placeholder={'Password'}
        />
        <Button
          title={
            isLoading ? <ActivityIndicator color={colors.black} /> : 'Sign up'
          }
          backgroundColor={'#0074D9'}
          textColor={'#fff'}
          onPress={handleSubmit(handleRegister)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fffff',
  },
  formContainer: {
    marginTop: 38,
    gap: 20,
  },
});

export default Register;
