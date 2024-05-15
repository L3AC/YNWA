import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/auth/AuthContext'; // Asegúrate de que la ruta sea correcta
import Login from './src/screens/NotLogged/Login';
import Home from './src/screens/Logged/Home';
import Cuenta from './src/screens/Logged/Cuenta';
import Explorar from './src/screens/Logged/Explorar';
import Carrito from './src/screens/Logged/Carrito';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Explorar" component={Explorar} options={{ headerShown: false }} />
      <Tab.Screen name="Carrito" component={Carrito} options={{ headerShown: false }} />
      <Tab.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const App = () => {
  const { isLoggedIn } = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simula una carga inicial, por ejemplo, desde AsyncStorage o cualquier otra fuente de datos
    setTimeout(() => {
      setIsAppReady(true);
    }, 2000); // Cambia esto según tus necesidades
  }, []);

  if (!isAppReady) {
    return null; // Muestra un componente de carga, splash screen, etc.
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
