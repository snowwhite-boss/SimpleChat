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

const { height, width } = Dimensions.get("screen");

import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import { Button, Footer } from "../components";

const contactsDATA = [
  {
    id: "0",
    name: "Zen"
  },
  {
    id: "1",
    name: "Sergey"
  },
  {
    id: "2",
    name: "Boychik"
  },
  {
    id: "3",
    name: "Adalbert"
  },
  {
    id: "4",
    name: "John"
  },
  {
    id: "5",
    name: "Marcelino"
  },
  {
    id: "1",
    name: "Sergey"
  },
  {
    id: "2",
    name: "Boychik"
  },
  {
    id: "3",
    name: "Adalbert"
  },
  {
    id: "4",
    name: "John"
  },
  {
    id: "5",
    name: "Marcelino"
  },
  {
    id: "1",
    name: "Sergey"
  },
  {
    id: "2",
    name: "Boychik"
  },
  {
    id: "3",
    name: "Adalbert"
  },
  {
    id: "4",
    name: "John"
  },
  {
    id: "5",
    name: "Marcelino"
  },
];

const ContactsItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Block row style={{ alignItems: "center" }}>
      <Image source={Images.ItemUser} style={styles.itemUser} />
      <Text style={styles.nickName}>{item.name}</Text>
    </Block>
  </TouchableOpacity>
);

const renderContactsItem = ({ item }) => {
  return (
    <ContactsItem
      item={item}
      onPress={() => alert(item.id)}
    />
  );
};

export default class Contacts extends React.Component {
  render() {
    return (
      <Block flex>
        <TouchableOpacity onPress={() => navigation.navigate('Pro')}>
          <Block row style={styles.newFriendRow}>
            <Image
              style={styles.newFriendIcon}
              source={Images.newFriendIcon}
            />
            <Text bold size={20} color="orange" style={{paddingLeft:20}}>New Friends</Text>
          </Block>
        </TouchableOpacity>
        <ScrollView style={styles.container}>
          <FlatList
            data={contactsDATA}
            renderItem={renderContactsItem}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        <Footer navigation={this.props.navigation} />
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
    borderTopColor:'grey',
    borderTopWidth:1,
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
  newFriendIcon: {
    width: 40,
    height: 30,
    resizeMode: 'stretch'
  },
  newFriendRow:{
    paddingHorizontal:26,
    paddingVertical:10,
    alignItems:'center',
    borderColor:'orange',
    borderRadius:20,
    borderWidth:2,
    marginHorizontal:26,
    marginVertical:10
  }
});