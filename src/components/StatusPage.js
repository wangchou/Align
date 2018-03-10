import React, { Component } from 'react'
import moment from 'moment'
import { TouchableWithoutFeedback, Text, View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {
  getNowPageId,
  getChildPageIds,
  getCheckboxCount,
  getNowStatusTitle,
} from 'utils/books'
import {
  COLOR,
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  YEAR_KEY,
  MONTH_KEY,
  WEEK_KEY,
  DAY_KEY,
} from 'src/constants'
import StatusBar from 'components/StatusBar'
import { toggleIsStatusMode } from 'actions'
import I18n from 'i18n'

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
    title: getNowStatusTitle(book.id),
    timePercentage: 1 - leftDays/days,
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
  isKeyboardShow: state.ui.isKeyboardShow,
  yearBook: state.books.byId[YEAR_BOOK_ID],
  monthBook: state.books.byId[MONTH_BOOK_ID],
  weekBook: state.books.byId[WEEK_BOOK_ID],
  pages: state.pages,
}), {
  toggleIsStatusMode,
})
export default class StatusPage extends Component {
  render() {
    const { isStatusMode, isKeyboardShow, yearBook, monthBook, weekBook, pages } = this.props;
    const yearStatus = getStatus(yearBook, pages)
    const monthStatus = getStatus(monthBook, pages)
    const weekStatus = getStatus(weekBook, pages)

    if(!isStatusMode || isKeyboardShow) { return null }
    return (
      <TouchableWithoutFeedback
        onPress={this.props.toggleIsStatusMode}
      >
        <View
          style={styles.container}
        >
          <View style={styles.section}>
            <StatusBar
              leftText={yearStatus.title}
              percentage={yearStatus.timePercentage}
            />
            <StatusBar
              leftText={I18n.t(YEAR_KEY)}
              barColor={COLOR.yearBarColor}
              barBackgroundColor={COLOR.yearBarBackgroundColor}
              rightText={yearStatus.parent.text}
              percentage={yearStatus.parent.percentage}
            />
            <StatusBar
              leftText={I18n.t(MONTH_KEY)}
              rightText={yearStatus.child.text}
              barColor={COLOR.monthBarColor}
              barBackgroundColor={COLOR.monthBarBackgroundColor}
              percentage={yearStatus.child.percentage}
            />
          </View>
          <View style={styles.section}>
            <StatusBar
              leftText={monthStatus.title}
              percentage={monthStatus.timePercentage}
            />
            <StatusBar
              leftText={I18n.t(MONTH_KEY)}
              rightText={monthStatus.parent.text}
              barColor={COLOR.monthBarColor}
              barBackgroundColor={COLOR.monthBarBackgroundColor}
              percentage={monthStatus.parent.percentage}
            />
            <StatusBar
              leftText={I18n.t(WEEK_KEY)}
              rightText={monthStatus.child.text}
              barColor={COLOR.weekBarColor}
              barBackgroundColor={COLOR.weekBarBackgroundColor}
              percentage={monthStatus.child.percentage}
            />
          </View>
          <View style={styles.section}>
            <StatusBar
              leftText={weekStatus.title}
              percentage={weekStatus.timePercentage}
            />
            <StatusBar
              leftText={I18n.t(WEEK_KEY)}
              rightText={weekStatus.parent.text}
              barColor={COLOR.weekBarColor}
              barBackgroundColor={COLOR.weekBarBackgroundColor}
              percentage={weekStatus.parent.percentage}
            />
            <StatusBar
              leftText={I18n.t(DAY_KEY)}
              rightText={weekStatus.child.text}
              barColor={COLOR.dayBarColor}
              barBackgroundColor={COLOR.dayBarBackgroundColor}
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
const gray = 'rgba(192, 192, 192, 1)'
const darkGray = 'rgba(120, 120, 120, 1)'
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight/5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: darkGray,
    borderColor: darkGray,
    borderBottomWidth: 0.5,
  },
  section: {
    flex: 1,
    height: windowHeight/5,
    backgroundColor: gray,
    borderRightWidth: 0.5,
    borderColor: darkGray,
  },
})
