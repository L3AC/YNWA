import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Importa el ícono de Ionicons
import { SERVER } from '../../contexts/Network';  // Importa la constante SERVER para las peticiones
import Confirm from '../buttons/Confirm';  // Importa el componente Confirm para el botón de confirmación

const DetalleCard = ({ item }) => {
    // Definición de estados locales
    const [modalVisible, setModalVisible] = useState(false);  // Controla la visibilidad del modal
    const [rating, setRating] = useState(0);  // Guarda la calificación seleccionada
    const [comment, setComment] = useState('');  // Guarda el comentario del usuario
    const [isCommentEditable, setIsCommentEditable] = useState(true);  // Controla si el comentario es editable
    const [isCommentAvailable, setIsCommentAvailable] = useState(false);  // Indica si ya existe un comentario

    const handleRatingPress = (value) => {
        setRating(value);
    };

    const verfiComent = async () => {
        try {
            const formData = new FormData();
            formData.append('idDetalle', item.id_detalle);
            const response = await fetch(`${SERVER}services/public/comentario.php?action=readByIdDetalle`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok && data.status === 1 && data.dataset) {
                setRating(parseInt(data.dataset[0].puntuacion_comentario));
                setComment(data.dataset[0].contenido_comentario);
                setIsCommentEditable(false);
                setIsCommentAvailable(true);
            } else {
                setRating(1);
                setComment('');
                setIsCommentEditable(true);
                setIsCommentAvailable(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const insertComent = async () => {
        try {
            const formData = new FormData();
            formData.append('idDetalle', item.id_detalle);
            formData.append('contenidoComentario', comment);
            formData.append('starValue', rating);
            const response = await fetch(`${SERVER}services/public/comentario.php?action=createRow`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok && data.status === 1) {
                Alert.alert('Éxito', 'Comentario agregado correctamente');
                setModalVisible(false);
            } else {
                Alert.alert('Error', 'No se pudo agregar el comentario');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Ocurrió un error al agregar el comentario');
        }
    };

    return (
        <View style={styles.orderItem}>
            <View style={styles.header}>
                <Text style={styles.itemName}>{item.descripcion_modelo}</Text>
                <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color="white"
                    onPress={() => {
                        verfiComent();
                        setModalVisible(true);
                    }}
                />
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
                                        name={star <= rating ? 'star' : 'star-outline'}
                                        size={24}
                                        color="#FFD700"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.commentInput}
                            value={comment}
                            onChangeText={text => setComment(text)}
                            editable={isCommentEditable}
                            multiline
                        />
                        <Confirm tittle="Agregar" onPress={insertComent} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

// Estilos para el componente DetalleCard
const styles = StyleSheet.create({
    orderItem: {
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    text: {
        fontSize: 14,
        color: 'white',
        marginBottom: 2,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    commentInput: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 12,
        textAlignVertical: 'top',
    },
});

export default DetalleCard;
