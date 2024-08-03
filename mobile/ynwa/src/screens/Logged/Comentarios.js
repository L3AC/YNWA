// ComentariosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';
import Header from '../../components/containers/Header';
import SearchBar from '../../components/inputs/searchBar';

const ComentariosScreen = () => {
  const [comentarios, setComentarios] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { idModelo } = route.params;

 // Función asíncrona para obtener comentarios desde el servidor
const fetchComentarios = async () => {
  try {
    setRefreshing(true); // Indica que se está realizando una operación de actualización
    const formData = new FormData();
    formData.append('idModelo', idModelo); // Agrega el id del modelo al formulario
    formData.append('valor', search); // Agrega el valor de búsqueda al formulario

    // Realiza la solicitud POST para obtener comentarios activos
    const response = await fetch(`${SERVER}services/public/comentario.php?action=readAllActive`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json(); // Convierte la respuesta en formato JSON

    if (response.ok && data.status === 1) {
      setComentarios(data.dataset || []); // Actualiza el estado con los comentarios recibidos
    } else {
      // Alert.alert('No hay comentarios');
    }
  } catch (error) {
    console.error('Error:', error); // Manejo de errores
  } finally {
    setRefreshing(false); // Indica que la operación de actualización ha terminado
  }
};

// useEffect que se ejecuta cada vez que cambia el valor de búsqueda (search)
useEffect(() => {
  fetchComentarios();
}, [search]);

// Función para manejar cambios en el campo de búsqueda
const handleSearch = (text) => {
  setSearch(text);
};

// Función para renderizar cada comentario
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

// Renderizado del componente
return (
  <View style={styles.container}>
    <Header onPress={() => navigation.goBack()} titulo={'Comentarios'} />
    <View style={styles.searchContainer}>
        <SearchBar
        placeholder="Buscar comentarios..."
        onChangeText={handleSearch}
        value={search}
        onSubmitEditing={() => fetchComentarios()}
      />
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
    backgroundColor: '#cdc4a3',
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
    marginTop:25,
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
