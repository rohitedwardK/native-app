import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Card, Button, Modal, Portal, Provider, TextInput } from 'react-native-paper';
import SubsPlans from '../components/SubsPlans';

// Import the background image from the assets folder
const backgroundImage = require('../../assets/app-bg-grey.png');

export default function InvestScreen() {

  return (
      <ImageBackground
      source={backgroundImage} // Use image from assets
      style={styles.backgroundImage} // Apply only valid styles here
      resizeMode="cover" // Use resizeMode directly on ImageBackground
      >
        <View style={styles.container}>
          <Text style={styles.title}>Choose a Subscription Plan</Text>
        </View>
        <SubsPlans></SubsPlans>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Ensures the image fills the screen
    width: '100%', // Width matches viewport
    height: '100%', // Height matches viewport
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 20,
    textAlign: 'center',
    color: '#fff'
  },
  scrollView: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    elevation: 4,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
});
