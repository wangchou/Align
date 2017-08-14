import React, { Component } from 'react';
import moment from 'moment';
import {
  AppRegistry,
  StatusBar,
  ScrollView,
  Keyboard,
  View
} from 'react-native';
import BookSwipeContainer from './components/BookSwipeContainer';
import KeyboardDimissButton from './components/KeyboardDismissButton';

const bookModels = [
  {
    id: "year book",
    moment: moment(),
    unit: "year",
    format: "YYYY年",
    height: 300
  },
  {
    id: "month book",
    moment: moment(),
    unit: "month",
    format: "YYYY年 M月",
    height: 300
  },
  {
    id: "day book",
    moment: moment(),
    unit: "day",
    format: "M月 D日",
    height: 300
  },
];

export default class OnigiriNote extends Component {
  constructor(props) {
    super(props);
    this.state = {isKeyboardShow: false};
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      const keyboardHeight = event.endCoordinates.height;
      this.setState({isKeyboardShow: true, keyboardHeight});
    });
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (event) => {
      this.setState({isKeyboardShow: false});
    });
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  render() {
    return (
      <View>
        <ScrollView
          style={{backgroundColor: 'rgba(155, 155, 155, 0.1)'}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
        >
          <StatusBar hidden={true} />
          {bookModels.map(
            bookModel => <BookSwipeContainer
                          key={bookModel.id}
                          bookModel={bookModel}
                         />
          )}
          {this.state.isKeyboardShow ? <View style={{height: this.state.keyboardHeight}} /> : null}
        </ScrollView>
        {this.state.isKeyboardShow ?
          <KeyboardDimissButton keyboardHeight={this.state.keyboardHeight}/> :
          null
        }
      </View>
    );
  }
}

AppRegistry.registerComponent('OnigiriNote', () => OnigiriNote);
