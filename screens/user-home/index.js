import * as React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import ParkingAssistance from '../../assets/parkingAssistance.png';
import GarageObstruction from '../../assets/garageObstruction.png';
import schedParking from '../../assets/schedParking.png';

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index)
  }
  render () {
    const { item } = this.props
    return (
      <TouchableHighlight underlayColor = '#dddddd'
        onPress = {this._onPress}>
        <View style = {styles.rowContainer}>
        <Image style = {styles.thumbnail} source = { item.image } />
          <View style = {styles.textContainer}>
            <Text styles = {styles.title} numberOflLines = {1}> {item.title}</Text>
          </View>
          <View style = {styles.separator}>
          </View>
        </View>
      </TouchableHighlight>
      
    )
  }
}
export default class UserLogin extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });

    constructor(props) {
        super(props);
        this.state = {
          gridItems: [
              { 
                title: 'Check for obstacles at the entrance',
                image: GarageObstruction
              },
              { 
                title: 'Parking assistance',
                image: ParkingAssistance
              },
              { 
                title: 'Program an automatic garage opening',
                image: schedParking
              },
          ]
        };
      }
    
    _keyExtrator = (item, index) => index.toString()

    _renderItem = ({ item, index }) => {
      return ( 
        <ListItem
          item = {item}
          index = {index}
        />
      )
    }

    render () {       
        return (
            <View style = { styles.gridBackground }>
                <FlatList 
                    data = { this.state.gridItems } 
                    keyExtractor={this._keyExtrator}
                    renderItem = { this._renderItem }
                    numColumns = {2}
                /> 
            </View>          
        );
    }
}

const styles = StyleSheet.create({
  thumbnail : {
    width: 80,
    height: 80,
    marginRight :10
  },
  textContainer : {
    flex: 1,
  },
  separator : {
    height: 1,
    backgroundColor: "#dddddd"
  },
  price : {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#488BEC"
  },
  title : {
    fontSize: 20,
    color: "#656565"
  },
  rowContainer : {
    flexDirection: 'row',
    padding: 10
  }
  });