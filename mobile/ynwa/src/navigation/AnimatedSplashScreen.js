import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync(); // Previene que la pantalla de inicio se oculte automáticamente

const AnimatedSplashScreen = ({ onAnimationEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    videoRef.current?.playAsync();

    const timer = setTimeout(() => {
      hideSplashScreen();
      onAnimationEnd();
    }, 5000); // Ajusta el tiempo según la duración del video

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('./../../assets/vid.mp4')} // Asegúrate de que esta ruta sea correcta
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
