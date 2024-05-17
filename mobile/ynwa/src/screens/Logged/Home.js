import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../../contexts/UserContext';

const Home = () => {
  const { usuario } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido, {usuario}!</Text>
    </View>
  );
};

export default Home;
