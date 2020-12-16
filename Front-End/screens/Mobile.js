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
import * as Contacts from 'expo-contacts';

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

    this.state = {
      dataArray: [],
    }
  }
  async componentDidMount() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.ID, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        console.log(data);
        this.setState({ dataArray: data });
      }
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
    alignItems: 'flex-end'
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    width: 90
  }
});