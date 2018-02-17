import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  ScrollView,
  View,
} from 'react-native'
import Book from './components/Book'
import KeyboardAvoidingView from './components/KeyboardAvoidingView'
import TodayButton from './components/TodayButton'
import FloatEditBar from './components/FloatEditBar'
import KeyboardManager from './components/KeyboardManager'
import {
  setIsTouchMoving,
  setScrollY,
  setScrollTo,
} from './actions'

@connect(state => ({
  bookIds: state.books.ids,
}), {
  onTouchMove: () => setIsTouchMoving(true),
  onTouchEnd: () => setIsTouchMoving(false),
  setScrollY,
  setScrollTo,
})
export default class OnigiriNote extends Component {
  componentDidMount() {
    this.props.setScrollTo(y => this.scrollView.scrollTo({ y }))
  }

  onScroll = (event) => {
    this.props.setScrollY(event.nativeEvent.contentOffset.y)
  }

  render() {
    const {
      bookIds,
      onTouchMove,
      onTouchEnd,
    } = this.props

    const bookViews = bookIds.map(bookId =>
      (<Book
        key={bookId}
        bookId={bookId}
      />))

    return (
      <View>
        <ScrollView
          style={{ backgroundColor: 'rgba(155, 155, 155, 0.1)' }}
          ref={(ref) => { this.scrollView = ref }}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          scrollEventThrottle={16}

          // Event Handlers
          onScroll={this.onScroll}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {bookViews}
          <StatusBar hidden />
          <KeyboardAvoidingView />
        </ScrollView>
        <FloatEditBar />
        <TodayButton />
        <KeyboardManager />
      </View>
    )
  }
}
