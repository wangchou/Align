import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
} from '../constants'

@connect(state => ({
  isStatusMode: state.ui.isStatusMode,
  yearBook: state.books.byId[YEAR_BOOK_ID],
  monthBook: state.books.byId[MONTH_BOOK_ID],
  weekBook: state.books.byId[WEEK_BOOK_ID],
  dayBook: state.books.byId[DAY_BOOK_ID],
}))
export default class StatusPage extends Component {
  render() {
    const { isStatusMode } = this.props;
    if(!isStatusMode) { return null; }
    return (
      <View style={styles.container}>
        <View style={styles.yearSection}>
          <Text> YEAR </Text>
        </View>
        <View style={styles.monthSection}>
          <Text> MONTH </Text>
        </View>
        <View style={styles.weekSection}>
          <Text> WEEK </Text>
        </View>
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    flex: 1,
    flexDirection: 'column',
  },
  yearSection: {
    flex: 1,
    height: windowHeight/3,
    backgroundColor: 'rgba(255, 255, 100, 1)',
  },
  monthSection: {
    flex: 1,
    height: windowHeight/3,
    backgroundColor: 'rgba(255, 100, 100, 1)',
  },
  weekSection: {
    flex: 1,
    height: windowHeight/3,
    backgroundColor: 'rgba(100, 100, 255, 1)',
  },
})
