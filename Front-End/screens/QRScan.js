import React from "react";
import {
  StyleSheet,
} from "react-native";
import { Block, Text, Button } from "galio-framework";


import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QRScan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanned: false,
    };
  }

  async componentDidMount() {
    console.log("didmount")
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const {
      status
    } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };

  handleBarCodeScanned = ({
    type,
    data
  }) => {
    console.log(type, data);
    this.setState({
      scanned: true
    });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const {
      hasCameraPermission,
      scanned
    } = this.state;

    if (hasCameraPermission === null) {
      return <Text> Requesting for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }
    return (<Block style={
      {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }
    } >
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {
        scanned && (
        <Button title={'Tap to Scan Again'}
          onPress={() => this.setState({ scanned: false })}
        />
        )
      }
       </Block>
    );
  }

}
