/*
 今天天气
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    ListView,
    Image,
    Text,
    View
} from 'react-native';
import API from './../common/api'
import Util from './../common/util'

export default class days extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
        this.state = {
            days: ds.cloneWithRows(['暂无数据']),
            loaded: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this._update(nextProps)
    }

    _update(nextProps) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
        var props = nextProps.data;
        //console.log(props)
        if (props.loaded) {
            var days = props.result.daily;
            //console.log(days)
            this.setState({
                days: ds.cloneWithRows(days),
                loaded: true
            })
        }
    }

    render() {
        return (
            <View style={Styles.container}>
                { this.state.loaded ?
                    <ListView
                        dataSource={this.state.days}
                        renderRow={this._daysItem.bind(this)}
                    />
                    :
                    Util.loading
                }
            </View>
        )
    }

    _daysItem(day) {
        var img = day.day.img < 10 ? '0' + day.day.img : day.day.img;
        //console.log(img)
        return (
            <View style={Styles.item}>
                <Text style={Styles.week}>{day.week}</Text>
                <View style={Styles.wea}>
                    <Image style={Styles.icon} source={{uri: 'http://app1.showapi.com/weather/icon/day/'+img+'.png'}}/>
                    <Text style={Styles.weaText}>{day.day.weather}</Text>
                    <Text style={Styles.tem}>{day.day.temphigh}&nbsp;~&nbsp;{day.night.templow}</Text>
                </View>
            </View>
        )
    }
}


const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: -10,
        padding: 12,
        shadowColor: '#0001',  //安卓不支持阴影
        shadowOffset: {
            width: 10,
            height: 10
        }
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingVertical: 12,
        marginBottom: -1,
    },
    wea: {
        flexDirection: 'row',
    },
    week: {
        fontSize: 16,
        color: '#333',
    },
    icon: {
        width: 26,
        height: 26,
        marginRight: 20,
    },
    weaText: {
        width: 60,
        textAlign: 'center',
        marginRight: 10
    },
    tem: {
        width: 50
    }

})


