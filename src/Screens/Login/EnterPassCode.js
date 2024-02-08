import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet,SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import LoginUser from '../../utility/LoginUser';
import UseUserStore from '../../ZustandStore/ZuStore';
import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../../Navigation/BackHeader';


const EnterPasscode = ({route}) => {
  const navigation = useNavigation();
  const realm = useRealm();

  // zustand
  const mystore = UseUserStore();
  //states
  const [errorMsg , setErrorMsg] = useState('');
  const [data, setData] = useState(null);
  const [pinCode1, setPinCode1] = useState('');

  useEffect(() => {
    if (route.params && route.params.data) {
      setData(route.params.data);
    }
  }, [route.params]);

  const handleSubmit = async (code) => {
    // console.log( pinCode1,data);
    // console.log("Param = ",data.userId, typeof(data.userId))
    const res = await LoginUser(realm, navigation, data.userId,code,mystore);
    // console.log("enter passcode res :- ",res)
    if(res == "wrong passcode entered"){
      setErrorMsg('Wrong Passcode')
    }
    else{
      // console.log("Enterpasscode data = ",data)

      // navigation.replace('TabNav');
    }
  };



  const handlePinCodeChange1 = (code) => {
    setPinCode1(code);
    setErrorMsg("")
  };
  const handlePinCodeComplete1 =  async (code) => {
    setPinCode1(code);
    handleSubmit(code)
    // console.log('Pin code entered:', code);
  };

  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}

    >
      <SafeAreaView style={styles.container}>
      <BackHeader/>
      <Text style={styles.mainHeading}> Welcome Back! </Text>
      <Text style={styles.headings}> Enter a 4-Digit Passcode <Text style={{color : '#EB655F'}}>*</Text> </Text>
      <Text style={styles.secondHeadings}> Just checking it’s really you!</Text>
      <View  style = {styles.inputBox}>

      <SmoothPinCodeInput
        password
        mask="X"
        autoFocus={true}
        cellStyle={styles.cellStyle}
        cellStyleFocused={styles.cellStyleFocused}
        textStyle={styles.textStyle}
        value={pinCode1}
        onTextChange={handlePinCodeChange1}
        onFulfill={handlePinCodeComplete1}
        />

        </View>
      <Text style={styles.errMsg}>{errorMsg} </Text>
      {/* <Pressable onPress={() => handleSubmit(pinCode1)} style={styles.btn} >
        <Text style={styles.btnName}>
          Continue
        </Text>
      </Pressable> */}
    </SafeAreaView> 
    </LinearGradient>

    
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical : 20,
    marginHorizontal : 20,
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
    color: '#0B3C58',
  },
  secondHeadings : {
    marginBottom: 10,
    color : '#6D8A9B'
  },
  mainHeading :{
    fontSize : 25,
    marginVertical : 20,
    fontWeight : 'bold',
    color: '#0B3C58',
  },

});

export default EnterPasscode;
