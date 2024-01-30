import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Button, Text, StyleSheet, Pressable } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import AddVehicleDB from '../../utility/AddVehicleDB';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const AddVehicle = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const mystore = UseUserStore();


  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('option1');
  const [engineCC, setEngineCC] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);


  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => {
    try {
      const result = await launchImageLibrary();
      console.log(result)
      if (!result.didCancel && !result.error) {
        const source = { uri: result.assets[0].uri };
        console.log(source.uri)
        setSelectedImage(source.uri);

        mystore.setSelectedVehicleImage(`data:image/png;base64,${source.uri}`)
      }
      else {
        console.log("Cannot add image")
      }

    } catch (error) {
      console.error('Error launching image library:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };




  const handleOptionSelect = (option) => {
    console.log('Selected:', option);
    setVehicleType(option)
    setDropdownVisible(false);
  };

  const handleSubmit = async () => {
    if (!mystore.selectedUserId) {
      console.log('No user selected.');
      return;
    }

    const data = await AddVehicleDB(realm, mystore.selectedUserId, vehicleName, vehicleType, engineCC, selectedImage);
    console.log("ret = ", data);

    if (data.msg == "Added Successfully") {
      console.log("veh added resp = ", data)
      mystore.setRefuelSelectedVehicle(vehicleName)
      mystore.setRefuelSelectedVehicleId(data.id)
      mystore.setVehicleLength(data.len) 
      setSelectedImage(`data:image/png;base64,${selectedImage}`);
      console.log('Vehicle added successfully id = ', data.id)
      navigation.goBack();
    }
    else {
      console.warn("Vehicle Not added !!!!! ", data._j.msg)
    }


  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Add Vehicle</Text>
      <View style={styles.container2}>

      <Text>mystore.selectedUserId = {mystore.selectedUserId} </Text>
      <Text>mystore.selectedUserName = {mystore.selectedUserName} </Text>
      <Text>mystore.refuelSelectedVehicle = {mystore.refuelSelectedVehicle} </Text>
      <Text>mystore.refuelSelectedVehicleId = {mystore.refuelSelectedVehicleId} </Text>
      <Text>mystore.vehicleLength = {mystore.vehicleLength} </Text>
      {/* <Text>mystore.selectedVehicleImage = {mystore.selectedVehicleImage.length} </Text> */}

      </View>
      <Pressable onPress={openImagePicker} >
        <Image resizeMode="contain" source={require('../../assets/CameraLogo.png')} style={styles.image1} />
      </Pressable>
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
    zIndex: 2,
    height: 60,
    justifyContent: 'center'
  },
  dropdown: {
    // position: 'relative',
    // top: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 150,
    padding: 10,
    marginTop: 0,
    zIndex: 3,
    alignItems: 'center',
  },
  dropdownText: {
    padding: 5,
    fontSize: 15,
  }
});

export default AddVehicle;
