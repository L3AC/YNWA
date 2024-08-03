import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import SearchBar from '../../components/inputs/searchBar';
import Card from '../../components/containers/Card';

const Explorar = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOdd, setIsOdd] = useState(false);

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    QuickSand: require("../../../assets/fonts/Quicksand-Regular.ttf"),
    QuickSandBold: require("../../../assets/fonts/Quicksand-Bold.ttf"),
  });

  useEffect(() => {
    fetchData(search);
  }, [search]);

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
        setData(data.dataset || []);
        setIsOdd(data.dataset.length % 2 !== 0);
      } else {
        Alert.alert('Error', data.message);
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

  const renderCard = (item, index) => (
    <Card key={index} item={item} onPress={(id) => navigation.navigate('Modelo', { idModelo: id })} />
  );

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { flexGrow: 1 }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Buscar modelos..."
          onChangeText={handleSearchChange}
          value={search}
        />
      </View>
      <Text style={styles.title}>Explorar Modelos</Text>
      <View style={styles.menuContainer}>
        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          data.map(renderCard)
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#cdc4a3',
    flexGrow: 1,
  },
  searchBarContainer: {
    marginBottom: 30,
    marginTop:50,
  },
  searchIcon: {
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'QuickSandBold',
    color: '#333',
  },
  menuContainer: {
    paddingBottom: 70,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Explorar;
