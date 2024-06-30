import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { UserProvider } from './src/contexts/UserContext';
import StackMain from './src/navigation/StackMain';
import StackAuth from './src/navigation/StackAuth';
import { SERVER } from './src/contexts/Network';
import AnimatedSplashScreen from './src/navigation/AnimatedSplashScreen'; // Asegúrate de que la ruta sea correcta

const Stack = createStackNavigator();

const App = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [error, setError] = useState(null);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const getSession = async () => {
    try {
      const response = await fetch(`${SERVER}services/public/cliente.php?action=getUser`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.status) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error');
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const handleAnimationEnd = () => {
    setIsSplashVisible(false);
  };

  if (isSplashVisible) {
    return <AnimatedSplashScreen onAnimationEnd={handleAnimationEnd} />;
  }

  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="Main"
              component={StackMain}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Auth"
              component={StackAuth}
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
