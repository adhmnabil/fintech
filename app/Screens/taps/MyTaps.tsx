import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import ExploreScreen from './HomeScreen';
import { paths } from '../../../interfaces/Urls';

const Tab = createBottomTabNavigator();

const AcademyScreen = () => (
    <View style={styles.screenContainer}>
        <Text>Academy Screen</Text>
    </View>
);

const SavingsScreen = () => (
    <View style={styles.screenContainer}>
        <Text>Savings Screen</Text>
    </View>
);

const ServicesScreen = () => (
    <View style={styles.screenContainer}>
        <Text>Services Screen</Text>
    </View>
);

const SettingsScreen = () => (
    <View style={styles.screenContainer}>
        <Text>Settings Screen</Text>
    </View>
);

const MyTaps = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Explore') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Academy') {
                        iconName = focused ? 'bulb' : 'bulb-outline';
                    } else if (route.name === 'Savings') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'Services') {
                        iconName = focused ? 'grid' : 'grid-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#625EEE', 
                tabBarInactiveTintColor: 'gray',  
                headerShown: false,
                tabBarStyle:{
                    backgroundColor: '#FFFFFF',  
                    borderTopWidth: 0, 
                    height: 70, 
                    paddingBottom: 10,  
                    paddingTop: 10, 
                },
            })}
        >
            <Tab.Screen name={paths.Explore} component={ExploreScreen} />
            <Tab.Screen name={paths.Academy} component={AcademyScreen} />
            <Tab.Screen name={paths.Savings} component={SavingsScreen} />
            <Tab.Screen name={paths.Services} component={ServicesScreen} />
            <Tab.Screen name={paths.Settings} component={SettingsScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyTaps;
