import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SERVER } from '../../contexts/Network'; // Reemplaza con la URL de tu servidor
import DetalleCard from '../../components/containers/DetalleCard';
import { Icon } from 'react-native-elements';

const OrderDetailScreen = () => {
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar la actualización
  const [detalleItems, setDetalleItems] = useState([]); // Estado para almacenar los detalles del pedido
  const [total, setTotal] = useState(0); // Estado para almacenar el total del pedido
  const navigation = useNavigation(); // Hook de navegación
  const route = useRoute(); // Hook para obtener los parámetros de la ruta
  const { orderId } = route.params; // Obtiene el id del pedido de los parámetros de la ruta

  // Función para actualizar los detalles del pedido
  const onRefresh = useCallback(() => {
    fetchDetalle();
  }, []);

  // Función para obtener los detalles del pedido desde el servidor
  const fetchDetalle = async () => {
    try {
      setRefreshing(true);
      const formData = new FormData();
      formData.append('idPedido', orderId);

      const response = await fetch(`${SERVER}services/public/detallepedido.php?action=searchHistorial`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.status === 1) {
        setDetalleItems(data.dataset || []);
        calculateTotal(data.dataset || []);
      } else {
        Alert.alert('No hay detalles');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Función para calcular el total del pedido
  const calculateTotal = (items) => {
    let totalAmount = 0;
    items.forEach(item => {
      totalAmount += Math.round(parseFloat(item.subtotal) * 100) / 100;
      console.log(totalAmount);
    });
    setTotal(totalAmount.toFixed(2)); // Asegura que el total tenga dos decimales
  };

  // useEffect que se ejecuta cuando el componente se monta
  useEffect(() => {
    fetchDetalle();
  }, []);

  // Función para manejar la acción de volver a la pantalla anterior
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-left" type="font-awesome" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalle del pedido</Text>
      </View>
      <Text style={styles.totalText}>Total: ${total}</Text>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {detalleItems.length > 0 ? (
          detalleItems.map((item) => (
            <DetalleCard
              key={item.id_detalle ? item.id_detalle.toString() : Math.random().toString()}
              item={item}
            />
          ))
        ) : (
          <Text>No hay detalles para este pedido.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d4d2b6',
    padding: 16,
  },
  backButton: {
    padding: 16,
  },
  backButtonText: {
    fontSize: 40,
    color: 'black',
  },
  container: {
    paddingTop: 16,
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
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 8,
  },
});

export default OrderDetailScreen;
