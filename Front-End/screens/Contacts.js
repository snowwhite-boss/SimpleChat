import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Block, Text } from "galio-framework";
import SectionListContacts from 'react-native-sectionlist-contacts'
const { width } = Dimensions.get("screen");
// connect to Redux state
import { connect } from "react-redux";
import { RequestFriend, AcceptFriend, SetChatMan } from "../actions/userActions";

import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import { Button, Footer } from "../components";

class FriendContacts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataArray: [],
      isAddDialogVisible: false,
      isViewDialogVisible: false,
      selectedMan: '',
      selectedPhone: '',
      requestcontent: '',
    }
  }

  componentDidMount() {
    this.getContactsData()
  }

  getContactsData() {
    let data = this.props.friends.map(fri => {
      if (fri.status == 'added')
        return Object.assign({}, { name: fri.user.name }, { phone: fri.user.phone });
    })
    this.setState({ dataArray: data });
  }

  _renderItem = (item, index, section) => {
    return <TouchableOpacity style={styles.item} onPress={() => this.toChat(item)}>
      <Block row style={{ alignItems: "center" }}>
        <Image source={Images.ItemUser} style={styles.itemUser} />
        <Text style={styles.nickName}>{item.name}</Text>
        <Block style={styles.detailButtonItem} flex>
          <Button onPress={() => this.toDetail(item)} textStyle={{ fontFamily: 'montserrat-regular', fontSize: 18 }} style={{ backgroundColor: 'green', borderRadius: 8, width: 90 }} >Detail</Button>
        </Block>
      </Block>
    </TouchableOpacity>
  }

  toChat(item) {
    this.props.setChatMan(item);
    this.props.navigation.navigate('Chatting');
  }

  toDetail(item) {
    this.props.setUserDetail(item);
    this.props.navigation.navigate('Detail')
  }
  render() {
    return (
      <Block flex style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewFriend')}>
          <Block row style={styles.newFriendRow}>
            <Image
              style={styles.newFriendIcon}
              source={Images.newFriendIcon}
            />
            <Text bold size={20} color="orange" style={{ paddingLeft: 20 }}>New Friends</Text>
          </Block>
        </TouchableOpacity>
        <SectionListContacts
          ref={s => this.sectionList = s}
          sectionListData={this.props.contactFriends()}
          sectionHeight={50}
          initialNumToRender={this.props.contactFriends().length}
          showsVerticalScrollIndicator={false}
          // SectionListClickCallback={(item, index) => {
          //   this.addItem(item)
          // }}
          renderItem={this._renderItem}
          otherAlphabet="#"
        />
        <Footer navigation={this.props.navigation} />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingLeft: 20,
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
  newFriendRow: {
    paddingHorizontal: 26,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: 'orange',
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 26,
    marginVertical: 10
  },
  detailButtonItem: {
    alignItems: 'flex-end',
    marginRight: 10,
    paddingVertical: 10
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    friends: state.friends,
    contactFriends: () => {
      return state.contactFriends.filter(friend => friend.name.search(state.filterKey) >= 0);
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestFriend: (requesterphone, receiverphone, requestcontent, successcb) => RequestFriend(dispatch, requesterphone, receiverphone, requestcontent, successcb),
    acceptFriend: (requesterphone, receiverphone, successcb) => AcceptFriend(dispatch, requesterphone, receiverphone, successcb),
    setUserDetail: (user) => dispatch({
      type: "SET_USERDETAIL",
      payload: user
    }),
    setChatMan: (man) => SetChatMan(dispatch, man),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendContacts);