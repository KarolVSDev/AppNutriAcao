import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Entrar() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        if (!email || !senha) {
            Alert.alert('Erro', 'Por favor, insira seu email e senha');
            return;
        }

        fetch('http://192.168.100.8:3006/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                senha: senha,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Login bem-sucedido');
                    //ao fazer o login vai pra tela do home
                    navigation.navigate('Home');
                    // Navegue para a próxima tela ou execute outra ação desejada
                } else {
                    Alert.alert('Erro', 'Credenciais inválidas');
                }
            })
            .catch((error) => {
                console.error('Erro ao fazer login:', error);
                Alert.alert('Erro', 'Erro ao fazer login');
            });
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation='fadeInUp' style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder='Digite um email...'
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder='Sua senha'
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => setSenha(text)}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B543D1"
    },
    containerHeader: {
        marginTop: "14%",
        marginBottom: '8%',
        paddingLeft: '5%'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    containerForm: {
        backgroundColor: '#FFF',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingLeft: '5%',
        paddingRight: "5%"
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#B543D1',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        color: "#a1a1a1"
    }
});
