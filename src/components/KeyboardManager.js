import { Component } from 'react'
import { Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {
  setKeyboardHeight,
  setIsKeyboardShow,
} from '../actions'
import {floatEditBarHeight} from './FloatEditBar'

@connect(null, {
  setKeyboardHeight,
  setIsKeyboardShow,
})
export default class KeyboardManager extends Component {
  componentDidMount() {
    this.props.setIsKeyboardShow(false)

    this.keyboardWillShowListerner = Keyboard.addListener('keyboardWillShow', (event) => {
      this.props.setKeyboardHeight(event.endCoordinates.height + floatEditBarHeight)
      this.props.setIsKeyboardShow(true)
    })

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      this.props.setIsKeyboardShow(false)
    })
  }

  componentWillUnmount() {
    this.keyboardWillHideListener.remove()
    this.keyboardWillShowListener.remove()
  }

  render() {
    return null
  }
}
