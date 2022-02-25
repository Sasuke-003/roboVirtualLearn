import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {colors, fonts, images, strings} from '../../assets';
import {RectangleButton, ShowMore} from '..';
import {SafeAreaView} from 'react-native-safe-area-context';

const Overview = ({data, onPressIntro}) => {
  const {height, width} = useWindowDimensions();
  const portrait = height > width;
  const renderShortDescription = () => {
    return <Text style={styles.shortDesc}>{data?.shortDescription}</Text>;
  };

  const renderPreviewSection = () => {
    return (
      <>
        <Text style={styles.previewTitle}>{strings.overview.previewTitle}</Text>
        <View style={styles.previewContainer}>
          <TouchableOpacity
            onPress={() => onPressIntro({url: data.previewVideoUrl})}>
            <ImageBackground
              source={{uri: data?.previewVideoThumbnail}}
              style={styles.imageBg}>
              <View style={styles.overlayView}>
                <View style={styles.previewLeftPart}>
                  <Image source={images.overview.play} style={styles.playBtn} />
                  <View style={styles.introView}>
                    <Text style={styles.introText}>
                      {strings.overview.introduction}
                    </Text>
                    <Text style={styles.time}>
                      {data?.previewVideoDuration}min
                    </Text>
                  </View>
                </View>
                <Image
                  source={images.overview.rightArrow}
                  style={styles.rightArrow}
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const renderLongDescription = () => {
    return (
      <View style={styles.showMoreView}>
        <ShowMore text={data?.longDescription} hideLength={290} />
      </View>
    );
  };
  const renderCourseIncludes = () => {
    return (
      <View style={styles.courseContent}>
        <Text style={styles.contentTitle}>
          {strings.overview.courseIncludes}
        </Text>
        {data?.courseIncludes.map((item, index) => {
          return (
            <View key={index} style={styles.itemView}>
              <Image source={{uri: item.iconUrl}} style={styles.courseIcon} />
              <Text style={styles.courseDesc}>{item.description}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  const renderWhatYouWillLearn = () => {
    return (
      <View style={styles.learningView}>
        <Text style={styles.contentTitle}>
          {strings.overview.whatYouWillLearn}
        </Text>
        {data?.whatYouWillLearn.map((item, index) => {
          return (
            <View key={index} style={styles.learningItemView}>
              <Image source={{uri: item.iconUrl}} style={styles.courseIcon} />
              <Text style={styles.learningDesc}>{item.description}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderRequirements = () => {
    return (
      <View style={styles.requirementContainer}>
        <Text style={styles.contentTitle}>{strings.overview.requirements}</Text>
        {data?.requirements.map((item, index) => {
          return (
            <View key={index} style={styles.requirementView}>
              <Text style={styles.learningDescDot}>{'\u2022'}</Text>
              <Text style={styles.learningDesc}>{item}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderInstructorSection = () => {
    return (
      <View style={styles.instructorContainer}>
        <Text style={styles.contentTitle}>{strings.overview.instructor}</Text>
        <View style={styles.instructorDetailsView}>
          <Image
            source={{uri: data?.instructorImageUrl}}
            style={styles.instructorImg}
          />
          <View style={styles.instructorDetails}>
            <Text style={styles.instructorName}>{data?.instructorName}</Text>
            <Text style={styles.jobrole}>{data?.instructorTitle}</Text>
          </View>
        </View>
        <View style={styles.instructorDesc}>
          <ShowMore text={data?.instructorDescription} hideLength={130} />
        </View>
      </View>
    );
  };

  const renderPortrait = () => {
    return (
      <View style={styles.container}>
        {renderShortDescription()}
        {renderPreviewSection()}
        {renderLongDescription()}
        {renderCourseIncludes()}
        {renderWhatYouWillLearn()}
        {renderRequirements()}
        {renderInstructorSection()}
      </View>
    );
  };

  const renderLandScape = () => {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          {renderShortDescription()}
          {renderPreviewSection()}
          {renderLongDescription()}
          {renderCourseIncludes()}
          {renderWhatYouWillLearn()}
          {renderRequirements()}
          {renderInstructorSection()}
        </View>
      </SafeAreaView>
    );
  };

  return portrait ? renderPortrait() : renderLandScape();
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  shortDesc: {
    color: colors.privacy,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  previewTitle: {
    color: colors.primaryText,
    fontFamily: fonts.sFnSDisplayRegular,
    fontSize: 18,
    lineHeight: 21,
    marginTop: 30,
    marginBottom: 14,
  },
  previewContainer: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  imageBg: {
    resizeMode: 'cover',
  },
  overlayView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.profileBg,
    paddingVertical: 16,
    paddingLeft: 22,
    paddingRight: 24,
  },
  previewLeftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playBtn: {
    width: 48,
    height: 48,
  },
  rightArrow: {
    width: 9,
    height: 16,
  },
  introText: {
    color: colors.background,
    fontFamily: fonts.sFnSDisplayRegular,
    fontSize: 16,
    lineHeight: 18,
  },
  time: {
    color: colors.background,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 12,
    lineHeight: 15,
    marginTop: 1,
  },
  introView: {
    marginLeft: 20,
  },
  showMoreView: {
    marginTop: 29,
    marginBottom: 30,
  },
  contentTitle: {
    color: colors.primaryText,
    fontFamily: fonts.sFnSDisplayRegular,
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 14,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseIcon: {
    width: 18,
    height: 18,
  },
  courseDesc: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    marginLeft: 10,
  },
  courseContent: {
    marginBottom: 18,
  },
  learningItemView: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  learningDesc: {
    marginLeft: 10,
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
    letterSpacing: 0,
    flexShrink: 1,
  },
  learningDescDot: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 16,
    lineHeight: 17,
    fontWeight: '500',
  },
  learningView: {
    marginBottom: 12,
  },

  requirementView: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  requirementContainer: {
    marginBottom: 24,
  },
  instructorImg: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  instructorDetailsView: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  instructorDetails: {
    marginLeft: 10,
  },
  instructorName: {
    color: colors.primaryText,
    fontFamily: fonts.sFnSDisplayRegular,
    fontSize: 12,
    lineHeight: 15,
    marginBottom: 2,
    marginTop: 5,
  },
  jobrole: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: 0,
    flexShrink: 1,
  },
  instructorDesc: {
    marginBottom: 16,
  },
});
