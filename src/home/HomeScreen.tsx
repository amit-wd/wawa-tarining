import * as React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableHighlight,
  Text,
  TextStyle,
} from 'react-native';
import { MyCarousel } from 'src/components/carousel/MyCarousel';

interface Props {
  navigation?;
  data?;
}

interface States {}

export class Home extends React.Component<Props, States> {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#D2691E',
    },
  };

  state = {
    recents: [],
    foods: [],
  };

  addToRecents = data => {
    if (this.state.recents.length !== 0) {
      this.setState({ recents: [...this.state.recents, ...data] });
    } else {
      this.setState({ recents: [...this.state.recents, ...data] });
    }
  };

  navigateTo = () => {
    const { navigate } = this.props.navigation;
    navigate('Meal', {
      data: this.state.foods,
      addToRecents: data => this.addToRecents(data),
      recents: this.state.recents,
    });
  };

  componentWillMount() {
    fetch('https://s3.amazonaws.com/mob-training/wawa/wawa-jr.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(() => {
          return { foods: responseJson.menu };
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor={'#fff'}
          style={styles.btnStyle}
          onPress={this.navigateTo}
        >
          <Text style={{ color: '#fff', fontSize: 30 }}>Make My Meal</Text>
        </TouchableHighlight>
        <View style={styles.carouselStyle}>
          <Text style={styles.recentsTitle}>Recently Purchased</Text>
          <MyCarousel openedIn="home" data={this.state.recents} />
        </View>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  btnStyle: ViewStyle;
  carouselStyle: ViewStyle;
  recentsTitle: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    // backgroundColor: '#FFCC80',
  },
  recentsTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    alignItems: 'center',
    backgroundColor: '#f44336',
    flex: 0.3,
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
  },
  carouselStyle: {
    flex: 0.7,
    margin: 10,
  },
});

export const HomeScreen = connect(
  null,
  null,
)(Home);
