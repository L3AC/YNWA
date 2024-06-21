import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SERVER } from '../../contexts/Network';
import MapView, { Marker } from 'react-native-maps';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function PerfilScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [profileData, setProfileData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        usuario: '',
        direccion: ''
    });
    const [location, setLocation] = useState({
        latitude: 13.69294,  // Latitud de San Salvador, El Salvador
        longitude: -89.21819, // Longitud de San Salvador, El Salvador
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const mapRef = useRef(null);

    const fetchProfileData = async () => {
        try {
            const response = await fetch(`${SERVER}services/public/cliente.php?action=readProfile`, {
                method: 'POST'
            });
            const data = await response.json();
            if (data.status) {
                setProfileData(data.dataset); // Actualiza los datos del perfil
                // Obtener coordenadas de la dirección
                const address = data.dataset.direccion_cliente;
                fetchCoordinates(address);
            } else {
                Alert.alert('Error', 'Failed to fetch profile data'); // Muestra un alerta en caso de error
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil'); // Muestra un alerta en caso de error
        }
    };

    const fetchCoordinates = async (address) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newRegion = {
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                    latitudeDelta: 0.01,  // Reducir para acercar el mapa
                    longitudeDelta: 0.01, // Reducir para acercar el mapa
                };
                setLocation(newRegion);
                mapRef.current.animateToRegion(newRegion, 500);  // Anima el mapa al nuevo lugar
            } else {
                Alert.alert('Error', 'No se encontraron coordenadas para la dirección proporcionada');
            }
        } catch (error) {
            console.error('Error al obtener las coordenadas:', error);
            Alert.alert('Error', 'Error al obtener las coordenadas de la dirección');
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProfileData().then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.title}>Perfil</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput style={styles.input} value={profileData.nombre_cliente} />

                <Text style={styles.label}>Apellido</Text>
                <TextInput style={styles.input} value={profileData.apellido_cliente} />

                <Text style={styles.label}>Correo</Text>
                <TextInput style={styles.input} value={profileData.email_cliente} />

                <Text style={styles.label}>Usuario</Text>
                <TextInput style={styles.input} value={profileData.usuario_cliente} />

                <Text style={styles.label}>Dirección</Text>
                <TextInput style={styles.input} value={profileData.direccion_cliente} />
                
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={location}
                >
                    <Marker coordinate={location} />
                </MapView>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#cdc4a3',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    form: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        color: '#3e3e3e',
        marginBottom: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#3e3e3e',
        paddingVertical: 5,
        marginBottom: 20,
        fontSize: 16,
        color: '#3e3e3e',
    },
    map: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3e3e3e',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});
