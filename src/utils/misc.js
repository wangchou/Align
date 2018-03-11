import {
  Dimensions,
} from 'react-native'
import moment from 'moment'

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height
export const getFontSize = fontScale => (windowWidth / 20) * fontScale
export const getTitleHeight = fontScale => getFontSize(fontScale) * (5 / 4)

export const getTodayStr = () => moment().format('MMMM Do YYYY')
