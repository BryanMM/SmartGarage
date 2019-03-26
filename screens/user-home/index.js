import * as React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class UserLogin extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });

    constructor(props) {
        super(props);
        this.state = {
          userName: '',
          gridItems: [
              { title: 'Check for obstacles at the entrance',
                image: 
              },
              { key: 'Parking assistance' },
              { key: 'Program an automatic garage opening'},
          ]
        };
      }

    _renderItem = ({ item}) => {
        return ( 
            <View style={styles.gridBackground}>
               <Text style={styles.gridSquare}> 
               {item.key} 
               </Text>
            </View>
          
        )
      }

    render () {       
        return (
            <View style = { styles.gridBackground }>
                <FlatList 
                    style = { styles.gridSquare }
                    data = { this.state.gridItems } 
                    renderItem = { this._renderItem }
                    numColumns = {2}
                /> 
            </View>          
        );
    }
}

const styles = StyleSheet.create({
    gridBackground: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 20
    },
    gridSquare: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
  });