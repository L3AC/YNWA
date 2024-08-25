import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { UserProvider } from './src/contexts/UserContext';
import StackMain from './src/navigation/StackMain';
import StackAuth from './src/navigation/StackAuth';
import { SERVER } from './src/contexts/Network';
import AnimatedSplashScreen from './src/navigation/AnimatedSplashScreen'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';
import { enableScreens } from 'react-native-screens';
enableScreens();


const Stack = createStackNavigator();

const App = () => {
  // Uso del hook useAuth para obtener el estado de autenticación y la función para actualizarlo
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Definición de un estado local para manejar posibles errores
  const [error, setError] = useState(null);

  // Definición de un estado local para controlar la visibilidad de la pantalla de splash
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const getSession = async () => {
      try {
          const response = await axios.post(`${SERVER}services/public/cliente.php?action=getUser`);
          const data = response.data;
  
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

  // useEffect para llamar a getSession cuando el componente se monta
  useEffect(() => {
    getSession();
  }, []);

  // Función que se llama cuando termina la animación de splash
  const handleAnimationEnd = () => {
    setIsSplashVisible(false);
  };

  // Si la pantalla de splash está visible, se muestra el componente AnimatedSplashScreen
  if (isSplashVisible) {
    return <AnimatedSplashScreen onAnimationEnd={handleAnimationEnd} />;
  }

  // Si la pantalla de splash no está visible, se muestra la navegación principal
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator>
          {isLoggedIn ? (
            // Si el usuario está autenticado, se muestra la pantalla principal
            <Stack.Screen
              name="Main"
              component={StackMain}
              options={{ headerShown: false }}
            />
          ) : (
            // Si el usuario no está autenticado, se muestra la pantalla de autenticación
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

// Componente envoltorio que provee el contexto de autenticación a la aplicación
const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};


export default AppWrapper;
