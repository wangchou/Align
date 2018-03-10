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
} from 'constants'
import {
  getNextPageId,
  getSiblingPageId,
  getPreviousPageId,
} from 'utils/books'
import {
  getFontSize,
} from 'utils/books'

const checkboxWithContentReg = new RegExp(`[${CHECKBOXS}] [^${CHECKBOXS}]*[^${CHECKBOXS} \t\n]+`, 'g')
export const getTodoChilds = text => ((text && text.match(checkboxWithContentReg)) || [])
  .map(todo => todo.replace(CHECKED_CHECKBOX1, EMPTY_CHECKBOX1))
  .map(todo => todo.replace(CHECKED_CHECKBOX2, EMPTY_CHECKBOX2))


@connect(state => ({
  pages: state.pages,
  focusedPageId: state.ui.focusedPageId,
}), {
})
export default class RecentTodos extends Component {
  render() {
    const {pages, focusedPageId} = this.props
    const todoCounts = {}

    for(let shift = -6; shift < 4; shift++) {
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
    const todoBars = Object.keys(todoCounts)
      .map(key => ({str: key, count: todoCounts[key]}))
      .sort((a, b) => a.count < b.count)
      .slice(0, 8)
      .reverse()
      .map(todoObj => {
        const checkbox = todoObj.str.charAt(0)
        const restStr = todoObj.str.slice(1)
        return (
          <View
            key={todoObj.str}
            style={styles.todoBar}
          >
            <Text style={{fontFamily: textFont}}>
              <Text style={styles[checkbox]}>
                {checkbox}
              </Text>
              <Text>
                {restStr}
              </Text>
            </Text>
          </View>
        )
      })

    return (
      <View style={styles.container}>
        {todoBars}
      </View>
    )
  }
}

// Component Styles
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    height: 245,
    width: windowWidth/2,
    borderColor: 'rgba(155, 155, 155, 0.3)',
    borderWidth: 0.5,
    position: 'absolute',
    top: -250,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  todoBar: {
    width: windowWidth/2 - 10,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 24,
    height: 30,
    paddingTop: 5,
    paddingBottom: 5,
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
