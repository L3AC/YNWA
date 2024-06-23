import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity ,Alert} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { setIsLoggedIn } = useAuth(); 

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const logOut = async () => {
    Alert.alert(
      "Confirmar",
      "¿Estás seguro de cerrar las sesión?",
      [
        {
          text: "Cancelar",
          //onPress: () => console.log("Eliminación cancelada"),
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              //utilizar la direccion IP del servidor y no localhost
              const response = await fetch(`${SERVER}services/public/cliente.php?action=logOut`, {
                method: 'POST'
              });
              
              const data = await response.json();
              if (data.status) {
                Alert.alert(data.message); // Muestra una alerta con el mensaje de éxito
                setIsLoggedIn(false); // Actualiza el estado de autenticación
                navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
              } else {
                console.log(data);
                Alert.alert('Error sesion', data.error); // Muestra una alerta con el mensaje de error
              }
            } catch (error) {
              console.error(error, "Error en el catch"); // Registra el error en la consola
              Alert.alert('Error', 'Ocurrió un error al cerrar sesión'); // Muestra una alerta en caso de error
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Cuenta</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
          <FontAwesome5 name="user-circle" size={40} color="white" />
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button } onPress={() => navigation.navigate('CambioClave')}>
          <FontAwesome5 name="lock" size={40} color="white" />
          <Text style={styles.buttonText}>Clave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Historial')}>
          <FontAwesome5 name="history" size={40} color="white" />
          <Text style={styles.buttonText}>Historial de pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="users" size={40} color="white" />
          <Text style={styles.buttonText}>Sobre nosotros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => logOut()}>
          <FontAwesome5 name="sign-out-alt" size={40} color="white" />
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#cdc4a3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3e3e3e',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3e3e3e',
    borderRadius: 15,
    width: '80%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
  },
});