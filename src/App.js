import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks',
]);

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './navigators';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './redux/store';
import {MessageModal} from './components';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    let timer1 = setTimeout(async () => {
      SplashScreen.hide();
    }, 3000);

    return () => {
      clearTimeout(timer1);
    };
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
          <MessageModal />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
