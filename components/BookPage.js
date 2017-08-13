import React, { Component } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class BookPage extends Component {
  constructor(props) {
     super(props);
     this.state = {
       text: "haha"
     };
  }
  render() {
    const {moment, bookId, bookFormat} = this.props;
    const title = moment.format(bookFormat);
    return (
      <View style={styles.pageView}>
        <Text style={styles.pageTitle}>
          {title}
        </Text>
        <TextInput
          multiline={true}
          style={styles.pageContent}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
}

const pageHeight = 400;
const titleHeight = 20;
const semiBold = "600";
const light="300";
const styles = StyleSheet.create({
  pageView: {
    width: windowWidth,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  pageTitle: {
    height: titleHeight,
    fontFamily: 'PingFang TC',
    fontSize: 16,
    fontWeight: semiBold,
  },
  pageContent: {
    height: pageHeight - titleHeight - 15,
    textAlign: 'justify',
    marginTop: 5,
    borderColor: 'rgba(200, 200, 200, 1.0)',
    // borderWidth: 0.5,
    fontFamily: 'PingFang TC',
    fontSize: 16,
    fontWeight: light,
    color: 'rgba(32, 32, 32, 1.0)',
  }
});
