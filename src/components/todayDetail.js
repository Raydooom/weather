import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    RefreshControl,
    ListView,
    Image,
    ScrollView,
    View
} from 'react-native';
import API from './../common/api'
import Util from './../common/util'

export default class todayDetail extends Component {
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
        this.state = {
            data: '',
            list: ds.cloneWithRows(['r1', 'r2']),
            loaded: false,
        }
    }


    componentWillReceiveProps(nextProps) {
        this._getData(nextProps)
    }

    _getData(nextProps) {
        //console.log(nextProps)
        var loaded = nextProps.data.loaded;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
        if (loaded) {
            var airDetail = nextProps.data.result;
            this.setState({
                data: airDetail.aqi,
                list: ds.cloneWithRows(airDetail.index),
                loaded: true
            })
        }

    }

    render() {
        var detail = this.state.data;
        //console.log(this.state)
        return (
            <View>
                {this.state.loaded ?
                    <View style={Styles.detail}>
                        <View style={Styles.airCon}>
                            <Text style={Styles.air}>今日AQI等级&nbsp;&nbsp;&nbsp;<Text
                                style={Styles.level}>{detail.aqiinfo.level}</Text></Text>
                            <Text style={Styles.airText}>
                                {detail.aqiinfo.affect} {'\n'}
                                <Text style={{marginTop: 10}}>{detail.aqiinfo.measure}</Text>
                            </Text>
                        </View>
                        <ListView
                            style={Styles.listcon}
                            dataSource={this.state.list}
                            renderRow={this._rendList.bind(this)}
                        />
                    </View>
                    :
                    null}
            </View>
        )
    }


    _rendList(item, name, index) {
        var src=[
            {url:require('./../resource/icon_snow.png')},
            {url:require('./../resource/icon_ride.png')}, //icon_ride.png
            {url:require('./../resource/icon_sun.png')},
            {url:require('./../resource/icon_medicine.png')},
            {url:require('./../resource/icon_car.png')},
            {url:require('./../resource/icon_air.png')},
            {url:require('./../resource/icon_clothes.png')}, //icon_clothes
        ]

        return (
            <View style={Styles.list}>
                <View style={Styles.left}>
                    <Image style={Styles.icon} source={src[index].url}/>
                    <Text style={Styles.name}>{item.iname}</Text>
                </View>
                <View style={Styles.right}>
                    <Text style={Styles.tit}>{item.ivalue}</Text>
                    <Text style={Styles.dis}>{item.detail}</Text>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    detail: {
        marginTop: 10,
    },
    airCon: {
        flexDirection: 'column',
        padding: 12,
    },
    air: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    level: {
        color: '#f40',
        fontSize: 16,
    },
    airText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    list: {
        borderTopWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    left: {
        flex: 1,
        justifyContent: 'center'
    },
    icon: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    name: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 4
    },
    right: {
        flex: 2,
        paddingRight: 6,
    },
    tit: {
        fontSize: 16,
        color: '#333',
        paddingBottom: 5
    },
    dis: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
        paddingRight: 10
    }
})