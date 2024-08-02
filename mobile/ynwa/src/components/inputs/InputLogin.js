import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';

const InputLogin = ({ placeHolder, value, onChangeText, clave, isContra, setIsContra }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor="black"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={clave}
      />
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
