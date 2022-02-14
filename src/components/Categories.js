import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {api} from '../network';
import {colors, fonts, strings} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {NAVIGATION_ROUTES} from '../constants';

const numOfCatInRow = 3;

const CategoryButton = ({category}) => {
  return (
    <TouchableOpacity>
      <View style={styles.button}>
        <Image
          style={styles.buttonImage}
          source={{uri: category.categoryImageUrl}}
        />
        <Text style={styles.buttonText}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Categories = ({scrollDisabled = false, disableSeeAll = false}) => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const {
          data: {data},
        } = await api.course.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.warn(error);
        setCategories([]);
      }
    };
    getCategoriesData();
  }, []);
  const onCLickSeeAll = () => {
    navigation.navigate(NAVIGATION_ROUTES.CATEGORIES_SCREEN);
  };
  return (
    categories.length > 0 && (
      <View style={styles.mainContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{strings.homeScreen.categories}</Text>
          {!disableSeeAll ? (
            <TouchableOpacity onPress={onCLickSeeAll}>
              <Text style={styles.seeAll}>{strings.homeScreen.seeAll}</Text>
            </TouchableOpacity>
          ) : scrollDisabled && !disableSeeAll ? (
            <TouchableOpacity onPress={onCLickSeeAll}>
              <Text style={styles.seeAll}>{strings.homeScreen.seeAll}</Text>
            </TouchableOpacity>
          ) : null}
          {/* {!disableSeeAll && scrollDisabled && (
          <TouchableOpacity>
            <Text style={styles.seeAll}>{strings.homeScreen.seeAll}</Text>
          </TouchableOpacity>
        )} */}
        </View>
        {scrollDisabled ? (
          <FlatList
            scrollEnabled={false}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.container,
              {flexWrap: 'wrap', width: '100%'},
            ]}
            data={categories}
            horizontal
            renderItem={({item}) => <CategoryButton category={item} />}
          />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ScrollView scrollEnabled={false} bounces={false}>
              <FlatList
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
                data={
                  disableSeeAll
                    ? categories.slice(0, Math.floor(categories.length / 2))
                    : categories.length > numOfCatInRow
                    ? categories.slice(0, numOfCatInRow)
                    : categories
                }
                horizontal
                renderItem={({item}) => <CategoryButton category={item} />}
              />
              {categories.length > numOfCatInRow && (
                <FlatList
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.container}
                  data={
                    disableSeeAll
                      ? categories.slice(Math.floor(categories.length / 2))
                      : categories.length > numOfCatInRow * 2
                      ? categories.slice(numOfCatInRow, numOfCatInRow * 2)
                      : categories.slice(numOfCatInRow)
                  }
                  horizontal
                  renderItem={({item}) => <CategoryButton category={item} />}
                />
              )}
            </ScrollView>
          </ScrollView>
        )}
      </View>
    )
  );
};

export default Categories;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 0,
  },
  container: {
    paddingLeft: 24,
    paddingRight: 16,
    // width: '100%',
    // flexWrap: 'wrap',
  },
  button: {
    height: 30,
    borderWidth: 1,
    borderColor: colors.inputBorderBottomColor,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 8,
    flexDirection: 'row',
    marginBottom: 8,
  },
  buttonImage: {
    height: 20,
    width: 19,
  },
  buttonText: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 12,
  },
});
