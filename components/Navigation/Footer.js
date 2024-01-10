import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import Home from '../Home/Home';
import Refule from '../Refule/Refule';
import SignIn from '../Login/SignIn';
import PassCode from '../Login/PassCode';
import CreateAccount from '../Login/CreateAccount';
import SetPassCode from '../Login/SetPassCode';
import Vehicle from '../Vehicle/Vehicle';
import AddVehicle from '../Vehicle/AddVehicle';
import Performance from '../Performance/Performance';
import AddRefuel from  '../Refule/AddRefuel';

const Footer = () => {

  const Footer = ({ navigation }) => {
    return (
      <View style={styles.footer}>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Refule" onPress={() => navigation.navigate('Refule')} />
        <Button title="Performance" onPress={() => navigation.navigate('Performance')} />
        <Button title="Vehicles" onPress={() => navigation.navigate('Vehicle')} />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Refule" component={Refule} />
        <Tab.Screen name="Performance" component={Performance} />
        <Tab.Screen name="Vehicle" component={Vehicle} />
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="PassCode" component={PassCode} />
        <Tab.Screen name="CreateAccount" component={CreateAccount} />
        <Tab.Screen name="SetPassCode" component={SetPassCode} />
        <Tab.Screen name="AddVehicle" component={AddVehicle} />
        <Tab.Screen name="AddRefuel" component={AddRefuel} />
    
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
    backgroundColor: 'black', // Adjust the color as needed
  },
});

export default Footer;
