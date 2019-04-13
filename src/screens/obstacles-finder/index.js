import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Obstruction extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  _onPress() {
    init({
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
      reconnect: true,
      size: 10000,
      storageBackend: AsyncStorage,
      sync: {}
    });

    function onConnect() {
      console.log("onConnect");

      const topic = "/light/in"
      const topicdos = "/light/out"
      client.subscribe(topicdos);
      message = new Paho.MQTT.Message("4");
      message.destinationName = topic;
      client.send(message);
    }

    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    function onMessageArrived(message) {
      console.log("onMessageArrived:" + message.payloadString);
    }

    function doFail(e) {
      console.log('error', e);
    }
    const client = new Paho.MQTT.Client('m16.cloudmqtt.com', 31145
      , "web_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    const options = {
      onFailure: doFail,
      onSuccess: onConnect,
      password: "YQ6CQXhui74F",
      userName: "hwfhdjmv",
      useSSL: true,
    };
    client.connect(options);
    return client
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Tap an icon and navigate through the menus</Text>
        </View>
        <TouchableOpacity style={styles.buttonItem}
          onPress={this._onPress}>
          <View style={styles.buttonItem} backgroundColor='#7dceff'>
            <View>
              <Text style={styles.title}> Press to take a snapshot of your garage's outsides </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%'
  },
  banner: {
    backgroundColor: '#161D25',
    height: 80,
    width: '100%',
  },
  bannerText: {
    color: '#cfedfc',
    fontFamily: 'Roboto',
    fontSize: 20,
    paddingTop: 15,
    textAlign: 'center',
  },
  buttonItem: {
    alignSelf: 'center',
    backgroundColor: '#cfedfc',
    borderRadius: 300,
    borderWidth: 2,
    height: 170,
    justifyContent: 'center',
    margin: 15,
    width: 170,
  },
  title: {
    color: '#161D25',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 15,
    textAlign: 'center',
  },
});
