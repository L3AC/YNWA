import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function SignUp() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const signin = async () => {
    try {
      const formData = new FormData();
      formData.append('nombreCliente', );
      formData.append('apellidoCliente', );
      formData.append('correoCliente', );
      formData.append('direccionCliente', );
      formData.append('usuarioCliente', );
      formData.append('claveCliente', );
      formData.append('confirmarClave', );

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
        // Alert the user about the error
        Alert.alert('Error sesion', data.error);
      }

    } catch (error) {
      console.error('Error :', error);
      setError('Error');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()} >
          <Icon name="arrow-left" type="font-awesome" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Historial</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Apellido</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Correo</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Usuario</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label} placeholderTextColor="#000">Clave</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label} placeholderTextColor="#000">Confirmar clave</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Dirección</Text>
        <TextInput style={styles.input} />
      </View>
      <TouchableOpacity style={styles.button}>
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
    marginBottom: 30,
    marginTop: 35,
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