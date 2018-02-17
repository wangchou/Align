import React, { Component } from 'react'
import {
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'

import I18n from '../i18n'
import {
  DONE_BUTTON,
  EMPTY_CHECKBOX,
  CHECKED_CHECKBOX,
} from '../constants'

export const floatEditBarHeight = 45
const windowWidth = Dimensions.get('window').width

@connect(state => ({
  isKeyboardShow: state.ui.isKeyboardShow,
  keyboardHeight: state.ui.keyboardHeight,
}))
export default class FloatEditBar extends Component {
  render() {
    if (!this.props.isKeyboardShow) return null
    const styles = {
      bar: {
        width: windowWidth,
        height: floatEditBarHeight,

        position: 'absolute',
        bottom: this.props.keyboardHeight - floatEditBarHeight,
        right: 0,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(155, 155, 155, 0.2)',
      },
      text: {
        fontSize: 24,
        color: 'rgba(125, 125, 125, 1)',
      },
    }

    const fontFamily = 'circle-checkbox'

    return (
      <View style={styles.bar}>
        <TouchableOpacity>
          <Text style={{...styles.text, fontFamily, color: 'green'}}>{CHECKED_CHECKBOX}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{...styles.text, fontFamily, color: 'red'}}>{EMPTY_CHECKBOX}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Keyboard.dismiss}>
          <Text style={styles.text} >{I18n.t(DONE_BUTTON)}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

