import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Iconos de Ionicons
import { useNavigation } from '@react-navigation/native';

const Header = ({ onPress,titulo}) => {

  return (
    <View>
      <View style={styles.topBackground}></View>
      <View style={styles.header}>
        <Ionicons
          style={styles.iconoHeader}
          name="chevron-back-outline"
          size={40}
          color="black"
          onPress={ onPress}
        />
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.title}> </Text>
      </View>
      <View style={styles.linea}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    topBackground: {
      height: 100, // Ajusta esta altura según sea necesario
      backgroundColor: '#cdc4a3', // Color de fondo para la parte superior
    },
    iconoHeader: {
      paddingBottom: 5,
      paddingLeft: 20,
      paddingRight: 16,
    },
    header: {
      flexDirection: 'row', // Coloca los elementos en una fila
      justifyContent: 'space-between', // Espacia los elementos de manera equitativa
      alignItems: 'center', // Alinea los elementos verticalmente al centro
      marginBottom: 0, // Ajusta este valor a 0
      marginTop: -50, // Ajusta este valor según sea necesario
      backgroundColor: 'transparent',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black', // Color del texto del título
      fontFamily: 'QuickSand',
      paddingRight: 26,
    },
    linea: {
      // Si no usas esta línea, elimínala o deja este objeto vacío
    },
  });  

export default Header;