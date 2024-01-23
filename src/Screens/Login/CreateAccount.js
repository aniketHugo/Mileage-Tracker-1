import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema } from '../../Database/mySchema';
import Realm from 'realm';
import { useRealm } from '@realm/react';
import LinearGradient from 'react-native-linear-gradient';
import BackHeader from '../../Navigation/BackHeader'

const CreateAccount = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [checked, setChecked] = useState(false);
  const realm = useRealm();
  const handleCheckboxToggle = () => {
    if (name && email && /^[a-zA-Z]+$/.test(name) && (/^[a-zA-Z]+$/.test(nickname) || nickname.length === 0) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setChecked(true);
    }
    else {
      setChecked(false);
    }
  };

  const handleCreateAccount = () => {
    if (name.trim() === '') {
      setErrorMessage1('Name cannot be empty');
      return;
    }
    const regex = /^[a-zA-Z ]+$/;
    let nameStatus = regex.test(name);
    if (!nameStatus) {
      setErrorMessage1('You cannot include symbols or numbers');
      return;
    }

    let nicknameStatus = regex.test(nickname);
    if (!nicknameStatus) {
      setErrorMessage2('You cannot include symbols or numbers');
      return;
    }

    const validDomain = 'a';
    const isValid = email.toLowerCase().endsWith(validDomain);

    if (!isValid) {
      setErrorMessage3('Invalid Mail');
      return;
    } else {
      console.log('Valid email address:', email);
    }

    navigation.navigate('SetPassCode', { data: { name: name, nickname: nickname, email: email } })

    console.log('Name:', name);
    console.log('Nickname:', nickname);
    console.log('Email:', email);

    return;

    // Add the user to the Realm database

    //   const userId = `${name}_${Date.now()}`; // You might want to generate a unique ID

    //   realm.write(() => {
    //     realm.create('User', {
    //       id: userId,
    //       name: name,
    //       nickName: nickname,
    //       email: email,
    //     });
    //   });

    //   // Clear the form after adding the user
    //   setName('');
    //   setNickname('');
    //   setEmail('');


    //   const allUsers = realm.objects('User');
    //   allUsers.forEach((user) => {
    //     console.log('User ID:', user.id);
    //     console.log('User Name:', user.name);
    //     console.log('User Nickname:', user.nickName);
    //     console.log('User Email:', user.email);
    //     // Add more properties as needed
    //   });

    // // Log the contents of the User schema
    // console.log('Users in Realm:', allUsers);

    //   console.log()

    //   // Navigate to the next screen or perform additional actions as needed
    //   navigation.navigate('SetPassCode');
  };

  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <KeyboardAvoidingView style={styles.mainPage}>


        <SafeAreaView style={styles.container}>

        <BackHeader/>
          {/* <View > */}
          <Text style={styles.mainHeading}> Create Account </Text>
          <Text style={styles.headings}> Name * </Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            requi
            onChangeText={(text) => setName(text)}
          />
          <Text style={styles.errorHeading}>    {errorMessage1}</Text>
          <Text style={styles.headings}> NickName</Text>
          <TextInput
            style={styles.input}
            placeholder="Nickname"
            value={nickname}
            onChangeText={(text) => setNickname(text)}
          />
          <Text style={styles.errorHeading}>    {errorMessage2}</Text>
          <Text style={styles.headings}> Email Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.errorHeading}>    {errorMessage3}</Text>
        </SafeAreaView>
        <View style={styles.check}>
          <View style={styles.checkBox}>
            <TouchableOpacity onPress={handleCheckboxToggle} style={styles.Text}>
              {checked ? (
                <Image source={require('../../assets/Checkboxes.png')} />
              ) : (
                <Image source={require('../../assets/UncheckedBox.png')} />
              )}
              <Text>
                {' '}
                Tick this box to confirm you are at least 18 years old and agree
                to our terms & conditions{' '}
              </Text>
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
              <Text style={styles.btnName}>Continue</Text>
            </TouchableOpacity>
          </View>

          {/* <Button title="Create Account" onPress={handleCreateAccount} /> */}
        </View>
        {/* </View> */}


      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    margin: 'auto',
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  mainPage: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  errorHeading: {
    color: '#F93333',
    marginBottom: 10,
  },
  headings: {
    fontSize: 20,
    marginVertical: 20,
  },
  mainHeading: {
    fontSize: 25,
    marginVertical: 20,
    fontWeight: 'bold'
  },
  check: {
    height: 170,
    backgroundColor: 'white',
    alignItems: 'center',

    justifyContent: 'space-around',
  },
  checkText: {
    lineHeight: 17,
    fontSize: 14,
  },
  checkBox: {
    padding: 10,
  },
  Text: {
    padding: 10,
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
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
