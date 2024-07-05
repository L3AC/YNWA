import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
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
      "¿Estás seguro de cerrar la sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const response = await fetch(`${SERVER}services/public/cliente.php?action=logOut`, {
                method: 'POST'
              });

              const data = await response.json();
              if (data.status) {
                Alert.alert(data.message);
                setIsLoggedIn(false);
                navigation.navigate('Login');
              } else {
                console.log(data);
                Alert.alert('Error sesión', data.error);
              }
            } catch (error) {
              console.error(error, "Error en el catch");
              Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const openNosotros = () => {
    const webUrl = 'https://instagram.com/rodrigoalvaa';
    Linking.canOpenURL(webUrl).then(supported => {
      if (supported) {
        Linking.openURL(webUrl);
      } else {
        Alert.alert('Facebook no está instalado');
      }
    });
  };

  const openInstagram = () => {
    const appUrl = 'instagram://user?username=rodrigoalvaa';
    const webUrl = 'https://instagram.com/rodrigoalvaa';
    Linking.canOpenURL(appUrl).then(supported => {
      if (supported) {
        Linking.openURL(appUrl);
      } else {
        Linking.openURL(webUrl);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  const openFacebook = () => {
    const appUrl = 'fb://profile/100044249625817'; // Reemplaza con tu ID de perfil de Facebook
    const webUrl = 'https://facebook.com/100044249625817'; // Reemplaza con tu URL de perfil de Facebook
  
    Linking.canOpenURL(appUrl).then(supported => {
      if (supported) {
        Linking.openURL(appUrl);
      } else {
        // Si no es compatible, abrir en el navegador web
        Linking.openURL(webUrl);
      }
    }).catch(err => console.error('An error occurred', err));
  };
  

  const openTwitter = () => {
    const appUrl = 'twitter://user?screen_name=Rodrigo39722933';
    const webUrl = 'https://twitter.com/Rodrigo39722933';
    Linking.canOpenURL(appUrl).then(supported => {
      if (supported) {
        Linking.openURL(appUrl);
      } else {
        Linking.openURL(webUrl);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.contenedor2}>
        <Ionicons name="person-outline" size={80} color="#fff" style={styles.icon} />
        <Text style={styles.title}>{Usu}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
          <View style={styles.row}>
            <FontAwesome5 style={styles.icono2} name="user-tie" size={30} color="white" />
            <Text style={styles.buttonText}>Perfil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CambioClave')}>
          <View style={styles.row}>
            <FontAwesome5 style={styles.icono2} name="user-shield" size={30} color="white" />
            <Text style={styles.buttonText}>Clave</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Historial')}>
          <View style={styles.row}>
            <FontAwesome5 style={styles.icono2} name="calendar-check" size={30} color="white" />
            <Text style={styles.buttonText}>Historial de pedidos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => logOut()}>
          <View style={styles.row}>
            <FontAwesome5 style={styles.icono2} name="sign-out-alt" size={30} color="white" />
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contenedor3}>
        <Text style={styles.cont3}>Contáctanos</Text>
        <View style={styles.row2}>
          <Ionicons name="people-circle-outline" size={40} color="#fff" style={styles.icon3} />
          <TouchableOpacity onPress={openInstagram}>
            <Ionicons name="logo-instagram" size={40} color="#fff" style={styles.icon3} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openFacebook}>
            <Ionicons name="logo-facebook" size={40} color="#fff" style={styles.icon3} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openTwitter}>
            <Ionicons name="logo-twitter" size={40} color="#fff" style={styles.icon3} />
          </TouchableOpacity>
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
    backgroundColor: '#2F2C2C',
    marginTop: 15,
    borderRadius: 20,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 5
  },
  icono2: {
    marginLeft: 10,
  },
  cont3: {
    color: '#fff',
    fontFamily: 'QuickSand',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5
  },
  contenedor2: {
    height: 150,
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#2F2C2C",
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'QuickSand'
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  row2: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 9
  },
  icon3: {
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 7
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#2F2C2C',
    marginTop: 10,
    borderRadius: 20,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10
  },
  button: {
    backgroundColor: '#cdc4a3',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'QuickSand',
    fontWeight: 'bold'
  },
});
