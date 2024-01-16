/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import App from './App';
// import Nav from './components/Navigation/Nav';
// import Footer from './components/Navigation/Footer';
import {name as appName} from './app.json';
import Footer from './components/Navigation/Footer';

AppRegistry.registerComponent(appName, () => Footer);
