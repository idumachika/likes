import {FirebaseApp, getApps, initializeApp} from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: 'AIzaSyAZ9lJ8UT_DQfBjFgD_CBjLXi-FUJAXWo0',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'twitterlike-fdefaD',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: '1:342744300286:android:fdd68485aab7e1e2c383af',
};

let firebaseApp: FirebaseApp | null = null;;

if (!getApps.length) {
  firebaseApp = initializeApp(firebaseConfig);
}

const fireStore = getFirestore(firebaseApp);
 const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);


export {fireStore, auth, storage};
