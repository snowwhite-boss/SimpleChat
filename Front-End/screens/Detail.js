import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Block, Text } from "galio-framework";
const { width } = Dimensions.get("screen");
import { connect } from "react-redux";
import Images from "../constants/Images";
import MkSwitch from "../components/Switch";
import { DeleteChatHistory, UpdateNotification, GetNotification } from "../actions/userActions";

class Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notification: {
        isSticky: false,
        isNotify: true,
      },
    }
  }

  componentDidMount() {
    let myphone = this.props.currentUser.phone;
    let otherphone = this.props.user.phone;
    GetNotification(otherphone, myphone).then(({ data }) => {
      this.setState({ notification: data });
    }).catch(() => {
      Alert.alert(
        "Error",
        "Can't get information.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    })
  }

  changeNotify = (val) => {
    this.updateNotification(!val, this.state.notification.isSticky);
  }

  changeSticky = (val) => {
    this.updateNotification(this.state.notification.isNotify, val);
  }

  updateNotification = (isNotify, isSticky) => {
    let receiver = this.props.currentUser.phone;
    let sender = this.props.user.phone;
    this.setState({
      notification: {
        isNotify, isSticky
      }
    });
    UpdateNotification(sender, receiver, isNotify, isSticky).then(() => {
      this.props.changeNotifications({ sender, receiver, isNotify, isSticky });
    }).catch((err) => {
      console.log(err);
      Alert.alert(
        "Error",
        "Can't update information.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    })
  }

  deleteHistory = () => {
    //let res = confirm("Delete the whole chat history.");
    Alert.alert(
      "Delete the chat history.",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete", onPress: () => {
            let myphone = this.props.currentUser.phone;
            let otherphone = this.props.user.phone;
            DeleteChatHistory(myphone, otherphone);
          }
        }
      ],
      { cancelable: true }
    );
  }

  render() {
    return (
      <Block flex style={styles.container}>
        <Block style={styles.userinfo} row>
          <Image source={Images.ItemUser} style={styles.itemUser} />
          <Text style={styles.nickName}>{this.props.user.name}</Text>
        </Block>
        <Block style={styles.notificationArea}>
          <Block row style={styles.notificationItem}>
            <Text style={styles.itemText}>Mute Notifications</Text>
            <Block style={styles.flex_end} flex>
              <MkSwitch value={!this.state.notification.isNotify} onValueChange={this.changeNotify} />
            </Block>
          </Block>
          <Block row style={styles.notificationItem}>
            <Text style={styles.itemText}>Sticky on Top</Text>
            <Block style={styles.flex_end} flex>
              <MkSwitch value={this.state.notification.isSticky} onValueChange={this.changeSticky} />
            </Block>
          </Block>
        </Block>
        <Block style={styles.notificationArea} />
        <Block style={styles.notificationArea}>
          <TouchableOpacity onPress={this.deleteHistory} >
            <Block row style={styles.notificationItem}>
              <Text style={styles.itemText}>Clear Chat History</Text>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#EEE'
  },
  userinfo: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "white"
  },
  itemUser: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    marginRight: 10
  },
  nickName: {
    fontSize: 24,
    color: 'black',
    paddingLeft: 20,
  },
  notificationArea: {
    marginTop: 80,
    backgroundColor: "white"
  },
  notificationItem: {
    borderColor: "#EEE",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 18
  },
  itemText: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 20,
  },
  flex_end: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
});

function mapStateToProps(state) {
  return {
    user: state.userDetail,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNotifications: (data) => dispatch({ type: "UPDATE_NOTIFICATION", payload: data }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);