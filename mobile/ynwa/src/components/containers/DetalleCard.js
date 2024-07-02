import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SERVER } from '../../contexts/Network';

const DetalleCard = ({ item }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isCommentEditable, setIsCommentEditable] = useState(true);
    const [isCommentAvailable, setIsCommentAvailable] = useState(false);

    const handleRatingPress = (value) => {
        setRating(value);
    };

    const verfiComent = async () => {
        try {
            const formData = new FormData();
            formData.append('idDetalle', item.id_detalle);
            console.log(item.id_detalle);
            const response = await fetch(`${SERVER}services/public/comentario.php?action=readByIdComentario`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (response.ok && data.status === 1 ) {
                
                setRating(data.dataset.puntuacion_comentario);
                setComment(data.dataset.contenido_comentario);
                setIsCommentEditable(false);
                setIsCommentAvailable(true);
            } else {
                setRating(0);
                setComment('');
                setIsCommentEditable(true);
                setIsCommentAvailable(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View key={item.id_detalle ? item.id_detalle.toString() : Math.random().toString()} style={styles.orderItem}>
            <View style={styles.header}>
                <Text style={styles.itemName}>{item.descripcion_modelo}</Text>
                <Ionicons name="chatbubble-outline" size={24} color="white" onPress={() => {
                    verfiComent();
                    setModalVisible(true);
                }} />
            </View>
            <View style={styles.content}>
                <Image
                    source={{ uri: `${SERVER}images/modelos/${item.foto_modelo}` }}
                    style={styles.image}
                />
                <View style={styles.details}>
                    <Text style={styles.text}>Marca: {item.descripcion_marca}</Text>
                    <Text style={styles.text}>Talla: {item.descripcion_talla}</Text>
                    <Text style={styles.text}>Cantidad: {item.cantidad_detalle_pedido}</Text>
                    <Text style={styles.text}>Precio: ${item.precio_modelo_talla}</Text>
                </View>
                <Text style={styles.price}>${item.subtotal}</Text>
            </View>

            {/* Modal Component */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
                    <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                        <Text style={styles.modalTitle}>{isCommentAvailable ? 'Comentario' : 'Agregar comentario'}</Text>
                        <View style={styles.stars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => isCommentEditable && handleRatingPress(star)}>
                                    <Ionicons
                                        name={star <= rating ? "star" : "star-outline"}
                                        size={30}
                                        color="orange"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.commentLabel}>Comentario</Text>
                        <TextInput
                            style={styles.textArea}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Escribe tu comentario aquí..."
                            value={comment}
                            onChangeText={setComment}
                            editable={isCommentEditable}
                        />
                        {isCommentEditable && (
                            <TouchableOpacity style={styles.confirmButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.confirmButtonText}>Confirmar</Text>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        backgroundColor: '#333333',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 90,
        height: 90,
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        marginVertical: 2,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    commentLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    textArea: {
        width: '100%',
        height: 80,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DetalleCard;
