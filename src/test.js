
import React ,{ Component } from 'react';
import {
    View,
    ListView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
var { ListJSON } = require('../JSON/ListJSON'),Utils = require('./Utils');
class ProductInfo extends Component{
    constructor(props){
        super(props);
    }
    _gotoBuy(){

    }
    render(){
        var product = this.props.product;
        return (
            <TouchableHighlight onPress={this._gotoBuy} underlayColor={'rgba(0, 0, 0, 0.3)'} style={styles.productWrapper}>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailTxt}>{product.flowTotalUnit}</Text>
                    <Text style={styles.productDetailTxt}>/{product.retailPrice / 100}元</Text>
                    <Text style={styles.productDetailTxt}>{!!product.expiredPrice ? (product.expiredPrice / 100) + '元' : ''}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
class ProductRow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={styles.productFlex}>
                {
                    this.props.products.map((item,i) => <ProductInfo product={ item } key = { i }></ProductInfo>)
                }
            </View>
        )
    }
}
class List extends Component{
    constructor(props){
        super(props);
        var _getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        }
        var _getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        }
        var data = Utils.translateData(ListJSON);
        const ds = new ListView.DataSource({
            getSectionData: _getSectionData,
            getRowData: _getRowData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(data.dataBlob, data.sectionIDs, data.rowIDs),
        }
    }
    renderRow(rowData, sectionID, rowID) {
        //console.log(rowData,'****')
        return (
            <ProductRow products={rowData}></ProductRow>
        );
    }
    renderSectionHeader(sectionData, sectionID){
        return (
            <View>
                <Text style={styles.sectionTtl}>{sectionData.scope}{sectionData.type}<Text> | {sectionData.tip}</Text></Text>
            </View>
        );
    }
    render(){
        return (
            <View style={styles.container} >
                <ListView dataSource={this.state.dataSource}
                          contentContainerStyle={styles.listview}
                          renderRow  = {this.renderRow}
                          renderSectionHeader = {this.renderSectionHeader}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        padding:10,
    },
    listview: {
        width:windowWidth-20
    },
    sectionTtl:{
        height:30,
        textAlignVertical:'center'
    },
    productFlex:{
        paddingBottom:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    productWrapper:{
        width:(windowWidth-20)*0.485,
        borderWidth:1,
        borderColor:'#e2e2e2',
        borderRadius:4
    },
    productDetail:{
        flexDirection: 'row',
        justifyContent:'center'
    },
    productDetailTxt:{
        height:56,
        textAlignVertical:'center',
    }
});
module.exports = {
    List:List
}