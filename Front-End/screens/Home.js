import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Block, Text } from "galio-framework";
// connect to Redux state
import { connect } from "react-redux";

import { Footer } from "../components";
import { Images } from "../constants";
import nowTheme from '../constants/Theme';
import { SetChatMan } from "../actions/userActions";
const { width } = Dimensions.get("screen");
import { apiConfig } from "../config/config";

const ChatItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={item.isSticky ? styles.stickyRow : styles.unStickyRow}>
      <Block row>
        <Image source={Images.ItemUser} style={styles.itemUser} />
        {item.count ? <Text size={12} style={item.isNotify ? styles.notyCount : styles.nullPoint}>{item.isNotify ? item.count : ''}</Text> : null}
        <Block>
          <Text bold style={styles.nickName}>{item.senduser.name}</Text>
          <Text style={styles.itemContent}>{item.content}</Text>
        </Block>
        <Block style={styles.timeInfo} flex>
          <Text size={16}>{item.updatedAt}</Text>
          {item.isNotify ? null : <Image
            style={{ width: 20, height: 20, resizeMode: 'stretch' }}
            source={Images.BellOff}
          />}
        </Block>
      </Block>
    </TouchableOpacity>
  );
}

class ChatHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  renderChatItem = ({ item }) => {
    return (
      <ChatItem
        item={item}
        onPress={() => this.toChat(item)}
      />
    );
  };

  toChat = ({ senduser }) => {
    this.props.setChatMan(senduser);
    this.props.navigation.navigate('Chatting');
  }
  //export default function Home() {
  render() {
    return (
      <Block flex style={styles.scene}>
        <FlatList
          style={styles.container}
          data={this.props.notifications()}
          renderItem={this.renderChatItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Footer navigation={this.props.navigation} left />
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#DEDEDE'
  },
  container: {
    width: width,
    paddingTop: 10
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
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    backgroundColor: '#eeeeee'
  },
  unStickyRow: {
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    backgroundColor: '#ffffff'
  },
  itemUser: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
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
    marginLeft: -10,
    marginRight: 10,
    marginTop: -10,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
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
    notifications: () => {
      return state.notifications.filter(notification => notification.senduser.name.search(state.filterKey) >= 0);
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setChatMan: (man) => SetChatMan(dispatch, man),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);