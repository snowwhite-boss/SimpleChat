import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
// connect to Redux state
import { connect } from "react-redux";
// import Contacts from 'react-native-contacts';
// import AddressBook from 'react-native-addressbook'
import { Block, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import { Button, Footer } from "../components";

const ContactsItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Block row style={{ alignItems: "center" }}>
      <Image source={Images.ItemUser} style={styles.itemUser} />
      <Block style={styles.itemDetail}>
        <Text style={styles.nickName}>{item.user.name}</Text>
        <Text style={styles.request}>{item.requestcontent}</Text>
      </Block>
      <Block style={styles.flex_end} flex>
        <Text style={styles.status}>{item.status}</Text>
      </Block>
    </Block>
  </TouchableOpacity>
);

const renderContactsItem = ({ item }) => {
  if (item.status != 'added') return null;
  return (
    <ContactsItem
      item={item}
      onPress={() => alert(item.id)}
    />
  );
};

class NewFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // AddressBook.getContacts( (err, contacts) => {
    //   if(err && err.type === 'permissionDenied'){
    //     console.log(err)
    //   }
    //   else{
    //     console.log(contacts)
    //   }
    // })
    //////////////////////////////////////////////
    // if(Platform.OS === 'ios'){
    //   Contacts.getAll((err, contacts) => {
    //     if (err) {
    //       throw err;
    //     }
    //     // contacts returned
    //     console.log("contacts => ", contacts);
    //   })
    // }else if(Platform.OS === 'android'){
    //   PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //     {
    //       title: 'Contacts',
    //       message: 'This app would like to view your contacts.'
    //     }
    //   ).then(() => {
    //     Contacts.getAll((err, contacts) => {
    //       if (err === 'denied'){
    //         // error
    //       } else {
    //         // contacts returned in Array
    //         console.log("contacts => ", contacts);
    //       }
    //     })
    //   })
    // }
  }
  render() {
    return (
      <Block flex style={styles.scene}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Mobile')}>
          <Block style={styles.newFriendRow}>
            <Image
              style={styles.addPhone}
              source={Images.addPhone}
            />
            <Text size={20} color="gray" style={{ paddingLeft: 20 }}>Mobile Contacts</Text>
          </Block>
        </TouchableOpacity>
        {/* <ScrollView style={styles.container}> */}
        <FlatList
          style={styles.container}
          data={this.props.friends}
          renderItem={renderContactsItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* </ScrollView> */}

      </Block>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#EEEEEE'
  },
  container: {
    width: width,
    marginVertical: 20,
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
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  itemUser: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    marginRight: 10
  },
  nickName: {
    fontSize: 24,
    color: 'black'
  },
  request: {
    marginTop: 5,
    fontSize: 15,
    color: 'grey'
  },
  status: {
    fontSize: 18,
    color: 'grey',
    paddingRight: 10
  },
  flex_end: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  itemContent: {
    fontSize: 18,
    color: 'grey'
  },
  addPhone: {
    width: 40,
    height: 40,
    resizeMode: 'stretch'
  },
  newFriendRow: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: "white",
  },
  itemDetail: {
    paddingStart: 15
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(NewFriend);