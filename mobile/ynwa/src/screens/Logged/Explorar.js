import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/containers/Card';
import SearchBar from '../../components/inputs/searchBar';
import { SERVER } from '../../contexts/Network';

const Explorar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (query = '') => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('modelo', query);

      const response = await fetch(`${SERVER}services/public/producto.php?action=searchModelos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === 1) {
        setData(data.dataset);
      } else {
        console.error('Error fetching data:', data.message);
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
    <Card item={item} onPress={(id) => navigation.navigate('Modelo', { idModelo: id })} />
  );

  const ListHeaderComponent = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Explorar</Text>
      <SearchBar
        placeholder="Buscar modelos..."
        onChangeText={handleSearchChange}
        value={search}
        onSubmitEditing={() => fetchData(search)}
      />
      <Text style={styles.subtitle}>Modelos</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_modelo.toString()}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={ListHeaderComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
      {loading && <Text style={styles.loading}>Cargando...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3ccb8',
  },
  header: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#d3ccb8',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  column: {
    justifyContent: 'space-between',
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  loading: {
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Explorar;
