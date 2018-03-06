import React, { Component } from 'react'
import { connect } from 'react-redux'
import FloatButton from './FloatButton'
import { toggleIsStatusMode } from '../actions'

@connect(state => ({
  isStatusMode: state.ui.isStatusMode,
  isKeyboardShow: state.ui.isKeyboardShow,
}), {
  toggleIsStatusMode,
})
export default class StatusButton extends Component {
  render() {
    const { isStatusMode, isKeyboardShow } = this.props;
    if (isKeyboardShow || isStatusMode) return null
    return (
      <FloatButton
        text={"S"}
        color="rgba(200, 200, 200, 1)"
        underColor="rgba(100, 100, 100, 1)"
        onPress={this.props.toggleIsStatusMode}
        bottom={10}
        left={10}
      />
    )
  }
}
