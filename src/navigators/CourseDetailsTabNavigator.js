import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NAVIGATION_ROUTES} from '../constants';
import {Overview, Chapters} from '../components';
import {colors, fonts, strings} from '../assets';

const Tab = createMaterialTopTabNavigator();

const CourseDetailsTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 18,
          fontFamily: fonts.sFnSDisplayRegular,
          lineHeight: 21,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          paddingHorizontal: 24,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      <Tab.Screen
        name={NAVIGATION_ROUTES.COURSE_DETAILS_OVERVIEW_TAB}
        component={Overview}
        options={{
          tabBarLabel: strings.courseDetailsSCreen.overViewTabName,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTES.COURSE_DETAILS_CHAPTERS_TAB}
        component={Chapters}
        options={{
          tabBarLabel: strings.courseDetailsSCreen.chaptersTabName,
        }}
      />
    </Tab.Navigator>
  );
};

export default CourseDetailsTabNavigator;

const styles = StyleSheet.create({});
