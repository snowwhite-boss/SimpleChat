import React from "react";
import {
  Image,
  StyleSheet,
} from "react-native";
import { Block, theme } from "galio-framework";

import Images from "../constants/Images";

export default class MyQR extends React.Component {
  render() {
    return (
      <Block flex style={styles.container}>
        <Block style={styles.card}>
        <Image source={Images.QR} style={styles.tip} />
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'grey'
  },
  tip: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
    margin:theme.SIZES.BASE*3,
  },
  card:{
    borderRadius:10,
    backgroundColor:'white',
  }
  
});