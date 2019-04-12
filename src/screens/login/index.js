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
    fetch('http://192.168.8.100:3000/users/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.userEmail,
        password: this.state.userPassword
      }),
    })
    .then(async (response) => {
      const text = await response.text();
      const data = text && JSON.parse(text);
      if (response.ok == true) {
        this.props.navigation.navigate('Home', { title: this.state.userEmail });
      }
      else {
        alert(data.message);
      }
    })
      .catch((error) => {
        console.log(error)
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

  _onRegisterPressed = event => {
    this.props.navigation.navigate('Register');
  }

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.headerImage} source={smartGarage} />
        </View>
        <TextInput
          onChange={this._onUserTextChanged}
          placeholder="Email "
          placeholderTextColor="#cfedfc"
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          value={this.state.userEmail}
        />
        <TextInput
          secureTextEntry={true}
          onChange={this._onPasswordTextChanged}
          placeholder="Password"
          placeholderTextColor="#cfedfc"
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          value={this.state.userPassword}
        />
        <TouchableOpacity style={styles.loginButton}
          onPress={this._onLoginPressed} >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={styles.registerText} onPress={this._onRegisterPressed}>
          You don't have an account? Register now!
        </Text>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#161D25',
    height: '100%',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  headerImage: {
    height: 100,
    position: 'absolute',
    width: 300,
  },
  textInput: {
    alignSelf: 'stretch',
    borderBottomColor: '#cfedfc',
    borderBottomWidth: 1,
    color: '#cfedfc',
    fontFamily: 'Roboto',
    fontSize: 18,
    height: 40,
    margin: 5,
    marginTop: 5,
  },
  loginButton: {
    alignSelf: 'stretch',
    backgroundColor: '#cfedfc',
    paddingHorizontal: 140,
    paddingTop: 8,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#161D25',
    fontFamily: 'Roboto',
    fontSize: 18,
    textAlign: 'center',
  },
  registerText: {
    color: '#cfedfc',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline'
  }
});
