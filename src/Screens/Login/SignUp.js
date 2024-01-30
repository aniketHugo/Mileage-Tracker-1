import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';

import UseUserStore from '../../ZustandStore/ZuStore';
import ReusableButton from '../../Components/Buttons/ReusableButton';
import FetchUsers from '../../utility/FetchUsers';
import LoginUser from '../../utility/LoginUser';
import LinearGradient from 'react-native-linear-gradient';

const SignIn = () => {
  const navigation = useNavigation();
  const realm = useRealm();

  //zustand
  const {
    setRefuelSelectedVehicleId,
    setRefuelSelectedVehicle,
    setSelectedUserId,
    setSelectedUserName,
    selectedUserId
  } = UseUserStore();
  
  //states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await FetchUsers(realm);
      // console.log("All datas :- ", allUsers);
      setUsers(allUsers);
      setLoading(false);
    };
    fetchUsers();
  }, [selectedUserId]);

  const handleUserPress = async (userId, userName) => {
    const res = await LoginUser(realm, navigation, userId, "", "signIn");
    // console.log(res);
    if (res == "Navigate to enter Passcode") {
      navigation.navigate('EnterPassCode', {
        data: {
          userId: userId,
          userName: userName
        }
      });
      return;
    }
    else {
      setSelectedUserId(userId)
      setSelectedUserName(userName)
      setRefuelSelectedVehicleId(null)
      setRefuelSelectedVehicle('select')
      navigation.navigate('Home')
    }
  };

  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView>

        <View style={styles.container}>
          <Image resizeMode="contain" source={require('../../assets/logo.png')} style={styles.image1} />
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FF4E4E' }} >  Mileage Tracker</Text>
          <View style={styles.content}>
            <ReusableButton destination="CreateAccount" navigation={navigation} Heading='Sign Up' />
          </View>

          {loading ?
            <View>
              <Text>Loading</Text>
            </View>
            :
            <ScrollView contentContainerStyle={styles.usersStyle}>

              {users.map((user) => (
                <Pressable style={styles.userPressable} key={user.id} onPress={() => handleUserPress(user.id, user.name)}>
                  <Image source={require('../../assets/userImg2.png')} style={styles.image3} />
                  <Text style={styles.pressableText} >{user.name} </Text>
                </Pressable>
              ))}
            </ScrollView>
          }

          <Image source={require('../../assets/img3.png')} style={styles.image2} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#C5E3DC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  userPressable: {
    margin: 10,
    alignItems: 'center',
  },
  pressableText: {
    alignItems: 'center'
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
    flexDirection: 'row',
    marginTop: 20,
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
  },
  image2: {
    width: '100%'
  }
});

export default SignIn;
