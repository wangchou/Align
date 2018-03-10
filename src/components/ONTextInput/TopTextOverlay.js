import React, { Component } from 'react'
import {
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { getStyles } from './styles'
import Checkbox from './Checkbox'
import {
  setData,
} from 'actions'
import {
  isCheckbox,
  getTextChilds,
  toggleCheckbox,
} from './utilities'

@connect((state, props) => ({
  text: state.pages[props.pageId] || '',
  focusedBookId: state.ui.focusedBookId,
  fontScale: state.setting.fontScale,
  numberOfLines: state.setting.numberOfLines[props.bookId],
}), {
  setData,
})
export default class TopTextOverlay extends Component {
  onCheckboxToggle = (toggleIndex) => {
    const textChilds = getTextChilds(this.props.text)
    const toggledText = textChilds.map((t, i) => (toggleIndex === i ? toggleCheckbox(t) : t)).join('')
    this.props.setData(this.props.pageId, toggledText)
  }

  getTextComponentChilds = (text, styles) => getTextChilds(text)
    .map((subText, i) =>
      (isCheckbox(subText) ?
        <Checkbox
          key={text + subText + i}
          text={subText}
          styles={styles}
          indexInParentText={i}
          onCheckboxToggle={this.onCheckboxToggle}
        /> :
        <Text key={text + subText + i} style={styles.text} >{subText}</Text>))

  render() {
    const {
      bookId, focusedBookId, focus, text, fontScale, numberOfLines
    } = this.props
    const styles = getStyles( fontScale, numberOfLines )

    return (
      <Text
        style={styles.topCustomText}
        pointerEvents={ bookId === focusedBookId ? 'box-none' : 'auto' }
        onPress={focus}
      >
        {this.getTextComponentChilds(text, styles)}
      </Text>
    )
  }
}
