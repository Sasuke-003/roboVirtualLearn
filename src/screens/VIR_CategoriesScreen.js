import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  DrawerHeader,
  Offers,
  Categories,
  ChoiceYourCourse,
  DisplayCourses,
} from '../components';
import {images, colors, strings, fonts} from '../assets';
import {getUserDetails} from '../redux/reducers/userReducer';
import {useSelector, useDispatch} from 'react-redux';
import {api} from '../network';
import {NAVIGATION_ROUTES} from '../constants';

const headerLeftIcon = () => (
  <Image
    style={styles.headerLeftIcon}
    source={images.verifyAccountScreen.backIcon}
  />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={images.searchIcon} />
);

const renderTitleDescription = () => (
  <View style={styles.titleDescriptionContainer}>
    <Text style={styles.title}>{strings.categoriesScreen.title}</Text>
    <Text style={styles.description}>
      {strings.categoriesScreen.description}
    </Text>
  </View>
);

const VIR_CategoriesScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const CategoryButton = ({category}) => (
    <TouchableOpacity
      onPress={() => onClickCategory(category.name, category._id)}>
      <View style={styles.button}>
        <Image
          style={styles.buttonImage}
          source={{uri: category.categoryImageUrl}}
        />
        <Text style={styles.buttonText}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const onClickCategory = (categoryName, categoryId) => {
    navigation.navigate(NAVIGATION_ROUTES.CATEGORY_COURSES_SCREEN, {
      categoryName,
      categoryId,
    });
  };

  const headerLeftIconOnPress = () => {
    navigation.goBack();
  };
  const headerRightIconOnPress = () => {};

  useEffect(() => {
    const getCategoriesData = async () => {
      setLoading(true);
      try {
        const {
          data: {data},
        } = await api.course.getAllCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.warn(error);
        setCategories([]);
        setLoading(false);
      }
    };
    getCategoriesData();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <DrawerHeader
          leftIcon={headerLeftIcon}
          leftIconOnPress={headerLeftIconOnPress}
          rightIcon={headerRightIcon}
          rightIconOnPress={headerRightIconOnPress}
          style={{paddingHorizontal: 24}}
          right={24}
        />
        {renderTitleDescription()}

        <View style={styles.categoriesContainer}>
          {loading ? (
            <ActivityIndicator
              color={colors.secondaryText}
              style={{paddingLeft: '48%'}}
            />
          ) : (
            categories.map((category, index) => (
              <CategoryButton key={index} category={category} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VIR_CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.background,
  },
  headerLeftIcon: {height: 17, width: 27},
  headerCenterComponent: {height: 24, width: 113, marginLeft: 32},
  headerRightIcon: {height: 22, width: 22},
  titleDescriptionContainer: {
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.bikoRegular,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 24,
    justifyContent: 'space-between',
  },
  button: {
    height: 80,
    width: 100,
    borderWidth: 1,
    borderColor: colors.inputBorderBottomColor,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonImage: {
    height: 39,
    width: 38,
  },
  buttonText: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 8,
  },
});
