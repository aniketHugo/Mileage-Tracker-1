import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image,StyleSheet, ScrollView, Pressable } from 'react-native';
import { useQuery, useRealm } from '@realm/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import UseUserStore from '../../ZustandStore/ZuStore';
import FetchRefuelData from '../../API/FetchRefuelData';
import { Refuel } from '../../Database/mySchema';


const FuelData2 = (props) => {
  const rfd = useQuery(Refuel)
  const [refuelData, setRefuelData] = useState([]);
  const mystore =  UseUserStore();
  const realm = useRealm()
  const navigation = useNavigation();
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' };

  // useEffect(() => {
  //   // if (props.refuelData) {
  //   //   setRefuelData(props.refuelData);
  //   // }
  //   const fetchRefuelData = () => {
  //     try {
  //       const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId);
  //       // setRefuelData(data);
  //       // console.log(data);
  //     } catch (error) {
  //       console.log('Error fetching refuel data:', error);
  //     }
  //   };
  //   fetchRefuelData();
  // }, [mystore.refuelSelectedVehicleId,rfd]);

  return  (

    <View style={styles.fuelContainer}>
 
        {mystore.refuelData.length > 0 && mystore.refuelData.map((item,index) => (
          <View key={index} style={styles.cardContainer} onPress={() => navigation.navigate('RefuelDetails')}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/refuelimg.png')} ></Image>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.mainHeading}>{item.refuelDate.toLocaleString('en-US', options)}</Text>
              <Text style={styles.subHeading}>{item.consumed}</Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>+S$ {item.price}</Text>
            </View>
          </View>
        ))}

    </View>

  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom : 10,
    elevation: 3,
  },
  fuelContainer : {
    padding : 0,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 2,
    paddingLeft: 10,
  },
  mainHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 14,
    color: '#555',
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fuelData: {
    // flexGrow: 1,
    flexDirection: 'column', // Arrange items horizontally
    justifyContent: 'space-around', // Adjust spacing between cards
    alignItems: 'center', // Align items vertically
    marginTop: 50, // Adjust margin as needed
  },
  rowCard: {
    backgroundColor: '#ffffff', // Card background color
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    minWidth: 370, // Card width
  },
  text: {
    fontSize: 16,
    marginBottom: 10, // Spacing between texts
  },

});
export default FuelData2;