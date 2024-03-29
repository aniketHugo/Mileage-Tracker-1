import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';

import CreateUser from '../../utility/CreateUser';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import LinearGradient from 'react-native-linear-gradient';
import UseUserStore from '../../ZustandStore/ZuStore';
import BackHeader from '../../Components/BackHeader';
import CustomText from '../../Components/CustomText';
import { PrimaryColor } from '../../Components/Theme';

const SetPassCode = ({ route }) => {
  const navigation = useNavigation();
  const realm = useRealm();
  const [checked, setChecked] = useState(false);

  //zustand
  const mystore = UseUserStore();
  //states
  const [errorMsg, setErrorMsg] = useState('');
  const [data, setData] = useState(null);
  const [pinCode1, setPinCode1] = useState('');
  const [pinCode2, setPinCode2] = useState('');

  useEffect(() => {
    if (route.params && route.params.data) {
      setData(route.params.data);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    // console.log(pinCode1, pinCode2)
    if (pinCode1 != pinCode2) {
      setErrorMsg('The passcodes do not match')
    }
    else {
      setErrorMsg('')
      const datas = CreateUser(realm, data.name, data.nickname, pinCode1, data.email, mystore);
      // console.log("create user resp = ", datas)
      navigation.replace('TabNav')
    }
  };

  const handleSubmit2 = async () => {
    // console.log(pinCode1, pinCode2)

      setErrorMsg('')
      const datas = CreateUser(realm, data.name, data.nickname, "", data.email, mystore);
      navigation.replace('TabNav')
  };

  const handlePinCodeChange1 = (code) => {
    setPinCode1(code);
    setPinCode2('')
    setErrorMsg("")
    setChecked(false);
  };
  const handlePinCodeComplete1 = (code) => {
    setPinCode1(code);
    // console.log('Pin code entered:', code);
  };
  const handlePinCodeChange2 = (code) => {
    setPinCode2(code);
    setErrorMsg("")
    // if (pinCode1 != code) {
    //   setChecked(false);
    // }
  };
  const handlePinCodeComplete2 = (code) => {
    setPinCode2(code);
    // console.log('Pin code entered:', code);
    // if (pinCode1 == code) {
      setChecked(true);
    // }
  };

  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View >
          <BackHeader />

          <CustomText style={styles.mainHeading}> Set a Passcode </CustomText>
          <CustomText style={styles.headings}> Enter a 4-Digit Passcode <CustomText style={{color : '#EB655F'}}>*</CustomText> </CustomText>
          <CustomText style={styles.secondHeadings}> You will need to enter at every app launch </CustomText>
          <View style={styles.inputBox}>

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

          <CustomText style={styles.headings}>Confirm Passcode <CustomText style={{color : '#EB655F'}}>*</CustomText> </CustomText>
          <View style={styles.inputBox}>

            <SmoothPinCodeInput
              password
              mask="X"
              cellStyle={styles.cellStyle}
              cellStyleFocused={styles.cellStyleFocused}
              textStyle={styles.textStyle}
              value={pinCode2}
              onTextChange={handlePinCodeChange2}
              onFulfill={handlePinCodeComplete2}
            />
          </View>

          <CustomText>{errorMsg} </CustomText>

        </View>
        <View style={styles.container2}>
          <TouchableOpacity
            disabled={!checked}
            style={
              checked ? styles.buttonEnable : styles.buttonDisable
            }
            onPress={handleSubmit}
          ><CustomText style={styles.btnName}>
              Continue
            </CustomText></TouchableOpacity>
          <Pressable onPress={handleSubmit2} style={styles.btn2} >
            <CustomText >
              Skip
            </CustomText>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    // backgroundColor : '#C5E3DC'
  },
  container2: {

    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom : 20,
  },
  inputBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  cellStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    width: 70,

  },
  buttonEnable: {
    backgroundColor: PrimaryColor,
    padding: 10,
    width: 250,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonDisable: {
    backgroundColor: '#B0B0B0',
    padding: 10,
    width: 250,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cellStyleFocused: {
    borderWidth: 2,
    borderColor: 'black'
  },
  textStyle: {
    color: 'black'
  },
  errorHeading: {
    color: '#F93333',
    marginBottom: 10,
  },
  headings: {
    fontSize: 20,
    marginTop: 20,
    // color: '#0B3C58',
  },
  secondHeadings: {
    marginBottom: 10,
    // color: '#0B3C58',
  },
  mainHeading: {
    fontSize: 25,
    marginVertical: 20,
    fontWeight: 'bold',
    // color: '#0B3C58',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '20%',
    marginEnd: 20,
    // color: '#0B3C58',
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
    borderWidth : 2,
  },
  btnName: {
    color: 'white',
  },
});

export default SetPassCode;
