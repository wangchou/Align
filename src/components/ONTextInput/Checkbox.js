import React, { Component } from 'react'

import {
  Text,
} from 'react-native'
import { styles } from './styles'

export default class Checkbox extends Component {
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
