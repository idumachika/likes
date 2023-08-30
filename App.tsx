/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore'; // Import other Firebase services as needed
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import AppNavigator from './src/navigators/AppNavigators';
import TweetList from './src/screens/tweetList'

const firebaseConfig = {
  apiKey: 'AIzaSyAZ9lJ8UT_DQfBjFgD_CBjLXi-FUJAXWo0',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'twitterlike-fdefaD',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: '1:342744300286:android:fdd68485aab7e1e2c383af',
};

firebase.initializeApp(firebaseConfig);



function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
