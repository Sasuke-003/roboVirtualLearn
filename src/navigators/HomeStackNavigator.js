import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VIR_HomeScreen, VIR_ChoiceYourCourse} from '../screens';

import {NAVIGATION_ROUTES} from '../constants';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const HomeStackNavigator = props => {
  const {goToSearchScreen} = props;

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={NAVIGATION_ROUTES.HOME_SCREEN}>
      <Stack.Screen name={NAVIGATION_ROUTES.HOME_SCREEN}>
        {props => (
          <VIR_HomeScreen {...props} goToSearchScreen={goToSearchScreen} />
        )}
      </Stack.Screen>

      <Stack.Screen
        name={NAVIGATION_ROUTES.CHOICE_YOUR_COURSE}
        component={VIR_ChoiceYourCourse}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});
