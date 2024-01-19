import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../Navigation/Header';
import UseUserStore from '../../ZustandStore/ZuStore';
import { PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema } from '../../Database/mySchema';
import { useRealm } from '@realm/react';
import { useFocusEffect } from '@react-navigation/native';
const VehiclesData = () => {
  const selectedUserId = UseUserStore((state) => state.selectedUserId);
  const [userVehicles, setUserVehicles] = useState([]);
  const realm = useRealm();

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

  return (
    <View style={styles.container2}>
      <ScrollView contentContainerStyle={styles.fuelData}>
        {userVehicles.map((vehicle) => (
          <View style={styles.rowCard} key={vehicle.id}>
            {/* Replace the source with your actual image */}
            <View style={styles.imgView} >
            <Image source={require('../../assets/image1.png')} style={styles.image2} />
            </View>
            <Text style={{ ...styles.text, fontSize: 18, fontWeight: 'bold' }}>{vehicle.name}</Text>
            <Text style={styles.text}>{vehicle.engineCC} CC</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
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
  imgView : {
    alignItems : 'center'
  }
});

export default VehiclesData;
