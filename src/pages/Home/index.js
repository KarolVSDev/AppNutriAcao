import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity, 
    FlatList,
    Alert,
    TextInput
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const { email, senha } = route.params || {}; 
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNoResults, setShowNoResults] = useState(false);
    const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do formulário
    const [formData, setFormData] = useState({
        nome: '',
        endereco: '',
        zona: ''
    });

    useEffect(() => {
        if (email && senha) {
            carregaDados();
        }
        carregaPontosColeta(); // Carrega os pontos de coleta ao montar o componente
    }, [email, senha]);

    function toggleFormVisibility() {
        setShowForm(!showForm); // Alternar entre mostrar e ocultar o formulário
    }
    function handleCloseForm() {
        setShowForm(false); // Fechar o formulário ao clicar no botão de "Cancelar"
    }

    async function carregaDados(){
        try {
            const response = await axios.post('http://192.168.100.8:3006/usuarios', {
                email: email,
                senha: senha
            });
            console.log(response.data);
            if (response.data && response.data.data) {
                setData(response.data.data); // Acessar os dados corretamente
            }
        } catch (error) {
            // Tratamento de erros
            if (error.response) {
                console.error('Erro no servidor:', error.response.data);
            } else if (error.request) {
                console.error('Erro na requisição:', error.request);
            } else {
                console.error('Erro:', error.message);
            }
        }
    }

    async function carregaPontosColeta(){
        try {
            const response = await axios.get('http://192.168.100.8:3006/pontos_coleta');
            console.log('Pontos de coleta:', response.data);
            if (Array.isArray(response.data)) {
                setData(response.data); // Atualizar a lista de dados com os pontos de coleta
            }
        } catch (error) {
            if (error.response) {
                console.error('Erro no servidor:', error.response.data);
            } else if (error.request) {
                console.error('Erro na requisição:', error.request);
            } else {
                console.error('Erro:', error.message);
            }
        }
    }

    const filteredData = data.filter(item => {
        return item && (item.nome.toLowerCase().includes(searchTerm.toLowerCase()) || item.endereco.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    useEffect(() => {
        setShowNoResults(searchTerm.length > 0 && filteredData.length === 0);
    }, [searchTerm, filteredData]);

    function toggleFormVisibility() {
        setShowForm(true); // Mostrar o formulário ao clicar no botão
    }

    async function handleSubmit() {
        // Verifica se algum campo está em branco
    if (!formData.nome || !formData.endereco || !formData.zona) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos antes de salvar.');
        return;
    }
        try {
            const response = await axios.post('http://192.168.100.8:3006/pontos_coleta', formData);
            console.log('Resposta do servidor:', response.data);

            // Atualizar a lista de dados com o novo ponto de coleta
            if (response.data && response.data.data) {
                setData(prevData => [...prevData, response.data.data]);
            }

            setFormData({
                nome: '',
                endereco: '',
                zona: ''
            });

            setShowForm(false);
        } catch (error) {
            if (error.response) {
                console.error('Erro no servidor:', error.response.data);
            } else if (error.request) {
                console.error('Erro na requisição:', error.request);
            } else {
                console.error('Erro:', error.message);
            }
        }
    }

    return (
        <View style={styles.container}>
    <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            onChangeText={text => setSearchTerm(text)}
            value={searchTerm}
        />
    </View>
    <Text style={styles.list}>Lista de Ongs em Manaus</Text>
    <FlatList 
        style={{ marginTop: 20 }}
        contentContainerStyle={{ marginHorizontal: 20 }}
        data={filteredData}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => item ? <ColetaCard data={item} /> : null}
    />
    {showNoResults && (
        <Text style={styles.noResultsText}>Nenhum resultado encontrado.</Text>
    )}

    {!showForm && (
        <TouchableOpacity style={styles.addButton} onPress={toggleFormVisibility}>
            <Text style={styles.addButtonText}>Inserir</Text>
        </TouchableOpacity>
    )}

    {showForm && (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                onChangeText={text => setFormData({...formData, nome: text})}
                value={formData.nome}
            />
            <TextInput
                style={styles.input}
                placeholder="Endereço"
                onChangeText={text => setFormData({...formData, endereco: text})}
                value={formData.endereco}
            />
            <TextInput
                style={styles.input}
                placeholder="Zona"
                onChangeText={text => setFormData({...formData, zona: text})}
                value={formData.zona}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={handleCloseForm}>
            <Text style={styles.closeButtonText}>Cancelar</Text>
         </TouchableOpacity>
        </View>
    )}
</View>
    );
}

function ColetaCard({ data }) {
    return (
        <TouchableOpacity style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{data.nome}</Text>
            <Text style={styles.cardText}>Endereço: {data.endereco}</Text>
            <Text style={styles.cardText}>Zona: {data.zona}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 50,
        marginHorizontal: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 5,
    },
    cardContainer: {
        backgroundColor: '#DD92F0',
        borderRadius: 8,
        padding: 20,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color:'white'
    },
    cardText: {
        fontSize: 16,
        marginBottom: 3,
        color:'white' ///
    },
    noResultsText: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 16,
        color:'#A1A1A1'
    },
    addButton: {
        backgroundColor: '#D4B4DC',
        padding: 10,
        borderRadius: 8,
        margin: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: '#E9CAF0',
        borderRadius: 8,
        padding: 20,
        margin: 20,
    },
    list: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black', 
        marginTop: 10, 
        marginTop: 10, 
        marginLeft: 20, 
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor:'#FFF'
    },
    closeButton: {
        backgroundColor: '#D4B4DC', 
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        marginTop:10

    },
    submitButton: {
        backgroundColor: '#D4B4DC',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});