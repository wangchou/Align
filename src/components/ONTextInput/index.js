import React from 'react'
import {
  View,
} from 'react-native'
import UnderTextInput from './UnderTextInput'
import TopTextOverlay from './TopTextOverlay'

export default (props) => {
  const { dataKey, inputRef, bookId } = props
  return (
    <View>
      <UnderTextInput dataKey={dataKey} inputRef={inputRef} bookId={bookId}/>
      <TopTextOverlay dataKey={dataKey} />
    </View>
  )
}
