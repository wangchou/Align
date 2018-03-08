import React from 'react'
import {
  TouchableHighlight,
  View,
  Text,
} from 'react-native'

export default (props) => {
  const {
    color, underColor, bottom, onPress, onLongPress, text, right, left, style, size, position,
  } = props
  const styles = {
    view: {
      height: size ? size*2 : 60,
      width: size ? size*2 : 60,
      position: position ? position : 'absolute',
      bottom,
      right,
      left,
    },
    button: {
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      height: size ? size*2 : 60,
      width: size ? size*2 : 60,
      borderRadius: size ? size : 30,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0,
      },
    },
    text: {
      ...style,
      fontSize: size ? size : 30,
      color: 'white',
    },
  }
  return (
    <View style={styles.view}>
      <TouchableHighlight
        style={styles.button}
        underlayColor={underColor}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    </View>
  )
}

