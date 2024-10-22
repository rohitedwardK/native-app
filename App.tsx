import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './src/firebase/firebase'; // Importing firebase.tsx for initialization
import LoginScreen from './src/screens/LoginScreen';
import AdminScreen from './src/screens/AdminScreen';
import AppNavigator from './src/navigation/appNavigation';
import AuthService from './src/auth/AuthService';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      
      // Check if user is logged in and fetch the user's role
      const user = await AuthService.getCurrentUser();
      if (user) {
        const role = await AuthService.getUserRole(user.uid); // Fetch the user role from your service
        setIsAdmin(role === 'admin');
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);
  
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="LoginIn"
    //    screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="LoginIn" component={LoginScreen} />
    //     <Stack.Screen name="AdminScreen" component={AdminScreen} />
    //     <Stack.Screen name="Main" component={AppNavigator} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      {user ? (
        isAdmin ? <AdminTabs /> : <UserTabs /> // Render admin or user tabs based on role
      ) : (
        <LoginScreen /> // If not logged in, show the login screen
      )}
    </NavigationContainer>
  );
};

export default App;