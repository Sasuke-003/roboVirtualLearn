import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks',
]);

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './navigators';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './redux/store';
import {ErrorModal} from './components';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
          <ErrorModal />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
