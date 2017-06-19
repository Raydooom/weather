/*
 通用工具类
 */
import React, {
    Component
}
    from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';


export default Utils = {
    //获取屏幕宽高
    windowSize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    //fetch网络请求方法,get方法
    //successCallback 请求成功回调方法
    //failCallback 请求失败回调方法
    //阿里请求接口方式
    getRequest: function (url, successCallback, failCallback) {
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "APPCODE e0a68a47b5554b3e8f6944caaf5abec0"
            },

        })
            .then((response) => response.json())
            .then((responseData) => successCallback(responseData))
            .catch((error) => failCallback(error))
    },
    //loading
    loading: <View>
        <ActivityIndicator
            style={{marginTop: 20}}
            color={'#4bd3ff'}
            size={30}
        />
        <Text style={{textAlign: 'center', fontSize: 12, marginTop: 4, color: '#999'}}>数据加载中</Text>
    </View>,
    loadingWhite:<View>
        <ActivityIndicator
            style={{marginTop: 20}}
            color={'#fff6'}
            size={30}
        />
        <Text style={{textAlign: 'center', fontSize: 12, marginTop: 4, color: '#fff6'}}>数据加载中</Text>
    </View>,

}




