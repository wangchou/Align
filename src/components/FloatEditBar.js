import React, { Component } from 'react';
import {
  TouchableHighlight,
  Keyboard,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Button
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class FloatEditBar extends Component {
  render() {
    const styles = {
      editBar: {
        width: windowWidth,
        height: 45,

        position: 'absolute',
        bottom: this.props.keyboardHeight,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(155, 155, 155, 0.2)'
      }
    };

    return (
      <View style={styles.editBar}>
        <Button
          title={'完了'}
          color={'rgba(125, 125, 125, 1)'}
          onPress={Keyboard.dismiss}
        />
      </View>
    );
  }
}


