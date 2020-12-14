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
  <TouchableOpacity onPress={onPress} style={item.IsSticky ? styles.stickyRow : styles.unStickyRow}>
    <Block row>
      <Image source={Images.ItemUser} style={styles.itemUser} />
      {item.count ? <Text size={16} style={item.IsNotify ? styles.notyCount : styles.nullPoint}>{item.IsNotify ? item.count : ''}</Text> : null}
      <Block>
        <Text bold style={styles.nickName}>{item.name}</Text>
        <Text style={styles.itemContent}>{item.sentence}</Text>
      </Block>
      <Block style={styles.timeInfo} flex>
        <Text size={16}>{item.updatedAt}</Text>
        {item.IsNotify ? null : <Image
          style={{ width: 20, height: 20, resizeMode: 'stretch' }}
          source={Images.BellOff}
        />}
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

class ChatHistory extends React.Component {
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
            keyExtractor={(item) => item._id}
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
  stickyRow: {
    padding: 8,
    marginHorizontal: 16,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    backgroundColor: '#eeeeee'
  },
  unStickyRow: {
    padding: 8,
    marginHorizontal: 16,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    backgroundColor: '#ffffff'
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
  notyCount: {
    marginLeft: -30,
    marginRight: 10,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    width: 20,
    height: 20
  },
  nullPoint: {
    marginLeft: -20,
    marginRight: 10,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    width: 10,
    height: 10
  },
  timeInfo: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    notifications: state.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNotifications: () => GetNotifications(dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHistory);