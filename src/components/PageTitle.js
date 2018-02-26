
import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import {
  titleHeight,
  textFont,
  fontSize,
  checkedCheckboxColor1,
  emptyCheckboxColor1,
  CHECKED_CHECKBOX1,
  EMPTY_CHECKBOX1,
} from '../constants'

@connect((state, props) => ({
  text: state.pages[props.pageId] || '',
}))
export default class PageTitle extends Component {
  getCheckboxCount = (text) => {
    let checkedCheckboxCount = 0
    let emptyCheckboxCount = 0
    for (let i = 0; i < text.length; i += 1) {
      const ch = text.charAt(i)
      if (ch === CHECKED_CHECKBOX1) {
        checkedCheckboxCount++
      }
      if (ch === EMPTY_CHECKBOX1) {
        emptyCheckboxCount++
      }
    }
    return { checkedCheckboxCount, emptyCheckboxCount }
  }

  render() {
    const { title, text, focus } = this.props
    const { checkedCheckboxCount, emptyCheckboxCount } = this.getCheckboxCount(text)
    const checkboxCounter = checkedCheckboxCount + emptyCheckboxCount === 0 ? null : (
      <Text>
        <Text style={styles.checkboxCount}>
          {`  ${checkedCheckboxCount}`}
        </Text>
        <Text style={styles.emptyCheckboxCount}>
          {` ${emptyCheckboxCount}`}
        </Text>
      </Text>
    )

    return (
      <Text onPress={focus}>
        <Text style={styles.pageTitle}>
          {title}
        </Text>
        {checkboxCounter}
      </Text>
    )
  }
}

const semiBold = '600'
const base = {
  height: titleHeight,
  fontFamily: textFont,
  fontSize,
  fontWeight: semiBold,
}
const styles = StyleSheet.create({
  pageTitle: {
    ...base,
  },
  checkboxCount: {
    ...base,
    color: checkedCheckboxColor1,
  },
  emptyCheckboxCount: {
    ...base,
    color: emptyCheckboxColor1,
  },
})
