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

export default class UserLogin extends React.Component {
  navigationOptions = {
    title: 'Inicio de sesión',
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
      <View style={styles.container}>
        <Text style={styles.description}>
          Ingrese sus credenciales para iniciar sesión
        </Text>
        <Text style={styles.description} />
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            placeholder="Ingrese aquí su nombre de usuario"
            value={this.state.userEmail}
            onChange={this._onUserTextChanged}
            placeholderTextColor="#656565"
          />
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            placeholder="Ingrese aquí su contraseña"
            value={this.state.userPassword}
            onChange={this._onPasswordTextChanged}
            placeholderTextColor="#656565"
          />
          <Button
            onPress={this._onLoginPressed}
            color="#48BBEC"
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
    flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    color: '#656565',
  },
  searchInput: {
    height: 36,
    padding: 4,
    margin: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
});
