import * as React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import iconGarageObstruction from '../../assets/garageObstruction.png';
import iconParkingAssistance from '../../assets/parkingAssistance.png';
import iconScheduleParking from '../../assets/schedParking.png';
import iconGarageDoor from '../../assets/garageDoor.png'

class ListItem extends React.PureComponent {
  render() {
    const { item } = this.props
    const { navigation } = this.props
    return (
      <TouchableHighlight style={styles.gridItem}
        onPress={() => navigation.navigate(item.tag)}>
        <View style={styles.gridItem} backgroundColor='#7dceff'>
          <View>
            <Text style={styles.title}> {item.title} </Text>
          </View>
          <Image style={styles.thumbnail} source={item.image} />
          <View />
        </View>
      </TouchableHighlight>
    )
  }
}
export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      gridItems: [
        {
          image: iconParkingAssistance,
          tag: 'parkingAssistance',
          title: 'Parking \n Assistance'
        },
        {
          image: iconGarageObstruction,
          tag: 'checkObstructions',
          title: 'Check for obstacles \n at the entrance'
        },
        {
          image: iconScheduleParking,
          tag: 'parkingSchedule',
          title: 'Schedule your parkings!'
        },
        {
          image: iconGarageDoor,
          tag: 'openGarage',
          title: 'Open the garage\'s door'
        }
      ]
    };
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
          <Text style={styles.bannerText}>Tap an icon and navigate through the menus</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.grid}
          data={this.state.gridItems}
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
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 15,
    textAlign: 'center',
  },
  thumbnail: {
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 1.5,
    height: 100,
    width: 130
  },
});