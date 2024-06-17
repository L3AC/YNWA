import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function App() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Cuenta</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="user-circle" size={40} color="white" />
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="lock" size={40} color="white" />
          <Text style={styles.buttonText}>Clave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="history" size={40} color="white" />
          <Text style={styles.buttonText}>Historial de pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="users" size={40} color="white" />
          <Text style={styles.buttonText}>Sobre nosotros</Text>
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