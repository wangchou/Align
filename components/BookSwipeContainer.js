import React, { Component } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
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
    const pageViews = [-1, 0, 1]
      .map(shift => bookModel.moment.clone().add(shift, bookModel.unit))
      .map(moment => {
        const key = bookModel.id + moment.format('YYYY MMM DD');
        const title = moment.format(bookModel.format);
        return (
          <View key={key} style={styles.pageView}>
            <Text style={styles.pageTitle} key={key+'title'}>
              {title}
            </Text>
            <TextInput
              multiline={true}
              style={styles.pageContent}
              value={"hhha\nssss"}
            />
          </View>
        )
      });

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
        {pageViews}
      </ScrollView>
    );
  }
}

const pageHeight = 400;
const titleHeight = 20;
const semiBold = "600";
const light="300";
const styles = StyleSheet.create({
  swipeContainer: {
    height: pageHeight,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(155, 155, 155, 0.5)',
    marginBottom: 5,
  },
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
