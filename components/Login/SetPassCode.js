import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const SetPassCode = () => {
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasscodeChange = (text) => {
    if (/^\d*$/.test(text) && text.length <= 4) {
      setPasscode(text);
      setErrorMessage('');
    }
  };

  const handleConfirmPasscodeChange = (text) => {
    if (/^\d*$/.test(text) && text.length <= 4) {
      setConfirmPasscode(text);
      setErrorMessage('');
    }
  };

  const handleSubmit = () => {
    if (passcode.length !== 4 || confirmPasscode.length !== 4) {
      setErrorMessage('Passcode should be 4 digits.');
      return;
    }

    if (passcode !== confirmPasscode) {
      setErrorMessage('Passcodes do not match.');
      return;
    }

    // Here, you can submit the passcode
    console.log('Passcode set:', passcode);
    // Add logic to save or process the passcode
  };

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorMessage}</Text>
      <View style={styles.passcodeContainer}>
        {[...Array(4)].map((_, index) => (
          <TextInput
            key={index}
            style={styles.passcodeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) =>
              index === 0
                ? handlePasscodeChange(text)
                : handleConfirmPasscodeChange(text)
            }
            value={index === 0 ? passcode[index] : confirmPasscode[index]}
            secureTextEntry={true}
          />
        ))}
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  passcodeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    width: 40,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SetPassCode;
