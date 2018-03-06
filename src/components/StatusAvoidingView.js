import React, { Component } from 'react'
import {
  View,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'

const windowHeight = Dimensions.get('window').height

@connect(state => ({
  isStatusMode: state.ui.isStatusMode,
  isKeyboardShow: state.ui.isKeyboardShow,
}))
export default class StatusAvoidingView extends Component {
  render() {
    if (!this.props.isStatusMode || this.props.isKeyboardShow) return null

    return <View style={{ height: windowHeight/5 }} />
  }
}

