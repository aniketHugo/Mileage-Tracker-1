import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../Navigation/Header';
import VehicleList from './VehicleList';
import FuelData from '../Refuel/FuelData';
import UseUserStore from '../../ZustandStore/ZuStore';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const Home = () => {
  const selectedUserName = UseUserStore((state) => state.selectedUserName);

  return (
    <SafeAreaView>

    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
      {/* <Sidebar/> */}
        
        <Image source={require('../../assets/Union.png')} style={styles.image} />
        <Text style={{ color: '#EB655F', fontSize: 20, marginTop: 20 }}> Hi {selectedUserName}  , </Text>
        <Text>Here is everything about your</Text>
  
        {1==2 ? (
          
          <Image source={require('../../assets/Maskgroup.png')} style={styles.image2} />
          
          ) : (
            <VehicleList />
            
            )}
        {/* or this */}

        <Image source={require('../../assets/image1.png')} style={styles.image3} />

        {/* <Text> Fuel Insights</Text> */}
        <View style={styles.fuelCard}>
          <View style={styles.card}>
            <Text style={styles.text, { fontSize: 18, fontWeight: 'bold' }}>Avg Fuel Consumption</Text>
            <Text style={styles.text}>25 km/l</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.text, { fontSize: 18, fontWeight: 'bold' }}>Last Fuel Consumption</Text>
            <Text style={styles.text}>25 km/l</Text>
          </View>
        </View>


        <FuelData />


      </ScrollView>

      </View>

            </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#C5E3DC',
  },
  image2 : {
    marginTop : 20,
    zIndex : 2,
  },
  image3 : {
    marginTop : 20
  },
  fuelCard: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-around', // Adjust spacing between cards
    alignItems: 'center', // Align items vertically
    marginTop: 50, // Adjust margin as needed
  },
  card: {
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
