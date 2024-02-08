import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { useQuery, useRealm } from '@realm/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import UseUserStore from '../../ZustandStore/ZuStore';
import FetchRefuelData from '../../API/FetchRefuelData';
import { Refuel } from '../../Database/mySchema';
import DeleteRefuel from '../../utility/DeleteRefuel';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { SvgXml } from 'react-native-svg';
import { RefuelFlowerIcon } from '../../assets/IconsSvg';

const FuelData = () => {
  const [refuelData, setRefuelData] = useState([]);
  const mystore = UseUserStore();
  const realm = useRealm()
  const navigation = useNavigation();
  const rfd = useQuery(Refuel)
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit' };
  const options2 = { day: 'numeric', month: 'short', year: '2-digit', };


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [fromDate, setFromDate] = useState(new Date());
  const [msg, setMsg] = useState('')
  const [len, setLen] = useState(0)
  const [items, setItems] = useState([
    { label: 'Last 30 Days', value: 1 },
    { label: 'Last Year', value: 2 },
    { label: 'Last Week', value: 3 },
  ]);

  const filterData = (val) => {
    const current = new Date();
    date = new Date();
    if (val == 1) {
      date.setDate(current.getDate() - 30);
    } else if (val == 3) {
      date.setDate(current.getDate() - 7);
    } else if (val == 2) {
      date.setFullYear(current.getFullYear() - 1);
    } else {
    }
    const newData = mystore.refuelData.filter((curdata) => curdata.refuelDate >= date && curdata.refuelDate <= current);

    setLen(newData.length)
    setFromDate(date)
    setRefuelData(newData)
  }
 
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setTimeout(() => {
      setRefreshing(false);
      // const data = FetchRefuelData(realm, mystore.selectedUserId, mystore.refuelSelectedVehicleId, mystore);
    }, 1000);
  }, []);

  useEffect(() => {
    const dt = filterData(value);
    // console.log("Refuel Data comp ")
  }, [value, rfd, mystore.refuelData]);


  ///////
  const Days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const Months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate('RefuelDetails', {
          refuelItem: {
            id: item.id,
            refuelDate: item.refuelDate,
            refuelAddDate: item.refuelAddDate,
            startReading: item.startReading,
            endReading: item.endReading,
            consumed: item.consumed,
            price: item.price,
            vehicleId: item.vehicleId,
            vehicleName: item.vehicleName // Note the correction here
          },
        })
      }>
      <View style={styles.iconContainer}>
        <SvgXml xml={RefuelFlowerIcon} width="32" height="32" />
      </View>

      <View style={styles.textContainer}>
        {/* <Text style={styles.mainHeading}>{item.refuelDate.toLocaleString('en-US', options)}</Text> */}
        <Text style={styles.mainHeading}>{Days[item.refuelDate.getDay()]}, {item.refuelDate.getDate()} {Months[item.refuelDate.getMonth()]}'{item.refuelDate.getFullYear()%100} </Text>
        
        <Text style={styles.subHeading}>{item.consumed}L</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>+S$ {item.price}</Text>
      </View>
    </Pressable>
  );




  return (

    <View style={styles.container}>
      <View style={styles.horizontalLine} />

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeItem={(item) => setValue(value)}
        disableBorderRadius={true}

        containerStyle={styles.dropdownContainer}
        style={{
          // backgroundColor: "#C6E8E9",
          padding : 0,
          borderWidth: 0,
        }}

      />
      <Text style={styles.filterText}>{`${len} records  |  ${fromDate.toLocaleString('en-GB', options2)}  -  Today`}</Text>

      <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
        data={refuelData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.fuelData}
      />
     

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor : 'red',
  },
  cardContainer: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    elevation: 3,
  },
  filterText: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 15,
    color: '#58798C',
  },
  horizontalLine: {
    borderBottomColor: '#58798C',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  dropdownContainer: {
    width: '50%',
    alignSelf: 'center',
    zIndex: 5,
    borderColor: 'white',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 2,
    paddingLeft: 10,
  },
  mainHeading: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#0B3C58',
  },
  subHeading: {
    fontSize: 14,
    color: '#0B3C58',
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#0B3C58',
  },
  fuelData: {
    // flexGrow: 1,
    flexDirection: 'column', // Arrange items horizontally
    justifyContent: 'space-around', // Adjust spacing between cards
    alignItems: 'center', // Align items vertically
    // marginTop: 50, // Adjust margin as needed
  },
  rowCard: {
    backgroundColor: '#ffffff', // Card background color
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    minWidth: 370, // Card width
  },
  text: {
    fontSize: 16,
    marginBottom: 10, // Spacing between texts
  },

});
export default FuelData;




