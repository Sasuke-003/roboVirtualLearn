import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerHeader} from '../components';
import {colors, fonts, images, strings} from '../assets';
import {useSelector, useDispatch} from 'react-redux';
import {
  getPushNotification,
  getNotificationSound,
  setPushNotification,
  setNotificationSound,
} from '../redux/reducers/notificationReducer';
import {store} from '../redux/store';

const VIR_SettingsScreen = ({navigation, goToNextScreen}) => {
  const [showNotification, setShowNotification] = useState(false);
  const togglePushSwitch = () => store.dispatch(setPushNotification());
  const toggleSoundSwitch = () => store.dispatch(setNotificationSound());
  const showPushNotification = useSelector(getPushNotification);
  const showSound = useSelector(getNotificationSound);

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

  const showNotificationDetails = () => {
    setShowNotification(!showNotification);
  };

  const renderTitle = () => {
    return <Text style={styles.title}>{strings.settings.title}</Text>;
  };

  const renderNotificationDetails = () => {
    return (
      <TouchableOpacity onPress={showNotificationDetails}>
        <View
          style={[
            styles.notificationView,
            !showNotification && styles.beforePressNotification,
          ]}>
          <Image source={images.settings.notification} style={styles.icons} />
          <Text style={styles.text}>{strings.settings.notificationTitile}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSubNotificationSwitch = () => {
    return (
      <View style={styles.notificationSetting}>
        <View style={[styles.innerNotification, styles.pushNotification]}>
          <Text style={styles.text}>{strings.settings.pushNotification}</Text>
          <Switch
            trackColor={{
              false: colors.switchFalse,
              true: colors.switchTrue,
            }}
            onValueChange={togglePushSwitch}
            value={showPushNotification}
            style={styles.switch}
          />
        </View>
        <View style={styles.innerNotification}>
          <Text style={styles.text}>{strings.settings.notificationSound}</Text>
          <Switch
            trackColor={{
              false: colors.switchFalse,
              true: colors.switchTrue,
            }}
            onValueChange={toggleSoundSwitch}
            value={showSound}
            style={styles.switch}
          />
        </View>
      </View>
    );
  };

  const renderPrivacyPolicy = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          goToNextScreen({
            title: strings.privacy.title,
            text: strings.privacy.text,
          })
        }>
        <View style={styles.mainViews}>
          <Image source={images.settings.privacy} style={styles.icons} />
          <Text style={styles.text}>{strings.settings.privacy}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTermsOfService = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          goToNextScreen({
            title: strings.terms.title,
            text: strings.terms.text,
          })
        }>
        <View style={styles.mainViews}>
          <Image source={images.settings.terms} style={styles.icons} />
          <Text style={styles.text}>{strings.settings.terms}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.allLabels}>
        {renderNotificationDetails()}
        {showNotification ? renderSubNotificationSwitch() : null}
        {renderPrivacyPolicy()}
        {renderTermsOfService()}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTitle()}
      {renderBody()}
    </SafeAreaView>
  );
};

export default VIR_SettingsScreen;

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
  icons: {
    width: 17,
    height: 19,
  },
  mainViews: {
    flexDirection: 'row',
    marginBottom: 34,

    alignItems: 'center',
  },
  allLabels: {
    marginHorizontal: 24,
    marginVertical: 20,
  },
  notificationView: {
    flexDirection: 'row',
    marginBottom: 19,
    alignItems: 'center',
  },
  beforePressNotification: {
    marginBottom: 34,
  },
  text: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginLeft: 17,
  },
  notificationSetting: {
    marginBottom: 35,
    marginLeft: 28,
  },
  pushNotification: {
    marginBottom: 18,
  },
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
  innerNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
