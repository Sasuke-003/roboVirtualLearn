import React, {Children, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {api} from '../network';
import {images, strings, fonts, colors} from '../assets';

const Category = props => {
  return (
    <TouchableOpacity>
      <View style={styles.category}>
        <Image source={{uri: props.image}} style={styles.categoryIcon} />
        <Text style={styles.name}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const Categories = props => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const response = await api.course.getAllCategories();
        if (response.status === 200) {
          setCategories(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getCategories();
    return () => {
      setIsLoading(true);
    };
  }, []);

  const renderTitle = () => {
    return (
      <View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    );
  };
  const renderList = () => {
    return (
      <View style={styles.list}>
        {categories.length > 0 &&
          !isLoading &&
          categories.map(category => (
            <Category
              key={category._id}
              name={category.name}
              image={category.categoryImageUrl}
            />
          ))}
        {isLoading && <ActivityIndicator color={colors.primaryText} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTitle()}
      {renderList()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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
  categoryIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    paddingVertical: 15,
  },

  category: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.secondaryText,
    borderWidth: 0.45,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    textAlign: 'left',
    paddingLeft: 7,
  },
});
export default Categories;
