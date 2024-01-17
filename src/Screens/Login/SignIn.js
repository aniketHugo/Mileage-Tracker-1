import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../Navigation/Header';
import Realm from 'realm';
import { PerformanceDataSchema, RefuelDataSchema, UserSchema, VehicleSchema } from '../../Database/mySchema';
import { useNavigation } from '@react-navigation/native';
import UseUserStore from '../../ZustandStore/ZuStore';
import ReusableButton from '../../Components/Buttons/ReusableButton';
import { useRealm } from '@realm/react';

const SignIn = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const setSelectedUserId = UseUserStore((state) => state.setSelectedUserId);
  const setSelectedUserName = UseUserStore((state) => state.setSelectedUserName);

  const realm = useRealm();
  useEffect(() => {
    const allUsers = realm.objects('User');
    console.log("All data :- ",allUsers)
    setUsers(allUsers);
  }, []);

  const handleUserPress = (userId, userName) => {
    // Handle the press event for a user button
    console.log('User pressed:', userName);
    setSelectedUserId(userId)
    setSelectedUserName(userName)

    navigation.navigate('Home')
    // Navigate or perform other actions as needed
  };

  return (



    <View style={styles.container}>
      <Header />
      <Image resizeMode="contain" source={require('../../assets/logo.png')} style={styles.image1} />
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FF4E4E' }} >  Mileage Tracker</Text>
      <View style={styles.content}>
        <Text style={{ marginBottom: 15 }}>Create an Account to get started</Text>
        <ReusableButton destination="CreateAccount" navigation={navigation} Heading='Sign Up'/>
      </View>



      {/* <View style={styles.usersStyle}>
        <Pressable onPress={() => navigation.navigate('EnterPassCode')}>
          <Image source={require('../../assets/PayeeItem.png')} style={styles.image3} />
        </Pressable>
        <Image source={require('../../assets/PayeeItem.png')} style={styles.image3} />
        <Image source={require('../../assets/PayeeItem.png')} style={styles.image3} />
      </View> */}


      <ScrollView>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.btn}
            onPress={() => handleUserPress(user.id, user.name)}
          >
            <Text style={styles.btnName}>{user.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* if no user :- then this image */}
      <Image source={require('../../assets/img3.png')} style={styles.image2} />

    </View>




  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5E3DC',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default SignIn;
