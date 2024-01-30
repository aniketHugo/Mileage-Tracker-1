import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Modal, Image,Pressable } from 'react-native';
import Home from '../Screens/Home/Home';
import LoginStack from './Stacks/LoginStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeleteAccount from '../utility/DeleteAccount';
import { useRealm } from '@realm/react';
const Drawer = createDrawerNavigator();
import UseUserStore from '../ZustandStore/ZuStore';
const DrawerContent = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const realm = useRealm();
  const setRefuelSelectedVehicleId = UseUserStore((state) => state.setRefuelSelectedVehicleId)
  const setRefuelSelectedVehicle = UseUserStore((state) => state.setRefuelSelectedVehicle)
  const setSelectedUserId = UseUserStore((state) => state.setSelectedUserId);
  const selectedUserId = UseUserStore((state) => state.selectedUserId);
  const setSelectedUserName = UseUserStore((state) => state.setSelectedUserName);
  const selectedVehicleImage = UseUserStore((state) => state.selectedVehicleImage);
  const {selectedUserName} = UseUserStore();

  const handleDelete = async () =>{
    const res = await DeleteAccount(realm,selectedUserId);
    console.log("Delete Account resp :-  ",res);

    if(res.msg == "Deleted"){
      console.log("Account Deleted Successfully")
      setSelectedUserId(null)
      setSelectedUserName(null)
      setRefuelSelectedVehicleId(null)
      selectedVehicleImage(null)
      setRefuelSelectedVehicle('select')
      navigation.navigate('LoginStack')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.DrawerButttonBox}>
        <Image source={require('../assets/userIcon2.png')} style={styles.userIcon}></Image>
          <Text style={styles.username}> {selectedUserName} </Text>
          <Pressable style={styles.DrawerButttons} onPress={() => navigation.navigate('LoginStack')}>
            <Text style={styles.DrawerText}>Switch Account</Text>
          </Pressable>
          <Pressable style={styles.DrawerButttons} onPress={toggleModal}>
            <Text style={styles.DrawerText}>Delete Account</Text>
          </Pressable>
        </View>

        <Pressable style={styles.logoutBtn} onPress={toggleModal}>
          <Text style={styles.logoutBtnTxt}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.bottomText}>
        <Text style={styles.logoutBtnTxt}>Current Version: 1.0</Text>
      </View>

      <Modal style={styles.modal} visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.firstHeading}>Are you sure you want to delete your account?</Text>
          <Text style={styles.secondHeading}>Note that all your data will be lost permanently. </Text> 

            {/* Buttons for "Yes" and "No" */}
            <View style={styles.buttonContainer}>
              <Pressable style={[styles.button, styles.noButton]} onPress={() => toggleModal()}>
                <Text style={styles.buttonText2}>No</Text>
              </Pressable>
              
              <Pressable style={[styles.button, styles.yesButton]} onPress={() => handleDelete()}>
                <Text style={styles.buttonText}>Yes</Text>
              </Pressable>

            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Draw = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen options={{ headerShown: false }} name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  username : {
    margin : 10,
    fontWeight : 'bold',
    fontSize : 20,
    color : '#0B3C58',
  },
  userIcon : {
    marginHorizontal : 15,
    marginTop : 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#F0F2F2',
    justifyContent: 'space-between',
  },
  modal : {
    width : 60,
    margin : 10,
  },
  DrawerButttons: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    elevation: 2,
    borderRadius: 5,
    padding: 10,
  },
  bottomText: {
    backgroundColor: '#58798C',
    padding: 15,
    alignItems: 'center',
  },
  firstHeading : {
    color : 'black',
    fontSize : 18,
  },
  secondHeading : {
    color : '#58798C'
  },
  DrawerText: {
    // fontSize: 20,
    color: 'black',
  },
  DrawerButttonBox: {
    marginVertical: 20,
    // borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    margin : 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    marginHorizontal : 10,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#0B3C58',
  },
  noButton: {
    // backgroundColor: 'red',
    borderWidth : 2,
    borderColor : "#0B3C58"
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  logoutBtn: {
    backgroundColor: '#F93333',
    padding: 10,
    width: 250,
    borderRadius: 10,
    margin: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  logoutBtnTxt: {
    color: 'white',
  },
});

export default Draw;
