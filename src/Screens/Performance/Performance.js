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
          const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId,mystore);

          // console.log("refuel data fetched");
          console.log("Perf fetched")
        } catch (error) {
          console.log('Error fetching refuel data:', error);
        }
      };
      fetchRefuelData();
    }, [mystore.refuelSelectedVehicleId])
  );
  const getUri = (image) => {
    const uri = `data:image/png;base64,${image}`;
    return uri;
  }
  return (
    <SafeAreaView>
      <ScrollView vertical>


        <View style={styles.container}>
          <Text style={styles.mainHeading}>Choose the vehicle:</Text>
          <VehicleList />
          {mystore.selectedVehicleImage != null &&
            (
              mystore.selectedVehicleImage == "" ?
                <View style={styles.vehicleImage}>
                  <Image source={require('../../assets/NoVehicle.png')} style={styles.image4} />
                </View>
                :
                <View style={styles.vehicleImage}>
                  <Image source={{ uri: getUri(mystore.selectedVehicleImage) }} style={styles.image4} />
                </View>
            )
          }
          <View style={styles.content}>
            <View style={styles.heading}>
              <Text style={styles.fuelText}>Money spend on fuel</Text>
            </View>
            <MoneyGraph />

            <View style={styles.heading}>
              <Text style={styles.fuelText}>Vehicle mileage performance</Text>
            </View>
            <MileageGraph />

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
  fuelText: {
    fontSize: 15,
    fontWeight: 'bold',
    color :'#0B3C58'
  },
  heading: {
    // backgroundColor : 'red',
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginTop: 20,
    // marginBottom: 10,
  },
  mainHeading: {
    marginTop: 20,
    color: '#0B3C58',
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
