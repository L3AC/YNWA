import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';
import Ionicons from 'react-native-vector-icons/Ionicons';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { setIsLoggedIn } = useAuth();
  const { setUser } = useUser();
  const [Usu, setUsu] = useState('');
  const [loading, setLoading] = useState(true);

  const onRefresh = useCallback(() => {
    fetchUser()
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false), fetchUser());
    
  }, []);


  useEffect(() => {
    fetchUser()
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER}services/public/cliente.php?action=getUser`, {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok && data.status === 1) {
        setUsu(data.username)
      } else {
        console.error('Error fetching data:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

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

      <View style={styles.contenedor2}>
        <Ionicons name="person-circle-outline" size={80} color="#000" style={styles.icon} />
        <Text style={styles.title}>{Usu}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
          <View style={styles.row}>
            <FontAwesome5 style={styles.icono2} name="user-circle" size={30} color="black" />
            <Text style={styles.buttonText}>Perfil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CambioClave')}>
          <View style={styles.row}>
            <FontAwesome5 style={styles.icono2} name="lock" size={30} color="black" />
            <Text style={styles.buttonText}>Clave</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Historial')}>
          <View style={styles.row}>
            <FontAwesome5 style={styles.icono2} name="history" size={30} color="black" />
            <Text style={styles.buttonText}>Historial de pedidos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => logOut()}>
          <View style={styles.row}>
            <FontAwesome5 style={styles.icono2} name="sign-out-alt" size={30} color="black" />
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contenedor3}>
        <View style={styles.row2}>
          <Ionicons name="people-circle-outline" size={40} color="#000" style={styles.icon3} />
          <Ionicons name="logo-instagram" size={40} color="#000" style={styles.icon3} />
          <Ionicons name="logo-facebook" size={40} color="#000" style={styles.icon3} />
          <Ionicons name="logo-twitter" size={40} color="#000" style={styles.icon3} />
        </View>
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
  contenedor3: {
    height: 100,
    width: '100%',
    backgroundColor: '#cdc4a3',
    marginTop: 15,
    borderRadius: 20,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    // Elevación para Android
    elevation: 5,
  },
  icon: {
    alignSelf: 'center'
  },
  icono2: {
    marginLeft: 10,
    marginRight: 10
  },
  contenedor2: {
    height: 150,
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#cdc4a3",
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    // Elevación para Android
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    fontFamily: 'QuickSand'
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  row2: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 21
  },
  icon3:{
    margin:7
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#cdc4a3',
    marginTop: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    // Elevación para Android
    elevation: 5,

  },
  button: {
    borderRadius: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    width: '98%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
    marginBottom: 0
  },
  buttonText: {
    color: '#000',
    fontFamily: 'QuickSand',
    marginTop: 5,
    fontSize: 18,
  },
});