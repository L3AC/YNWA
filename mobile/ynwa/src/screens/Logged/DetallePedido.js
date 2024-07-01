import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SERVER } from '../../contexts/Network'; // Reemplaza con la URL de tu servidor
import DetalleCard from '../../components/containers/DetalleCard'; 

const OrderDetailScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [detalleItems, setDetalleItems] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;

  const onRefresh = useCallback(() => {
    fetchDetalle();
  }, []);

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
      } else {
        Alert.alert('No hay detalles');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDetalle();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.header}>Detalle del pedido</Text>
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
  },
  backButton: {
    padding: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
  },
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default OrderDetailScreen;
