import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from '../../Screens/Login/CreateAccount';
import SetPassCode from '../../Screens/Login/SetPassCode';
import SignIn from '../../Screens/Login/SignIn';
import EnterPasscode from '../../Screens/Login/EnterPassCode';
const Stack = createStackNavigator();

const LoginStack = () => {

  return (
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen options={{ headerShown: false }}  name="SignIn" component={SignIn} />
        <Stack.Screen options={{ headerShown: false }}  name="CreateAccount" component={CreateAccount} />
        <Stack.Screen options={{ headerShown: false }}  name="SetPassCode" component={SetPassCode} />
        <Stack.Screen options={{ headerShown: false }}  name="EnterPassCode" component={EnterPasscode} />
      </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginStack;
