import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import OpenApp from '../utility/OpenApp';
import UseUserStore from '../ZustandStore/ZuStore';
import { SvgUri, SvgXml } from 'react-native-svg';
import { LandingPageLogo } from '../assets/IconsSvg';

const LandingPage = ({ route }) => {
  const navigation = useNavigation();
  const realm = useRealm();

  const mystore = UseUserStore();

  useEffect(() => {
    const delayNavigation = setTimeout(() => {
      OpenApp(realm, navigation, mystore);
    }, 2000);
    return () => clearTimeout(delayNavigation);
  }, [])

  return (

    <SafeAreaView style={styles.container2}>
      <SvgXml xml={LandingPageLogo} width="150" height="149" />
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: '#F55858',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default LandingPage;
