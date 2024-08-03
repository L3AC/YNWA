import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Input from '../../components/inputs/Input';
import { SERVER } from '../../contexts/Network';
import Header from '../../components/containers/Header';
import Confirm from '../../components/buttons/Confirm';
import InputLogin from '../../components/inputs/InputLogin'; // Llama a la plantilla para input de claves


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function SignUp() {
  // Estado para controlar la actualización de la interfaz
  const [refreshing, setRefreshing] = useState(false);
  // Estados para almacenar los datos del formulario de registro
  const [nombreCliente, setNombreCliente] = useState('');
  const [apellidoCliente, setApellidoCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [usuarioCliente, setUsuarioCliente] = useState('');
  const [claveCliente, setClaveCliente] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [direccionCliente, setDireccionCliente] = useState('');
  // Estados para controlar la visibilidad de las contraseñas
  const [isContra, setIsContra] = useState(true);
  const [isContra2, setIsContra2] = useState(true);
  // Estado para almacenar la ubicación actual del usuario
  const [location, setLocation] = useState({
    latitude: 13.69294,  // Latitud de San Salvador, El Salvador
    longitude: -89.21819, // Longitud de San Salvador, El Salvador
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const navigation = useNavigation(); // Hook para manejar la navegación
  const mapRef = React.useRef(null); // Referencia al mapa
  // Función para refrescar la interfaz
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  // Función para manejar el registro del usuario
  const signin = async () => {
    try {
      const formData = new FormData();
      formData.append('nombreCliente', nombreCliente);
      formData.append('apellidoCliente', apellidoCliente);
      formData.append('correoCliente', correoCliente);
      formData.append('direccionCliente', direccionCliente);
      formData.append('usuarioCliente', usuarioCliente);
      formData.append('claveCliente', claveCliente);
      formData.append('confirmarClave', confirmarClave);
      formData.append('lat', location.latitude);
      formData.append('lon', location.longitude);

      const response = await fetch(`${SERVER}services/public/cliente.php?action=signUp`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert(data.message); // Muestra un mensaje de éxito
        navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión
      } else {
        console.log(data);
        Alert.alert(data.error); // Muestra un mensaje de error
      }
    } catch (error) {
      console.error('Error :', error);
      Alert.alert('Error', 'Error al registrar'); // Muestra un mensaje de error
    }
  };
  // Función para manejar el evento de presionar el mapa
  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.01,  // Reducir para acercar el mapa
      longitudeDelta: 0.01, // Reducir para acercar el mapa
    };
    setLocation(newRegion);

    mapRef.current.animateToRegion(newRegion, 500);  // Anima el mapa al nuevo lugar

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
      const data = await response.json();
      if (data && data.display_name) {
        const formattedAddress = data.display_name;
        setDireccionCliente(formattedAddress);
        console.log(location.latitude.toString(), location.longitude.toString());
      } else {
        setDireccionCliente('Dirección no disponible');
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      setDireccionCliente('Error al obtener la dirección');
    }
  };
  // Función para manejar la búsqueda de direcciones
  const handleSearchAddress = async (text) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&addressdetails=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newRegion = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.01,  // Reducir para acercar el mapa
          longitudeDelta: 0.01, // Reducir para acercar el mapa
        };
        setLocation(newRegion);
        mapRef.current.animateToRegion(newRegion, 500);  // Anima el mapa al nuevo lugar
      }
    } catch (error) {
      console.error('Error al buscar la dirección:', error);
    }
  };
  // Función para manejar el cambio en el campo de dirección
  const handleAddressChange = (text) => {
    setDireccionCliente(text);
  };
  // Función para limpiar la dirección
  const handleClearAddress = () => {
    setDireccionCliente('');
    const newRegion = {
      latitude: 13.69294,  // Latitud de San Salvador, El Salvador
      longitude: -89.21819, // Longitud de San Salvador, El Salvador
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setLocation(newRegion);
    mapRef.current.animateToRegion(newRegion, 500);  // Anima el mapa al lugar por defecto
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header onPress={() => navigation.goBack()} titulo={'Registro'} />
      <View style={styles.form}>
        <Input placeHolder='Nombre' value={nombreCliente} onChangeText={setNombreCliente} />
        <Input placeHolder='Apellido' value={apellidoCliente} onChangeText={setApellidoCliente} />
        <Input placeHolder='Correo' value={correoCliente} onChangeText={setCorreoCliente} keyboardType="email-address" />
        <Input placeHolder='Usuario' value={usuarioCliente} onChangeText={setUsuarioCliente} />

        <InputLogin
          placeHolder='Contraseña'
          value={claveCliente}
          onChangeText={setClaveCliente}
          clave={isContra}
          isContra={true}
          setIsContra={setIsContra}
        />
        <InputLogin
          placeHolder='Confirmar contraseña'
          value={confirmarClave}
          onChangeText={setConfirmarClave}
          clave={isContra2}
          isContra={true}
          setIsContra={setIsContra2}
        />
        <Text style={styles.label}>Dirección</Text>
        <View style={styles.addressContainer}>
          <TextInput
            style={[styles.input2, styles.multilineInput]}
            value={direccionCliente}
            onChangeText={handleAddressChange}
            multiline={true}
          />
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAddress}>
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </TouchableOpacity>
        </View>

        <MapView
          ref={mapRef}
          style={styles.map}
          region={location}
          onPress={handleMapPress}
        >
          <Marker coordinate={location} />
        </MapView>
      </View>
      <Confirm onPress={signin} tittle={'Confirmar'}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#cdc4a3',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 45,
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'QuickSand',
  },
  form: {
    marginBottom: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    color: '#3e3e3e',
    marginBottom: 5,
    marginTop:10,
    fontFamily: 'QuickSand',
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '95%',
    paddingVertical: 10,
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    fontFamily: 'QuickSand',
  },
  input2: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '70%',
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
    right: 20,
    width: 40,
    top: '30%',
    transform: [{ translateY: -10 }],
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  multilineInput: {
    height: 100, // Para hacer el input más grande y permitir múltiples líneas
    textAlignVertical: 'top', // Asegura que el texto comience desde la parte superior del input
  },
  clearButton: {
    backgroundColor: '#0000',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  clearButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'QuickSand',
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2F2C2C',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'QuickSand',
  },
  flecha: {
    fontSize: 30
  }
});
