import React, { Component } from 'react'
import moment from 'moment'
import { TouchableWithoutFeedback, Text, View, StyleSheet, Dimensions } from 'react-native'
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
import StatusBar from './StatusBar'
import { toggleIsStatusMode } from '../actions'
import {
  yearBarColor,
  yearBarBackgroundColor,
  monthBarColor,
  monthBarBackgroundColor,
  weekBarColor,
  weekBarBackgroundColor,
  dayBarColor,
  dayBarBackgroundColor,
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
      text: `${parentGoalStatus.checkedCount}/${parentGoalStatus.checkedCount + parentGoalStatus.emptyCount}`,
      percentage: parentGoalStatus.checkedCount /
        (parentGoalStatus.checkedCount + parentGoalStatus.emptyCount - 0.0001), // avoid Nan
    },
    child: {
      text: `${childGoalStatus.checkedCount}/${childGoalStatus.checkedCount + childGoalStatus.emptyCount}`,
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
}), {
  toggleIsStatusMode,
})
export default class StatusPage extends Component {
  render() {
    const { isStatusMode, yearBook, monthBook, weekBook, pages } = this.props;
    const yearStatus = getStatus(yearBook, pages)
    const monthStatus = getStatus(monthBook, pages)
    const weekStatus = getStatus(weekBook, pages)

    if(!isStatusMode) { return null }
    return (
      <TouchableWithoutFeedback
        onPress={this.props.toggleIsStatusMode}
      >
        <View
          style={styles.container}
        >
          <View style={styles.yearSection}>
            <StatusBar
              leftText={yearStatus.title}
              rightText={`剩${yearStatus.leftDays}天`}
              percentage={1 - yearStatus.leftDays/yearStatus.days}
            />
            <StatusBar
              leftText={"年目標"}
              barColor={yearBarColor}
              barBackgroundColor={yearBarBackgroundColor}
              rightText={yearStatus.parent.text}
              percentage={yearStatus.parent.percentage}
            />
            <StatusBar
              leftText={"月目標"}
              rightText={yearStatus.child.text}
              barColor={monthBarColor}
              barBackgroundColor={monthBarBackgroundColor}
              percentage={yearStatus.child.percentage}
            />
          </View>
          <View style={styles.monthSection}>
            <StatusBar
              leftText={monthStatus.title}
              rightText={`剩${monthStatus.leftDays}天`}
              percentage={1 - monthStatus.leftDays/monthStatus.days}
            />
            <StatusBar
              leftText={"月目標"}
              rightText={monthStatus.parent.text}
              barColor={monthBarColor}
              barBackgroundColor={monthBarBackgroundColor}
              percentage={monthStatus.parent.percentage}
            />
            <StatusBar
              leftText={"週目標"}
              rightText={monthStatus.child.text}
              barColor={weekBarColor}
              barBackgroundColor={weekBarBackgroundColor}
              percentage={monthStatus.child.percentage}
            />
          </View>
          <View style={styles.weekSection}>
            <StatusBar
              leftText={weekStatus.title}
              rightText={`剩${weekStatus.leftDays}天`}
              percentage={1 - weekStatus.leftDays/weekStatus.days}
            />
            <StatusBar
              leftText={"週目標"}
              rightText={weekStatus.parent.text}
              barColor={weekBarColor}
              barBackgroundColor={weekBarBackgroundColor}
              percentage={weekStatus.parent.percentage}
            />
            <StatusBar
              leftText={"日目標"}
              rightText={weekStatus.child.text}
              barColor={dayBarColor}
              barBackgroundColor={dayBarBackgroundColor}
              percentage={weekStatus.child.percentage}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    backgroundColor: 'rgba(185, 185, 185, 1)',
  },
  monthSection: {
    flex: 1,
    height: windowHeight/3,
    backgroundColor: 'rgba(150, 150, 150, 1)',
  },
  weekSection: {
    flex: 1,
    height: windowHeight/3,
    backgroundColor: 'rgba(185, 185, 185, 1)',
  },
})
