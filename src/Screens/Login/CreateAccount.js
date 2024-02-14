import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';

import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../../Components/BackHeader'
import { SvgXml } from 'react-native-svg';
import { CheckedBox, UncheckedBox } from '../../assets/IconsSvg';
import CustomText from '../../Components/CustomText';

const CreateAccount = () => {
  const navigation = useNavigation();
  const realm = useRealm();

  //states
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [checked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    let valid = 1;
    if(name.length == 0){
      setErrorMessage1('Name cannot be empty');
      valid = 0;
    }
    if(/^[a-zA-Z\s]*$/.test(name) == false){
      setErrorMessage1('You cannot include symbols or numbers');
      valid = 0;
    }

    if(/^[a-zA-Z\s]*$/.test(nickname) == false){
      setErrorMessage2('You cannot include symbols or numbers');
      valid = 0;
    }
    if(email == ""){
      setErrorMessage3('Email cannot be empty');
      valid = 0;
    }
    if (/^[a-z]+@[a-z]+\.com$/.test(email) == false) {
      setErrorMessage3('Invalid email');
      valid = 0;
    }

    if(valid){
      setChecked(true);
    }
    else{
      setChecked(false);
    }
    
  };

  const handleCreateAccount = () => {
    
    navigation.navigate('SetPassCode', { data: { name: name, nickname: nickname, email: email } })
    return;
  };

  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView  style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={styles.mainPage}>
        <View style={styles.container2}>
          <BackHeader />
          <CustomText style={styles.mainHeading}> Create Account </CustomText>
          <CustomText style={styles.headings}> Name <CustomText style={{color : '#EB655F'}}>*</CustomText> </CustomText>
          <TextInput
            style={styles.input}
            // placeholder="Name"
            value={name}
            requi
            onChangeText={(text) => {setName(text); setErrorMessage1("");  setChecked(false)}}
            />
          <CustomText style={styles.errorHeading}>    {errorMessage1}</CustomText>
          <CustomText style={styles.headings}> NickName</CustomText>
          <TextInput
            style={styles.input}
            // placeholder="Nickname"
            value={nickname}
            onChangeText={(text) => {setNickname(text); setErrorMessage2("");  setChecked(false)}}
            />
          <CustomText style={styles.errorHeading}>    {errorMessage2}</CustomText>
          <CustomText style={styles.headings}> Email Address <CustomText style={{color : '#EB655F'}}>*</CustomText></CustomText>
          <TextInput
            style={styles.input}
            // placeholder="Email Address"
            value={email}
            onChangeText={(text) => {setEmail(text); setErrorMessage3("");  setChecked(false)}}
            keyboardType="email-address"
            autoCapitalize="none"
            />
          <CustomText style={styles.errorHeading}>    {errorMessage3}</CustomText>
        </View>

        <View style={styles.check}>
          <View style={styles.checkBox}>
            <TouchableOpacity onPress={handleCheckboxToggle} style={styles.CustomText}>
              {checked ? (
                <SvgXml xml={CheckedBox} style={styles.image1} />
                ) : (
                  <SvgXml xml={UncheckedBox} style={styles.image1} />
                  )}
              <CustomText style={styles.bannerText}>
                {' '}
                Tick this box to confirm you are at least 18 years old and agree
                to our <CustomText style={{color : '#EB655F'}}>terms & conditions</CustomText> {' '}
              </CustomText>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              disabled={!checked}
              style={
                checked ? styles.buttonEnable : styles.buttonDisable
              }
              onPress={handleCreateAccount}
              >
              <CustomText style={styles.btnName}>Continue</CustomText>
            </TouchableOpacity>
          </View>

 
        </View>
      </ScrollView>
</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container2: {
    marginTop: 10,
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  mainPage: {
    flex: 1,
    alignItems: 'center',
    // flexDirection: 'column',
    justifyContent: "space-between"
  },
  errorHeading: {
    color: '#F93333',
    marginBottom: 10,
  },
  headings: {
    fontSize: 20,
    marginVertical: 10,
    // color: '#0B3C58',
  },
  mainHeading: {
    fontSize: 25,
    marginVertical: 20,
    fontWeight: 'bold',
    // color: '#0B3C58',
  },
  check: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical : 10,

  },
  checkText: {
    lineHeight: 17,
    fontSize: 14,
  },
  checkBox: {
    padding: 10,
  },
  CustomText: {
    padding: 10,
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 4,
    width: '100%',
    // color: '#0B3C58',
    fontSize : 16,
  },
  bannerText : {
    // color: '#0B3C58',
  },
  buttonEnable: {
    backgroundColor: '#0B3C58',
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
  btnName: {
    color: 'white',
  },
});

export default CreateAccount;
