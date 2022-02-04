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
