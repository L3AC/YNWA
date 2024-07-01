import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

const AnimatedSplashScreen = ({ onAnimationEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const showAnimatedSplash = async () => {
      // Ocultar la pantalla de carga predeterminada
      await SplashScreen.hideAsync();

      // Reproducir el video de la pantalla de carga animada
      videoRef.current?.playAsync();

      // Esperar la duración del video para finalizar la animación
      const timer = setTimeout(() => {
        onAnimationEnd();
      }, 4000); // Ajusta el tiempo según la duración del video

      return () => clearTimeout(timer);
    };

    showAnimatedSplash();
  }, [onAnimationEnd]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('./../../assets/vid.mp4')} 
        style={styles.video}
        resizeMode="cover"
        shouldPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  video: {
    width,
    height,
  },
});

export default AnimatedSplashScreen;
