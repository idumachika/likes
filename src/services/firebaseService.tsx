import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (email: string, password: string) => {
  try {
    const userRegister = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
  } catch (error) {
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    await AsyncStorage.setItem('userId', user.uid);
  } catch (error) {
    return error;
  }
};
