import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

export default function Pergunta() {
    const navigation = useNavigation();
    return (
        <View style={styles.containerLogo}>
            <View style={styles.container}>
                <Animatable.Image
                    animation='flipInY'
                    source={require('../../assets/logon.png')}
                    resizeMode='contain'
                    style={styles.logo}
                />
            </View>
            <Animatable.View animation='fadeInUp' delay={600} style={styles.containerForm}>
                <Text style={styles.title}>Você é uma ONG?</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={styles.buttonText}>SIM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro_user')}>
                        <Text style={styles.buttonText}>NÃO</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#9B37B5',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: '10%',
        paddingHorizontal: '30%',
        paddingBottom: '5%',
        alignItems: 'center', // Centraliza horizontalmente
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center',
        maxWidth: '90%'
    },
    logo: {
        flex: 2,
        width: 300,
        height: 400,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'column', // Muda para coluna
        alignItems: 'center', // Centraliza horizontalmente
        width: '100%',
    },
    button: {
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 6,
        width: '80%',
        marginVertical: 10, // Adiciona espaço vertical entre os botões
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B543D1'
    }
});
