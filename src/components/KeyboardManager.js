import { Component } from 'react'
import { Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {
  setKeyboardHeight,
  setIsKeyboardShow,
  setFocusedBookId,
  setFocusedPageId,
} from '../actions'
import { floatEditBarHeight } from './FloatEditBar'

@connect(null, {
  setKeyboardHeight,
  setIsKeyboardShow,
  setFocusedBookId,
  setFocusedPageId,
})
export default class KeyboardManager extends Component {
  componentDidMount() {
    this.props.setIsKeyboardShow(false)

    this.keyboardDidShowListerner = Keyboard.addListener('keyboardDidShow', (event) => {
      this.props.setKeyboardHeight(event.endCoordinates.height + floatEditBarHeight)
      this.props.setIsKeyboardShow(true)
    })

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      this.props.setIsKeyboardShow(false)
      this.props.setFocusedBookId(null)
      this.props.setFocusedPageId(null)
    })
  }

  componentWillUnmount() {
    this.keyboardWillHideListener.remove()
    this.keyboardDidShowListener.remove()
  }

  render() {
    return null
  }
}
