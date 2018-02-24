import React from 'react'
import {
  View,
} from 'react-native'
import UnderTextInput from './UnderTextInput'
import TopTextOverlay from './TopTextOverlay'

export default ONTextInput = props => (
  <View>
    <UnderTextInput {...props} />
    <TopTextOverlay {...props} />
  </View>
)
