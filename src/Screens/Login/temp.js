// signin 

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Navigation/Header';
import Realm from 'realm';

const SignIn = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Header />
      <Image resizeMode="contain" source={require('../../assets/logo.png')} style={styles.image1} />
        <Text style={{fontWeight : 'bold' , fontSize : 20 ,color: '#FF4E4E' }} >  Mileage Tracker</Text>
      <View style={styles.content}>
        <Text style={{marginBottom : 15}}>Create an Account to get started</Text>
        <Pressable onPress={() => navigation.navigate('CreateAccount')} style={styles.btn} >
          <Text style={styles.btnName}>
            Sign Up
          </Text>
          </Pressable> 
      </View>



      <View style={styles.users}>
        <Pressable onPress={() => navigation.navigate('EnterPassCode')}>
        <Image  source={require('../../assets/PayeeItem.png')} style={styles.image3} />
        </Pressable>
        <Image  source={require('../../assets/PayeeItem.png')} style={styles.image3} />
        <Image  source={require('../../assets/PayeeItem.png')} style={styles.image3} />
      </View>
      {/* if no user :- then this image */}
      <Image  source={require('../../assets/img3.png')} style={styles.image2} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5E3DC',
    justifyContent: 'center',
    alignItems : 'center'
  },
  users :{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btn : {
    backgroundColor : '#0B3C58',
    padding : 10,
    width : 250,
    color : 'blue',
    borderRadius : 10,
    marginTop : 10,
    alignItems : 'center'
  },
  btnName : {
    color : 'white',

  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2 :{
    flex: 1,
    zIndex: 5,
    justifyContent : 'center',
    // padding : '10px',
    width : '100%',
    height : 100
  },
  image1 :{
    flex: 1,
    justifyContent : 'center',
    padding : '10px',
    width : 200,
    height : 200,
  }
});

export default SignIn;
