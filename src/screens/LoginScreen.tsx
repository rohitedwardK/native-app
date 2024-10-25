// loginScreen.tsx
import React, { useState } from 'react';
import { View, Platform, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, getReactNativePersistence, GoogleAuthProvider, initializeAuth, signInWithCredential } from 'firebase/auth';
import { firebaseApp, firebaseConfig } from '../firebase/firebase';
import { signInAndFetchUserData } from '../services/loginService';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: firebaseConfig.apiKey,
});

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [loadingScreen, setLoadingScreen] = useState(false);

  const auth = Platform.OS === 'web' 
    ? getAuth() 
    : initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

  const onGoogleButtonPress = async () => {
    let user = null;

    if (Platform.OS === 'web') {
      // Web-based Google Sign-In
      try {
        const provider = new GoogleAuthProvider();
        // const result = await auth.signInWithPopup(auth, provider);
        // user = result.user;
        // console.log("Signed in with Google on Web", user);
        // await handleUserRedirection(user);
      } catch (error) {
        console.error("Web Google Sign-In error: ", error);
      }
    } else {
      // Mobile Google Sign-In
      try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();
        const idToken = response.data.idToken;
        const googleCredential = GoogleAuthProvider.credential(idToken);
        const result = await signInWithCredential(auth, googleCredential);
        user = result.user;
        console.log("Signed in with Google on Mobile");
        await handleUserRedirection(user);
      } catch (error) {
        console.error("Mobile Google Sign-In error: ", error);
      }
    }
  };

  const handleUserRedirection = async (user: any) => {
    setLoadingScreen(true);
    const userInfo = await signInAndFetchUserData(user);
    if (userInfo.role === 'admin') {
      setLoadingScreen(false);
      navigation.replace('Admin Dashboard');
    } else {
      setLoadingScreen(false);
      navigation.replace('User Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> PROFITCAP </Text>
      <View style={styles.container}>
        {loadingScreen ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.successText}>Logged In Successfully!!</Text>
            <Text style={styles.loadingText}>Preparing Dashboard...</Text>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <Pressable style={styles.button} onPress={onGoogleButtonPress}>
            <Image
              source={require('../../assets/google-logo.png')}
              style={styles.logo}
            />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Sign in with Google</Text>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#33404F' },
  headerText: { color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: '20%' },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 5, elevation: 3 },
  logo: { width: 35, height: 35, marginRight: 8 },
  buttonTextContainer: { alignItems: 'center' },
  buttonText: { color: '#111', fontSize: 18, fontWeight: '600' },
  loadingContainer: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 24, marginBottom: 10, color: '#fff' },
  successText: { fontSize: 24, marginBottom: 10, fontWeight: 'bold', color: '#fff' },
});

export default LoginScreen;
