import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, RefreshControl, Pressable } from 'react-native';
import { useRealm } from '@realm/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import UseUserStore from '../../ZustandStore/ZuStore';
import FetchRefuelData from '../../API/FetchRefuelData';
import VehicleList from '../Refuel/VehicleList';
import FuelData2 from './FuelData2';
import MoneyGraph from '../Performance/MoneyGraph';
import FuelInsights from './FuelInsights';
import NoVehicles from './Novehicles';
import { MilageTrackerHomeIcon, DrawerIcon } from '../../assets/IconsSvg';
import { SvgXml } from 'react-native-svg';
import NoRefuel from './NoRefuel';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../Components/CustomText';

const MainHome = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const mystore = UseUserStore();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    // setTimeout(() => {
    //   setRefreshing(false);
    //   const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId, mystore);
    // }, 1000);
  }, []);

  const getUri = (image) => {
    const uri = `data:image/png;base64,${image}`;
    return uri;
  }


  return (
    <View style={styles.container2}>
      {/* <Pressable style={styles.sidebarBtn} onPress={() => { navigation.openDrawer() }} >
        <SvgXml xml={DrawerIcon} width="32" height="32" />
      </Pressable> */}
      <ScrollView
        contentContainerStyle={styles.mainContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.topBar}>

          <Pressable style={styles.sidebarBtn} onPress={() => { navigation.openDrawer() }} >
            <SvgXml xml={DrawerIcon} width="32" height="32" />
          </Pressable>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <SvgXml xml={MilageTrackerHomeIcon} width="32" height="32" style={styles.img} />
          </View>

        </View>



        <CustomText style={{ color: '#EB655F', fontSize: 20, marginTop: 20 }}> Hi {mystore.selectedUserName}  </CustomText>
        <CustomText >Here is everything about your</CustomText>
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

        <View style={styles.other}>
          <View style={styles.heading}>
            <CustomText style={styles.fuelText}> Fuel Insights</CustomText>
          </View>
          <FuelInsights />
          <View style={styles.heading}>
            <CustomText style={styles.fuelText}>Money spend on fuel</CustomText>
          </View>
          <MoneyGraph />
          <View style={styles.fuelDataContainer} >
            <View style={styles.fuelHeading}>
              <CustomText style={styles.fuelText} >Refuelling history</CustomText>
              <Pressable onPress={() => navigation.navigate('RefuelStack')}>
                <CustomText style={styles.fuelText2}> see all </CustomText>
              </Pressable>
            </View>
            <FuelData2 />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    marginTop: 40,
    // backgroundColor : 'red',
  },
  gradient: {
    position: 'absolute',
    flexGrow: 1,
    left: 0,
    right: 0,
    top: 0,
    // bottom: '60%', // Adjust the value to control the height of the gradient
  },
  mainContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  other: {
    backgroundColor: '#E4EBEF',
    alignItems: 'center',
  },
  image4: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  sidebarBtn: {
    position: 'absolute',
    marginLeft: 20,
    zIndex: 2,
  },
  heading: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    // color: '#0B3C58',
  },
  vehicleImage: {
    marginTop: 20,
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 10,
  },
  fuelText: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#0B3C58',
  },
  fuelText2: {
    fontSize: 20,
    // color: '#0B3C58',
  },
  topBar: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor : 'red',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  img: {
    // backgroundColor: 'pink',
    width: '100%',
  },
  fuelDataContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F0F2F2',
    marginTop: 30,
  },
  fuelHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // color: '#0B3C58',
  },
});

export default MainHome;
