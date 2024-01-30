import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';

import VehicleList from './VehicleList';
import UseUserStore from '../../ZustandStore/ZuStore';
import AddRefuelDB from '../../utility/AddRefuelDB';
import DatePicker from 'react-native-date-picker';

const EditRefuel = ({route}) => {

  const [refuelDate, setRefuelDate] = useState(null);
  const [startReading, setStartReading] = useState('');
  const [endReading, setEndReading] = useState('');
  const [consumed, setConsumed] = useState('');
  const [price, setPrice] = useState('');

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  //zustand
  const { refuelSelectedVehicleId, selectedUserId } = UseUserStore();


  const navigate = useNavigation();
  const realm = useRealm();

  const handleSubmit = () => {
    if (!selectedUserId) {
      console.log('No user selected.');
      return;
    }
    AddRefuelDB(
      realm,
      selectedUserId,
      refuelSelectedVehicleId,
      refuelDate,
      startReading,
      endReading,
      consumed,
      price);
    console.log('Refueled successfully')
    navigate.goBack();
  };

  const handleStartReading = (val) =>{
    setStartReading(val)
  }

  useEffect(() => {
    if (route.params && route.params.data) {
        console.log('parans ',route.params.data)
        setStartReading(route.params.data.startReading);
        setEndReading(route.params.data.endReading);
        setConsumed(route.params.data.consumed);
        setPrice(route.params.data.price);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.curveContainer}>
        {/* Curved background goes here */}
      </View>

      <Text style={styles.heading1}>Add Refueling Record</Text>
      <Text style={styles.heading}>Select Vehicle:</Text>
      <VehicleList />
      <Text style={styles.heading}>Refueling Date:</Text>
      <DatePicker
        modal
        open={open}
        mode='date'
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setRefuelDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
 
      <Button title="Open" onPress={() => setOpen(true)} />


      <Text style={styles.heading}>Odometer</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={parseInt(startReading)}
            // placeholder='Start Reading'
            onChangeText={(text) => setStartReading(text)}
          />
        </View>
        <Text>{startReading}</Text>


        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={parseInt(endReading)}
            // placeholder='End Reading'
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
            value={parseInt(consumed)}
            placeholder='Consumed'
            onChangeText={(text) => setConsumed(text)}
          />
        </View>
        <Text>{consumed}</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={parseInt(price)}
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
  curveContainer: {
    backgroundColor: '#EB655F', // Set your desired curved background color
    borderBottomLeftRadius: 20, // Adjust the radius to control the curve
    borderBottomRightRadius: 20, // Adjust the radius to control the curve
    height: 40, // Adjust the height of the curved background
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it's above other components
  },

  heading: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  heading1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default EditRefuel;