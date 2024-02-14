import React from 'react';
import { View, Button, Image, ScrollView, Text, StyleSheet, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VehiclesData from './VehiclesData';
import { AddIcon } from '../../assets/IconsSvg';
import { SvgXml } from 'react-native-svg';
import CustomText from '../../Components/CustomText';
import { PrimaryColor } from '../../Components/Theme';

const Vehicle = () => {
  const Navigation = useNavigation();

  return (
    <View style={styles.container2}>
      <View style={styles.HeadingBox}>
        <CustomText style={styles.mainHeading}>Vehicles</CustomText>
      </View>
        <VehiclesData />
        <Pressable onPress={() => Navigation.navigate('addVehicle')} style={styles.btn} >
          <SvgXml xml={AddIcon} width="32" height="32" />
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: '#F0F2F2',
  },
  mainHeading: {
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 20,
    // color : '#0B3C58',
  },
  btn2: {
    alignItems: 'flex-end',
    margin: 10
  },
  HeadingBox: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CED8DE'
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
    backgroundColor: PrimaryColor,
    padding: 10,
    color: 'blue',
    borderRadius: 100,
    marginHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
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
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : 'red',

  },
  image2: {
    backgroundColor: '#95C3BB',
    borderRadius: 180
  },
});
export default Vehicle;
