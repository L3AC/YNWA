import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderDetailScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate a network request
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text style={styles.header}>Detalle del pedido</Text>
                <Text style={styles.total}>Total: $340</Text>
                <View style={styles.orderItem}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image source
                        style={styles.image}
                    />
                    <View style={styles.details}>
                        <Text style={styles.itemName}>Jordan 1</Text>
                        <Text style={styles.text}>Marca: Nike</Text>
                        <Text style={styles.text}>Talla: 3</Text>
                        <Text style={styles.text}>Cantidad: 2</Text>
                        <Text style={styles.text}>Subtotal: $180</Text>
                    </View>
                </View>
                <View style={styles.orderItem}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image source
                        style={styles.image}
                    />
                    <View style={styles.details}>
                        <Text style={styles.itemName}>Jordan 2</Text>
                        <Text style={styles.text}>Marca: Nike</Text>
                        <Text style={styles.text}>Talla: 7</Text>
                        <Text style={styles.text}>Cantidad: 1</Text>
                        <Text style={styles.text}>Subtotal: $160</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#d4d2b6', // Matching the background color from the image
    },
    backButton: {
        padding: 16,
    },
    backButtonText: {
        fontSize: 18,
        color: 'black',
    },
    container: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'flex-end',
    },
    orderItem: {
        flexDirection: 'row',
        backgroundColor: '#333333', // Matching the card color from the image
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
        color: '#fff', // Matching the text color from the image
    },
    text: {
        color: '#fff', // Matching the text color from the image
    },
});

export default OrderDetailScreen;
