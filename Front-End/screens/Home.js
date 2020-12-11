import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button, Icon } from "../components";
import articles from "../constants/articles";
import nowTheme from '../constants/Theme';
const { width } = Dimensions.get("screen");
import {
  TabView,
  TabBar,
  SceneMap
} from 'react-native-tab-view';

const ChatRoute = () => (
  <Block style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const ContactsRoute = () => (
  <Block style={[styles.scene, { backgroundColor: '#673ab7' }]} />
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
      indicatorStyle={{ backgroundColor: 'pink' }}
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
});