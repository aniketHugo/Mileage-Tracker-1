// FuelData.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Realm from 'realm';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useRealm } from '@realm/react';

const FuelData = () => {
  const [refuelData, setRefuelData] = useState([]);
  const selectedUserId = UseUserStore((state) =>  state.selectedUserId )
  const refuelSelectedVehicleId = UseUserStore((state) => state.refuelSelectedVehicleId);
  const realm = useRealm()

  useEffect(() => {
    const fetchRefuelData = () => {

      try {
        console.log(selectedUserId,refuelSelectedVehicleId)
        const user = realm.objectForPrimaryKey('User', selectedUserId);
        const vehicle = realm.objectForPrimaryKey('Vehicle', refuelSelectedVehicleId);

        if (user && vehicle) {
          const refuelDataArray = vehicle.refuelData.filtered(`vehicle == $0`, vehicle);

          // Convert the Realm refuelDataArray to a plain JavaScript array
          const refuelDataPlainArray = Array.from(refuelDataArray);

          setRefuelData(refuelDataPlainArray);
        } else {
          console.error('User or Vehicle not found.');
        }
      } catch (error) {
        console.log('Error fetching refuel data:', error);
      }
    };

    fetchRefuelData();
  }, [refuelSelectedVehicleId]);

  return (
    <View style={styles.container2} >
        <ScrollView vertical contentContainerStyle={styles.refData}>
        {refuelData.map((item) => (
            <View key={item.id} style={styles.card1}>
            <Text>Refuel Date: {item.refuelDate}</Text>
            <Text>Start Reading: {item.startReading}</Text>
            <Text>End Reading: {item.endReading}</Text>
            <Text>Consumed: {item.consumed}</Text>
            <Text>Price: {item.price}</Text>
            </View>
        ))}
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
    container2 : {
        flex: 1,
        width : '100%',
    },
  refData: {
    flexGrow: 1,
    width : '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: 50,
  },
  card1: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor : 'white',
    borderColor: 'red',
    padding: 10,
    margin: 5,
    width: 350, // Set the width as needed
  },
});

export default FuelData;
