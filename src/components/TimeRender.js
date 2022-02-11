import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors, fonts, images, strings} from '../assets';
import moment from 'moment';

const TimeRender = ({date}) => {
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setNewDate(moment(date).fromNow());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <Text style={styles.time}>{newDate}</Text>;
};

export default TimeRender;

const styles = StyleSheet.create({
  time: {
    color: '#7A7A7A',
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15,
  },
});
