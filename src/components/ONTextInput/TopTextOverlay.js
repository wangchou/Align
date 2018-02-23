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
  EMPTY_CHECKBOX,
  CHECKED_CHECKBOX,
} from '../../constants'

export const isCheckbox = ch => ch === EMPTY_CHECKBOX || ch === CHECKED_CHECKBOX
const toggleCheckbox = ch => (ch === EMPTY_CHECKBOX ? CHECKED_CHECKBOX : EMPTY_CHECKBOX)

const checkboxOrTextReg = new RegExp(`${EMPTY_CHECKBOX}|${CHECKED_CHECKBOX}|[^${EMPTY_CHECKBOX}${CHECKED_CHECKBOX}]+`, 'g')
export const getTextChilds = text => text.match(checkboxOrTextReg) || []

@connect((state, props) => ({
  text: state.pages[props.dataKey] || '',
}), {
  setData,
})
export default class TopTextOverlay extends Component {
  onCheckboxToggle = (toggleIndex) => {
    const textChilds = getTextChilds(this.props.text)
    const toggledText = textChilds.map((t, i) => (toggleIndex === i ? toggleCheckbox(t) : t)).join('')
    this.props.setData(this.props.dataKey, toggledText)
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
    return (
      <Text
        style={styles.topCustomText}
        pointerEvents="box-none"
      >
        {this.getTextComponentChilds(this.props.text)}
      </Text>
    )
  }
}
