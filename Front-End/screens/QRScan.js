import React from "react";
import {
  StyleSheet, TouchableOpacity, Image, Alert
} from "react-native";
import { Block, Text, Button } from "galio-framework";
// connect to Redux state
import { connect } from "react-redux";
import { RequestFriend } from "../actions/userActions";

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Images from "../constants/Images";
const styles = StyleSheet.create({
ScanIcon: {
  width: 50,
  height: 50,
  resizeMode: 'stretch',
  backgroundColor:'white',
  borderRadius:20
},
touchButton:{
  position:'absolute',
  left:50,
  bottom:100,
  zIndex:5
}
});
class QRScan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      name:'',
      phone:''
    };
  }

  async componentDidMount() {
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
    let vCardData = data.split("\n");
    let name, phone;
    for(let i = 0; i<vCardData.length; i++){
      if(vCardData[i].split(":")[0] == 'N')
        {
          name = vCardData[i].split(":")[1];
          this.setState({name:vCardData[i].split(":")[1]});
        }
      if(vCardData[i].split(":")[0] == 'TEL')
          {
            phone = vCardData[i].split(":")[1];
            this.setState({phone:vCardData[i].split(":")[1]});
          }
    }
    this.setState({
      scanned: true
    });
    Alert.alert(
      name,
      phone,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Add", onPress: () => this.addNewFriend() }
      ],
      { cancelable: false }
    );
  };

  addNewFriend(){
    this.props.requestFriend(
      this.props.currentUser.phone,
      this.state.phone,
      "",
      null
    );
  }
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
          <TouchableOpacity onPress={() => this.setState({ scanned: false })} style={styles.touchButton}>
          <Image source={Images.QRscanIcon} style={styles.ScanIcon} />
        </TouchableOpacity>
        )
      }
       </Block>
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
    requestFriend: (requesterphone, receiverphone, requestcontent, successcb) => RequestFriend(dispatch, requesterphone, receiverphone, requestcontent, successcb),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QRScan);