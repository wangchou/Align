import immutable from 'object-path-immutable'
import { SET_PAGE_DATA } from '../constants'

const intitialState = {}

export default (state = intitialState, action) => {
  switch (action.type) {
    case SET_PAGE_DATA:
      return immutable.set(state, [action.payload.dataKey], action.payload.data)
  }
  return state
}
