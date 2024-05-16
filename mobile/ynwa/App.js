import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cuenta" component={Cuenta} />
      <Tab.Screen name="Explorar" component={Explorar} />
      <Tab.Screen name="Carrito" component={Carrito} />
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;
