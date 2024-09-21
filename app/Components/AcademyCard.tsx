import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AcademyCardProps } from '../../interfaces/interfaces';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AcademyCard: React.FC<AcademyCardProps> = ({ item, nav }) => {
    return (
        <TouchableOpacity onPress={() => nav()} style={styles.card}>
            <View style={styles.cardContent}>
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
        height: screenHeight * 0.16, 
        width: screenWidth * 0.75, 
        margin: screenWidth * 0.03, 
        borderRadius: 16,
        paddingRight: screenWidth * 0.03, 
        paddingLeft: screenWidth * 0.03, 
        paddingTop: screenHeight * 0.02, 
        paddingBottom: screenHeight * 0.02, 
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(100, 94, 255, 0.15)',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardText: {
        color: '#000',
        fontSize: screenWidth * 0.060,
        fontWeight: 'bold',
        maxWidth: '80%',
        fontFamily: 'PublicSans-Regular',
    },
    image: {
        width: screenWidth * 0.13,
        height: screenWidth * 0.13, 
    },
    actionText: {
        color: '#625EEE',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.03, 
    },
});

export default AcademyCard;
