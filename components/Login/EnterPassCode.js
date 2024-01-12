import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const EnterPasscode = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '']);
  const [errorMsg , setErrorMsg] = useState('');

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;

    // Move to the next box if a digit is entered
    if (value && index < 3) {
      refs[index + 1]?.current?.focus();
    }

    setCode(newCode);
  };
  const handleKeyPress = (index, key) => {
    // Move to the previous box when backspace is pressed in the first box
    if (key === 'Backspace' && index > 0 && code[index]=='') {
      refs[index - 1]?.current?.focus();
    }
  };


  const handleSubmit = () => {
    // Move to the previous box when backspace is pressed in the first box
    const code1 = code.join('');
    if (code1 == '9999') {
      setErrorMsg('The passcodes do not match')
    }
    else{
      setErrorMsg('')
      navigation.navigate('Home')
    }
  };


  // Refs for each TextInput
  const refs = [useRef(), useRef(), useRef(), useRef()];

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}> Welcome Back! </Text>
      <Text style={styles.headings}> Enter a 4-Digit Passcode * </Text>
      <Text style={styles.secondHeadings}> Just checking it’s really you!</Text>
      
      <View style={styles.inputBox} >

      {code.map((digit, index) => (
        <TextInput
        key={index}
        ref={refs[index]}
        style={styles.input}
        keyboardType="numeric"
        maxLength={1}
        value={digit}
        onChangeText={(value) => handleCodeChange(index, value)}
        onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
        />
        ))}
      </View>

      {/* <Text>{`Entered Code: ${code.join('')}`}</Text> */}

      <Text>{errorMsg} </Text>
      <Pressable onPress={handleSubmit} style={styles.btn3} >
        <Text style={styles.btnName}>
          Continue
        </Text>
      </Pressable>
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
  inputBox : {
    flexDirection : 'row'
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
});

export default EnterPasscode;
