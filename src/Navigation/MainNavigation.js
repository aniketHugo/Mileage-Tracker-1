

import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Draw from './Draw.js';
import RefuelStack from './Stacks/RefuelStack.js';
import VehicleStack from './Stacks/VehicleStack.js';
import LoginStack from './Stacks/LoginStack.js';
import Performance from '../Screens/Performance/Performance.js';
import EnterPassCode from '../Screens/Login/EnterPassCode.js';
import LandingPage from '../Screens/LandingPage.js';
import TabNav from './TabNav.js';
import { createStackNavigator } from '@react-navigation/stack';
import AddRefuel from '../Screens/Refuel/AddRefuel.js';
import EditRefuel from '../Screens/Refuel/EditRefuel.js';
import RefuelDetails from '../Screens/Refuel/RefuelDetails.js';
import VehicleSuccessPage from '../Screens/Vehicle/VehicleSuccessPage.js';
import AddVehicle from '../Screens/Vehicle/AddVehicle.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const MainNavigation = () => {
  return (
    <SafeAreaView style={{flex : 1}}>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen options={{ headerShown: false }} name="LandingPage" component={LandingPage} />
        <Stack.Screen options={{ headerShown: false }} name="TabNav" component={TabNav} />
        <Stack.Screen options={{ headerShown: false }} name="LoginStack" component={LoginStack} />
        <Stack.Screen options={{ headerShown: false }} name="EnterPassCode" component={EnterPassCode} />

      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white', // Adjust the color as needed
  },
  btn: {
    alignItems: 'center',
  },
  name: {
    marginTop: 5, // Adjust the spacing as needed
  },
});

export default MainNavigation;
