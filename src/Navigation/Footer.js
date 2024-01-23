

import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Draw from './Draw';
import RefuelStack from './Stacks/RefuelStack';
import VehicleStack from './Stacks/VehicleStack';
import LoginStack from './Stacks/LoginStack';
import Performance from '../Screens/Performance/Performance';


const Tab = createBottomTabNavigator();

const Footer = ({ navigation, state }) => {
  const [focusedTab, setFocusedTab] = useState(state.routes[state.index].name);

  const handleTabPress = (tabName) => {
    setFocusedTab(tabName);
    navigation.navigate(tabName);
  };

  const tabImages = {
    Homes: {
      Filled: require('../assets/HomeFilled.png'),
      Unfilled: require('../assets/HomeUnfilled.png'),
    },
    RefuelStack: {
      Filled: require('../assets/RefuelFilled.png'),
      Unfilled: require('../assets/RefuelUnfilled.png'),
    },
    Performance: {
      Filled: require('../assets/PerformanceFilled.png'),
      Unfilled: require('../assets/PerformanceUnfilled.png'),
    },
    VehicleStack: {
      Filled: require('../assets/VehicleFilled.png'),
      Unfilled: require('../assets/VehicleUnfilled.png'),
    },
  };
  const getTabImage = (tabName) => {
    return focusedTab === tabName ? tabImages[tabName].Filled : tabImages[tabName].Unfilled;
  };
  return (
    <View style={styles.footer}>
      <Pressable style={styles.btn} onPress={() => handleTabPress('Homes')}>
        <Image source={getTabImage('Homes')} />
        <Text style={styles.name}> Home </Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => handleTabPress('RefuelStack')}>
        <Image source={getTabImage('RefuelStack')} />
        <Text style={styles.name}> Refuel </Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => handleTabPress('Performance')}>
        <Image source={getTabImage('Performance')} />
        <Text style={styles.name}> Performance </Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => handleTabPress('VehicleStack')}>
        <Image source={getTabImage('VehicleStack')} />
        <Text style={styles.name}> Vehicle </Text>
      </Pressable>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
        <Tab.Screen options={{ headerShown: false }} name="Homes" component={Draw} />
        <Tab.Screen options={{ headerShown: false }} name="RefuelStack" component={RefuelStack} />
        <Tab.Screen name="Performance" component={Performance} />
        <Tab.Screen options={{ headerShown: false }} name="VehicleStack" component={VehicleStack} />
        <Tab.Screen options={{ headerShown: false }} name="SignInStack" component={LoginStack} />
      </Tab.Navigator>
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