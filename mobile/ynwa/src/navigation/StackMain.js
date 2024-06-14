import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import StackHome from '../navigation/StackHome';
import StackExplorar from './StackExplorar';
import StackCuenta from '../navigation/StackCuenta';
import StackCart from '../navigation/StackCart';

const Tab = createBottomTabNavigator();

const StackMain = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="StackHome" component={StackHome} options={{ headerShown: false }} />
            <Tab.Screen name="StackExplorar" component={StackExplorar} options={{ headerShown: false }} />
            <Tab.Screen name="StackCart" component={StackCart} options={{ headerShown: false }} />
            <Tab.Screen name="StackCuenta" component={StackCuenta} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default StackMain;
