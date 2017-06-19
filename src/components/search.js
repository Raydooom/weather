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
import Util from './../common/util'

export default class search extends Component {

    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})

        this.state = {
            allCity: '',
            searchResult:'',
            loaded: false,
            searched: false,
            tip: '请输入名称进行搜索',
            text: true,
            searchText:''
        }
    }

    componentDidMount() {
        this.setState({
            allCity: this.props.navigation.state.params.allCity,
            loaded: true
        })
        this.refs.input.focus();
    }


    render() {
        const navigator = this.props.navigation;
        console.log(this.state.searchResult)
        return (
            <View style={Styles.pageContainer}>
                <View style={Styles.headerBar}>
                    <View style={Styles.topBar}>
                        <TouchableOpacity activeOpacity={0.8} style={Styles.btn} onPress={()=>navigator.goBack()}>
                            <Image style={Styles.icon} source={require('./../resource/icon_back.png')}/>
                        </TouchableOpacity>
                        <Text style={Styles.headText}>搜索</Text>
                    </View>
                    <View style={Styles.searchBar}>
                        <Image style={[Styles.icon, Styles.searchIcon]}
                               source={require('./../resource/icon_search.png')}/>
                        <TextInput
                            style={Styles.input}
                            ref="input"
                            underlineColorAndroid="transparent"
                            placeholder='请输入城市名进行查询'
                            onChangeText={(text)=>this.setState({searchText:text})}
                            onEndEditing={this._changeText.bind(this)}
                        />
                        <Text style={Styles.cancelBtn} onPress={()=>navigator.goBack()}>取消</Text>
                    </View>
                </View>
                {/*<Text style={Styles.searchTips}>asd</Text>*/}
                <View>
                    {
                        this.state.searched ?
                            this.state.searchResult.map(function(item){
                                return <Text style={Styles.searchTips}>{item.city}</Text>
                            })

                            :
                            <Text style={Styles.searchTips}>{this.state.tip}</Text>
                    }
                </View>

            </View>
        )
    }


    _changeText(text) {
        if (this.state.loaded) {
            var citys = this.state.allCity;
            //console.log(citys)
            var searchResult = [];
            console.log(text)
            if (text != '') {
                citys.map(function (city) {
                    if (city.city.indexOf(text) != -1) {
                        searchResult.push(city)
                    }
                })
                //console.log(searchResult)
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2})
                console.log(searchResult)
                if (searchResult.length > 0) {
                    this.setState({
                        searchResult: searchResult,
                        searched: true,
                    })
                } else {
                    this.setState({
                        searched: false,
                        tip: '没有匹配的信息'
                    })
                }
            } else {
                this.setState({
                    searched: false,
                    tip: '请输入名称进行搜索'
                })
            }

        }


    }

    _searchList(item) {
        const navigator = this.props.navigation;
        return (
            <Text style={Styles.cityList}
                  onPress={()=>navigator.navigate('Home', {city: item.city})}>{item.city}</Text>
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
        paddingHorizontal: 12,
        flexDirection: 'row'
    },
    searchIcon: {
        position: 'absolute',
        top: 16,
        left: 20,
        zIndex: 2,
        width: 12,
        height: 12,
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
        paddingLeft: 26,
        flex: 6,
    },
    cancelBtn: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: -10
    },
    cityContainer: {
        marginTop: 88,
        height: Util.windowSize.height - 88
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
    },
    searchTips: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 92
    }
})

