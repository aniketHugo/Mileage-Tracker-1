import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Nav = () => {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
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
});

export default Nav;
