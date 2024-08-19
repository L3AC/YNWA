import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Importa íconos de Ionicons
import { Icon } from 'react-native-elements';  // Importa el componente Icon de react-native-elements

const InputLogin = ({ placeHolder, value, onChangeText, clave, isContra, setIsContra }) => {
  return (
    <View style={styles.inputContainer}>
      {/* Campo de texto con estilos y propiedades personalizadas */}
      <TextInput
        style={styles.input}
        placeholder={placeHolder}  // Texto de marcador de posición
        placeholderTextColor="black"  // Color del placeholder
        value={value}  // Valor del campo de texto
        onChangeText={onChangeText}  // Función para manejar cambios en el texto
        secureTextEntry={clave}  // Controla si el texto se muestra como contraseña
      />
      {/* Si isContra es verdadero, muestra el icono de ojo para alternar la visibilidad de la contraseña */}
      {isContra && (
        <TouchableOpacity style={styles.icon} onPress={() => setIsContra(!clave)}>
          <Icon name={clave ? 'eye-slash' : 'eye'} type="font-awesome" size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '95%',
    marginBottom: 25,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    fontSize: 20,
    color: 'black',
    fontFamily: 'QuickSand'
  },
  icon: {
    paddingLeft: 10,
  },
});

export default InputLogin;
