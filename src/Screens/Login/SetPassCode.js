import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';

import CreateUser from '../../utility/CreateUser';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import LinearGradient from 'react-native-linear-gradient';
import UseUserStore from '../../ZustandStore/ZuStore';
import BackHeader from '../../Navigation/BackHeader';

const SetPassCode = ({route}) => {
  const navigation = useNavigation();
  const realm = useRealm();

  //zustand
  const mystore = UseUserStore();
  //states
  const [errorMsg , setErrorMsg] = useState('');
  const [data, setData] = useState(null);
  const [pinCode1, setPinCode1] = useState('');
  const [pinCode2, setPinCode2] = useState('');

  useEffect(() => {
    if (route.params && route.params.data) {
      setData(route.params.data);
    }
  }, [route.params]);

  const handleSubmit = async() => {
    console.log(pinCode1,pinCode2)
    if (pinCode1 != pinCode2) {
      setErrorMsg('The passcodes do not match')
    }
    else{
      setErrorMsg('')
      const datas = CreateUser(realm,data.name,data.nickname,pinCode1,data.email,mystore);
      console.log("create user resp = ",datas)
      navigation.navigate('TabNav') 
    }
  };

  const handlePinCodeChange1 = (code) => {
    setPinCode1(code);
  };
  const handlePinCodeComplete1 = (code) => {
    setPinCode1(code);
    console.log('Pin code entered:', code);
  };
  const handlePinCodeChange2 = (code) => {
    setPinCode2(code);
  };
  const handlePinCodeComplete2 = (code) => {
    setPinCode2(code);
    console.log('Pin code entered:', code);
  };

  return (
    <LinearGradient
    colors={['#C5E3DC', '#F6F6EC']}
    style={{ flex: 1 }}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  >
    <SafeAreaView style={styles.container}>
      <View>
      <BackHeader/>

      <Text style={styles.mainHeading}> Set a Passcode </Text>
      <Text style={styles.headings}> Enter a 4-Digit Passcode * </Text>
      <Text style={styles.secondHeadings}> You will need to enter at every app launch </Text>
      <View style={styles.inputBox}>

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

      <Text style={styles.headings}>Confirm Passcode * </Text>
      <View style={styles.inputBox}>

      <SmoothPinCodeInput
        // password
        // mask="*"
        cellStyle={styles.cellStyle}
        // cellStyleFocused={styles.cellStyleFocused}
        textStyle={styles.textStyle}
        value={pinCode2}
        onTextChange={handlePinCodeChange2}
        onFulfill={handlePinCodeComplete2}
        />
        </View>

      <Text>{errorMsg} </Text>

    </View>
    <View style={styles.container2}>
      <Pressable onPress={handleSubmit} style={styles.btn} >
        <Text style={styles.btnName}>
          Continue
        </Text>
      </Pressable>
      <Pressable onPress={handleSubmit} style={styles.btn2} >
        <Text >
          Skip
        </Text>
      </Pressable>
    </View>
    </SafeAreaView>
    </LinearGradient>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical : 20,
    // backgroundColor : '#C5E3DC'
  },
  container2: {
    
    flexDirection : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputBox : {
    alignItems : 'center',
    justifyContent : 'center',
    marginVertical : 10
  },
  cellStyle : {
    backgroundColor : 'white',
    alignItems : 'center',
    borderRadius : 5,
    padding : 10,
    width : 70,
    
  },
  cellStyleFocused : {
    borderWidth : 2,
    borderColor : 'black'
  },
  textStyle : {
    color : 'black'
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
  },
  mainHeading :{
    fontSize : 25,
    marginVertical : 20,
    fontWeight : 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor : 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '20%',
    marginEnd : 20,
  },
  btn: {
    backgroundColor: '#0B3C58',
    padding: 10,
    width: 250,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  btn2: {
    // backgroundColor: 'white',
    padding: 10,
    width: 250,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  btnName: {
    color: 'white',
  },
});

export default SetPassCode;
