import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function Ong() {
    const navigation = useNavigation(); 
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [senha, setSenha] = useState('');

    const handleOng = async () => {
        if (!nome || !email || !cnpj || !telefone || !cep || !rua || !numero || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        try {
            const response = await fetch('http://192.168.100.8:3006/ongs', { // Rota para cadastro de ONG
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
                navigation.navigate('Entrar');
            } else {
                Alert.alert('Erro', data.message);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            Alert.alert('Erro', 'Erro ao cadastrar usuário');
        }
    };


    const pickImage = async () => {
        // Implemente aqui a função para selecionar uma imagem da galeria
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TouchableOpacity style={styles.circle} onPress={pickImage}>
                <FontAwesome name="user-circle-o" size={100} color="gray" />
            </TouchableOpacity>
            
            
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
            <TouchableOpacity style={styles.button} onPress={handleOng}>
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
        backgroundColor: '#B443D1',
    },
    title: {
        fontSize: 36,
        marginBottom: 20,
        color: 'white',
        fontWeight:'bold',
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 6,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: "white"
    },
    button: {
        backgroundColor: '#B443D1',
        width: '80%',
        borderRadius: 5,
        padding: 8,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    circle: {
        width: 125,
        height: 125,
        borderRadius: 125 / 2,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
});