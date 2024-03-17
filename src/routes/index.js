import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Entrar from '../pages/Entrar';
import Welcome from '../pages/Welcome';
import Cadastro from '../pages/Cadastro';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
            <Stack.Navigator >
                <Stack.Screen 
                name="Welcome" 
                component={Welcome} 
                options={{headerShown: false}}
            />
                <Stack.Screen 
                name="Entrar" 
                component={Entrar} 
                options={{headerShown: false}}
            />
                <Stack.Screen 
                name="Cadastro" 
                component={Cadastro} 
            />
            </Stack.Navigator>
    );
}
