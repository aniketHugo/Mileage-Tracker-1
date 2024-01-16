import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import { View, Text,TouchableOpacity } from 'react-native';
import Home from '../Home/Home';
import CreateAccount from '../Login/CreateAccount';

import { NavigationContainer } from '@react-navigation/native';

const DrawerContent = ({ navigation }) => (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Drawer Item 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Text>Drawer Item 2</Text>
      </TouchableOpacity>
    </View>
  );
function Draw() {
  return (
    // <NavigationContainer>
        // <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Navigator >
          <Drawer.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Drawer.Screen name="Switch Account" component={CreateAccount} />
        </Drawer.Navigator>
    // </NavigationContainer>
  );
}
 
export default Draw;

