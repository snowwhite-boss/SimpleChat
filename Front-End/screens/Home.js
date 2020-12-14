import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView
} from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button, Icon, Footer } from "../components";
import { Images } from "../constants";
import articles from "../constants/articles";
import nowTheme from '../constants/Theme';
const { width } = Dimensions.get("screen");
// Server Client
import Client from '../api/Client';

const ChatItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Block row style={{ alignItems: "center" }}>
      <Image source={Images.ItemUser} style={styles.itemUser} />
      <Block>
        <Text bold style={styles.nickName}>{item.name}</Text>
        <Text style={styles.itemContent}>{item.sentence}</Text>
      </Block>
    </Block>
  </TouchableOpacity>
);
const renderChatItem = ({ item }) => {
  return (
    <ChatItem
      item={item}
      onPress={() => alert(item.id)}
    />
  );
};



const initialLayout = { width: Dimensions.get('window').width };

export default class TeamReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
  }

  componentDidMount() {
    Client.get(`notifications`)
      .then(async res => {
        console.log(res.data, " notifications");
        this.setState({ notifications: res.data })
      })
      .catch(error => console.log("login error => ", error));
  }
  //export default function Home() {
  render() {
    return (
      <Block flex>
        <ScrollView style={styles.container}>
          <FlatList
            data={this.state.notifications}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        <Footer navigation={this.props.navigation} left />
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
    padding: 10
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
});