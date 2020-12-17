import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// connect to Redux state
import { connect } from "react-redux";
import { GetMessages, SendMessage } from "../actions/userActions";

class Chatting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [
        {
          _id: 1,
          text: 'Henlo!',
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: '222'
          }
        },
        {
          _id: 3,
          text: 'Henlo!',
          createdAt: new Date().getTime(),
          user: {
            _id: 1,
            name: '111'
          }
        },
        {
          _id: 2,
          text: 'Henlo!2',
          createdAt: new Date().getTime(),
          user: {
            _id: 3,
            name: '333'
          }
        }
      ],
    }
  }

  componentDidMount() {
    this.props.getMessages(
      this.props.currentUser.phone,
      this.props.chatMan.phone
    );
  }
  // helper method that is sends a message
  handleSend(newMessage = []) {
    // let setMessages = GiftedChat.append(this.state.messages, newMessage);
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