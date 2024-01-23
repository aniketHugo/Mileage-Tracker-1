import React, { useEffect, useState } from 'react';
import { View, Image, TextInput,TouchableOpacity, Button, Text, StyleSheet, Pressable } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import AddVehicleDB from '../../utility/AddVehicleDB';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const AddVehicle = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('option1');
  const [engineCC, setEngineCC] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const setSelectedVehicleImage = UseUserStore((state) => state.setSelectedVehicleImage);

  useEffect(() => {

  },[selectedImage])
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => {
    try {
      const result = await launchImageLibrary();
      console.log(result)
      if (!result.didCancel && !result.error) {
        const source = { uri: result.assets[0].uri };
        console.log(source.uri)
        setSelectedImage(source.uri); 
        setSelectedVehicleImage(`data:image/png;base64,${source.uri}`)
        // saveImageToRealm(result.base64);
      }
      else{
        console.log("Cannot add image")
      }
      // const photo = result.edges[0]?.node.image;
      
      // if (photo) {
      //   const source = { uri: photo.uri };
      //   setSelectedImage(source);
      //   // Save the image to your database or perform any other actions
      // }
    }catch (error) {
      console.error('Error launching image library:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const setRefuelSelectedVehicle = UseUserStore((state) => state.setRefuelSelectedVehicle);
  const setRefuelSelectedVehicleId = UseUserStore((state) => state.setRefuelSelectedVehicleId);

  const selectedUserId = UseUserStore((state) => state.selectedUserId);
  const handleOptionSelect = (option) => {
    console.log('Selected:', option);
    setVehicleType(option)
    setDropdownVisible(false); // Close the dropdown after selection
  };
 
  const handleSubmit = () => {
    if (!selectedUserId) {
      console.log('No user selected.');
      return;
    }


    const data = AddVehicleDB(realm,selectedUserId, vehicleName, vehicleType, engineCC,selectedImage);
    setRefuelSelectedVehicle(vehicleName)
    setRefuelSelectedVehicleId(data._j)
    setSelectedImage(null);
    console.log('Vehicle added successfully id = ',data)
    navigation.goBack();
    
  };


  return (
    <View style={styles.container}>
      <Image source={selectedImage} />
      <Text>{selectedImage}</Text>
      <Text style={styles.heading1}>Add Vehicle</Text>
      <View style={styles.container}>
      {/* <Button title="Pick Image" onPress={openImagePicker} /> */}
      <Image source={selectedImage} />
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
