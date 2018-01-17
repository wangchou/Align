import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import { AppRegistry } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import iCloudStorage from 'react-native-icloudstore';

import OnigiriNote from './src/app';
import reducers from './src/reducers';
import array from './src/utils/arrayMiddleware';

const config = {
  storage: iCloudStorage,
  key: 'primary',
  keyPrefix: '2018/1/17 19:00',
  blacklist: ['ui'],
};

const store = createStore(
  persistCombineReducers(config, reducers),
  undefined,
  composeWithDevTools(applyMiddleware(thunk, array)),
);

export default class Root extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, null, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
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
