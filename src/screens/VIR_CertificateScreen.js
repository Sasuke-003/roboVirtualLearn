import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, images, fonts, strings} from '../assets';
import {DownloadModal, DrawerHeader} from '../components';
import Icon from 'react-native-vector-icons/Feather';
import {NAVIGATION_ROUTES} from '../constants';
import ViewShot from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import RNImageToPdf from 'react-native-image-to-pdf';
import CameraRoll from '@react-native-community/cameraroll';
import uuid from 'react-native-uuid';
import {utils} from '../utils';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {getUserDetails} from '../redux/reducers/userReducer';

const VIR_CertificateScreen = ({navigation, route: {params}}) => {
  const userDetails = useSelector(getUserDetails);
  const {height, width} = useWindowDimensions();
  const viewShotRef = useRef();
  const today = new Date();
  const [URI, setURI] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    completed = null,
    courseLength = null,
    joined = null,
    courseName = null,
    courseId = null,
    url = null,
  } = params;
  // uuid.v4().split('-').pop() (Optional Unique number)
  let authToken = utils.getAuthToken();

  const certificateNo = today.getFullYear() + courseId.slice(-12).toUpperCase(); //Certificate No.

  let time = new Date(courseLength * 60 * 1000)
    .toISOString()
    .substr(11, 8)
    .split(':');
  let hour = time[0] != '00' ? time[0] + 'h' : '';
  let min = time[1] != '00' ? time[1] + 'm' : '';
  let sec = time[2] != '00' ? time[2] + 's' : '';

  //Uploading The certificate to server
  const uploadCertificate = async url => {
    try {
      const response = await RNFetchBlob.fetch(
        'PATCH',
        'https://virtual-learn-api.herokuapp.com/api/v1/users/uploadcertificate',
        {
          Authorization: authToken,
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'image',
            filename: url.split('/').pop(),
            type: 'image/' + url.split('.').pop(),
            data: RNFetchBlob.wrap(url),
          },
          {name: 'courseID', data: courseId},
          {name: 'image_tag', data: 'profile1', data: 'Nithu12'},
        ],
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      const imageURI = await viewShotRef.current.capture(); //Capture the viewShot of the certificate
      imageURI && setURI(imageURI);
      uploadCertificate(imageURI);
    };
    url
      ? setURI(url)
      : setTimeout(() => {
          getImage();
        }, 2000);
  }, []);

  const checkPermission = async imageURI => {
    //Checking permission for android before storing certificate to gallery
    if (Platform.OS === 'ios') {
      //   downloadImage();
      savePicture(imageURI);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: strings.certificate.androidPermissionTitle,
            message: strings.certificate.androidPermissionMessage,
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted');
          //   downloadImage();
          savePicture(imageURI);
        } else {
          alert(strings.certificate.androidPermissionDenied);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  async function savePicture(imageURI) {
    try {
      setShowModal(true);
      await CameraRoll.save(imageURI);
      setShowModal(false);
      alert(strings.certificate.savingAlert);
    } catch (e) {
      console.log(e);
      setShowModal(false);
      alert(strings.certificate.errorAlert);
    }
  }

  /* Storing Certificate as a pdf.(optional case) */

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
  //     }s
  //   };

  const onBackPress = () => {
    // navigation.replace(NAVIGATION_ROUTES.COURSE_DETAILS_SCREEN, {courseId});
    navigation.pop(1);
  };

  const onDownloadPress = async () => {
    try {
      checkPermission(URI);
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

  const renderCertificateTopPart = () => {
    return (
      <View style={styles(height, width).topPart}>
        <Text style={styles().title}>{strings.certificate.title}</Text>
        <Text style={styles().userName}>{userDetails?.data?.fullname}</Text>
        <Text style={styles().course}>{courseName}</Text>
        <View style={styles().detailsView}>
          <Text style={styles().details}>
            {strings.certificate.joined} {moment(joined).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles().dots}> {'\u2022'} </Text>
          <Text style={styles().details}>
            {strings.certificate.completed}{' '}
            {moment(completed).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles().dots}> {'\u2022'} </Text>
          <Text style={styles().details}>
            {hour}
            {min}
            {sec}
          </Text>
        </View>
        <Text style={styles().certificateNo}>
          {strings.certificate.certificateNo} {certificateNo}
        </Text>
      </View>
    );
  };
  const renderCertificateBottomPart = () => {
    return (
      <View style={styles().bottomPart}>
        <View>
          <Image source={images.trophy} style={styles().trophy} />
        </View>
        <Image source={images.whiteLogo} style={styles().logo} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles(height, width).safeareaContainer}>
      {renderHeader()}
      <DownloadModal showModal={showModal} setShowModal={setShowModal} />
      {url ? (
        <View style={styles().showUrlImage}>
          <Image
            source={{uri: URI}}
            style={styles(height, width).certificateImage}
          />
        </View>
      ) : (
        <ViewShot ref={viewShotRef} style={styles().containerView}>
          <View style={styles().containerView}>
            <View style={styles(height, width).container}>
              {renderCertificateTopPart()}
              {renderCertificateBottomPart()}
            </View>
          </View>
        </ViewShot>
      )}
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
      backgroundColor: colors.background,
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
    showUrlImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    certificateImage: {
      width: height > width ? '100%' : width / 1.2,
      height: height > width ? '100%' : height * 2,
      resizeMode: height < width ? 'contain' : 'cover',
    },
  });
