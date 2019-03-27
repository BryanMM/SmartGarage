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
      <TouchableHighlight  Color = '#ffffff' justifyContent = 'center'
        onPress = {this._onPress}>
        <View>
            <View style = { styles.textContainer }>
              <Text styles = { styles.title }> { item.title } </Text>
            </View>
            <Image style = { styles.thumbnail } source = { item.image } />       
            <View style = { styles.separator }/> 
        </View>
      </TouchableHighlight>
      
    )
  }
}
export default class UserLogin extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      Color: '#161D25',
      title: `welcome ${ navigation.state.params.title }!`,  
    });

    constructor(props) {
        super(props);
        this.state = {
          gridItems: [
              { 
                title: 'Check for obstacles \n at the entrance',
                image: GarageObstruction
              },
              { 
                title: 'Parking assistance',
                image: ParkingAssistance
              },
              { 
                title: 'Program an automatic \n garage opening',
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
            <View style = { styles.homeBackground }>
                <FlatList 
                    data = { this.state.gridItems } 
                    keyExtractor={ this._keyExtrator }
                    renderItem = { this._renderItem }
                    numColumns = { 2 }
                /> 
            </View>          
        );
    }
}

const styles = StyleSheet.create({
  header : {
    width: '100%',
    height: '20%',

  },
  headerImage: {
    width: '100%',
    height: '20%'
  },
  homeBackground : {
    paddingTop: 120,
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
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
    alignSelf: 'center',
    width: 130,
    height: 130,
    marginRight :10,
    alignSelf: 'center'
  },
  });