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
      this.state.userEmail == '' &&
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
        <Text style={ styles.description} >
          Welcome!
        </Text>
        <Text style={styles.description} />
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            placeholder="Type here your email"
            value={this.state.userEmail}
            onChange={this._onUserTextChanged}
            placeholderTextColor="#656565"
          />
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            placeholder="Type here your password"
            value={this.state.userPassword}
            onChange={this._onPasswordTextChanged}
            placeholderTextColor="#656565"
          />
          <Button
            onPress={this._onLoginPressed}
            color="#00004a"
            title="Iniciar sesión"
          />
        </View>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#161D25',
    height: '100%',
    width: '100%',
  },
  description: {
    marginBottom: 20,
    fontSize: 50,
    textAlign: 'center',
    color: '#cfedfc',
  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    color: '#656565',
  },
  header : {
    width: '100%',
    height: '40%',

  },
  headerImage: {
    width: '100%',
    height: '40%'
  },
  searchInput: {
    height: 50,
    padding: 4,
    margin: 5,
    flexGrow: 1,
    fontSize: 23,
    borderWidth: 2,
    borderColor: '#cfedfc',
    borderRadius: 8,
    color: '#cfedfc',
  },
});
