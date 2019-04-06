import * as React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import IconGarageObstruction from '../../assets/garageObstruction.png';
import IconParkingAssistance from '../../assets/parkingAssistance.png';
import IconScheduleParking from '../../assets/schedParking.png';
import IconSettings from '../../assets/settings.png';
import IconSmartGarage from '../../assets/smartGarage.png';

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
    title: `Welcome ${navigation.state.params.title}`,
    headerStyle: {
      backgroundColor: '#161D25',
    },
    headerTintColor: '#cfedfc',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      gridItems: [
        {
          image: IconSmartGarage,
          tag: 'Garage',
          title: 'SmartGarage'
        },
        {
          image: IconSettings,
          tag: 'Settings',
          title: 'Settings'
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
  homeBackground: {
    alignItems: 'center',
    backgroundColor: '#cfedfc',
    height: '100%',
    paddingTop: 20,
    width: '100%'
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
  },
});