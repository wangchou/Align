
import React, { Component } from 'react'
import {
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import {
  getCheckboxCount,
  getFontSize,
  getTitleHeight,
} from 'utils'
import {
  textFont,
  checkboxFont,
  COLOR,
  STAR,
  HALF_STAR,
  semiBold,
} from 'constants'

@connect((state, props) => ({
  text: state.pages[props.pageId] || '',
  fontScale: state.setting.fontScale,
  today: state.ui.today, // if go to next day, the title will be rerendered
}))
export default class PageTitle extends Component {
  getStyles = (fontScale) => {
    const fontSize = getFontSize(fontScale)
    const base = {
      height: getTitleHeight(fontScale),
      fontFamily: textFont,
      fontSize,
      fontWeight: semiBold,
    }

    return ({
      pageTitle: {
        ...base,
      },
      thisLabel: {
        ...base,
        fontFamily: checkboxFont,
        color: COLOR.flagColor,
      },
      checkedCount: {
        ...base,
        color: COLOR.checkedCheckboxColor1,
      },
      emptyCount: {
        ...base,
        color: COLOR.emptyCheckboxColor1,
      },
      star: {
        ...base,
        fontFamily: checkboxFont,
        color: COLOR.starColor,
      },
    })
  }

  render() {
    const {
      title, text, focus, fontScale,
    } = this.props
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

    let progressStar = null
    if (emptyCount + checkedCount > 0) {
      if (emptyCount === 0) {
        progressStar = <Text style={styles.star}>{` ${STAR}`}</Text>
      } else if (checkedCount >= emptyCount) {
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

