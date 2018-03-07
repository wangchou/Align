
import React, { Component } from 'react'
import moment from 'moment'
import {
  Text,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import {
  getCheckboxCount,
} from '../utils/books'
import {
  titleHeight,
  textFont,
  checkboxFont,
  fontSize,
  checkedCheckboxColor1,
  emptyCheckboxColor1,
  CHECKED_CHECKBOX1,
  EMPTY_CHECKBOX1,
  FLAG,
  STAR,
  HALF_STAR,
  starColor,
  flagColor,
} from '../constants'

@connect((state, props) => ({
  text: state.pages[props.pageId] || '',
}))
export default class PageTitle extends Component {

  render() {
    const { title, text, focus, bookId } = this.props
    const { checkedCount, emptyCount } = getCheckboxCount(text)
    const checkedCounter = (checkedCount + emptyCount === 0) ? null : (
      <Text>
        <Text style={styles.checkedCount}>
          {`  ${checkedCount}`}
        </Text>
        <Text style={styles.emptyCount}>
          {` ${emptyCount}`}
        </Text>
      </Text>
    )

    let progressStar = null;
    if(emptyCount + checkedCount > 0) {
      if(emptyCount === 0) {
          progressStar = <Text style={styles.star}>{` ${STAR}`}</Text>
      } else if(checkedCount >= emptyCount) {
          progressStar = <Text style={styles.star}>{` ${HALF_STAR}`}</Text>
      }
    }

    return (
      <Text onPress={focus}>
        <Text style={styles.pageTitle}>
          {title}
        </Text>
        {progressStar}
        {checkedCounter}
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
  thisLabel: {
    ...base,
    fontFamily: checkboxFont,
    color: flagColor,
  },
  checkedCount: {
    ...base,
    color: checkedCheckboxColor1,
  },
  emptyCount: {
    ...base,
    color: emptyCheckboxColor1,
  },
  star: {
    ...base,
    fontFamily: checkboxFont,
    color: starColor,
  },
})
