import * as React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class App extends React.Component {


  _onPress() {
    init({
      size: 10000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
      reconnect: true,
      sync: {}
    });

    function onConnect() {
      console.log("onConnect");

      const topic = "/light/in"
      client.subscribe(topic);
      message = new Paho.MQTT.Message("0");
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
    const client = new Paho.MQTT.Client('m16.cloudmqtt.com', 32759, "web_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    const options = {
      useSSL: true,
      userName: "nfqtvzft",
      password: "hIKO1qM_BLi8",
      onSuccess: onConnect,
      onFailure: doFail
    };

    client.connect(options);

    return client

  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.gridItem}
          onPress={this._onPress}>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridItem: {
    alignItems: 'center',
    borderRadius: 300,
    borderWidth: 2,
    height: 170,
    justifyContent: 'center',
    margin: 15,
    width: 170,
  },
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  title: {
    color: '#161D25',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 15,
    textAlign: 'center',
  },
  thumbnail: {
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 1.5,
    height: 100,
    width: 130
  },
});
