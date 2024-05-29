import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const UserPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.profileImage} source={require('../../assets/user.png')} />
        <Text style={styles.name}>Nome</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={styles.icon}>📧</Text>
          <Text style={styles.text}>email@gmail.com</Text>
          <TouchableOpacity style={styles.arrow}>
            <Text style={styles.arrowText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <Text style={styles.icon}>📞</Text>
          <Text style={styles.text}>(92) 99455-1622</Text>
          <TouchableOpacity style={styles.arrow}>
            <Text style={styles.arrowText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#white',
  },
  profile: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 80, // Definindo a largura desejada para a imagem do perfil
    height: 80, // Definindo a altura desejada para a imagem do perfil
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  details: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  arrow: {
    marginLeft: 'auto',
    padding: 5,
  },
  arrowText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#d4b4dd', 
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
  icon1: {
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

export default UserPage;
