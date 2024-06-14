import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Explorar from '../screens/Logged/Explorar';

const Stack = createStackNavigator();

const StackHistorial = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Explorar" component={Explorar} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackHistorial;