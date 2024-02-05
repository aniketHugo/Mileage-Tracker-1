import React, { useState ,useEffect} from 'react';
import { View,Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useQuery, useRealm } from '@realm/react';
import FetchVehicleData from '../../API/FetchVehicleList';
import { Vehicle } from '../../Database/mySchema';

const VehicleList = () => {
  const realm = useRealm();
  const {
    selectedUserId,
    setRefuelSelectedVehicle,
    refuelSelectedVehicle,
    setRefuelSelectedVehicleId,
    setSelectedVehicleImage,
    setVehicleLength
  } = UseUserStore(); 

  const mystore = UseUserStore();
  
  const [userVehicles, setUserVehicles] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => { 
    setDropdownVisible(!dropdownVisible);
  };

  const vd = useQuery(Vehicle)

  useEffect(() => {
    const fetchRefuelData = () => {
      try {
        const data = FetchVehicleData(realm, mystore);
        // setRefuelData(data);
        console.log("Vehicles list fetched")
        // console.log("Sel = ",mystore.selectedUserId,mystore.refuelSelectedVehicleId)
        // console.log("refuel data fetched in");
      } catch (error) {
        console.log('Error fetching refuel data:', error);
      }
    };
    fetchRefuelData();
  }, [mystore.refuelSelectedVehicleId, vd])

  const handleOptionSelect = (id,name,img) => {
    console.log('Selected:', name);
    setRefuelSelectedVehicleId(id)
    setRefuelSelectedVehicle(name)
    setSelectedVehicleImage(img)
    setDropdownVisible(false); // Close the dropdown after selection
  };

  
  return (
    <View style={styles.container3}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text>{refuelSelectedVehicle}</Text>
        <Image source={require('../../assets/DropdownIcon1.png')} ></Image>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          {mystore.vehicleData.map((vehicle, index) => (
        <TouchableOpacity key={index} onPress={() => handleOptionSelect(vehicle.id,vehicle.name,vehicle.vehicleImage)}>
          <Text style={styles.dropdownText}>{vehicle.name}</Text>
        </TouchableOpacity>
      ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container3: {
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor : 'red',
    color : 'black',
    borderRadius : 10,
    zIndex : 10,
  },
  dropdownButton: {
    // borderColor : 'black',
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    backgroundColor : '#ffffff',
    padding: 10,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    // zIndex : 2,
    elevation : 3,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    width : '50%',
    padding: 10,
    zIndex: 3,
    alignItems : 'center'
  },
  dropdownText : {
    padding : 5,
    fontSize : 15,
  }
});

export default VehicleList;
