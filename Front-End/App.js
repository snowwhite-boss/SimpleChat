import React from 'react';
import { Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userReducer from './reducer/userReducer';
const store = createStore(userReducer);

import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
    isFirst:true
  };

  // async componentDidMount() {
  //   Font.loadAsync({
  //     'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
  //     'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
  //   });

  //   this.setState({ fontLoaded: true });
  // }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
        <NavigationContainer>
          <GalioProvider theme={nowTheme}>
            <Block flex>
              <Screens isFirst={this.state.isFirst}/>
            </Block>
          </GalioProvider>
        </NavigationContainer>
        </Provider>
      );
    }
  }

  isFirstCheck = async () => {
    await db.transaction(tx => {
      tx.executeSql(
        'create table if not exists me (id integer primary key not null, name text);',
        [],
        () => {
          tx.executeSql(
            `select * from me;`, [],
            (_, { rows: { _array } }) => {
              if (_array.length == 0) {
                this.setState({ isFirst: true });
              }else{
                this.setState({ isFirst: true });
              }
            }
          );
        },
        (a, b) => console.log(a, b)
      );
    });
  }

  _loadResourcesAsync = async () => {
    await this.isFirstCheck();
    await Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
    });
    
    this.setState({ fontLoaded: true });
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
