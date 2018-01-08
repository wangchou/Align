import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
  TouchableHighlight,
  Button
} from 'react-native';
import {connect} from 'react-redux';
import {setData}  from '../actions';

@connect((state, props) => ({
  text: state.pages[props.dataKey] || null,
  isTouchMoving: state.ui.isTouchMoving
}), {
  setData
})
export default class Page extends Component {
  constructor(props) {
     super(props);
     this.state = {
       text: props.text,
       isEditable: true
     };
  }

  // Event Handlers
  onChangeText = (text) => {
    this.props.setData(this.props.dataKey, text);
    this.setState({text});
  }

  onFocus = (e) => {
    this.textInput.measure((ox, oy, width, height, px, py) => {
      focusedInputPY = py - oy;
      focusedInputHeight = height;
      console.log(`onFocus: \n\tpy:${focusedInputPY},\n\theight:${height}`);
    });
  }

  // React Life-cycle methods
  componentWillReceiveProps(props) {
    this.setState({
      text: props.text,
      isEditable: this.textInput.isFocused() || !props.isTouchMoving
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.dataKey !== nextProps.dataKey ||
      this.state.isEditable !== nextState.isEditable ||
      this.state.text !== nextState.text
    );
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
          ref={textInput => {
            this.textInput = textInput;
            this.props.inputRef(textInput);
          }}
          onChangeText={this.onChangeText}
          onFocus={this.onFocus}
          editable={this.state.isEditable}
          multiline
        >
          {this.state.text}
        </TextInput>
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
const semiBold = "600";
const light="300";
const styles = StyleSheet.create({
  pageView: {
    width: windowWidth,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
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
    height: 20
  }
});
