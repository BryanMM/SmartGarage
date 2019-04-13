import * as React from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';
import { ToastAndroid } from 'react-native';

export default class ParkingAssistance extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'green',
      status: 'waiting for reply',
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onExit);
    setTimeout(function () {

    }, 1000);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onExit);
  }

  _onExit = () => {
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
      message = new Paho.MQTT.Message("4");
      message.destinationName = topic;
      client.send(message);
    }

    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    function doFail(e) {
      console.log('error', e);
    }
    const client = new Paho.MQTT.Client('m16.cloudmqtt.com', 31145
      , "web_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = onConnectionLost;

    const options = {
      onFailure: doFail,
      onSuccess: onConnect,
      password: "YQ6CQXhui74F",
      userName: "hwfhdjmv",
      useSSL: true,
    };

    client.connect(options);
    this.props.navigation.navigate('SelectionMenu');
    return client
  }
  _onStart = () => {
    setInterval(function () {
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
        const topic2 = "/light/out"
        client.subscribe(topic2);
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
        ToastAndroid.show(message.payloadString, ToastAndroid.SHORT);
        client.unsubscribe(topic2)
        client.disconnect
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
    }, 3000);

  }

  render() {
    this._onStart();
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Use the app's notifications to help you park</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
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
  buttonText: {
    color: '#161D25',
    fontFamily: 'Roboto',
    fontSize: 18,
    textAlign: 'center',
  },
});
