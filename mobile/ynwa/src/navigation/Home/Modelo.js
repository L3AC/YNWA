import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, RefreshControl, ScrollView, Modal, TextInput, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';
import TallaCard from '../../components/containers/TallaCard';
import ModalMensaje from '../../components/alerts/ModalMensaje';
import { useUser } from '../../contexts/UserContext';

const Modelo = () => {
  const route = useRoute();
  const { usuario } = useUser();
  const { idModelo } = route.params;
  const [modelo, setModelo] = useState(null);
  const [tallas, setTallas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tallaDetalles, setTallaDetalles] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [cantidadError, setCantidadError] = useState('');
  const [mensajeEmergente, setMensajeEmergente] = useState('');
  const [detalleCreado, setDetalleCreado] = useState(false);

  useEffect(() => {
    fetchModelo();
    fetchTallas();
    if (detalleCreado) {
      setModalVisible(false);
    }
  }, [detalleCreado]);

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

  const handleCantidadChange = (value) => {
    setCantidad(value);
    setCantidadError('');
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };

  const createDetail = async () => {
    try {
      const stockDisponible = tallaDetalles.stock_modelo_talla;
      const cantidadIngresada = parseInt(cantidad);
  
      if (isNaN(cantidadIngresada)) {
        setCantidadError('Ingrese un número válido.');
      } else if (cantidadIngresada > stockDisponible) {
        setCantidadError('La cantidad ingresada supera el stock disponible.');
      } else if (cantidadIngresada > 3) {
        setCantidadError('La cantidad ingresada no puede ser mayor a 3.');
      } else {
        const formData = new FormData();
        formData.append('idCliente', parseInt(usuario)); // Reemplaza con el valor correcto
        formData.append('idModeloTalla', tallaDetalles.id_modelo_talla); // Reemplaza con el valor correcto
        formData.append('cantidadModelo', parseInt(cantidad)); // Reemplaza con el valor correcto
        console.log(formData);
  
        const response = await fetch(`${SERVER}services/public/pedido.php?action=createDetailM&app=j`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
  
        const text = await response.text();
        const responseData = JSON.parse(text);
  
        if (responseData.status === 1) {
          setDetalleCreado(true);
          setMensajeEmergente(responseData.message);
        } else if (responseData.status === 2) {
          setMensajeEmergente(responseData.message);
        } else {
          setMensajeEmergente(responseData.error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMensajeEmergente('Error en la consulta');
    }
  };

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
                  style={[styles.input, cantidadError && styles.inputError]}
                  placeholder="Ingrese la cantidad"
                  keyboardType="numeric"
                  value={cantidad}
                  onChangeText={handleCantidadChange}
                />
                {cantidadError ? <Text style={styles.errorText}>{cantidadError}</Text> : null}
                {tallaDetalles.stock_modelo_talla !== null && (
                  <Text>Stock disponible: {tallaDetalles.stock_modelo_talla}</Text>
                )}
                <Button title="Crear Detalle" onPress={createDetail} />
                <Button title="Cerrar" onPress={handleCerrarModal} />
              </>
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          </View>
        </View>
      </Modal>
      <ModalMensaje visible={detalleCreado} mensaje={mensajeEmergente} onClose={() => {
        setDetalleCreado(false);
        setMensajeEmergente('');
      }} />
    </ScrollView>
  );
};

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
  input: {
    // Estilos del TextInput
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default Modelo;