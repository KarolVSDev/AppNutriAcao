import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native'

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = () => {
        fetch('http://localhost:3001/cadastro', {
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
                console.log('Cadastro bem-sucedido');
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
            } else {
                Alert.alert('Erro', 'Erro ao cadastrar usuário');
            }
        })
        .catch((error) => {
            console.error('Erro ao cadastrar usuário:', error);
            Alert.alert('Erro', 'Erro ao cadastrar usuário');
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastre sua ONG</Text>
            <TextInput
                placeholder='Digite seu email...'
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder='Digite sua senha...'
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => setSenha(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#B543D1',
        width: '80%',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
