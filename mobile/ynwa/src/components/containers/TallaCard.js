import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Componente funcional TallaCard que recibe tres props: talla, precio, y onPress
const TallaCard = ({ talla, precio, onPress }) => {
  return (
    // TouchableOpacity permite hacer clic en toda la tarjeta y ejecutar la función onPress
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        {/* Muestra la talla en un texto grande */}
        <Text style={styles.cardTitle}>{talla}</Text>
        {/* Muestra el precio debajo de la talla */}
        <Text style={styles.cardSubtitle}>${precio}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default TallaCard;
