import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SERVER } from '../../contexts/Network';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER}services/public/producto.php?action=readDesc`, {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok && data.status === 1) {
        setProductsData(data.dataset);
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

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER}services/public/noticia.php?action=readAllActive`, {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok && data.status === 1) {
        setNewsData(data.dataset);
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    fetchNews();
  }, []);

  useEffect(() => {
    fetchData();
    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % newsData.length;
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [newsData, width]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.logo}>YNWA</Text>

      <View style={styles.newsContainer}>
        <Text style={styles.sectionTitle}>Novedades</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          style={styles.carousel}
        >
          {newsData.map((news, index) => (
            <View key={index} style={[styles.newsItem, { width: width - 40 }]}>
              <Image source={{ uri: `${SERVER}images/noticias/${news.foto_noticia}` }} style={styles.newsImage} />
              <Text style={styles.newsTitle}>{news.titulo_noticia}</Text>
              <Text style={styles.contTitle}>{news.contenido_noticia}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>Lo más reciente</Text>
        <View style={styles.productsGrid}>
          {productsData.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.product}
              onPress={() => navigation.navigate('Modelo', { idModelo: product.id_modelo })}
            >
              <Image source={{ uri:`${SERVER}images/modelos/${product.foto_modelo}`}} style={styles.productImage} />
              <Text style={styles.productName}>{product.descripcion_modelo}</Text>
              <Text style={styles.productPrice}>{product.marca}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#cdc4a3', // Fondo similar al de la captura de pantalla
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#5c5c5c',
  },
  newsContainer: {
    marginBottom: 20,
  },
  carousel: {
    marginHorizontal: -20,
  },
  newsItem: {
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',

  },
  newsImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  newsTitle: {
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contTitle: {

    textAlign: 'center',
    fontWeight: 'bold',
    color: '#5c5c5c',
  },
  productsContainer: {
    marginBottom: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    textAlign: 'center',
    marginVertical: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  productPrice: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default HomeScreen;