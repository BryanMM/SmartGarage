import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Settings extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  _onLogout = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    const { navigation } = this.props
    return (
      <View>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{navigation.state.params.UserInfo.username}</Text>
            <Text style={styles.info}>{navigation.state.params.UserInfo.firstName + " " + navigation.state.params.UserInfo.lastName}</Text>
            <TouchableOpacity style={styles.buttonContainer}
              onPress={this._onLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#161D25",
    height: 200,
  },
  avatar: {
    alignSelf: 'center',
    borderColor: "white",
    borderRadius: 63,
    borderWidth: 4,
    height: 130,
    marginBottom: 10,
    marginTop: 130,
    position: 'absolute',
    width: 130,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: 'center',
    flex: 1,
    padding: 30,
  },
  name: {
    color: "#000000",
    fontSize: 22,
    fontWeight: '600',
  },
  info: {
    color: "#000000",
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: "#161D25",
    borderRadius: 30,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    width: 250,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 18,
    textAlign: 'center',
  }
});