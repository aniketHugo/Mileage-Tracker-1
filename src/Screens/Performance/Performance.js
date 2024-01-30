import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory-native';
import { useRealm } from "@realm/react";
import FetchRefuelData from "../../API/FetchRefuelData";
import UseUserStore from "../../ZustandStore/ZuStore";
import VehicleList from '../Refuel/VehicleList';
import MoneyGraph from './MoneyGraph';
import MileageGraph from './MilageGraph';
import { useFocusEffect } from '@react-navigation/native';
const FuelGraph = () => {
  const mystore = UseUserStore();
  const realm = useRealm();
  const [refuelData, setRefuelData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchRefuelData = async () => {
        try {
          const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId);
          setRefuelData(data);
          console.log("refuel data fetched");
        } catch (error) {
          console.log('Error fetching refuel data:', error);
        }
      };
      fetchRefuelData();
    }, [mystore.refuelSelectedVehicleId])
  );
 
  return (
    <SafeAreaView>
      <ScrollView vertical>


        <View style={styles.container}>
          <Text>Choose the vehicle:</Text>
          <VehicleList />
          {mystore.selectedVehicleImage != null &&
            <View style={styles.vehicleImage}>
              <Image source={{ uri: mystore.selectedVehicleImage }} style={styles.image4} />
            </View>
          }
          <View style={styles.content}>
              <MoneyGraph refuelData={refuelData} />
              <MileageGraph refuelData={refuelData}/>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#F0F2F2',
    borderRadius: 10,
    marginTop: 20,
  },
  image4: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  vehicleImage: {
    marginTop: 20,
    borderWidth: 8,
    borderColor: 'white',
    borderRadius: 10,
  },

});

export default FuelGraph;
