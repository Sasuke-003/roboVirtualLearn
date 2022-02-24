import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {strings, colors, fonts, images} from '../assets';
const Seperator = () => {
  return <View style={styles.seperator}></View>;
};
const SplitDataCard = ({firstBox, secondBox, thirdBox, style = {}}) => {
  return (
    <View style={[styles.numberCardContainer, style]}>
      <View style={styles.cardView}>
        <Text style={styles.heading}>{firstBox?.title}</Text>
        <Text style={styles.numbers}>{firstBox?.data}</Text>
      </View>
      <Seperator />
      <View style={styles.cardView}>
        <Text style={styles.heading}>{secondBox?.title}</Text>
        <Text style={styles.numbers}>{secondBox?.data}</Text>
      </View>
      <Seperator />
      <View style={styles.cardView}>
        <Text style={styles.heading}>{thirdBox?.title}</Text>
        <Text style={styles.numbers}>{thirdBox?.data}</Text>
      </View>
    </View>
  );
};

export default SplitDataCard;

const styles = StyleSheet.create({
  numberCardContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    marginHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 30,
    alignItems: 'center',
    borderRadius: 6,
    position: 'relative',
    shadowColor: colors.cardShadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 3,
    shadowRadius: 4,
  },
  seperator: {
    backgroundColor: colors.secondaryText,
    height: '82%',
    width: 1,
    opacity: 0.3,
  },
  cardView: {
    alignItems: 'center',
  },
  heading: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  numbers: {
    color: colors.privacy,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
  },
});
