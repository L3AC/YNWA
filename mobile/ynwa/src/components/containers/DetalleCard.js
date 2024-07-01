

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SERVER } from '../../contexts/Network';

const DetalleCard = ({ item }) => {
    return (
        <View key={item.id_detalle ? item.id_detalle.toString() : Math.random().toString()} style={styles.orderItem}>
            <Image
                source={{ uri: `${SERVER}images/modelos/${item.foto_modelo}` }} // Reemplaza con la URL de tu imagen
                style={styles.image}
            />
            <View style={styles.details}>
                <Text style={styles.itemName}>{item.descripcion_modelo}</Text>
                <Text style={styles.text}>Marca: {item.descripcion_marca}</Text>
                <Text style={styles.text}>Talla: {item.descripcion_talla}</Text>
                <Text style={styles.text}>Cantidad: {item.cantidad_detalle_pedido}</Text>
                <Text style={styles.text}>Precio: ${item.precio_modelo_talla}</Text>
                <Text style={styles.text}>Subtotal: ${item.subtotal}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        flexDirection: 'row',
        backgroundColor: '#333333',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    image: {
        width: 90,
        height: 90,
        marginRight: 16,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#fff',
    },
    text: {
        color: '#fff',
    },
});

export default DetalleCard;
