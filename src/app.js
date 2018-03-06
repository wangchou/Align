import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  ScrollView,
  View,
} from 'react-native'
import Book from './components/Book'
import KeyboardAvoidingView from './components/KeyboardAvoidingView'
import StatusAvoidingView from './components/StatusAvoidingView'
import TodayButton from './components/TodayButton'
import StatusPage from './components/StatusPage'
import FloatEditBar from './components/FloatEditBar'
import KeyboardManager from './components/KeyboardManager'
import {
  setScrollY,
  setScrollTo,
} from './actions'

@connect(state => ({
  bookIds: state.books.ids,
}), {
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
          scrollEventThrottle={16}
          onScroll={this.onScroll}
        >
          <StatusAvoidingView />
          {bookViews}
          <StatusBar hidden />
          <KeyboardAvoidingView />
        </ScrollView>
        <FloatEditBar />
        <TodayButton />
        <StatusPage />
        <KeyboardManager />
      </View>
    )
  }
}
