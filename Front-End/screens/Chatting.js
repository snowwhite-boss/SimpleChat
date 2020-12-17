import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chatting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [
        {
          _id: 0,
          text: 'New room created.',
          createdAt: new Date().getTime(),
          system: true
        },
        // example of chat message
        {
          _id: 1,
          text: 'Henlo!',
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: 'Test User'
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
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#6646ee'
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