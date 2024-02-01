import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm, useUser } from '@realm/react';

import UseUserStore from '../../ZustandStore/ZuStore';
import FetchUsers from '../../utility/FetchUsers';
import LinearGradient from 'react-native-linear-gradient';
import SwitchUser from '../../utility/SwitchUser';

const SignIn = () => {
  const navigation = useNavigation();
  const realm = useRealm();

  //zustand
  const mystore = UseUserStore();


  //states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await realm.objects('User');
      setUsers(users);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleUserPress = async (userId, userName) => {
    console.log("Swith : - ",userId,typeof(userId))
    const res = await SwitchUser(realm, navigation, userId,mystore);
    console.log(res);
    
  };

  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >

      <View style={styles.container2}>
        <SafeAreaView style={styles.upper}>
          <Image resizeMode="contain" source={require('../../assets/logo.png')} style={styles.image1} />
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FF4E4E' }} >  Mileage Tracker</Text>
        </SafeAreaView>


        {loading ?
          <View>
            <Text>Loading</Text>
          </View>
          :
          <View>
            <Text style={styles.heading}>Who are you?</Text>
            <ScrollView contentContainerStyle={styles.usersStyle}>
              {users.map((user) => (
                <Pressable style={styles.userPressable} key={user.id} onPress={() => handleUserPress(user.id, user.name)}>
                  <Image source={require('../../assets/userImg2.png')} style={styles.image3} />
                  <Text style={styles.pressableText} >{user.name} </Text>
                </Pressable>
              ))}

                <Pressable onPress={() => navigation.navigate('CreateAccount')}>
                  <Image source={require('../../assets/FABs.png')} />
                <  Text style={styles.pressableText} > Add User </Text>
                </Pressable>
            </ScrollView>
          </View>
        }
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    marginVertical : 20,
  },
  heading : {
    alignSelf : 'center',
    fontSize : 20,
    fontWeight : 'bold',
  },
  upper: {
    alignItems: 'center',
    marginTop: 20,
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
  addBtn: {
    backgroundColor: '#0B3C58',
    padding: 10,
    // width : 100,
    color: 'blue',
    borderRadius: 100,
    marginTop: 10,
    alignItems: 'center'
  },
  btnName: {
    color: 'white',
  },
  usersStyle: {
    // flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    margin: 20,
    width: '60%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image2: {
    width: '100%'
  }
});

export default SignIn;
