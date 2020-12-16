import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import SectionListContacts from 'react-native-sectionlist-contacts'
const { height, width } = Dimensions.get("screen");

import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import { Button, Footer } from "../components";


const ContactsItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Block row style={{ alignItems: "center" }}>
      <Image source={Images.ItemUser} style={styles.itemUser} />
      <Text style={styles.nickName}>{item.name}</Text>
      <Block style={styles.addButtonItem} flex>
        <Button textStyle={{ fontFamily: 'montserrat-regular', fontSize: 18, textWeight: 'bold' }} style={styles.addButton}>Add</Button>
      </Block>
    </Block>
  </TouchableOpacity>
);

export default class Moblie extends React.Component {
  constructor(props) {
    super(props)

    let nameData = [
      { name: '阿玛尼', id: 'amani', params: '' },
      { name: 'OK', id: 'ok', params: '123' },
      { name: '天津饭' },
      { name: '%……&' },
      { name: '周星驰' },
      { name: '习大表哥' },
      { name: '不要这样' },
      { name: 'V字仇杀队' },
      { name: '拼车' },
      { name: '他妈跌' },
      { name: '淫僧' },
      { name: '钱学森' },
      { name: '宁采臣' },
      { name: '史泰龙' },
      { name: '恐龙' },
      { name: '任达华' },
      { name: '妈咪宝贝' },
      { name: 'ing' },
      { name: '康麦隆' },
      { name: '刘德华' },
      { name: '精忠报国' },
      { name: '黄药师' },
      { name: '大叔皮' },
      { name: '布达拉宫' },
      { name: '方世玉' },
      { name: 'ET外星人' },
      { name: '程咬金' },
      { name: '**&&&&' },
    ]

    this.state = {
      dataArray: nameData,
    }
  }
  render() {
    return (
      <Block flex>
        <SectionListContacts
          ref={s => this.sectionList = s}
          sectionListData={this.state.dataArray}
          sectionHeight={50}
          initialNumToRender={this.state.dataArray.length}
          showsVerticalScrollIndicator={false}
          SectionListClickCallback={(item, index) => {
            console.log('---SectionListClickCallback--:', item, index)
          }}
          renderItem={this._renderItem}
          otherAlphabet="#"
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {
    width: width,
    padding: 10,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  rightCell: {
    padding: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'grey',
    alignItems: 'flex-end',
  },
  rightCell2: {
    padding: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'grey',
  },
  leftCell: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER
  },
  item: {
    marginBottom: 5,
    paddingVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  itemUser: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    marginRight: 10
  },
  nickName: {
    fontSize: 20,
    color: 'black'
  },
  itemContent: {
    fontSize: 18,
    color: 'grey'
  },
  addButtonItem: {
    alignItems:'flex-end'
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    width: 90
  }
});