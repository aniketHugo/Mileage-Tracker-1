import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './CreateAccount';
import SetPassCode from './SetPassCode';
import SignIn from './SignIn';
import EnterPasscode from './EnterPassCode';
const Stack = createStackNavigator();

const LoginStack = () => {
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
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen options={{ headerShown: false }}  name="SignIn" component={SignIn} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="SetPassCode" component={SetPassCode} />
        <Stack.Screen name="EnterPassCode" component={EnterPasscode} />
      </Stack.Navigator>
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

export default LoginStack;
