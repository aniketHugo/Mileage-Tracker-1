import React, { useState ,useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import { PerformanceDataSchema,RefuelDataSchema,UserSchema,VehicleSchema } from '../../Database/mySchema';
import { useRealm } from '@realm/react';
const VehicleList = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedVehicle,setSelectedVehicle] = useState('Select a Vehicle')
  const selectedUserId = UseUserStore((state) => state.selectedUserId);
  const [userVehicles, setUserVehicles] = useState([]);
  const toggleDropdown = () => { 
    // 
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionSelect = (option) => {
    // Handle the selection of an option here
    console.log('Selected:', option);
    setSelectedVehicle(option)
    setDropdownVisible(false); // Close the dropdown after selection
  };
  
  const realm = useRealm();
  useEffect(() => {
    if (selectedUserId) {
      const vehicles = realm.objects('Vehicle').filtered('user.id = $0', selectedUserId);
      console.log("Veh :- ",vehicles)
      setUserVehicles(Array.from(vehicles));
    }
  }, [selectedUserId, ]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text>{selectedVehicle}</Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          {userVehicles.map((vehicle, index) => (
        <TouchableOpacity key={index} onPress={() => handleOptionSelect(vehicle.name)}>
          <Text style={styles.dropdownText}>{vehicle.name}</Text>
        </TouchableOpacity>
      ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
    backgroundColor : 'white',
    color : 'black',
    borderRadius : 10,
    zIndex : 1,
    
  },
  dropdownButton: {
    borderColor : 'white',
    padding: 10,
    width: 150,
    alignItems: 'center',
    zIndex : 2,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    width : 150,
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
