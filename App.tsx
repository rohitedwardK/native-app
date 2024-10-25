import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './src/firebase/firebase'; // Importing firebase.tsx for initialization
import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigation';
import AuthService from './src/auth/AuthService';
import AdminNavigator from './src/navigation/AdminNavigation';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      
      // Check if user is logged in and fetch the user's role
      const user = await AuthService.getLoggedInUserInfo();
      if (user) {
        setIsAdmin(user.role === 'admin');
        setIsLoggedIn(true);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
       screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Admin Dashboard" component={AdminNavigator} />
        <Stack.Screen name="User Dashboard" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;