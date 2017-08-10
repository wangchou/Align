import React, { Component } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class BookSwipeContainer extends Component {
  constructor(props) {
    super(props);
    this._scrollView = null;
    this.scrollToCenterPage = () => {
      this._scrollView.scrollTo({
        x: windowWidth,
        animated: false
      });
    }
  }

  componentDidMount() {
    this.scrollToCenterPage();
  }

  componentDidUpdate() {
    this.scrollToCenterPage();
  }

  render() {
    const bookModel = this.props.bookModel;
    const keys = [-1, 0, 1]
      .map(shift => bookModel.moment.clone().add(shift, bookModel.unit))
      .map(moment => moment.format(bookModel.format));

    return (
      <ScrollView
        ref={(scrollView) => {this._scrollView = scrollView}}
        style={styles.swipeContainer}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        onMomentumScrollEnd= {(event) => {
          const indexChange = event.nativeEvent.contentOffset.x/windowWidth - 1;
          bookModel.moment.add(indexChange, bookModel.unit);
          this.forceUpdate();
        }}
      >
        {keys.map(key => (
          <Text key={key} style={styles.pageView}>
            {key}
          </Text>
        ))}
      </ScrollView>
    );
  }
}

const pageHeight = 400;
const semiBold = "600";
const styles = StyleSheet.create({
  swipeContainer: {
    height: pageHeight,
    marginBottom: 5,
  },
  pageView: {
    width: windowWidth,
    padding: 10,
    fontSize: 16,
    fontWeight: semiBold,
    backgroundColor: '#FAFAFA',
    borderWidth: 0.5,
    borderColor: 'rgba(155, 155, 155, 0.5)'
  }
});
