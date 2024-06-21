import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Puedes usar otra familia de iconos si lo prefieres
import StackHome from '../navigation/StackHome';
import StackExplorar from './StackExplorar';
import StackCuenta from '../navigation/StackCuenta';
import StackCart from '../navigation/StackCart';

const Tab = createBottomTabNavigator();

const StackMain = () => {
    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'StackHome') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'StackExplorar') {
                            iconName = focused ? 'search' : 'search-outline';
                        } else if (route.name === 'StackCart') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        } else if (route.name === 'StackCuenta') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return (
                            <View style={{
                                backgroundColor: focused ? 'black' : 'transparent',
                                borderRadius: 10,
                                padding: 5
                            }}>
                                <Icon name={iconName} size={size} color={focused ? 'white' : color} />
                            </View>
                        );
                    },
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: 'white',  // Color del icono cuando la pestaña está activa
                    tabBarInactiveTintColor: 'gray',  // Color del icono cuando la pestaña está inactiva
                    tabBarStyle: { backgroundColor: 'black' },  // Fondo de la barra de pestañas
                })}
            >
                <Tab.Screen name="StackHome" component={StackHome} options={{ headerShown: false }} />
                <Tab.Screen name="StackExplorar" component={StackExplorar} options={{ headerShown: false }} />
                <Tab.Screen name="StackCart" component={StackCart} options={{ headerShown: false }} />
                <Tab.Screen name="StackCuenta" component={StackCuenta} options={{ headerShown: false }} />
            </Tab.Navigator>
    );
};

export default StackMain;
