import {
  StyleSheet,
  Text,
  View,
  // SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import {colors, fonts, images, strings} from '../assets';
import {useSelector, useDispatch} from 'react-redux';
import {getUserDetails} from '../redux/reducers/userReducer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {utils} from '../utils';
import {DrawerHeader} from '../components';
import {NAVIGATION_ROUTES} from '../constants';
const CourseCard = ({count, subHeading}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.courseNum}>{count}</Text>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </View>
  );
};
const PersonalDetails = ({label, value}) => {
  return (
    <View style={styles.detailsView}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
const headerLeftIcon = () => (
  <Image
    style={styles.headerLeftIcon}
    source={images.profileScreen.hamburgerMenuIconWhite}
  />
);
const VIR_ProfileScreen = ({goToCreateNewPassword, navigation}) => {
  const {height, width} = useWindowDimensions();
  const portrait = height > width;
  const userDetails = useSelector(getUserDetails);
  let authToken = utils.getAuthToken();

  let occupation =
    userDetails.hasOwnProperty('occupation') &&
    userDetails.occupation.length > 0
      ? userDetails.occupation
      : '-- --';
  let dob =
    userDetails.hasOwnProperty('dateOfBirth') &&
    userDetails.dateOfBirth.length > 0
      ? userDetails.dateOfBirth
      : '-- --';
  let profileImage = userDetails.hasOwnProperty('image')
    ? userDetails.image
    : images.profileScreen.blankImage;

  const headerLeftIconOnPress = () => {
    navigation.openDrawer();
  };
  const editIconOnPress = () => {
    navigation.navigate(NAVIGATION_ROUTES.PROFILE_EDIT);
  };

  const renderTitleSection = () => {
    return (
      <View style={styles.titleView}>
        <Text style={styles.title}>{strings.profileScreen.title}</Text>
        <TouchableOpacity onPress={editIconOnPress}>
          <Image
            source={images.profileScreen.editIcon}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderProfileImageDetailsSection = () => {
    return (
      <View style={styles.profileSection}>
        <View style={styles.profilePicView}>
          <Image
            source={
              typeof profileImage === 'number'
                ? profileImage
                : {uri: profileImage}
            }
            style={styles.profilePic}
          />
        </View>
        <View style={styles.profileNameView}>
          <Text style={styles.profileName}>{userDetails.fullname}</Text>
          <Text style={styles.profileJob}>{occupation}</Text>
        </View>
      </View>
    );
  };
  const renderCourseCard = () => {
    return (
      <View style={styles.courseDetails}>
        <Text style={styles.hasCompleted}>
          {strings.profileScreen.hasCompleted}
        </Text>
        <View style={styles.cardView(portrait)}>
          <CourseCard count="06" subHeading={strings.profileScreen.courses} />
          <CourseCard count="102" subHeading={strings.profileScreen.chapters} />
          <CourseCard count="24" subHeading={strings.profileScreen.test} />
        </View>
      </View>
    );
  };
  const renderPersonalDetails = () => {
    return (
      <View style={styles.personalDetails}>
        <Text style={styles.personalDetailsText}>
          {strings.profileScreen.personalDetails}
        </Text>

        <PersonalDetails
          label={strings.profileScreen.name}
          value={userDetails.fullname}
        />
        <PersonalDetails
          label={strings.profileScreen.username}
          value={userDetails.username}
        />
        <PersonalDetails
          label={strings.profileScreen.email}
          value={userDetails.email}
        />
        <PersonalDetails
          label={strings.profileScreen.mobNum}
          value={userDetails.number}
        />
        <PersonalDetails
          label={strings.profileScreen.occupation}
          value={occupation}
        />
        <PersonalDetails label={strings.profileScreen.DOB} value={dob} />
      </View>
    );
  };
  const renderPrivacyButton = () => {
    return (
      <TouchableOpacity onPress={() => goToCreateNewPassword({authToken})}>
        <View style={styles.privacyView(height)}>
          <View style={styles.innerPrivacyView}>
            <Image
              source={images.profileScreen.privacyIcon}
              style={styles.privacyIcon}
            />

            <View style={styles.privacyTitleView}>
              <Text style={styles.privacyTitle}>
                {strings.profileScreen.privacy}
              </Text>
              <Text style={styles.privacySubHeading}>
                {strings.profileScreen.changePass}
              </Text>
            </View>
          </View>
          <Image
            source={images.profileScreen.forwardIcon}
            style={styles.forwardIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderHeader = () => {
    return (
      <DrawerHeader
        leftIcon={headerLeftIcon}
        leftIconOnPress={headerLeftIconOnPress}
      />
    );
  };
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={
          typeof profileImage === 'number' ? profileImage : {uri: profileImage}
        }
        style={styles.imageBackground(width)}>
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          {renderHeader()}
          {renderTitleSection()}
          {renderProfileImageDetailsSection()}
        </SafeAreaView>
      </ImageBackground>

      <SafeAreaView
        style={styles.container2(width, height)}
        edges={['bottom', 'left', 'right']}>
        {renderCourseCard()}
        {renderPersonalDetails()}
        {renderPrivacyButton()}
      </SafeAreaView>
    </ScrollView>
  );
};

export default VIR_ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.profileBg,
  },
  container2: (width, height) => ({
    backgroundColor: colors.background,
  }),
  imageBackground: width => ({
    flex: 1,
    resizeMode: 'contain',
    width: width,
  }),
  headerLeftIcon: {
    height: 17,
    width: 25,
    marginLeft: 24,
    marginTop: 5,
  },
  titleView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 24,
    marginTop: 21,
  },
  editIcon: {height: 18, width: 18},
  title: {
    color: colors.background,
    fontFamily: fonts.BikoBold,
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 35,
  },
  profilePic: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  profilePicView: {
    width: 70,
    height: 70,
    borderWidth: 3,
    overflow: 'hidden',
    borderColor: colors.profileImgBorder,
    borderRadius: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 26,
    marginTop: 31,
    marginBottom: 26,
  },
  profileNameView: {
    marginLeft: 22,
  },
  profileName: {
    color: colors.background,
    fontFamily: fonts.bikoBold,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  profileJob: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    marginTop: 7,
  },
  courseDetails: {
    alignItems: 'center',
    margin: 24,
  },
  hasCompleted: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
  },
  cardContainer: {
    height: 85,
    width: 95,
    borderRadius: 6,
    backgroundColor: colors.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 11,
  },
  courseNum: {
    color: colors.privacy,
    fontFamily: fonts.BikoBold,
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38,
  },
  subHeading: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
  },
  cardView: portrait => ({
    width: portrait ? '100%' : '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  }),
  detailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  personalDetailsText: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 24,
  },
  label: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
  },
  value: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  personalDetails: {
    marginHorizontal: 24,
    marginTop: 16,
  },
  privacyIcon: {
    width: 40,
    height: 40,
  },
  privacyView: height => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 24,
    marginTop: 11,
    marginBottom: height < 840 ? 30 : 0,
    backgroundColor: colors.cardBg,
    borderRadius: 6,
    shadowColor: colors.cardShadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 11,
  }),
  forwardIcon: {
    width: 10,
    height: 16,
    marginRight: 13,
  },
  innerPrivacyView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyTitleView: {
    marginLeft: 17,
  },
  privacyTitle: {
    color: colors.phoneNumberActive,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    lineHeight: 20,
  },
  privacySubHeading: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 13,
    letterSpacing: 0.27,
    lineHeight: 16,
    marginTop: 3,
  },
});
