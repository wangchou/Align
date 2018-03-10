import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native'
import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  textFont,
  RESET_ALL,
  FONT_SIZE,
  SETTING_PAGE,
} from 'constants'
import I18n, {getNumberOfLineDescriptonI18n} from 'i18n'
import { windowWidth } from 'utils/misc'
import {
  setFontScale,
  setBookNumOfLines,
  resetSettings,
  toggleIsSettingPageFolded,
} from 'actions'
import SettingBar from 'components/SettingBar'

@connect(state => ({
  fontScale: state.setting.fontScale,
  numberOfLines: state.setting.numberOfLines,
  isSettingPageFolded: state.ui.isSettingPageFolded,
}), {
  setFontScale,
  setBookNumOfLines,
  resetSettings,
  toggleIsSettingPageFolded,
})
export default class SettingPage extends Component {
  render() {
    const {
      fontScale,
      numberOfLines,
      setFontScale,
      setBookNumOfLines,
      resetSettings,
      toggleIsSettingPageFolded,
      isSettingPageFolded,
    } = this.props

    const numberOfLinesSetting = [
      YEAR_BOOK_ID,
      MONTH_BOOK_ID,
      WEEK_BOOK_ID,
      DAY_BOOK_ID
    ].map(bookId => (
      <SettingBar
        key={bookId}
        text={getNumberOfLineDescriptonI18n(bookId)}
        onMinusClick={() => setBookNumOfLines(bookId, numberOfLines[bookId] - 1)}
        onPlusClick={() => setBookNumOfLines(bookId, numberOfLines[bookId] + 1)}
      />
    ))

    return (
      <View>
        <TouchableOpacity
          style={styles.foldButton}
          onPress={toggleIsSettingPageFolded}
        >
          <Text style={styles.text}
          >
            {`${I18n.t(SETTING_PAGE)} ${isSettingPageFolded ? '+' : '-'}`}
          </Text>
        </TouchableOpacity>
        {isSettingPageFolded ? null :
          <View style={styles.container}>

            <SettingBar
              text={I18n.t(FONT_SIZE)}
              onMinusClick={() => setFontScale(fontScale/1.1)}
              onPlusClick={() => setFontScale(fontScale*1.1)}
            />
            {numberOfLinesSetting}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetSettings}
            >
              <Text style={styles.text}
              >
                {I18n.t(RESET_ALL)}
              </Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: 'rgba(155, 155, 155, 0.3)',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  foldButton: {
    width: windowWidth,
    height: 35,
    backgroundColor: 'rgba(192, 192, 192, 1)',
    borderColor: 'rgba(155, 155, 155, 1)',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: textFont,
  },
  resetButton: {
    width: windowWidth - 40,
    height: 40,
    marginTop: 5,
    backgroundColor: 'rgba(192, 192, 192, 1)',
    borderColor: 'rgba(180, 180, 180, 1)',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
