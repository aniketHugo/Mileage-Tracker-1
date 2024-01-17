import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import VehicleList from './VehicleList';
import UseUserStore from '../../ZustandStore/ZuStore';

const AddRefuel = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [refuelDate, setRefuelDate] = useState('');
  const [startReading, setStartReading] = useState('');
  const [endReading, setEndReading] = useState('');
  const [consumed, setConsumed] = useState('');
  const [price, setPrice] = useState('');
  const refuelSelectedVehicle = UseUserStore((state) => state.refuelSelectedVehicle);

  const handleSubmit = () => {
    // Handle form submission, validate data, and perform necessary actions
    console.log('Submitted Data:', {
      vehicleName,
      refuelDate,
      startReading,
      endReading,
      consumed,
      price,
      refuelSelectedVehicle,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Add Refueling Record</Text>
      <Text style={styles.heading}>Select Vehicle:</Text>
      <VehicleList/>
      {/* <TextInput
        style={styles.input}
        placeholder="Vehicle"
        value={refuelDate}
        onChangeText={(text) => setRefuelDate(text)}
      /> */}


      <Text style={styles.heading}>Refueling Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={refuelDate}
        onChangeText={(text) => setRefuelDate(text)}
      />

      <Text style={styles.heading}>Odometer</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={startReading}
            placeholder='Start Reading'
            onChangeText={(text) => setStartReading(text)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={endReading}
            placeholder='End Reading'
            onChangeText={(text) => setEndReading(text)}
          />
        </View>
      </View>

      <Text style={styles.heading}>Fuel</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={consumed}
            placeholder='Consumed'
            onChangeText={(text) => setConsumed(text)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={price}
            placeholder='Price'
            onChangeText={(text) => setPrice(text)}
          />
        </View>
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

  heading : {
    fontSize: 20,
    marginTop : 20 ,
    marginBottom : 5,
    alignSelf: 'flex-start',
  },
  heading1 : {
    fontSize : 25,
    fontWeight : 'bold',
    marginBottom : 20,
  },
  datePicker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    // flex: 1,
    height: 60,
    // borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%'
  },
});

export default AddRefuel;
