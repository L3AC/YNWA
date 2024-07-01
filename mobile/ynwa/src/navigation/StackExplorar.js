import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Explorar from '../screens/Logged/Explorar';
import StackCart from './StackCart';

const Stack = createStackNavigator();

const StackHistorial = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Explorar" component={Explorar} options={{ headerShown: false }} />
      <Stack.Screen name="StackCart" component={StackCart} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
};

export default StackHistorial;