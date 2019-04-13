import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
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

  _onNameTextChanged = event => {
    this.setState({
      userFirstName: event.nativeEvent.text,
    });
  };

  _onLastNameTextChanged = event => {
    this.setState({
      userLastName: event.nativeEvent.text,
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
    if (this.state.userPassword == this.state.repeatedPassword) {
      fetch('http://192.168.8.101:3000/users/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.userName,
          password: this.state.userPassword,
          firstName: this.state.userFirstName,
          lastName: this.state.userLastName
        }),
      }).then(async (response) => {

        const text = await response.text();
        const data = text && JSON.parse(text);
        if (response.ok == true) {
          this.props.navigation.navigate('Login', { title: this.state.userName });
        }
        else {
          alert(data.message);
        }
      })
        .catch((error) => {
          console.log(error)
          alert(error);
        });

    } else {
      alert("Passwords do not match")
    }


  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Pick a date and schedule your parkings</Text>
        </View>
        <TextInput 
          onChange={this._onUserTextChanged}
          placeholder="Type your user name here"
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          value={this.state.userName} 
          />
        <TextInput 
          onChange={this._onNameTextChanged}
          placeholder="Type your first name here"
          underlineColorAndroid={'transparent'}
          value={this.state.userFirstName} 
          style={styles.textInput}
        />
        <TextInput 
          onChange={this._onLastNameTextChanged}
          placeholder="Type your last name here"
          underlineColorAndroid={'transparent'}
          value={this.state.userLastName} 
          style={styles.textInput}
        />
        <TextInput onChange={this._onPasswordTextChanged}
          placeholder="Type your password here"
          secureTextEntry={true}
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          value={this.state.userPassword} 
        />
        <TextInput onChange={this._onRepeatedPasswordTextChanged}
          placeholder="Re-type your password here"
          secureTextEntry={true}
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          value={this.state.repeatedPassword} 
        />
        <TouchableOpacity 
          onPress={this._onRegisterPressed}
          style={styles.registerButton} >
          <Text style={styles.buttonText}>Register</Text>
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
    backgroundColor: '#161D25',
    height: 60,
    width: '100%',
  },
  bannerText: {
    color: '#cfedfc',
    fontFamily: 'Roboto',
    fontSize: 20,
    paddingTop: 15,
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
  registerButton: {
    alignSelf: 'stretch',
    backgroundColor: '#161D25',
    paddingHorizontal: 160,
    paddingVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'center',
  },
});
