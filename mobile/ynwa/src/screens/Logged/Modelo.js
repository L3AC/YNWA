import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet, ActivityIndicator,
  RefreshControl, ScrollView, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';
import ModalMensaje from '../../components/alerts/ModalMensaje';
import { useUser } from '../../contexts/UserContext';

const Modelo = () => {
  const route = useRoute();
  const { usuario } = useUser();
  const navigation = useNavigation();
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
  const [alertVisible, setAlertVisible] = useState(false);

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
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.status === 1) {
        setTallaDetalles(data.dataset);
      } else {
        console.error('Error fetching data:', data.message);
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

      if (isNaN(cantidadIngresada) || cantidadIngresada <= 0) {
        setCantidadError('Por favor, ingrese una cantidad válida.');
        return;
      }

      if (cantidadIngresada > stockDisponible) {
        setCantidadError('La cantidad ingresada excede el stock disponible.');
        return;
      }

      const formData = new FormData();
      formData.append('idUsuario', usuario.id_usuario);
      formData.append('idProducto', idModelo);
      formData.append('idTalla', selectedTalla.id_modelo_talla);
      formData.append('cantidad', cantidadIngresada);

      const response = await fetch(`${SERVER}services/public/detallefactura.php?action=addDetail`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok && responseData.status === 1) {
        setDetalleCreado(true);
        setMensajeEmergente('Detalle creado exitosamente.');
        setCantidad('');
        setSelectedTalla(null);
      } else {
        setMensajeEmergente('Error al crear el detalle.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensajeEmergente('Error al crear el detalle.');
    } finally {
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {modelo && (
            <View>
              <Image source={{ uri: modelo.imagen_producto }} style={styles.image} />
              <Text style={styles.title}>{modelo.nombre_producto}</Text>
              <Text style={styles.description}>{modelo.descripcion_producto}</Text>
              <Text style={styles.price}>${modelo.precio_producto}</Text>
            </View>
          )}
          <View style={styles.tallasContainer}>
            {tallas.map((talla) => (
              <TouchableOpacity key={talla.id_modelo_talla} onPress={() => handleTallaPress(talla)}>
                <Text style={styles.talla}>{talla.nombre_talla}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCerrarModal}
      >
        <TouchableWithoutFeedback onPress={handleCerrarModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Detalles de la Talla</Text>
          {tallaDetalles && (
            <View>
              <Text style={styles.modalText}>Stock: {tallaDetalles.stock_modelo_talla}</Text>
              <Text style={styles.modalText}>Precio: ${tallaDetalles.precio_modelo_talla}</Text>
            </View>
          )}
          <TextInput
            style={[styles.input, cantidadError ? styles.inputError : null]}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={handleCantidadChange}
          />
          {cantidadError ? <Text style={styles.errorText}>{cantidadError}</Text> : null}
          <Button title="Agregar Detalle" onPress={createDetail} />
        </View>
      </Modal>
      <ModalMensaje
        visible={alertVisible}
        mensaje={mensajeEmergente}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  tallasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  talla: {
    fontSize: 18,
    color: '#000',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Modelo;