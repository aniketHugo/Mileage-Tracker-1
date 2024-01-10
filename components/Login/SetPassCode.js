import React, { useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const SetPassCode = () => {
  const navigation = useNavigation();
  const [Code, setName] = useState('');
  const [ConfirmCode, serConfirmCode] = useState('');


  const handleSubmit = () => {
    // Handle account creation logic here

    navigation.navigate('Home')
    // Add logic to submit or process the account details
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}> Set a Passcode </Text>
      <Text style={styles.headings}> Enter a 4 digit Passcode </Text>
      <TextInput
        style={styles.input}
        placeholder="# # # #"
        value={Code}
        onChangeText={(text) => setCode(text)}
      />
      <Text style={styles.headings}> Confirm Passcode</Text>
      <TextInput
        style={styles.input}
        placeholder="# # # #"
        value={ConfirmCode}
        onChangeText={(text) => serConfirmCode(text)}
      />
      <Button title="Continue" onPress={handleSubmit} />
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

export default SetPassCode;
