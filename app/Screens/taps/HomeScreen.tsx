import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
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
        <View style={{ marginTop: verticalScale(10) }}>
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
              <View style={[styles.balanceContainer, { width: scale(300) }]}>
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
              <Ionicons name="add" size={moderateScale(28)} color="#625EEE" style={styles.actionIcon} />
              <Text style={styles.actionText}>New goal</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons name="arrow-forward" size={moderateScale(28)} color="#625EEE" style={styles.actionIcon} />
              <Text style={styles.actionText}>Add fund</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name="list" size={moderateScale(28)} color="#625EEE" style={styles.actionIcon} />
              <Text style={styles.actionText}>Statement</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={academyItems}
            renderItem={({ item }) => <AcademyCard nav={handleAcademyCardPress} item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: scale(10) }}
          />

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: verticalScale(10) }}>
            <Text style={styles.sectionTitle}>Service Hub</Text>
            <AntDesign name="right" size={moderateScale(18)} color="rgba(0, 0, 0, 0.5)" />
          </TouchableOpacity>

          <FlatList
            data={services}
            renderItem={({ item }) => <ServiceCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: scale(10) }}
          />

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(15) }}>
            <Text style={styles.sectionTitle}>Service Hub</Text>
            <AntDesign name="right" size={moderateScale(20)} color="rgba(0, 0, 0, 0.5)" />
          </TouchableOpacity>

          <FlatList
            data={academy}
            renderItem={({ item }) => <FinancialAcademy item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: scale(10) }}
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
    marginHorizontal: scale(20),
    textAlign: 'center',
  },
  planText: {
    color: 'white',
    fontSize: scale(18),
    fontWeight: 'bold',
    margin: scale(20),
  },
  balanceText: {
    fontSize: scale(50),
    color: 'white',
    fontWeight: 'bold',
    width: '100%', 
    textAlign: 'left', 
  },
  currencyText: {
    fontSize: scale(18),
    color: 'white',
    fontWeight: '400',
  },
  paginationDots: {
    flexDirection: 'row',
    marginVertical: verticalScale(10),
    alignSelf: 'center',
  },
  activeDot: {
    width: scale(20),
    height: verticalScale(4),
    borderRadius: 2,
    backgroundColor: 'white',
    marginHorizontal: scale(3),
  },
  inactiveDot: {
    width: scale(10),
    height: verticalScale(4),
    borderRadius: 5,
    backgroundColor: '#bbb',
    marginHorizontal: scale(3),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: verticalScale(20),
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  actionIcon: {
    padding: moderateScale(15),
    borderWidth: 1,
    borderColor: '#625EEE26',
    borderRadius: 8,
    textAlign: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: scale(14),
    color: '#333',
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginLeft: scale(20),
    color: 'rgba(0, 0, 0, 0.50)',
  },
  viewMore: {
    fontSize: scale(12),
    color: 'white',
    textAlign: 'right',
    width: '90%',
  },
});

export default ExploreScreen;
