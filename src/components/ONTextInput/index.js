import React from 'react'
import {
  View,
} from 'react-native'
import UnderTextInput from './UnderTextInput'
import TopTextOverlay from './TopTextOverlay'

export default (props) => {
  const { dataKey, inputRef } = props
  return (
    <View>
      <UnderTextInput dataKey={dataKey} inputRef={inputRef}/>
      <TopTextOverlay dataKey={dataKey} />
    </View>
  )
}
