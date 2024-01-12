import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
import SignIn from './components/Login/SignIn';
import Nav from './components/Navigation/Nav';
import { NavigationContainer } from '@react-navigation/native';
function App() {
  return (
    <NavigationContainer>
        <Drawer.Navigator>
        <Drawer.Screen name="Feed" component={Nav} />
        {/* <Drawer.Screen name="Article" component={Article} /> */}
        </Drawer.Navigator>
    </NavigationContainer>
  );
}
 
export default App;

