

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SERVER } from '../../contexts/Network';

const Card = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item.id_modelo)}>
      <Image source={{ uri: `${SERVER}images/modelos/${item.foto_modelo}` }} style={styles.image} />
    <Text style={styles.title}>{item.descripcion_modelo}</Text>
    <Text style={styles.price}>{item.marca}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: '45%',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Card;
