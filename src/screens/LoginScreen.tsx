// loginScreen.tsx
import React, { useState } from 'react';
import { View, Platform, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithPopup } from 'firebase/auth'; // Import Firebase auth methods
import { firebaseConfig } from '../firebase/firebase';
import { fetchUsers } from '../firebase/firebaseService';
import { signInAndFetchUserData } from '../services/loginService';
import AuthService from '../auth/AuthService';
import { useNavigation } from '@react-navigation/native';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: firebaseConfig.apiKey, // Make sure this is the correct web client ID
});

const LoginScreen = () => {

  const navigation = useNavigation<any>(); // Access navigation
  const [loadingScreen, setLoadingScreen] = useState(false);

  const onGoogleButtonPress = async () => {
    const auth = getAuth();
    let user = null;
    if (Platform.OS === 'web') {
      // Web-based Google Sign-In using Firebase Auth
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        user = result.user;
        console.log("Signed in with Google on Web", user);
        AuthService.isLoggedIn(true);
        setLoadingScreen(true);
        let userInfo = signInAndFetchUserData(user);
        userInfo.then((info) => {
          console.log('role', info);
          if (info.role === 'admin') {
            setLoadingScreen(false);
            navigation.replace('Admin Dashboard'); // Redirect to Admin Screen
          } else {
            setLoadingScreen(false);
            navigation.replace('User Dashboard'); // Redirect to User Dashboard
          }
          // if (info.role === 'admin') {
          //   setLoadingScreen(false);
          //   navigation.replace('AdminScreen'); // Redirect to Admin Screen if the user is an admin
          // } else {
          //   setLoadingScreen(false);
          //   navigation.replace('Main'); // Redirect to Home Screen for regular users
          // }
        })
        // Call the function to get schema
      } catch (error) {
        console.error("Web Google Sign-In error: ", error);
      }
    } else {
      // Mobile Google Sign-In using React Native Google Sign-In
      try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();

      // Log the response to see its structure
      console.log(response);

      // Access the idToken from the response
      const idToken = response.idToken;
        const googleCredential = GoogleAuthProvider.credential(idToken);
        const result = await signInWithCredential(auth, googleCredential);
        user = result.user;
        console.log("Signed in with Google on Mobile", user);
        
      } catch (error) {
        console.error("Mobile Google Sign-In error: ", error);
      }
    }

    // fetchUserDetails(user);
    // adminRedirection(user);
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#33404F'}}>
      <Text style={styles.headerText}> PROFITCAP </Text> {/* Welcome note */}
      <View style={styles.container}>
        {loadingScreen ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.successText}>Logged In Successfully!!</Text>
            <Text style={styles.loadingText}>Preparing Dashboard...</Text>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <Pressable style={styles.button}  onPress={onGoogleButtonPress}>
            <Image
                source={require('../../assets/google-logo.png')} // Update with your Google logo path
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: 'white', // Light text
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: '20%'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Google's red color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 8,
  },
  buttonTextContainer: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#111',
    fontSize: 18,
    fontWeight: '600'
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff'
  },
  successText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#fff'
  },
});

export default LoginScreen;

