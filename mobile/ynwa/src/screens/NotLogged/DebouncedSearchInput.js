import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DebouncedSearchInput = ({ onSearch, value, onChangeText }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(text);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [text, onSearch]);

  useEffect(() => {
    setText(value); // Update local state when value changes from parent
  }, [value]);

  const handleChangeText = (newText) => {
    setText(newText);
    onChangeText(newText); // Pass the updated text to parent component
  };

  return (
    <TextInput
      style={styles.addressInput}
      placeholder="Dirección"
      onChangeText={handleChangeText}
      value={text}
    />
  );
};

const styles = StyleSheet.create({
  addressInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
});

export default DebouncedSearchInput;