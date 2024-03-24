import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = async () => {
        try {
            const response = await fetch('http://192.168.100.8:3003/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    cnpj: cnpj,
                    telefone: telefone,
                    cep: cep,
                    rua: rua,
                    numero: numero,
                    senha: senha,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', data.message);
            } else {
                Alert.alert('Erro', data.message);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            Alert.alert('Erro', 'Erro ao cadastrar usuário');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastre sua ONG</Text>
            <TextInput
                placeholder='Nome'
                style={styles.input}
                onChangeText={(text) => setNome(text)}
            />
            <TextInput
                placeholder='Email'
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder='CNPJ'
                style={styles.input}
                onChangeText={(text) => setCnpj(text)}
            />
            <TextInput
                placeholder='Telefone'
                style={styles.input}
                onChangeText={(text) => setTelefone(text)}
            />
            <TextInput
                placeholder='CEP'
                style={styles.input}
                onChangeText={(text) => setCep(text)}
            />
            <TextInput
                placeholder='Rua'
                style={styles.input}
                onChangeText={(text) => setRua(text)}
            />
            <TextInput
                placeholder='Número'
                style={styles.input}
                onChangeText={(text) => setNumero(text)}
            />
            <TextInput
                placeholder='Senha'
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
