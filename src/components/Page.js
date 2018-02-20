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
  checkedCheckboxColor,
  emptyCheckboxColor,
} from '../constants'

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
    this.state = {
      text: props.text,
      isEditable: true,
    }
  }

  // React Life-cycle methods
  componentWillReceiveProps(props) {
    this.setState({
      text: props.text,
      isEditable: !this.props.isTouchMoving || (this.textInput && this.textInput.isFocused())
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
    const isCheckbox = (ch) => ch === EMPTY_CHECKBOX || ch === CHECKED_CHECKBOX
    newText = ''
    for(let i = 0; i < text.length; i++) {
      // cjk bug workaround
      // let using one backspace to delete two characters ('checkbox_character' + '\ufffc')
      if(isCheckbox(text[i]) && (i === text.length || text[i+1] !== ' ')) {
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

  onSelectionChange = (event) => {
    this.props.setSelection(this.props.dataKey, event.nativeEvent.selection)
  }

  render() {
    const { title } = this.props

    let { text } = this.state
    text = !text ? '' : text

    // workaround start
    // fix cjk auto-suggestion failed when text is empty string
    // '\ufffc' is 'OBJECT REPLACEMENT CHARACTER' in utf-8 so it will not render
    text = text.replace(new RegExp('\ufffc', 'g'), '')
    text = '\ufffc' + text
    // workaround end
    const textChilds = text
      .match(new RegExp(`${EMPTY_CHECKBOX}|${CHECKED_CHECKBOX}|[^${EMPTY_CHECKBOX}${CHECKED_CHECKBOX}]+`, 'g'))

    const toggledText = (texts, toggleIndex) => texts.map((t, i) => {
      if (toggleIndex !== i) {
        return t
      }
      return t === EMPTY_CHECKBOX ? CHECKED_CHECKBOX : EMPTY_CHECKBOX
    }).join('')


    const textComponentChilds = textChilds && textChilds
      .map((subText, i) => ({
        key: `${i}in${subText}`,
        style: (subText === EMPTY_CHECKBOX) ? styles.emptyCheckbox :
          (subText === CHECKED_CHECKBOX) ? styles.checkedCheckbox :
            null,
        onPress: (subText === EMPTY_CHECKBOX || subText === CHECKED_CHECKBOX) ?
          () => { this.onChangeText(toggledText(textChilds, i)) } : null,
        subText,
      })).map(props => <Text {...props}>{props.subText}</Text>)

    return (
      <View style={styles.pageView}>
        <Text style={styles.pageTitle}>
          {title}
        </Text>
        <View>
          <TextInput
            style={styles.underTextInput}
            ref={(textInput) => {
              this.textInput = textInput
              this.props.inputRef(textInput)
            }}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            onSelectionChange={this.onSelectionChange}
            pointerEvents={this.state.isEditable ? 'auto':'none'}
            multiline
          >
            {textComponentChilds}
          </TextInput>
          <Text
            style={styles.topCustomText}
            pointerEvents="box-none"
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
  emptyCheckbox: {
    fontFamily: 'circle-checkbox',
    color: emptyCheckboxColor,
  },
  checkedCheckbox: {
    fontFamily: 'circle-checkbox',
    color: checkedCheckboxColor,
  },
})
