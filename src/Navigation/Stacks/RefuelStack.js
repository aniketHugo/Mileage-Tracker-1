import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Refuel from '../../Screens/Refuel/Refuel';
import AddRefuel from '../../Screens/Refuel/AddRefuel';
const Stack = createStackNavigator();
const HomeStack = createNativeStackNavigator();
const RefuelStack = () => {
  const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Button
          title="Go to Screen 2"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
      </View>
    );
  };

  const ProfileScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Button
          title="Go to Screen 1"
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
    );
  };

  return (
    // <NavigationContainer>
      <HomeStack.Navigator initialRouteName="refuel">
        <HomeStack.Screen name="Refuel" component={Refuel} />
        <HomeStack.Screen name="addRefuel" component={AddRefuel} />
      </HomeStack.Navigator>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RefuelStack;
