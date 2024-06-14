import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Logged/Home';
import Cart from '../screens/Logged/Cart';
import Modelo from '../screens/Logged/Modelo'; 

const Stack = createStackNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Modelo" component={Modelo} options={{ headerShown: false }} /> 
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
};

export default StackHome;