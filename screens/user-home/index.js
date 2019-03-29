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
import settings from '../../assets/settings.png';

class ListItem extends React.PureComponent {
  _onPress = (nextView) => {
    this.props.navigation.navigate( `${nextView}` );
  }
  render () {
    const { item } = this.props
    const { navigation } = this.props
    return (
      <TouchableHighlight  style = { styles.gridItem }
        onPress = {() => navigation.navigate(item.tag)}>
        <View style = { styles.gridItem } backgroundColor = '#7dceff'>
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
export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: `Welcome ${ navigation.state.params.title }`,  
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
                title: 'Check for obstacles',
                image: GarageObstruction,
                tag: 'Obstruction'
              },
              { 
                title: 'Parking assistance',
                image: ParkingAssistance,
                tag: 'Assistance'
              },
              { 
                title: 'Automatic \n garage opening',
                image: schedParking,
                tag: 'Schedule'
              },
              {
                title: 'Settings',
                image: settings,
                tag: 'Settings'
              }
          ]
        };
      }
    
    _keyExtrator = ( index ) => index.toString()

    _renderItem = ({ item, index }) => {
      return ( 
        <ListItem
          navigation = {this.props.navigation}
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
    borderWidth: 2, 
    borderRadius: 300,
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
  },
  title : {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#161D25',
    fontWeight: 'bold',
    paddingBottom: 15,
    textAlign:'center',
  },
  thumbnail : {
    alignSelf: 'center',
    width: 130,
    height: 100,
    borderWidth: 1.5, 
    borderRadius: 50,
  },
  });