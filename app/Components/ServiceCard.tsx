import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ServiceCardProps } from '../../interfaces/interfaces';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
    return (
        <View style={[
            { backgroundColor: item.backgroundColor || 'white' },
            item.border ? styles.serviceCard : styles.serviceCardMain
        ]}>
            {item.icon && <Image source={item.icon} style={styles.icon} />}
            {item.image && <Image source={item.image} style={styles.serviceImage} />}
            <Text style={[
                item.border ? styles.serviceTitle : styles.serviceTitleNotMain
            ]}>{item.title}</Text>
            {item.description && <Text style={styles.serviceDescription}>{item.description}</Text>}
            {item.buttonText && (
                <TouchableOpacity style={styles.requestButton}>
                    <Text style={styles.requestButtonText}>{item.buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    serviceCard: {
        padding: screenWidth * 0.03,
        borderRadius: 10,
        margin: screenWidth * 0.02, 
        marginTop: screenHeight * 0.01, 
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(143, 143, 143, 1)',
        width: screenWidth * 0.4, 
        height: screenHeight * 0.28, 
        backgroundColor: '#625EEE26',
    },
    serviceCardMain: {
        padding: screenWidth * 0.03, 
        borderRadius: 10,
        margin: screenWidth * 0.02, 
        marginTop: screenHeight * 0.01, 
        justifyContent: 'space-around',
        borderWidth: 2,
        borderColor: 'rgba(143, 143, 143, 1)',
        width: screenWidth * 0.42,
        height: screenHeight * 0.28, 
    },
    serviceTitle: {
        fontSize: screenWidth * 0.028, 
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#636363',
        padding: screenWidth * 0.02, 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#202020',
        width: screenWidth * 0.28, 
    },
    serviceTitleNotMain: {
        fontSize: screenWidth * 0.045, 
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#636363',
        marginTop: screenHeight * 0.03, 
    },
    serviceDescription: {
        color: '#636363',
        fontSize: screenWidth * 0.035, 
        fontWeight: '800',
        lineHeight: screenHeight * 0.02, 
        marginVertical: screenHeight * 0.015, 
    },
    requestButton: {
        backgroundColor: '#625EEE',
        paddingVertical: screenHeight * 0.015, 
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    requestButtonText: {
        color: 'white',
        fontSize: screenWidth * 0.025, 
        fontWeight: 'bold',
    },
    serviceImage: {
        width: '100%',
        height: screenHeight * 0.12,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    icon: {
        width: screenWidth * 0.08, 
        height: screenWidth * 0.08, 
        marginTop: screenHeight * 0.01, 
    },
});

export default ServiceCard;
