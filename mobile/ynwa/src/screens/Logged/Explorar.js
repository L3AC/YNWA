import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Card from '../../components/containers/Card'; // Asume que tienes un componente de tarjeta para renderizar cada ítem


const Explorar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append('modelo', ''); // Ajusta esto según los parámetros de búsqueda que necesitas

        const response = await fetch('http://192.168.1.3:80//YNWA/api/services/public/producto.php?action=searchModelos', {
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
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Card item={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Explorar</Text>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_modelo.toString()} // Ajusta esto según tu estructura de datos
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
});

export default Explorar;
