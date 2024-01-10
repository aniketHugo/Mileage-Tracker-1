/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Nav from './components/Navigation/Nav';
import Footer from './components/Navigation/Footer';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Footer);
