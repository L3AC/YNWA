import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SERVER } from '../../contexts/Network';

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

    const fetchProfileData = async () => {
        try {
            const response = await fetch(`${SERVER}services/public/cliente.php?action=readProfile`, {
                method: 'POST'
            });
            const data = await response.json();
            if (data.status) {
                setProfileData(data.dataset); // Actualiza los datos del perfil
            } else {
                Alert.alert('Error', 'Failed to fetch profile data'); // Muestra un alerta en caso de error
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil'); // Muestra un alerta en caso de error
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