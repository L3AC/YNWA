import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network'; // Reemplaza con la URL de tu servidor

const Historial = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [fecha, setFecha] = useState('Todo');
  const [estado, setEstado] = useState('Finalizado');
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const fetchData = async (fecha = 'Todo', estado = 'Finalizado') => {
    try {
      setRefreshing(true);
      const formData = new FormData();
      formData.append('fecha', fecha);
      formData.append('estado', estado);

      const response = await fetch(`${SERVER}services/public/pedido.php?action=searchByCliente`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === 1) {
        setOrders(data.dataset);  // Asegúrate de que `data.dataset` contiene la lista de pedidos
      } else {
        console.error('Error fetching data:', data.message);
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(fecha, estado);
  }, [fecha, estado]);

  const onRefresh = useCallback(() => {
    fetchData(fecha, estado);
  }, [fecha, estado]);

  const handleFechaChange = (value) => {
    setFecha(value);
    fetchData(value, estado);
  };

  const handleEstadoChange = (nuevoEstado) => {
    setEstado(nuevoEstado);
    fetchData(fecha, nuevoEstado);
  };

  const handleOrderPress = (orderId) => {
    navigation.navigate('DetallePedido', { orderId });  // Asegúrate de que tienes una pantalla 'OrderDetails' configurada en tu navegador
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-left" type="font-awesome" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Historial</Text>
      </View>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={fecha}
          style={styles.picker}
          onValueChange={handleFechaChange}
        >
          <Picker.Item label="Todo el tiempo" value="Todo" />
          <Picker.Item label="Últimos 3 meses" value="3meses" />
          <Picker.Item label="Último mes" value="1mes" />
          <Picker.Item label="Últimos 7 días" value="7dias" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, estado === 'Finalizado' && styles.activeButton]} onPress={() => handleEstadoChange('Finalizado')}>
          <Text>Finalizado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, estado === 'Anulado' && styles.activeButton]} onPress={() => handleEstadoChange('Anulado')}>
          <Text>Anulado</Text>
        </TouchableOpacity>
      </View>
      {orders.map(order => (
        <TouchableOpacity key={order.id_pedido.toString()} style={styles.card} onPress={() => handleOrderPress(order.id_pedido)}>
          <Text style={styles.cardText}>Pago: {order.forma_pago_pedido}</Text>
          <Text style={styles.cardText}>Fecha: {order.fecha}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#cdc4a3',
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
  },
  filterContainer: {
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: '#CECDCD',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Historial;
