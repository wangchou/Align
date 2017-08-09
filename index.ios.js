/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  View
} from 'react-native';

export default class OnigiriNote extends Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          style={styles.yearViewContainer}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Text style={styles.yearView}>
            2016年
          </Text>
          <Text style={styles.yearView}>
            2017年
          </Text>
          <Text style={styles.yearView}>
            2018年
          </Text>
        </ScrollView>
        <Text style={styles.monthView}>
          2017年8月
        </Text>
        <Text style={styles.dayView}>
          2017年8月9日 水
        </Text>
      </ScrollView>
    );
  }
}

const fullWidth = Dimensions.get('window').width;
const pageHeight = 400;
const semiBold = "600";
const basicViewStyle = {
  padding: 10,
  fontSize: 16,
  fontWeight: semiBold,
  backgroundColor: '#FAFAFA',
  borderWidth: 0.5,
  borderColor: 'rgba(155, 155, 155, 0.5)'
};

const styles = StyleSheet.create({
  yearViewContainer: {
    height: pageHeight,
    marginBottom: 5,
  },
  yearView: {
    ...basicViewStyle,
    paddingTop: 20,
    width: fullWidth,
  },
  monthView: {
    ...basicViewStyle,
    height: pageHeight,
    marginBottom: 5,
  },
  dayView: {
    ...basicViewStyle,
    height: pageHeight,
  },
});

AppRegistry.registerComponent('OnigiriNote', () => OnigiriNote);
