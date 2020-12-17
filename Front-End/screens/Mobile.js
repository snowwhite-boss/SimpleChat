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
  Alert
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import SectionListContacts from 'react-native-sectionlist-contacts'
const { height, width } = Dimensions.get("screen");
import * as Contacts from 'expo-contacts';
// connect to Redux state
import { connect } from "react-redux";
import { RequestFriend } from "../actions/userActions";

import DialogInput from 'react-native-dialog-input';

import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import { Button, Footer } from "../components";

class Moblie extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataArray: [],
      isDialogVisible: false,
      selectedMan: '',
      selectedPhone: '',
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
        const waitButton = { backgroundColor: '#cccccc', borderRadius: 8, width: 90 }
        const viewButton = { backgroundColor: 'blue', borderRadius: 8, width: 90 }
        const addedButton = { backgroundColor: '#cccccc', borderRadius: 8, width: 90 }
        data = data.map(el => {
          let ret = this.props.friends.find(fri => fri.user.phone == el.phoneNumbers[0].number);
          if (ret) {
            return Object.assign({}, el, { status: ret.status }, {style: waitButton})
          }
          return Object.assign({}, el, { status: 'Add' }, {style: addButton})
        })
        this.setState({ dataArray: data });
      }
    }
  }

  async addItem(name, phone) {
    await this.setState({ selectedMan: name })
    await this.setState({ selectedPhone: phone })
    await this.setState({ isDialogVisible: true })

  }
  _renderItem = (item, index, section) => {
    return <TouchableOpacity style={styles.item}>
      <Block row style={{ alignItems: "center" }}>
        <Image source={Images.ItemUser} style={styles.itemUser} />
        <Text style={styles.nickName}>{item.name}</Text>
        <Block style={styles.addButtonItem} flex>
          <Button onPress={() => this.addItem(item.name, item.phoneNumbers[0].number)} textStyle={{ fontFamily: 'montserrat-regular', fontSize: 18 }} style={item.style}>{item.status}</Button>
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
    this.setState({ isDialogVisible: false })
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
          SectionListClickCallback={(item, index) => {
            this.addItem(item)
          }}
          renderItem={this._renderItem}
          otherAlphabet="#"
        />
        <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={this.state.selectedMan}
          message={"Send Friend Request"}
          hintInput={"Hi, I am your friend."}
          submitInput={(requestText) => { this.sendRequest(requestText) }}
          closeDialog={() => { this.setState({ isDialogVisible: false }) }}>
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Moblie);