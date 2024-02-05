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

  return (
    <LinearGradient
      colors={['#C5E3DC', '#F6F6EC']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
        <View style={styles.Page}>
          <View style={styles.Top}>
            <Image resizeMode="contain" source={require('../../assets/logo.png')} style={styles.image1} />
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FF4E4E' }} >  Mileage Tracker</Text>
            <Text style={styles.secHeading}>Create an account to get started</Text>
            <View style={styles.content}>
              <ReusableButton destination="CreateAccount" navigation={navigation} Heading='Sign Up' />
            </View>
          </View>

          <View style={styles.Bottom}>
            <Image source={require('../../assets/img3.png')} style={styles.image2} />
            <Text style={styles.text}>Track your miles towards a {'\n'} prosperous financial journey!</Text>
          </View>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  Page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: 40,
  },
  Bottom : {
    position : 'relative',
  },
  Top : {
    alignItems : 'center',

  },
  text: {
    color: '#0B3C58',
    position : 'absolute',
    fontSize: 20,
    zIndex : 1,
    alignSelf : 'center',
    textAlign : 'center',
    bottom : 80,
  },

  secHeading : {
    marginVertical : 10,
    fontSize : 18,
    color : '#0B3C58',
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

  image2: {
    width: 430,
    height: 380,
    flexShrink: 0,
  }
});

export default SignIn;
