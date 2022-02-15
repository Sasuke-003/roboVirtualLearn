import {createStore, combineReducers} from 'redux';
import userReducer from './reducers/userReducer';
import popupModalReducer from './reducers/popupModalReducer';
import filterSearchReducer from './reducers/filterSearchReducer';
import notificationReducer from './reducers/notificationReducer';
import MyCourseReducer from './reducers/MyCourseReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootReducer = combineReducers({
  userReducer,
  popupModalReducer,
  filterSearchReducer,
  notificationReducer,
  MyCourseReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['popupModalReducer', 'filterSearchReducer', 'MyCourseReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
