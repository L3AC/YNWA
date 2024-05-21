//export const IP = '192.168.137.1:80';
import { getLocalIpAddress } from 'react-native-local-ip-address';

export const getIpAddress = () => {
  try {
    return getLocalIpAddress();
  } catch (error) {
    console.error('Error al obtener la dirección IP:', error);
    return null;
  }
};