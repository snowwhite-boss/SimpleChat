import React from 'react';
import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
// connect to Redux state
import { connect } from "react-redux";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");
// import SmsRetrieverModule from 'react-native-sms-retriever';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { Input, Icon } from '../components';

import * as SMS from 'expo-sms';

import { IsExsitUser } from "../actions/userActions";
class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
      verificationcode: '',
      checkverificationcode: '',
      min: 100000,
      max: 999999,
      isDisabled: false,
    };
  }

  sendVerifyCode = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [this.state.phoneNumber],
        this.state.checkverificationcode,
        {
        }
      );
    } else {
      console.log("there's no SMS available on this device");
    }
  }

  getRandomArbitrary = () => {
    const { min, max } = this.state;
    return Math.floor(Math.random() * (max - min) + min);
  }
  SignUp = () => {
    const { checkverificationcode, verificationcode, name, phoneNumber } = this.state;
    if (phoneNumber == '' || name == '') return;
    // if (checkverificationcode == '') {
    //   this.setState({ checkverificationcode: this.getRandomArbitrary().toString() });
    //   this.sendVerifyCode();
    //   console.log('signin', checkverificationcode);
    //   return;
    // }
    // if (checkverificationcode == /*verificationcode*/checkverificationcode) {
    //   this.setState({ checkverificationcode: '' });
    this.setState({ isDisabled: true });
    this.props.signUp(name, phoneNumber, () => {
      this.setState({ isDisabled: false });
      db.transaction(tx => {
        tx.executeSql(
          `insert into me (id, name, phone) values (1, '${name}', '${phoneNumber}');`, [],
          () => {
            console.log('navigate')
            this.props.navigation.navigate('Home');
          },
          () => {
            console.log('insert error');
          }
        );

      });
    },
      () => {
        this.setState({ isDisabled: false });
        console.log("signup error")
      }
    );
    return;
    // }
    // else {
    //   console.log('different', checkverificationcode);
    //   return;
    // }
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <Block space="between" style={styles.padded}>
            <Block center>
              <Block middle>
                <Text
                  style={{
                    fontFamily: 'montserrat-regular', bottom: 100, position: 'absolute', letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center'
                  }}
                  bold
                  color="black"
                  size={44}
                >
                  One Chat
                  </Text>
              </Block>
              <Block >
                <Input
                  placeholder="Nick Name"
                  shadowless
                  iconContent={
                    <Icon
                      size={16}
                      style={{ marginRight: 10 }}
                      color={nowTheme.COLORS.ICON}
                      name="single"
                      family="NowExtra"
                    />
                  }
                  value={this.state.name}
                  onChangeText={text => this.setState({ name: text })}
                />
              </Block>
              <Block >
                <Input
                  placeholder="Phone Number"
                  shadowless
                  iconContent={
                    <Icon
                      size={16}
                      style={{ marginRight: 10 }}
                      color={nowTheme.COLORS.ICON}
                      name="mobile2x"
                      family="NowExtra"
                    />
                  }
                  value={this.state.phoneNumber}
                  onChangeText={text => this.setState({ phoneNumber: text })}
                />
              </Block>
              {/* <Block >
                <Input
                  placeholder="SMS Verification Code"
                  shadowless
                  iconContent={
                    <Icon
                      size={16}
                      style={{ marginRight: 10 }}
                      color={nowTheme.COLORS.ICON}
                      name="check-22x"
                      family="NowExtra"
                    />
                  }
                  value={this.state.verificationcode}
                  onChangeText={text => this.setState({ verificationcode: text })}
                />
              </Block> */}

              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2
                }}
              >
                <Button
                  shadowless
                  style={styles.button}
                  color={this.state.isDisabled ? nowTheme.COLORS.SECONDARY : nowTheme.COLORS.PRIMARY}
                  disabled={this.state.isDisabled}
                  onPress={this.SignUp}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    GET STARTED
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE,
  },
  padded: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: theme.SIZES.BASE * 3,
    width: width - theme.SIZES.BASE * 12,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 20
  },
});
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isExsitUser: (phoneNumber) => IsExsitUser(phoneNumber),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding);
