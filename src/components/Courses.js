import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Categories} from './index';
import {colors, strings, images, fonts} from '../assets';
import {api} from '../network';

const Course = props => {
  return (
    <View style={styles.list}>
      <View style={styles.imageContainer}>
        <Image source={{uri: props.image}} style={styles.image} />
      </View>
      <View style={styles.rightPart}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
          {props.name}
        </Text>
        <Text style={styles.chapterContainer}>
          {props.chapters}
          <Text>{strings.searchScreen.chapters}</Text>
        </Text>
        <View>
          <Text></Text>
        </View>
      </View>
    </View>
  );
};

const Courses = props => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setIsLoading(true);
        const response = await api.course.getAllCourses();
        if (response.status === 200) {
          setCourses(response.data.courses);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getCourses();
    return () => {
      setIsLoading(true);
    };
  }, []);

  useEffect(() => {
    setSearchedList(
      courses.filter(course => {
        return course.name.toLowerCase().includes(props.text.toLowerCase());
      }),
    );
    props.searchedArray(searchedList);
  }, [props.text, courses]);

  const renderList = () => {
    return (
      <View style={styles.listContainer}>
        {!isLoading && searchedList.length > 0 ? (
          <FlatList
            data={searchedList}
            keyExtractor={(item, index) => item._id}
            renderItem={({item}) => (
              <Course
                name={item.name}
                image={item.courseImageUrl}
                chapters={item.courseContent.chapter}
                category={item.category}
              />
            )}
          />
        ) : null}

        {isLoading && (
          <ActivityIndicator
            color={colors.primaryText}
            style={styles.indicator}
            size={100}
          />
        )}
      </View>
    );
  };
  return <View>{props.text !== '' && renderList()}</View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    marginTop: 35,
  },
  list: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  imageContainer: {
    borderRadius: 6,
    borderWidth: 0.3,
    width: 60,
    height: 55,
    overflow: 'hidden',
  },
  image: {
    width: 60,
    height: 55,
    resizeMode: 'cover',
  },

  rightPart: {
    flex: 2,
    paddingLeft: 15,
  },
  name: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaMedium,
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'left',
  },
  chapterContainer: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontWeight: '500',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: 'left',
    paddingTop: 2,
  },
});
export default Courses;
