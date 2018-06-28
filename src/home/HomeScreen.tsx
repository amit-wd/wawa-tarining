/**
 * This represents a simple screen-level container component with rendering
 * and styling that is hooked up to the redux store.
 */

import * as React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  ViewStyle,
  View,
  Text,
  Alert,
  TouchableHighlight,
  Platform,
  Dimensions,
  TextStyle,
} from 'react-native';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

// Export component without provider for testing purposes
export class Home extends React.Component {
  alert = () => {
    Alert.alert('data');
  };

  static navigationOptions = {
    title: 'Welcome',
  };

  // renderItem({ item, index }, parallaxProps) {
  //   return (
  //     <View style={styles.item}>
  //       <ParallaxImage
  //         source={{ uri: item.thumbnail }}
  //         containerStyle={styles.imageContainer}
  //         style={styles.image}
  //         parallaxFactor={0.4}
  //         {...parallaxProps}
  //       />
  //       <Text style={styles.title} numberOfLines={2}>
  //         {item.title}
  //       </Text>
  //       <View>
  //         {/* <Carousel
  //           data={this.state.entries}
  //           renderItem={this._renderItem}
  //           hasParallaxImages={true}
  //         /> */}
  //       </View>
  //     </View>
  //   );
  // }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor={'#fff'}
          style={styles.btnStyle}
          onPress={this.alert}
        >
          <Text style={{ color: '#000', fontSize: 30 }}>Make My Meal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

// Connected component is used with Redux store
export const HomeScreen = connect()(Home);

// This helps auto-completion / type safety with `StyleSheet.create`
interface Style {
  container: ViewStyle;
  btnStyle: ViewStyle;
  carouselContainer: ViewStyle;
  slideInnerContainer: ViewStyle;
  shadow: ViewStyle;
  imageContainer: ViewStyle;
  imageContainerEven: ViewStyle;
  image: ViewStyle;
  radiusMask: ViewStyle;
  radiusMaskEven: ViewStyle;
  textContainer: ViewStyle;
  textContainerEven: ViewStyle;
  title: TextStyle;
  titleEven: TextStyle;
  subtitle: TextStyle;
  subtitleEven: TextStyle;
}

const IS_IOS = Platform.OS === 'ios';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;
const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};

// TypeScript hoists variables. We declare the styles here to keep them out of
// the way of the component definition
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  btnStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    flex: 0.3,
    justifyContent: 'center',
  },
  carouselContainer: {
    flex: 0.7,
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: colors.black,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    // resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: colors.black,
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
    backgroundColor: colors.black,
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
