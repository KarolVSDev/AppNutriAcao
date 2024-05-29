import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import{Feather} from '@expo/vector-icons';

import Entrar from '../pages/Entrar';
import Cadastro_user from '../pages/Cadastro_user';
import Pergunta from '../pages/Pergunta';
import Welcome from '../pages/Welcome';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
import Usuario from '../pages/Usuario';
import Config from '../pages/Configuracao';
import Acessibilidade from '../pages/Acessibilidade';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>

            <Tab.Screen name="home" component={Home}
            options={{
                tabBarIcon: ({color, size})=> <Feather name='home' color={color} size={size}/>,
                tabBarLabel: 'Inicío'
                
            }}>
            </Tab.Screen>
            <Tab.Screen name="usuario" component={Usuario}
            options={{
                 tabBarIcon: ({color, size})=> <Feather name='user' color={color} size={size}/>,
                  tabBarLabel: 'usuário'
                            
              }}></Tab.Screen>
            <Tab.Screen name="config" component={Config}
            options={{
                tabBarIcon: ({color, size})=> <Feather name='settings' color={color} size={size}/>,
                 tabBarLabel: 'Configuração'
                           
             }}    
                   
            ></Tab.Screen>
        </Tab.Navigator>
    )
}
export default function Routes() {
    return (
            <Stack.Navigator screenOptions={{headerShown:false}} >
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
                options={{headerShown: false}}
            />
               <Stack.Screen 
                name="Home" 
                component={Tabs} 
            />
             <Stack.Screen 
                name="Pergunta" 
                component={Pergunta} 
            />
             <Stack.Screen 
                name="Cadastro_user" 
                component={Cadastro_user} 
            />
             <Stack.Screen 
                name="Acessibilidade" 
                component={Acessibilidade} 
            />

            </Stack.Navigator>

    );
}
