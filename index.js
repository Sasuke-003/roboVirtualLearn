import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks',
]);
AppRegistry.registerComponent(appName, () => App);
