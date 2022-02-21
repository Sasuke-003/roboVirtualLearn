import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Overview, Chapters, RectangleButton} from '../components';
import {images, colors, strings, fonts} from '../assets';
import {getUserDetails} from '../redux/reducers/userReducer';
import {useSelector, useDispatch} from 'react-redux';
import {api} from '../network';
import {NAVIGATION_ROUTES} from '../constants';
import {CourseDetailsTabNavigator} from '../navigators';
import {TabBar} from 'react-native-tab-view';
import {utils} from '../utils';

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [HideJoinCourseBtn, setHideJoinCourseBtn] = useState(false);
  const {height, width} = useWindowDimensions();

  // console.log(JSON.stringify(courseData, null, 2));
  useEffect(() => {
    setIsLoading(true);
    const getCourseData = async () => {
      if (courseId === '') return;
      try {
        const {
          data: {data},
        } = await api.course.getCourseDetails(courseId);
        // console.log(JSON.stringify(data, null, 2));
        setIsLoading(false);
        setCourseData(data);
      } catch (error) {
        setIsLoading(false);
        console.warn(error);
        setCourseData([]);
      }
    };
    const getProgress = async () => {
      try {
        const progress = await api.course.getCourseProgress(courseId);
        progress.status === 200 && setHideJoinCourseBtn(true);
      } catch (error) {
        console.log(error);
      }
    };
    getCourseData();
    getProgress();
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
                courseData?.courseContent?.chapter ? 's' : ''
              } | `}
              {`${courseData?.courseContent?.lesson} Lesson${
                courseData?.courseContent?.lesson ? 's' : ''
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

  const onPressIntro = url => {
    navigation.navigate(NAVIGATION_ROUTES.VIDIO_PLAYER, url);
  };

  const onPressJoinCourse = async () => {
    setIsButtonDisabled(true);
    try {
      const response = await api.course.enroll(courseId);
      if (response.status === 200) {
        utils.showSuccessMessage(response.data.message);
        setTabName(TABS.CHAPTERS);
        setIsButtonDisabled(false);
      }
    } catch (e) {
      utils.showErrorMessage(e.response.data.message);
      setIsButtonDisabled(false);
    }
  };

  return isLoading ? (
    loadingComponent()
  ) : (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      {renderHeader()}
      <View
        style={[styles.tabContainer, HideJoinCourseBtn && {paddingBottom: 30}]}>
        {renderTabBar()}
        {tabName === TABS.CHAPTERS ? (
          <Chapters course={courseData} onPressIntro={onPressIntro} />
        ) : (
          <Overview data={courseData.overview} onPressIntro={onPressIntro} />
        )}
      </View>
      {!HideJoinCourseBtn && (
        <RectangleButton
          name="Join Course"
          btnStyles={styles.btnStyles}
          textStyles={styles.textStyles}
          onPress={onPressJoinCourse}
          isDisabled={isButtonDisabled}
        />
      )}
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
  btnStyles: {
    backgroundColor: colors.primary,
    width: '100%',
    borderRadius: 0,
    height: Platform.OS === 'ios' && 60,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  textStyles: {
    color: colors.background,
    fontFamily: fonts.sFnSDisplayRegular,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
});
