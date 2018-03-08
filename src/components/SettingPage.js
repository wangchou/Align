import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  TouchableWithoutFeedback,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  textFont,
} from '../constants'
import I18n from '../i18n'
import { windowWidth } from '../utils/misc'
import {
  setFontScale,
  setBookNumOfLines,
  resetSettings,
} from '../actions'

@connect(state => ({
  fontScale: state.setting.fontScale,
  numberOfLines: state.setting.numberOfLines,
}), {
  setFontScale,
  setBookNumOfLines,
  resetSettings,
})
export default class SettingPage extends Component {
  render() {
    const {
      fontScale,
      numberOfLines,
      setFontScale,
      setBookNumOfLines,
      resetSettings,
    } = this.props

    const numberOfLinesSetting = [
      YEAR_BOOK_ID,
      MONTH_BOOK_ID,
      WEEK_BOOK_ID,
      DAY_BOOK_ID
    ].map(bookId => (
      <View key={bookId}>
        <Text style={styles.text}>
          Number of Lines:
          <Text
            onPress={() => setBookNumOfLines(bookId, numberOfLines[bookId] - 1)}
          >
            -
          </Text>
          <Text
            onPress={() => setBookNumOfLines(bookId, numberOfLines[bookId] + 1)}
          >
            +
          </Text>
        </Text>
      </View>
    ))

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Font Size:
            <Text
              onPress={() => setFontScale(fontScale/1.1)}
            >
              -
            </Text>
            <Text
              onPress={() => setFontScale(fontScale*1.1)}
            >
              +
            </Text>
          </Text>
        </View>
        {numberOfLinesSetting}
        <View>
            <Text style={styles.text}
              onPress={resetSettings}
            >
              Reset Settings
            </Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: 200,
    backgroundColor: 'rgba(155, 155, 155, 0.3)',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: textFont,
  }
})
