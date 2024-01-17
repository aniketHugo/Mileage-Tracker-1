import React from 'react';
import { View, Button, Image, ScrollView, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Header from '../../Navigation/Header';
import { useNavigation } from '@react-navigation/native';
import AddRefuel from './AddRefuel';
import VehicleList from '../Home/VehicleList';
import FuelData from './FuelData';

const NoVehicle = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.content}>
      {/* No vehicle exists :- */}
      <Image source={require('../../assets/Maskgroup.png')} style={styles.image2} />
      <Text style={styles.heading} > Add a vehicle to start tracking its refuelling & performance </Text>
      <Pressable onPress={() => navigation.navigate('addRefuel')} style={styles.btn3} >
        <Text style={styles.btnName}>
          Add Vehicle
        </Text>
      </Pressable>
    </View>
  )
}

const EmptyData = () => {
  const Navigation = useNavigation();
  return (
    <View>

      <View style={styles.content}>
        <Image source={require('../../assets/clowd.png')} style={styles.image1} />
        <Text style={styles.heading}>No refuelling records yet!</Text>
        <Text style={styles.heading}>Add a record using the + button below to begin your wealthcare journey</Text>
      </View>
        <View style={styles.btn2}>
          <Pressable onPress={() => Navigation.navigate('addRefuel')} style={styles.btn} >
            <Image source={require('../../assets/Large.png')}></Image>
          </Pressable>
        </View>
    </View>
  )
}

const VehicleExists = () => {
  const Navigation = useNavigation();
  return (
    <View>
      {/* Vehicle Exists */}
      <VehicleList />
      <FuelData />
      <View style={styles.btn2}>

        <Pressable onPress={() => Navigation.navigate('addRefuel')} style={styles.btn} >
          {/* <Text style={styles.btnName}>
            Add Fuel
          </Text> */}
          <Image source={require('../../assets/Large.png')}></Image>
        </Pressable>
      </View>
    </View>
  )
}


const Refuel = () => {
  let status = "";
  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Header /> */}

      <View style={styles.content}>
        {
          1 == 2 ? (
            NoVehicle()
          ) : (

            (1 == 3) ? (
              EmptyData()
            )
              :
              (
                VehicleExists()
              )
          )
        }

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F2',
  },
  btn2: {
    alignItems: 'flex-end',
    margin: 10
  },
  heading: {
    textAlign: 'center',
    margin: 20,
  },
  fuelData: {
    flexDirection: 'column', // Arrange items horizontally
    justifyContent: 'space-around', // Adjust spacing between cards
    alignItems: 'center', // Align items vertically
    marginTop: 50, // Adjust margin as needed
  },
  rowCard: {
    backgroundColor: '#f0f0f0', // Card background color
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    minWidth: 370, // Card width
  },
  text: {
    fontSize: 16,
    marginBottom: 10, // Spacing between texts
  },
  btn: {
    backgroundColor: '#0B3C58',
    padding: 10,
    // width : 100,
    color: 'blue',
    borderRadius: 100,
    marginTop: 10,
    alignItems: 'center'
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
  btnName: {
    color: 'white',

  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2: {
    backgroundColor: '#95C3BB',
    borderRadius: 180
  },
});
export default Refuel;
