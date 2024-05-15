import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/auth/AuthContext';
import Login from './src/screens/NotLogged/Login';
import Home from './src/screens/Logged/Home';
import Cuenta from './src/screens/Logged/Cuenta';
import Explorar from './src/screens/Logged/Explorar';
import Carrito from './src/screens/Logged/Carrito';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Explorar" component={Explorar} />
          <Stack.Screen name="Carrito" component={Carrito} />
          <Stack.Screen name="Cuenta" component={Cuenta} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};
 
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Main" component={MainStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
