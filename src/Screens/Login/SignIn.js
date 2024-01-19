import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Text, StyleSheet, SafeAreaView,TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../Navigation/Header';
import Realm from 'realm';
import { PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema } from '../../Database/mySchema';
import { useNavigation } from '@react-navigation/native';
import UseUserStore from '../../ZustandStore/ZuStore';
import ReusableButton from '../../Components/Buttons/ReusableButton';
import { useRealm } from '@realm/react';
import FetchUsers from '../../utility/FetchUsers';
import LoginUser from '../../utility/LoginUser';
import LogoutUser from '../../utility/LogoutUser';

const SignIn = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const refuelSelectedVehicle = UseUserStore((state) => state.refuelSelectedVehicle)
  const setRefuelSelectedVehicleId = UseUserStore((state) => state.setRefuelSelectedVehicleId)
  const setRefuelSelectedVehicle = UseUserStore((state) => state.setRefuelSelectedVehicle)
  const setSelectedUserId = UseUserStore((state) => state.setSelectedUserId);
  const setSelectedUserName = UseUserStore((state) => state.setSelectedUserName);
  const [loading, setLoading] = useState(true)
  const realm = useRealm();

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await FetchUsers(realm);

      console.log("All datas :- ", allUsers);
      setUsers(allUsers);
      setLoading(false); // Set loading to false once users are fetched
    };

    fetchUsers();
  }, []);

  const handleUserPress = async (userId, userName) => {
    // Handle the press event for a user button
    // const logout = await LogoutUser();
    // console.log('Logout Update :- ',logout)

    console.log('User pressed:', userName);
    setSelectedUserId(userId)
    setSelectedUserName(userName)
    setRefuelSelectedVehicleId(null)
    setRefuelSelectedVehicle('select')
    LoginUser(realm, userId)


    navigation.navigate('Home')
    // Navigate or perform other actions as needed
  };

  return (


<SafeAreaView>

    <View style={styles.container}>
      <Header />
      <Image resizeMode="contain" source={require('../../assets/logo.png')} style={styles.image1} />
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FF4E4E' }} >  Mileage Tracker</Text>
      <View style={styles.content}>
        {/* <Text style={{ marginBottom: 15 }}>Create an Account to get started</Text> */}
        <ReusableButton destination="CreateAccount" navigation={navigation} Heading='Sign Up' />
      </View>


      {loading ?
        <View>
          <Text>Loading</Text>
        </View>
        :
        
        <View style={styles.usersStyle}>

          {/* <ScrollView style={styles.usersStyle}> */}
            {users.map((user) => (
              <Pressable style={styles.userPressable} key={user.id} onPress={() => handleUserPress(user.id, user.name)}>
                <Image source={require('../../assets/userImg2.png')} style={styles.image3} />
                <Text style={styles.pressableText} >{user.name} </Text>
              </Pressable>
            ))}
          {/* </ScrollView> */}
       </View>
      }

      {/* if no user :- then this image */}
      <Image source={require('../../assets/img3.png')} style={styles.image2} />

    </View>

      </SafeAreaView>





  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#C5E3DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPressable : {
    margin : 10,
    alignItems : 'center',
  },
  pressableText : {
    alignItems : 'center'
  },
  btn: {
    backgroundColor: '#0B3C58',
    padding: 10,
    width: 250,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  btnName: {
    color: 'white',
  },
  usersStyle: {
    flexDirection: 'row'
  },
  image2 : {
    width : '100%'
  }
});

export default SignIn;
