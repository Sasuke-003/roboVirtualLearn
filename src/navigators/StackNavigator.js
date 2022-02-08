import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  VIR_OnBoardingScreen,
  VIR_NewAccountScreen,
  VIR_LoginScreen,
  VIR_ForgotPassword,
  VIR_SuccessScreen,
  VIR_LandingScreen,
  VIR_VerifyAccountScreen,
  VIR_PersonalDetailsScreen,
  VIR_CreateNewPasswordScreen,
  VIR_HomeScreen,
} from '../screens';
import {useDispatch, useSelector} from 'react-redux';
import {
  getIsNewInstallation,
  getAuthToken,
} from '../redux/reducers/userReducer';
import {NAVIGATION_ROUTES} from '../constants';
import {DrawerNavigator} from './';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const StackNavigator = () => {
  const isNewInstallation = useSelector(getIsNewInstallation);
  const authToken = useSelector(getAuthToken);

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={
        authToken === ''
          ? isNewInstallation
            ? NAVIGATION_ROUTES.ON_BOARDING_SCREEN
            : NAVIGATION_ROUTES.LANDING_SCREEN
          : NAVIGATION_ROUTES.DRAWER_NAVIGATOR
      }>
      <Stack.Screen
        name={NAVIGATION_ROUTES.ON_BOARDING_SCREEN}
        component={VIR_OnBoardingScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.LANDING_SCREEN}
        component={VIR_LandingScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.NEW_ACCOUNT_SCREEN}
        component={VIR_NewAccountScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.SUCCESS_SCREEN}
        component={VIR_SuccessScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.LOGIN_SCREEN}
        component={VIR_LoginScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.FORGOT_PASSWORD}
        component={VIR_ForgotPassword}
      />

      <Stack.Screen
        name={NAVIGATION_ROUTES.CREATE_NEW_PASSWORD_SCREEN}
        component={VIR_CreateNewPasswordScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.VERIFY_ACCOUNT_SCREEN}
        component={VIR_VerifyAccountScreen}
        options={{gestureEnabled: false}}
        initialParams={{
          afterVerifyGoto: NAVIGATION_ROUTES.PERSONNEL_DETAILS_SCREEN,
          phoneNumber: '',
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.PERSONAL_DETAILS_SCREEN}
        component={VIR_PersonalDetailsScreen}
        initialParams={{
          phoneNumber: '',
        }}
      />

      <Stack.Screen
        name={NAVIGATION_ROUTES.DRAWER_NAVIGATOR}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
