import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default class ParkingScheduling extends Component {
  static navigationOptions = ({
    header: null
  });

  constructor(props) {
    super(props);
    this._onDayPress = this._onDayPress.bind(this);
    this.state = {};
  }
  _onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
    this.props.navigation.navigate('dateScheduling', { schedulingDay: day })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Pick a date and schedule your parkings</Text>
        </View>
        <Calendar
          displayLoadingIndicator
          markingType={'dot'}
          minDate={'2012-05-10'}
          onDayPress={this._onDayPress}
          style={styles.calendar}
          theme={{
            arrowColor: 'black',
            calendarBackground: 'white',
            dayTextColor: 'black',
            monthTextColor: 'black',
            selectedDayBackgroundColor: '#cfedfc',
            selectedDayTextColor: '#cfedfc',
            textSectionTitleColor: 'black',
            todayTextColor: 'blue',
            'stylesheet.calendar.header': {
              week: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }
            }
          }}
          hideArrows={false}
          markedDates={{ [this.state.selected]: { selected: true } }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  calendar: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 350,
    paddingTop: 5,
  },
});
