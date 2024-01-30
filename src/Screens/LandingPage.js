import React, { useState, useRef, useEffect } from 'react';
import { View, Image ,Text, StyleSheet,SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import OpenApp from '../utility/OpenApp';
import UseUserStore from '../ZustandStore/ZuStore';



const LandingPage = ({route}) => {
  const navigation = useNavigation();
  const realm = useRealm();
  
  const mystore  = UseUserStore();

  useEffect(()=>{
    const delayNavigation = setTimeout(() => {
      // Replace 'OtherScreen' with the name of the screen you want to navigate to
      OpenApp(realm,navigation,mystore);
    }, 1500); 
    return () => clearTimeout(delayNavigation);
  },[])


  return (

    <SafeAreaView style={styles.container2}>
        <Image source={require('../assets/Logo2.png')} style={styles.img}></Image>
    </SafeAreaView> 

    
  ); 
};

const styles = StyleSheet.create({
    container2 : { 
      flex : 1,
      backgroundColor : '#F55858',
      justifyContent : 'center',
      alignItems : 'center',
    },
    img : {
      width : 200,
      height : 200,

    }

});

export default LandingPage;
