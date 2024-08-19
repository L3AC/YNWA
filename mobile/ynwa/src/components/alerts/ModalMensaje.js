import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';

// Componente funcional ModalMensaje, que recibe tres props: visible, mensaje, onClose
const ModalMensaje = ({ visible, mensaje, onClose }) => {
  return (
    // Componente Modal de React Native, utilizado para mostrar un cuadro de diálogo
    <Modal
      visible={visible}  // Controla la visibilidad del modal
      transparent={true}  // Hace que el fondo del modal sea transparente
      animationType="fade"  // Tipo de animación al mostrar/ocultar el modal
      onRequestClose={onClose}  // Función que se ejecuta al intentar cerrar el modal
    >
      {/* TouchableWithoutFeedback permite cerrar el modal al tocar fuera de su contenido */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Muestra el mensaje pasado como prop en el modal */}
            <Text style={styles.modalMessage}>{mensaje}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default ModalMensaje;
