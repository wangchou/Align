import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import {
  setData,
  setFocusedBookId,
  setFocusedPageId,
  setSelection,
} from '../actions'
import {
  EMPTY_CHECKBOX,
  CHECKED_CHECKBOX,
  SMALL_SPACE,
  checkedCheckboxColor,
  emptyCheckboxColor,
} from '../constants'

const isCheckbox = (ch) => ch === EMPTY_CHECKBOX || ch === CHECKED_CHECKBOX
const toggleCheckbox = (ch) => ch === EMPTY_CHECKBOX ? CHECKED_CHECKBOX : EMPTY_CHECKBOX

class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.state = {text: props.text}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.text !== nextState.text
  }

  toggleCheckbox = () => {
    this.props.onCheckboxToggle(this.props.indexInParentText)
  }

  render() {
    const { indexInParentText } = this.props
    const { text } = this.state

    let props = {
      key: indexInParentText+text,
      style: styles[text],
      onPress: this.toggleCheckbox,
    }
    return (<Text {...props}>{text}</Text>)
  }
}

@connect((state, props) => ({
  text: state.pages[props.dataKey],
  isTouchMoving: state.ui.isTouchMoving,
  isKeyboardShow: state.ui.isKeyboardShow,
  keyboardHeight: state.ui.keyboardHeight,
  scrollY: state.ui.scrollY,
  scrollTo: state.ui.scrollTo,
}), {
  setData,
  setFocusedBookId,
  setFocusedPageId,
  setSelection,
})
export default class Page extends Component {
  constructor(props) {
    super(props)
    this.textInput = null
    this.state = {
      text: props.text,
      isFocused: false,
    }
  }

  // React Life-cycle methods
  componentWillReceiveProps(props) {
    this.setState({
      text: props.text,
      isFocused: this.textInput.isFocused()
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.dataKey !== nextProps.dataKey ||
      this.state.text !== nextState.text ||
      this.state.isEditable !== nextState.isEditable
    )
  }

  // Event Handlers
  onChangeText = (text) => {
    newText = ''
    for(let i = 0; i < text.length; i++) {
      // using one backspace to delete two characters ('checkbox_character' + ' ')
      if(isCheckbox(text[i]) && (i+1 === text.length || text[i+1] !== SMALL_SPACE)) {
        continue
      }
      newText += text[i]
    }
    this.props.setData(this.props.dataKey, newText)
    this.setState({ text: newText })
  }

  onFocus = () => {
    this.props.setFocusedBookId(this.props.bookId)
    this.props.setFocusedPageId(this.props.dataKey)
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
        this.props.scrollTo(inputY)
      } else if (isInputBottomNotInView) {
        this.props.scrollTo(alignInputBottomToKeyboardY)
      }
    })
  }

  onBlur = () => {
    this.props.setFocusedBookId(null)
    this.props.setFocusedPageId(null)
  }

  onSelectionChange = (event) => {
    this.props.setSelection(this.props.dataKey, event.nativeEvent.selection)
  }

  assignTextInputRef = (textInput) => {
    this.textInput = textInput
    this.props.inputRef(textInput)
  }

  onCheckboxToggle = (toggleIndex) => {
    const textChilds = this.getTextChilds(this.state.text)
    const toggledText = textChilds.map(
      (t, i) => (toggleIndex === i ? toggleCheckbox(t) : t)
    ).join('')
    this.onChangeText(toggledText)
  }

  getTextChilds = (text) => {
    text = !text ? '' : text
    return text
      .match(new RegExp(`${EMPTY_CHECKBOX}|${CHECKED_CHECKBOX}|[^${EMPTY_CHECKBOX}${CHECKED_CHECKBOX}]+`, 'g'))
  }

  render() {
    const { title, isTouchMoving } = this.props

    const textChilds = this.getTextChilds(this.state.text)

    const textComponentChilds = textChilds && textChilds.map((subText, i) => {
      if(isCheckbox(subText)) {
        return <Checkbox key={subText+i} text={subText} indexInParentText={i} onCheckboxToggle={this.onCheckboxToggle}/>
      } else {
        return <Text key={subText+i}>{subText}</Text>
      }
    })

    return (
      <View style={styles.pageView}>
        <Text style={styles.pageTitle}>
          {title}
        </Text>
        <View>
          <TextInput
            style={styles.underTextInput}
            ref={this.assignTextInputRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSelectionChange={this.onSelectionChange}
            pointerEvents={isTouchMoving ? 'none':'auto'}
            multiline
            value = {this.state.text}
          />
          <Text
            style={styles.topCustomText}
            pointerEvents={this.state.isFocused ? "box-none" : "auto"}
            onPress={()=>{this.textInput.focus()}}
          >
            {textComponentChilds}
          </Text>
        </View>
      </View>
    )
  }
}

// Component Styles
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const fontSize = 16
const pageHeight = fontSize * 17
const titleHeight = 20
const semiBold = '600'
const light = '300'
const pageSeparatorWidth = 20
const fontFamily = 'PingFang TC'
const styles = StyleSheet.create({
  pageView: {
    width: windowWidth + pageSeparatorWidth,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'rgba(155, 155, 155, 0.3)',
    borderRightWidth: 20,
  },
  pageTitle: {
    height: titleHeight,
    fontFamily,
    fontSize,
    fontWeight: semiBold,
  },
  underTextInput: {
    width: windowWidth - 20,
    height: pageHeight - titleHeight - 15,
    textAlign: 'justify',
    marginTop: 5,
    borderColor: 'rgba(200, 200, 200, 1.0)',
    fontFamily,
    fontSize,
    fontWeight: light,
    color: 'rgba(32, 32, 32, 0)',
    backgroundColor: 'rgba(255, 0, 0, 0)',
  },
  topCustomText: {
    position: 'absolute',
    top: 0,
    width: windowWidth - 20,
    height: pageHeight - titleHeight - 15,
    textAlign: 'justify',
    paddingTop: 5,
    marginTop: 5,
    borderColor: 'rgba(200, 200, 200, 1.0)',
    fontFamily,
    fontSize,
    fontWeight: light,
    color: 'rgba(32, 32, 32, 1.0)',
    backgroundColor: 'rgba(0, 255, 0, 0)',
  },
  [EMPTY_CHECKBOX]: {
    fontFamily: 'circle-checkbox',
    color: emptyCheckboxColor,
  },
  [CHECKED_CHECKBOX]: {
    fontFamily: 'circle-checkbox',
    color: checkedCheckboxColor,
  },
})
