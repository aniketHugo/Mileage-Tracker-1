import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Vehicle from '../../Screens/Vehicle/Vehicle';
import AddVehicle from '../../Screens/Vehicle/AddVehicle';
import VehicleSuccessPage from '../../Screens/Vehicle/VehicleSuccessPage';


const HomeStack = createNativeStackNavigator();

const VehicleStack = () => {
  return (
    // <NavigationContainer>
      <HomeStack.Navigator initialRouteName="Vehicle">
        <HomeStack.Screen options={{ headerShown: false }} name="Vehicle" component={Vehicle} />
        <HomeStack.Screen options={{ headerShown: false }} name="VehicleSuccessPage" component={VehicleSuccessPage} />
        <HomeStack.Screen options={{ headerShown: false }} name="addVehicle" component={AddVehicle} />
      </HomeStack.Navigator>
    // </NavigationContainer>
  );
};
export default VehicleStack;
