import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet,SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import LoginUser from '../../utility/LoginUser';
import UseUserStore from '../../ZustandStore/ZuStore';
import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../../Navigation/BackHeader';


const EnterPasscode = ({route}) => {
  const navigation = useNavigation();
  const [errorMsg , setErrorMsg] = useState('');
  const realm = useRealm();
  const setRefuelSelectedVehicleId = UseUserStore((state) => state.setRefuelSelectedVehicleId)
  const setRefuelSelectedVehicle = UseUserStore((state) => state.setRefuelSelectedVehicle)
  const setSelectedUserId = UseUserStore((state) => state.setSelectedUserId);
  const setSelectedUserName = UseUserStore((state) => state.setSelectedUserName);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (route.params && route.params.data) {
      setData(route.params.data);
    }
  }, [route.params]);

  const [pinCode1, setPinCode1] = useState('');

  const handlePinCodeChange1 = (code) => {
    setPinCode1(code);
  };

  const handlePinCodeComplete1 =  async (code) => {
    setPinCode1(code);
    console.log('Pin code entered:', code);
  };

  const handleSubmit = async () => {
    // Move to the previous box when backspace is pressed in the first box
    console.log(pinCode1,data);
    const res = await LoginUser(realm, navigation, data.userId,pinCode1,"entered");
    console.log("enter passcode res :- ",res)
    if(res == "wrong passcode entered"){
      setErrorMsg('Wrong Passcode')
    }
    else{
      setSelectedUserId(data.userId)
      setSelectedUserName(data.userName)
      setRefuelSelectedVehicleId(null)
      setRefuelSelectedVehicle('select')
      navigation.navigate('Home');
    }
  };


  // Refs for each TextInput

  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
      <BackHeader/>
      <Text style={styles.mainHeading}> Welcome Back! </Text>
      <Text style={styles.headings}> Enter a 4-Digit Passcode * </Text>
      <Text style={styles.secondHeadings}> Just checking it’s really you!</Text>
      <View  style = {styles.inputBox}>

      <SmoothPinCodeInput
        // password
        // mask="*"
       
        cellStyle={styles.cellStyle}
        cellStyleFocused={styles.cellStyleFocused}
        textStyle={styles.textStyle}
        value={pinCode1}
        onTextChange={handlePinCodeChange1}
        onFulfill={handlePinCodeComplete1}
        />

        </View>
      <Text style={styles.errMsg}>{errorMsg} </Text>
      <Pressable onPress={handleSubmit} style={styles.btn} >
        <Text style={styles.btnName}>
          Continue
        </Text>
      </Pressable>
    </SafeAreaView> 
    </LinearGradient>

    
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical : 20,
  },
  errMsg : {
    margin : 10,
    color : '#F93333'
  },
  btn: {
    backgroundColor: '#0B3C58',
    padding: 10,
    alignSelf : 'center',
    width: 250,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  btnName: {
    color: 'white',
  },
  cellStyle : {
    backgroundColor : 'white',
    alignItems : 'center',
    borderRadius : 5,
    padding : 10,
    width : 70,
    marginHorizontal : 20,
  },
  cellStyleFocused : {
    borderWidth : 2,
    borderColor : 'black'
  },
  textStyle : {
    color : 'black'
  },
  inputBox : {
    alignItems : 'center',
    justifyContent : 'center',
  },
  errorHeading : {
    color : '#F93333',
    marginBottom : 10,
  },
  headings :{
    fontSize : 20,
    marginTop: 20,
  },
  secondHeadings : {
    marginBottom: 10,
    color : '#6D8A9B'
  },
  mainHeading :{
    fontSize : 25,
    marginVertical : 20,
    fontWeight : 'bold'
  },

});

export default EnterPasscode;
