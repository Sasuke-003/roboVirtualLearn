import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import {OngoingScreen, CompletedScreen} from '../components';
import {images, colors, strings, fonts} from '../assets';

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View style={{flexDirection: 'row', paddingTop: 20, width: '60%'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View style={styles.tabBarView(isFocused)}>
              <Animated.Text style={styles.tabBarName(isFocused)}>
                {label}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const Tab = createMaterialTopTabNavigator();
const MyCoursesTopTabNavigator = () => {
  return (
    <View style={{paddingTop: 20, flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIndicatorStyle: {
            backgroundColor: null,
          },
        })}
        tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Ongoing" component={OngoingScreen} />
        <Tab.Screen name="Completed" component={CompletedScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarName: isFocused => ({
    color: isFocused ? colors.background : colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 17,
    textAlign: 'center',
  }),
  tabBarView: isFocused => ({
    borderRadius: 6,
    backgroundColor: isFocused ? colors.phoneNumberActive : null,
    paddingVertical: 5,
  }),
});
export default MyCoursesTopTabNavigator;
