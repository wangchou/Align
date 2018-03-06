import React, { Component } from 'react'
import moment from 'moment'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {
  getNowPageId,
  getChildPageIds,
  getCheckboxCount,
  getNowPageTitle,
} from '../utils/books'
import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
} from '../constants'

const getStatus = (book, pages) => {
  const parentPageId = getNowPageId(book)
  const parentGoalStatus =  getCheckboxCount(pages[parentPageId])
  const childGoalStatus = getChildPageIds(parentPageId)
    .map(id => getCheckboxCount(pages[id]))
    .reduce(
      (child, sum) => ({
        checkedCount: sum.checkedCount + child.checkedCount,
        emptyCount: sum.emptyCount + child.emptyCount,
      }),
      { checkedCount: 0, emptyCount: 0 }
    )

  const leftDays = (moment().endOf(book.unit).format('DDD') - moment().format('DDD') + 1)
  let days = 7;
  if(book.id === YEAR_BOOK_ID) {
    days = moment().endOf(book.unit).format('DDD') - 0
  }
  if(book.id === MONTH_BOOK_ID) {
    days = moment().daysInMonth()
  }

  return ({
    title: getNowPageTitle(book.id),
    leftDays,
    days,
    parent: {
      checkedCount: parentGoalStatus.checkedCount,
      percentage: parentGoalStatus.checkedCount /
        (parentGoalStatus.checkedCount + parentGoalStatus.emptyCount - 0.0001), // avoid Nan
    },
    child: {
      checkedCount: childGoalStatus.checkedCount,
      percentage: childGoalStatus.checkedCount /
        (childGoalStatus.checkedCount + childGoalStatus.emptyCount - 0.0001), // avoid Nan
    },
  })
}

@connect(state => ({
  isStatusMode: state.ui.isStatusMode,
  yearBook: state.books.byId[YEAR_BOOK_ID],
  monthBook: state.books.byId[MONTH_BOOK_ID],
  weekBook: state.books.byId[WEEK_BOOK_ID],
  pages: state.pages,
}))
export default class StatusPage extends Component {
  render() {
    const { isStatusMode, yearBook, monthBook, weekBook, pages } = this.props;
    const yearStatus = getStatus(yearBook, pages)
    const monthStatus = getStatus(monthBook, pages)
    const weekStatus = getStatus(weekBook, pages)

    if(!isStatusMode) { return null }
    return (
      <View style={styles.container}>
        <View style={styles.yearSection}>
          <Text> {`${yearStatus.title} | ${yearStatus.days} days left | ${yearStatus.leftDays/yearStatus.days}`} </Text>
          <Text> {`年目標 | ${yearStatus.parent.checkedCount} | ${yearStatus.parent.percentage}`} </Text>
          <Text> {`月目標 | ${yearStatus.child.checkedCount} | ${yearStatus.child.percentage}`} </Text>
        </View>
        <View style={styles.monthSection}>
          <Text> {`${monthStatus.title} | ${monthStatus.days} days left | ${monthStatus.leftDays/monthStatus.days}`} </Text>
          <Text> {`月目標 | ${monthStatus.parent.checkedCount} | ${monthStatus.parent.percentage}`} </Text>
          <Text> {`週目標 | ${monthStatus.child.checkedCount} | ${monthStatus.child.percentage}`} </Text>
        </View>
        <View style={styles.weekSection}>
          <Text> {`${weekStatus.title} | ${weekStatus.days} days left | ${weekStatus.leftDays/weekStatus.days}`} </Text>
          <Text> {`週目標 | ${weekStatus.parent.checkedCount} | ${weekStatus.parent.percentage}`} </Text>
          <Text> {`日目標 | ${weekStatus.child.checkedCount} | ${weekStatus.child.percentage}`} </Text>
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
