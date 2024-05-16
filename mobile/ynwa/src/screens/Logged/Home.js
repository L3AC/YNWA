import React from 'react';
import { View, Text } from 'react-native';

const Home = ({ route }) => {
  const { usuario } = route.params ? route.params : {};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido, {usuario}!</Text>
    </View>
  );
};

export default Home;
