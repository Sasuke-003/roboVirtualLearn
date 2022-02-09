import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images, strings, fonts, colors} from '../assets';
Icon.loadFont().then();

const VIR_SearchScreen = () => {
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Icon name="md-arrow-back-sharp" size={35} color={colors.skipLabel} />
        <Text style={styles.headerTitle}>{strings.searchScreen.search}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={{flex: 1}}>{renderHeader()}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 25,
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.39,
    lineHeight: 28,
    textAlign: 'center',
  },
});
export default VIR_SearchScreen;
