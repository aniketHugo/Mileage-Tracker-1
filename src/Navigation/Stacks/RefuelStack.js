import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Refuel from '../../Screens/Refuel/Refuel';
import AddRefuel from '../../Screens/Refuel/AddRefuel';
import RefuelDetails from '../../Screens/Refuel/RefuelDetails';
import EditRefuel from '../../Screens/Refuel/EditRefuel';
const Stack = createStackNavigator();
const Mystack = createNativeStackNavigator();
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
      <Mystack.Navigator initialRouteName="refuel">
        <Mystack.Screen options={{ headerShown: false }}   name="Refuel" component={Refuel} />
        <Mystack.Screen options={{ headerShown: false }} name="addRefuel" component={AddRefuel} />
        <Mystack.Screen options={{ headerShown: false }} name="editRefuel" component={EditRefuel} />
        <Mystack.Screen options={{ headerShown: false }}   name="RefuelDetails" component={RefuelDetails} />
      </Mystack.Navigator>
    // </NavigationContainer>  ads
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
