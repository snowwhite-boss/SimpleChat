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
          <ImageBackground
            source={Images.Onboarding}
            style={{ flex: 1,
              resizeMode: "cover",
              justifyContent: "center" }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              {/* <Block middle>
                <Image source={Images.NowLogo} style={{ width: 115, height: 124, bottom: 200, position: 'absolute' }} />
              </Block> */}
              <Block middle>
                <Text
                  style={{
                    fontFamily: 'montserrat-regular', bottom: 100, position: 'absolute', letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center'
                  }}
                  bold
                  color="white"
                  size={44}
                >
                  One Chat
                  </Text>
              </Block>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
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
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
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
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
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
                  onPress={() => navigation.navigate('App')}
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
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
