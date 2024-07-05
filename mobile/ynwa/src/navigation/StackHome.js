import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Logged/Home';
import Cart from './StackCart';
import Modelo from '../screens/Logged/Modelo'; 
import Comentarios from '../screens/Logged/Comentarios';

const Stack = createStackNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Modelo" component={Modelo} options={{ headerShown: false }} /> 
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} /> 
      <Stack.Screen name="Comentarios" component={Comentarios} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
};

export default StackHome;