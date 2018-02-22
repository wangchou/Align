import React, { Component } from 'react'
import {
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from './styles'

import {
  setData,
} from '../../actions'

import {
  EMPTY_CHECKBOX,
  CHECKED_CHECKBOX,
} from '../../constants'

export const isCheckbox = ch => ch === EMPTY_CHECKBOX || ch === CHECKED_CHECKBOX
const toggleCheckbox = ch => (ch === EMPTY_CHECKBOX ? CHECKED_CHECKBOX : EMPTY_CHECKBOX)

class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.state = { text: props.text }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.text !== nextState.text
  }

  toggleCheckbox = () => {
    this.props.onCheckboxToggle(this.props.indexInParentText)
  }

  render() {
    const { indexInParentText } = this.props
    const { text } = this.state

    const props = {
      key: indexInParentText + text,
      style: styles[text],
      onPress: this.toggleCheckbox,
    }
    return (<Text {...props}>{text}</Text>)
  }
}

@connect((state, props) => ({
  text: state.pages[props.dataKey] || '',
}), {
  setData,
})
export default class TopTextOverlay extends Component {
  onCheckboxToggle = (toggleIndex) => {
    const textChilds = this.getTextChilds(this.props.text)
    const toggledText = textChilds.map((t, i) => (toggleIndex === i ? toggleCheckbox(t) : t)).join('')
    this.props.setData(this.props.dataKey, toggledText)
  }

  getTextChilds = text => text
    .match(new RegExp(`${EMPTY_CHECKBOX}|${CHECKED_CHECKBOX}|[^${EMPTY_CHECKBOX}${CHECKED_CHECKBOX}]+`, 'g'))

  render() {
    const { text } = this.props

    const textChilds = this.getTextChilds(text)

    const textComponentChilds = textChilds && textChilds.map((subText, i) => {
      if (isCheckbox(subText)) {
        return (
          <Checkbox
            key={subText + i}
            text={subText}
            indexInParentText={i}
            onCheckboxToggle={this.onCheckboxToggle}
          />
        )
      }
      return <Text key={subText + i}>{subText}</Text>
    })

    return (
      <Text
        style={styles.topCustomText}
        pointerEvents="box-none"
      >
        {textComponentChilds}
      </Text>
    )
  }
}
