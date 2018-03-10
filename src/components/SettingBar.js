import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'
import {
  textFont,
} from 'constants'
import FloatButton from 'components/FloatButton'

export default class SettingBar extends Component {
  render() {
    const { text, onMinusClick, onPlusClick } = this.props
    const otherProps = {
      color: 'rgba(192, 192, 192, 1)',
      underColor: 'rgba(155, 155, 155, 1)',
      position: 'relative',
      size: 15,
    }
    return (
      <View style={styles.bar} >
        <View style={styles.description}>
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <FloatButton
            {...otherProps}
            text="-"
            onPress={onMinusClick}
          />
          <FloatButton
            {...otherProps}
            text="+"
            onPress={onPlusClick}
          />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  bar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 1,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(192, 192, 192, 1)',
  },
  text: {
    fontSize: 20,
    fontFamily: textFont,
  },
  description: {
    width: 170,
    height: 35,
  },
  buttonsContainer: {
    width: 75,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
