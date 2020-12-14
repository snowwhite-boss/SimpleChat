import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from "react-native";
var Contacts = require('react-native-contacts');
// import AddressBook from 'react-native-addressbook'
import { Block, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import { Button, Footer } from "../components";
const contactsDATA = [
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

export default class NewFriend extends React.Component {
  componentDidMount() {
    if(Platform.OS === 'ios'){
      Contacts.getAll((err, contacts) => {
        if (err) {
          throw err;
        }
        // contacts returned
        console.log("contacts => ", contacts);
      })
    }else if(Platform.OS === 'android'){
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.'
        }
      ).then(() => {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied'){
            // error
          } else {
            // contacts returned in Array
            console.log("contacts => ", contacts);
          }
        })
      })
    }
  }
  render() {
    return (
      <Block flex>
        <TouchableOpacity onPress={() => navigation.navigate('Mobile')}>
          <Block row style={styles.newFriendRow}>
            <Image
              style={styles.addPhone}
              source={Images.addPhone}
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
  addPhone:{
    width: 40,
    height: 40,
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