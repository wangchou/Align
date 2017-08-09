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
            2016
          </Text>
          <Text style={styles.yearView}>
            2017
          </Text>
          <Text style={styles.yearView}>
            2018
          </Text>
        </ScrollView>
        <Text style={styles.monthView}>
          2017-8
        </Text>
        <Text style={styles.dayView}>
          2017-8-9 水
        </Text>
      </ScrollView>
    );
  }
}

const fullWidth = Dimensions.get('window').width;
const pageHeight = 400;
const semiBold = "600";
const styles = StyleSheet.create({
  yearViewContainer: {
    height: pageHeight,
    marginTop: 20,
    marginBottom: 5,
  },
  yearView: {
    width: fullWidth,
    padding: 8,
    fontSize: 16,
    fontWeight: semiBold,
    backgroundColor: '#F5FCF0',
  },
  monthView: {
    height: pageHeight,
    padding: 8,
    fontSize: 16,
    fontWeight: semiBold,
    marginBottom: 5,
    backgroundColor: '#F5ECFF',
  },
  dayView: {
    height: pageHeight,
    padding: 8,
    fontSize: 16,
    fontWeight: semiBold,
    backgroundColor: '#E5FCFF',
  },
});

AppRegistry.registerComponent('OnigiriNote', () => OnigiriNote);
