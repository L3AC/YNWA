import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Image,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const ChangePasswordScreen = () => {
  // Estados para almacenar las contraseñas actual, nueva y de confirmación
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados para manejar la visibilidad de las contraseñas
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado para manejar la actualización de la pantalla (pull-to-refresh)
  const [refreshing, setRefreshing] = useState(false);

  // Hook para la navegación
  const navigation = useNavigation();

  // Función para manejar la actualización de la pantalla
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simula una espera de 2 segundos antes de finalizar la actualización
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // Función para cambiar la contraseña
  const changeP = async () => {
    try {
      // Se crea un objeto FormData con las contraseñas
      const formData = new FormData();
      formData.append('claveActual', currentPassword);
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
        navigation.navigate('Cuenta');
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
    <ScrollView
      contentContainerStyle={styles.container}
      // Control de actualización de la pantalla (pull-to-refresh)
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Encabezado de la pantalla con un botón para volver y el título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Cambio de contraseña</Text>
      </View>

      <View style={styles.content}>
        {/* Icono para la pantalla de cambio de contraseña */}
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/61/61457.png' }} style={styles.icon} />

        {/* Campo para la contraseña actual */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ingrese su actual contraseña</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              <Icon name={showCurrentPassword ? 'eye' : 'eye-slash'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Campo para la nueva contraseña */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ingrese su nueva contraseña</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Icon name={showNewPassword ? 'eye' : 'eye-slash'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Campo para confirmar la nueva contraseña */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón para confirmar el cambio de contraseña */}
        <TouchableOpacity style={styles.button} onPress={changeP}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d8d3b6',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 50,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    color: '#000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ChangePasswordScreen;
