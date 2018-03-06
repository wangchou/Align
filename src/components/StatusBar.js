import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'

export default class StatusBar extends Component {
  render() {
    const { leftText, rightText, percentage } = this.props;
    const styles = {
      container: {
        width: windowWidth,
        height: windowHeight/9,
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
      },
      leftText: {
        fontFamily: 'PingFang TC',
        color: 'rgba(255, 255, 255, 1)',
        position: 'absolute',
        top: hgrid,
        left: grid + hgrid/2,
        fontSize,
        zIndex: 1,
      },
      rightText: {
        fontFamily: 'PingFang TC',
        color: 'rgba(255, 255, 255, 1)',
        position: 'absolute',
        top: hgrid,
        right: grid + hgrid/2,
        fontSize,
        zIndex: 1,
      },
      bar: {
        position: 'absolute',
        top: hgrid*3,
        left: grid,
        width: windowWidth - (grid * 2),
        height: hgrid,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderRadius: hgrid/2,
        zIndex: -3,
      },
      innerBackgroundBar: {
        position: 'absolute',
        top: hgrid*3 + statusBarBorderness,
        left: grid + statusBarBorderness,
        width: windowWidth - (grid * 2) - 2 *statusBarBorderness,
        height: hgrid - 2 * statusBarBorderness,
        backgroundColor: 'rgba(100, 100, 100, 1)',
        borderRadius: hgrid/2 - statusBarBorderness,
        zIndex: -2,
      },
      innerProgressBar: {
        position: 'absolute',
        top: hgrid*3 + statusBarBorderness,
        left: grid + statusBarBorderness,
        width: (windowWidth - (grid * 2) - 2 *statusBarBorderness) * percentage,
        height: hgrid - 2 * statusBarBorderness,
        backgroundColor: 'rgba(60, 150, 60, 1)',
        borderRadius: hgrid/2 - statusBarBorderness,
        zIndex: -1,
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

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const grid = windowWidth / 25
const hgrid = windowHeight / 50
const statusBarBorderness = 1.5
const fontSize = grid*1.5
