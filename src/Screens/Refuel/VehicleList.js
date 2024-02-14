import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useQuery, useRealm } from '@realm/react';
import FetchVehicleData from '../../API/FetchVehicleList';
import { Vehicle } from '../../Database/mySchema';
import { SvgXml } from 'react-native-svg';
import { DropDown } from '../../assets/IconsSvg';
import DropDownComp from '../../Components/Buttons/DropDown';
import SelectDropdown from 'react-native-select-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import CustomText from '../../Components/CustomText';
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
        // console.log("Vehicle List:- $FetchVehicleData$ Called")
      } catch (error) {
        console.log('Error fetching refuel data:', error);
      }
    };
    fetchRefuelData();
  }, [vd])

  const handleOptionSelect = (id, name, img,type) => {
    // console.log('Selected:', name);
    setRefuelSelectedVehicleId(id)
    setRefuelSelectedVehicle(name)
    setSelectedVehicleImage(img)
    mystore.setVehicleType(type)
    setDropdownVisible(false); // Close the dropdown after selection
  };

  const vehiclenames=(mystore.vehicleData.map((vehicle)=>{return vehicle.name}))

  return (
    <View style={styles.container3}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <CustomText style={styles.vehicleName}>{refuelSelectedVehicle}</CustomText>
        <SvgXml xml={DropDown} />
      </TouchableOpacity>
      {dropdownVisible && (
       <View style={styles.dropdownContainer}>
       <ScrollView contentContainerStyle={styles.dropdownScrollView}>
         <View style={styles.dropdown}>
           {mystore.vehicleData.map((vehicle, index) => (
             <TouchableOpacity key={index} onPress={() => handleOptionSelect(vehicle.id, vehicle.name, vehicle.vehicleImage,vehicle.vehicleType)}>
               <CustomText style={styles.dropdownText}>{vehicle.name}</CustomText>
             </TouchableOpacity>
           ))}
         </View>
       </ScrollView>
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
    color: 'black',
    borderRadius: 10,
    zIndex: 10,
  },
  vehicleName: {
    // color: '#0B3C58',
  },


  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
    padding: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderRadius : 8,
    width: 200,
    alignItems: 'center',
    elevation: 3,
  },
  dropdownContainer: {
    position: 'absolute',
    width :200,
    top : 38,
    maxHeight : 300,
    zIndex: 3,
    backgroundColor : 'white',
    // borderRadius: 8,
  },
  dropdownScrollView: {
    flex: 1,
    // alignItems : 'center'
  },
  dropdown: {
    backgroundColor: 'white',
    // borderRadius: 8,
    elevation: 3,
    padding: 8,
    alignItems : 'center',

  },
  dropdownText: {
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default VehicleList;
