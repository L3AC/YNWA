import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import Ionicons from 'react-native-vector-icons/Ionicons'; // Iconos de Ionicons
import { SERVER } from '../../../contexts/Network';
import Header from '../../../components/containers/Header';
import InputLogin from '../../../components/inputs/InputLogin';
import Confirm from '../../../components/buttons/Confirm';

const NuevaClave = () => {
  const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas
  // Estados para almacenar las contraseñas actual, nueva y de confirmación
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Estados para manejar la visibilidad de las contraseñas
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changeP = async () => {
    try {
      // Se crea un objeto FormData con las contraseñas
      const formData = new FormData();
      formData.append('claveNueva', newPassword);
      formData.append('confirmarClave', confirmPassword);
      // Se realiza una solicitud POST al servidor para cambiar la contraseña
      const response = await fetch(`${SERVER}services/public/cliente.php?action=changePassword`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      // Si la respuesta es exitosa, se muestra un mensaje y se navega a la pantalla de cuenta
      if (data.status) {
        Alert.alert(data.message);
        navigation.navigate('Login');
      } else {
        // Si hay un error, se muestra el mensaje de error
        console.log(data);
        Alert.alert(data.error);
      }
    } catch (error) {
      console.error('Error :', error);
      Alert.alert('Error', 'Error al registrar');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Header onPress={() => navigation.goBack()} titulo={'Recuperación'} />
      <View style={styles.container}>
        {/* Título de la pantalla de recuperación */}
        <Text style={styles.title}>Cambio clave</Text>
        {/* Imagen alusiva a la pantalla nueva contraseña */}
        <Ionicons style={styles.icono} name="key" size={120} color="black" />

        {/* Input para escribir su nueva contraseña (1) */}
        <Text style={styles.text}></Text>
        <InputLogin
          placeHolder='Nueva clave'
          value={newPassword}
          onChangeText={setNewPassword}
          clave={showNewPassword}
          isContra={true}
          setIsContra={setShowNewPassword}
        />

        {/* Input para escribir su nueva contraseña (2) */}
        <Text style={styles.text}></Text>
        <InputLogin
          placeHolder='Repita la clave'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          clave={showConfirmPassword}
          isContra={true}
          setIsContra={setShowConfirmPassword}
        />
        <Text style={styles.text}></Text>
        {/* Contenedor para alinear solo el botón al centro de la pantalla */}
        <Confirm onPress={changeP} tittle={'Confirmar'}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 30,
    backgroundColor: '#cdc4a3', // Color de fondo
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icono: { // estilo para el icono del escudo
    textAlign: 'center',
    marginTop: 40,
  },
  input: {
    flex: 1,
    height: 60,
    borderBottomColor: 'black',
    paddingHorizontal: 10,
    fontSize: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: 170,
    backgroundColor: '#2F2C2C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#B3B3B3',
    fontSize: 18,
  },
  containerButton: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NuevaClave;
