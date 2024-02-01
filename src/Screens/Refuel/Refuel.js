import React, { useState, useCallback, useEffect } from 'react';
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import VehicleList from './VehicleList';
import FuelData from './FuelData';
import { useQuery, useRealm } from '@realm/react';
import UseUserStore from '../../ZustandStore/ZuStore';
import FetchRefuelData from '../../API/FetchRefuelData';
import { Refuel } from '../../Database/mySchema';
import DeleteRefuel from '../../utility/DeleteRefuel';

const NoVehicle = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.content}>
      {/* No vehicle exists :- */}
      <Image source={require('../../assets/Maskgroup.png')} style={styles.image2} />
      <Text style={styles.heading2} > Add a vehicle to start tracking its {'\n'} refuelling & performance </Text>
      <Pressable onPress={() => Navigation.navigate('addVehicle')} style={styles.btn3} >
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
    <View style={styles.content3}>
      <VehicleList />
      <View style={styles.content4}>
        <Image source={require('../../assets/clowd.png')} style={styles.image1} />
        <Text style={styles.heading1}>No refuelling records yet!</Text>
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

const Refueling = () => {
  const Navigation = useNavigation();
  const realm = useRealm();
  const mystore = UseUserStore();
  const [refuelData, setRefuelData] = useState([]);
  const [status, setStatus] = useState(0);
  const navigation = useNavigation();
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' };


  const rfd = useQuery(Refuel)
  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchRefuelData = async () => {
  //       try {
  //         const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId);
  //         setRefuelData(data);
  //         console.log("refuel data fetched in");
  //       } catch (error) {
  //         console.log('Error fetching refuel data:', error);
  //       }
  //     };
  //     fetchRefuelData();
  //   }, [mystore.refuelSelectedVehicleId,rfd])
  // ); 
  
  useEffect(() => {
    const fetchRefuelData = () => {
      try {
        const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId,mystore);
        // setRefuelData(data);
        // console.log("Sel = ",mystore.selectedUserId,mystore.refuelSelectedVehicleId)
        // console.log("refuel data fetched in");
      } catch (error) {
        console.log('Error fetching refuel data:', error);
      }
    };
    fetchRefuelData();
    setStatus(0);
  }, [mystore.refuelSelectedVehicleId, rfd])

  const handleDelete = async (rid, vid) => {
    // Find the RefuelData entry in the vehicle's refuelData linkingObjects
    
    const res = await DeleteRefuel(realm, rid, vid);
    // setStatus(1);
    setRefuelData(res);
    // navigation.navigate('PerformanceStack');
} 

  return (
    <View style={styles.container}>

      {
        mystore.vehicleLength == 0 ? (
          NoVehicle()
        ) : (

          ( mystore.refuelData.length == 0) ? (
            EmptyData()
          )
            :
            (
              <View style={styles.container2}>
                {/* Vehicle Exists */}
                <VehicleList />
                <FuelData  refuelData={ mystore.refuelData}  />
               
                <View style={styles.btn2}>

                  <Pressable onPress={() => Navigation.navigate('addRefuel')} style={styles.btn} >
                    <Image source={require('../../assets/Large.png')}></Image>
                  </Pressable>
                </View>
              </View>
            )
        )
      }

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
    marginBottom: 10,
    elevation: 3,
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


  container: {
    flex: 1,
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
    margin: 10
  },
  heading1: {
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold',
    color: '#0B3C58'
  },
  heading: {
    textAlign: 'center',
    margin: 20,
  },
  heading2: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
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
  content3: {
    flex: 1,
    // height : '100%',
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content4: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image2: {
    backgroundColor: '#95C3BB',
    borderRadius: 180
  },
});
export default Refueling;
