import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet, ActivityIndicator,
  RefreshControl, ScrollView, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, Button, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import PhoneInput from '../../components/inputs/PhoneInput';
import { SERVER } from '../../contexts/Network';
import Header from '../../components/containers/Header';
import Confirm from '../../components/buttons/Confirm';
import ModalMensaje from '../../components/alerts/ModalMensaje';
import { useUser } from '../../contexts/UserContext';

const Modelo = () => {
  // Hooks para obtener la ruta actual y la navegación
  const route = useRoute();
  const { usuario } = useUser();
  const navigation = useNavigation();
  const { idModelo } = route.params; // Obtiene el ID del modelo de los parámetros de la ruta

  // Definición de estados
  const [modelo, setModelo] = useState(null); // Estado para almacenar los detalles del modelo
  const [tallas, setTallas] = useState([]); // Estado para almacenar las tallas disponibles del modelo
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando
  const [refreshing, setRefreshing] = useState(false); // Estado para indicar si la página se está refrescando
  const [selectedTalla, setSelectedTalla] = useState(null); // Estado para almacenar la talla seleccionada
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [tallaDetalles, setTallaDetalles] = useState(null); // Estado para almacenar los detalles de una talla específica
  const [cantidad, setCantidad] = useState(''); // Estado para almacenar la cantidad seleccionada
  const [cantidadError, setCantidadError] = useState(''); // Estado para almacenar errores en la cantidad
  const [mensajeEmergente, setMensajeEmergente] = useState(''); // Estado para almacenar mensajes emergentes
  const [detalleCreado, setDetalleCreado] = useState(false); // Estado para indicar si el detalle fue creado
  const [alertVisible, setAlertVisible] = useState(false); // Estado para controlar la visibilidad de la alerta

  // Efecto para cargar los datos del modelo y las tallas al montar el componente
  useEffect(() => {
    fetchModelo();
    fetchTallas();
  }, []);

  // Función para obtener los detalles del modelo desde el servidor
  const fetchModelo = async () => {
    try {
      setLoading(true); // Indica que los datos están cargando
      const formData = new FormData();
      formData.append('idProducto', idModelo);

      const response = await fetch(`${SERVER}services/public/producto.php?action=readOne`, {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      const responseData = JSON.parse(text);

      if (response.ok && responseData.status === 1) {
        setModelo(responseData.dataset); // Almacena los datos del modelo en el estado
      } else {
        console.error('Error fetching data:', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Indica que los datos han terminado de cargar
      setRefreshing(false); // Termina el refresco de la página
    }
  };
  // Función para obtener las tallas disponibles del modelo desde el servidor
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
        setTallas(responseData.dataset); // Almacena las tallas en el estado
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
  // Función para obtener los detalles de una talla específica desde el servidor
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
        setTallaDetalles(data.dataset); // Almacena los detalles de la talla en el estado
      } else {
        console.error('Error fetching data:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // Función para refrescar la página
  const onRefresh = () => {
    setRefreshing(true);
    fetchModelo();
    fetchTallas();
  };
  // Maneja la selección de una talla y abre el modal con los detalles de la talla seleccionada
  const handleTallaPress = async (talla) => {
    setSelectedTalla(talla);
    setModalVisible(true);
    await fetchTallaDetalles(talla.id_modelo_talla);
  };
  // Maneja el cambio de la cantidad seleccionada
  const handleCantidadChange = (value) => {
    setCantidad(value);
    setCantidadError('');
  };
  // Cierra el modal
  const handleCerrarModal = () => {
    setModalVisible(false);
  };
  // Crea un detalle del pedido con la cantidad y talla seleccionadas
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
          }, 500); // 3 segundos
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
  // Verifica si hay comentarios disponibles para el modelo y navega a la pantalla de comentarios
  const verifComent = async () => {
    try {
      setRefreshing(true);
      const formData = new FormData();
      formData.append('idModelo', idModelo);
      formData.append('valor', '');

      const response = await fetch(`${SERVER}services/public/comentario.php?action=readAllActive`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.status === 1) {
        navigation.navigate('Comentarios', { idModelo });
      } else {
        Alert.alert('No hay comentarios');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setRefreshing(false);
    }
  };
  // Muestra un indicador de carga mientras los datos están siendo cargados
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  // Muestra un mensaje si no se encontraron detalles para el modelo
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
      <Header onPress={() => navigation.goBack()} titulo={modelo.descripcion_modelo} />
      <View style={styles.contenedorImg}>
        <Image source={{ uri: `${SERVER}images/modelos/${modelo.foto_modelo}` }} style={styles.image} />
        <Text style={styles.subtitle}>{modelo.marca}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => verifComent()}>
        <Icon name="chatbubble-outline" size={24} color="#000" style={styles.icon} />
        <Text style={styles.text}>Comentarios</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle2}>Tallas</Text>
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

                    <PhoneInput
                      type={'custom'}
                      format={'9'}
                      value={cantidad}
                      onChangeText={handleCantidadChange}
                      placeHolder='Cantidad'
                      alert={cantidadError && styles.inputError}
                    />
                    {cantidadError ? <Text style={styles.errorText}>{cantidadError}</Text> : null}
                    <Confirm onPress={createDetail} tittle={'Agregar'} />
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6AA20', // Color amarillo
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
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
  contenedorImg: {
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    width: '95%',
    height: 250,
    marginBottom: 20,
    marginTop: 30,
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
  subtitle2: {
    fontSize: 18,
    color: '#011',
    fontFamily: 'QuickSand',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  tallasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'QuickSand',
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


