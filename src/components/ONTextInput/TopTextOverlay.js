import React, { Component } from 'react'
import {
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from './styles'
import Checkbox from './Checkbox'
import {
  setData,
} from '../../actions'
import {
  isCheckbox,
  getTextChilds,
  toggleCheckbox,
} from './utilities'

@connect((state, props) => ({
  text: state.pages[props.pageId] || '',
  focusedBookId: state.ui.focusedBookId,
}), {
  setData,
})
export default class TopTextOverlay extends Component {
  onCheckboxToggle = (toggleIndex) => {
    const textChilds = getTextChilds(this.props.text)
    const toggledText = textChilds.map((t, i) => (toggleIndex === i ? toggleCheckbox(t) : t)).join('')
    this.props.setData(this.props.pageId, toggledText)
  }

  getTextComponentChilds = text => getTextChilds(text)
    .map((subText, i) =>
      (isCheckbox(subText) ?
        <Checkbox
          key={text + subText + i}
          text={subText}
          indexInParentText={i}
          onCheckboxToggle={this.onCheckboxToggle}
        /> :
        <Text key={text + subText + i} style={styles.text} >{subText}</Text>))

  render() {
    const {
      bookId, focusedBookId, focus, text,
    } = this.props
    return (
      <Text
        style={styles.topCustomText}
        pointerEvents={ bookId === focusedBookId ? 'box-none' : 'auto' }
        onPress={focus}
      >
        {this.getTextComponentChilds(text)}
      </Text>
    )
  }
}
