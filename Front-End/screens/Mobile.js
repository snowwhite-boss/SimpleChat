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
import { AddFriend } from "../actions/userActions";

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
      selectedMan: ''
    }
  }
  async componentDidMount() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      var { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.ID, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        data = data.map(el => {
          if (this.props.currentUser.friends.find(fri => fri == el.name) > 0)
            return Object.assign({}, el, { added: true })
          return el
        })
        this.setState({ dataArray: data });
      }
    }
  }

  async addItem(name) {
    await this.setState({ selectedMan: name })
    await this.setState({ isDialogVisible: true })

  }
  _renderItem = (item, index, section) => {
    // console.log('---custom-renderItem--', item, index, section)
    return <TouchableOpacity style={styles.item}>
      <Block row style={{ alignItems: "center" }}>
        <Image source={Images.ItemUser} style={styles.itemUser} />
        <Text style={styles.nickName}>{item.name}</Text>
        <Block style={styles.addButtonItem} flex>
          {item.added ?
            <Button onPress={() => this.addItem(item.name)} textStyle={{ fontFamily: 'montserrat-regular', fontSize: 18 }} style={styles.addedButton}>Added</Button>
            :
            <Button onPress={() => this.addItem(item.name)} textStyle={{ fontFamily: 'montserrat-regular', fontSize: 18 }} style={styles.addButton}>Add</Button>
          }
        </Block>
      </Block>
    </TouchableOpacity>
  }

  sendRequest(requestText) {
    // this.props.addFriend(name);
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
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    width: 90
  },
  addedButton: {
    backgroundColor: 'grey',
    borderRadius: 8,
    width: 90,
    color: 'red'
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFriend: (name) => AddFriend(dispatch, name),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Moblie);