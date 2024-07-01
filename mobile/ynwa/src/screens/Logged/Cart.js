import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, RefreshControl, Alert, TextInput, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import { SERVER } from '../../contexts/Network';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [nota, setNota] = useState('');
  const [idModeloT, setIdModeloT] = useState(null);
  const [itemDetalle, setItemDetalle] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const navigation = useNavigation();
  const [tallaDetalles, setTallaDetalles] = useState(null);
  const [cantidadError, setCantidadError] = useState('');
  const [detalleCreado, setDetalleCreado] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false); // Estado para controlar si la dirección está truncada

  const fetchMenuData = async (query = '') => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('producto', query);
      const response = await fetch(`${SERVER}services/public/pedido.php?action=readDetail`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.status === 1) {
        setCartItems(data.dataset || []);
      } else {
        Alert.alert('No hay ningún producto agregado');
        navigation.navigate('StackHome');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const readOne = async (idModeloTalla, cantidad, idDetalle) => {
    try {
      setLoadingModal(true);
      const formData = new FormData();
      formData.append('idModeloTalla', idModeloTalla);
      const response = await fetch(`${SERVER}services/public/modelotallas.php?action=readOne`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.status === 1) {
        setCantidad(cantidad.toString() || '1');
        setIdModeloT(idModeloTalla);
        setTallaDetalles(data.dataset);
        setItemDetalle(idDetalle);
        setModalVisible(true);
      } else {
        console.error('Error fetching data:', data.error);
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingModal(false);
    }
  };

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
          fetchMenuData();
          setModalVisible(false);
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
              setLoading(true);
              const formData = new FormData();
              formData.append('idDetallePedido', idDetallePedido);
              console.log(idDetallePedido);
              const response = await fetch(`${SERVER}services/public/detallepedido.php?action=deleteRow`, {
                method: 'POST',
                body: formData,
              });
              const data = await response.json();
              if (response.ok && data.status === 1) {
                fetchMenuData();
                setModalVisible(false);
              } else {
                Alert.alert('Error', data.error);
              }
            } catch (error) {
              console.error('Error:', error);
            } finally {
              setLoading(false);
              setRefreshing(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

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
              setLoading(true);
              const response = await fetch(`${SERVER}services/public/pedido.php?action=finishOrder`, {
                method: 'POST'
              });
              const data = await response.json();

              if (response.ok && data.status === 1) {
                Alert.alert(data.message);
                navigation.navigate('Home');
              } else {
                console.error('Error:', data.error);
                Alert.alert('Error', data.error);
              }
            } catch (error) {
              console.error('Error:', error);
            } finally {
              setLoading(false);
              setRefreshing(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    fetchMenuData();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchMenuData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchMenuData();
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };

  const handleCantidadChange = (value) => {
    setCantidad(value);
    setCantidadError('');
  };

  const totalToPay = cartItems.reduce((total, item) => total + (item.precio_modelo_talla * item.cantidad_detalle_pedido), 0);
  const direc = cartItems.map((item) => item.direccion_cliente).join(', ');

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.header}>Carrito de compras</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        cartItems.map((item) => (
          <View key={item.id_modelo_talla.toString()} style={styles.cartItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{item.descripcion_modelo}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => readOne(item.id_modelo_talla, item.cantidad_detalle_pedido, item.id_detalle)}>
                  <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteDetalle(item.id_detalle)}>
                  <Ionicons name="trash" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemContent}>
              <Image source={{ uri: `${SERVER}images/modelos/${item.foto_modelo}` }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.texto}>Precio: ${item.precio_modelo_talla}</Text>
                <Text style={styles.texto}>Cantidad: {item.cantidad_detalle_pedido}</Text>
                <Text style={styles.texto}>Subtotal: ${(item.precio_modelo_talla * item.cantidad_detalle_pedido).toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ))
      )}
      <View style={styles.footer}>
        <View style={styles.orderSummary}>
          <Text style={styles.totalText}>Total a pagar:</Text>
          <Text style={styles.totalText2}> ${totalToPay.toFixed(2)}</Text>
        </View>
        <View style={styles.orderSummary2}>
          <Text style={styles.addressLabel}>Dirección: </Text>
          <TouchableOpacity onPress={() => setShowFullAddress(!showFullAddress)}>
            <Text style={styles.addressText} numberOfLines={showFullAddress ? 0 : 2}>{direc}</Text>
            <Text style={styles.showMoreText}>{showFullAddress ? 'Ver menos' : 'Ver más'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.finalizeButton} onPress={finishOrder}>
        <Text style={styles.finalizeButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

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
    fontFamily: 'QuickSand',
    marginBottom: 20,
    color: '#000',
  },
  finalizeButton: {
    backgroundColor: '#000000',
    padding: 15,
    width: 250,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  texto:{
    fontFamily: 'QuickSand',
  },
  footer: {
    backgroundColor: '#2F2C2C',
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 2,
  },
  orderSummary: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  orderSummary2: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '70%'
  },
  addressLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'QuickSand'
  },
  addressText: {
    fontSize: 18,
    marginBottom: 2,
    color: '#fff',
    fontFamily: 'QuickSand'
  },
  showMoreText: {
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'QuickSand'
  },
  finalizeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'QuickSand',
    textAlign: 'center'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'QuickSand'
  },
  totalText2: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'QuickSand'
  },
  cartItem: {
    backgroundColor: '#f5f5f5',
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
    fontFamily: 'QuickSand',
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
    width: 130,
    height: 100,
    marginRight: 25,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
  },
modalOverlay: {
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
    fontFamily: 'QuickSand',
  },
  modalRow: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'QuickSand',
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
    fontFamily: 'QuickSand',
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
    fontFamily: 'QuickSand',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
    fontFamily: 'QuickSand',
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
    fontFamily: 'QuickSand',
  },
});

export default CartScreen;
