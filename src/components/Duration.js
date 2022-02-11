import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {strings, fonts, colors, images} from '../assets';
import {setChapters} from '../redux/reducers/filterSearchReducer';

const durationArray = [
  {
    id: 1,
    name: '1/2 Chapters',
    chapters: [1, 2],
  },

  {id: 2, name: '2/3 Chapters', chapters: [2, 3]},
  {id: 3, name: '3/4 Chapters', chapters: [3, 4]},
  {id: 4, name: '4/5 Chapters', chapters: [4, 5]},
  {id: 5, name: '5/10 Chapters', chapters: [5, 6, 7, 8, 9, 10]},
];
const DisplayDuration = props => {
  const dispatch = useDispatch();
  const onPressDuration = () => {
    dispatch(setChapters(props.chapters));
  };
  return (
    <TouchableOpacity onPress={onPressDuration}>
      <View style={styles.duration}>
        <Text style={styles.name}>{props.name}</Text>
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
          <DisplayDuration
            key={duration.id}
            name={duration.name}
            chapters={duration.chapters}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
