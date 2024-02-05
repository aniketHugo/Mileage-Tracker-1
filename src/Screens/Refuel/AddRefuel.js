import React, { useState } from 'react';
import { View, TextInput, Image, Button, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';

import VehicleList from './VehicleList';
import UseUserStore from '../../ZustandStore/ZuStore';
import AddRefuelDB from '../../utility/AddRefuelDB';
import DatePicker from 'react-native-date-picker';
import BackHeader from '../../Navigation/BackHeader';

const AddRefuel = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [refuelDate, setRefuelDate] = useState(new Date());
  const [startReading, setStartReading] = useState('');
  const [endReading, setEndReading] = useState('');
  const [consumed, setConsumed] = useState('');
  const [price, setPrice] = useState('');
  const options = {
    month: 'numeric',
    day: '2-digit',
    year: 'numeric'
  };

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  //zustand
  const mystore = UseUserStore();

  const navigation = useNavigation();
  const realm = useRealm();

  const handleSubmit = () => {
    if (!mystore.selectedUserId) {
      console.log('No user selected.');
      return;
    }
    AddRefuelDB(
      realm,
      mystore.selectedUserId,
      mystore.refuelSelectedVehicleId,
      refuelDate,
      startReading,
      endReading,
      consumed,
      price);
    console.log('Refueled successfully')
    // navigation.goBack();
    navigation.navigate('Refuel')
  };

  return (
    <View style={styles.page}>
      <View style={styles.container3}>

        <View style={styles.TopBox}>

          <View style={styles.curvedBackground}>
            <View style={styles.circle}></View>
          </View>
          {/* <Pressable style={styles.backButton} onPress={() => navigation.goBack()} >
            <Image source={require('../../assets/BackArrow2.png')} />
          </Pressable> */}

          <View style={styles.inBox}>

            <Text style={styles.heading1}>Add Refueling Record</Text>
            <Text style={styles.heading}>Select Vehicle:</Text>
            <VehicleList />
            <Text style={styles.heading}>Refueling Date:</Text>
            <Pressable style={styles.dateBox} onPress={() => { setOpen(true) }} >
              <Text> {refuelDate.toLocaleString('en-US', options)} </Text>
              <Image style={styles.calendarImg} source={require('../../assets/Calendar.png')} ></Image>
            </Pressable>
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
          </View>
        </View>


        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.noButton]} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText2}>Cancel</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.yesButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>

        </View>
      </View>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()} >
            <Image source={require('../../assets/BackArrow2.png')} />
      </Pressable>
    </View>

  );
};
 
const styles = StyleSheet.create({
  page : {
    flex : 1,
  },
  container3: {
    flexGrow: 1,
    // marginTop: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  curvedBackground: {
    backgroundColor: '#F55858',
    height: 100,
    width: '100%',
    overflow: 'hidden',
  },
  circle: {
    marginTop: 60,
    backgroundColor: '#F0F2F2',
    height: 1700,
    width: 1700,
    borderRadius: 1000,
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 20,
  },

  TopBox: {
    alignItems: 'center',
    paddingHorizontal: 20,
    // backgroundColor : 'red',
  },
  inBox: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#0B3C58',
  },
  noButton: {
    borderWidth: 2,
    borderColor: "#0B3C58"
  },
  buttonText: {
    color: '#fff'
  },


  dateBox: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    width: '100%',
  },

  heading: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  heading1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    height: 40,
    // borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%'
  },
});

export default AddRefuel;
