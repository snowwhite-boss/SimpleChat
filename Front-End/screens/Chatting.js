import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// connect to Redux state
import { connect } from "react-redux";
import { GetMessages, SendMessage } from "../actions/userActions";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { apiConfig } from '../config/config';
const SERVER = "ws://10.10.11.84:8080";

const client = new W3CWebSocket(SERVER);

class Chatting extends React.Component {
  constructor(props) {
    super(props)
    
    // let socket = socketClient(SERVER, {
    //   transports: ['websocket'],
    //   reconnectionAttempts: 15
    // });
    // socket.connect();
    // console.log(socket.connected)
    // socket.on('connection', () => {
    //   console.log("connected");
    // });
    
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
    //this.configureSocket();
  }

  // configureSocket = () => {
  //   const socket = SocketIOClient("http://10.10.11.84:8080");
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  //   console.log(socket)
  //   socket.connect();
  //   socket.on('message', message => {
  //     this.props.getMessages(
  //       this.props.currentUser.phone,
  //       this.props.chatMan.phone
  //     );
  //     console.log("message => ", message)
  //   });
  //   socket = socket;
  //   socket.emit('send-message', "newMessage");
  //  }

  // helper method that is sends a message
  handleSend(newMessage = []) {
    // let setMessages = GiftedChat.append(this.state.messages, newMessage);
    // this.socket.emit('send-message', newMessage);
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
    sendMessage: (sender, receiver, newMessage) => SendMessage(dispatch, sender, receiver, newMessage),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chatting);