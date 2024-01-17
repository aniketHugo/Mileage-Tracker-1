import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View,Image, TextInput, Button, Text, StyleSheet } from 'react-native';
import DropDown from '../../Components/Buttons/DropDown';
const AddVehicle = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('option1');
  const [engineCC, setEngineCC] = useState('');
  const handleSubmit = () => {
    // Handle form submission, validate data, and perform necessary actions
    console.log('Submitted Data:', {
      vehicleName,
      vehicleType,
      engineCC
    });

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
      <DropDown/>
      <TextInput
        style={styles.input}
        placeholder="Engine CC"
        value={engineCC}
        onChangeText={(text) => setEngineCC(text)}
      />


  <Button title="Add" onPress={handleSubmit} />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  heading1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  datePicker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    // flex: 1,
    height: 60,
    // borderWidth: 1,
    margin : 20,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%'
  },
});

export default AddVehicle;
