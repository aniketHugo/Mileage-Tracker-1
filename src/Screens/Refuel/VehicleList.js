import React, { useState ,useEffect} from 'react';
import { View,Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { useRealm } from '@realm/react';

const VehicleList = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedVehicle,setSelectedVehicle] = useState('Select a Vehicle')
  const selectedUserId = UseUserStore((state) => state.selectedUserId);
  const setRefuelSelectedVehicle = UseUserStore((state) => state.setRefuelSelectedVehicle);
  const refuelSelectedVehicle = UseUserStore((state) => state.refuelSelectedVehicle);
  const setRefuelSelectedVehicleId = UseUserStore((state) => state.setRefuelSelectedVehicleId);
  const setSelectedVehicleImage = UseUserStore((state) => state.setSelectedVehicleImage);
  const [userVehicles, setUserVehicles] = useState([]);

  const toggleDropdown = () => { 
    setDropdownVisible(!dropdownVisible);
  };
  const realm = useRealm();

  const handleOptionSelect = (id,name,img) => {
    // Handle the selection of an option here
    console.log('Selected:', name);
    // Log(selectedUserId,id,realm)

    setSelectedVehicle(name)
    setRefuelSelectedVehicleId(id)
    setRefuelSelectedVehicle(name)
    setSelectedVehicleImage(`data:image/png;base64,${img}`)
    setDropdownVisible(false); // Close the dropdown after selection
  };

  useEffect(() => {
    if (selectedUserId) {
      const vehicles = realm.objects('Vehicle').filtered('user.id = $0', selectedUserId);
      setUserVehicles(Array.from(vehicles));
    }
  }, [selectedUserId,refuelSelectedVehicle ]);

  return (
    <View style={styles.container3}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text>{refuelSelectedVehicle}</Text>
        <Image source={require('../../assets/DropdownIcon1.png')} ></Image>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          {userVehicles.map((vehicle, index) => (
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
    marginTop: 50,
    // backgroundColor : 'red',
    color : 'black',
    borderRadius : 10,
    zIndex : 1,
    
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
