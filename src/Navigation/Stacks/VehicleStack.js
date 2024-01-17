import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Vehicle from '../../Screens/Vehicle/Vehicle';
import AddVehicle from '../../Screens/Vehicle/AddVehicle';


const HomeStack = createNativeStackNavigator();

const VehicleStack = () => {
  return (
    // <NavigationContainer>
      <HomeStack.Navigator initialRouteName="Vehicle">
        <HomeStack.Screen name="Vehicle" component={Vehicle} />
        <HomeStack.Screen name="addVehicle" component={AddVehicle} />
      </HomeStack.Navigator>
    // </NavigationContainer>
  );
};
export default VehicleStack;
