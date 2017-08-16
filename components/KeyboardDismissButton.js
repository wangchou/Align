import React, { Component } from 'react';
import moment from 'moment';
import {
  TouchableHighlight,
  Keyboard,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class KeyboardDimissButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = StyleSheet.create({
      button: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: this.props.keyboardHeight + 10,
        right:10,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        }
      }
    });
    return (
      <View>
        <TouchableHighlight
          style={styles.button}
          underlayColor='#ff7043'
          onPress={Keyboard.dismiss}
        >
          <Text style={{fontSize: 20, color: 'white'}}>v</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
