import React from 'react';
    import * as Animatable from 'react-native-animatable'
    import {useNavigation} from '@react-navigation/native'




    import {
        View,
        Text,
        StyleSheet,
        TouchableOpacity,
        Image
    } from 'react-native';


    export default function Welcome() {
        const navigation = useNavigation();
        return (
            <View style={styles.containerLogo}>
                <View style={styles.container}>
                   
                    <Animatable.Image
                        animation='flipInY'
                        source={require('../../assets/logo.png')}
                        resizeMode='contain'
                        style={styles.logo}
                    />
                </View>
                <Animatable.View animation='fadeInUp' delay={600} style={styles.containerForm}>
                    <Text style={styles.title}>Bem vindo ao NutriAção</Text>
                    <Text style={styles.text}>Faça o Login para começar</Text>
                   
                    <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Entrar')}>
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>


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
        paddingHorizontal:'25%',
        paddingBottom:'5%'
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center', // Centraliza verticalmente o texto e o botão
        alignItems: 'center' // Centraliza horizontalmente o texto e o botão
    },
   
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center',
        maxWidth:'90%'
    },
    text:{
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        color: '#a1a1a1'
    },
    logo: {
        flex: 2,
        width: 300,
        height: 400,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 6,
        position: 'absolute',
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B543D1'
    }
    });