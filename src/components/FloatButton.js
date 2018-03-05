import React from 'react'
import {
  TouchableHighlight,
  View,
  Text,
} from 'react-native'

export default (props) => {
  const {
    color, underColor, bottom, onPress, text, right, left
  } = props
  const styles = {
    button: {
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      height: 60,
      width: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom,
      right,
      left,
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0,
      },
    },
    text: {
      fontSize: 30,
      color: 'white',
    },
  }
  return (
    <View>
    <TouchableHighlight
    style={styles.button}
    underlayColor={underColor}

    // Event Handler
    onPress={onPress}
    >
    <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
    </View>
  )
}

