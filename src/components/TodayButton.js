import React, { Component } from 'react'
import { connect } from 'react-redux'
import FloatButton from './FloatButton'
import {
  gotoTodayPage,
  toggleIsStatusMode,
} from '../actions'
import {
  CHART,
  checkboxFont,
} from '../constants'

@connect(state => ({
  isKeyboardShow: state.ui.isKeyboardShow,
}), {
  gotoTodayPage,
  toggleIsStatusMode,
})
export default class TodayButton extends Component {
  render() {
    if (this.props.isKeyboardShow) return null
    return (
      <FloatButton
        style={{fontFamily: checkboxFont}}
        text={CHART}
        color="orange"
        underColor="darkorange"
        onPress={this.props.toggleIsStatusMode}
        onLongPress={this.props.gotoTodayPage}
        bottom={10}
        right={10}
      />
    )
  }
}

