import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm, useUser } from '@realm/react';

import UseUserStore from '../../ZustandStore/ZuStore';
import LinearGradient from 'react-native-linear-gradient';
import SwitchUser from '../../utility/SwitchUser';
import { SvgXml } from 'react-native-svg';
import { AddIcon, MilageTrackerSignInIcon } from '../../assets/IconsSvg';
import CustomText from '../../Components/CustomText';
import { PrimaryColor } from '../../Components/Theme';

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
      const users = realm.objects('User');
      setUsers(users);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleUserPress = async (userId, userName) => {
    // console.log("Swith : - ",userId,typeof(userId))
    const res = await SwitchUser(realm, navigation, userId,mystore);
    // console.log(res);
    
  };

  // const colors2 = ['#FF5733', '#5733FF','#33A1FF',  '#FF33A1', '#FF3361', '#3361FF'];
  const colors = [
    '#FF6B6B', // Red
    '#BB6BD9', // Purple
    '#6B6BFF', // Blue
    '#FF9393', // Light Red (Shade of Red)
    '#FF9D6B' // Orange
  ];

  
  const getColor = (index) => colors[index % colors.length];

  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}
    >

      <View style={styles.container2}>
        <SafeAreaView style={styles.upper}>
          <SvgXml xml={MilageTrackerSignInIcon}/>
          <CustomText style={{ fontWeight: 'bold', fontSize: 20, color: '#FF4E4E' }} >  Mileage Tracker</CustomText>
        </SafeAreaView>


        {loading ?
          <View>
            <CustomText>Loading</CustomText>
          </View>
          :
          <View style={styles.bottom}>
            <CustomText style={styles.heading}>Who are you?</CustomText>
            <ScrollView contentContainerStyle={styles.usersStyle}>
              {users.map((user,index) => (
                <Pressable style={styles.userPressable} key={user.id} onPress={() => handleUserPress(user.id, user.name)}>
                  {/* <Image source={require('../../assets/userImg2.png')} style={styles.image3} /> */}
                  <View style={{ ...styles.userInitials, backgroundColor: getColor(index) }}>
                    <CustomText style={styles.userInitialsText}>{user.name[0].toUpperCase()}</CustomText>
                  </View>
                  <CustomText style={styles.pressableText} >{user.name} </CustomText>
                </Pressable>
              ))}
              <View style={styles.addView}>

                <Pressable onPress={() => navigation.navigate('CreateAccount')} style={styles.btn2}>
                 
                  <SvgXml xml={AddIcon} width="32" height="32" />
                </Pressable>
                <  CustomText style={styles.pressableText} > Add User </CustomText>
              </View>
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
  addView  :{
    alignItems : 'center',
  },
  bottom : {
    marginBottom : 20,
  },
  heading : {
    alignSelf : 'center',
    fontSize : 20,
    fontWeight : 'bold',
    // color: '#0B3C58',
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
    alignItems: 'center',
    // color: '#0B3C58',
    // color: '#0B3C58',
  },
  userInitials : {
    backgroundColor : 'red',
    borderRadius  :30,
    width : 50,
    height : 50,
    justifyContent : 'center',
    alignItems : 'center',

  },
  userInitialsText : {
    fontSize : 20,
    color : 'white',
  },
  usersStyle: {
    // flex: 1,
    alignSelf: 'center',
    // alignItems : 'center',
    flexDirection: 'row',
    margin: 20,
    width: '60%',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  image2: {
    width: '100%'
  },

  btn2: {
    backgroundColor: PrimaryColor,
    padding: 10,
    width : 50,
    height : 50,
    color: 'blue',
    borderRadius: 100,
    marginTop: 10,
    alignItems: 'center'
  },
});

export default SignIn;
