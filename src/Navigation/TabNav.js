

import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {hr, wr} from '../Utils/WidthHeightRatioUtil';
import Draw from './Draw';
import RefuelStack from './Stacks/RefuelStack';
import VehicleStack from './Stacks/VehicleStack';
import Performance from '../Screens/Performance/Performance';
import {
  HomeUnfilledSVG,
  PerformanceUnfilledSVG,
  VehicleUnfilledSVG,
  RefuelUnfilledSVG,
  HomeFilledSVG,
  PerformanceFilledSVG,
  VehicleFilledSVG,
  RefuelFilledSVG
} from '../assets/TabBarIconsSVG'
import { SvgXml } from 'react-native-svg';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    // <SafeAreaView style={{flexGrow : 1,height : 40,}}>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Homes') {
              iconName = focused
                ? HomeFilledSVG
                : HomeUnfilledSVG;
            } else if (route.name === 'Performance') {
              iconName = focused
                ? PerformanceFilledSVG
                : PerformanceUnfilledSVG;
            } else if (route.name === 'RefuelStack') {
              iconName = focused
                ? RefuelFilledSVG
                : RefuelUnfilledSVG;
            } else if (route.name === 'VehicleStack') {
              iconName = focused
                ? VehicleFilledSVG
                : VehicleUnfilledSVG;
            }

            return (
              // <Image
              //   source={iconName}
              //   style={{height: 20, width: 20}}
              // />
              <SvgXml xml={iconName} width="32" height="32" />
            );
          },
          headerShown: false,

          tabBarActiveTintColor: '#0B3C58',
          tabBarInactiveTintColor: '#6D8A9B',
          tabBarStyle: [
            {
              display: 'flex',
              height: 60,
              paddingTop: 10,
              borderTopWidth: 1,
              borderTopColor: 'grey',
              // backgroundColor : 'red',
              // justifyContent :'flex-start',
              // alignItems : 'center',
              paddingBottom : 0,

            },
            null,
          ],
          tabBarLabelStyle: {
            fontSize: 14, // Adjust the font size as needed
            paddingTop: 10,
          },
        })}>
        <Tab.Screen name="Homes" component={Draw}></Tab.Screen>
        <Tab.Screen name="RefuelStack" component={RefuelStack}></Tab.Screen>
        <Tab.Screen name="Performance" component={Performance}></Tab.Screen>
        <Tab.Screen name="VehicleStack" component={VehicleStack}></Tab.Screen>
      </Tab.Navigator>
  


  );
};

const styles = StyleSheet.create({

});

export default TabNav;
