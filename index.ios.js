/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StatusBar
} from 'react-native';
import Home from './src/main'
import SplashScreen from 'react-native-splash-screen'

export default class app extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
        <View>
          <StatusBar
              animated={true}
              hidden={false}
              backgroundColor={'blue'}
              translucent={true}
              barStyle={'default'}
              showHideTransition={'fade'}
              networkActivityIndicatorVisible={true}
          />
          <Home />
        </View>
    );
  }
}

AppRegistry.registerComponent('weather', () => app);
