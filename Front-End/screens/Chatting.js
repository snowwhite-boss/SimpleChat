import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// connect to Redux state
import { connect } from "react-redux";
import { GetMessages, SendMessage } from "../actions/userActions";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const SERVER = "ws://10.10.11.84:8080";

class Chatting extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.client = new W3CWebSocket(SERVER, this.props.currentUser.phone);
    this.props.getMessages(
      this.props.currentUser.phone,
      this.props.chatMan.phone
    );
    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    this.client.onmessage = (message) => {
      this.props.addMessage(JSON.parse(message.data));
    };
  }

  // helper method that is sends a message
  handleSend(newMessage = []) {
    this.props.sendMessage(
      this.props.currentUser.phone,
      this.props.chatMan.phone,
      newMessage,
      this.client
    )
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
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
    sendMessage: (sender, receiver, newMessage, client) => SendMessage(dispatch, sender, receiver, newMessage, client),
    addMessage: (data) => {
      dispatch({
        type: "APPEND_MESSAGE",
        payload: data
    })
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chatting);