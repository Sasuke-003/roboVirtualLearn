import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  Image,
} from 'react-native';
import React from 'react';
import {colors, fonts, images} from '../assets';
// import {SafeAreaView} from 'react-native-safe-area-context';
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
const VIR_ProfileScreen = () => {
  const {height, width} = useWindowDimensions();
  return (
    <>
      {/* <View style={{flex: 1}}> */}
      <ImageBackground
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs6Zmc_BNgfI0VoGCx7KL-x45TIzIo-hBN2BJ9FscU7grARs99V4SjyLsmPF9gDLdiWXE&usqp=CAUs',
        }}
        style={{
          flex: 1,
          resizeMode: 'contain',
          width: width,
        }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Profile</Text>
            <Image
              source={images.profileScreen.editIcon}
              style={styles.editIcon}
            />
          </View>
          <View style={styles.profileSection}>
            <View style={styles.profilePicView}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs6Zmc_BNgfI0VoGCx7KL-x45TIzIo-hBN2BJ9FscU7grARs99V4SjyLsmPF9gDLdiWXE&usqp=CAUs',
                }}
                style={styles.profilePic}
              />
            </View>
            <View style={styles.profileNameView}>
              <Text style={styles.profileName}>Mahendra Sing Dhoni</Text>
              <Text style={styles.profileJob}>UI/UX Designer</Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <SafeAreaView style={styles.container2}>
        <View style={styles.courseDetails}>
          <Text style={styles.hasCompleted}>Has Completed</Text>
          <View style={styles.cardView}>
            <CourseCard count="06" subHeading="Courses" />
            <CourseCard count="102" subHeading="Chapters" />
            <CourseCard count="24" subHeading="Test" />
          </View>
        </View>
        <View style={styles.personalDetails}>
          <Text style={styles.personalDetailsText}>Personal Details</Text>
          <PersonalDetails label="Name" value="Mahendra Singh Dhoni" />
          <PersonalDetails label="Username" value="Msdian" />
          <PersonalDetails label="Email" value="msd07@gmail.com" />
          <PersonalDetails label="Mobile Number" value="+919895086660" />
          <PersonalDetails label="Occupation" value="UI/UX Designer" />
          <PersonalDetails label="Date of Birth" value="10/04/1989" />
        </View>
        <View style={styles.privacyView}>
          <View style={styles.innerPrivacyView}>
            <Image
              source={images.profileScreen.privacyIcon}
              style={styles.privacyIcon}
            />
            <View style={styles.privacyTitleView}>
              <Text style={styles.privacyTitle}>Privacy</Text>
              <Text style={styles.privacySubHeading}>Change your password</Text>
            </View>
          </View>
          <Image
            source={images.profileScreen.forwardIcon}
            style={styles.forwardIcon}
          />
        </View>
      </SafeAreaView>
      {/* </View> */}
    </>
  );
};

export default VIR_ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(4, 44, 92,0.85)',
  },
  container2: {
    backgroundColor: colors.background,
    flex: 2,
  },
  titleView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 24,
    marginTop: 64,
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
    borderColor: '#47607d',
    borderRadius: 5,
  },
  profileSection: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
    marginTop: 31,
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
    backgroundColor: '#FEFEFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 11,
  },
  courseNum: {
    color: '#2BB5F4',
    fontFamily: fonts.BikoBold,
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38,
  },
  subHeading: {
    color: '#373737',
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
  },
  cardView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#545',
    marginTop: 20,
  },
  detailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  personalDetailsText: {
    color: '#2B2B2B',
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 24,
  },
  label: {
    color: '#7A7A7A',
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
  },
  value: {
    color: '#373737',
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
  privacyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 24,
    marginTop: 11,
    marginBottom: 30,
    backgroundColor: '#FEFEFF',
    borderRadius: 6,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 11,
  },
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
    color: '#042C5C',
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    lineHeight: 20,
  },
  privacySubHeading: {
    color: '#7A7A7A',
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 13,
    letterSpacing: 0.27,
    lineHeight: 16,
    marginTop: 3,
  },
});
