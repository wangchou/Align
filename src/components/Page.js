import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import {
  setData,
  setFocusedBookId,
} from '../actions';

@connect((state, props) => ({
  text: state.pages[props.dataKey] || '',
  isTouchMoving: state.ui.isTouchMoving,
  isKeyboardShow: state.ui.isKeyboardShow,
  keyboardHeight: state.ui.keyboardHeight,
  scrollY: state.ui.scrollY,
  scrollTo: state.ui.scrollTo,
}), {
  setData,
  setFocusedBookId,
})
export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      isEditable: true,
    };
  }

  // React Life-cycle methods
  componentWillReceiveProps(props) {
    this.setState({
      text: props.text,
      isEditable: this.textInput.isFocused() || !props.isTouchMoving,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.dataKey !== nextProps.dataKey ||
      this.state.isEditable !== nextState.isEditable ||
      this.state.text !== nextState.text
    );
  }


  // Event Handlers
  onChangeText = (text) => {
    this.props.setData(this.props.dataKey, text);
    this.setState({ text });
  }

  onFocus = () => {
    this.props.setFocusedBookId(this.props.bookId);
    this.textInput.measure((ox, oy, width, height, px, py) => {
      const focusedInputPY = py - oy;
      const focusedInputHeight = height + oy;

      const { keyboardHeight } = this.props;
      const inputY = this.props.scrollY + focusedInputPY;
      const alignInputBottomToKeyboardY =
        inputY + (focusedInputHeight - windowHeight) + keyboardHeight;

      const isInputTopNotInView = focusedInputPY < 0;
      const isInputBottomNotInView =
        (focusedInputPY + focusedInputHeight + keyboardHeight) > windowHeight;
      if (isInputTopNotInView) {
        this.props.scrollTo(inputY);
      } else if (isInputBottomNotInView) {
        this.props.scrollTo(alignInputBottomToKeyboardY);
      }
    });
  }

  render() {
    const { title } = this.props;
    return (
      <View style={styles.pageView}>
        <Text style={styles.pageTitle}>
          {title}
        </Text>
        <TextInput
          style={styles.pageContent}
          ref={(textInput) => {
            this.textInput = textInput;
            this.props.inputRef(textInput);
          }}
          onChangeText={this.onChangeText}
          onFocus={this.onFocus}
          editable={this.state.isEditable}
          multiline
          value={this.state.text}
        />
      </View>
    );
  }
}

// Component Styles
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontSize = Math.min(windowWidth, windowHeight) / 20;
const pageHeight = fontSize * 17;
const titleHeight = 22;
const semiBold = '600';
const light = '300';
const pageSeparatorWidth = 20;
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
    fontFamily: 'PingFang TC',
    fontSize,
    fontWeight: semiBold,
  },
  pageContent: {
    height: pageHeight - titleHeight - 15,
    textAlign: 'justify',
    marginTop: 5,
    borderColor: 'rgba(200, 200, 200, 1.0)',
    fontFamily: 'PingFang TC',
    fontSize,
    fontWeight: light,
    color: 'rgba(32, 32, 32, 1.0)',
  },
  checkbox: {
    backgroundColor: 'pink',
    width: 20,
    height: 20,
  },
});
