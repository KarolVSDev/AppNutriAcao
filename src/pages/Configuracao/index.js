import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Feather } from '@expo/vector-icons'; 
import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity, Modal } from 'react-native';

export default function Config({ navigation, userName }) {
  const [showTermos, setShowTermos] = useState(false);
  const [showSobreNos, setShowSobreNos] = useState(false);
  const [showAjuda, setShowAjuda] = useState(false); 

  const handlePress = () => {
    Linking.openURL('https://www.youtube.com/watch?v=jsn9leBhKik');
  };

  const handleWhatsAppPress = () => {
    Linking.openURL('https://wa.me/93984144376'); 
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
      <Text style={styles.config}>CONFIGURAÇÕES</Text>
      </View>

        <View style={styles.newSquare}>
          {/* Quadrados pequenos */}
          <TouchableOpacity style={styles.smallSquare} onPress={() => setShowTermos(true)}>
            <Text style={styles.squareText}>Termos de Serviço</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallSquare} onPress={() => setShowSobreNos(true)}>
            <Text style={styles.squareText}>Sobre Nós</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallSquare} onPress={() => setShowAjuda(true)}> 
            <Text style={styles.squareText}>Ajuda/FAQ</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallSquare} onPress={handleWhatsAppPress}>
            <Text style={styles.squareText}>Fale Conosco</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <Image style={styles.logo} source={require('../../assets/logonutri.png')} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.additionalText}>Quer ter acesso a conteúdos extras?</Text>
          <Text style={styles.additionalText}>Acesse nosso Site e fique por dentro {'\n'}das novidades!</Text>
        </View>

        <View style={styles.bottomSquareContainer}>
          <TouchableOpacity onPress={handlePress} style={styles.square}>
            <Text style={styles.textSquare}>SITE NUTRIAÇÃO</Text>
          </TouchableOpacity>
        </View>

        <Image style={styles.imgDade} source={require('../../assets/acessibilidade.png')} />
      </ScrollView>
      <StatusBar style="auto" />

      {/* Modal para exibir os Termos de Serviço */}
      <Modal visible={showTermos} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bem-vindo aos nossos Termos de Serviço!</Text>
            <Text style={styles.modalText}>
            Ao fazer parte desta comunidade, você concorda em respeitar as opiniões,
            ideias e direitos dos outros membros. Estamos comprometidos em promover 
            a diversidade, a inclusão e o respeito mútuo em todos os aspectos da nossa plataforma.
            Ao utilizar nossos serviços, você concorda em cumprir nossos termos
            de uso e diretrizes da comunidade. Isso inclui, mas não se limita a,
            manter a civilidade em suas interações, respeitar a privacidade dos 
            outros usuários e não violar os direitos autorais ou outros direitos de propriedade intelectual.
            </Text>
            <TouchableOpacity onPress={() => setShowTermos(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal para exibir a seção de Ajuda/FAQ */}
      <Modal visible={showAjuda} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajuda/FAQ</Text>
            <Text style={styles.modalText}>
            <Text style={styles.boldText}>1. Como faço para sair da conta?</Text>
              {'\n\n'}
              Vá para a página do perfil e clique em 'Sair'
              {'\n\n'}
              <Text style={styles.boldText}>2. Quais são os recursos disponíveis na plataforma?</Text>
              {'\n\n'}
              Você pode visualizar ONG's disponiveis e seus pontos de coleta e também cadastrar informações caso seja uma ONG.
              {'\n\n'}
              <Text style={styles.boldText}>3. Como acesso meu perfil?</Text>
              {'\n\n'}
              Clique no icon de usuário na parte inferior da tela
              {'\n\n'}
              <Text style={styles.boldText}>4. O que faço se esqueci minha senha?</Text>
              {'\n\n'}
              Entre em contanto com o suporte
              {'\n\n'}
              <Text style={styles.boldText}>5. Como faço para entrar em contato com o suporte técnico?</Text>
              {'\n\n'}
              Na tela de "Configurações" clique em "Fale conosco". 
              Você será encaminhado para o chat com o suporte.
            </Text>
            <TouchableOpacity onPress={() => setShowAjuda(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para exibir informações sobre a empresa */}
      <Modal visible={showSobreNos} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sobre Nós</Text>
            <Text style={styles.modalText}>
            Somos uma equipe de estudantes de ciência da computação unidos
            por nossa paixão pela tecnologia e inovação. 
            Nosso objetivo é criar uma comunidade onde pessoas de todas
             as origens possam se conectar, aprender e crescer juntas. 
             Estamos comprometidos em transformar ideias em realidade, 
             impulsionados pela curiosidade, criatividade e desejo de
             fazer a diferença. Junte-se a nós nesta jornada emocionante
             e seja parte da nossa história!
            </Text>
            <TouchableOpacity onPress={() => setShowSobreNos(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  card: {
    width: '100%',
    backgroundColor: '#B443D1',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 50,
    alignItems: 'center',
    marginTop: 40, 
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
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold', 
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
    marginTop: 10,
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
    marginTop:40,
    marginTop: -95,
  },
  additionalText: {
    color: '#712684',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 12,
    marginTop: -10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  bottomSquareContainer: {
    alignItems: 'center'
  },
  square: {
    width: 200,
    height: 40,
    backgroundColor: '#8D579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 20,
    marginTop: 0,
  },
  textSquare: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgDade: {
    width: 52,
    height: 52,
    alignSelf: 'flex-end',
    marginTop: 52,
    marginRight: 20,
  },
  modalContainer: {
    position: 'absolute',
    top: '-10%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#8D579A',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});