import React from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';

const ModalMensaje = ({ mensaje, onClose }) => {
  return (
    <Modal visible={mensaje !== ''} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{mensaje}</Text>
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
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
    alignItems: 'center',
  },
});

export default ModalMensaje;