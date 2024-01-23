import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Button, Pressable } from 'react-native';
import Header from '../../Navigation/Header';
import VehicleList from '../Refuel/VehicleList';
import UseUserStore from '../../ZustandStore/ZuStore';
import FuelData2 from './FuelData2';
import { useRealm } from '@realm/react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';

const Home = () => {
  const selectedUserName = UseUserStore((state) => state.selectedUserName);
  const selectedUserId = UseUserStore((state) => state.selectedUserId);
  const selectedVehicleImage = UseUserStore((state) => state.selectedVehicleImage);
  const setSelectedUserId = UseUserStore((state) => state.setSelectedUserId);
  const setSelectedUserName = UseUserStore((state) => state.setSelectedUserName);
  const realm = useRealm();
  const navigation = useNavigation();



  useEffect(() => {
    const fetchDataOnMount = async () => {
      const user = realm.objects('Authentication')[0];
      if (user) {
        console.log('Auth status user :- ', user.userId);
        const wt = await setSelectedUserId(user.userId)
        const wt2 = await setSelectedUserName(user.name)
        return;
      }
      else {
        console.warn('No user found');
        navigation.navigate("SignInStack")
        return;
      }
    };

    fetchDataOnMount();
  }, [selectedUserId, selectedVehicleImage]);

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
            {/* <Sidebar/> */}

            <Image source={require('../../assets/Union.png')} style={styles.image} />
            <Text style={{ color: '#EB655F', fontSize: 20, marginTop: 20 }}> Hi {selectedUserName}  </Text>
            <Text>Here is everything about your</Text>

            {1 == 2 ? (

              <Image source={require('../../assets/Maskgroup.png')} style={styles.image2} />

            ) : (
              <VehicleList />

            )}
            {/* or this */}

            {selectedVehicleImage != null && 

            <View style={styles.vehicleImage}> 
              <Image source={{ uri: selectedVehicleImage }} style={styles.image4} />
            </View>
            
            }


            {/* <Text> Fuel Insights</Text> */}


            <View style={styles.fuelCard2}>
              <View style={styles.card2}>
                <Text style={styles.text, { fontSize: 18, fontWeight: 'bold' }}>Avg Fuel Consumption</Text>
                <Text style={styles.text}>25 km/l</Text>
              </View>
              <View style={styles.card2}>
                <Text style={styles.text, { fontSize: 18, fontWeight: 'bold' }}>Last Fuel Consumption</Text>
                <Text style={styles.text}>25 km/l</Text>
              </View>
            </View>

            {/* <Image style={styles.performanceImg1} source={require('../../assets/Graph2.png')}></Image> */}


            <View style={styles.fuelDataContainer} >

              <View style={styles.fuelHeading}>
                <Text style={styles.fuelText} >Refuelling history</Text>
                <Pressable onPress={() => navigation.navigate('RefuelStack')}>
                  <Text style={styles.fuelText2}> see all ></Text>
                </Pressable>
              </View>
              <FuelData2 />
            </View>




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
    width: 300, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    borderRadius: 10,
  },
  vehicleImage : {
    marginTop: 20,
    borderWidth : 8,
    borderColor : 'white',
    borderRadius : 10,
    // elevation : 5,
  },
  performanceImg1: {
    // width : '100%'
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
    marginTop: 20,
    width: 100,
  },
  fuelCard2: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-around', // Adjust spacing between cards
    alignItems: 'center', // Align items vertically
    marginTop: 50, // Adjust margin as needed
    elevation: 3,
    backgroundColor: '#F0F2F2',
    width: '100%',
    paddingVertical: 20,
  },
  card2: {
    backgroundColor: 'white', // Card background color
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 150, // Card width
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 10, // Spacing between texts
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
