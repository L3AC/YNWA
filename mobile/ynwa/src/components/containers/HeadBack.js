// HeadBack.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeadBack = ({ titulo, onPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <Icon name="arrow-back" size={34} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{titulo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HeadBack;
