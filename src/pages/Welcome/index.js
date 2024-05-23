import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logon.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.loginAreaContainer}>
        <Image
          source={require('../../assets/container.png')}
          style={styles.loginAreaBackground}
        />
        <View style={styles.loginAreaContent}>
        <Text style={styles.welcomeText}>Bem-vindo(a) ao NutriAção!</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Entrar')}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Pergunta')}>
            <Text style={[styles.registerText, { color: '#B443D1' }]}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 280.5,
    height: 70,
  },
  loginAreaContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginAreaBackground: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  loginAreaContent: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  loginButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 13,
  },
  loginButtonText: {
    color: '#B443D1',
    fontSize: 16,
  },
  registerButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 80,
  },
  welcomeText: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 70,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    fontSize: 16,
  },
  
});

export default Welcome;
