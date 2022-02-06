import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {
  VIR_LoginButton,
  VIR_SocialMediaLogin,
  VIR_TextInput,
} from '../components';
import {strings, fonts, colors} from '../assets';
import {useDimension} from '../hooks';

const VIR_LoginScreen = ({navigation}) => {
  const {height, width, isPortrait} = useDimension();

  const renderTitle = () => {
    return (
      <View>
        <Text style={styles.title}>{strings.loginScreen.title}</Text>
        <Text style={styles.description}>
          {strings.loginScreen.description}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={styles.container(width, height, isPortrait)}>
        {renderTitle()}
        <VIR_SocialMediaLogin />
        <VIR_TextInput />
        <VIR_LoginButton />
      </View>
    </ScrollView>
  );
};

export default VIR_LoginScreen;

const styles = StyleSheet.create({
  container: (width, height, isPortrait) => ({
    flex: 1,
    marginTop: isPortrait ? height / 7 : height / 4,
    paddingHorizontal: Dimensions.get('window').width < 450 ? 35 : 60,
  }),

  title: {
    color: colors.primaryText,
    fontFamily: fonts.BikoBold,
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 35,
    paddingBottom: 15,
  },
  description: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: 'justify',
  },
});
