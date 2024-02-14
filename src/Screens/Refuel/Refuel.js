import React, { useState, useCallback, useEffect } from 'react';
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import VehicleList from './VehicleList';
import FuelData from './FuelData';
import { useQuery, useRealm } from '@realm/react';
import UseUserStore from '../../ZustandStore/ZuStore';
import FetchRefuelData from '../../API/FetchRefuelData';
import { Refuel } from '../../Database/mySchema';
import DeleteRefuel from '../../utility/DeleteRefuel';
import { SvgXml } from 'react-native-svg';
import { AddIcon, ClowdImg, GoArrow, NoVehicleImg } from '../../assets/IconsSvg';
import GoButton from '../../Components/Buttons/GoButton';
import CustomText from '../../Components/CustomText';
import { PrimaryColor } from '../../Components/Theme';

const NoVehicle = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.content}>
      {/* No vehicle exists :- */}
      <Image source={require('../../assets/Maskgroup.png')} style={styles.image2} />


      {/* <CustomText style={styles.heading2} > Add a vehicle to start tracking its {'\n'} refuelling & performance </CustomText> */}
      <CustomText style={styles.heading2} > Add a vehicle to start tracking its{'\n'}refuelling & performance </CustomText>

      <GoButton
        destination="addVehicle"
        navigation={Navigation}
        Heading="Add Vehicle"
      />
    </View>
  )
}
const EmptyData = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.content3}>
      <VehicleList />
      <View style={styles.content4}>
        {/* <Image source={require('../../assets/clowd.png')} style={styles.image1} /> */}
        <SvgXml xml={ClowdImg} style={styles.image1} />
        <CustomText style={styles.heading1}>No refuelling records yet!</CustomText>
        <CustomText style={styles.heading}>Add a record using the + button below to begin your wealthcare journey</CustomText>
      </View>
      <View style={styles.btn2}>
        <Pressable onPress={() => Navigation.navigate('addRefuel')} style={styles.btn} >
          <SvgXml xml={AddIcon} width="32" height="32" />
        </Pressable>
      </View>
    </View>
  )
}

const Refueling = () => {
  const Navigation = useNavigation();
  const realm = useRealm();
  const mystore = UseUserStore();
  
  const refuelSchema = useQuery(Refuel)
  useEffect(() => {
    const fetchRefuelData = () => {
      try {
        const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId, mystore);
        // console.log("Refuel :- FetchRefuelData Called")
      } catch (error) {
        console.log('Error fetching refuel data:', error);
      }
    };
    fetchRefuelData();
    // setStatus(0);
  }, [mystore.refuelSelectedVehicleId, refuelSchema])


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HeadingBox}>

        <CustomText style={styles.mainHeading}>Refueling</CustomText>
      </View>
      {
        mystore.vehicleLength == 0 ? (
          NoVehicle()
        ) : (

          (mystore.refuelData.length == 0) ? (
            EmptyData()
          )
            :
            (
              <View style={styles.container2}>
                {/* Vehicle Exists */}
                {/* <CustomText style={styles.mainHeading}>Refueling</CustomText> */}
                <VehicleList />
                <FuelData refuelData={mystore.refuelData} />

                <View style={styles.btn2}>

                  <Pressable onPress={() => Navigation.navigate('addRefuel')} style={styles.btn} >
                    <SvgXml xml={AddIcon} width="32" height="32" />
                  </Pressable>

                 
                </View>
              </View>
            )
        )
      }

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    elevation: 3,
  },
  HeadingBox: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CED8DE'
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
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 20,
    // color: '#0B3C58',
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


  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
  },
  btn2: {
    alignItems: 'flex-end',
    margin: 20,
    // backgroundColor : 'red',
    position: 'absolute',
    bottom: 0,
    right: 0,

  },
  heading1: {
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold',
    // color: '#0B3C58'
  },
  heading: {
    textAlign: 'center',
    margin: 20,
    // color: '#0B3C58'
  },
  heading2: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
    // color: '#0B3C58'
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
    backgroundColor: PrimaryColor,
    padding: 10,
    // width : 100,
    color: 'blue',
    borderRadius: 100,
    marginTop: 10,
    alignItems: 'center'
  },
  // btn3: {
    // backgroundColor: '#0B3C58',
  //   padding: 10,
  //   width: 150,
  //   color: 'blue',
  //   borderRadius: 10,
  //   marginTop: 10,
  //   alignItems: 'center',
  //   flexDirection : 'row',
  //   justifyContent : 'center',
  // },
  // btnName: {
  //   color: 'white',

  // },
  content3: {
    flex: 1,
    // height : '100%',
    flexDirection: 'column',
    paddingHorizontal: 20,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  content4: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },

  image1: {
    // backgroundColor : 'red',
    // elevation : 3,
  },
  image2: {
    backgroundColor: '#95C3BB',
    borderRadius: 100,
  },
  imgBack: {
    borderRadius: 200,
    overflow: 'hidden'
  }
});
export default Refueling;
