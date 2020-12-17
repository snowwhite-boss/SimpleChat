import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// connect to Redux state
import { connect } from "react-redux";

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
          text: 'Henlo!',
          createdAt: new Date().getTime(),
          user: {
            _id: 3,
            name: '333'
          }
        }
      ],
    }
  }


  // helper method that is sends a message
  handleSend(newMessage = []) {
    let setMessages = GiftedChat.append(this.state.messages, newMessage);
    this.setState({ messages: setMessages });
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
        messages={this.state.messages}
        onSend={newMessage => this.handleSend(newMessage)}
        user={{ _id: 1 }}
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
    chatMan: state.chatMan,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    acceptFriend: (requesterphone, receiverphone, successcb) => AcceptFriend(dispatch, requesterphone, receiverphone, successcb),
    setChatMan: (man) => SetChatMan(dispatch, man),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chatting);