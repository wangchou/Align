import React, { Component } from 'react'

import {
  Text,
} from 'react-native'
import { styles } from './styles'

export default class Checkbox extends Component {
  toggleCheckbox = () => {
    this.props.onCheckboxToggle(this.props.indexInParentText)
  }

  render() {
    const { indexInParentText, text } = this.props

    const props = {
      key: indexInParentText + text,
      style: styles[text],
      onPress: this.toggleCheckbox,
    }
    return (<Text {...props}>{text}</Text>)
  }
}
