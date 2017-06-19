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
import API from './../common/api';
import Util from './../common/util';


export default class today extends Component {
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
        this.state = {
            hours: ds.cloneWithRows(['r1', 'r2']),
            loaded: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this._update(nextProps)
    }

    _update(nextProps) {
        //console.log(nextProps)
        var loaded = nextProps.hours.loaded;
        var hours = nextProps.hours.result.hourly;
        if (loaded) {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
            this.setState({
                hours: ds.cloneWithRows(hours),
                loaded: true
            })

        }

    }


    render() {
        return (
            <View style={Styles.container}>
                {
                    this.state.loaded ?
                        <ListView
                            style={Styles.list}
                            horizontal={true}
                            dataSource={this.state.hours}
                            renderRow={this._renderList.bind(this)}
                        />
                        :
                        null
                }
            </View>
        )
    }

    _renderList(item) {
        var time = item.time;
        var hours = (str)=> str.length ==5 ? str.slice(0, 2) : str.slice(0, 1);
        var img = item.img < 10 ? '0' + item.img : item.img;
        return (
            <View style={Styles.day}>
                <Text style={Styles.hours}>{hours(time)}时</Text>
                <Image style={Styles.icon} source={{uri: 'http://app1.showapi.com/weather/icon/day/'+img+'.png'}}/>
                <Text style={Styles.tem}>{item.temp}º</Text>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#4da4dd90',
        paddingBottom: 20
    },
    list: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#fff4',
        paddingVertical: 8
    },
    day: {
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    hours: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 12,
        width: 40,
    },
    icon: {
        width: 24,
        height: 24,
        marginVertical: 5
    },
    tem: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 12,
        width: 40,
    }


})


