import {
  StyleSheet,
  Dimensions,
} from 'react-native'

import {
  EMPTY_CHECKBOX,
  CHECKED_CHECKBOX,
  checkedCheckboxColor,
  emptyCheckboxColor,
} from '../../constants'

// Component Styles
const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height
const fontSize = 16
const baseStyle = {
  width: windowWidth - 20,
  height: fontSize * 15,
  fontSize,
  fontWeight: '300',
  fontFamily: 'circle-checkbox',
  borderColor: 'rgba(200, 200, 200, 1.0)',
  textAlign: 'justify',
}
export const styles = StyleSheet.create({
  underTextInput: {
    ...baseStyle,
    marginTop: 5,
    color: 'rgba(32, 32, 32, 0.3)',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  topCustomText: {
    ...baseStyle,
    position: 'absolute',
    top: 0,
    paddingTop: 5,
    marginTop: 5,
    color: 'rgba(32, 32, 32, 1.0)',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  [EMPTY_CHECKBOX]: {
    fontFamily: baseStyle.fontFamily,
    color: emptyCheckboxColor,
  },
  [CHECKED_CHECKBOX]: {
    fontFamily: baseStyle.fontFamily,
    color: checkedCheckboxColor,
  },
})
