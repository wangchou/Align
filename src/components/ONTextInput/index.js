import React from 'react'
import {
  View,
} from 'react-native'
import UnderTextInput from './UnderTextInput'
import TopTextOverlay from './TopTextOverlay'

export default (props) => {
  const { pageId, bookId } = props
  return (
    <View>
      <UnderTextInput bookId={bookId} pageId={pageId}  />
      <TopTextOverlay bookId={bookId} pageId={pageId}  />
    </View>
  )
}
