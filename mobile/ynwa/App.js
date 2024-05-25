import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { UserProvider } from './src/contexts/UserContext';
import Login from './src/screens/NotLogged/Login';
import Home from './src/screens/Logged/Home';
import Cuenta from './src/screens/Logged/Cuenta';
//import Explorar from './src/screens/Logged/Explorar';
import Carrito from './src/screens/Logged/Carrito';
//import Modelo from './src/screens/Logged/Modelo';
import ExplorarStack from './src/navigation/Home/Navigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="ExplorarStack" component={ExplorarStack} options={{ headerShown: false }}/>
      <Tab.Screen name="Carrito" component={Carrito} options={{ headerShown: false }}/>
      <Tab.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }}/>
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
      <UserProvider>
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
      </UserProvider>
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
