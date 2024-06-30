import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, RefreshControl, Alert, TextInput, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import { SERVER } from '../../contexts/Network';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  const [refreshing, setRefreshing] = useState(false); // Estado para indicar si se está refrescando la pantalla
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando la lista de elementos del carrito
  const [cartItems, setCartItems] = useState([]); // Estado para almacenar los elementos del carrito
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [cantidad, setCantidad] = useState(''); // Estado para almacenar la cantidad de productos del modal
  const [nota, setNota] = useState(''); // Estado para almacenar la nota del producto del modal
  const [idModeloT, setIdModeloT] = useState(null); // Estado para almacenar el ID del elemento actual del modal
  const [itemDetalle, setItemDetalle] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false); // Estado para indicar si se está cargando el modal
  const navigation = useNavigation(); // Hook de navegación para acceder a la navegación
  const [tallaDetalles, setTallaDetalles] = useState(null);
  const [cantidadError, setCantidadError] = useState('');
  const [detalleCreado, setDetalleCreado] = useState(false);

  // Función para obtener los datos del carrito desde el servidor
  const fetchMenuData = async (query = '') => {
    try {
      setLoading(true); // Indica que se está cargando
      const formData = new FormData();
      formData.append('producto', query);
      const response = await fetch(`${SERVER}services/public/pedido.php?action=readDetail`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.status === 1) {
        setCartItems(data.dataset || []); // Actualiza los elementos del carrito
      } else {
        Alert.alert('No hay ningún producto agregado'); // Muestra una alerta si no hay productos
        navigation.navigate('StackHome'); // Navega a la pantalla principal (home)
      }
    } catch (error) {
      console.error('Error:', error); // Muestra un error en la consola en caso de fallo
    } finally {
      setLoading(false); // Finaliza el estado de carga
      setRefreshing(false); // Finaliza el estado de refresco
    }
  };

  // Función para obtener los detalles de un producto específico
  const readOne = async (idModeloTalla, cantidad, idDetalle) => {
    try {
      setLoadingModal(true); // Indica que se está cargando el modal
      const formData = new FormData();
      formData.append('idModeloTalla', idModeloTalla);
      const response = await fetch(`${SERVER}services/public/modelotallas.php?action=readOne`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.status === 1) {
        setCantidad(cantidad.toString() || '1'); // Actualiza la cantidad del producto
        setIdModeloT(idModeloTalla); // Actualiza el ID del producto actual
        setTallaDetalles(data.dataset);
        setItemDetalle(idDetalle);
        setModalVisible(true);
      } else {
        console.error('Error fetching data:', data.error); // Muestra un error si falla la obtención de datos
        Alert.alert('Error', data.error); // Muestra una alerta con el mensaje de error
      }
    } catch (error) {
      console.error('Error:', error); // Muestra un error en la consola en caso de fallo
    } finally {
      setLoadingModal(false); // Finaliza el estado de carga del modal
    }
  };

  // Función para actualizar los detalles de un producto
  const updateDetalle = async () => {
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
        formData.append('idDetalle', itemDetalle);
        formData.append('cantidadModelo', cantidad);
        formData.append('idModeloTalla', idModeloT);
        const response = await fetch(`${SERVER}services/public/pedido.php?action=updateDetail`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.status === 1) {
          fetchMenuData(); // Actualiza los elementos del carrito después de la actualización
          setModalVisible(false); // Oculta el modal
          Alert.alert(data.message);
        } else if (data.status === 2) {
          Alert.alert(data.message);
        } else {
          Alert.alert(data.error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error en la consulta');
    }

  };

  // Función para eliminar un detalle de pedido
  const deleteDetalle = async (idDetallePedido) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este producto?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Eliminación cancelada"),
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              setLoading(true); // Indica que se está cargando
              const formData = new FormData();
              formData.append('idDetallePedido', idDetallePedido);
              console.log(idDetallePedido);
              const response = await fetch(`${SERVER}services/public/detallepedido.php?action=deleteRow`, {
                method: 'POST',
                body: formData,
              });
              const data = await response.json();
              if (response.ok && data.status === 1) {
                fetchMenuData(); // Actualiza los elementos del carrito después de la eliminación
                setModalVisible(false); // Oculta el modal
              } else {
                Alert.alert('Error', data.error); // Muestra una alerta con el mensaje de error
              }
            } catch (error) {
              console.error('Error:', error); // Muestra un error en la consola en caso de fallo
            } finally {
              setLoading(false); // Finaliza el estado de carga
              setRefreshing(false); // Finaliza el estado de refresco
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Función para finalizar el pedido
  const finishOrder = async () => {
    Alert.alert(
      "Confirmar",
      "¿Estás seguro de que desea finalizar el pedido?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        {
          text: "Finalizar",
          onPress: async () => {
            try {
              setLoading(true); // Indica que se está cargando
              const response = await fetch(`${SERVER}services/public/pedido.php?action=finishOrder`, {
                method: 'POST'
              });
              const data = await response.json();

              if (response.ok && data.status === 1) {
                Alert.alert(data.message); // Muestra una alerta con el mensaje de error
                navigation.navigate('Home'); // Navega a la pantalla de inicio
              } else {
                console.error('Error:', data.error); // Muestra un error en la consola en caso de fallo
                Alert.alert('Error', data.error); // Muestra una alerta con el mensaje de error
              }
            } catch (error) {
              console.error('Error:', error); // Muestra un error en la consola en caso de fallo
            } finally {
              setLoading(false); // Finaliza el estado de carga
              setRefreshing(false); // Finaliza el estado de refresco
            }
          },
        },
      ],
      { cancelable: false }
    );
  };


  useEffect(() => {
    fetchMenuData(); // Carga inicial de los datos del carrito al montar el componente
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchMenuData();
    }, [])
  );

  // Función para manejar el evento de refresco
  const onRefresh = () => {
    setRefreshing(true); // Activa el estado de refresco
    fetchMenuData(); // Refresca los datos del carrito
  };
  const handleCerrarModal = () => {
    setModalVisible(false);
  };
  const handleCantidadChange = (value) => {
    setCantidad(value);
    setCantidadError('');
  };

  // Calcula el total a pagar sumando el precio por cantidad de cada producto en el carrito
  const totalToPay = cartItems.reduce((total, item) => total + (item.precio_modelo_talla * item.cantidad_detalle_pedido), 0);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Componente RefreshControl para actualizar la lista
    >
      <Text style={styles.header}>Carrito de compras</Text>
      <View style={styles.always}>
        <TouchableOpacity style={styles.finalizeButton} onPress={() => finishOrder()}>
          <Text style={styles.finalizeButtonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalText}>Total a pagar: ${totalToPay.toFixed(2)}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // Mapea los elementos del carrito y renderiza la información de cada producto
        cartItems.map((item) => (
          <View key={item.id_modelo_talla.toString()} style={styles.cartItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{item.descripcion_modelo}</Text>
              <View style={styles.iconsContainer}>
                {/* Botón para editar el producto */}
                <TouchableOpacity onPress={() => readOne(item.id_modelo_talla, item.cantidad_detalle_pedido, item.id_detalle)}>
                  <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
                {/* Botón para eliminar el producto */}
                <TouchableOpacity onPress={() => deleteDetalle(item.id_detalle)}>
                  <Ionicons name="trash" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemContent}>
              <Image source={{ uri: `${SERVER}images/modelos/${item.foto_modelo}` }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text>Precio: ${item.precio_modelo_talla}</Text>
                <Text>Cantidad: {item.cantidad_detalle_pedido}</Text>
                <Text>Subtotal: ${(item.precio_modelo_talla * item.cantidad_detalle_pedido).toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ))
      )}
      {/* Modal para editar detalles del producto */}

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
                    <Text style={styles.modalHeader}>Editar detalle</Text>
                    <Text style={styles.modalRow}>Talla: {tallaDetalles.talla}</Text>
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
                      onPress={() => updateDetalle()}
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
    </ScrollView>
  );
};

// Estilos para el componente CartScreen
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#cdc4a3',
  },
  always: {
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    color: '#000',
  },
  finalizeButton: {
    backgroundColor: '#000000',
    padding: 15,
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  finalizeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
  },
  /*modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#F5D7A4',
  },
  modalTextArea: {
    width: '100%',
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#F5D7A4',
  },*/
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
  confirmButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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

export default CartScreen;