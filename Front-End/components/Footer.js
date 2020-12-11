import { Block } from 'galio-framework';
import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// import { connect } from 'react-redux';

import IconButton from './IconButton';
// import { navigateTo } from '../common/routerActions';
import { Images, nowTheme } from "../constants";

const { HomeIcon, TaskIcon, ChatIcon, ContactsIcon, RoundButton } = Images;
const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderColor: '#EFEFF4',
    backgroundColor: 'white',
    opacity: 0.8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    justifyContent: "space-around",
  },
  cell: {
    flexDirection: "row",
    alignItems: 'center',
    width: width / 2,
    justifyContent: 'center'
  },
  cellHigh: {
    borderTopColor: 'pink',
    borderTopWidth: 3,
    flexDirection: "row",
    alignItems: 'center',
    width: width / 2,
    justifyContent: 'center'
  }
});

const Footer = ({ style, navigation, left }) => {

  const imageSize = { height: 20, width: 20 };
  return (
    <Block style={styles.footer}>
        <TouchableOpacity
          style={left ? styles.cellHigh : styles.cell}
          onPress={() => navigation.navigate('Home')}
        >
          <IconButton
            buttonImageStyle={imageSize}
            source={ChatIcon}
          />
          <Text size={20}> Chat </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={left ? styles.cell : styles.cellHigh}
          onPress={() => navigation.navigate('Contacts')}
        >
          <IconButton
            buttonImageStyle={imageSize}
            source={ContactsIcon}
          />
          <Text size={20}> Contacts </Text>
        </TouchableOpacity>
    </Block>

  );
};


export default Footer;
