import React, { useState } from 'react';
import { View, TextInput, Image, Button, Text, StyleSheet, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';

import VehicleList from './VehicleList';
import UseUserStore from '../../ZustandStore/ZuStore';
import AddRefuelDB from '../../utility/AddRefuelDB';
import DatePicker from 'react-native-date-picker';
import { SvgXml, err } from 'react-native-svg';
import { CalendarIcon, WhiteBackArrow } from '../../assets/IconsSvg';
import CustomText from '../../Components/CustomText';

const AddRefuel = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [refuelDate, setRefuelDate] = useState(new Date());
  const [startReading, setStartReading] = useState('');
  const [endReading, setEndReading] = useState('');
  const [consumed, setConsumed] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(true);

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

  const handleSubmit = async () => {

    if (!mystore.selectedUserId) {
      // console.log('No user selected.');
      return;
    }
    if(isNaN(startReading) || isNaN(endReading) || isNaN(price) || isNaN(consumed)){
      setError("Enter a valid number")
      return;
    }
    if(parseFloat(startReading) >parseFloat(endReading)){
      setError("Odometer Start reading should be smaller than End Reading")
      return;
    }
    if((startReading < 0) || (endReading < 0) || (price < 0) || (consumed < 0)){
      setError("Values cannot be Negative")
      return;
    }
    if(parseFloat(consumed) == 0){
      setError("Consumned Fuel cannot be 0")
      return;
    }
    if((startReading) == "" || (endReading) == "" || (price) == "" || (consumed) == ""){
      setError("Enter mandatory fields!")
      return;
    }
    else{
      // console.log("Is a number")
    }
    // console.log(parseFloat(startReading),typeof(parseFloat(startReading)))
    let currDate = new Date();
    
   const resp = await AddRefuelDB(
      realm,
      mystore.selectedUserId,
      mystore.refuelSelectedVehicleId,
      mystore.refuelSelectedVehicle,
      refuelDate,
      currDate,
      startReading,
      endReading,
      consumed,
      price);

      if(resp.status == 1){
        navigation.navigate('Refuel')
      }
      else{
        console.log("Cannot refuel");
      }
      // console.log("resp = ",resp);
    // console.log('Refueled successfully')
    // navigation.goBack();
    // navigation.navigate('Refuel')
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

            <CustomText style={styles.heading1}>Add Refueling Record</CustomText>
            <CustomText style={styles.heading}>Select Vehicle:</CustomText>
            <VehicleList />
            <CustomText style={styles.heading}>Refueling Date:</CustomText>
            <Pressable style={styles.dateBox} onPress={() => { setOpen(true) }} >
              <CustomText> {refuelDate.toLocaleDateString('en-GB')} </CustomText>
              <SvgXml xml={CalendarIcon} style={styles.calendarImg} />
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

            <CustomText style={styles.heading}>Odometer</CustomText>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={startReading}
                  placeholder='Start Reading'
                  onChangeText={(text) => {setStartReading(text);setError("")}}
                />
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={endReading}
                  placeholder='End Reading'
                  onChangeText={(text) => {setEndReading(text); setError("")}}
                />
              </View>
            </View>

            <CustomText style={styles.heading}>Fuel</CustomText>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={consumed}
                  placeholder='Consumed'
                  onChangeText={(text) => {setConsumed(text); setError("")}}
                />
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={price}
                  placeholder='Price'
                  onChangeText={(text) => {setPrice(text); setError("")}}
                />
              </View>
            </View>
          </View>
          <CustomText style={styles.errorHeading}>{error}</CustomText>
        </View>


        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.noButton]} onPress={() => navigation.navigate("Refuel")}>
            <CustomText style={styles.buttonText2}>Cancel</CustomText>
          </Pressable>

          <Pressable
            // style={[styles.button, styles.yesButton]}
            disabled={!checked}
            style={[styles.button,
            checked ? styles.buttonEnable : styles.buttonDisable]
            }
            onPress={handleSubmit}>
            <CustomText style={styles.buttonText}>Save</CustomText>
          </Pressable>

        </View>
      </View>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate("Refuel")} >
        <SvgXml xml={WhiteBackArrow} width="32" height="32" />
      </Pressable>
    </View>

  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
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

  errorHeading: {
    color: '#F93333',
    marginVertical: 10,
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
    // color: '#0B3C58',
  },
  heading1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    // color: '#0B3C58',
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
    width: '100%',
    color: '#0B3C58',
  },

  buttonEnable: {
    backgroundColor: '#0B3C58',
  },
  buttonDisable: {
    backgroundColor: '#B0B0B0',
  },
  buttonText2 : {
    // color: '#0B3C58',
  }
});

export default AddRefuel;
