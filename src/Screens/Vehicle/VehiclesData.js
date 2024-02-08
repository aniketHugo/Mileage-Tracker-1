import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, Pressable, FlatList, RefreshControl } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useQuery, useRealm } from '@realm/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FetchVehicleData from '../../API/FetchVehicleList';
import FetchRefuelData from '../../API/FetchRefuelData';
import { Refuel, Vehicle } from '../../Database/mySchema';

const VehiclesData = () => {
  const realm = useRealm();
  const navigation = useNavigation();

  const mystore = UseUserStore();
  const vd = useQuery(Vehicle)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setTimeout(() => {
      setRefreshing(false);
      const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId, mystore);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchRefuelData = () => {
      try {
        const data = FetchVehicleData(realm, mystore);
        console.log("VehicleData :- FetchVehicleData Called")
      } catch (error) {
        console.log('Error fetching refuel data:', error);
      }
    };
    fetchRefuelData();
  }, [vd])

  const getUri = (image) => {
    const uri = `data:image/png;base64,${image}`;
    return uri;
  }


  {/* No vehicle exists :- */ }
  if (mystore.vehicleData.length == 0) {
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
    const renderItem = ({ item }) => (
      <View style={styles.rowCard} key={item.id}>
        {item.vehicleImage === "" ? (
          <View style={styles.imgView}>
            <Image source={require('../../assets/NoVehicle.png')} style={styles.image2} />
          </View>
        ) : (
          <View style={styles.imgView}>
            <Image source={{ uri: getUri(item.vehicleImage) }} style={styles.image2} />
          </View>
        )}
        <View style={styles.mainBox}>

          <View style={styles.box1}>
            <Text style={{ ...styles.text, fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={styles.text}>{item.vehicleType}</Text>
          </View>
          <View style={styles.box2}>
            <Text style={styles.text}>{item.engineCC} CC</Text>
          </View>
        </View>

      </View>
    );

    return (
      <View style={styles.container2}>
        <FlatList style={styles.dd}
          data={mystore.vehicleData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.fuelData}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    )
  }

};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    width: '100%',
  },
  mainBox: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom : 10,

  },
  box1: {
    width: '60%',
    // backgroundColor : 'pink',

  },
  box2: {
    width: '40%',
    justifyContent : 'center',
    alignItems : 'flex-end',
    // backgroundColor : 'red',
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
    marginHorizontal : 10,
    marginBottom: 30,
    borderRadius: 10,
    elevation : 5,
  },
  text: {
    fontSize: 16,
    color: '#0B3C58',
  },
  image2: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    overflow : 'hidden',
  },
  image3: {
    backgroundColor: '#95C3BB',
    borderRadius: 180
  },
  imgView: {
    alignItems: 'center',
    overflow : 'hidden',
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    // backgroundColor : 'red'
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
