import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Modal, Image, Pressable } from 'react-native';
import Home from '../Screens/Home/Home';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeleteAccount from '../utility/DeleteAccount';
import { useRealm } from '@realm/react';
const Drawer = createDrawerNavigator();
import UseUserStore from '../ZustandStore/ZuStore';
import LogoutUser from '../utility/LogoutUser';
import { SvgXml } from 'react-native-svg';
import { DeleteAccountiCON, DrawerIcon, LeftArrow } from '../assets/IconsSvg';
const DrawerContent = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const realm = useRealm();

  const mystore = UseUserStore();
  const handleDelete = async () => {
    const res = await DeleteAccount(realm, navigation, mystore);
  }

  const handleLogOut = async () => {
    const res = await LogoutUser(realm, navigation, mystore);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.DrawerButttonBox}>
          <SvgXml xml={DrawerIcon} width="32" height="32" style={styles.userIcon} />

          <Text style={styles.username}> {mystore.selectedUserName} </Text>
          <View style={styles.ButtonContainer}>

            <Pressable style={styles.DrawerButttons} onPress={() => navigation.navigate('LoginStack')}>
              <View style={styles.box1}>
                <SvgXml xml={DrawerIcon} style={styles.drawerBtnIcon} />
                <Text style={styles.DrawerText}>Switch Account</Text>
              </View>
              <SvgXml xml={LeftArrow} style={styles.drawerBtnIcon} />
            </Pressable>
            <View style={{borderTopWidth : 0.5 , marginHorizontal : 20}} ></View>
            <Pressable style={styles.DrawerButttons} onPress={toggleModal}>
              <View style={styles.box1}>
                <SvgXml xml={DeleteAccountiCON} style={styles.drawerBtnIcon} />
                <Text style={styles.DrawerText}>Delete Account</Text>
              </View>

              <SvgXml xml={LeftArrow} style={styles.drawerBtnIcon} />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.logoutBtn} onPress={() => handleLogOut()}>
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
  username: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0B3C58',
    marginBottom: 30,
  },
  ButtonContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    elevation: 2,
    borderRadius: 8,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userIcon: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#F0F2F2',
    justifyContent: 'space-between',
  },
  modal: {
    width: 60,
    margin: 10,
  },
  DrawerButttons: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottomText: {
    backgroundColor: '#58798C',
    padding: 15,
    alignItems: 'center',
  },
  firstHeading: {
    color: 'black',
    fontSize: 18,
  },
  secondHeading: {
    color: '#58798C'
  },
  drawerBtnIcon: {
    marginHorizontal: 10,
  },
  DrawerText: {
    // fontSize: 20,
    color: 'black',
    justifyContent: 'center'
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
    margin: 10,
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
    marginHorizontal: 10,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#0B3C58',
  },
  noButton: {
    // backgroundColor: 'red',
    borderWidth: 2,
    borderColor: "#0B3C58"
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
