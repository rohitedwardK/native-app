// src/components/CustomHeader.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function CustomHeader() {

  const navigation = useNavigation<any>();
  
  return (
    <View style={styles.headerContainer}>
      {/* Logo on the left */}
      {/* <Image
        source={require('../assets/logo.png')} // Your logo image path
        style={styles.logo}
      /> */}
      <Text style={styles.headerText}> PROFITCAP </Text> {/* Welcome note */}
      
      {/* Profile pic on the right */}
      <Pressable onPress={() => navigation.navigate('Profile Details')}>
        <Image
          source={require('../../assets/profile-pic.png')} // Your profile picture image path
          style={styles.profilePic}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: '#33404F'
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  headerText: {
    color: 'white', // Light text
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
