import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import {FinancialAcademyProps} from '../../interfaces/interfaces'

const FinancialAcademy: React.FC<FinancialAcademyProps> = ({ item }) => (
    <View  style={styles.container}>
    <ImageBackground
        source={item.image}
        style={styles.imageBackground}
        resizeMode="cover"
    />
    </View>
);

const styles = StyleSheet.create({
    container:{
        width: 148,
        height: 205,
        gap : 10 , 
        margin: 10,
        marginTop : 0,
        justifyContent : 'space-between',
        borderRadius : 12,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
      
    },
});

export default FinancialAcademy;
