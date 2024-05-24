import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, RefreshControl, ScrollView, FlatList, Modal,TextInput, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';
import TallaCard from '../../components/containers/TallaCard';

const Modelo = () => {
  const route = useRoute();
  const { idModelo } = route.params;
  const [modelo, setModelo] = useState(null);
  const [tallas, setTallas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tallaDetalles, setTallaDetalles] = useState(null);
  const [cantidad, setCantidad] = useState([]);

  useEffect(() => {
    fetchModelo();
    fetchTallas();
  }, []);

  const fetchModelo = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('idProducto', idModelo);

      const response = await fetch(`${SERVER}services/public/producto.php?action=readOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const text = await response.text();
      const responseData = JSON.parse(text);

      if (response.ok && responseData.status === 1) {
        setModelo(responseData.dataset);
      } else {
        console.error('Error fetching data:', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchTallas = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('idModelo', idModelo);

      const response = await fetch(`${SERVER}services/public/modelotallas.php?action=readAllActive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const text = await response.text();
      const responseData = JSON.parse(text);

      if (response.ok && responseData.status === 1) {
        setTallas(responseData.dataset);
      } else {
        console.error('Error fetching data:', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchTallaDetalles = async (idTalla) => {
    try {
      const formData = new FormData();
      formData.append('idModeloTalla', idTalla);
      const response = await fetch(`${SERVER}services/public/modelotallas.php?action=readOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const text = await response.text();
      const responseData = JSON.parse(text);
      if (response.ok && responseData.status === 1) {
        setTallaDetalles(responseData.dataset);
      } else {
        console.error('Error fetching data:', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchModelo();
    fetchTallas();
  };

  const handleTallaPress = async (talla) => {
    setSelectedTalla(talla);
    setModalVisible(true);
    await fetchTallaDetalles(talla.id_modelo_talla);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!modelo) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron detalles para este modelo.</Text>
      </View>
    );
  }



  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Image source={{ uri: `${SERVER}images/modelos/${modelo.foto_modelo}` }} style={styles.image} />
      <Text style={styles.title}>{modelo.descripcion_modelo}</Text>
      <Text style={styles.subtitle}>{modelo.marca}</Text>
      <Text>{modelo.detalles}</Text>
      <Text style={styles.tallasTitle}>Tallas Disponibles:</Text>
      
      <View style={styles.gridContainer}>
      <View style={styles.centeredContainer}>
        {tallas.map((item) => (
          <View style={styles.tallaCard} key={item.id_talla}>
            <TallaCard
              talla={item.talla}
              precio={item.precio_modelo_talla}
              onPress={() => handleTallaPress(item)}
            />
          </View>
        ))}
      </View>
    </View>
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {tallaDetalles ? (
            <>
              <Text style={styles.modalTitle}>Talla: {tallaDetalles.talla}</Text>
              <Text>Precio: ${tallaDetalles.precio_modelo_talla}</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese la cantidad"
                keyboardType="numeric"
                value={cantidad}
                onChangeText={setCantidad}
              />
              {tallaDetalles.stock_modelo_talla !== null && (
                <Text>Stock disponible: {tallaDetalles.stock_modelo_talla}</Text>
              )}
              <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </View>
    </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  tallasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center', // Centrar verticalmente
  },
  tallaCard: {
    width: '48%', // Adjust the width as needed
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Modelo;