import { Component } from 'react'
import { Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {
  setKeyboardHeight,
  setIsKeyboardShow,
  setFocusedBookId,
  setFocusedPageId,
  setIsRecentTodoShow,
} from 'actions'
import { floatEditBarHeight } from 'components/FloatEditBar'

@connect(null, {
  setKeyboardHeight,
  setIsKeyboardShow,
  setFocusedBookId,
  setFocusedPageId,
  setIsRecentTodoShow,
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
      this.props.setIsRecentTodoShow(false)
      this.props.setFocusedBookId(null)
      this.props.setFocusedPageId(null)
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
