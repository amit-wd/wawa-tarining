import * as React from 'react';
import {
  Modal,
  ScrollView,
  TouchableHighlight,
  View,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import { MyCarousel } from 'src/components/carousel/MyCarousel';
import reactNativeBarcodePdf417 from 'react-native-barcode-pdf417';
import { sliderWidth } from '../components/carousel/MySliderStyle';
import reactNativeLinearGradient from 'react-native-linear-gradient';

const LinearGradient = reactNativeLinearGradient;
const BarCode = reactNativeBarcodePdf417;
interface Props {
  navigation;
}

interface States {}

export class MealScreen extends React.Component<Props, States> {
  static navigationOptions = {
    title: 'Make my Meal',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#D2691E',
    },
  };

  state = {
    selectedItems: [],
    modalVisible: false,
  };

  componentDidMount() {}

  makeIt = () => {
    this.props.navigation.state.params.addToRecents(this.state.selectedItems);
    this.setModalVisible(true);
  };

  addToRecents = data => this.setState({ selectedItems: [...data] });

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  openModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
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
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <LinearGradient
              colors={['#FDC830', '#F37335']}
              style={styles.container}
            >
              <View
                style={{
                  display: 'flex',
                  width: sliderWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}
                >
                  Main
                </Text>
              </View>
              <MyCarousel
                data={this.props.navigation.state.params.data.main}
                addToRecents={this.addToRecents}
              />
            </LinearGradient>
            <LinearGradient
              colors={['#6e45e2', '#88d3ce']}
              style={styles.container}
            >
              <View
                style={{
                  display: 'flex',
                  width: sliderWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}
                >
                  Drinks
                </Text>
              </View>
              <MyCarousel
                data={this.props.navigation.state.params.data.drink}
                addToRecents={this.addToRecents}
              />
            </LinearGradient>
            <LinearGradient
              colors={['#FC466B', '#3F5EFB']}
              style={styles.container}
            >
              <View
                style={{
                  display: 'flex',
                  width: sliderWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}
                >
                  Side
                </Text>
              </View>
              <MyCarousel
                data={this.props.navigation.state.params.data.side}
                addToRecents={this.addToRecents}
              />
            </LinearGradient>
          </ScrollView>
          <View>
            <Button title={'Make It'} onPress={this.makeIt} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
});
