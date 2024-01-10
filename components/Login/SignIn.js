import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Header from '../Navigation/Header';
import { useNavigation } from '@react-navigation/native';
const SignIn = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <Image resizeMode="contain" source={require('../../sources/logo.png')} style={styles.image1} />
        <Text style={{fontWeight : 'bold' , fontSize : 20 ,color: '#FF4E4E' }} >  Mileage Tracker</Text>
      <View style={styles.content}>
        <Text style={{marginBottom : 15}}>Create an Account to get started</Text>
        <Button title='Sign Up' onPress={() => navigation.navigate('CreateAccount')} style={styles.btn} /> 
      </View>
      <Image  source={require('../../sources/img3.png')} style={styles.image2} />

      

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
  btn : {
    backgroundColor : 'red',
    color : 'blue',
    marginTop : 10
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
