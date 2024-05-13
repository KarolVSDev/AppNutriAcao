    import React, { useState, useEffect } from 'react';
    import * as Animatable from 'react-native-animatable'
    import {useNavigation} from '@react-navigation/native'

    import axios from 'axios';

    import { 
        View,
        Text,
        StyleSheet,
        TouchableOpacity, 
        Image,
        FlatList
    } from 'react-native';

    export default function Home() {
        const navigation = useNavigation();
        const [data, setData] = useState([
            
        ]);

        useEffect(()=>{
            carregaDados();
        },[]); //função chamada quando a página for redenrizada

        async function carregaDados(){
            const response = await axios.get('http://192.168.100.8:3006/usuarios');
            
            console.log(response.data);
            setData([...response.data]);
        }

        return (
            <View style={styles.container}>
                <FlatList style={{marginTop:35}}
                contentContainerStyle={{marginHorizontal:20}}
                data={data}
                keyExtractor={item => String(item.ongcod)}
                renderItem={({item}) => <ListItem data={item}/>} //passando dados para meu lisItem e renderizando ele
                />

            </View>
        );
    }

    function ListItem({data}){
        return(
            <View style={styles.listItem}>
                <TouchableOpacity>
                <Text style={styles.listText}>{data.nome}</Text>
                <Text style={styles.listText}>{data.rua}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFF'
        },
        containerLogo:{
            flex:2,
            backgroundColor:'#FFF',
            justifyContent: 'center',
            alignItems:'center'
        },
        containerForm:{
            flex:1,
            backgroundColor:'#9B37B5',
            borderTopLeftRadius:25,
            borderTopRightRadius: 25,
            paddingTop:'10%',
            paddingEnd:'15%'
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFF',
            marginBottom: 30,
            marginTop: 10,
            textAlign: 'center',    
    
        },
        text:{
            fontSize:15,
            textAlign: 'center',
            marginTop:100,
            marginBottom:12,
            color:'#a1a1a1'
        },
        logo: {
            flex:2,
            width: 300, // Defina o tamanho desejado
            height: 400, // Defina o tamanho desejado
            alignItems:'center'
        },
        button: {
            backgroundColor: '#FFF',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 6,
            position:'absolute',
            width:'60%',
            alignSelf:'center',
            bottom:'15%',
            alignItems:'center',
            justifyContent:'center'
        },
        buttonText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#B543D1'
        },
        listItem: {
            backgroundColor: '#B543D1',
            borderRadius: 10,
            padding: 25,
            marginTop: 20,
            width: '100%'
        },
        listText:{
            fontSize: 16,
            color: '#FFF'
        }
    });
