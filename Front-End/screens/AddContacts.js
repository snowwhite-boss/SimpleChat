import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import { Button, Footer } from "../components";

export default class AddContacts extends React.Component {
  render() {
    return (
      <Block flex style={styles.container}>
        <TouchableOpacity>
          <Block row style={styles.item}>
            <Image source={Images.QRscanIcon} style={styles.tip} />
            <Block>
              <Text size={20} bold>Scan QR Code</Text>
              <Text size={16} >Scan a friend's QR code</Text>
            </Block>
            <Block flex style={{ alignItems: 'flex-end' }}>
              <Image
                source={Images.rightArrow}
                style={styles.rightArrow} />
            </Block>
          </Block>
        </TouchableOpacity>
        <Block style={styles.break} />
        <TouchableOpacity>
          <Block row style={styles.item}>
            <Image source={Images.fromAddressIcon} style={styles.tip} />
            <Block>
              <Text size={20} bold>Mobile Contacts</Text>
              <Text size={16} >Add from mobile address book</Text>
            </Block>
            <Block flex style={{ alignItems: 'flex-end' }}>
              <Image
                source={Images.rightArrow}
                style={styles.rightArrow} />
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  tip: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
    marginRight: 20,
    marginVertical: 20
  },
  item: {
    alignItems: 'center'
  },
  break: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    height: 1,
    backgroundColor: 'grey',
    alignItems: 'center'
  },
  rightArrow: {
    width: 25,
    height: 25,
    resizeMode: 'stretch'
  }
});