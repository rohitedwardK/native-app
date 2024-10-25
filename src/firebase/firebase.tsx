
import { reactAppConfig } from './environment';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


// Firebase config from environment
export const firebaseConfig = {
  apiKey: reactAppConfig.FIREBASE_API_KEY,
  authDomain: reactAppConfig.FIREBASE_AUTH_DOMAIN,
  projectId: reactAppConfig.FIREBASE_PROJECT_ID,
  storageBucket: reactAppConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: reactAppConfig.FIREBASE_MESSAGING_SENDER_ID,
  appId: reactAppConfig.FIREBASE_APP_ID,
};

// Initialize Firebase App once
const firebaseApp = initializeApp(firebaseConfig);


// Firestore initialization with long polling enabled (if required)
export const database = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});

// Firestore standard instance (can use either `database` or `db`)
export const db = getFirestore(firebaseApp);

// Firebase Storage
export const storage = getStorage(firebaseApp);

// Firebase Auth
export const auth = getAuth(firebaseApp);

// export const auth = initializeAuth(firebaseApp, {
//   persistence: getReactNativePersistence(AsyncStorage), // Ensure persistence using AsyncStorage
// });
// export const auth = initializeAuth(firebaseApp, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(firebaseApp);

// Set persistence
// setPersistence(auth, getReactNativePersistence(AsyncStorage))
//   .then(() => {
//     // Now you can sign in or do other operations
//   })
//   .catch((error) => {
//     console.error("Error setting persistence: ", error);
//   });