import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import InvestScreen from './InvestScreen';
import SubsPlans from '../components/SubsPlans';
// Import the background image from the assets folder
const backgroundImage = require('../../assets/app-bg-grey.png');

export default function HomeScreen() {
  const userName = 'ABC'; // Replace with dynamic user name if available
  const investedAmount = '5,50,000'; // Replace with dynamic invested value
  const currentValue = '6,50,000'; // Replace with dynamic current value
  const returnPercentage = ((parseInt(currentValue) - parseInt(investedAmount)) / parseInt(investedAmount)) * 100;

  return (
    <ImageBackground
      source={backgroundImage} // Use image from assets
      style={styles.backgroundImage} // Apply only valid styles here
      resizeMode="cover" // Use resizeMode directly on ImageBackground
      >
    <View style={styles.container}>
      {/* Welcome and Greeting Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Hello, {userName}</Text>
        <Text style={styles.greetingText}>Good Evening</Text>
      </View>

      {/* Invested & Current Value Section */}
      <View style={styles.investedValueSection}>
        <View style={styles.leftContainer}>
          <Text style={styles.investedValue}>₹{investedAmount.toLocaleString()}</Text>
          <Text style={styles.metaLabel}>Invested</Text>
        </View>

        <View style={styles.rightContainer}>
          <Text style={styles.currentValue}>₹{currentValue.toLocaleString()}</Text>
          <View style={styles.returnLabel}>
            <Text style={styles.metaLabel}>Returns </Text>
            <Text style={styles.returns}>({returnPercentage.toFixed(2)}%) </Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <SubsPlans></SubsPlans>
      </View>
    </View>
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
    flex: 1,
    // backgroundColor: '#f5f5f5',
  },
  wrapper: { // Dark background
    backgroundColor: '#fff',
    height: '100%',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  contentWrapper:{
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 100
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  investedValueSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#fff',
    padding: 20,
    // borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,
    marginBottom: 30,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  returnLabel: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaLabel: {
    fontSize: 16,
    color: '#fff',
  },
  investedValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  currentLabel: {
    fontSize: 16,
    color: '#fff',
  },
  currentValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  returns: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60', // Green for positive returns
    marginTop: 5,
  },
});
