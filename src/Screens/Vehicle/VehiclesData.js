import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import Header from '../../Navigation/Header';
import UseUserStore from '../../ZustandStore/ZuStore';
import { PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema } from '../../Database/mySchema';
import { useRealm } from '@realm/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const VehiclesData = () => {
  const selectedUserId = UseUserStore((state) => state.selectedUserId);
  const [userVehicles, setUserVehicles] = useState([]);
  const realm = useRealm();
  const navigation = useNavigation();
  const [vehicles, setVehicles] = useState([]);

  const getUri = (image) => {
    const uri = `data:image/png;base64,${image}`;
    // console.log("Uri = ",uri)
    return uri;
  }

  // useEffect(() => {
  //   if (selectedUserId) {
  //     const vehicles = realm.objects('Vehicle').filtered('user.id = $0', selectedUserId);

  //     setUserVehicles(Array.from(vehicles));
  //   }
  // }, [selectedUserId, ]);

  useFocusEffect(
    useCallback(() => {
      if (selectedUserId) {
        const vehicles = realm.objects('Vehicle').filtered('user.id = $0', selectedUserId);
  
        setUserVehicles(Array.from(vehicles));

      }
    }, [selectedUserId])
  );
    if(userVehicles.length == 0){
      return (
        <View style={styles.content}>
          {/* No vehicle exists :- */}
          <Image source={require('../../assets/Maskgroup.png')} style={styles.image3} />
          <Text style={styles.heading} > Add a vehicle to start tracking its refuelling & performance </Text>
          <Pressable onPress={() => navigation.navigate('addVehicle')} style={styles.btn3} >
          <Text style={styles.btnName}>
          Add Vehicle
          </Text>
          </Pressable>
          </View>
      )
    }
    else{
      return (
        <View style={styles.container2}>
          
    
      <ScrollView contentContainerStyle={styles.fuelData}>
        {userVehicles.map((vehicle) => (
          <View style={styles.rowCard} key={vehicle.id}>
            {/* Replace the source with your actual image */}
            <View style={styles.imgView} >
            <Image source={{ uri: getUri(vehicle.vehicleImage) }}  style={styles.image2} />
            </View>
            <Text style={{ ...styles.text, fontSize: 18, fontWeight: 'bold' }}>{vehicle.name}</Text>
            <Text style={styles.text}>{vehicle.engineCC} CC</Text>
          </View>
        ))}
      </ScrollView>
    </View>
      )
    }
  
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    width : '100%',
  },
  fuelData: {
    flexGrow: 1,
    width : '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 50,
  },
  rowCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    width : '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image2: {
    width: 300, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginBottom: 10,
  },
  image3: {
    backgroundColor: '#95C3BB',
    borderRadius: 180
  },
  imgView : {
    alignItems : 'center'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : 'red'
  },
  heading: {
    textAlign: 'center',
    margin: 20,
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
});

export default VehiclesData;
