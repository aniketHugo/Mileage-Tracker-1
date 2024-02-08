

import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Draw from './Draw';
import RefuelStack from './Stacks/RefuelStack';
import VehicleStack from './Stacks/VehicleStack';
import LoginStack from './Stacks/LoginStack';
import Performance from '../Screens/Performance/Performance';
import EnterPassCode from '../Screens/Login/EnterPassCode';
import LandingPage from '../Screens/LandingPage.js';
import TabNav from './TabNav.js';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen options={{ headerShown: false }} name="LandingPage" component={LandingPage} />
        <Stack.Screen options={{ headerShown: false }} name="LoginStack" component={LoginStack} />
        <Stack.Screen options={{ headerShown: false }} name="TabNav" component={TabNav} />
        <Stack.Screen options={{ headerShown: false }} name="EnterPassCode" component={EnterPassCode} />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;
