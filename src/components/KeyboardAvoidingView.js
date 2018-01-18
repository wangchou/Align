import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'

@connect(state => ({
  isKeyboardShow: state.ui.isKeyboardShow,
  keyboardHeight: state.ui.keyboardHeight,
}))
export default class KeyboardAvoidingView extends Component {
  render() {
    if (!this.props.isKeyboardShow) return null

    return <View style={{ height: this.props.keyboardHeight }} />
  }
}

