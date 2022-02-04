import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {fonts, colors} from '../assets';

const Onboard = ({item}) => {
  const {height, width} = useWindowDimensions();
  const portrait = height > width;

  return (
    <View style={styles.container(portrait, height)}>
      <View style={styles.imageView}>
        <Image
          source={item.image}
          style={styles.image(portrait, width, height)}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: (portrait, height) => ({
    flex: portrait ? 1 : height,
    padding: 24,
  }),
  imageView: {
    flex: 1.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12,
  },
  textView: {
    flex: 1,
    marginRight: 38,
  },
  image: (portrait, width, height) => ({
    width: portrait ? '100%' : width / 2,
    height: portrait ? '100%' : height / 1.7,
    resizeMode: 'contain',
  }),
  title: {
    height: 70,
    width: 198,
    color: colors.primaryText,
    fontFamily: fonts.bikoRegular,
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 35,
  },
  description: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 13,
    lineHeight: 22,
    marginTop: 14,
    textAlign: 'left',
  },
});
