import React, { Component } from 'react';
import {
  TouchableHighlight,
  Keyboard,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import {gotoTodayPage} from '../actions/books';

@connect(null, {
  gotoTodayPage
})
export default class TodayButton extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.button}
          underlayColor='darkorange'

          // Event Handler
          onPress={this.props.gotoTodayPage}
        >
          <Text style={styles.text}>今</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'orange',
    borderColor: 'orange',
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right:10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  text: {
    fontSize: 20,
    color: 'white'
  }
});
