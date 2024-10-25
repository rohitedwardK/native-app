// AdminScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AuthService from '../auth/AuthService';
import BottomTabNav from '../navigation/BottomTabNav';

const backgroundImage = require('../../assets/app-bg-grey.png');

const AdminScreen = () => {

    const user = AuthService.getLoggedInUserInfo();
     
  return (
    <ImageBackground
    source={backgroundImage} // Use image from assets
    style={styles.backgroundImage} // Apply only valid styles here
    resizeMode="cover" // Use resizeMode directly on ImageBackground
    >
        <View style={styles.container}>
            {/* Welcome and Greeting Section */}
            
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>Hello, {user.displayName}</Text>
                <Text style={styles.greetingText}>Good Evening</Text>
            </View>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1, // Ensures the image fills the screen
    width: '100%', // Width matches viewport
    height: '100%', // Height matches viewport
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  greetingText: {
    fontSize: 18,
    color: '#fff',
  },
  loadingText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff'
  },
});

export default AdminScreen;
