import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native'
import Page from 'components/Page'
import {
  gotoPage,
  setFocusedBookId,
  setFocusedPageId,
} from 'actions'
import {
  getBookPageTitle,
  getSiblingPageId,
} from 'utils'

const windowWidth = Dimensions.get('window').width
const pageSeparatorWidth = 20
const snapToInterval = windowWidth + pageSeparatorWidth
const pageCenterIndex = 2

@connect((state, props) => ({
  book: state.books.byId[props.bookId],
  isKeyboardShow: state.ui.isKeyboardShow,
  focusedBookId: state.ui.focusedBookId,
}), {
  gotoPage,
  setFocusedBookId,
  setFocusedPageId,
})
export default class Book extends Component {
  // section: React Life-cycle methods
  componentDidMount() {
    this.scrollToCenterPage()
  }

  shouldComponentUpdate(props) {
    return this.props.book.id !== props.book.id ||
           this.props.book.currentPageId !== props.book.currentPageId
  }

  componentDidUpdate() {
    this.scrollToCenterPage()
  }

  // section: Event Handlers and utils
  // doing the hard coded infinite scroll
  onMomentumScrollEnd = (event) => {
    const shift = (event.nativeEvent.contentOffset.x / snapToInterval) - pageCenterIndex
    if (Math.abs(shift) >= 1) {
      const { book } = this.props
      this.props.gotoPage(book.id, getSiblingPageId(book.currentPageId, shift))
    }
  }

  // faster focus the page before momentum ended
  onScroll = (event) => {
    const shift = Math.round(event.nativeEvent.contentOffset.x / snapToInterval) - pageCenterIndex
    if (this.props.isKeyboardShow &&
      this.props.focusedBookId === this.props.book.id) {
      this.focusPage(shift)
    }
  }

  scrollToCenterPage = () => {
    this.scrollView.scrollTo({
      x: snapToInterval * pageCenterIndex,
      animated: false,
    })
  }

  focusPage = (shift = 0) => {
    const pageId = getSiblingPageId(this.props.book.currentPageId, shift)
    this.props.setFocusedPageId(pageId)
  }

  render() {
    const { book } = this.props
    const pageViews = [-2, -1, 0, 1, 2]
      .map((shift) => {
        const title = getBookPageTitle(book, shift)
        const pageId = getSiblingPageId(book.currentPageId, shift)
        return (
          <Page
            key={pageId}
            bookId={book.id}
            title={title}
            pageId={pageId}
          />
        )
      })

    return (
      <ScrollView
        style={styles.swipeContainer}
        ref={(scrollView) => { this.scrollView = scrollView }}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        keyboardShouldPersistTaps="always"
        snapToInterval={snapToInterval}
        scrollEventThrottle={16}

        onMomentumScrollEnd={this.onMomentumScrollEnd}
        onScroll={this.onScroll}
      >
        {pageViews}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  swipeContainer: {
    backgroundColor: '#FAFAFA',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(155, 155, 155, 0.5)',
    marginBottom: 5,
  },
})
