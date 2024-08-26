
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image } from 'react-native';

const getClientData = () => {
  return {
    id_Cliente: 1,
    nombre_Cliente: 'wilfredo',
    apellido_Cliente: 'Pérez',
    numero_Cliente: '123456789',
    correo_Cliente: 'juan.perez@example.com',
    direccion_Cliente: '123 Calle Final, Ciudad, País',
    img_Cliente: 'https://via.placeholder.com/150',
    estado_Cliente: 1,
    id_Genero: 1,
  };
};

const EditProfileScreen = () => {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const data = getClientData();
    setClientData(data);
  }, []);

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    console.log('Datos guardados:', clientData);
  };

  if (!clientData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: clientData.img_Cliente }} style={styles.image} />
      <Text style={styles.title}>Editar Perfil de {clientData.nombre_Cliente} {clientData.apellido_Cliente}</Text>
      
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={clientData.nombre_Cliente}
        onChangeText={(text) => setClientData({ ...clientData, nombre_Cliente: text })}
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={clientData.apellido_Cliente}
        onChangeText={(text) => setClientData({ ...clientData, apellido_Cliente: text })}
      />

      <Text style={styles.label}>Número de Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={clientData.numero_Cliente}
        onChangeText={(text) => setClientData({ ...clientData, numero_Cliente: text })}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={clientData.correo_Cliente}
        onChangeText={(text) => setClientData({ ...clientData, correo_Cliente: text })}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        style={styles.input}
        value={clientData.direccion_Cliente}
        onChangeText={(text) => setClientData({ ...clientData, direccion_Cliente: text })}
      />

      <Button title="Guardar Cambios" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#3c4240',
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#000',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    width: '100%',
    color: '#000',
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
});

export default EditProfileScreen;