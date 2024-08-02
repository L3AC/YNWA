import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Input({ placeHolder, value, clave, onChangeText, color='black',multiline = false, keyboardType = 'default' }) {
  return (
    <TextInput
      style={[styles.input, { color: color }]}
      placeholder={placeHolder}
      value={value}
      placeholderTextColor={'#787878'} // Cambia el color del placeholder a negro
      secureTextEntry={clave}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
      autoCapitalize='none'
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'black', // Color del borde inferior (si lo deseas blanco)
    width: '95%',
    paddingVertical: 10,
    fontSize: 20,
    color: 'black', // Color del texto a negro
    marginBottom: 20,
    fontFamily: 'QuickSand',
  },
});
