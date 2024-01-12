import React, { useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const CreateAccount = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');


  const handleCreateAccount = () => {
    // Handle account creation logic here
    if(name.trim() === ''){
      setErrorMessage1('Name cannot be empty')
      return;
    }
    const regex =  /^[a-zA-Z ]+$/;
    let nameStatus = regex.test(name);
    if(!nameStatus){
      setErrorMessage1('You cannot include symbols or numbers')
      return;
    }

    let nicknameStatus = regex.test(nickname);
    if(!nicknameStatus){
      setErrorMessage2('You cannot include symbols or numbers')
      return;
    }

    const validDomain = "@gmail.com";
    const isValid = email.toLowerCase().endsWith(validDomain);

    
    if (!isValid) {
      // console.log('Invalid email address');
      setErrorMessage3('Invalid Mail');
      return;
    } else {
      console.log('Valid email address:', email);
    }

    console.log('Name:', name);
    console.log('Nickname:', nickname);
    console.log('Email:', email);

    navigation.navigate('SetPassCode')
    // Add logic to submit or process the account details
  };

  return (
    <View style={styles.container}>
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
      <Button title="Create Account" onPress={handleCreateAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical : 20,
    backgroundColor : '#C5E3DC'
  },
  errorHeading : {
    color : '#F93333',
    marginBottom : 10,
  },
  headings :{
    fontSize : 20,
    marginVertical : 20,
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
    width: '100%',
  },
});

export default CreateAccount;
