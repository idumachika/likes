import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TweetList from '../screens/tweetList'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TweetList" component={TweetList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
