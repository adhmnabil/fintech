import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, ImageBackground , Animated } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import Header from '../../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ServiceCard from '../../Components/ServiceCard';
import AcademyCard from '../../Components/AcademyCard';
import FinancialAcademy from '../../Components/FinancialAcademy';
import {services , academyItems , academy} from '../../../interfaces/StaticData'
import { useFormContext } from '../../Store/Store';
import { useFonts } from 'expo-font';  
import AppLoading from 'expo-app-loading';

const ExploreScreen : React.FC  = () => {
    const navigation : any = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const {updateFormData} = useFormContext()
    const balanceData = [
        { id: '1', amount: '10,984', currency: 'AED' },
        { id: '2', amount: '5,242', currency: 'AED' },
        { id: '3', amount: '20,180', currency: 'AED' },
      ];

      const resetFormData = () => {
        updateFormData('goalName', '');
        updateFormData('amount', '');
        updateFormData('monthlyAmount', '');
        updateFormData('isMonthlyDeposit', false);
        updateFormData('selectedDay', '1');
        updateFormData('step', 1);
        updateFormData('questionStep', 0);
        updateFormData('selectedOptions', []);
    };
    const handleAcademyCardPress = () => {
        resetFormData();
        navigation.navigate('investment')
    };
    useEffect(() => {
      const interval = setInterval(() => {
        let newIndex = activeIndex === balanceData.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
        flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
      }, 3000);
  
      return () => clearInterval(interval);
    }, [activeIndex]);
  
    const onViewRef = useRef(({ viewableItems }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index);
      }
    });
  
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const [fontsLoaded] = useFonts({
        'PublicSans-Regular': require('../../../assets/fonts/Public_Sans/static/PublicSans-Regular.ttf'),
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                <Text style={styles.planText}>Gratuity Plan</Text>
                <FlatList
                     data={balanceData}
                     ref={flatListRef}
                     keyExtractor={(item) => item.id}
                     horizontal
                     pagingEnabled
                     showsHorizontalScrollIndicator={false}
                     onViewableItemsChanged={onViewRef.current}
                     viewabilityConfig={viewConfigRef.current}
                     renderItem={({ item }) => (
                       <View style={styles.balanceContainer}>
                         <Text style={styles.balanceText}>
                           {item.amount} 
                           <Text style={styles.currencyText}>{item.currency}</Text>
                         </Text>
                         <Text style={[
                            styles.viewMore
                         ]}>View More</Text>
                       </View>
                     )}
                />
      <View style={styles.paginationDots}>
        {balanceData.map((_, i) => (
          <View
            key={i}
            style={i === activeIndex ? styles.activeDot : styles.inactiveDot}
          />
        ))}
      </View>


                <View style={styles.contentContainer}>
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity>
                            <Ionicons name="add" size={28} color="#625EEE" style={styles.actionIcon} />
                            <Text style={styles.actionText}>New goal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons name="arrow-forward" size={28} color="#625EEE" style={styles.actionIcon} />
                            <Text style={styles.actionText}>Add fund</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Feather name="list" size={28} color="#625EEE" style={styles.actionIcon} />
                            <Text style={styles.actionText}>Statement</Text>
                        </TouchableOpacity>
                    </View>

          
                    <FlatList
                        data={academyItems}
                        renderItem={({ item }) => <AcademyCard nav={handleAcademyCardPress} item={item} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    />

               
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10  }}>
                        <Text style={styles.sectionTitle}>Service Hub</Text>
                        <AntDesign name="right" size={18} color="rgba(0, 0, 0, 0.5)" />
                    </TouchableOpacity>
                    <FlatList
                        data={services}
                        renderItem={({ item }) => <ServiceCard item={item} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    />
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' , marginTop : 15 }}>
                        <Text style={styles.sectionTitle}>Service Hub</Text>
                        <AntDesign name="right" size={20} color="rgba(0, 0, 0, 0.5)" />
                    </TouchableOpacity>
                    <FlatList
                        data={academy}
                        renderItem={({ item }) => <FinancialAcademy item={item} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#625EEE',
        fontFamily: 'PublicSans-Regular', 
    },
    balanceContainer: {
        width: 345, 
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        margin : 'auto',
        textAlign : 'center',
      },
    planText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 20,
    },
    balanceText: {
        fontSize: 56,
        color: 'white',
        fontWeight: 'bold',
        fontStyle : 'normal',
        width : '100%'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      checkboxLabel: {
        marginLeft: 8,
        color: 'white',
      },
    currencyText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '400',
    },
    paginationDots: {
        flexDirection: 'row',
        marginVertical: 20,
        alignSelf: 'center',
    },
    activeDot: {
        width: 20,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'white',
        marginHorizontal: 3,
    },
    inactiveDot: {
        width: 10,
        height: 4,
        borderRadius: 5,
        backgroundColor: '#bbb',
        marginHorizontal: 3
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 15, 
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent : 'center',
        gap : 15,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    actionIcon: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#625EEE26',
        borderRadius: 8,
        textAlign: 'center',
    },
    actionText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
    },
    card: {
        backgroundColor: '#F2F1FF',
        height: 121,
        width: 262,
        margin: 12,
        borderRadius: 10,
        padding: 15,
        justifyContent: 'space-between',
    },
    cardText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        maxWidth: '70%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 30,
        marginRight : 6,
        color: 'rgba(0, 0, 0, 0.50)',
    },
    serviceCard: {
        padding: 12,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'rgba(143, 143, 143, 1)',
        width: 148,
        height: 203,
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'rgba(99, 99, 99, 1)',
    },
    serviceDescription: {
        color: '#777',
        marginVertical: 10,
    },
    requestButton: {
        backgroundColor: '#625EEE',
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    requestButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    serviceImage: {
        width: '100%',
        height: 100,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    viewMore : {
        fontFamily: 'Public Sans',  
        fontSize: 12,               
        fontStyle: 'normal',        
        fontWeight: '400',          
        color : 'white', 
        width : '100%',
        textAlign : 'right',
    }
});

export default ExploreScreen;
