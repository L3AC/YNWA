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

      if (isNaN(cantidadIngresada) || cantidadIngresada < 1) {
        setCantidadError('Ingrese un número válido.');
      } else if (cantidadIngresada > stockDisponible) {
        setCantidadError('La cantidad ingresada supera el stock disponible.');
      } else if (cantidadIngresada > 3) {
        setCantidadError('La cantidad ingresada no puede ser mayor a 3.');
      } else {
        const formData = new FormData();
        formData.append('idModeloTalla', tallaDetalles.id_modelo_talla);
        formData.append('cantidadModelo', parseInt(cantidad));

        const response = await fetch(`${SERVER}services/public/pedido.php?action=createDetail`, {
          method: 'POST',
          body: formData,
        });

        const text = await response.text();
        const responseData = JSON.parse(text);

        if (responseData.status === 1) {
          setDetalleCreado(true);
          setMensajeEmergente(responseData.message);
          setAlertVisible(true);
          setTimeout(() => {
            setAlertVisible(false);
            setDetalleCreado(false);
            setModalVisible(false);
            navigation.navigate('StackCart');
          }, 500);// 3 segundos
        } else if (responseData.status === 2) {
          setMensajeEmergente(responseData.message);
          setAlertVisible(true);
          setTimeout(() => setAlertVisible(false), 500); // 3 segundos
        } else {
          setMensajeEmergente(responseData.error);
          setAlertVisible(true);
          setTimeout(() => setAlertVisible(false), 500); // 3 segundos
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMensajeEmergente('Error en la consulta');
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 500); // 3 segundos
    }
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
      {alertVisible && <ModalMensaje mensaje={mensajeEmergente} />}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{modelo.descripcion_modelo}</Text>
      </View>
      <View style={styles.contenedorImg}>
        <Image source={{ uri: `${SERVER}images/modelos/${modelo.foto_modelo}` }} style={styles.image} />
        <Text style={styles.subtitle}>{modelo.marca}</Text>
      </View>
      <Text style={styles.tallasTitle}>Tallas</Text>

      <View style={styles.gridContainer}>
        {tallas.map((item) => (
          <TouchableOpacity
            style={styles.tallaCard}
            key={item.id_talla}
            onPress={() => handleTallaPress(item)}
          >
            <Text style={styles.tallaText}>{item.talla}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCerrarModal}
      >
        <TouchableWithoutFeedback onPress={handleCerrarModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {tallaDetalles ? (
                  <>
                    <Text style={styles.modalHeader}>Talla: {tallaDetalles.talla}</Text>
                    <Text style={styles.modalRow}>Precio: ${tallaDetalles.precio_modelo_talla}</Text>
                    <Text style={styles.modalRow}>Stock disponible: {tallaDetalles.stock_modelo_talla}</Text>
                    <TextInput
                      style={[styles.input, cantidadError && styles.inputError]}
                      placeholder="Ingrese la cantidad"
                      keyboardType="numeric"
                      value={cantidad}
                      onChangeText={handleCantidadChange}
                    />
                    {cantidadError ? <Text style={styles.errorText}>{cantidadError}</Text> : null}
                    <TouchableOpacity
                      style={styles.finalizarButton}
                      onPress={createDetail}
                    >
                      <Text style={styles.finalizarButtonText}>Añadir al pedido</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {detalleCreado && <ModalMensaje mensaje={mensajeEmergente} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#cdc4a3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 50,
  },
  backButton: {
    marginRight: 16,
  },
  contenedorImg:{
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    width: '95%',
    height: 250,
    marginBottom: 20,
    borderColor: '#000',
    borderWidth: 1,
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'QuickSand',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    color: '#011',
    fontFamily: 'QuickSand',
    textAlign: 'center',
  },
  tallasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily:'QuickSand',
    marginBottom: 16,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  tallaCard: {
    width: '20%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tallaText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'QuickSand'
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
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalRow: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalQuantityLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 8,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  finalizarButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Modelo;


