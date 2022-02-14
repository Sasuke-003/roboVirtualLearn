import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {api} from '../../network';

const OfferCourseCard = ({course}) => {
  return (
    <TouchableOpacity>
      <Image source={{uri: course.imageUrl}} style={styles.imageStyle} />
    </TouchableOpacity>
  );
};

const Offers = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getOfferData = async () => {
      try {
        const {
          data: {data},
        } = await api.course.getAllOffers();
        setCourses(data);
      } catch (error) {}
    };
    getOfferData();
  }, []);
  return (
    courses.length > 0 && (
      <FlatList
        horizontal
        contentContainerStyle={{paddingRight: 24}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // scrollEnabled={false}
        data={courses}
        renderItem={({item}) => <OfferCourseCard course={item} />}
      />
    )
  );
};

export default Offers;

const styles = StyleSheet.create({
  imageStyle: {height: 180, width: 260, marginTop: 10, marginLeft: 24},
});
