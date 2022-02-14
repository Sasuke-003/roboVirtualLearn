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
import {
  getCategory,
  setCategories,
  setSelectedValue,
<<<<<<< HEAD
=======
  getSelectedValue,
>>>>>>> bbf84768de1c7cb76e21dc129eecb3377ddc7125
} from '../redux/reducers/filterSearchReducer';
import {images, strings, fonts, colors} from '../assets';
import {useDispatch, useSelector} from 'react-redux';

const Category = props => {
<<<<<<< HEAD
  const categories = useSelector(getCategory);
  const dispatch = useDispatch();
  const index = categories.findIndex(value => value === props.id);
  const isSelected = index >= 0 ? true : false;
  const onPressCatgeory = () => {
    if (props.isModal === true) {
      dispatch(setCategories(props.id));
=======
  // const [isSelected, setIsSelected] = useState(false);
  const categories = useSelector(getCategory);
  const selectedValue = useSelector(getSelectedValue);
  // const bgColor = isSelected ? colors.categoryBackground : null;
  const dispatch = useDispatch();

  const index = selectedValue.findIndex(value => value.id === props.id);
  let isSelected;
  if (index >= 0) {
    isSelected = selectedValue[index].selected;
  } else {
    isSelected = false;
  }
  const onPressCatgeory = () => {
    console.log('clicked');
    dispatch(setCategories(props.id));
    dispatch(setSelectedValue(props.id));
    // console.log('selected', selectedValue);
    // setIsSelected(!isSelected);
  };

  const getColor = () => {
    const isPresent = categories.find(catId => catId === props.id);
    if (isPresent) {
      return setIsSelected(true);
>>>>>>> bbf84768de1c7cb76e21dc129eecb3377ddc7125
    } else {
      return;
    }
  };

  return (
    <TouchableOpacity onPress={onPressCatgeory}>
      <View
        style={[
          styles.category,
<<<<<<< HEAD
          {
            backgroundColor:
              isSelected && props.isModal === true
                ? colors.categoryBackground
                : null,
          },
=======
          {backgroundColor: isSelected ? colors.categoryBackground : null},
>>>>>>> bbf84768de1c7cb76e21dc129eecb3377ddc7125
        ]}>
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
              id={category._id}
              isModal={props.isModal}
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
    marginTop: 30,
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    paddingTop: 15,
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