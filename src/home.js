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
    RefreshControl,
    Image,
    ScrollView,
    View,
    TouchableOpacity
} from 'react-native';
import API from './common/api'
import Util from './common/util'
import Today from './components/today'
import Days from './components/days'
import Hours from './components/hours'
import TodayDetail from './components/todayDetail'

export default class home extends Component {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            location: '正在获取数据',
            initialPosition: [],
            result:'',
            loaded: false
        };
    }

    watchID = null;

    componentDidMount() {
        var city=this.props.navigation.state;
        //console.log(city)
        if(city.params){
            this._getByName(city.params.city);
        }else{
            this._getLocation();
        }
    }

    _getByName(name){
        //console.log(name)
        var that=this;
        Util.getRequest(API.Weather + '?city='+name, function (data) {
                var weather = data.result;
                that.setState({
                    location: weather.city,
                    result: weather,
                    loaded: true
                })

            }, function (error) {
                alert(error)
            }
        )
    }


    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    _getLocation() {
        //获取当前位置
        navigator.geolocation.getCurrentPosition(
            (initialPosition) => {
                this.setState({initialPosition: initialPosition.coords, loaded: false})
                this._getData();
            },
            (error) => alert(error.message),
            {enableHighAccuracy: false, timeout: 1000000, maximumAge: 1000}
        );
        //监听位置变化
        navigator.geolocation.watchPosition((lastPosition) => {
            this.setState({location: '定位中...', initialPosition: lastPosition.coords, loaded: false});
            this._getData();
        });
    }

    //根据经纬度获取数据
    _getData() {
        var that = this;
        Util.getRequest(API.Weather + '?location=' + this.state.initialPosition.latitude + ',' + this.state.initialPosition.longitude, function (data) {
                //console.log(data)
                var weather = data.result;
                that.setState({
                    location: weather.city,
                    result: weather,
                    loaded: true
                })

            }, function (error) {
                alert(error)
            }
        )
    }

    //下拉刷新执行函数
    _refresh() {
        var city=this.props.navigation.state;
        //console.log(city)
        if(city.params){
            this._getByName(city.params.city);
            this.setState({
                location:'正在更新数据'
            })
        }else{
            this.setState({location: '正在更新数据'});
            this._getLocation();
        }

    }

    //点击定位按钮
    _getCity(){
        this.setState({location: '正在定位'});
        this._getLocation();
        this.refs._scrollView.scrollTo({y:0,animated:true})
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={Styles.body}>
                <ScrollView
                    ref='_scrollView'
                    style={Styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            enabled={true}
                            onRefresh={this._refresh.bind(this)}
                            tintColor="#f40"
                            title="加载中..."
                            titleColor="#fff9"
                            colors={['#4da4dd']}
                            progressBackgroundColor="#fffe"
                        />
                    }
                >
                    <View style={Styles.today}>
                        <Today data={this.state}/>
                        <Hours hours={this.state}/>
                    </View>
                    <Days data={this.state}/>
                    <TodayDetail data={this.state}/>
                </ScrollView>
                <View style={Styles.footerBar}>
                    <TouchableOpacity  activeOpacity={0.8} style={Styles.btn} onPress={this._getCity.bind(this)}>
                        <Image style={Styles.icon} source={require('./resource/location.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity={0.8} style={Styles.btn} onPress={() => navigate('City',{city:this.state.location})}>
                        <Image style={Styles.icon} source={require('./resource/cityList.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}



const Styles = StyleSheet.create({
    body: {
        height: Util.windowSize.height-25,
    },
    container:{
        marginBottom:44
    },
    today: {
        backgroundColor: '#4da4dd'
    },
    footerBar: {
        borderTopWidth:1,
        borderColor:'#ddd',
        width:Util.windowSize.width,
        height: 44,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    btn:{
        width:44,
        height:44,
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        width:20,
        height:20,
    }
})

