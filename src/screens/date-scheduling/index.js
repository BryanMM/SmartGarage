import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

class ListItem extends React.PureComponent {
  render() {
    const { item } = this.props
    return (
      <TouchableOpacity style={styles.gridItem}>
        <View style={styles.gridItem} backgroundColor='#7dceff'>
          <View>
            <Text style={styles.title}> {item.hour} </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
export default class dateScheduling extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props) {
    super(props);
    this.state = {
      schedulingDate: this.props.navigation.state.params.bookingDate,
      hours: [
        {
          hour: "2:00pm"
        },
        {
          hour: "3pm"
        },
        {
          hour: "4pm"
        },
        {
          hour: "5pm"
        },
        {
          hour: "6pm"
        },
        {
          hour: "7pm"
        }
      ]
    }
  }

  _onPressBack() {
    const { goBack } = this.props.navigation
    goBack()
  }

  _scheduleParking(status, key, value) {
    const month = this.state.bookingDate.month
    const date = this.state.bookingDate.day
  }
  _keyExtrator = index => index.toString()

  _renderItem = ({ item, index }) => {
    return (
      <ListItem
        index={index}
        item={item}
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    return (
      <View style={styles.homeBackground}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Press the hour where you'll schedule your parking</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.grid}
          data={this.state.hours}
          keyExtractor={this._keyExtrator}
          numColumns={2}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  homeBackground: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%'
  },
  banner: {
    backgroundColor: '#161D25',
    height: 60,
    width: '100%',
  },
  bannerText: {
    color: '#cfedfc',
    fontFamily: 'Roboto',
    fontSize: 20,
    paddingTop: 15,
    textAlign: 'center',
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
  },
  gridItem: {
    alignItems: 'center',
    borderRadius: 300,
    borderWidth: 2,
    height: 170,
    justifyContent: 'center',
    margin: 15,
    width: 170,
  },
  title: {
    color: '#161D25',
    fontFamily: 'Roboto',
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: 15,
    textAlign: 'center',
  },
});