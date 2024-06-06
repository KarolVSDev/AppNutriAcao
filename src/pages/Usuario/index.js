import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const UserPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Recupera os dados do usuário armazenados localmente
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          console.log('Dados do usuário recuperados:', parsedUserData);
          setUserData(parsedUserData.data);  
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
     // saveImageURI(result.assets[0].uri); // Salva a URI da imagem no AsyncStorage
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = async () => {
    // Limpa os dados do usuário armazenados localmente ao fazer logout
    await AsyncStorage.removeItem('userData');
    // Não é necessário limpar a URI da imagem ao fazer logout
    navigation.navigate('Entrar');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Adicionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>
        {userData && (
          <Text style={styles.name}>{userData.nome}</Text>
        )}
      </View>
      {/* Detalhes do usuário */}
      <View style={styles.details}>
        <View style={styles.detail}>
          <FontAwesome name="envelope" size={20} style={styles.icon} />
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.text}>{userData ? userData.email : ''}</Text>
        </View>
        <View style={styles.detail}>
          <FontAwesome name="phone" size={20} style={styles.icon} />
          <Text style={styles.label}>Telefone: </Text>
          <Text style={styles.text}>{userData ? userData.telefone : ''}</Text>
        </View>
        <View style={styles.detail}>
          <FontAwesome name="lock" size={20} style={styles.icon} />
          <Text style={styles.label}>Senha: </Text>
          <Text style={styles.text}>
            {showPassword ? userData.senha : '********'}
          </Text>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.showPasswordText}>
              {showPassword ? 'Esconder' : 'Mostrar'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <FontAwesome name="map-marker" size={20} style={styles.icon} />
          <Text style={styles.label}>CEP: </Text>
          <Text style={styles.text}>{userData ? userData.cep : ''}</Text>
        </View>
        {/* Adicione mais detalhes conforme necessário */}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#828282',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginBottom: 18,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  text: {
    fontSize: 16,
  },
  showPasswordText: {
    fontSize: 16,
    color: 'blue',
    marginLeft: 10,
  },
  arrow: {
    marginLeft: 'auto',
    padding: 5,
  },
  arrowText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#B443D1',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButton: {
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserPage;
