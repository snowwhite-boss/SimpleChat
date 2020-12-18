import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
// connect to Redux state
import { connect } from "react-redux";
// screens
import Home from '../screens/Home';
import Contacts from '../screens/Contacts';
import NewFriend from '../screens/NewFriend';
import Mobile from '../screens/Mobile';
import AddContacts from '../screens/AddContacts';
import QRScan from '../screens/QRScan';
import MyQR from '../screens/MyQR';
import Chatting from '../screens/Chatting';
import Detail from "../screens/Detail";
import Onboarding from "../screens/Onboarding";
// header for screens
import { Header } from '../components';
import { signUp, SetCurrentUser, IsExsitUser, SetFilterText } from "../actions/userActions";
import { apiConfig } from "../config/config";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Stack = createStackNavigator();

function HomeStack(props) {
  const filterVal = (filterText) => {
    props.setFilterText(filterText);
  }
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        client={props.client}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              onChange={filterVal}
              navigation={navigation}
              scene={scene}
              none  // back button none
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />

      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Contacts"
              search
              onChange={filterVal}
              navigation={navigation}
              scene={scene}
              none  // back button none
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />

      <Stack.Screen
        name="NewFriend"
        client={props.client}
        component={NewFriend}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="New Friends"
              search
              navigation={navigation}
              onChange={filterVal}
              scene={scene}
              back
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />

      <Stack.Screen
        name="Mobile"
        component={Mobile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Mobile Contacts"
              search
              navigation={navigation}
              onChange={filterVal}
              scene={scene}
              back
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />

      <Stack.Screen
        name="AddContacts"
        component={AddContacts}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Add Contacts"
              search
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />

      <Stack.Screen
        name="QRScan"
        component={QRScan}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="QR Scaning"
              navigation={navigation}
              scene={scene}
              none
            />
          ),
          headerTransparent: true,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />

      <Stack.Screen
        name="MyQR"
        component={MyQR}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="My QR Code"
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />

      <Stack.Screen
        name="Chatting"
        component={Chatting}
        client={props.client}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Chatting"
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Details"
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />


    </Stack.Navigator>
  );
}
class OnboardingStack extends React.Component {
  // getting user information
  componentDidMount() {
    if (this.props.user) {
      this.props.signUp(this.props.user.name, this.props.user.phone, null, null)
      if(this.client) this.client.close();
      this.client = new W3CWebSocket(apiConfig.socketUrl, this.props.user.phone);
      this.client.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      this.client.onmessage = (message) => {
        this.handleSocket(message.data);
      };

    }
  }

  componentWillUnmount() {
    if (this.client)
      this.client.close();
  }

  signUp = (name, phoneNumber, successcb, errorcb) => {
    console.log("Screen");
    this.props.signUp(name, phoneNumber, () => {
      console.log("success")
      if (successcb) successcb();
      this.client = new W3CWebSocket(apiConfig.socketUrl, phoneNumber);
      this.client.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      this.client.onmessage = (message) => {
        this.handleSocket(message.data);
      };
    }, errorcb);
  }

  handleSocket = (message) => {
    let messageObject = JSON.parse(message);
    console.log(messageObject);
  }

  render() {
    return (
      <Stack.Navigator mode="card" headerMode="none">
        {this.props.isFirst ?
          <Stack.Screen
            name="Onboarding"
            option={{
              headerTransparent: true
            }}
          >
            {(props) => (
              <Onboarding signUp={this.signUp} {...props} />
            )}
          </Stack.Screen>
          : null}
        <Stack.Screen name="Home" >
          {() => (
            <HomeStack setFilterText={this.props.setFilterText} client={this.client} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (name, phoneNumber, successcb, errorcb) => signUp(dispatch, name, phoneNumber, successcb, errorcb),
    setCurrentUser: (user) => SetCurrentUser(dispatch, user),
    isExsitUser: (phoneNumber) => IsExsitUser(phoneNumber),
    setFilterText: (filterText) => SetFilterText(dispatch, filterText),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingStack);