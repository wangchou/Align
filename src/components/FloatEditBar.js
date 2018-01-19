import React, { Component } from 'react'
import {
  Keyboard,
  Dimensions,
  TouchableHighlight,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

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
      button: {
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
        fontSize: 20,
        color: 'rgba(125, 125, 125, 1)',
      },
    }

    return (
    <TouchableHighlight
      style={styles.button}
      onPress={Keyboard.dismiss}
    >
      <Text style={styles.text}>完了</Text>
    </TouchableHighlight>
    )
  }
}

