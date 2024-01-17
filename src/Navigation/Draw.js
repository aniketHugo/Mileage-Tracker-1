import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Home from '../Screens/Home/Home';
import CreateAccount from '../Screens/Login/CreateAccount';
const Drawer = createDrawerNavigator();
import LoginStack from './Stacks/LoginStack';
import { SafeAreaView } from 'react-native-safe-area-context';

const DrawerContent = ({ navigation }) => (
  <SafeAreaView>
    <View>
      <TouchableOpacity style={styles.DrawerButttons} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.DrawerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.DrawerButttons} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.DrawerText} >Sign Out</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const Draw = () => (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen options={{ headerShown: false }}  name="Home" component={Home} />
      <Drawer.Screen options={{ headerShown: false }}  name="Login" component={LoginStack} />
    </Drawer.Navigator>
);


const styles = StyleSheet.create({ 
  DrawerButttons : {
    backgroundColor : 'grey',
    margin : 10,
  },
  DrawerText : {
    padding : 10,
    fontSize : 20,
    color: 'white'
  }
});
export default Draw;
