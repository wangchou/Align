import {
  Dimensions,
} from 'react-native'

import {
  EMPTY_CHECKBOX1,
  EMPTY_CHECKBOX2,
  emptyCheckboxColor1,
  emptyCheckboxColor2,
  CHECKED_CHECKBOX1,
  CHECKED_CHECKBOX2,
  checkedCheckboxColor1,
  checkedCheckboxColor2,
  transparentColor,
  checkboxFont,
  textFont,
} from '../../constants'

import {
  windowWidth,
  windowHeight,
  getFontSize,
} from '../../utils/misc'

export const getStyles = (fontScale, numberOfLines) => {
  const fontSize = getFontSize(fontScale)

  const baseText = {
    fontSize,
    lineHeight: fontSize*1.5,
    fontWeight: '300',
    fontFamily: textFont,
  }

  const baseStyle = {
    ...baseText,
    width: windowWidth - 20,
    height: baseText.lineHeight * (numberOfLines + 0.2),
    borderColor: 'rgba(200, 200, 200, 1.0)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    textAlign: 'justify',
  }

  return ({
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
    [EMPTY_CHECKBOX1]: {
      ...baseText,
      fontFamily: checkboxFont,
      color: emptyCheckboxColor1,
    },
    [CHECKED_CHECKBOX1]: {
      ...baseText,
      fontFamily: checkboxFont,
      color: checkedCheckboxColor1,
    },
    [EMPTY_CHECKBOX2]: {
      ...baseText,
      fontFamily: checkboxFont,
      color: emptyCheckboxColor2,
    },
    [CHECKED_CHECKBOX2]: {
      ...baseText,
      fontFamily: checkboxFont,
      color: checkedCheckboxColor2,
    },
  })
}
