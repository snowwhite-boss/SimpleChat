import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
// connect to Redux state
import { connect } from "react-redux";

// import SmsRetrieverModule from 'react-native-sms-retriever';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import { Input, Icon } from '../components';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");
// import * as SMS from 'expo-sms';

import { signUp, SetCurrentUser, IsExsitUser } from "../actions/userActions";
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
    };
  }

  // getting phone number
  getPhoneNumber() {
    // try {
    //   const phoneNumber = await SmsRetrieverModule.requestPhoneNumber();
    //   console.log('phoneNumber =====> ', phoneNumber)
    // } catch (error) {
    //   console.log(JSON.stringify(error));
    // }
    return "+0123456789";
  }

  // getting user information
  componentDidMount() {
    // let phoneNumber = this.getPhoneNumber();
    // this.props.isExsitUser(phoneNumber)
    //   .then(async res => {
    //     this.props.setCurrentUser(res.data)
    //     if(res.data)
    //       this.props.navigation.navigate('Home');
    //   })
    //   .catch(error => console.log("login error => ", error));

    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists me (id integer primary key not null, name text);',
        [],
        () => {
          tx.executeSql(
            `select * from me;`, [],
            (_, { rows: { _array } }) => {
              if (_array.length != 0) {
                this.props.navigation.navigate('Home');
              }
            }
          );
        },
        (a, b) => console.log(a, b)
      );

    });
  }

  getRandomArbitrary = () => {
    const { min, max } = this.state;
    return Math.floor(Math.random() * (max - min) + min);
  }
  async SignUp() {
    if(phoneNumber == '' || name == '') return;
    const { checkverificationcode, verificationcode, name, phoneNumber } = this.state;
    if (checkverificationcode == '') {
      this.setState({ checkverificationcode: this.getRandomArbitrary().toString() });
      // const isAvailable = await SMS.isAvailableAsync();
      // if (isAvailable) {
      //   console.log('you can send message');
      // } else {
      //   console.log('you can\'t send message');
      // }
      console.log('signin', checkverificationcode);
      return;
    }
    if (checkverificationcode == /*verificationcode*/checkverificationcode) {
      this.setState({ checkverificationcode: '' });
      this.props.signUp(name, phoneNumber, () => {
        db.transaction(tx => {
          tx.executeSql(
            `insert into me (id, name) values (1, '${name}');`, [],
            () => {
              this.props.navigation.navigate('Home');
            },
            () => {
              console.log('error');
            }
          );
        });
      },
      () => console.log("signup error")
      );
      return;
    }
    else {
      console.log('different', checkverificationcode);
      return;
    }
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
              <Block >
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
              </Block>

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
                  color={nowTheme.COLORS.PRIMARY}
                  // onPress={() => navigation.navigate('Home')}
                  onPress={() => this.SignUp()}
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
    signUp: (name, phoneNumber, successcb, errorcb) => signUp(dispatch, name, phoneNumber, successcb, errorcb),
    setCurrentUser: (phoneNumber) => SetCurrentUser(dispatch, phoneNumber),
    isExsitUser: (phoneNumber) => IsExsitUser(phoneNumber),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding);
