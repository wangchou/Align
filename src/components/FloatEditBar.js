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
  checkedCheckboxColor,
  emptyCheckboxColor,
} from '../constants'
import {
  insertText,
} from '../actions'

export const floatEditBarHeight = 45
const windowWidth = Dimensions.get('window').width

@connect(state => ({
  isKeyboardShow: state.ui.isKeyboardShow,
  keyboardHeight: state.ui.keyboardHeight,
}), {
  insertText,
})
export default class FloatEditBar extends Component {
  render() {
    const {
      isKeyboardShow,
      keyboardHeight,
    } = this.props
    if (!isKeyboardShow) return null
    const styles = {
      bar: {
        width: windowWidth,
        height: floatEditBarHeight,

        position: 'absolute',
        bottom: keyboardHeight - floatEditBarHeight,
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
        <TouchableOpacity onPress={() => this.props.insertText(CHECKED_CHECKBOX)}>
          <Text
            style={{ ...styles.text, fontFamily, color: checkedCheckboxColor }}
          >
            {CHECKED_CHECKBOX}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.insertText(EMPTY_CHECKBOX)}>
          <Text
            style={{ ...styles.text, fontFamily, color: emptyCheckboxColor }}
          >
            {EMPTY_CHECKBOX}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={Keyboard.dismiss}>
          <Text style={styles.text} >{I18n.t(DONE_BUTTON)}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

