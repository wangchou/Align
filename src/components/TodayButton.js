import React, { Component } from 'react';
import FloatButton from './FloatButton';
import {connect} from 'react-redux';
import {gotoTodayPage} from '../actions';

@connect(null, {
  gotoTodayPage
})
export default class TodayButton extends Component {
  render() {
    return (
      <FloatButton
        text={'今'}
        color={'orange'}
        underColor={'darkorange'}
        onPress={this.props.gotoTodayPage}
        bottom={10}
      />
    );
  }
}

