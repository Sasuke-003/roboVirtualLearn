import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Categories} from '../components';
import {colors, strings, images, fonts} from '../assets';
import {api} from '../network';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getFilteredCourses} from '../redux/reducers/filterSearchReducer';

const Course = props => {
  return (
    <TouchableOpacity>
      <View style={styles.list}>
        <View style={styles.imageContainer}>
          <Image source={{uri: props.image}} style={styles.image} />
        </View>
        <View style={styles.rightPart}>
          <View>
            <Text style={styles.name}>{props.name}</Text>
          </View>
          <Text style={styles.chapterContainer}>
            {props.chapters}
            <Text>{strings.searchScreen.chapters}</Text>
          </Text>
          <View style={styles.categoryBorder}>
            <Text style={styles.categoryName}>{props.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Courses = props => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedList, setSearchedList] = useState([]);
  const filteredCourses = useSelector(getFilteredCourses);

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
        // console.log(error);
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
  }, [props.text, courses]);

  const renderSearchResult = () => {
    return (
      <View style={{flex: 1}}>
        {searchedList.length > 0 ? renderList() : renderNoResults()}
      </View>
    );
  };
  const renderList = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={filteredCourses.length > 0 ? filteredCourses : searchedList}
          keyExtractor={(item, index) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Course
              name={item.name}
              image={item.courseImageUrl}
              chapters={item.courseContent.chapter}
              category={item.category.name}
            />
          )}
        />
      </View>
    );
  };
  const renderCategory = () => {
    return <Categories title={strings.searchScreen.searchCategories} />;
  };

  const renderNotFound = () => {
    return (
      <View style={styles.errorContainer}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={images.searchScreen.noSearchResult}
            style={styles.noSearchImage}
          />
          <View>
            <Text style={styles.errorTitle}>
              {strings.searchScreen.noMatching}
            </Text>
            <Text style={styles.errorMessage}>
              {strings.searchScreen.tryDifferent}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const renderNoResults = () => {
    return (
      <View style={{flex: 1}}>
        {renderNotFound()}
        {renderCategory()}
      </View>
    );
  };

  const renderActivityIndicator = () => {
    return (
      <ActivityIndicator
        color={colors.primaryText}
        style={styles.indicator}
        size={100}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      {!isLoading ? renderSearchResult() : renderActivityIndicator()}
    </View>
  );
};
const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: 30,
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
  categoryBorder: {
    flex: 1,
    backgroundColor: colors.categoryBackground,
    borderRadius: 3,
    marginVertical: 5,
    padding: 3,
    alignSelf: 'flex-start',
  },
  noSearchImage: {
    width: 220,
    height: 300,
    resizeMode: 'contain',
  },
  errorContainer: {
    paddingVertical: 20,
  },
  errorTitle: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaBold,
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0.31,
    lineHeight: 22,
    textAlign: 'center',
    paddingVertical: 10,
  },
  errorMessage: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.31,
    lineHeight: 20,
    textAlign: 'center',
  },
  categoryContainer: {
    flex: 1,
    marginTop: 40,
  },
});
export default Courses;
