import { StyleSheet, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'; // Importa TextInputMask

export default function PhoneInput({ type, format, placeHolder, value, onChangeText ,color='black',alert=''}) {
  return (
    <TextInputMask
    style={[styles.input, { color: color ,alert: alert}]}
      type={type}
      options={{
        mask: format
      }}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeHolder}
      placeholderTextColor="gray" // Color del placeholder para diferenciar del texto
      keyboardType="numeric"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'black', // Color del borde inferior (si lo deseas blanco)
    width: '50%',
    paddingVertical: 10,
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'QuickSand',
    textAlign: 'center',
  },
});
