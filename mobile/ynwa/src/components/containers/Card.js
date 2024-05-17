import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ item }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: `http://192.168.1.3//YNWA/api/images/modelos/${item.foto_modelo}` }} // Ajusta la URL según tu estructura
      style={styles.image}
    />
    <Text style={styles.cardTitle}>{item.descripcion_modelo}</Text>
    <Text>Marca: {item.marca}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Card;
