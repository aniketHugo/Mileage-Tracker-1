import React from 'react';
import { View,Text, Button, Image,StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import Home from '../Screens/Home/Home';
import RefuelStack from './Stacks/RefuelStack';
import LoginStack from './Stacks/LoginStack';
import Vehicle from '../Screens/Vehicle/Vehicle';
import Performance from '../Screens/Performance/Performance';
// import MyStore from '../DB/MyStore'
import Draw from './Draw';
import VehicleStack from './Stacks/VehicleStack';

const Footer = () => {
  const Footer = ({ navigation }) => {
    return (
      <View style={styles.footer}>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Homes')}> 
          <Image source={require('../assets/HomeIcon2.png')}></Image>
          <Text style={styles.name}> Home </Text>
        </Pressable>

        <Pressable style={styles.btn}  onPress={() => navigation.navigate('RefuelStack')}> 
          <Image source={require('../assets/Refuelcon.png')}></Image>
          <Text style={styles.name}> Refuel </Text>
        </Pressable>

        <Pressable style={styles.btn}  onPress={() => navigation.navigate('Performance')}> 
          <Image source={require('../assets/Performance.png')}></Image>
          <Text style={styles.name}> Performance </Text>
        </Pressable>

        <Pressable style={styles.btn}  onPress={() => navigation.navigate('VehicleStack')}> 
          <Image source={require('../assets/Vehicle.png')}></Image>
          <Text style={styles.name}> Vehicle </Text>
        </Pressable>

        {/* <Pressable style={styles.btn}  onPress={() => navigation.navigate('ViewDb')}> 
          <Image source={require('../assets/Vehicle.png')}></Image>
          <Text style={styles.name}> DB </Text>
        </Pressable> */}
        
      </View>
    ); 
  };

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
        <Tab.Screen options={{ headerShown: false }} name="Homes" component={Draw} />
        <Tab.Screen options={{ headerShown: false }}  name="RefuelStack" component={RefuelStack} />
        <Tab.Screen name="Performance" component={Performance} />
        <Tab.Screen options={{ headerShown: false }} name="VehicleStack" component={VehicleStack} />
        <Tab.Screen options={{ headerShown: false }} name="SignInStack" component={LoginStack} />
        {/* <Tab.Screen options={{ headerShown: false }} name="ViewDb" component={DB} /> */}
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

{/* <Tab.Screen name="PassCode" component={PassCode} />
<Tab.Screen name="CreateAccount" component={CreateAccount} />
<Tab.Screen name="SetPassCode" component={SetPassCode} /> */}
{/* <Tab.Screen name="addVehicle" component={AddVehicle} />
<Tab.Screen name="AddRefuel" component={AddRefuel} /> */}