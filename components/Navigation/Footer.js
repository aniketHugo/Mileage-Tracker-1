import React from 'react';
import { View,Text, Button, Image,StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import Home from '../Home/Home';
import Refuel from '../Refuel/Refuel';
import SignIn from '../Login/SignIn';
import PassCode from '../Login/PassCode';
import CreateAccount from '../Login/CreateAccount';
import SetPassCode from '../Login/SetPassCode';
import Vehicle from '../Vehicle/Vehicle';
import AddVehicle from '../Vehicle/AddVehicle';
import Performance from '../Performance/Performance';
import AddRefuel from  '../Refuel/AddRefuel';
import RefuelStack from '../Refuel/RefuelStack'
import LoginStack from '../Login/LoginStack';
// import Draw from './Draw';
const Footer = () => {

  const Footer = ({ navigation }) => {
    return (
      <View style={styles.footer}>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Home')}> 
          <Image source={require('../../sources/HomeIcon2.png')}></Image>
          <Text style={styles.name}> Home </Text>
        </Pressable>

        <Pressable style={styles.btn}  onPress={() => navigation.navigate('RefuelStack')}> 
          <Image source={require('../../sources/Refuelcon.png')}></Image>
          <Text style={styles.name}> Refuel </Text>
        </Pressable>

        <Pressable style={styles.btn}  onPress={() => navigation.navigate('Performance')}> 
          <Image source={require('../../sources/Performance.png')}></Image>
          <Text style={styles.name}> Performance </Text>
        </Pressable>

        <Pressable style={styles.btn}  onPress={() => navigation.navigate('Vehicle')}> 
          <Image source={require('../../sources/Vehicle.png')}></Image>
          <Text style={styles.name}> Vehicle </Text>
        </Pressable>
        
        {/* <Button title="Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Refuel" onPress={() => navigation.navigate('Refuel')} />
        <Button title="Performance" onPress={() => navigation.navigate('Performance')} />
        <Button title="Vehicles" onPress={() => navigation.navigate('Vehicle')} /> */}
      </View>
    ); 
  };

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
        <Tab.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Tab.Screen options={{ headerShown: false }}  name="RefuelStack" component={RefuelStack} />
        <Tab.Screen name="Performance" component={Performance} />
        <Tab.Screen name="Vehicle" component={Vehicle} />
        <Tab.Screen options={{ headerShown: false }} name="SignInStack" component={LoginStack} />
        {/* <Tab.Screen name="PassCode" component={PassCode} />
        <Tab.Screen name="CreateAccount" component={CreateAccount} />
        <Tab.Screen name="SetPassCode" component={SetPassCode} /> */}
        <Tab.Screen name="addVehicle" component={AddVehicle} />
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
    backgroundColor: 'white', // Adjust the color as needed
  },
  btn : {
    alignItems:'center'
  }
});

export default Footer;
