import {
  EMPTY_CHECKBOX1,
  CHECKED_CHECKBOX1,
  EMPTY_CHECKBOX2,
  CHECKED_CHECKBOX2,
} from '../../constants'

export const isCheckbox = ch => (ch === EMPTY_CHECKBOX1 || ch === CHECKED_CHECKBOX1 ||
                                 ch === EMPTY_CHECKBOX2 || ch === CHECKED_CHECKBOX2)
export const toggleCheckbox = ch => {
  if(ch === EMPTY_CHECKBOX1) {
    return CHECKED_CHECKBOX1
  }
  if(ch === EMPTY_CHECKBOX2) {
    return CHECKED_CHECKBOX2
  }
  if(ch === CHECKED_CHECKBOX1) {
    return EMPTY_CHECKBOX1
  }
  if(ch === CHECKED_CHECKBOX2) {
    return EMPTY_CHECKBOX2
  }
  return 'undefined'
}

const checkboxs=`${EMPTY_CHECKBOX1}${CHECKED_CHECKBOX1}${EMPTY_CHECKBOX2}${CHECKED_CHECKBOX2}`
const checkboxsOR=`${EMPTY_CHECKBOX1}|${CHECKED_CHECKBOX1}|${EMPTY_CHECKBOX2}|${CHECKED_CHECKBOX2}|`
const checkboxOrTextReg = new RegExp(`${checkboxsOR}[^${checkboxs}]+`, 'g')
export const getTextChilds = text => text.match(checkboxOrTextReg) || ["\ufffc"]
