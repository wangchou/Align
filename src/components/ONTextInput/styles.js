import {
  StyleSheet,
  Dimensions,
} from 'react-native'

import {
  EMPTY_CHECKBOX,
  CHECKED_CHECKBOX,
  checkedCheckboxColor,
  emptyCheckboxColor,
  transparentColor,
  checkboxFont,
  textFont,
} from '../../constants'

// Component Styles
const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height
const baseText = {
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '300',
  fontFamily: textFont,
}

const baseStyle = {
  ...baseText,
  width: windowWidth - 20,
  height: baseText.lineHeight * 10,
  borderColor: 'rgba(200, 200, 200, 1.0)',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  textAlign: 'justify',
}

export const styles = StyleSheet.create({
  underTextInput: {
    ...baseStyle,
    marginTop: 5,
    color: 'rgba(32, 32, 32, 0)',
    zIndex: -1,
  },
  topCustomText: {
    ...baseStyle,
    position: 'absolute',
    top: 0,
    paddingTop: 5,
    marginTop: 5,
    color: 'rgba(32, 32, 32, 1.0)',
    zIndex: 1,
  },
  text: {
    ...baseText,
  },
  transparentText: {
    ...baseText,
    color: transparentColor,
  },
  transparentCheckbox: {
    ...baseText,
    fontFamily: checkboxFont,
    color: transparentColor,
  },
  [EMPTY_CHECKBOX]: {
    ...baseText,
    fontFamily: checkboxFont,
    color: emptyCheckboxColor,
  },
  [CHECKED_CHECKBOX]: {
    ...baseText,
    fontFamily: checkboxFont,
    color: checkedCheckboxColor,
  },
})
