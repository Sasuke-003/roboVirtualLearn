import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {strings, fonts, colors, images} from '../assets';
import {getChapters, setChapters} from '../redux/reducers/filterSearchReducer';

const durationArray = [
  {
    id: 1,
    range: '1/2',
  },

  {id: 2, range: '2/3'},
  {id: 3, range: '3/4'},
  {id: 4, range: '4/5'},
  {id: 5, range: '5/10'},
];
const DisplayDuration = props => {
  const chapters = useSelector(getChapters);
  const dispatch = useDispatch();

  const index = chapters.findIndex(value => value === props.range);
  const isSelected = index >= 0 ? true : false;
  const onPressDuration = () => {
    dispatch(setChapters(props.range));
  };
  return (
    <TouchableOpacity onPress={onPressDuration}>
      <View
        style={[
          styles.duration,
          {
            backgroundColor: isSelected ? colors.categoryBackground : null,
          },
        ]}>
        <Text style={styles.name}>{props.range} Chapters</Text>
      </View>
    </TouchableOpacity>
  );
};

const Duration = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.searchScreen.duration}</Text>
      <View style={styles.list}>
        {durationArray.map(duration => (
          <DisplayDuration key={duration.id} range={duration.range} />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    paddingVertical: 10,
  },
  title: {
    color: 'black',
    fontFamily: fonts.proximaNovaBold,
    fontWeight: '600',
    fontSize: 19,
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: 'left',
  },
  duration: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.secondaryText,
    borderWidth: 0.45,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  name: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontWeight: '500',
    fontSize: 13,
    letterSpacing: 0.3,
    lineHeight: 15,
  },
});
export default Duration;
