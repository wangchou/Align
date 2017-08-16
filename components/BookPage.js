import React, { Component } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {setData} from '../actions/pageData';

const windowWidth = Dimensions.get('window').width;

@connect((state, props) => ({
  pageData: state.pageData[props.dataKey] || ""
}), {
  setData
})
export default class BookPage extends Component {
  constructor(props) {
     super(props);
     this.state = {
       text: props.pageData
     };
  }

  componentWillReceiveProps(props) {
    this.setState({text: props.pageData});
  }

  render() {
    const { title, dataKey, setData } = this.props;
    return (
      <View style={styles.pageView}>
        <Text style={styles.pageTitle}>
          {title}
        </Text>
        <TextInput
          ref={textInput => this.textInput = textInput}
          multiline
          style={styles.pageContent}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          onEndEditing={() => setData(dataKey, this.state.text)}
          onFocus={e => {
            this.textInput.measure((ox, oy, width, height, px, py) => {
              focusedInputOY = oy;
              focusedInputPY = py;
              focusedInputHeight = height;
            });
          }}
        />
      </View>
    );
  }
}

const pageHeight = 300;
const titleHeight = 22;
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
