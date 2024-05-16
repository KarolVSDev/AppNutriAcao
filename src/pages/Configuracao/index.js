import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Config({navigation}){
    return(
        <View style={styles.container}>
            <Text>
                Página de configuração
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
});