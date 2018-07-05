import * as React from 'react';
import reactNativeSnapCarousel from 'react-native-snap-carousel';
import {
  Button,
  Modal,
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from 'src/components/carousel/index.styles';
import reactNativeBarcodePdf417 from 'react-native-barcode-pdf417';
// import reactNativeEasyToast from 'react-native-easy-toast';

// const Toast = reactNativeEasyToast;
const BarCode = reactNativeBarcodePdf417;

const Carousel = reactNativeSnapCarousel;
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);
const slideHeight = viewportHeight * 0.67;
const slideWidth = wp(78);
const itemHorizontalMargin = wp(2);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

interface Props {
  data: {}[];
  addToRecents?: any;
  openedIn?: any;
}

interface States {}

export class MyCarousel extends React.Component<Props, States> {
  state = {
    selectedItems: [],
    modalVisible: false,
  };

  addToRecents = item => () =>
    this.setState(
      { selectedItems: [...this.state.selectedItems, item] },
      () => {
        this.props.addToRecents(this.state.selectedItems);
      },
    );

  searchInRecents = item => {
    if (this.state.selectedItems.indexOf(item) !== -1) {
      return true;
    }
  };

  openModal = () => {
    // alert('hjgsdhjfg')
    this.setModalVisible(!this.state.modalVisible);
  };

  componentWillUnmount() {
    this.setState({ selectedItems: [] });
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  renderItem = ({ item }) => {
    if (this.props.openedIn === 'home') {
      return (
        <View>
          <Text>In Home</Text>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableHighlight onPress={this.openModal}>
                <BarCode text="123124123" width={250} height={100} />
              </TouchableHighlight>
              <Button title={'Tap to dismiss'} onPress={this.openModal} />
            </View>
          </Modal>
          <TouchableHighlight
            underlayColor={'#fff'}
            onPress={this.openModal}
            activeOpacity={0.6}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: slideHeight / 1.4,
                alignItems: 'center',
              }}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.url }}
                  style={[
                    styles.image,
                    this.searchInRecents(item) ? styles.activeItem : null,
                  ]}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <Text style={[styles.textContainer, styles.title]}>
                  {item.name.toUpperCase()}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableHighlight
            underlayColor={'#fff'}
            onPress={this.addToRecents(item)}
            style={styles.slideInnerContainer}
            activeOpacity={0.6}
          >
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: slideHeight / 1.4,
                  alignItems: 'center',
                }}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.url }}
                    style={[
                      styles.image,
                      this.searchInRecents(item) ? styles.activeItem : null,
                    ]}
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text style={[styles.textContainer, styles.title]}>
                    {item.name.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  };

  render() {
    if (this.props.data.length > 0) {
      return (
        <View>
          <Carousel
            layout={'default'}
            layoutCardOffset={8}
            data={this.props.data}
            renderItem={this.renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={1}
            activeSlideAlignment={'center'}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
          />
          {/* <Toast ref={'toast'} /> */}
        </View>
      );
    } else {
      return (
        <View style={styles.noItemContainer}>
          <Text style={styles.noItemFont}>No items purchased</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  noItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemFont: {
    fontSize: 24,
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    width: itemWidth,
    height: slideHeight / 1.4,
  },
  activeItem: {
    flex: 1,
    position: 'relative',
    left: 0,
    top: 0,
    opacity: 1,
    backgroundColor: '#dfdfdf',
    width: itemWidth,
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 1, // for custom animation
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight / 1.4,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 10, // needed for shadow
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
    marginBottom: IS_IOS ? 0 : -1,
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: colors.black,
  },
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
    width: itemWidth,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 30 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 26,
    backgroundColor: 'black',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
    backgroundColor: colors.black,
  },
  title: {
    color: 'white',
    fontSize: 16,
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
