import React, { useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const CreateAccount = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateAccount = () => {
    // Handle account creation logic here
    console.log('Name:', name);
    console.log('Nickname:', nickname);
    console.log('Email:', email);

    navigation.navigate('SetPassCode')
    // Add logic to submit or process the account details
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}> Create Account </Text>
      <Text style={styles.headings}> Name </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.headings}> NickName</Text>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={nickname}
        onChangeText={(text) => setNickname(text)}
      />
      <Text style={styles.headings}> Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
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
