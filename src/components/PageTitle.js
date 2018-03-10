
import React, { Component } from 'react'
import moment from 'moment'
import {
  Text,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import {
  getCheckboxCount,
} from 'utils/books'
import {
  titleHeight,
  textFont,
  checkboxFont,
  checkedCheckboxColor1,
  emptyCheckboxColor1,
  CHECKED_CHECKBOX1,
  EMPTY_CHECKBOX1,
  FLAG,
  STAR,
  HALF_STAR,
  starColor,
  flagColor,
  semiBold,
} from 'src/constants'
import {
  getFontSize,
} from 'utils/misc'

@connect((state, props) => ({
  text: state.pages[props.pageId] || '',
  fontScale: state.setting.fontScale,
}))
export default class PageTitle extends Component {

  getStyles = (fontScale) => {
    const fontSize = getFontSize(fontScale)
    const base = {
      height: fontSize * 5/4,
      fontFamily: textFont,
      fontSize: fontSize,
      fontWeight: semiBold,
    }

    return ({
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
  }

  render() {
    const { title, text, focus, bookId, fontScale } = this.props
    const { checkedCount, emptyCount } = getCheckboxCount(text)
    const styles = this.getStyles(fontScale)
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

