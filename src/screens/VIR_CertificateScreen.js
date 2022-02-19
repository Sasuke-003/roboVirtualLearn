import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, images, fonts} from '../assets';
import {DrawerHeader} from '../components';
import Icon from 'react-native-vector-icons/Feather';
import {NAVIGATION_ROUTES} from '../constants';
import ViewShot from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import RNImageToPdf from 'react-native-image-to-pdf';
import CameraRoll from '@react-native-community/cameraroll';
import uuid from 'react-native-uuid';

const VIR_CertificateScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const portrait = height > width;
  const viewShotRef = useRef();
  const today = new Date();
  const certificateNo =
    today.getFullYear() + uuid.v4().split('-').pop().toUpperCase();

  const data = {
    name: 'Mahendra Singh Dhoni',
    courseName: 'Learn Figma - UI/UX Design Essential Training',
    joinedOn: '01/04/2021',
    completedOn: '02/06/2021',
    totalCourseDuration: '4h30m',
  };

  const checkPermission = async imageURI => {
    if (Platform.OS === 'ios') {
      //   downloadImage();
      savePicture(imageURI);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download certificate',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted');
          //   downloadImage();
          savePicture(imageURI);
        } else {
          alert('Storage Permission Denied');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  async function savePicture(imageURI) {
    console.log(typeof imageURI, imageURI);
    CameraRoll.save(imageURI);
    alert('Certificate Saved to Gallery');
  }

  //   const myAsyncPDFFunction = async () => {
  //     const date = new Date();
  //     try {
  //       console.log(imageURL);
  //       const options = {
  //         imagePaths: [imageURL],
  //         name:
  //           'Certificate' + Math.floor(date.getTime() + date.getSeconds() / 2),
  //         maxSize: {
  //           // optional maximum image dimension - larger images will be resized
  //           width: width,
  //           height: height,
  //         },
  //         quality: 0, // optional compression paramter
  //       };
  //       const pdf = await RNImageToPdf.createPDFbyImages(options);

  //       console.log('pdf', pdf);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  const onBackPress = () => {
    navigation.replace(NAVIGATION_ROUTES.COURSE_DETAILS_SCREEN);
  };
  const onDownloadPress = async () => {
    console.log('Downloading...');
    try {
      const imageURI = await viewShotRef.current.capture();
      checkPermission(imageURI);
      //   myAsyncPDFFunction();
    } catch (e) {
      console.log(e);
    }
  };
  const renderLeftIcon = () => {
    return (
      <Image source={images.result.closeIcon} style={styles().headerLeftIcon} />
    );
  };
  const renderRightIcon = () => {
    return (
      <Icon
        name="download"
        size={25}
        style={styles().headerRightIcon}
        onPress={onDownloadPress}
      />
    );
  };
  const renderHeader = () => {
    return (
      <DrawerHeader
        leftIcon={renderLeftIcon}
        leftIconOnPress={onBackPress}
        rightIcon={renderRightIcon}
      />
    );
  };

  return (
    <SafeAreaView style={styles(height, width).safeareaContainer}>
      {renderHeader()}
      <ViewShot ref={viewShotRef} style={styles().containerView}>
        <View style={styles().containerView}>
          <View style={styles(height, width).container}>
            <View style={styles(height, width).topPart}>
              <Text style={styles().title}>Certificate of Completion</Text>
              <Text style={styles().userName}>{data.name}</Text>
              <Text style={styles().course}>{data.courseName}</Text>
              <View style={styles().detailsView}>
                <Text style={styles().details}>Joined : {data.joinedOn}</Text>
                <Text style={styles().dots}> {'\u2022'} </Text>
                <Text style={styles().details}>
                  Completed : {data.completedOn}
                </Text>
                <Text style={styles().dots}> {'\u2022'} </Text>
                <Text style={styles().details}>{data.totalCourseDuration}</Text>
              </View>
              <Text style={styles().certificateNo}>
                Certificate No: {certificateNo}
              </Text>
            </View>
            <View style={styles().bottomPart}>
              <View>
                <Image source={images.trophy} style={styles().trophy} />
              </View>
              <Image source={images.whiteLogo} style={styles().logo} />
            </View>
          </View>
        </View>
      </ViewShot>
      {/* <Image source={{uri: image}} style={{width: width, height: 300}} /> */}
    </SafeAreaView>
  );
};

export default VIR_CertificateScreen;

const styles = (height = 300, width = 200) =>
  StyleSheet.create({
    safeareaContainer: {
      backgroundColor: colors.primaryText,
      height,
    },
    containerView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: height > width ? width : width / 1.2,
      justifyContent: 'space-between',
    },
    topPart: {
      backgroundColor: '#fff',
      paddingHorizontal: 24,
      paddingTop: 30,
    },
    bottomPart: {
      backgroundColor: colors.phoneNumberActive,

      height: height / 8,
      justifyContent: 'center',

      paddingHorizontal: 24,
      paddingVertical: 4,
    },
    logo: {
      width: 50,
      height: '95%',
      resizeMode: 'contain',
    },
    title: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaMedium,
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 17,
      marginBottom: 16,
    },
    userName: {
      color: colors.primary,
      fontFamily: fonts.avenirRegular,
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 8,
    },
    course: {
      color: colors.primaryText,
      fontFamily: fonts.proximaNovaMedium,
      fontSize: 14,
      fontWeight: '500',

      lineHeight: 22,
      marginBottom: 35,
    },
    details: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaMedium,
      fontSize: 8,
      fontWeight: '500',
      lineHeight: 17,
      //   marginBottom: 16,
    },
    dots: {
      color: colors.secondaryText,
      fontSize: 16,
      lineHeight: 17,
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailsView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 35,
    },
    certificateNo: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaMedium,
      fontSize: 8,
      fontWeight: '500',
      lineHeight: 17,
      marginBottom: 25,
    },
    trophy: {
      position: 'absolute',
      width: 120,
      height: 120,
      top: -110,
      right: -5,
    },
    headerLeftIcon: {
      height: 17,
      width: 17,
      marginLeft: 24,
      marginTop: 10,
    },
    headerRightIcon: {
      marginRight: 24,
      marginTop: 10,
      color: colors.background,
    },
  });
