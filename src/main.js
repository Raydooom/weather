/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';
import Home from './home'
import City from './components/citys'
import Search from './components/search'

import {StackNavigator} from 'react-navigation';

const App = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: '天气',
        },
    },
    City:{
        screen:City,
    },
    Search:{
        screen:Search,
    }
}, {
    initialRouteName: 'Home', // 默认显示界面
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        cardStack: {
            gesturesEnabled: true
        }
    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    // onTransitionStart: ()=> {
    //     console.log('导航栏切换开始');
    // },
    // onTransitionEnd: ()=> {
    //     console.log('导航栏切换结束');
    // }

});

export default App;