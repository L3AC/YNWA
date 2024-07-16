import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network'; // Reemplaza con la URL de tu servidor
import { MaterialIcons } from 'react-native-vector-icons';

const Historial = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [fecha, setFecha] = useState('Todo'); // Estado para el filtro de fecha
  const [estado, setEstado] = useState('Finalizado'); // Estado para el filtro de estado
  const [orders, setOrders] = useState([]); // Estado para almacenar los pedidos
  const navigation = useNavigation(); // Hook de navegación

  // Función para obtener los datos de los pedidos desde el servidor
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
        setOrders(data.dataset); // Asegúrate de que `data.dataset` contiene la lista de pedidos
      } else {
        Alert.alert('No hay ningún pedido en el historial'); // Muestra una alerta si no hay pedidos
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // useEffect que se ejecuta cuando el componente se monta y cuando cambian los filtros de fecha o estado
  useEffect(() => {
    fetchData(fecha, estado);
  }, [fecha, estado]);

  // Función para manejar la acción de "tirar para actualizar"
  const onRefresh = useCallback(() => {
    fetchData(fecha, estado);
  }, [fecha, estado]);

  // Función para manejar el cambio en el filtro de fecha
  const handleFechaChange = (value) => {
    setFecha(value);
    fetchData(value, estado);
  };

  // Función para manejar el cambio en el filtro de estado
  const handleEstadoChange = (nuevoEstado) => {
    setEstado(nuevoEstado);
    fetchData(fecha, nuevoEstado);
  };

  // Función para manejar la selección de un pedido
  const handleOrderPress = (orderId) => {
    navigation.navigate('DetallePedido', { orderId }); // Asegúrate de que tienes una pantalla 'DetallePedido' configurada en tu navegador
  };

  // Función para manejar la acción de volver atrás
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
        <RNPickerSelect
          onValueChange={handleFechaChange}
          items={[
            { label: 'Todo el tiempo', value: 'Todo' },
            { label: 'Últimos 3 meses', value: '3meses' },
            { label: 'Último mes', value: '1mes' },
            { label: 'Últimos 7 días', value: '7dias' },
          ]}
          style={pickerSelectStyles}
          value={fecha}
          Icon={() => {
            return <MaterialIcons style={styles.icono} name="arrow-drop-down" size={40} color="white" />;
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, estado === 'Finalizado' && styles.activeButton]} onPress={() => handleEstadoChange('Finalizado')}>
          <Text style={styles.textoBoton}>Finalizado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, estado === 'Anulado' && styles.activeButton]} onPress={() => handleEstadoChange('Anulado')}>
          <Text style={styles.textoBoton}>Anulado</Text>
        </TouchableOpacity>
      </View>
      {orders.map(order => (
        <TouchableOpacity
          key={order.id_pedido ? order.id_pedido.toString() : Math.random().toString()}
          style={styles.card}
          onPress={() => handleOrderPress(order.id_pedido)}
        >
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
  icono:{
    marginTop: 5,
    marginRight: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2F2C2C',
    padding: 10,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    borderColor: '#fff',
    borderWidth: 1
  },
  textoBoton:{
    color: 'white',
    fontFamily: 'QuickSand',
  },
  activeButton: {
    backgroundColor: '#4f4949',
  },
  card: {
    backgroundColor: '#2F2C2C',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: '#fff',
    borderWidth: 1
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
    fontFamily: 'QuickSand'
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    backgroundColor: '#2F2C2C',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingRight: 30, // Ajusta el padding para hacer espacio para el icono
    marginBottom: 10,
    color: 'white',
    fontFamily: 'QuickSand',
    borderColor: '#fff',
    borderWidth: 1
  },
  inputAndroid: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingRight: 30, // Ajusta el padding para hacer espacio para el icono
    marginBottom: 10,
  },
});

export default Historial;
