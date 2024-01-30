import React from 'react';
import { View, Button, Image, ScrollView, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VehiclesData from './VehiclesData';

const Vehicle = () => {
  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
            <VehiclesData/>       
          <Pressable onPress={() => Navigation.navigate('addVehicle')} style={styles.btn} >
            <Image source={require('../../assets/Large.png')}></Image>
          </Pressable>
          </View>
         <View style={styles.btn2}>
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
    flexDirection: 'column', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    marginTop: 50, 
  },
  rowCard: {
    backgroundColor: '#f0f0f0', 
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    minWidth: 370, 
  },
  text: {
    fontSize: 16,
    marginBottom: 10, 
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
export default Vehicle;
