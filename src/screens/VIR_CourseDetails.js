import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Overview, Chapters} from '../components';
import {images, colors, strings, fonts} from '../assets';
import {getUserDetails} from '../redux/reducers/userReducer';
import {useSelector, useDispatch} from 'react-redux';
import {api} from '../network';
import {NAVIGATION_ROUTES} from '../constants';
import {CourseDetailsTabNavigator} from '../navigators';
import {TabBar} from 'react-native-tab-view';

const TABS = {
  OVERVIEW: 'Overview',
  CHAPTERS: 'Chapters',
};

const VIR_CourseDetails = ({
  route: {
    params: {courseId},
  },
  navigation,
}) => {
  const [courseData, setCourseData] = useState({});
  const [tabName, setTabName] = useState(TABS.OVERVIEW);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getCourseData = async () => {
      if (courseId === '') return;
      try {
        const {
          data: {data},
        } = await api.course.getCourseDetails(courseId);
        console.log(JSON.stringify(data, null, 2));
        setIsLoading(false);
        setCourseData(data);
      } catch (error) {
        setIsLoading(false);
        console.warn(error);
        setCourseData([]);
      }
    };
    getCourseData();
  }, []);

  const loadingComponent = () => (
    <View
      style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={colors.secondaryText} />
    </View>
  );

  const renderHeader = () => (
    <ImageBackground
      source={{
        uri: courseData
          ? courseData.courseImageUrl
          : 'https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      }}
      style={styles.imageBgHeader}>
      <View style={styles.imageBgContainer}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{courseData?.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              alignItems: 'center',
            }}>
            <View style={styles.categoryNameContainer}>
              <Text style={styles.categoryNameText}>
                {courseData?.category?.name}
              </Text>
            </View>
            <Text style={styles.chapterLessonText}>
              {`${courseData?.courseContent?.chapter} Chapter${
                courseData?.courseContent?.chapter > 1 && 's'
              } | `}
              {`${courseData?.courseContent?.lesson} Lesson${
                courseData?.courseContent?.lesson > 1 && 's'
              }`}
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );

  const renderTabBar = () => (
    <View style={styles.tabBtnContainer}>
      {[TABS.OVERVIEW, TABS.CHAPTERS].map(thisTabName => (
        <TouchableOpacity
          key={thisTabName}
          style={{flex: 1}}
          onPress={() => setTabName(thisTabName)}>
          <View
            style={[
              styles.tabBtn,
              tabName === thisTabName && styles.tabBtnActive,
            ]}>
            <Text
              style={[
                styles.tabBtnText,
                tabName === thisTabName && styles.tabBtnTextActive,
              ]}>
              {thisTabName}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return isLoading ? (
    loadingComponent()
  ) : (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      {renderHeader()}
      <View style={styles.tabContainer}>
        {renderTabBar()}
        {tabName === TABS.CHAPTERS ? <Chapters /> : <Overview />}
      </View>
    </ScrollView>
  );
};

export default VIR_CourseDetails;

const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: colors.background},
  imageBgHeader: {},
  imageBgContainer: {
    minHeight: 220,
    backgroundColor: colors.courseDetailBg,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 10,
  },
  closeIcon: {
    height: 15,
    width: 15,
  },
  headerTitle: {
    color: colors.background,
    fontFamily: fonts.bikoBold,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 19,
    lineHeight: 35,
  },
  categoryNameContainer: {
    backgroundColor: colors.categoryBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3.9,
    marginRight: 12,
  },
  categoryNameText: {
    fontSize: 10,
    fontFamily: fonts.proximaNovaRegular,
    fontWeight: '500',
    color: colors.skipLabel,
  },
  chapterLessonText: {
    fontSize: 14,
    fontFamily: fonts.sFnSDisplayRegular,
    color: colors.background,
  },
  tabContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    marginTop: 20,
  },
  tabBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtn: {
    borderBottomWidth: 1.5,
    paddingBottom: 8.5,
    borderBottomColor: colors.tabBorderBottomColor,
  },
  tabBtnActive: {borderBottomColor: colors.primary},
  tabBtnText: {
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
    color: colors.tabBorderBottomColor,
    alignSelf: 'center',
  },
  tabBtnTextActive: {
    color: colors.primary,
  },
});
