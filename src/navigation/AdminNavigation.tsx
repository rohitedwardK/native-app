import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tab1Screen from '../screens/admin/Tab1';
import Tab2Screen from '../screens/admin/Tab2';
import AdminScreen from '../screens/AdminScreen';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
  return (
    <Tab.Navigator screenOptions={() => ({
      tabBarActiveTintColor: 'green', // Active icon color (Green)
      tabBarInactiveTintColor: '#b0b0b0', // Inactive icon color (Light gray)
      tabBarStyle: {
        backgroundColor: '#33404F', // Dark background for tab bar
      },
      headerStyle: {
        backgroundColor: '#33404F', // Dark background for header
      },
      headerTintColor: 'white', // Light color for text in header
    }
     
    )}>
      <Tab.Screen name="Admin Screen" component={AdminScreen} />
      <Tab.Screen name="Tab2" component={Tab1Screen} />
      <Tab.Screen name="Tab3" component={Tab2Screen} />
    </Tab.Navigator>
  );
};

export default AdminNavigator;
