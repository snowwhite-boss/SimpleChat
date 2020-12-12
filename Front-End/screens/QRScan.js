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

export default class QRScan extends React.Component {
  render() {
    return (
      <Block flex style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyQR')}>
          <Image source={Images.QRscanIcon} style={styles.tip} />
        </TouchableOpacity>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent:'flex-end'
  },
  tip: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
  },
  
});