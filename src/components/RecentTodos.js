import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import {
  CHECKBOXS,
  EMPTY_CHECKBOX1,
  EMPTY_CHECKBOX2,
  CHECKED_CHECKBOX1,
  CHECKED_CHECKBOX2,
  textFont,
  checkboxFont,
  COLOR,
  EMPTY_RECENT_TODO,
} from 'constants'
import {
  getSiblingPageId,
  getFontSize,
} from 'utils'
import {
  insertText,
} from 'actions'
import i18n from 'i18n'

const checkboxWithContentReg = new RegExp(`[${CHECKBOXS}] [^${CHECKBOXS}\n]*[^${CHECKBOXS} \t\n]+`, 'g')
export const getTodoChilds = text => ((text && text.match(checkboxWithContentReg)) || [])
  .map(todo => todo.replace(CHECKED_CHECKBOX1, EMPTY_CHECKBOX1))
  .map(todo => todo.replace(CHECKED_CHECKBOX2, EMPTY_CHECKBOX2))


@connect(state => ({
  pages: state.pages,
  focusedPageId: state.ui.focusedPageId,
  isRecentTodoShow: state.ui.isRecentTodoShow,
}), {
  insertText,
})
export default class RecentTodos extends Component {
  render() {
    const {pages, focusedPageId, isRecentTodoShow} = this.props
    if(!isRecentTodoShow || focusedPageId === null) return null

    const todoCounts = {}

    for(let shift = -14; shift < 7; shift++) {
      const siblingPageId = getSiblingPageId(focusedPageId, shift)
      const todos = getTodoChilds(pages[siblingPageId])
      todos.forEach(todo => {
        if(todoCounts[todo]) {
          todoCounts[todo] = todoCounts[todo] + 1
        } else {
          todoCounts[todo] = 1
        }
      })
    }


    // prefer high frequency and shorter todo
    const getPriority = todo => (todo.count - todo.str.length * 0.01)

    let todoBars = Object.keys(todoCounts)
      .map(key => ({str: key, count: todoCounts[key]}))
      .sort((a, b) => getPriority(b) - getPriority(a))
      .slice(0, 12)
      .reverse()
      .map(todoObj => {
        const checkbox = todoObj.str.charAt(0)
        const restStr = todoObj.str.slice(1)
        return (
          <Text key={todoObj.str} style={styles.singleTodoContainer}>
            <Text
              style={styles.todoItem}
              onPress={() => this.props.insertText(todoObj.str)}
            >
              <Text style={styles[checkbox]}>
                { checkbox}
              </Text>
              <Text>
                {restStr}
              </Text>
            </Text>
            <Text>
              {'   '}
            </Text>
          </Text>
        )
      })

    if(Object.keys(todoCounts).length === 0) {
      todoBars = (
        <Text style={styles.singleTodoContainer}>
          {i18n.t(EMPTY_RECENT_TODO)}
        </Text>
      )
    }

    return (
      <View
        style={styles.container}
        overflow="hidden"
      >
        <Text>
          {todoBars}
        </Text>
      </View>
    )
  }
}

// Component Styles
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    height: 130,
    width: windowWidth,
    borderColor: 'rgba(155, 155, 155, 0.3)',
    borderWidth: 0.5,
    position: 'absolute',
    top: -130,
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: 'rgba(240, 240, 240, 1)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  singleTodoContainer: {
    fontFamily: textFont,
    fontSize: 18,
    lineHeight: 30,
  },
  todoItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(240, 240, 240, 0.3)',
  },
  [EMPTY_CHECKBOX1]: {
    color: COLOR.emptyCheckboxColor1,
    fontFamily: checkboxFont,
  },
  [EMPTY_CHECKBOX2]: {
    color: COLOR.emptyCheckboxColor2,
    fontFamily: checkboxFont,
  },
})
