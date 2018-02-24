import React from 'react'
import {
  View,
} from 'react-native'
import UnderTextInput from './UnderTextInput'
import TopTextOverlay from './TopTextOverlay'

export default (props) => {
  const { dataKey, bookId } = props
  return (
    <View>
      <UnderTextInput dataKey={dataKey} bookId={bookId} />
      <TopTextOverlay dataKey={dataKey} bookId={bookId} />
    </View>
  )
}
