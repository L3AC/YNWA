import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ placeholder, onChangeText, value, onSubmitEditing }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
      />
      <Ionicons name="search" size={20} color="#fff" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    alignSelf: 'center',
    height: 40
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 8,
    fontFamily: 'QuickSand'
  },
  icon: {
    marginLeft: 10,
  },
});

export default SearchBar;
