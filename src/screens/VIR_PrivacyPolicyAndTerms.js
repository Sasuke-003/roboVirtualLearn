import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerHeader} from '../components';
import {colors, fonts, images, strings} from '../assets';

const VIR_PrivacyPolicy = ({navigation, route}) => {
  const {text, title} = route.params;

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
    return <Text style={styles.title}>{title}</Text>;
  };

  const renderBody = () => {
    return (
      <View style={styles.textView}>
        <Text style={styles.text}>{text}</Text>
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

export default VIR_PrivacyPolicy;

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
  textView: {
    marginHorizontal: 24,
  },
  text: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
    lineHeight: 20,
  },
});
