import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cuenta from '../screens/Logged/Cuenta';
import CambioClave from '../screens/Logged/CambioClave';
import Nosotros from '../screens/Logged/Nosotros';
import Login from '../screens/NotLogged/Login';
import Perfil from '../screens/Logged/Perfil';
import Historial from '../screens/Logged/Historial';
import DetallePedido from '../screens/Logged/DetallePedido';

const Stack = createStackNavigator();

const StackCuenta = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }} />
      <Stack.Screen name="CambioClave" component={CambioClave} options={{ headerShown: false }} />
      <Stack.Screen name="Nosotros" component={Nosotros} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      <Stack.Screen name="Historial" component={Historial} options={{ headerShown: false }} />
      <Stack.Screen name="DetallePedido" component={DetallePedido} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackCuenta;