import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { connect } from "react-redux";
import { GetMessages, SendMessage } from "../actions/userActions";
import { w3cwebsocket as W3CWebSocket, connection } from "websocket";

const SERVER = "ws://10.10.11.84:8080";
const client = new W3CWebSocket(SERVER, '[ws]');

class Chatting extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    console.log("chatting close");
    client.close();
  }

  componentDidMount() {
    this.props.getMessages(
      this.props.currentUser.phone,
      this.props.chatMan.phone
    );
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
    };
    client.send("asdasdfasdadsf");
  }
  // helper method that is sends a message
  handleSend(newMessage = []) {
    this.props.sendMessage(
      this.props.currentUser.phone,
      this.props.chatMan.phone,
      newMessage
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6690ee'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.props.messages}
        onSend={newMessage => this.handleSend(newMessage)}
        user={{ _id: this.props.currentUser.phone }}
        renderBubble={this.renderBubble}
        placeholder='Type your message here...'
        showUserAvatar
        alwaysShowSend
        scrollToBottom
        renderLoading={this.renderLoading}
      />
    );
  }
}
const styles = StyleSheet.create({
  // rest remains same
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    chatMan: state.chatMan,
    messages: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMessages: (sender, receiver) => GetMessages(dispatch, sender, receiver),
    sendMessage: (sender, receiver, newMessage) => SendMessage(dispatch, sender, receiver, newMessage),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chatting);