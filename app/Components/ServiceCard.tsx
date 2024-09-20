import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity ,  } from 'react-native';
import { ServiceCardProps } from '../../interfaces/interfaces';

const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => { 
    return (
        <View style={[
            { backgroundColor: item.backgroundColor || 'white' } ,
            item.border ?  styles.serviceCard : styles.serviceCardMain
            ]}>
            {item.icon && <Image source={ item.icon } style={styles.icon} />}
            {item.image && <Image source={item.image }  style={styles.serviceImage} />}
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
        padding: 12,
        borderRadius: 10,
        margin: 10,
        marginTop : 1,
        justifyContent: 'space-around',
        alignItems : 'center',
        borderWidth: 1,
        borderColor: 'rgba(143, 143, 143, 1)',
        width: 148,
        height: 203,
        backgroundColor : '#625EEE26'
    },
    serviceCardMain: {
        padding: 12,
        borderRadius: 10,
        margin: 10,
        marginTop : 1,
        justifyContent: 'space-around',
        borderWidth: 2,
        borderColor: 'rgba(143, 143, 143, 1)',
        width: 150,
        height: 203,
    },
    serviceTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#636363',
        padding : 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#202020',
        width : 104,
    },
    serviceTitleNotMain: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#636363',
        marginTop : 20,
        
    },
    serviceDescription: {
        color: '#636363', 
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 14,
        marginVertical: 10,
    },
    requestButton: {
        backgroundColor: '#625EEE',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        width : '80%'
    },
    requestButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        
    },
    serviceImage: {
        width: '100%',
        height: 100,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    icon:{
        width : 30 ,
        height : 30,
        marginTop : 10
    }
});

export default ServiceCard;
