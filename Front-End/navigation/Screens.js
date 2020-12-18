import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// connect to Redux state
import { connect } from "react-redux";
// screens
import Home from '../screens/Home';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Components from '../screens/Components';
import Articles from '../screens/Articles';
import Onboarding from '../screens/Onboarding';
import SettingsScreen from '../screens/Settings';
import Contacts from '../screens/Contacts';
import NewFriend from '../screens/NewFriend';
import Mobile from '../screens/Mobile';
import AddContacts from '../screens/AddContacts';
import QRScan from '../screens/QRScan';
import MyQR from '../screens/MyQR';
import Chatting from '../screens/Chatting';
import Detail from "../screens/Detail";
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from "../constants";
import { signUp, SetCurrentUser, IsExsitUser, SetFilterText } from "../actions/userActions";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Components" mode="card" headerMode="screen">
      <Stack.Screen name="Components" component={Components} options={{
        header: ({ navigation, scene }) => (<Header title="Components" navigation={navigation} scene={scene} />),
        backgroundColor: "#FFFFFF"
      }} />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
      <Stack.Screen name="Articles" component={Articles} options={{
        header: ({ navigation, scene }) => (<Header title="Articles" navigation={navigation} scene={scene} />),
        backgroundColor: '#FFFFFF'
      }} />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="Account" mode="card" headerMode="screen">
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Create Account"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  const filterVal = (filterText) =>{
    this.props.setFilterText(filterText);
  }
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
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
        component={NewFriend}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="New Friends"
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
        name="Mobile"
        component={Mobile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Mobile Contacts"
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

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Components" component={ComponentsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={AccountStack} />
    </Drawer.Navigator>
  );
}

class OnboardingStack extends React.Component {
  // getting user information
  componentDidMount() {
    if (this.props.user)
      this.props.signUp(this.props.user.name, this.props.user.phone, null, null)
  }
  render() {
    return (
      <Stack.Navigator mode="card" headerMode="none">
        {this.props.isFirst ?
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            option={{
              headerTransparent: true
            }}
          />
          : null}
        <Stack.Screen name="Home" component={HomeStack} />
      </Stack.Navigator>
    );
  }
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
  null,
  mapDispatchToProps
)(OnboardingStack);