import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import Header from '../../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AcademyCard from '../../Components/AcademyCard';
import FinancialAcademy from '../../Components/FinancialAcademy';
import { services, academyItems, academy } from '../../../interfaces/StaticData';
import { useFormContext } from '../../Store/Store';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import ServiceCard from '../../Components/ServiceCard';

const ExploreScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const { updateFormData } = useFormContext();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
    navigation.navigate('investment');
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
        <View style={{ marginTop: 10 }}>
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
              <View style={[styles.balanceContainer, { width: screenWidth * 0.85 }]}>
                <Text style={styles.balanceText}>
                  {item.amount}
                  <Text style={styles.currencyText}>{item.currency}</Text>
                </Text>
                <Text style={styles.viewMore}>View More</Text>
              </View>
            )}
          />
        </View>
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
              <Ionicons name="add" size={screenWidth * 0.07} color="#625EEE" style={styles.actionIcon} />
              <Text style={styles.actionText}>New goal</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons name="arrow-forward" size={screenWidth * 0.07} color="#625EEE" style={styles.actionIcon} />
              <Text style={styles.actionText}>Add fund</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name="list" size={screenWidth * 0.07} color="#625EEE" style={styles.actionIcon} />
              <Text style={styles.actionText}>Statement</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={academyItems}
            renderItem={({ item }) => <AcademyCard nav={handleAcademyCardPress} item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: screenWidth * 0.03 }}
          />

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: screenHeight * 0.015 }}>
            <Text style={styles.sectionTitle}>Service Hub</Text>
            <AntDesign name="right" size={screenWidth * 0.05} color="rgba(0, 0, 0, 0.5)" />
          </TouchableOpacity>

          <FlatList
            data={services}
            renderItem={({ item }) => <ServiceCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: screenWidth * 0.03 }}
          />

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: screenHeight * 0.02 }}>
            <Text style={styles.sectionTitle}>Service Hub</Text>
            <AntDesign name="right" size={screenWidth * 0.06} color="rgba(0, 0, 0, 0.5)" />
          </TouchableOpacity>

          <FlatList
            data={academy}
            renderItem={({ item }) => <FinancialAcademy item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: screenWidth * 0.03 }}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.05,
    textAlign: 'center',
  },
  planText: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: 'bold',
    margin: Dimensions.get('window').width * 0.05,
  },
  balanceText: {
    fontSize: Dimensions.get('window').width * 0.13,
    color: 'white',
    fontWeight: 'bold',
    width: '100%', // Ensure full width
    textAlign: 'left', // Align text to left
  },
  currencyText: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: 'white',
    fontWeight: '400',
  },
  paginationDots: {
    flexDirection: 'row',
    marginVertical: Dimensions.get('window').height * 0.02,
    alignSelf: 'center',
  },
  activeDot: {
    width: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').height * 0.005,
    borderRadius: 2,
    backgroundColor: 'white',
    marginHorizontal: 3,
  },
  inactiveDot: {
    width: Dimensions.get('window').width * 0.03,
    height: Dimensions.get('window').height * 0.005,
    borderRadius: 5,
    backgroundColor: '#bbb',
    marginHorizontal: 3,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: Dimensions.get('window').height * 0.02,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.02,
  },
  actionIcon: {
    padding: Dimensions.get('window').width * 0.04,
    borderWidth: 1,
    borderColor: '#625EEE26',
    borderRadius: 8,
    textAlign: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: Dimensions.get('window').width * 0.04,
    color: '#333',
  },
  sectionTitle: {
    fontSize: Dimensions.get('window').width * 0.045,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window').width * 0.05,
    color: 'rgba(0, 0, 0, 0.50)',
  },
  viewMore: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: 'white',
    textAlign: 'right',
    width: '90%',
  },
});

export default ExploreScreen;
