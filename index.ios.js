import React, { Component } from 'react';
import OnigiriNote from './app';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore, compose} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {AsyncStorage, View} from 'react-native';
import {
  AppRegistry,
} from 'react-native';

const storeVersion = 'ようこそ実力至上主義の教室へ 2';
const store = compose(autoRehydrate())(createStore)(reducers)

export default class Root extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(store, {
      storage: AsyncStorage,
      keyPrefix: storeVersion
    }, () => {
      this.setState({ rehydrated: true })
      console.log('restored')
    });
  }

  render() {
    if(!this.state.rehydrated){
      return null;
    }

    return (
      <Provider store={store}>
        <OnigiriNote />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('OnigiriNote', () => Root);
