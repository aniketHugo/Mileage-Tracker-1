import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useRealm } from '@realm/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const VehiclesData = () => {
  const realm = useRealm();
  const navigation = useNavigation();

  const mystore = UseUserStore();
  const [userVehicles, setUserVehicles] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (mystore.selectedUserId) {
        console.log("Vehicle selected user = ",typeof(mystore.selectedUserId), " | ",mystore.selectedUserId)
        const vehicles = realm.objects('Vehicle').filtered('userId = $0', (mystore.selectedUserId).toString());
        setUserVehicles(Array.from(vehicles));
        // console.log("VehicleData" , vehicles)
      }
    }, [mystore.selectedUserId])
  );

  const getUri = (image) => {
    const uri = `data:image/png;base64,${image}`;
    return uri;
  }


  {/* No vehicle exists :- */ }
  if (userVehicles.length == 0) {
    return (
      <View style={styles.content}>
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
  else {
    return (
      <View style={styles.container2}>
        <ScrollView contentContainerStyle={styles.fuelData}>
          {userVehicles.map((vehicle) => (
            <View style={styles.rowCard} key={vehicle.id}>
              {/* Replace the source with your actual image */}
              <View style={styles.imgView} >
                <Image source={{ uri: getUri(vehicle.vehicleImage) }} style={styles.image2} />
              </View>
              <Text style={{ ...styles.text, fontSize: 18, fontWeight: 'bold' }}>{vehicle.name}</Text>
              <Text style={styles.text}>{vehicle.engineCC} CC</Text>
              <Text style={styles.text}>USER iD {vehicle.userId}</Text>
              <Text style={styles.text}>Vehicle iD {(vehicle.id).toString()}</Text>
              
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
    width: '100%',
  },
  fuelData: {
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 50,
  },
  rowCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image2: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  image3: {
    backgroundColor: '#95C3BB',
    borderRadius: 180
  },
  imgView: {
    alignItems: 'center'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',

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
