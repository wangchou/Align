import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const grid = windowWidth / 25
const hgrid = windowHeight / 50
const statusBarBorderness = 1.5
const fontSize = grid*1.5
const barHeight = hgrid
const textBaseStyle = {
  fontFamily: 'PingFang TC',
  position: 'absolute',
  top: hgrid*0.6,
  fontSize,
  zIndex: 1,
}
const barBaseStyle = {
  position: 'absolute',
  top: hgrid*2.8,
  left: grid,
  width: windowWidth - (grid * 2),
  height: barHeight,
  backgroundColor: 'rgba(0, 0, 0, 1)',
  borderRadius: hgrid/2,
  zIndex: -3,
}
const innerBarStyle = {
  position: barBaseStyle.position,
  top: barBaseStyle.top + statusBarBorderness,
  left: barBaseStyle.left+ statusBarBorderness,
  width: barBaseStyle.width - 2 * statusBarBorderness,
  height: barBaseStyle.height - 2 * statusBarBorderness,
  borderRadius: barBaseStyle.borderRadius - statusBarBorderness,
}
export default class StatusBar extends Component {
  render() {
    const {
      leftText,
      rightText,
      percentage,
      barColor,
      barBackgroundColor,
    } = this.props;
    const styles = {
      container: {
        width: windowWidth,
        height: windowHeight/9,
      },
      leftText: {
        ...textBaseStyle,
        left: grid ,
      },
      rightText: {
        ...textBaseStyle,
        right: grid,
      },
      bar: {
        ...barBaseStyle
      },
      innerBackgroundBar: {
        ...innerBarStyle,
        backgroundColor: barBackgroundColor ? barBackgroundColor : 'rgba(240, 240, 240, 0.4)',
        zIndex: barBaseStyle.zIndex + 1,
      },
      innerProgressBar: {
        ...innerBarStyle,
        width: innerBarStyle.width * percentage,
        backgroundColor: barColor ? barColor : 'rgba(240, 240, 240, 1)',
        zIndex: barBaseStyle.zIndex + 2,
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.leftText}>{leftText}</Text>
        <Text style={styles.rightText}>{rightText}</Text>
        <View style={styles.bar} />
        <View style={styles.innerBackgroundBar} />
        <View style={styles.innerProgressBar} />
      </View>
    )
  }
}

