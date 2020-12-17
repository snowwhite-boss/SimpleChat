import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import SectionListContacts from 'react-native-sectionlist-contacts'
const { height, width } = Dimensions.get("screen");
import * as Contacts from 'expo-contacts';
// connect to Redux state
import { connect } from "react-redux";
import { RequestFriend, AcceptFriend } from "../actions/userActions";

import DialogInput from 'react-native-dialog-input';

import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import { Button, Footer } from "../components";

class Moblie extends React.Component {
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

  async getContactsData() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      var { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.ID, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const addButton = { backgroundColor: 'green', borderRadius: 8, width: 90 }
        const waitButton = { backgroundColor: '#aaaaaa', borderRadius: 8, width: 90 }
        const viewButton = { backgroundColor: '#0000aa99', borderRadius: 8, width: 90 }
        const addedButton = { backgroundColor: '#cccccc55', borderRadius: 8, width: 90 }
        data = data.map(el => {
          let ret = this.props.friends.find(fri => fri.user.phone == el.phoneNumbers[0].number);
          if (ret) {
            if (ret.status == 'Waiting')
            return Object.assign({}, el, { status: ret.status }, { style: waitButton }, {requestcontent: ret.requestcontent})
            else if (ret.status == 'View')
              return Object.assign({}, el, { status: ret.status }, { style: viewButton }, {requestcontent: ret.requestcontent})
            else  // Added
              return Object.assign({}, el, { status: ret.status }, { style: addedButton }, {requestcontent: ret.requestcontent})
          }
          return Object.assign({}, el, { status: 'Add' }, { style: addButton }, {requestcontent: ''})
        })
        this.setState({ dataArray: data });
      }
    }
  }

  async addItem(status, name, phone, requestcontent) {
    await this.setState({ selectedMan: name })
    await this.setState({ selectedPhone: phone })
    switch (status) {
      case 'Add':
        await this.setState({ isAddDialogVisible: true })
        break;
      // case 'Waiting':
      //   await this.setState({ isDialogVisible: true })
      //   break;
      case 'View':
        await this.setState({ requestcontent: requestcontent })
        await this.setState({ isViewDialogVisible: true })
        break;
      // case 'Added':
      //   await this.setState({ isDialogVisible: true })
      //   break;

      default:
        break;
    }


  }
  _renderItem = (item, index, section) => {
    return <TouchableOpacity style={styles.item}>
      <Block row style={{ alignItems: "center" }}>
        <Image source={Images.ItemUser} style={styles.itemUser} />
        <Text style={styles.nickName}>{item.name}</Text>
        <Block style={styles.addButtonItem} flex>
          <Button onPress={() => this.addItem(item.status, item.name, item.phoneNumbers[0].number, item.requestcontent)} textStyle={{ fontFamily: 'montserrat-regular', fontSize: 18 }} style={item.style} >{item.status}</Button>
        </Block>
      </Block>
    </TouchableOpacity>
  }

  sendRequest(requestText) {
    this.props.requestFriend(
      this.props.currentUser.phone,
      this.state.selectedPhone,
      requestText,
      () => { this.getContactsData() }
    );
    this.setState({ isAddDialogVisible: false })
  };
  sendAccept(acceptText) {
    this.props.acceptFriend(
      this.props.currentUser.phone,
      this.state.selectedPhone,
      () => { this.getContactsData() }
    );
    this.setState({ isViewDialogVisible: false })
  };

  render() {
    return (
      <Block flex style={styles.container}>
        <SectionListContacts
          ref={s => this.sectionList = s}
          sectionListData={this.state.dataArray}
          sectionHeight={50}
          initialNumToRender={this.state.dataArray.length}
          showsVerticalScrollIndicator={false}
          // SectionListClickCallback={(item, index) => {
          //   this.addItem(item)
          // }}
          renderItem={this._renderItem}
          otherAlphabet="#"
        />
        <DialogInput isDialogVisible={this.state.isAddDialogVisible}
          title={this.state.selectedMan}
          message={"Send Friend Request"}
          hintInput={"Hi, I am your friend."}
          submitInput={(requestText) => { this.sendRequest(requestText) }}
          closeDialog={() => { this.setState({ isAddDialogVisible: false }) }}>
        </DialogInput>
        <DialogInput isDialogVisible={this.state.isViewDialogVisible}
          title={this.state.selectedMan}
          message={this.state.requestcontent}
          initValueTextInput={"Accept your request."}
          cancelText={"Cancel"}
          submitText={"Accept"}
          submitInput={(acceptText) => { this.sendAccept(acceptText) }}
          closeDialog={() => { this.setState({ isViewDialogVisible: false }) }}>
        </DialogInput>
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
  addButtonItem: {
    alignItems: 'flex-end',
    marginRight: 10,
    paddingVertical: 10
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    friends: state.friends,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestFriend: (requesterphone, receiverphone, requestcontent, successcb) => RequestFriend(dispatch, requesterphone, receiverphone, requestcontent, successcb),
    acceptFriend: (requesterphone, receiverphone, successcb) => AcceptFriend(dispatch, requesterphone, receiverphone, successcb),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Moblie);