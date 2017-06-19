/*
 今天天气
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

export default class today extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: '正在获取',
            weather: {
                aqi: '00',
                aqiDetail: '优',
                temperature: "0",
                temperature_time: "00:00",
                week: '星期日',
                weather: "晴",
                weather_pic: "http://app1.showapi.com/weather/icon/day/301.png",
                wind_direction: "无风",
                wind_power: "0级",
            },
            loaded:false
        }
    }

    componentWillReceiveProps(nextProps) {
        this._update(nextProps)
    }

    _update(nextProps) {
        var props = nextProps.data;
        if (props.loaded) {
            var today = props.result;
            this.setState({
                location: props.location,
                weather: {
                    aqi: today.aqi.aqi,
                    aqiDetail: today.aqi.quality,
                    temperature: today.temp,
                    temperature_time: today.updatetime,
                    week: today.week,
                    weather: today.weather,
                    weather_pic: today.img,
                    wind_direction: today.winddirect,
                    wind_power: today.windpower,
                },
                loaded:true
            })
            //var weather = this.state.weather;
        }
    }


    render() {
        var weather = this.state.weather;
        var img = weather.weather_pic < 10 ? '0' + weather.weather_pic : weather.weather_pic;
        return (
            <View style={Styles.container}>
                <View style={Styles.city}>
                    <Text style={Styles.loc}>{this.state.location}</Text>
                    <Text style={Styles.weather}>{weather.weather}</Text>
                </View>
                <View style={Styles.weatherCon}>
                    <Image style={Styles.weaIcon} resizeMode="contain"
                           source={{uri: 'http://app1.showapi.com/weather/icon/day/'+img+'.png'}}/>
                    <View style={Styles.tem}>
                        <View style={Styles.temp}><Text style={Styles.num}>{weather.temperature}</Text><Text
                            style={Styles.unit}>℃</Text></View>
                        <Text style={Styles.air}>{weather.aqiDetail}&nbsp;&nbsp;{weather.aqi}</Text>
                    </View>
                </View>
                <View style={Styles.date}>
                    <Text style={Styles.left}>{weather.week}&nbsp;&nbsp;&nbsp;
                        更新时间:{weather.temperature_time.slice(11)}</Text>
                    <Text style={Styles.scope}>{weather.wind_direction}&nbsp;&nbsp;&nbsp;{weather.wind_power}</Text>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        paddingBottom: 8
    },
    loc: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    weather: {
        marginTop: 4,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    weatherCon: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    weaIcon: {
        width: 100,
        height: 100,
        marginRight: 14,
    },
    temp: {
        flexDirection: 'row',
    },
    num: {
        color: '#fff',
        fontSize: 50,
        lineHeight: 50,
    },
    unit: {
        fontSize: 20,
        color: '#fff'
    },
    air: {
        marginTop: 6,
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#0004',
        paddingHorizontal: 10,
        height: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 10,
    },
    date: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    left: {
        color: '#fff',
        fontSize: 14,
    },
    scope: {
        color: '#fff',
        fontSize: 14
    }

})


