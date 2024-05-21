import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native'; // Asegúrate de que Text esté importado
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import { SERVER } from '../../contexts/Network';

const Login = ({ navigation }) => {
  const { setIsLoggedIn } = useAuth();
  const { setUsuario } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
    const handleLogin = async () => {
      try {
        const formData = new FormData();
        formData.append('usu', username);
        formData.append('clave', password);
  
        const response = await fetch(`${SERVER}services/public/cliente.php?action=logIn&app=j`, {
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
            setUsuario(username);
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

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
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
  },
});

export default Login;
