import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import InvestScreen from '../screens/InvestScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ReferScreen from '../screens/ReferScreen';
import { MaterialIcons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <View style={styles.container}> {/* Set the overall background style */}

      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Apply custom header component to all screens
          header: () => <CustomHeader />, // This replaces the default page title with your custom header
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof MaterialIcons.glyphMap = 'home';

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Investment') {
              iconName = 'trending-up';
            } else if (route.name === 'Rewards') {
              iconName = 'card-giftcard';
            } else if (route.name === 'Refer') {
              iconName = 'share';
            }

            return <MaterialIcons  name={iconName} size={size} color={color} />;

          },
            tabBarActiveTintColor: 'green', // Active icon color (Green)
            tabBarInactiveTintColor: '#b0b0b0', // Inactive icon color (Light gray)
            tabBarStyle: {
              backgroundColor: '#33404F', // Dark background for tab bar
            },
            headerStyle: {
              backgroundColor: '#33404F', // Dark background for header
            },
            headerTintColor: 'white', // Light color for text in header
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Investment" component={InvestScreen} />
        <Tab.Screen name="Rewards" component={RewardsScreen} />
        <Tab.Screen name="Refer" component={ReferScreen} />
      </Tab.Navigator>
    </View>
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
    // backgroundColor: '#121212', // Set the background to dark globally
  },
});