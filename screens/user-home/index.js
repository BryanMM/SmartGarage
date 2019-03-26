import * as React from 'react';
import {
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
        <View>
        <View style = {styles.separator}/>
        <Image style = {styles.thumbnail} source = { item.image } />
          <View style = {styles.textContainer}>
            <Text styles = {styles.title}> {item.title}</Text>
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
            <View>
                <View style = { styles.header } />
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
  header : {
    backgroundColor: "red",
    width: '100%',
    height: '20%'

  },
  separator : {
    height: 20,
  },
  textContainer : {
    alignSelf: 'center',
    //flex: 1,
  },
  title : {
    fontSize: 20,
    color: "#656565"
  },
  thumbnail : {
    justifyContent: 'space-around',
    width: 180,
    height: 180,
    marginRight :10,
    alignSelf: 'center'
  },
  });