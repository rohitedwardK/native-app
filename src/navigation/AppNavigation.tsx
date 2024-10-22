import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNav from './BottomTabNav';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={BottomTabNav} options={{ headerShown: false }} />
      <Stack.Screen name="Profile Details" component={ProfileDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
