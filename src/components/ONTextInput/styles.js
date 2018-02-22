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
const baseText = {
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '300',
  fontFamily: 'PingFang TC',
}
const baseStyle = {
  ...baseText,
  width: windowWidth - 20,
  height: baseText.lineHeight * 15,
  borderColor: 'rgba(200, 200, 200, 1.0)',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  textAlign: 'justify',
}
export const styles = StyleSheet.create({
  underTextInput: {
    ...baseStyle,
    marginTop: 5,
    color: 'rgba(32, 32, 32, 0)',
  },
  topCustomText: {
    ...baseStyle,
    position: 'absolute',
    top: 0,
    paddingTop: 5,
    marginTop: 5,
    color: 'rgba(32, 32, 32, 1.0)',
  },
  text: {
    ...baseText,
  },
  [EMPTY_CHECKBOX]: {
    ...baseText,
    fontFamily: 'circle-checkbox',
    color: emptyCheckboxColor,
  },
  [CHECKED_CHECKBOX]: {
    ...baseText,
    fontFamily: 'circle-checkbox',
    color: checkedCheckboxColor,
  },
})
