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
      <TouchableHighlight  style = { styles.gridItem }
        onPress = {this._onPress}>
        <View style = { styles.gridItem } backgroundColor = '#cfedfc'>
            <View style = { styles.textContainer }>
              <Text style = { styles.title }> { item.title } </Text>
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
      title: `welcome ${ navigation.state.params.title }`,  
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
                  contentContainerStyle = {styles.grid}
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
  grid: {
    justifyContent: 'center',
    flex: 1,
  },
  gridItem: {
    margin:15,
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header : {
    width: '100%',
    height: '20%',

  },
  headerImage: {
    width: '100%',
    height: '20%'
  },
  homeBackground : {
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
    height: '100%',
    backgroundColor: '#cfedfc',
  },
  textContainer : {
    flex: 1,
  },
  title : {
    fontSize: 18,
    color: '#161D25',
    fontWeight: 'bold',
    paddingBottom: 15,
    textAlign:'center',
  },
  thumbnail : {
    alignSelf: 'center',
    width: 130,
    height: 130,
    borderWidth: 1.5, 
    //borderColor: 'white',
    borderRadius: 50,
  },
  });