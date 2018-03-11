import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'

import Align from 'src/app'
import reducers from 'reducers'
import array from 'utils/arrayMiddleware'

const config = {
  key: 'primary1',
  version: 1,
  storage,
  blacklist: ['ui'],
  stateReconciler: autoMergeLevel2,
}

const store = createStore(
  persistCombineReducers(config, reducers),
  undefined,
  composeWithDevTools(applyMiddleware(thunk, array)),
)

export default class Root extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentDidMount() {
    persistStore(store, null, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if (!this.state.rehydrated) {
      return null
    }

    return (
      <Provider store={store}>
        <Align />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Align', () => Root)
