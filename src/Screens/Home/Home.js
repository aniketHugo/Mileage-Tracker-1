import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { useRealm } from '@realm/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import UseUserStore from '../../ZustandStore/ZuStore';
import FetchRefuelData from '../../API/FetchRefuelData';
import Header from '../../Navigation/Header';
import VehicleList from '../Refuel/VehicleList';
import FuelData2 from './FuelData2';
import MoneyGraph from '../Performance/MoneyGraph';
import FuelInsights from './FuelInsights';

const Home = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const mystore = UseUserStore();
  
  useFocusEffect( 
    useCallback(() => {
      const fetchRefuelData = async () => {
        try {
          const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId,mystore);
        } catch (error) {
          console.log('Error fetching refuel data:', error);
        }
      };
      fetchRefuelData();
    }, [mystore.selectedUserId, mystore.selectedVehicleImage, mystore.refuelSelectedVehicleId])
  );
  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView>
        <View style={styles.container2}>
          <Header />
          <ScrollView contentContainerStyle={styles.content}>
            <Image source={require('../../assets/Union.png')} style={styles.image} />
            <Text style={{ color: '#EB655F', fontSize: 20, marginTop: 20 }}> Hi {mystore.selectedUserName}  </Text>
            <Text>Here is everything about your</Text>

            {mystore.vehicleLength == 0 ? (
              <View style={styles.content}>
                <Image source={require('../../assets/Maskgroup.png')} style={styles.image3} />
                <Text style={styles.heading2} > Add a vehicle to start tracking its {'\n'} refuelling & performance </Text>
                <Pressable onPress={() => navigation.navigate('addVehicle' , {screen : "VehicleStack"})} style={styles.btn3} >
                  <Text style={styles.btnName}>
                    Add Vehicle
                  </Text>
                </Pressable>
              </View>
            ) : (
              <>
                <VehicleList />

                {mystore.selectedVehicleImage != null &&
                  <View style={styles.vehicleImage}>
                    <Image source={{ uri: mystore.selectedVehicleImage }} style={styles.image4} />
                  </View>
                }

                {mystore.refuelData.length == 0 ?
                  <View style={styles.noData}>
                  <View style={styles.content3}>
                    <Image source={require('../../assets/clowd.png')} style={styles.image1} />
                    <Text style={styles.heading4}>It’s time to add the refuelling details to get more insights</Text>
                  </View>
                    <View style={styles.btn2}>
                      <Pressable onPress={() => navigation.navigate('addRefuel' ,{screen : 'RefuelStack'})} style={styles.btn} >
                        <Text style={styles.btnName}>Add Refuelling</Text>
                      </Pressable>
                    </View>
                </View>
                  :
                  <>
                    <View style={styles.heading}>
                      <Text style={styles.fuelText}> Fuel Insights</Text>
                    </View>

                    <FuelInsights />

                    <View style={styles.heading}>
                      <Text style={styles.fuelText}>Money spend on fuel</Text>
                    </View>
                    <MoneyGraph />
                    <View style={styles.fuelDataContainer} >
                      <View style={styles.fuelHeading}>
                        <Text style={styles.fuelText} >Refuelling history</Text>
                        <Pressable onPress={() => navigation.navigate('RefuelStack')}>
                          <Text style={styles.fuelText2}> see all </Text>
                        </Pressable>
                      </View>
                      <FuelData2 />
                    </View>
                  </>
                }
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({

  container2: {
    height: '100%',
  },
  image2: {
    marginTop: 20,
    zIndex: 2,
  },
  image4: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  heading4: {
    textAlign: 'center',
    margin: 20,
  },
  noData : {
    marginVertical : 20,
  },
  content3: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading2: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
  },
  image3: {
    backgroundColor: '#95C3BB',
    borderRadius: 180
  },
  heading: {
    // backgroundColor : 'red',
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  vehicleImage: {
    marginTop: 20,
    borderWidth: 8,
    borderColor: 'white',
    borderRadius: 10,
    // elevation : 5,
  },
  btn3: {
    backgroundColor: '#0B3C58',
    padding: 10,
    width: 100,
    color: 'blue',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  btn: {
    alignSelf : 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#0B3C58',
    padding: 10,
    width: 250,
    borderRadius: 10,
    marginTop: 10,
  },
  btnName: {
    color: 'white',
  },
  fuelText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  fuelText2: {
    fontSize: 20,
    // fontWeight : 'bold',
    color: '#B84646',

  },
  fuelDataContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F0F2F2',
    marginTop: 30,
  },
  fuelHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,

  },
  image3: {
    backgroundColor: '#95C3BB',
    borderRadius: 180,
  },
  fuelCard2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: '#F0F2F2',
    width: '100%',
    paddingVertical: 20,
  },
  card2: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 150,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    flexGrow: 1,
    // paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#C5E3DC',
  },
});

export default Home;
