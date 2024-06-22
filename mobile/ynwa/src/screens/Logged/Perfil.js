import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SERVER } from '../../contexts/Network';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function PerfilScreen() {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [profileData, setProfileData] = useState({
        nombre_cliente: '',
        apellido_cliente: '',
        email_cliente: '',
        usuario_cliente: '',
        direccion_cliente: ''
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

                // Actualizar las coordenadas directamente desde el JSON recibido
                const newRegion = {
                    latitude: parseFloat(data.dataset.lat),
                    longitude: parseFloat(data.dataset.lon),
                    latitudeDelta: 0.01,  // Reducir para acercar el mapa
                    longitudeDelta: 0.01, // Reducir para acercar el mapa
                };
                setLocation(newRegion);
                mapRef.current.animateToRegion(newRegion, 500);  // Anima el mapa al nuevo lugar
            } else {
                Alert.alert('Error', 'Failed to fetch profile data'); // Muestra un alerta en caso de error
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil'); // Muestra un alerta en caso de error
        }
    };

    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.01,  // Reducir para acercar el mapa
            longitudeDelta: 0.01, // Reducir para acercar el mapa
        };
        setLocation(newRegion);

        mapRef.current.animateToRegion(newRegion, 500);  // Anima el mapa al nuevo lugar

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
            const data = await response.json();
            if (data && data.display_name) {
                const formattedAddress = data.display_name;
                setProfileData((prevData) => ({
                    ...prevData,
                    direccion_cliente: formattedAddress
                }));
            } else {
                setProfileData((prevData) => ({
                    ...prevData,
                    direccion_cliente: 'Dirección no disponible'
                }));
            }
        } catch (error) {
            console.error('Error al obtener la dirección:', error);
            setProfileData((prevData) => ({
                ...prevData,
                direccion_cliente: 'Error al obtener la dirección'
            }));
        }
    };

    const handleClearAddress = () => {
        setProfileData((prevData) => ({
            ...prevData,
            direccion_cliente: ''
        }));
        const newRegion = {
            latitude: 13.69294,  // Latitud de San Salvador, El Salvador
            longitude: -89.21819, // Longitud de San Salvador, El Salvador
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        setLocation(newRegion);
        mapRef.current.animateToRegion(newRegion, 500);  // Anima el mapa al lugar por defecto
    };
    const editP = async () => {
        try {
            const formData = new FormData();
            formData.append('nombreCliente', profileData.nombre_cliente);
            formData.append('apellidoCliente', profileData.apellido_cliente);
            formData.append('correoCliente', profileData.email_cliente);
            formData.append('direccionCliente', profileData.direccion_cliente);
            formData.append('aliasCliente', profileData.usuario_cliente);
            formData.append('lat', location.latitude);
            formData.append('lon', location.longitude);

            console.log(profileData);

            const response = await fetch(`${SERVER}services/public/cliente.php?action=editProfile`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.status) {
                Alert.alert(data.message);
            } else {
                console.log(data);
                Alert.alert(data.error);
            }
        } catch (error) {
            console.error('Error :', error);
            console.log(error);
            Alert.alert('Error', 'Error al registrar');
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
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Perfil</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    value={profileData.nombre_cliente}
                    onChangeText={(text) => setProfileData((prevData) => ({ ...prevData, nombre_cliente: text }))}
                />

                <Text style={styles.label}>Apellido</Text>
                <TextInput
                    style={styles.input}
                    value={profileData.apellido_cliente}
                    onChangeText={(text) => setProfileData((prevData) => ({ ...prevData, apellido_cliente: text }))}
                />
                <Text style={styles.label}>Correo</Text>
                <TextInput
                    style={styles.input}
                    value={profileData.email_cliente}
                    onChangeText={(text) => setProfileData((prevData) => ({ ...prevData, email_cliente: text }))}
                />
                <Text style={styles.label}>Usuario</Text>
                <TextInput
                    style={styles.input}
                    value={profileData.usuario_cliente}
                    onChangeText={(text) => setProfileData((prevData) => ({ ...prevData, usuario_cliente: text }))}
                />
                <Text style={styles.label}>Dirección</Text>
                <View style={styles.addressContainer}>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        value={profileData.direccion_cliente}
                        multiline={true}
                        onChangeText={(text) => setProfileData((prevData) => ({ ...prevData, direccion_cliente: text }))}
                    />
                    <TouchableOpacity style={styles.clearButton} onPress={handleClearAddress}>
                        <Text style={styles.clearButtonText}>Limpiar</Text>
                    </TouchableOpacity>
                </View>

                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={location}
                    onPress={handleMapPress}
                >
                    <Marker coordinate={location} />
                </MapView>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => editP()}>
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
        marginBottom: 40,
        marginTop: 45,
        justifyContent: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
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
        flex: 1,
    },
    multilineInput: {
        height: 100, // Ajusta la altura según tus necesidades
        textAlignVertical: 'top', // Alinea el texto al principio del TextInput
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    clearButton: {
        backgroundColor: '#0000',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    clearButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
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
