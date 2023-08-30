import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (email: string, password: string) => {
  try {
    const userRegister = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log('userRegister', userRegister);
  } catch (error) {
    console.error('Registration error:', error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    console.log('======', userCredential);
    await AsyncStorage.setItem('userId', user.uid);
  } catch (error) {
    return error;
  }
};
