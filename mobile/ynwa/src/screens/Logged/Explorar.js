import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, RefreshControl } from 'react-native';
import Card from '../../components/containers/Card'; // Asume que tienes un componente de tarjeta para renderizar cada ítem
import { IP } from '../../contexts/Network';

const Explorar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (query = '') => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('modelo', query);

      const response = await fetch(`http://${IP}:80//YNWA/api/services/public/producto.php?action=searchModelos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const text = await response.text();
      const responseData = JSON.parse(text);

      if (response.ok && responseData.status === 1) {
        setData(responseData.dataset); // Almacena el dataset en el estado
      } else {
        console.error('Error fetching data:', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearchChange = (text) => {
    setSearch(text);
    fetchData(text);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(search);
  };

  const renderItem = ({ item }) => (
    <Card item={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Explorar</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar modelos..."
        value={search}
        onChangeText={handleSearchChange}
      />
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_modelo.toString()} // Ajusta esto según tu estructura de datos
          numColumns={2} // Mostrar en dos columnas
          columnWrapperStyle={styles.column}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          key={2} // Cambia la clave para forzar un nuevo renderizado cuando cambies el número de columnas
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  column: {
    justifyContent: 'space-between',
  },
});

export default Explorar;