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

  const getUri = async (image) => {
    fileContent = await RNFS.readFile(image, 'base64');
    const uri = `data:image/png;base64,${fileContent}`;
    return uri;
  }
  const openImagePicker = async () => {
    try {
      const result = await launchImageLibrary();
      // console.log(result)
      if (!result.didCancel && !result.error) {
        const source = { uri: result.assets[0].uri };
        // console.log(source.uri)
        setSelectedImage(source.uri);

        // mystore.setSelectedVehicleImage(`data:image/png;base64,${source.uri}`)
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

    const data = await AddVehicleDB(realm, mystore.selectedUserId, vehicleName, vehicleType, engineCC, selectedImage, mystore);
    // console.log("ret = ", data);

    if (data.msg == "Added Successfully") {
      console.log("veh added resp = ", data)
      // setSelectedImage(`data:image/png;base64,${selectedImage}`);
      // mystore.setSelectedImage(selectedImage);
      console.log('Vehicle added successfully id = ', data.id)
      navigation.navigate("VehicleSuccessPage" , {img : selectedImage , name : vehicleName}); 
    
    }
    else {
      console.warn("Vehicle Not added !!!!! ", data._j.msg)
    }


  };


  return (
    <View style={styles.page2}>

      <View style={styles.container6}>
        <View style={styles.TopBox}>
          <View style={styles.curvedBackground}>
            <View style={styles.circle}></View>
          </View>

          <View style={styles.InBox}>
            <Text style={styles.heading1}>Add Vehicle</Text>
            <Pressable onPress={openImagePicker} style={styles.imgBox} >
              {selectedImage != null ?

                <Image resizeMode="contain" source={{ uri: selectedImage }} style={styles.image1} />
                :
                <Image resizeMode="contain" source={require('../../assets/CameraLogo.png')} style={styles.image1} />

              }
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
          </View>
        </View>

        {/* <Button title="Add" onPress={handleSubmit} /> */}
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.noButton]} onPress={() => navigation.navigate("Vehicle")}>
            <Text style={styles.buttonText2}>Cancel</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.yesButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>


        <Pressable style={styles.backButton} onPress={() => navigation.navigate("Vehicle")} >
            <Image source={require('../../assets/BackArrow2.png')} />
      </Pressable>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  page2 : {
    height : '100%'
  },
  container6: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  curvedBackground: {
    backgroundColor: '#F55858',
    height: 100,
    width: '100%',
    overflow: 'hidden',
  },
  circle: {
    marginTop: 60,
    backgroundColor: '#F0F2F2',
    height: 1700,
    width: 1700,
    borderRadius: 1000,
    alignSelf: 'center',
  },
  TopBox :{
    alignItems: 'center',
  },
  InBox: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#0B3C58',
  },
  noButton: {
    borderWidth: 2,
    borderColor: "#0B3C58"
  },
  buttonText: {
    color: '#fff'
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
  imgBox: {
    borderRadius: 100,
    backgroundColor: '#45A9BF',
    overflow : 'hidden',
    height: 120,
    width: 120,
    justifyContent : 'center',
    alignItems : 'center',
  },
  dropdownText: {
    padding: 5,
    fontSize: 15,
  },
  image1: {
    height: 180,
    width: 180,
    borderRadius: 100,
  }
});

export default AddVehicle;
