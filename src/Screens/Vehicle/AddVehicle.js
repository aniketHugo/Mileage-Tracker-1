import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Button, Text, StyleSheet, Pressable } from 'react-native';
import UseUserStore from '../../ZustandStore/ZuStore';
import AddVehicleDB from '../../utility/AddVehicleDB';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { SvgXml } from 'react-native-svg';
import { CameraLogo, WhiteBackArrow } from '../../assets/IconsSvg';
import CustomText from '../../Components/CustomText';

const AddVehicle = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const mystore = UseUserStore();


  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('4 Wheeler');
  const [engineCC, setEngineCC] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [error, setError] = useState('');


  const [selectedImage, setSelectedImage] = useState(null);

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
      // console.log('No user selected.');
      return;
    }
    if (isNaN(engineCC) || engineCC == "") {
      setError("Enter a valid engine CC");
      return;
    }
    if (vehicleName == "") {
      setError("Enter a Vehicle Name");
      return;
    }

    const data = await AddVehicleDB(realm, mystore.selectedUserId, vehicleName, vehicleType, engineCC, selectedImage, mystore);
    console.log("ret = ", data);

    if (data.status == 1) {
      // console.log("veh added resp = ", data)
      // setSelectedImage(`data:image/png;base64,${selectedImage}`);
      // mystore.setSelectedImage(selectedImage);
      console.log('Vehicle added successfully id = ', data.id)
      navigation.navigate("VehicleSuccessPage", { img: selectedImage, name: vehicleName ,type : vehicleType });
    }
    else {
      console.warn("Vehicle Not added !!!!! ")
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
            <CustomText style={styles.heading1}>Add Vehicle</CustomText>
            <Pressable onPress={openImagePicker} style={styles.imgBox} >
              {selectedImage != null ?

                <Image resizeMode="contain" source={{ uri: selectedImage }} style={styles.image1} />
                :
                <SvgXml xml={CameraLogo} style={styles.image1} />
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
              <CustomText>{vehicleType}</CustomText>
            </TouchableOpacity>


            {dropdownVisible && (
              <View style={styles.dropdown}>
                <TouchableOpacity onPress={() => handleOptionSelect('2 Wheeler')}>
                  <CustomText style={styles.dropdownText}>2 Wheeler</CustomText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect('3 Wheeler')}>
                  <CustomText style={styles.dropdownText}>3 Wheeler</CustomText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect('4 Wheeler')}>
                  <CustomText style={styles.dropdownText}>4 Wheeler</CustomText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect('Other')}>
                  <CustomText style={styles.dropdownText}>Other</CustomText>
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
          <CustomText style={styles.errorHeading}>{error}</CustomText>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.noButton]} onPress={() => navigation.navigate("Vehicle")}>
            <CustomText style={styles.buttonText2}>Cancel</CustomText>
          </Pressable>

          <Pressable style={[styles.button, styles.yesButton]} onPress={handleSubmit}>
            <CustomText style={styles.buttonText}>Save</CustomText>
          </Pressable>
        </View>


        <Pressable style={styles.backButton} onPress={() => navigation.navigate("Vehicle")} >
          <SvgXml xml={WhiteBackArrow} width="32" height="32" />
        </Pressable>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  page2: {
    height: '100%'
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
  TopBox: {
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
    // color: '#0B3C58',
  },
  input: {
    height: 60,
    margin: 20,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    // color: '#0B3C58',
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
    overflow: 'hidden',
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownText: {
    padding: 5,
    fontSize: 15,
  },
  image1: {
    height: 180,
    width: 180,
    borderRadius: 100,
  },
  errorHeading: {
    color: '#F93333',
    marginVertical: 10,
  },
  buttonText2 : {
    // color: '#0B3C58',
  }
});

export default AddVehicle;
