import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function SignUp() {
  const [refreshing, setRefreshing] = useState(false);
  const [nombreCliente, setNombreCliente] = useState('');
  const [apellidoCliente, setApellidoCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [usuarioCliente, setUsuarioCliente] = useState('');
  const [claveCliente, setClaveCliente] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [direccionCliente, setDireccionCliente] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [location, setLocation] = useState({
    latitude: 13.69294,  // Latitud de San Salvador, El Salvador
    longitude: -89.21819, // Longitud de San Salvador, El Salvador
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const navigation = useNavigation();
  const mapRef = React.useRef(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
      formData.append('latitud', location.latitude);
      formData.append('longitud', location.longitude);

      const response = await fetch(`${SERVER}services/public/cliente.php?action=signUp`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert(data.message);
        navigation.navigate('Login');
      } else {
        console.log(data);
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.error('Error :', error);
      Alert.alert('Error', 'Error al registrar');
    }
  };

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
      } else {
        setDireccionCliente('Dirección no disponible');
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      setDireccionCliente('Error al obtener la dirección');
    }
  };

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

  const handleAddressChange = (text) => {
    setDireccionCliente(text);
  };

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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" type="font-awesome" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Registro</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput 
          style={styles.input} 
          value={nombreCliente}
          onChangeText={setNombreCliente}
        />

        <Text style={styles.label}>Apellido</Text>
        <TextInput 
          style={styles.input} 
          value={apellidoCliente}
          onChangeText={setApellidoCliente}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput 
          style={styles.input} 
          value={correoCliente}
          onChangeText={setCorreoCliente}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Usuario</Text>
        <TextInput 
          style={styles.input} 
          value={usuarioCliente}
          onChangeText={setUsuarioCliente}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Clave</Text>
        <View style={styles.passwordContainer}>
          <TextInput 
            style={[styles.input, styles.passwordInput]} 
            value={claveCliente}
            onChangeText={setClaveCliente}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} type="font-awesome" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar clave</Text>
        <View style={styles.passwordContainer}>
          <TextInput 
            style={[styles.input, styles.passwordInput]} 
            value={confirmarClave}
            onChangeText={setConfirmarClave}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} type="font-awesome" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Dirección</Text>
        <View style={styles.addressContainer}>
          <TextInput 
            style={styles.input} 
            value={direccionCliente}
            onChangeText={handleAddressChange}
            onSubmitEditing={() => handleSearchAddress(direccionCliente)}
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
      <TouchableOpacity style={styles.button} onPress={signin}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
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
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#3e3e3e',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#3e3e3e',
    paddingVertical: 5,
    marginBottom: 20,
    fontSize: 16,
    color: '#3e3e3e',
    flex: 1,
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
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3e3e3e',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
