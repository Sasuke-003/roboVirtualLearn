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
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, fonts, images, strings} from '../assets';
import {useSelector, useDispatch} from 'react-redux';
import {getUserDetails} from '../redux/reducers/userReducer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {utils} from '../utils';
import {DrawerHeader} from '../components';
import {NAVIGATION_ROUTES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {RectangleButton} from '../components';
import {ListModal} from '../components';
import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {api} from '../network';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const data = [{value: 'Male'}, {value: 'Female'}, {value: 'Others'}];

const headerLeftIcon = () => (
  <Icon name="arrow-back-outline" style={styles.headerLeftIcon} />
);

const TextField = ({
  valueState = '',
  onChangeText = () => {},
  placeholder,
  ...props
}) => {
  return (
    <View style={styles.TextField}>
      <Text style={styles.label}>{valueState.length > 0 && placeholder}</Text>
      <TextInput
        style={[styles.passInput, valueState.length > 0 && styles.inputActive]}
        onChangeText={onChangeText}
        value={valueState}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
};

const VIR_ProfileEditScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [occupation, setOccupation] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null);
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [open, setOpen] = useState(false);
  const {height, width} = useWindowDimensions();
  const userDetails = useSelector(getUserDetails);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(0);
  const [coverImg, setCoverImg] = useState(0);

  let authToken = utils.getAuthToken();
  useEffect(() => {
    userDetails.data.hasOwnProperty('image')
      ? setProfileImage(userDetails.data.image)
      : setProfileImage(images.profileScreen.blankImage);
    userDetails.data.hasOwnProperty('coverImage')
      ? setCoverImg(userDetails.data.coverImage)
      : setCoverImg(images.profileScreen.blankImage);
    userDetails.data.hasOwnProperty('fullname') &&
      setFullName(userDetails.data.fullname);
    userDetails.data.hasOwnProperty('username') &&
      setUserName(userDetails.data.username);
    userDetails.data.hasOwnProperty('email') &&
      setEmail(userDetails.data.email);
    userDetails.data.hasOwnProperty('number') &&
      setMobile(
        userDetails.data.number.substring(0, 3) +
          '    ' +
          userDetails.data.number.substring(3),
      );
    userDetails.data.hasOwnProperty('occupation') &&
      setOccupation(userDetails.data.occupation);
    userDetails.data.hasOwnProperty('gender') &&
      setGender(userDetails.data.gender);
    userDetails.data.hasOwnProperty('dateOfBirth') &&
      setDob(userDetails.data.dateOfBirth);
    userDetails.data.hasOwnProperty('twitterLink') &&
      setTwitter(userDetails.data.twitterLink);
    userDetails.data.hasOwnProperty('facebookLink') &&
      setFacebook(userDetails.data.facebookLink);
  }, []);

  const headerLeftIconOnPress = () => {
    navigation.goBack();
  };

  const onChangeFullName = text => {
    setFullName(utils.toTitleCase(text));
  };
  const onChangeEmail = text => {
    setEmail(text);
  };
  const onChangeTwitter = text => {
    setTwitter(text);
  };
  const onChangeFacebook = text => {
    setFacebook(text);
  };
  const onChangeOccupation = text => {
    setOccupation(text);
  };

  const onPressSelectionList = value => {
    setGender(value);
    setShowModal(false);
  };

  const onPressSave = async () => {
    setIsButtonDisabled(true);
    if (fullName.length < 3) {
      utils.showErrorMessage('Name should not be less than 3 characters');
      setIsButtonDisabled(false);
      return;
    }

    if (!utils.validateEmail(email)) {
      utils.showErrorMessage('Invalid Email!');
      setIsButtonDisabled(false);
      return;
    }

    if (twitter.length > 0 && !utils.isValidTwitterLink(twitter)) {
      utils.showErrorMessage('Invalid Twitter Link!');
      setIsButtonDisabled(false);
      return;
    }
    if (facebook.length > 0 && !utils.isValidFacebookLink(facebook)) {
      utils.showErrorMessage('Invalid Facebook Link!');
      setIsButtonDisabled(false);
      return;
    }

    try {
      const response = await api.profile.updateDetails(
        fullName,
        occupation,
        dob,
        gender,
        twitter,
        facebook,
        email,
      );
      if (response.status === 200) {
        utils.showSuccessMessage(response.data.message);
        utils.saveUserDetails({
          data: {
            ...userDetails.data,
            fullname: fullName,
            occupation: occupation,
            dateOfBirth: dob,
            gender: gender,
            twitterLink: twitter,
            facebookLink: facebook,
            email: email,
          },
          hasCompleted: {...userDetails.hasCompleted},
        });
        setIsButtonDisabled(false);
        navigation.goBack();
      }
    } catch (error) {
      utils.showErrorMessage(error.response.data.message);
      setIsButtonDisabled(false);
    }
  };

  const onPressCoverUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      if (image) {
        setCoverImg(image.path); //TODO: incomplete, pending to send image to api
        console.log(image);
        const formData = new FormData();
        formData.append('coverImage', {
          name: image.filename,
          uri: image.path,
          type: image.mime,
        });
        console.log('FormData', formData._parts[0]);
        utils.saveUserDetails({
          data: {
            ...userDetails.data,
            coverImage: image.path,
          },
          hasCompleted: {...userDetails.hasCompleted},
        });
        const response = await api.profile.uploadCoverPic(formData);
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onPressImageUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        // includeBase64: true,
      });
      if (image) {
        setProfileImage(image.path); //TODO: incomplete, pending to send image to api
        console.log(image.data);
        // const res = await RNFS.readFile(image.sourceURL, 'base64');
        // console.log(res);
        const formData = new FormData();
        // formData.append('image', image, 'image134.jpeg');
        formData.append('image', {
          name: 'image.jpg',
          type: 'image/jpg',
          uri: image.path,
          fileName: 'image',
        });
        console.log('FormData', formData._parts[0]);
        utils.saveUserDetails({
          data: {
            ...userDetails.data,
            image: image.path,
          },
          hasCompleted: {...userDetails.hasCompleted},
        });
        const response = await api.profile.uploadProfilePic(formData);
        console.log(response);
        // console.log('Bello');
      }
    } catch (e) {
      console.log('hello');
      console.log(e);
    }
  };

  /******************************************** */
  // const onPressImageUpload = async () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //     saveToPhotos: true,
  //     // includeBase64: true,
  //   };
  //   try {
  //     const image = await launchImageLibrary(options);
  //     if (image) {
  //       setProfileImage(image.path); //TODO: incomplete, pending to send image to api
  //       console.log(image);
  //       const formData = new FormData();
  //       formData.append(
  //         'image',
  //         {
  //           name: image.assets[0].fileName,
  //           type: image.assets[0].type,
  //           uri:
  //             Platform.OS === 'ios'
  //               ? image.assets[0].uri.replace('file://', '')
  //               : image.assets[0].uri,
  //         },
  //         image.assets[0].fileName,
  //       );
  //       console.log('FormData', formData._parts[0]);
  //       // const res = await RNFS.readFile(image.assets[0].uri, 'base64');
  //       // console.log(res);
  //       utils.saveUserDetails({
  //         data: {
  //           ...userDetails.data,
  //           image: image.path,
  //         },
  //         hasCompleted: {...userDetails.hasCompleted},
  //       });
  //       const response = await api.profile.uploadProfilePic(formData);
  //       console.log(response);
  //       console.log('Bello');
  //     }
  //   } catch (e) {
  //     console.log('hello');
  //     console.log(e);
  //   }
  // };
  /*********************************************** */
  const renderTitle = () => {
    return <Text style={styles.title}>{strings.editProfileScreen.title}</Text>;
  };
  const renderProfileImage = () => {
    return (
      <View style={styles.profileView}>
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
        <TouchableOpacity onPress={() => onPressImageUpload()}>
          <Image
            source={images.profileScreen.uploadProfilePic}
            style={styles.uploadButton}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changeTextView}
          onPress={onPressCoverUpload}>
          <Text style={[styles.changeText]}>
            {strings.editProfileScreen.changeImg}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderGenderField = () => {
    return (
      <>
        <View
          style={[styles.genderField, gender.length > 0 && styles.dateActive]}>
          <Text style={styles.label}>
            {gender.length > 0 && strings.editProfileScreen.gender}
          </Text>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.genderButton}>
            <View style={styles.genderView}>
              <Text
                style={[
                  styles.dobText,
                  gender.length > 0 && styles.inputActive,
                ]}>
                {gender.length > 0 ? gender : strings.editProfileScreen.gender}
              </Text>
              <Image source={images.dropdown} style={styles.dropdown} />
            </View>
          </TouchableOpacity>
        </View>
        <ListModal
          showModal={showModal}
          setShowModal={setShowModal}
          data={data}
          onPressSelectionList={onPressSelectionList}
        />
      </>
    );
  };
  const renderDOBField = () => {
    return (
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={[styles.dateField, dob && styles.dateActive]}>
          <Text style={styles.label}>
            {dob && strings.editProfileScreen.dob}
          </Text>
          <Text style={[styles.dobText, dob && styles.inputActive]}>
            {dob
              ? moment(dob).format('DD/MM/YYYY')
              : strings.editProfileScreen.dobPlaceholder}
          </Text>

          <DatePicker
            modal
            open={open}
            date={new Date()}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setDob(date);
              console.log('njb', date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderTextFields = () => {
    return (
      <View style={styles.inputDataView}>
        <TextField
          valueState={fullName}
          onChangeText={onChangeFullName}
          placeholder={strings.editProfileScreen.fullname}
        />
        <TextField
          valueState={userName}
          placeholder={strings.editProfileScreen.username}
          editable={false}
        />
        <TextField
          valueState={email}
          onChangeText={onChangeEmail}
          placeholder={strings.editProfileScreen.email}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextField
          valueState={mobile}
          placeholder={strings.editProfileScreen.mobNum}
          editable={false}
        />
        <TextField
          valueState={occupation}
          onChangeText={onChangeOccupation}
          placeholder={strings.editProfileScreen.occupation}
        />

        {renderGenderField()}
        {renderDOBField()}

        <TextField
          valueState={twitter}
          onChangeText={onChangeTwitter}
          placeholder={strings.editProfileScreen.twitter}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextField
          valueState={facebook}
          onChangeText={onChangeFacebook}
          placeholder={strings.editProfileScreen.facebook}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    );
  };

  const renderSaveButton = () => {
    return (
      <View style={styles.button}>
        <RectangleButton
          onPress={onPressSave}
          name={strings.editProfileScreen.save}
          btnStyles={styles.btnStyles}
          textStyles={styles.textStyles}
          isDisabled={isButtonDisabled}
        />
      </View>
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
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <ImageBackground
          source={typeof coverImg === 'number' ? coverImg : {uri: coverImg}}
          style={styles.imageBackground(width)}>
          <SafeAreaView
            style={styles.container}
            edges={['top', 'left', 'right']}>
            {renderHeader()}
            {renderTitle()}
            {renderProfileImage()}
          </SafeAreaView>
        </ImageBackground>

        <SafeAreaView
          style={styles.container2}
          edges={['bottom', 'left', 'right']}>
          {renderTextFields()}
          {renderSaveButton()}
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default VIR_ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.profileBg,
  },
  container2: {
    backgroundColor: colors.background,
  },
  imageBackground: width => ({
    flex: 1,
    resizeMode: 'contain',
    width: width,
  }),
  button: {
    marginHorizontal: 24,
  },
  btnStyles: {
    backgroundColor: colors.primary,
    width: '100%',
    marginBottom: Platform.OS === 'android' ? 20 : 0,
  },
  textStyles: {
    color: colors.background,
    fontFamily: fonts.proximaNovaBlack,
  },
  headerLeftIcon: {
    fontSize: 30,
    marginLeft: 24,
    marginTop: 5,
    color: colors.background,
  },
  title: {
    color: colors.background,
    fontFamily: fonts.bikoBold,
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 35,
    margin: 20,
  },
  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  profilePicView: {
    width: 110,
    height: 110,
    borderWidth: 5,
    overflow: 'hidden',
    borderColor: colors.profileImgBorder,
    borderRadius: 15,
    marginTop: 6,
  },
  uploadButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: -26,
    left: 28,
  },
  changeText: {
    marginVertical: 12,
    color: colors.primary,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.35,
    lineHeight: 17,
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  changeTextView: {
    alignSelf: 'flex-end',
  },
  passInput: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 16,
    letterSpacing: 0.4,
    lineHeight: 22,
    borderBottomWidth: 0.5,
    borderColor: colors.inputBorderBottomColor,
    height: 31,
    paddingBottom: 5,
    width: '100%',
  },
  inputActive: {
    color: colors.phoneNumberActive,
    borderColor: colors.phoneNumberActive,
    borderBottomWidth: 1,
    fontWeight: '600',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 7,
    height: 20,
    fontSize: 14,
    letterSpacing: 0.29,
    lineHeight: 17,
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
  },
  inputDataView: {
    marginHorizontal: 24,
    marginVertical: 30,
  },
  TextField: {
    marginBottom: 16,
  },
  dateField: {
    borderBottomWidth: 0.5,
    borderColor: colors.inputBorderBottomColor,
    marginBottom: 16,
  },
  dobText: {
    color: colors.dobText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
    letterSpacing: 0.4,
    lineHeight: 22,
    height: 31,
    paddingBottom: 5,
    width: '100%',
  },
  dateActive: {
    color: colors.phoneNumberActive,
    borderColor: colors.phoneNumberActive,
    borderBottomWidth: 1,
  },
  genderField: {
    borderBottomWidth: 0.5,
    borderColor: colors.inputBorderBottomColor,
    marginBottom: 16,
  },
  dropdown: {
    height: 10,
    width: 13,
  },

  genderView: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
});
