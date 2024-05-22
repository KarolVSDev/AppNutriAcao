import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native';

export default function Config({navigation}) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <Image style={styles.img} source={require('../../assets/logoong.png')} />
                    <Text style={styles.titleText}>ONG BANCO DE ALIMENTOS</Text>
                </View>
                <View>
                    <Text style={styles.config}>CONFIGURAÇÕES</Text>
                </View>
                <View style={styles.newSquare}>
                    {/* Quadrados pequenos */}
                    <View style={styles.smallSquare}>
                        <Text style={styles.squareText}>Termos de Serviço</Text>
                        <Text style={styles.arrow}>→</Text>
                    </View>
                    <View style={styles.smallSquare}>
                        <Text style={styles.squareText}>Sobre Nós</Text>
                        <Text style={styles.arrow}>→</Text>
                    </View>
                    <View style={styles.smallSquare}>
                        <Text style={styles.squareText}>Ajuda/FAQ</Text>
                        <Text style={styles.arrow}>→</Text>
                    </View>
                    <View style={styles.smallSquare}>
                        <Text style={styles.squareText}>Fale Conosco</Text>
                        <Text style={styles.arrow}>→</Text>
                    </View>
                    <Image style={styles.logo} source={require('../../assets/logonutri.png')} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.additionalText}>Quer ter acesso a conteúdos extras?</Text>
                    <Text style={styles.additionalText}>Acesse nosso Site e fique por dentro {'\n'}das novidades!</Text>
                </View>

                <View style={styles.square}>
                    <Text style={styles.textSquare}>SITE NUTRIAÇÃO</Text>
                </View>

                <Image style={styles.imgDade} source={require('../../assets/acessibilidade.png')} />
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    // Add your other styles here...
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingBottom: 60, // Espaço para o quadrado na parte inferior
    },
    card: {
      width: '100%',
      backgroundColor: '#B443D1',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      padding: 20,
      alignItems: 'center',
    },
    img: {
      width: 92,
      height: 97,
    },
    titleText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 25,
    },
    config: {
      color: '#689F38',
      fontSize: 28,
      marginTop: 18,
    },
    newSquare: {
      backgroundColor: '#E9CAF0',
      width: 360,
      height: 400,
      marginTop: 22,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 50,
    },
    smallSquare: {
      backgroundColor: '#712685',
      width: 330,
      height: 40,
      marginTop: 7,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    squareText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    arrow: {
      color: '#ffffff',
      fontSize: 20,
      width: 25,
    },
    logo: {
      width: 55,
      height: 55,
      alignSelf: 'flex-start',
      marginTop: 22,
      marginLeft: 15,
    },
    textContainer: {
      marginLeft: 70,
      marginTop: -132,
    },
    additionalText: {
      color: '#712684',
      fontSize: 15,
      fontWeight: 'bold',
      margin: 12,
      marginTop: -10,
    },
    square: {
      width: 150,
      height: 30,
      backgroundColor: '#8D579A',
      borderWidth: 2,
      borderColor: '#ffffff',
      marginTop: 3,
      marginLeft: 12,
      borderRadius: 30,
    },
    textSquare: {
      color: '#ffff',
      fontSize: 15,
      fontWeight: 'bold',
      alignItems: 'center',
      marginLeft: 12,
      marginTop: 2,
    },
    imgDade: {
      width: 52,
      height: 52,
      alignSelf: 'flex-end',
      marginTop: 52,
      marginRight: 20,
    },
    bottomSquare: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
      backgroundColor: '#B443D1',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    icon: {
      width: 37,
      height: 37,
    },
    icon2: {
      width: 37,
      height: 37,
    },
    icon3: {
      width: 45,
      height: 45,
      marginTop: 10
    },
  });
  