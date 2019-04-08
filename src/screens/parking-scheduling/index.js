import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default class ParkingSchedulingScreen extends Component {
  static navigationOptions = ({
    header: null
  });
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Pick a date and schedule your parkings</Text>
        </View>
        <Calendar
          style={styles.calendar}
          minDate={'2012-05-10'}
          displayLoadingIndicator
          markingType={'dot'}
          theme={{
            calendarBackground: 'white',
            textSectionTitleColor: 'black',
            dayTextColor: 'black',
            todayTextColor: 'blue',
            selectedDayTextColor: '#cfedfc',
            monthTextColor: 'black',
            selectedDayBackgroundColor: '#cfedfc',
            arrowColor: 'black',
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            }
          }}
          markedDates={{
          }}
          hideArrows={false}
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
    width: '100%',
    height: 60,
    backgroundColor: '#161D25'
  },
  bannerText: {
    color: '#cfedfc',
    paddingTop: 15,
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'center',
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    height: 350
  },
});
