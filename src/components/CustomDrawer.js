import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../assets';
import Icon from 'react-native-vector-icons/Feather';
import {getUserDetails} from '../redux/reducers/userReducer';
import {useSelector, useDispatch} from 'react-redux';

const drawerHeader = userDetails => (
  <ImageBackground
    source={{
      uri: userDetails
        ? userDetails.data.image
        : 'https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    }}
    resizeMode="cover"
    style={styles.headerBackgroundImage}>
    <View style={styles.backgroundOpacity}>
      <View style={styles.profileWrapper}>
        <Image
          source={{
            uri: userDetails
              ? userDetails.data.image
              : 'https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
          }}
          style={styles.image}
        />
        <View style={styles.profileDetailsWrapper}>
          <Text style={styles.name}>
            {userDetails && userDetails?.data?.fullname}
          </Text>
          <Text style={styles.occupation}>
            {userDetails &&
              (userDetails?.data?.occupation === undefined
                ? 'Update occupation in profile'
                : userDetails?.data?.occupation)}
          </Text>
        </View>
      </View>
    </View>
  </ImageBackground>
);

const logoutButton = logoutPress => (
  <TouchableOpacity onPress={logoutPress}>
    <View style={styles.logoutButton}>
      <Icon name="power" size={19} color={colors.skipLabel} />
      <Text style={styles.logoutButtonText}>Logout</Text>
    </View>
  </TouchableOpacity>
);

const CustomDrawer = ({logoutPress, ...props}) => {
  const userDetails = useSelector(getUserDetails);
  return (
    <SafeAreaView style={styles.container}>
      {drawerHeader(userDetails)}
      <DrawerContentScrollView
        contentContainerStyle={styles.drawerContentContainerStyle}
        {...props}>
        <DrawerItemList {...props} />
        {logoutButton(logoutPress)}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  headerBackgroundImage: {
    alignItems: 'center',
    flex: 0.31,
    backgroundColor: 'green',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 500,
  },
  backgroundOpacity: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.imageOpacity,
    paddingLeft: 24,
    paddingBottom: 44,
    justifyContent: 'flex-end',
  },
  profileWrapper: {flexDirection: 'row'},
  logoutButton: {
    flexDirection: 'row',
    marginLeft: 19,
    marginTop: 15,
  },
  logoutButtonText: {
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    color: colors.skipLabel,
  },
  drawerContentContainerStyle: {
    paddingTop: 20,
  },
  image: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.imageBorder,
  },
  profileDetailsWrapper: {
    marginLeft: 20,
    alignSelf: 'center',
  },
  name: {
    fontFamily: fonts.biko,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.background,
  },
  occupation: {
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 12,
    color: colors.background,
    marginTop: 5,
  },
});
