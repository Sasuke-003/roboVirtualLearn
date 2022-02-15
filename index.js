import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks',
  'Non-serializable values were found in the navigation state.',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  '`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead.',
]);
AppRegistry.registerComponent(appName, () => App);
