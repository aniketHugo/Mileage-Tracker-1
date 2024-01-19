import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../../Navigation/Header';
import VehicleList from '../Refuel/VehicleList';
import UseUserStore from '../../ZustandStore/ZuStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OpenApp from '../../utility/OpenApp';
import FuelData2 from './FuelData2';
import FuelData from '../Refuel/FuelData';
import { useRealm } from '@realm/react';
const Home = () => {
  const selectedUserName = UseUserStore((state) => state.selectedUserName);
  const selectedUserId = UseUserStore((state) => state.selectedUserId);
  const setSelectedUserId = UseUserStore((state) => state.setSelectedUserId);
  const setSelectedUserName = UseUserStore((state) => state.setSelectedUserName);
  const realm = useRealm();

  useEffect(() => {
    const fetchDataOnMount = async () => {
        const user = realm.objects('Authentication')[0];
        console.log('Auth status user :- ','user');
        if(user){
            const wt = await setSelectedUserId(user.userId)
            const wt2 = await setSelectedUserName(user.name)
            return ;
        }
        else{
            console.warn('No user found')
            return ;
        }
    };

    fetchDataOnMount();
  }, [selectedUserId]); 

  return (
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

          <Image source={require('../../assets/image1.png')} style={styles.image3} />

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



          <FuelData2/>

        </ScrollView>

      </View>

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container2: {
    // flex: 1,
    height : '100%',
    backgroundColor: '#C5E3DC',
  },
  image2: {
    marginTop: 20,
    zIndex: 2,
  },
  image3: {
    marginTop: 20
  },
  fuelCard2: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-around', // Adjust spacing between cards
    alignItems: 'center', // Align items vertically
    marginTop: 50, // Adjust margin as needed
  },
  card2: {
    backgroundColor: '#f0f0f0', // Card background color
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 150, // Card width
  },
  text: {
    fontSize: 16,
    marginBottom: 10, // Spacing between texts
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C5E3DC',
  },
});

export default Home;
