import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerHeader, TimeRender} from '../components';
import {colors, fonts, images, strings} from '../assets';
import {api} from '../network';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
const VIR_NotificationScreen = ({navigation}) => {
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchNotification = async () => {
        try {
          const response = await api.course.getNotification();
          if (response?.status === 200) {
            setNotification(response.data.reverse());
            setIsLoading(false);
            const data = await api.course.setNotifications();
          }
        } catch (e) {
          console.log(e.response.data.message);
        }
      };
      fetchNotification();
    }, []),
  );

  const onBackPress = () => {
    navigation.goBack();
  };

  const renderLeftIcon = () => {
    return (
      <Image
        source={images.verifyAccountScreen.backIcon}
        style={styles.headerLeftIcon}
      />
    );
  };

  const renderHeader = () => {
    return (
      <DrawerHeader leftIcon={renderLeftIcon} leftIconOnPress={onBackPress} />
    );
  };

  const renderTitle = () => {
    return <Text style={styles.title}>{strings.notification.title}</Text>;
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.notificationCard,
          !item.isRead && {backgroundColor: colors.notificationBg},
        ]}>
        <View style={styles.imageView}>
          <Image source={{uri: item.notificationIcon}} style={styles.image} />
        </View>
        <View style={styles.infoView}>
          <Text style={styles.description}>{item.notification}</Text>
          <TimeRender date={item.createdAt} />
        </View>
        <View style={styles.notificationIndicatorView}>
          {!item.isRead && <View style={styles.notificationIndicator}></View>}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTitle()}
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={colors.phoneNumberActive} size="large" />
        </View>
      ) : (
        <View style={styles.flatlistContainer}>
          {notification.length > 0 ? (
            <FlatList
              data={notification}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.notFound}>
              <Text>No Notification Found 😃</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default VIR_NotificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  headerLeftIcon: {
    height: 15,
    width: 23,
    marginLeft: 24,
    marginTop: 10,
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.bikoBold,
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 35,
    margin: 20,
  },
  flatlistContainer: {
    marginTop: 10,
    flex: 1,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 4,
  },
  imageView: {
    flex: 2,
  },
  infoView: {
    flex: 14,
    marginLeft: 14,
  },
  notificationIndicatorView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1.2,
  },
  notificationIndicator: {
    backgroundColor: colors.primary,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  description: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 17,
    marginBottom: 8,
  },
  time: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    alignItems: 'center',
    marginTop: '10%',
  },
});
