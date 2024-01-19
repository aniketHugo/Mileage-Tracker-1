import React, { useState } from 'react';
import { View, Image, TextInput,TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import AddVehicleDB from '../../utility/AddVehicleDB';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';
const AddVehicle = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('option1');
  const [engineCC, setEngineCC] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const refuelSelectedVehicle = UseUserStore((state) => state.refuelSelectedVehicle);
  const refuelSelectedVehicleId = UseUserStore((state) => state.refuelSelectedVehicleId);
  const setRefuelSelectedVehicle = UseUserStore((state) => state.setRefuelSelectedVehicle);
  const setRefuelSelectedVehicleId = UseUserStore((state) => state.setRefuelSelectedVehicleId);

  const selectedUserId = UseUserStore((state) => state.selectedUserId);
  const handleOptionSelect = (option) => {
    // Handle the selection of an option here
    console.log('Selected:', option);
    setVehicleType(option)
    setDropdownVisible(false); // Close the dropdown after selection
  // console.log('len = ',vehicleLength)

  };
 
  const handleSubmit = () => {
    if (!selectedUserId) {
      console.log('No user selected.');
      return;
    }


    const data = AddVehicleDB(realm,selectedUserId, vehicleName, vehicleType, engineCC);
    setRefuelSelectedVehicle(vehicleName)
    setRefuelSelectedVehicleId(vehicleName)
    console.log('Vehicle added successfully id = ',data)
    navigation.goBack();
    
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Add Vehicle</Text>

      <Image resizeMode="contain" source={require('../../assets/CameraLogo.png')} style={styles.image1} />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Name"
        value={vehicleName}
        onChangeText={(text) => setVehicleName(text)}
      />
      {/* Your Dropdown component goes here */}
      {/* <DropDown/> */}

      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text>{vehicleType}</Text>
      </TouchableOpacity>


      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => handleOptionSelect('2 Wheeler')}>
            <Text style={styles.dropdownText}>2 Wheeler</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('3 Wheeler')}>
            <Text style={styles.dropdownText}>3 Wheeler</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('4 Wheeler')}>
            <Text style={styles.dropdownText}>4 Wheeler</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Other')}>
            <Text style={styles.dropdownText}>Other</Text>
          </TouchableOpacity>
        </View>
      )}


      <TextInput
        style={styles.input}
        placeholder="Engine CC"
        value={engineCC}
        onChangeText={(text) => setEngineCC(text)}
      />
      <Button title="Add" onPress={handleSubmit} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 60,
    margin: 20,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  dropdownButton: {
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    zIndex : 2,
    height : 60,
    justifyContent : 'center'
  },
  dropdown: {
    // position: 'relative',
    // top: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    width : 150,
    padding: 10,
    marginTop : 0,
    zIndex: 3,
    alignItems : 'center',
  },
  dropdownText : {
    padding : 5,
    fontSize : 15,
  }
});

export default AddVehicle;
