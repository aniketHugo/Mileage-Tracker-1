import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // Import Picker from react-native-picker

const AddRefuel = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [refuelDate, setRefuelDate] = useState('');
  const [startReading, setStartReading] = useState('');
  const [endReading, setEndReading] = useState('');
  const [consumed, setConsumed] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    // Handle form submission, validate data, and perform necessary actions
    console.log('Submitted Data:', {
      vehicleName,
      refuelDate,
      startReading,
      endReading,
      consumed,
      price,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Vehicle Name:</Text>
      {/* <Picker
        style={styles.input}
        selectedValue={vehicleName}
        onValueChange={(itemValue) => setVehicleName(itemValue)}
      >
        <Picker.Item label="Select Vehicle" value="" />
        <Picker.Item label="Vehicle 1" value="vehicle1" />
        <Picker.Item label="Vehicle 2" value="vehicle2" />
      
      </Picker> */}

      <Text style={styles.label}>Refueling Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={refuelDate}
        onChangeText={(text) => setRefuelDate(text)}
      />

      <Text style={styles.label}>Start Reading:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={startReading}
        onChangeText={(text) => setStartReading(text)}
      />

      <Text style={styles.label}>End Reading:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={endReading}
        onChangeText={(text) => setEndReading(text)}
      />

      <Text style={styles.label}>Consumed:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={consumed}
        onChangeText={(text) => setConsumed(text)}
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

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
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AddRefuel;
