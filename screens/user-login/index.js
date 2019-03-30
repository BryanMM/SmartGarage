import * as React from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import smartGarage from '../../assets/smartGarage.png';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class UserLogin extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userEmail: '',
      userPassword: '',
    };
  }

  _onLoginPressed = () => {
    if (
      this.state.userEmail == 'Bryan' &&
      this.state.userPassword == ''
    ) {
      this.props.navigation.navigate('Home', { title: this.state.userEmail } );
    } else {
      alert('Usuario y/o contraseña incorrecta, intente de nuevo');
    }
  };

  _onUserTextChanged = event => {
    this.setState({
      userEmail: event.nativeEvent.text,
    });
  };

  _onPasswordTextChanged = event => {
    this.setState({
      userPassword: event.nativeEvent.text,
    });
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;
    return (
      <View style={ styles.container }>
        <View style = { styles.header }>
        <Image style = { styles.headerImage } source = { smartGarage } />  
        </View>
        <Text style={styles.description} />
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            placeholder=" Type here your email "
            value={this.state.userEmail}
            onChange={this._onUserTextChanged}
            placeholderTextColor="#cfedfc"
          />
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            placeholder="Type here your password"
            value={this.state.userPassword}
            onChange={this._onPasswordTextChanged}
            placeholderTextColor="#cfedfc"
          />
        </View>
        <TouchableOpacity style = {styles.loginButton}
                            onPress = {this._onLoginPressed} >
              <Text style = {styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText :{
    color: '#161D25',
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontWeight: '700',
  },
  container : {
    alignItems: 'center',
    backgroundColor: '#161D25',
    height: '100%',
    width: '100%',
  },
  flowRight : {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    color: '#656565',
  },
  header : {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  headerImage: {
    position: 'absolute',
    width: 300,
    height: 100
  },
  loginButton : {
    width: '100%',
    backgroundColor: '#cfedfc',
    paddingHorizontal: 160,
    paddingVertical: 15
  },
  searchInput: {
    fontFamily: 'Roboto',
    height: 50,
    width: '80%',
    padding: 10,
    margin: 5,
    flexGrow: 1,
    fontSize: 23,
    borderWidth: 2,
    borderColor: '#cfedfc',
    borderRadius: 8,
    color: '#cfedfc',
  },
});
