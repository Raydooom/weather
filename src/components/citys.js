import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    SectionList,
    TextInput,
    FlatList,
    View,
    ListView,
    Platform,
    TouchableOpacity
} from 'react-native';
import API from './../common/api'
import Util from './../common/util'


export default class city extends Component {

    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
        this.state = {
            location: this.props.navigation.state.params.city,
            provinceList: ds.cloneWithRows(['r1', 'r2']),
            cityList: '',
            inputFocus: false,
            loaded: false,
        }
    }

    componentDidMount() {
        this._getData()
    }

    _getData() {
        var that = this;
        Util.getRequest(API.Citys, function (data) {
            //console.log(data)
            var province = [];
            var cityList = [];
            data.result.map(function (item, index) {
                if (index < 34) {
                    province.push(item);
                } else {
                    cityList.push(item);
                }
            })
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
            that.setState({
                provinceList: ds.cloneWithRows(province),
                cityList: cityList,
                loaded: true,
            })
        }, function (error) {
            console.log(error)
        })
    }

    render() {
        const navigator = this.props.navigation;
        return (
            <View style={Styles.pageContainer}>
                <View style={Styles.headerBar}>
                    <View style={Styles.topBar}>
                        <TouchableOpacity activeOpacity={0.8} style={Styles.btn} onPress={()=>navigator.goBack()}>
                            <Image style={Styles.icon} source={require('./../resource/icon_back.png')}/>
                        </TouchableOpacity>
                        <Text style={Styles.headText}>城市选择</Text>
                    </View>
                    {/*<View style={Styles.searchBar}>*/}
                        {/*<Image style={[Styles.icon, Styles.searchIcon]} source={require('./../resource/icon_search.png')}/>*/}
                        {/*<TextInput*/}
                            {/*style={Styles.input}*/}
                            {/*ref="input"*/}
                            {/*underlineColorAndroid="transparent"*/}
                            {/*placeholder='请输入城市名进行查询'*/}
                            {/*onFocus={()=>navigator.navigate('Search',{allCity:this.state.cityList})}*/}
                        {/*/>*/}
                    {/*</View>*/}
                </View>
                <ScrollView style={Styles.cityContainer}>
                    <Text style={Styles.listTit}>当前城市</Text>
                    <View style={Styles.hotCon}><Text onPress={()=>navigator.goBack()}
                                                      style={Styles.hotCity}>{this.state.location}</Text></View>
                    <Text style={Styles.listTit}>热门城市</Text>
                    <View style={Styles.hotCon}>
                        <Text style={Styles.hotCity}
                              onPress={()=>navigator.navigate('Home', {city: '北京'})}>北京</Text>
                        <Text style={Styles.hotCity}
                              onPress={()=>navigator.navigate('Home', {city: '上海'})}>上海</Text>
                        <Text style={Styles.hotCity}
                              onPress={()=>navigator.navigate('Home', {city: '广州'})}>广州</Text>
                        <Text style={Styles.hotCity}
                              onPress={()=>navigator.navigate('Home', {city: '深圳'})}>深圳</Text>
                        <Text style={Styles.hotCity}
                              onPress={()=>navigator.navigate('Home', {city: '郑州'})}>郑州</Text>
                        <Text style={Styles.hotCity}
                              onPress={()=>navigator.navigate('Home', {city: '鹤壁'})}>鹤壁</Text>
                        <Text style={Styles.hotCity}
                              onPress={()=>navigator.navigate('Home', {city: '浚县'})}>浚县</Text>

                    </View>
                    {
                        this.state.loaded ? <ListView
                            dataSource={this.state.provinceList}
                            renderRow={this._provinceList.bind(this)}
                            initialListSize={3}
                            pageSize={3}
                            //renderSectionHeader={this._section}
                            renderFooter={this._footer}
                            //renderHeader={this._footer}
                            stickySectionHeadersEnabled={true}
                        /> :
                            Util.loading
                    }

                </ScrollView>

            </View>
        )
    }

    _provinceList(item) {
        const navigator = this.props.navigation;
        var citys = this.state.cityList;
        var cityChild = [];
        citys.map(function (city) {
            if (city.parentid == item.cityid) {
                cityChild.push(city)
            }
        })
        return (
            <View>
                <Text style={Styles.cityBar}>{item.city}</Text>
                <Text style={Styles.cityList}
                      onPress={()=>navigator.navigate('Home', {city: item.city})}>{item.city}</Text>
                {
                    cityChild.map(function (city,index) {
                        return (
                            <Text key={index} style={Styles.cityList}
                                  onPress={()=>navigator.navigate('Home', {city: city.city})}>{city.city}</Text>
                        )
                    })
                }
            </View>
        )

    }

    _footer() {
        return (
            <Text style={Styles.tips}>没有了</Text>
        )
    }
}

const Styles = StyleSheet.create({
    pageContainer: {
        position: 'relative'
    },
    headerBar: {
        position: 'absolute',
        width: Util.windowSize.width,
        zIndex: 5,
        top: 0,
        left: 0,
    },
    btn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0
    },
    icon: {
        width: 30,
        height: 30,
    },
    topBar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 44
    },
    headText: {
        fontSize: 18,
        color: '#333'
    },
    searchBar: {
        backgroundColor: '#ddd',
        height: 44,
        paddingHorizontal: 12
    },
    searchIcon: {
        position: 'absolute',
        top: 16,
        left: 20,
        zIndex: 2,
        width:12,
        height:12
    },
    input: {
        backgroundColor: '#fff',
        height: 30,
        marginTop: 7,
        borderRadius: 4,
        padding: 0,
        paddingHorizontal: 8,
        fontSize: 12,
        textAlign: 'left',
        paddingLeft: 26
    },
    cityContainer: {
        marginTop: 44,
        height: Util.windowSize.height - 44
    },
    listTit: {
        backgroundColor: '#eee',
        height: 26,
        paddingHorizontal: 12,
        textAlignVertical: 'center'
    },
    hotCon: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexWrap: 'wrap'
    },
    hotCity: {
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        height: 26,
        textAlignVertical: 'center'
    },
    cityBar: {
        backgroundColor: '#ddd',
        height: 30,
        textAlignVertical: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12
    },
    cityList: {
        backgroundColor: '#fff',
        height: 36,
        textAlignVertical: 'center',
        paddingHorizontal: 16,
        marginTop: 1
    },
    tips: {
        backgroundColor: '#eee',
        textAlign: 'center',
        paddingVertical: 4
    }
})

