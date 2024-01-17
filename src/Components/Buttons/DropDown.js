import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const DropDown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [vehicleType,setVehicleType] = useState('Vehicle Type')

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionSelect = (option) => {
    // Handle the selection of an option here
    console.log('Selected:', option);
    setSelectedVehicle(option)
    setDropdownVisible(false); // Close the dropdown after selection
  };

  return (
    <View style={styles.container1}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text>{vehicleType}</Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => handleOptionSelect('Yamaha R15')}>
            <Text style={styles.dropdownText}>Yamaha R15</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Honda City')}>
            <Text style={styles.dropdownText}>Honda City</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Yamaha FZ')}>
            <Text style={styles.dropdownText}>Yamaha FZ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('Creta')}>
            <Text style={styles.dropdownText}>Creta</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    alignItems: 'center',
    backgroundColor : 'white',
    color : 'black',
    borderRadius : 10,
    zIndex : 1,
    width : '100%',
    
  },
  dropdownButton: {
    borderColor : 'white',
    padding: 10,
    width: '100%',
    zIndex : 2,
    height : 60,
    justifyContent : 'center'
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    width : 150,
    padding: 10,
    zIndex: 3,
    alignItems : 'center',
  },
  dropdownText : {
    padding : 5,
    fontSize : 15,
  }
});

export default DropDown;
