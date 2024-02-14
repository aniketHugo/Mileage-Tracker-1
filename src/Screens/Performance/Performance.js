import React, { useCallback, useEffect, useState } from 'react';
import { View, tEXT, StyleSheet, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory-native';
import { useRealm } from "@realm/react";
import FetchRefuelData from "../../API/FetchRefuelData";
import UseUserStore from "../../ZustandStore/ZuStore";
import VehicleList from '../Refuel/VehicleList';
import MoneyGraph from './MoneyGraph';
import MileageGraph from './MilageGraph';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NoVehicles from '../Home/Novehicles';
import { SvgXml } from 'react-native-svg';
import { ClowdImg } from '../../assets/IconsSvg';
import GoButton from '../../Components/Buttons/GoButton';
import CustomText from '../../Components/CustomText';
const FuelGraph = () => {
  const mystore = UseUserStore();
  const realm = useRealm();
  const [refuelData, setRefuelData] = useState([]);
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const fetchRefuelData = async () => {
        try {
          const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId, mystore);
          console.log("Performance:- FetchRefuelData Called")
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
    <SafeAreaView style={styles.container}>
      <View style={styles.HeadingBox}>
        <CustomText style={styles.mainHeading}>Performance</CustomText>
      </View>
      {mystore.vehicleLength == 0 ? (
        <View style={styles.noVehicleContent}>
          <Image source={require('../../assets/Maskgroup.png')} style={styles.image3} />
          <CustomText style={styles.heading2} > Add a vehicle to start tracking its refuelling & performance </CustomText>

          <GoButton
            destination="addVehicle"
            navigation={navigation}
            Heading="Add Vehicle"
          />


        </View>
      ) : (

        <ScrollView vertical contentContainerStyle={styles.second}>

          <CustomText style={styles.mainHeading2}>Choose the vehicle:</CustomText>
          <VehicleList />
          {mystore.selectedVehicleImage != null &&
                    (

                        mystore.selectedVehicleImage == "" ? (
                            mystore.vehicleType == "2 Wheeler" ?
                                <View style={styles.vehicleImage}>
                                    <Image source={require('../../assets/bikeDefaultImg.png')} style={styles.image4} />
                                </View>
                                :
                                <View style={styles.vehicleImage}>
                                    <Image source={require('../../assets/NoVehicle.png')} style={styles.image4} />
                                </View>)
                            :
                            <View style={styles.vehicleImage}>
                                <Image source={{ uri: getUri(mystore.selectedVehicleImage) }} style={styles.image4} />
                            </View>
                    )
                }
          {mystore.refuelData.length == 0 ? (
            <View style={styles.noData}>
              <View style={styles.content3}>
                <SvgXml xml={ClowdImg} style={styles.image1} />
                <CustomText style={styles.heading2}>It’s time to add the refuelling details{'\n'}to get more insights</CustomText>
              </View>
                {/* <Pressable onPress={() => navigation.navigate('RefuelStack', { screen: 'addRefuel' })} style={styles.btn} >
                  <CustomText style={styles.btnName}>Add Refuelling</CustomText>
                </Pressable> */}
                <GoButton
                  destination="addRefuel"
                  navigation={navigation}
                  Heading="Add Refuel"
                />
            </View>
          ) : (

            <View style={styles.content}>
              <View style={styles.heading}>
                <CustomText style={styles.fuelText}>Money spend on fuel</CustomText>
              </View>
              <MoneyGraph />

              <View style={styles.heading}>
                <CustomText style={styles.fuelText}>Vehicle mileage performance</CustomText>
              </View>
              <MileageGraph />
              {/* <Temp/> */}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F2F2',
    flexGrow: 1,
    // paddingBottom: 80,
  },
  second: {
    alignItems: 'center',
    marginBottom: 20,

  },
  content3: {
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 20,
    // color: '#0B3C58',
  },
  fuelText: {
    fontSize: 15,
    fontWeight: 'bold',
    // color: '#0B3C58'
  },
  heading: {
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginTop: 20,
  },
  heading2: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
    // color: '#0B3C58'
  },
  HeadingBox: {
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CED8DE'
  },
  mainHeading2: {
    marginTop: 20,
    // color: '#0B3C58',
    fontSize: 18,
  },
  content: {
    backgroundColor: '#F0F2F2',
    borderRadius: 10,
    marginTop: 20,
  },
  noVehicleContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image3: {
    backgroundColor: '#95C3BB',
    borderRadius: 180
  },
  noData: {
    marginTop: '20%',
    alignItems : 'center',
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
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#0B3C58',
    padding: 10,
    width: 250,
    borderRadius: 10,
    marginTop: 10,
  },
  btnName: {
    color: 'white',
  },

});

export default FuelGraph;
