import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:null
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userName: '',
      userFirstName: '',
      userLastName: '',
      userPassword: '',
      repeatedPassword: '',
    };
  }

  _onUserTextChanged = event => {
    this.setState({
      userName: event.nativeEvent.text,
    });
  };

  _onEmailTextChanged = event => {
    this.setState({
      userEmail: event.nativeEvent.text,
    });
  };

  _onPasswordTextChanged = event => {
    this.setState({
      userPassword: event.nativeEvent.text,
    });
  };

  _onRepeatedPasswordTextChanged = event => {
    this.setState({
      repeatedPassword: event.nativeEvent.text,
    });
  };

  _onRegisterPressed = () => {
    fetch('http://localhost:4000/users/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.userName,
        lastname: this.state.userLastName,
        password: this.state.userPassword,

      }),
    }).then(async (response) => {

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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Pick a date and schedule your parkings</Text>
        </View>
        <TextInput style={styles.textInput}
          placeholder="Type your user name here"
          underlineColorAndroid={'transparent'}
          onChange={this._onUserTextChanged}
          value={this.state.userFirstNameName}/>
        <TextInput style={styles.textInput}
          placeholder="Type your first name here"
          underlineColorAndroid={'transparent'}
          onChange={this._onNameTextChanged}
          value={this.state.userLastName}/>
        <TextInput style={styles.textInput}
          placeholder="Type your last name here"
          underlineColorAndroid={'transparent'}
          onChange={this._onLastNameTextChanged}
          value={this.state.userLastName}/>
        <TextInput style={styles.textInput}
          secureTextEntry={true}
          placeholder="Type your password here"
          underlineColorAndroid={'transparent'}
          onChange={this._onPasswordTextChanged}
          value={this.state.userPassword}/>
        <TextInput style={styles.textInput}
          secureTextEntry={true}
          placeholder="Re-type your password here"
          underlineColorAndroid={'transparent'}
          onChange={this._onRepeatedPasswordTextChanged}
          value={this.state.repeatedPassword}/>
        <TouchableOpacity style = {styles.registerButton} onPress = {this._onRegisterPressed}>
              <Text style = {styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  banner: {
    width: '100%',
    height: 60,
    backgroundColor: '#161D25'
  },
  bannerText: {
    color: '#cfedfc',
    paddingTop: 15,
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    alignSelf: 'stretch',
    borderBottomColor: '#161D25',
    borderBottomWidth: 1,
    color: '#161D25',
    fontFamily: 'Roboto',
    fontSize: 15,
    height: 40,
    margin: 5,
    marginTop: 5,
  },
  registerButton : {
    alignSelf: 'stretch',
    backgroundColor: '#161D25',
    paddingHorizontal: 160,
    paddingVertical: 15,
  },
  buttonText :{
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'center',
  },
});
