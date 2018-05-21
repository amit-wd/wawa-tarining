import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import { configureStore } from 'src/Store';
import { HomeScreen } from 'src/home/HomeScreen';

const AppStack = createStackNavigator({
  Home: HomeScreen,
});

export default class App extends React.Component {
  store = configureStore();

  componentDidCatch(error) {
    Alert.alert('Error', error.stack);
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppStack />
      </Provider>
    );
  }
}
