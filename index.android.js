/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';
import Main from './src/main'
//启动屏幕
import SplashScreen from 'react-native-splash-screen'

class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
    render(){
        return(
            <Main />
        )
    }
}

AppRegistry.registerComponent('weather', () => App);
