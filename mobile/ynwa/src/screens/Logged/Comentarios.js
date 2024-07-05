import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';

const ComentariosScreen = ({ }) => {
  const [comentarios, setComentarios] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { idModelo } = route.params;

  const fetchComentarios = async () => {
    try {
      setRefreshing(true);
      const formData = new FormData();
      formData.append('idModelo', idModelo);
      formData.append('valor', search);

      const response = await fetch(`${SERVER}services/public/comentario.php?action=readAllActive`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.status === 1) {
        setComentarios(data.dataset || []);
      } else {
        //Alert.alert('No hay comentarios');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, [search]);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentDate}>{item.fecha_comentario}</Text>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>{item.cliente}</Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name={i < item.puntuacion_comentario ? "star" : "star-outline"}
              size={20}
              color="#FFA500"
            />
          ))}
        </View>
      </View>
      <Text style={styles.commentText}>{item.contenido_comentario}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
        <Icon name="arrow-back" size={34} />
      </TouchableOpacity>
      <Text style={styles.title}>Comentarios</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={search}
          onChangeText={handleSearch}
        />
        <Icon name="search" size={24} style={styles.searchIcon} />
      </View>
      <FlatList
        data={comentarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_comentario.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchComentarios} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D3BE',
    padding: 16,
  },
  backButton: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 29,
    backgroundColor: '#2C2B2B',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    marginBottom: 16,
    marginTop: 16,
  },
  searchIcon: {
    color: '#FFF',
  },
  commentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentDate: {
    color: '#A9A9A9',
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: 'row',
  },
  commentText: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
  },
});

export default ComentariosScreen;
