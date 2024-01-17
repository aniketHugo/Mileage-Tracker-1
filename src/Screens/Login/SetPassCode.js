import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const SetPassCode = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '']);
  const [confirmCode, setConfirmCode] = useState(['', '', '', '']);
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

  const handleCodeChange2 = (index, value) => {
    const newCode = [...confirmCode];
    newCode[index] = value;

    // Move to the next box if a digit is entered
    if (value && index < 3) {
      refs2[index + 1]?.current?.focus();
    }

    setConfirmCode(newCode);
  };

  const handleKeyPress2 = (index, key) => {
    // Move to the previous box when backspace is pressed in the first box
    if (key === 'Backspace' && index > 0 && confirmCode[index] =='') {
      refs2[index - 1]?.current?.focus();
    }
  };

  const handleSubmit = () => {
    // Move to the previous box when backspace is pressed in the first box
    const code1 = code.join('');
    const code2 = confirmCode.join('');
    if (code1 != code2) {
      setErrorMsg('The passcodes do not match')
    }
    else{
      setErrorMsg('')
      navigation.navigate('Home')
    }
  };


  // Refs for each TextInput
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const refs2 = [useRef(), useRef(), useRef(), useRef()];

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}> Create Account </Text>
      <Text style={styles.headings}> NaEnter a 4-Digit Passcode * </Text>
      <Text style={styles.secondHeadings}> You will need to enter at every app launch </Text>
      
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

      <Text>{`Entered Code: ${code.join('')}`}</Text>

      <Text style={styles.headings}>Confirm Passcode * </Text>
      <View style={styles.inputBox} >

      {confirmCode.map((digit, index) => (
        <TextInput
        key={index}
        ref={refs2[index]}
        style={styles.input}
        keyboardType="numeric"
        maxLength={1}
        value={digit}
        onChangeText={(value) => handleCodeChange2(index, value)}
        onKeyPress={({ nativeEvent: { key } }) => handleKeyPress2(index, key)}
        />
        ))}
      </View>
      <Text>{`Entered Code: ${confirmCode.join('')}`}</Text>
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

export default SetPassCode;
