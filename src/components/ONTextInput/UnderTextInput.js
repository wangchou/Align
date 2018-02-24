import React, { Component } from 'react'
import {
  TextInput,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import {
  setData,
  setFocusedBookId,
  setFocusedPageId,
  setSelection,
} from '../../actions'
import {
  SMALL_SPACE,
} from '../../constants'
import {
  isCheckbox,
  getTextChilds,
} from './TopTextOverlay'
import { styles, windowHeight } from './styles'
import { titleHeight } from '../Page'

@connect((state, props) => ({
  text: state.pages[props.dataKey] || '',
  isTouchMoving: state.ui.isTouchMoving,
  keyboardHeight: state.ui.keyboardHeight,
  scrollY: state.ui.scrollY,
  scrollTo: state.ui.scrollTo,
}), {
  setData,
  setFocusedBookId,
  setFocusedPageId,
  setSelection,
})
export default class UnderTextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text,
      // the real text state within RN TextInput after onChangeText
      // used as a workaround for CJK bug on RNTextInput
      internalText: props.text,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      text: props.text,
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.dataKey !== nextProps.dataKey ||
      (nextState.internalText !== nextState.text)
    )
  }

  // Event Handlers
  onChangeText = (text) => {
    this.setState({
      internalText: text,
      text
    })
    let newText = ''
    for (let i = 0; i < text.length; i += 1) {
      // using one backspace to delete two characters ('checkbox_character' + ' ')
      if (!isCheckbox(text[i]) || !(i + 1 === text.length || text[i + 1] !== SMALL_SPACE)) {
        newText += text[i]
      }
    }
    this.props.setData(this.props.dataKey, newText)
  }

  onFocus = () => {
    this.props.setFocusedBookId(this.props.bookId)
    this.props.setFocusedPageId(this.props.dataKey)

    // scroll input into view
    this.textInput.measure((ox, oy, width, height, px, py) => {
      const focusedInputPY = py - oy
      const focusedInputHeight = height + oy

      const { keyboardHeight } = this.props
      const inputY = this.props.scrollY + focusedInputPY
      const alignInputBottomToKeyboardY =
        inputY + (focusedInputHeight - windowHeight) + keyboardHeight

      const isInputTopNotInView = focusedInputPY < 0
      const isInputBottomNotInView =
        (focusedInputPY + focusedInputHeight + keyboardHeight) > windowHeight
      if (isInputTopNotInView) {
        this.props.scrollTo(inputY - titleHeight)
      } else if (isInputBottomNotInView) {
        this.props.scrollTo(alignInputBottomToKeyboardY)
      }
    })
  }

  onSelectionChange = (event) => {
    this.props.setSelection(this.props.dataKey, event.nativeEvent.selection)
  }

  assignTextInputRef = (textInput) => {
    this.textInput = textInput
    this.props.inputRef(textInput)
  }

  render() {
    const { isTouchMoving } = this.props
    const { text } = this.state

    return (
      <TextInput
        style={styles.underTextInput}
        ref={this.assignTextInputRef}
        onChangeText={this.onChangeText}
        onFocus={this.onFocus}
        onSelectionChange={this.onSelectionChange}
        multiline
      >
        <Text style={styles.text}>
        {
          getTextChilds(text).map((subText, i) => (
            isCheckbox(subText) ?
              <Text key={text+i} style={styles.transparentCheckbox}>{subText}</Text> :
              <Text key={text+i} style={styles.transparentText}>{subText}</Text>
          ))
        }
        </Text>
      </TextInput>
    )
  }
}

