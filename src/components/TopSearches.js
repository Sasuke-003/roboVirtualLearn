import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {api} from '../network';
import {images, fonts, colors, strings} from '../assets';

const DisplayList = props => {
  return (
    <TouchableOpacity>
      <View style={[styles.category]}>
        <Text style={styles.name}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const TopSearches = () => {
  const [topSearch, setTopSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getTopSearches = async () => {
      try {
        setIsLoading(true);
        const response = await api.course.getTopSearch();
        if (response.status === 200) {
          setTopSearch(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getTopSearches();
    return () => {
      setIsLoading(true);
    };
  }, []);
  const filterResult = topSearch.filter(search => search.searchFrequency > 50);

  return (
    <View>
      <Text style={styles.title}>{strings.searchScreen.topSearch}</Text>
      <View style={styles.list}>
        {filterResult.length > 0 &&
          !isLoading &&
          filterResult.map(category => (
            <DisplayList
              key={category._id}
              name={category.name}
              id={category._id}
            />
          ))}
      </View>
      {isLoading && <ActivityIndicator color={colors.primaryText} />}
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: fonts.proximaNovaBold,
    fontWeight: '600',
    fontSize: 19,
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: 'left',
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
    paddingVertical: 6,
    marginHorizontal: 6,
    marginVertical: 5,
    backgroundColor: colors.categoryBackground,
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
export default TopSearches;
