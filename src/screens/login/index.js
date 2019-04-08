import * as React from 'react';
import {
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
    fetch('http://192.168.8.101:4000/users/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.userEmail,
        password: this.state.userPassword
      }),
    }).then((response) => {
      if (response.ok == true){
        this.props.navigation.navigate('Home', { title: this.state.userEmail });
      }else{
        alert('Username or password is incorrect')
      }
    })
      .catch((error) => {
        alert(error);
      });

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
            onChange={this._onUserTextChanged}
            placeholder="Email "
            placeholderTextColor="#cfedfc"
            style={styles.searchInput}
            underlineColorAndroid={'transparent'}
            value={this.state.userEmail}
          />
          <TextInput
            secureTextEntry={true}
            onChange={this._onPasswordTextChanged}
            placeholder="Password"
            placeholderTextColor="#cfedfc"
            style={styles.searchInput}
            underlineColorAndroid={'transparent'}
            value={this.state.userPassword}
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
    fontWeight: '700',
    textAlign: 'center',
  },
  container : {
    alignItems: 'center',
    backgroundColor: '#161D25',
    height: '100%',
    width: '100%',
  },
  flowRight : {
    alignItems: 'center',
    alignSelf: 'stretch',
    color: '#656565',
    flexDirection: 'column',
  },
  header : {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  headerImage: {
    height: 100,
    position: 'absolute',
    width: 300,
  },
  loginButton : {
    backgroundColor: '#cfedfc',
    paddingHorizontal: 160,
    paddingVertical: 15,
    width: '100%',
  },
  searchInput: {
    borderColor: '#cfedfc',
    borderRadius: 8,
    borderWidth: 2,
    color: '#cfedfc',
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontSize: 23,
    height: 50,
    margin: 5,
    padding: 10,
    width: '80%',
  },
});
