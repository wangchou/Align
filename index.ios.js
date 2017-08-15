import React, { Component } from 'react';
import OnigiriNote from './app';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {AsyncStorage} from 'react-native';
import {
  AppRegistry,
} from 'react-native';

const createOnigiriNoteStore = applyMiddleware(thunk)(createStore);
const store = /*autoRehydrate()*/(createOnigiriNoteStore)(reducers);
// persistStore(store, {storage: AsyncStorage});

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <OnigiriNote />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('OnigiriNote', () => Root);
