import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {loginUser} from '../services/firebaseService';
import Button from '../components/CustomButton';
import {z} from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '../components/Input';
import {colors} from '../util/theme';

interface LoginProps {
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

export type LoginSchema = z.infer<typeof schema>;

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error message

  const {control, handleSubmit} = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const handleLogin: SubmitHandler<LoginSchema> = async data => {
    const {email, password} = data;

    if (email && password) {
      try {
        setIsLoading(true);
        const loginError = await loginUser(email, password);
        if (!loginError) {
          navigation.navigate('TweetList');
        } else {
          setError('Login failed. Please check your credentials.');
        }
      } catch (error) {

      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.loginContainer}>
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
            isLoading ? <ActivityIndicator color={colors.white} /> : 'Sign in'
          }
          backgroundColor={'#0074D9'}
          textColor={'#fff'}
          onPress={handleSubmit(handleLogin)}
        />
      </View>

      {error && <Text style={{color: 'red'}}>{error}</Text>}

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={{color: colors.primary}}>Sign up</Text>
        </Pressable>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginTop: 38,
    gap: 20,
  },
  footerText: {
    textAlign: 'center',
    // fontFamily: fonts.dmsans_bold,
    fontSize: 15,
    lineHeight: 20,
    marginTop: 'auto',
    paddingBottom: 40,
    color: colors.soft_neutral,
  },
});

export default Login;
