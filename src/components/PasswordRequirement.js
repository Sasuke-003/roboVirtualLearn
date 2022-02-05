import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts, strings} from '../assets';

const PasswordRequirement = ({position}) => {
  return (
    <View style={[styles.requirementView, position]}>
      <Text style={styles.reqTitle}>
        {strings.createNewPassPage.requirementTitle}
      </Text>
      <Text style={styles.reqDescription}>
        {strings.createNewPassPage.requirementDesc}
      </Text>
    </View>
  );
};

export default PasswordRequirement;

const styles = StyleSheet.create({
  requirementView: {
    backgroundColor: colors.background,
    width: '100%',
    // position: 'absolute',
    // top: 33,
    // zIndex: 2,
    paddingLeft: 16,
    paddingVertical: 12,
    borderRadius: 12.5,
    paddingRight: 5,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  reqTitle: {
    color: colors.phoneNumberActive,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
  },
  reqDescription: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 9,
    lineHeight: 15,
    marginTop: 3,
  },
});
