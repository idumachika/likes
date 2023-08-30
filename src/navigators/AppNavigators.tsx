import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TweetList from '../screens/tweetList'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const [userAuthenticated, setUserAuthenticated] = useState('');

    useEffect(() => {
      // Check user's authentication status from AsyncStorage
      const checkAuthStatus = async () => {
        try {
          const isAuthenticated = await AsyncStorage.getItem('userId');
          setUserAuthenticated(isAuthenticated);
        } catch (error) {
          console.error('Error checking auth status:', error);
        }
      };

      checkAuthStatus();
    }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userAuthenticated ? 'TweetList' : 'Login'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TweetList" component={TweetList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
