import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView
} from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button, Icon } from "../components";
import { Images } from "../constants";
import articles from "../constants/articles";
import nowTheme from '../constants/Theme';
const { width } = Dimensions.get("screen");
import {
  TabView,
  TabBar,
  SceneMap
} from 'react-native-tab-view';

const chatDATA = [
  {
    id: "0",
    name: "Zen",
    content: "Hi, I am Zen."
  },
  {
    id: "1",
    name: "Sergey",
    content: "Hi, I am Sergey."
  },
  {
    id: "2",
    name: "Boychik",
    content: "Hi, I am Boychik."
  },
  {
    id: "3",
    name: "Adalbert",
    content: "Hi, I am Adalbert."
  },
  {
    id: "4",
    name: "John",
    content: "Hi, I am John."
  },
  {
    id: "5",
    name: "Marcelino",
    content: "Hi, I am Marcelino."
  },
];
const contactsDATA = [
  {
    id: "0",
    name: "Zen"
  },
  {
    id: "1",
    name: "Sergey"
  },
  {
    id: "2",
    name: "Boychik"
  },
  {
    id: "3",
    name: "Adalbert"
  },
  {
    id: "4",
    name: "John"
  },
  {
    id: "5",
    name: "Marcelino"
  },
];

const ChatItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Block row style={{ alignItems: "center" }}>
      <Image source={Images.ItemUser} style={styles.itemUser} />
      <Block>
        <Text style={styles.nickName}>{item.name}</Text>
        <Text style={styles.itemContent}>{item.content}</Text>
      </Block>
    </Block>
  </TouchableOpacity>
);
const ContactsItem = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Block row style={{ alignItems: "center" }}>
      <Image source={Images.ItemUser} style={styles.itemUser} />
      <Text style={styles.nickName}>{item.name}</Text>
    </Block>
  </TouchableOpacity>
);


const renderChatItem = ({ item }) => {
  return (
    <ChatItem
      item={item}
      onPress={() => alert(item.id)}
    />
  );
};
const renderContactsItem = ({ item }) => {
  return (
    <ContactsItem
      item={item}
      onPress={() => alert(item.id)}
    />
  );
};

const ChatRoute = () => (
  <Block style={styles.scene}>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatDATA}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  </Block>
);

const ContactsRoute = () => (
  <Block style={styles.scene}>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contactsDATA}
        renderItem={renderContactsItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  </Block>
);

const initialLayout = { width: Dimensions.get('window').width };

// export default class TeamReport extends React.Component {
export default function Home() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Chat', title: 'Chat' },
    { key: 'Contacts', title: 'Contacts' },
  ]);

  const renderScene = SceneMap({
    Chat: ChatRoute,
    Contacts: ContactsRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'purple', height:5 }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <Block row middle>
          <Icon
            size={18}
            name={route.title == 'Chat' ? 'chat-round2x' : 'agenda-bookmark2x'}
            family="NowExtra"
            style={{ paddingRight: 8 }}
            color={nowTheme.COLORS.HEADER}
          />
          <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
            {route.title}
          </Text>
        </Block>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      tabBarPosition={'bottom'}
      renderTabBar={renderTabBar}
    />
  );
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {
    width: width,
    padding: 10
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
    marginBottom: 5,
    paddingVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  itemUser: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    marginRight: 10
  },
  nickName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  itemContent: {
    fontSize: 18,
    color: 'grey'
  }
});