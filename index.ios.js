import OnigiriNote from './src/app';
import reducers from './src/reducers';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage, View } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppRegistry } from 'react-native';

const storeVersion = '2018/1/8 14:15';
const store = compose(autoRehydrate())(createStore)(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)

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
