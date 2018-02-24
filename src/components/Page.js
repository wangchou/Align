import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import ONTextInput from './ONTextInput'

import {
  setFocusedBookId,
  setFocusedPageId,
} from '../actions'

@connect(null, {
  setFocusedBookId,
  setFocusedPageId,
})
export default class Page extends Component {
  focus = () => {
    this.props.setFocusedBookId(this.props.bookId)
    this.props.setFocusedPageId(this.props.pageId)
  }

  render() {
    const { title, pageId, bookId } = this.props

    return (
      <View style={styles.pageView}>
        <Text style={styles.pageTitle} onPress={this.focus}>
          {title}
        </Text>
        <ONTextInput bookId={bookId} pageId={pageId} focus={this.focus}/>
      </View>
    )
  }
}

// Component Styles
const windowWidth = Dimensions.get('window').width
const fontSize = 16
export const titleHeight = 20
const semiBold = '600'
const pageSeparatorWidth = 20
const styles = StyleSheet.create({
  pageView: {
    width: windowWidth + pageSeparatorWidth,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'rgba(155, 155, 155, 0.3)',
    borderRightWidth: 20,
  },
  pageTitle: {
    height: titleHeight,
    fontFamily: 'PingFang TC',
    fontSize,
    fontWeight: semiBold,
  },
})
