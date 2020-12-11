import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import { Input, Icon } from '../components';
import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'

export default class Onboarding extends React.Component {
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
                  onPress={() => navigation.navigate('Home')}
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
    flex:1,
    justifyContent:'center',
  },
  button: {
    height: theme.SIZES.BASE * 3,
    width: width - theme.SIZES.BASE * 12,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius:20
  },
});
