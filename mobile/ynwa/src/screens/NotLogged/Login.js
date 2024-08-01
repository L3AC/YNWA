import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import { SERVER } from '../../contexts/Network';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const Login = () => {
  const { setIsLoggedIn } = useAuth(); // Hook para manejar el estado de autenticación
  const { setIdUsuario } = useUser(); // Hook para manejar el ID del usuario
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
  const [error, setError] = useState(''); // Estado para almacenar errores
  const navigation = useNavigation(); // Hook para manejar la navegación

  // Hook para cargar las fuentes personalizadas
  const [fontsLoaded] = useFonts({
    QuickSand: require("../../../assets/fonts/Quicksand-Regular.ttf"),
    QuickSandBold: require("../../../assets/fonts/Quicksand-Bold.ttf"),
  });

  // Función para manejar el evento de inicio de sesión
  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('usu', username);
      formData.append('clave', password);

      const response = await fetch(`${SERVER}services/public/cliente.php?action=logIn`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.status) {
        Alert.alert('Correcto', data.message); // Muestra un mensaje de éxito
        setIsLoggedIn(true); // Actualiza el estado de autenticación
        setIdUsuario(response.dataset); // Guarda el ID del usuario
        navigation.navigate('Main'); // Navega a la pantalla principal
      } else {
        console.log(data);
        Alert.alert('Error sesión', data.error); // Muestra un mensaje de error
      }
    } catch (error) {
      console.error('Error :', error);
      setError('Error'); // Actualiza el estado de error
    }
  };

  // Si las fuentes no están cargadas, retorna null para no renderizar nada
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../../img/bg.png')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Inicio de sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#000"
            onChangeText={setUsername}
            value={username}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Contraseña"
              placeholderTextColor="#000"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-slash' : 'eye'} type="font-awesome" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity onPress={() => navigation.navigate('VerifUs')}>
            <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUp}>¿No tienes una cuenta?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: 'QuickSandBold',
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '80%',
    paddingVertical: 10,
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    fontFamily: 'QuickSand',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 40, // add space for the eye icon
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: '30%',
    transform: [{ translateY: -10 }],
  },
  button: {
    width: '80%',
    paddingVertical: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'QuickSandBold',
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 20,
    color: '#000',
    fontFamily: 'QuickSand',
    fontSize: 16
  },
  signUp: {
    marginTop: 20,
    color: '#000',
    fontFamily: 'QuickSand',
    fontSize: 16
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'QuickSand',
  },
});

export default Login;
