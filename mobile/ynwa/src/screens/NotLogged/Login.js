import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import { SERVER } from '../../contexts/Network';
import { useFonts } from 'expo-font';

const Login = ({ navigation }) => {
  const { setIsLoggedIn } = useAuth();
  const { setUsuario } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [fontsLoaded] = useFonts({
    QuickSand: require("../../../assets/fonts/Quicksand-Regular.ttf"),
    QuickSandBold: require("../../../assets/fonts/Quicksand-Bold.ttf"),
  });

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('usu', username);
      formData.append('clave', password);

      const response = await fetch(`${SERVER}services/public/cliente.php?action=logInM&app=j`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const text = await response.text();
      const responseData = JSON.parse(text);
      if (response.ok) {
        if (responseData.status === 1) {
          setIsLoggedIn(true);
          setUsuario(responseData.dataset);
          navigation.navigate('Home');
        } else {
          Alert.alert('Credenciales inválidas');
        }
      } else {
        Alert.alert('Login failed', 'Invalid username or password');
      }

    } catch (error) {
      console.error('Error :', error);
      setError('Error');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Inicio de Sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
    paddingTop: 195,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'QuickSandBold',
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    width: 190,
    paddingVertical: 15,
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'QuickSand',
  },
  button: {
    width: 190,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'QuickSand',
  },
});

export default Login;
