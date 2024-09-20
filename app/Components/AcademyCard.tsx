import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {AcademyCardProps} from '../../interfaces/interfaces'

const AcademyCard : React.FC<AcademyCardProps> = ({ item  , nav}) => {
    return (
        <TouchableOpacity onPress={() => nav()} style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.cardText}>{item.title}</Text>
                <Image source={item.image} resizeMode="contain" style={styles.image} />
            </View>
            <Text style={styles.actionText}>{item.actionText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F2F1FF',
        height: 121,
        width: 270,
        margin: 12,
        borderRadius: 16,
        paddingRight: 12,
        paddingLeft : 12,
        paddingTop : 15,
        paddingBottom : 15,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(100, 94, 255, 0.15)',
    },
    cardText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        maxWidth: '70%',
        fontFamily: 'PublicSans-Regular', 
    },
    image: {
        width: 50,
        height: 50,
    },
    actionText: {
        color: '#625EEE',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default AcademyCard;
