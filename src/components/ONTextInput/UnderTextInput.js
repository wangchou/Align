import React, { Component } from 'react'
import {
  TextInput,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import {
  setData,
  setSelection,
} from '../../actions'
import {
  SMALL_SPACE,
  titleHeight,
} from '../../constants'
import {
  isCheckbox,
  getTextChilds,
} from './utilities'
import { getStyles } from './styles'
import { windowHeight } from '../../utils/misc'

@connect((state, props) => ({
  text: state.pages[props.pageId] || '',
  keyboardHeight: state.ui.keyboardHeight,
  focusedBookId: state.ui.focusedBookId,
  focusedPageId: state.ui.focusedPageId,
  scrollY: state.ui.scrollY,
  scrollTo: state.ui.scrollTo,
  fontScale: state.setting.fontScale,
  numberOfLines: state.setting.numberOfLines[props.bookId],
}), {
  setData,
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
      isFocused: false,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      text: props.text,
      isFocused: (this.props.bookId === props.focusedBookId &&
                  this.props.pageId === props.focusedPageId),
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isFocused && !this.state.isFocused) {
      this.textInput.focus()
    }
    return (
      this.props.pageId !== nextProps.pageId ||
      (nextState.internalText !== nextState.text) ||
      this.props.fontScale !== nextProps.fontScale ||
      this.props.numberOfLines !== nextProps.numberOfLines
    )
  }

  // Event Handlers
  onChangeText = (text) => {
    text = text.replace(/\u2006/g, ' ') // migrate from older version

    this.setState({
      internalText: text,
      text,
    })
    let newText = ''
    for (let i = 0; i < text.length; i += 1) {
      // using one backspace to delete two characters ('checkbox_character' + ' ')
      if (!isCheckbox(text[i]) || !(i + 1 === text.length || text[i + 1] !== SMALL_SPACE)) {
        newText += text[i]
      }
    }
    this.props.setData(this.props.pageId, newText)
  }

  onFocus = () => {
    // update the redux
    if (this.props.bookId === this.props.focusedBookId &&
       this.props.pageId === this.props.focusedPageId) {
      this.props.focus()
    }

    this.scrollTextInputIntoView()
  }

  onSelectionChange = (event) => {
    this.props.setSelection(this.props.pageId, event.nativeEvent.selection)
  }

  scrollTextInputIntoView = () => {
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

  render() {
    const { text } = this.state
    const { fontScale, numberOfLines } = this.props
    const styles = getStyles( fontScale, numberOfLines )
    return (
      <TextInput
        style={styles.underTextInput}
        ref={(textInput) => { this.textInput = textInput }}
        onChangeText={this.onChangeText}
        onFocus={this.onFocus}
        onSelectionChange={this.onSelectionChange}
        multiline
      >
        {
          getTextChilds(text).map((subText, i) => (
            isCheckbox(subText) ?
              <Text key={text + i} style={styles.transparentCheckbox}>{subText}</Text> :
              <Text key={text + i} style={styles.transparentText}>{subText}</Text>
          ))
        }
      </TextInput>
    )
  }
}

